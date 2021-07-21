import { createTransport } from "nodemailer";

const transport = {
    service: "SendGrid",
    auth: {
        user: process.env.NEXT_PUBLIC_SENDGRID_USER,
        pass: process.env.NEXT_PUBLIC_SENDGRID_PASS,
    },
};

export const transporter = createTransport(transport);
