import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(1),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = schema.parse(body);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender address (your gmail)
            to: process.env.GMAIL_USER,   // Receiver address (yourself)
            replyTo: email,               // Reply to user's email
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Email sending failed:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
