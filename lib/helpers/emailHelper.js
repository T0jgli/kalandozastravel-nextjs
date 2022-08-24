import { createTransport } from "nodemailer";

const transport = {
    host: "mortalsoul.23net.hu",
    port: 2525,
    secure: false,
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
};

export const transporter = createTransport(transport);
