import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_FORM_FILL_MS = 1500;

// Best-effort only: this resets on restart/deploy and is not shared across instances.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const schema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(1).max(5000),
    website: z.string().optional().default(''),
    submittedAt: z.coerce.number().int().nonnegative().optional(),
});

function jsonError(status: number, error: string) {
    return NextResponse.json({ success: false, error }, { status });
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeSingleLine(value: string) {
    return value.replace(/[\r\n]+/g, ' ').trim();
}

function normalizeMultiline(value: string) {
    return value.replace(/\r\n?/g, '\n').trim();
}

function getClientIdentifier(req: Request) {
    const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const realIp = req.headers.get('x-real-ip')?.trim();
    const userAgent = req.headers.get('user-agent')?.trim() ?? 'unknown';
    const clientIp = forwardedFor || realIp || 'unknown';

    return `${clientIp}:${userAgent.slice(0, 120)}`;
}

function isRateLimited(identifier: string, now: number) {
    for (const [key, entry] of rateLimitStore) {
        if (entry.resetAt <= now) {
            rateLimitStore.delete(key);
        }
    }

    const existingEntry = rateLimitStore.get(identifier);

    if (!existingEntry) {
        rateLimitStore.set(identifier, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        });
        return false;
    }

    if (existingEntry.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    existingEntry.count += 1;
    return false;
}

export async function POST(req: Request) {
    let body: unknown;

    try {
        body = await req.json();
    } catch {
        return jsonError(400, 'Invalid request body');
    }

    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
        return jsonError(400, 'Invalid form data');
    }

    const { name, email, message, website, submittedAt } = parsedBody.data;

    if (website.trim().length > 0) {
        return jsonError(400, 'Invalid submission');
    }

    const now = Date.now();
    const submissionAge = submittedAt ? now - submittedAt : 0;

    if (!submittedAt || submissionAge < MIN_FORM_FILL_MS) {
        return jsonError(400, 'Invalid submission');
    }

    if (isRateLimited(getClientIdentifier(req), now)) {
        return jsonError(429, 'Too many requests. Please try again later.');
    }

    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();

    if (!gmailUser || !gmailAppPassword) {
        console.error('Contact form email is not configured.');
        return jsonError(500, 'Failed to send email');
    }

    const safeName = sanitizeSingleLine(name);
    const safeEmail = sanitizeSingleLine(email);
    const safeMessage = normalizeMultiline(message);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailAppPassword,
        },
    });

    const mailOptions = {
        from: gmailUser,
        to: gmailUser,
        replyTo: safeEmail,
        subject: `New Contact Form Submission from ${safeName}`,
        text: [
            'New Contact Form Submission',
            '',
            `Name: ${safeName}`,
            `Email: ${safeEmail}`,
            'Message:',
            safeMessage,
        ].join('\n'),
        html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(safeMessage).replace(/\n/g, '<br />')}</p>
      `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Email sending failed:', error);
        return jsonError(500, 'Failed to send email');
    }
}
