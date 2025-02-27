import { NextResponse, type NextRequest } from 'next/server';
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from '@/auth'

const authRoutes = ['/sign-up', '/sign-in']
const passwordRoutes = ['/forgot-password', '/reset-password'];

export default async function authMiddleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.includes(pathName);
    const isPasswordRoute = passwordRoutes.includes(pathName);

    const { data: session } = await betterFetch<Session>(
        '/api/auth/get-session',
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get('cookie') || "",
            },
        },
    );

    if (!session) {
        if (isAuthRoute || isPasswordRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL(`/sign-in`, request.url));
    }

    if (isAuthRoute || isPasswordRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}