import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const enviarCorreo = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
    await transporter.sendMail({
        from: `"LifeReminder" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
    });
};
