import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    const jwt = req.cookies.get("spacefinda-admin-token");

    // Allow access to the login page even without a JWT
    if (req.nextUrl.pathname === "/auth/login") {
        return NextResponse.next();
    }

    // Redirect the root path to home
    if (req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard/overview", req.url));
    }

    // Redirect the dashboard root to its overview
    if (req.nextUrl.pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard/overview", req.url));
    }

    // Redirect unauthorized users trying to access dashboard pages
    if (!jwt && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

}

export const config = {
    matcher: "/((?!api|static|_next|.*\\.(?:js|css|map|json|png|jpg|jpeg|gif|svg|ico|webp)).*)",
};