'use server';

import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_PORT = Number(process.env.SMTP_SERVER_PORT);
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: SMTP_SERVER_PORT,
    secure: true,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
});

export const sendEmail = async ({ sendTo, subject, text, html }: { sendTo: string, subject: string, text: string, html?: string }) => {
    try {
        await transporter.verify();
    } catch {
        console.error('Unable to authenticate');
        return;
    }
    return await transporter.sendMail({
        from: SMTP_SERVER_USERNAME,
        to: sendTo,
        subject: subject,
        text: text,
        html: html ? html : '',
    });
}