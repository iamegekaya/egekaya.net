import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

function getFirstHeaderValue(value: string | null) {
    return value?.split(',')[0]?.trim() || null;
}

function getPublicOrigin(request: NextRequest) {
    const forwardedHost = getFirstHeaderValue(request.headers.get('x-forwarded-host'));
    const host = forwardedHost ?? getFirstHeaderValue(request.headers.get('host')) ?? request.nextUrl.host;
    const protocol = getFirstHeaderValue(request.headers.get('x-forwarded-proto'))
        ?? request.nextUrl.protocol.replace(/:$/, '');

    return new URL(`${protocol}://${host}`);
}

export default function proxy(request: NextRequest) {
    const response = handleI18nRouting(request);
    const rewrite = response.headers.get('x-middleware-rewrite');

    if (rewrite) {
        try {
            const rewriteUrl = new URL(rewrite);
            const publicOrigin = getPublicOrigin(request);

            if (rewriteUrl.origin !== publicOrigin.origin) {
                rewriteUrl.protocol = publicOrigin.protocol;
                rewriteUrl.hostname = publicOrigin.hostname;
                rewriteUrl.port = publicOrigin.port;
                response.headers.set('x-middleware-rewrite', rewriteUrl.toString());
            }
        } catch {
            // Relative rewrites are already in the desired format.
        }
    }

    return response;
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(tr|en)/:path*']
};
