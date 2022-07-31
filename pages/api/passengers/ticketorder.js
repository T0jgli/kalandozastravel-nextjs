import { transporter } from "../../../lib/helpers/emailHelper";
import logger from "../../../lib/helpers/Logger";
import { initMiddleware, validateMiddleware } from "../../../lib/helpers/middlewares";
import { check, validationResult } from "express-validator";
import db from "../../../lib/firebase";
import firebase from "firebase/compat/app";

const validateBody = initMiddleware(
    validateMiddleware(
        [
            check("name", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
            check("address", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
            check("city", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
            check("postalCode", "Hibás érték").trim().isLength({ min: 1, max: 6 }).escape(),
            check("phone", "Hibás érték").trim().isLength({ min: 7, max: 255 }).escape(),
            check("email", "Hibás email cím").isEmail().trim().escape().normalizeEmail(),
            check("matesNames", "Hibás érték").trim().isLength({ max: 255 }).escape(),
            check("people", "Hibás érték").isInt({ min: 1 }).trim().escape(),
            check("seatNumber", "Hibás érték").trim().isLength({ max: 255 }).escape(),
            check("desc", "Hibás érték").trim().isLength({ max: 1000 }).escape(),
            check("feedback", "Kérjük válasszon").not().equals("0"),
            check("payment", "Kérjük válasszon").not().equals("0"),
        ],
        validationResult
    )
);

const existingEmailOrName = initMiddleware(async (req, res, next) => {
    const { travel, phone, email, people } = req.body;
    let phoneError = false;
    let emailError = false;

    if (people > travel.freePlaces) {
        return res.status(409).json({
            error: `Sajnos nincs ennyi szabad hely az utazáson! (${people})`,
        });
    }

    const phoneCheck = await db.collection("travels").doc(travel.id).collection("passengers").where("phone", "==", phone).get();

    phoneCheck.docs.map((doc) => {
        if (doc.exists) phoneError = true;
    });

    if (phoneError) {
        return res.status(409).json({
            error: "Ezzel a telefonszámmal már van jegy foglalva!",
        });
    }

    const emailCheck = await db.collection("travels").doc(travel.id).collection("passengers").where("email", "==", email).get();

    emailCheck.docs.map((doc) => {
        if (doc.exists) emailError = true;
    });

    if (emailError) {
        return res.status(409).json({
            error: "Ezzel az email címmel már van jegy foglalva!",
        });
    }

    next();
});

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await validateBody(req, res);
            await existingEmailOrName(req, res);

            const { name, email, address, city, postalCode, phone, matesNames, people, needseat, seatNumber, desc, travel, feedback, payment } =
                req.body;

            try {
                const mail = {
                    from: `"Jegyfoglalás – ${name}" "admin@contibus.hu"`,
                    to: process.env.NODE_ENV == "production" ? "ertekesites@kalandozas.hu" : "admin@kalandozas.hu",
                    subject: `Online utazásfoglalás - weboldalról`,
                    replyTo: email,
                    html: ` <html><body>
                    <h2>Online utazásfoglalás a kalandozas.hu-n keresztül</h2>
                    <p>Utazás megnevezése: ${travel.title}</p>
                    <p>Utazás időpontja: ${travel.startingDate} - ${travel.endingDate}</p>
                    <p>Utazás ára: ${travel.price} Ft</p> 
                    <hr width="50%" style="margin-left: 0">
                    <p>Megrendelő neve: ${name}</p>
                    <p>Lakcím: ${city}, ${postalCode} ${address}</p>
                    <p>Email cím: ${email}</p>
                    <p>Telefonszám: ${phone}</p>
                    <p>Utasszám: ${people}</p>
                    ${matesNames?.length > 0 ? `<p>Utasok neve: ${matesNames}</p>` : ""}
                    <p>Helyjegy: ${needseat == true ? `foglalva - ${seatNumber}` : "nem kér"}</p>
                    <p>Fizetési mód: ${payment}</p>
                    <br/>
                    <p>Megjegyzés: ${desc}</p><p></p>
                    <p>Honnan hallott irodánkról?: ${feedback}</p>
                    <p>Hírlevél: ${req.body.newsletter ? "kér" : "nem kér"}</p>

                    </body>
                    </html> `,
                };
                transporter.verify((error) => {
                    if (error) {
                        logger("error", error);
                    } else {
                        logger("email", `Pörgünk, megyünk, nyomjuk! (jegyfoglalás)`, travel.title);
                    }
                });
                await transporter.sendMail(mail);
                logger("email", "elküldve (jegyfoglalás)");
                res.status(200).json({
                    status: "success",
                });
            } catch (error) {
                logger("error", error);

                res.status(500).json({
                    error: error,
                });
            } finally {
                await db.collection("travels").doc(travel.id).collection("passengers").add({
                    name,
                    email,
                    address,
                    city,
                    postalCode,
                    phone,
                    matesNames,
                    people,
                    needseat,
                    seatNumber,
                    feedback,
                    payment,
                    desc,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });

                db.collection("travels")
                    .doc(travel.id)
                    .update({
                        freePlaces: firebase.firestore.FieldValue.increment(-people),
                    });

                if (req.body.newsletter) {
                    await db.collection("newsletter").add({
                        name,
                        email,
                        phone,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                }
            }

            break;

        default:
            res.status(404).json({ message: "Request HTTP Method Incorrect." });

            break;
    }

    res.end();
};
