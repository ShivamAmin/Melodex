import { NextResponse, NextRequest } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ['/sign-up', '/sign-in']
const passwordRoutes = ['/forgot-password', '/reset-password'];

export default async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.includes(pathName);
    const isPasswordRoute = passwordRoutes.includes(pathName);
    const sessionCookie = getSessionCookie(request);
    const next = NextResponse.next();
    const redirectHome = NextResponse.redirect(new URL('/', request.url));
    const redirectSignIn = NextResponse.redirect(new URL('/sign-in', request.url));

    next.headers.set('x-pathname', request.nextUrl.pathname);
    redirectHome.headers.set('x-pathname', request.nextUrl.pathname);
    redirectSignIn.headers.set('x-pathname', request.nextUrl.pathname);

    if (!sessionCookie) {
        if (isAuthRoute || isPasswordRoute) {
            return next;
        }
        return redirectSignIn;
    }

    if (isAuthRoute || isPasswordRoute) {
        return redirectHome;
    }

    return next;
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}