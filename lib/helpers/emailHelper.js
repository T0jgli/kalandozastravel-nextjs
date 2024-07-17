import { createTransport } from "nodemailer";

const transport = {
    host: "mail.contibus.hu",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NEXT_EMAIL_USER,
        pass: process.env.NEXT_EMAIL_PASS,
    },
};

export const transporter = createTransport(transport);
