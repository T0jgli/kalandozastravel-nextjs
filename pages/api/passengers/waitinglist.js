import { transporter } from "../../../lib/helpers/emailHelper";
import logger from "../../../lib/helpers/Logger";
import { initMiddleware, validateMiddleware } from "../../../lib/helpers/middlewares";
import { check, validationResult } from "express-validator";
import applyRateLimit from "../../../lib/helpers/ratelimit";

const validateBody = initMiddleware(
    validateMiddleware(
        [
            check("name", "Hibás név").trim().isLength({ min: 1, max: 255 }).escape(),
            check("phone", "Hibás telefonszám").trim().isLength({ min: 7, max: 255 }).escape(),
            check("email", "Hibás email cím").isEmail().trim().escape().normalizeEmail(),
        ],

        validationResult
    )
);

const sendUserMail = (name, email, title) => {
    const mail = {
        from: `"kalandozas.hu" "noreply@contibus.hu"`,
        to: email,
        replyTo: "kalandozas@t-online.hu",
        subject: `Kalandozás - Várólista - ${title}`,
        html: ` <html><body>
        <p>Kedves ${name},</p>
        <h4>Köszönjük jelentkezését a várólistára! Értesítjük, amint felszabadul egy hely az utazáson!</h4>
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

            const { name, email, phone, travel } = req.body;

            try {
                const mail = {
                    from: `"Várólista – ${name}" "admin@contibus.hu"`,
                    to: process.env.NODE_ENV == "production" ? "admin@kalandozas.hu" : "admin@kalandozas.hu",
                    subject: `Várólistára jelentkezés - weboldalról`,
                    replyTo: email,
                    html: ` <html><body>
                    <h2>Várólistára jelentkezés a kalandozas.hu-n keresztül</h2>
                    <br/>
                    <br/>
                    <p><span style='color: gray'>Utazás megnevezése:</span> ${travel.title}</p>
                    <p><span style='color: gray'>Utazás időpontja:</span> ${travel.startingDate} - ${travel.endingDate}</p>
                    <p><span style='color: gray'>Utazás ára:</span> ${travel.price} Ft</p> 
                    <hr width="50%" style="margin-left: 0">
                    <p><span style='color: gray'>Megrendelő neve:</span> ${name}</p>
                    <p><span style='color: gray'>Email cím:</span> ${email}</p>
                    <p><span style='color: gray'>Telefonszám:</span> ${phone}</p>
                    </body>
                    </html> `,
                };
                transporter.verify((error) => {
                    if (error) {
                        logger("error", error);
                    } else {
                        logger("email", `Pörgünk, megyünk, nyomjuk! (várólista)`, travel.title);
                    }
                });
                await transporter.sendMail(mail);
                await sendUserMail(name, email, travel.title);
                logger("email", "elküldve (várólista)");
                res.status(200).json({
                    status: "success",
                });
            } catch (error) {
                logger("error", error);

                res.status(500).json({
                    error: error,
                });
            } finally {
            }

            break;

        default:
            res.status(404).json({ message: "Request HTTP Method Incorrect." });

            break;
    }

    res.end();
};
