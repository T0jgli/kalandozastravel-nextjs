import { transporter } from "../../../lib/helpers/emailHelper";
import logger from "../../../lib/helpers/Logger";
import { initMiddleware, validateMiddleware } from "../../../lib/helpers/middlewares";
import { check, validationResult } from "express-validator";
import db from "../../../lib/firebase";
import firebase from "firebase/compat/app";
import applyRateLimit from "../../../lib/helpers/ratelimit";

const validateBody = initMiddleware(
    validateMiddleware(
        [
            check("name", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
            check("address", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
            check("city", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
            check("postalCode", "Hibás érték").trim().isLength({ min: 1, max: 6 }).escape(),
            check("phone", "Hibás érték").trim().isLength({ min: 7, max: 255 }).escape(),
            check("email", "Hibás email cím").isEmail().trim().escape().normalizeEmail(),
            check("people", "Hibás érték").isInt({ min: 1 }).trim().escape(),
            check("matesNames.*", "Hibás érték").optional().trim().escape(),
            check("insurances.*", "Hibás érték").optional().trim().escape(),
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
            error: `Sajnos csak ${travel.freePlaces} szabad hely van az utazáson!`,
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

const sendUserMail = (name, email, title) => {
    const mail = {
        from: `"kalandozas.hu" "noreply@contibus.hu"`,
        to: email,
        replyTo: "kalandozas@t-online.hu",
        subject: `Kalandozás - ${title}`,
        html: ` <html><body>
        <p>Kedves ${name},</p>
        <h4>Köszönjük foglalását! Hamarosan válasz e-mailban felvesszük Önnel a kapcsolatot!</h4>
        <br/>
        <br/>
        <small><span style='color: gray'>Ez egy automatikusan generált email. Kérjük ne válaszoljon rá.</span></small>
        </body>
        </html> `,
    };
    return transporter.sendMail(mail);
};

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await applyRateLimit(req, res);
            await validateBody(req, res);
            await existingEmailOrName(req, res);

            const {
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
                desc,
                travel,
                feedback,
                payment,
                needinsurance,
                insurances,
            } = req.body;

            let insuranceBody = "";

            if (needinsurance == true) {
                insuranceBody += `<p><span style='color: gray'>Biztosítás:</span> kér`;
                for (let i = 0; i < people; i++) {
                    let tmpObj = {
                        name: insurances[`insurancename${i}`],
                        birthdate: insurances[`insurancebirthdate${i}`],
                    };
                    insuranceBody += `<br/><span>${i + 1}. utas neve: ${tmpObj?.["name"]} | születési dátuma: ${tmpObj?.["birthdate"]}</span>`;
                }
                insuranceBody += "</p>";
            }

            let matesBody = "";

            if (matesNames) {
                for (let m in matesNames) {
                    matesBody += `<br/><span>${parseInt(m) + 2}. utas neve: ${matesNames[m]}`;
                }

                matesBody += "</p>";
            }

            try {
                const mail = {
                    from: `"Jegyfoglalás – ${name}" "admin@contibus.hu"`,
                    to: process.env.NODE_ENV == "production" ? "ertekesites@kalandozas.hu" : "admin@kalandozas.hu",
                    subject: `Online utazásfoglalás - weboldalról`,
                    replyTo: email,
                    html: ` <html><body>
                    <h2>Online utazásfoglalás a kalandozas.hu-n keresztül</h2>
                    <br/>
                    <br/>
                    <p><span style='color: gray'>Utazás megnevezése:</span> ${travel.title}</p>
                    <p><span style='color: gray'>Utazás időpontja:</span> ${travel.startingDate} - ${travel.endingDate}</p>
                    <p><span style='color: gray'>Utazás ára:</span> ${travel.price} Ft</p> 
                    <hr width="50%" style="margin-left: 0">
                    <p><span style='color: gray'>Megrendelő neve:</span> ${name}</p>
                    <p><span style='color: gray'>Lakcím:</span> ${city}, ${postalCode} ${address}</p>
                    <p><span style='color: gray'>Email cím:</span> ${email}</p>
                    <p><span style='color: gray'>Telefonszám:</span> ${phone}</p>
                    <p><span style='color: gray'>Utasszám:</span> ${people}
                    ${matesBody ? matesBody : ""}
                    ${insuranceBody ? insuranceBody : ""}
                    <p><span style='color: gray'>Helyjegy:</span> ${needseat == true ? `foglalva - ${seatNumber}` : "nem kér"}</p>
                    <p><span style='color: gray'>Fizetési mód:</span> ${payment}</p>
                    <br/>
                    <p><span style='color: gray'>Megjegyzés:</span> ${desc}</p>
                    <p><span style='color: gray'>Honnan hallott irodánkról?:</span> ${feedback}</p>
                    <p><span style='color: gray'>Hírlevél:</span> ${req.body.newsletter ? "kér" : "nem kér"}</p>

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
                await sendUserMail(name, email, travel.title);
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
                if (process.env.NODE_ENV == "production") {
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
            }

            break;

        default:
            res.status(404).json({ message: "Request HTTP Method Incorrect." });

            break;
    }

    res.end();
};
