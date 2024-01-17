import { transporter } from "../../../lib/helpers/emailHelper";
import logger from "../../../lib/helpers/Logger";
import { initMiddleware, validateMiddleware } from "../../../lib/helpers/middlewares";
import { check, validationResult } from "express-validator";
import applyRateLimit from "../../../lib/helpers/ratelimit";

const validateBody = initMiddleware(
    validateMiddleware(
        [
            check("name", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
            check("email", "Hibás email cím").trim().isEmail().escape().normalizeEmail(),
            check("message", "Hibás érték").trim().isLength({ min: 1, max: 255 }).escape(),
        ],
        validationResult
    )
);

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await applyRateLimit(req, res);
            await validateBody(req, res);

            const { name, email, message } = req.body;

            try {
                const mail = {
                    from: `"Kapcsolat – ${name}" "admin@contibus.hu"`,
                    to: process.env.NODE_ENV == "production" ? "jelentkezes@kalandozas.hu" : "admin@kalandozas.hu",
                    subject: `Kapcsolat - weboldalról`,
                    replyTo: email,
                    html: ` <html><body>
                    <h2>Kapcsolat űrlap a kalandozas.hu-n keresztül</h2>
                    <hr width="50%" style="margin-left: 0">
                    <p>Név: ${name}</p>
                    <p>Email cím: ${email}</p>
                    <br/>
                    <p>Üzenet: ${message}</p>
                    </body>
                    </html> `,
                };
                transporter.verify((error) => {
                    if (error) {
                        logger("error", error);
                    } else {
                        logger("email", "Pörgünk, megyünk, nyomjuk! (kapcsolat)");
                    }
                });
                await transporter.sendMail(mail);
                logger("email", "elküldve (kapcsolat)");
                res.status(200).json({
                    status: "success",
                });
            } catch (error) {
                logger("error", error);

                res.status(500).json({
                    error: [error],
                });
            }

            break;

        default:
            res.status(404).json({ message: "Request HTTP Method Incorrect." });

            break;
    }

    res.end();
};
