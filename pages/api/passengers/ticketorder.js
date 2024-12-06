import { transporter } from "../../../lib/helpers/emailHelper";
import logger from "../../../lib/helpers/Logger";
import { initMiddleware, validateMiddleware } from "../../../lib/helpers/middlewares";
import { check, validationResult } from "express-validator";
import applyRateLimit from "../../../lib/helpers/ratelimit";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    orderBy,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    addDoc,
    increment,
} from "firebase/firestore";
import firebaseapp from "../../../lib/firebase";

const db = getFirestore(firebaseapp);

const validateBody = initMiddleware(
    validateMiddleware(
        [
            check("name", "Hibás név").trim().isLength({ min: 1, max: 255 }).escape(),
            check("address", "Hibás cím").trim().isLength({ min: 5, max: 255 }).escape(),
            check("city", "Hibás város").trim().isLength({ min: 2, max: 255 }).escape(),
            check("postalCode", "Hibás irányítószám").trim().isLength({ min: 4, max: 6 }).isNumeric().escape(),
            check("phone", "Hibás telefonszám").trim().isLength({ min: 7, max: 255 }).escape(),
            check("email", "Hibás email cím").isEmail().trim().escape().normalizeEmail(),
            check("people", "Hibás érték").isInt({ min: 1 }).trim().escape(),
            check("matesNames.*", "Hibás érték").optional().trim().escape(),
            check("insurances.*", "Hibás érték").optional().trim().escape(),
            check("seatNumber", "Hibás érték").trim().isLength({ max: 255 }).escape(),
            check("desc", "Hibás érték").trim().escape(),
            check("feedback", "Kérjük válasszon").not().equals("0").trim().escape(),
            check("payment", "Kérjük válasszon").not().equals("0").trim().escape(),
            check("needseat", "Hibás érték").optional().isBoolean(),
            check("needinsurance", "Hibás érték").optional().isBoolean(),
            check("needfelpanzioOrBreakfast", "Hibás érték").optional().isBoolean(),
            check("newsletter", "Hibás érték").optional().isBoolean(),
            check("seatNumber", "Hibás érték").optional().trim().escape(),
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
    const phoneQuery = query(collection(db, "travels", travel.id, "passengers"), where("phone", "==", phone));
    const phoneCheck = await getDocs(phoneQuery);

    phoneCheck.forEach((doc) => {
        if (doc.exists()) phoneError = true;
    });

    if (phoneError) {
        return res.status(409).json({
            error: "Ezzel a telefonszámmal már van foglalás!",
        });
    }
    const emailQuery = query(collection(db, "travels", travel.id, "passengers"), where("email", "==", email));
    const emailCheck = await getDocs(emailQuery);

    emailCheck.forEach((doc) => {
        if (doc.exists()) emailError = true;
    });

    if (emailError) {
        return res.status(409).json({
            error: "Ezzel az email címmel már van foglalás!",
        });
    }

    next();
});

const sendUserMail = (name, email, title, payment) => {
    let paymentMessage = "";
    switch (payment) {
        case "Személyesen":
            paymentMessage = "Kérjük keresse fel irodánkat nyitvatartási időben (H-P 9-17 óráig)";
            break;
        case "Átutalás":
            paymentMessage = "";
            break;
        case "Utalvány":
            paymentMessage = "Kérjük keresse fel irodánkat nyitvatartási időben (H-P 9-17 óráig)";
            break;
        case "Szép kártya":
            paymentMessage = "Kérjük keresse fel irodánkat nyitvatartási időben (H-P 9-17 óráig)";
            break;
        default:
            break;
    }
    const mail = {
        from: `"kalandozas.hu" "noreply@contibus.hu"`,
        to: email,
        replyTo: "kalandozas@t-online.hu",
        subject: `Kalandozás - ${title}`,
        html: ` <html><body>
        <p>Kedves ${name},</p>
        <h4>Köszönjük foglalását! Hamarosan válasz e-mailban felvesszük Önnel a kapcsolatot!</h4>
        <p>Az Ön által választott fizetési mód: ${payment}. ${paymentMessage}</p>
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
                needfelpanzioOrBreakfast,
                needEgyagy,
                belepojegyek,
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

            let belepojegyekBody = "";
            Object.keys(belepojegyek).forEach((b) => {
                if (belepojegyek?.[b] != 0) {
                    belepojegyekBody += `<br/><span>${b}: ${belepojegyek?.[b]}`;
                }
            });

            try {
                const mail = {
                    from: `"Jegyfoglalás – ${name}" "admin@contibus.hu"`,
                    to: process.env.NODE_ENV == "production" ? "jelentkezes@kalandozas.hu" : "admin@kalandozas.hu",
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
                    ${
                        travel?.extraFelpanzio
                            ? `<p><span style='color: gray'>Egyéb:</span> ${needfelpanzioOrBreakfast ? "Félpanziót kér" : "Csak reggelit kér"}`
                            : ""
                    }
                    ${
                        travel?.extraEgyagy
                            ? `<p><span style='color: gray'>Egyéb:</span> ${needEgyagy ? "Egyágyas szobát kér" : "Nem kér egyágyas szobát"}`
                            : ""
                    }
                    ${travel?.belepojegyek ? `<p><span style='color: gray'>Belépőjegyek:</span> ${belepojegyekBody}` : ""}

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
                await sendUserMail(name, email, travel.title, payment);
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
                    await addDoc(collection(db, "travels", travel.id, "passengers"), {
                        email,
                        name,
                        phone,
                        timestamp: serverTimestamp(),
                    });
                    await updateDoc(doc(db, "travels", travel.id), {
                        freePlaces: increment(-people),
                    });

                    if (req.body.newsletter) {
                        await addDoc(collection(db, "newsletter"), {
                            name,
                            email,
                            phone,
                            timestamp: serverTimestamp(),
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
