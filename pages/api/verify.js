import { transporter } from "../../lib/helpers/emailHelper";

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            const result = await transporter.verify();
            if (result) {
                res.status(200).json({ message: "Success" });
            } else {
                res.status(500).json({
                    message: result,
                });
            }
            break;

        default:
            res.status(404).json({ message: "Request HTTP Method Incorrect." });

            break;
    }

    res.end();
};
