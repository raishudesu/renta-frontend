import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { Roles } from "./types/user.type";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip processing for API routes and server actions
  if (
    pathname.startsWith("/api") ||
    request.headers.get("next-action") !== null
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If the user is not authenticated
  if (!token) {
    // Redirect to appropriate sign-in page if trying to access dashboard
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // If the user is authenticated
  //   const userRole = token.roles as Roles[];

  // Redirect users trying to access sign-in page
  if (pathname == "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/* (API routes)
     * 2. /_next/* (Next.js internals)
     * 3. /static/* (static files)
     * 4. /_vercel/* (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (common static files)
     */
    "/((?!api|_next|_vercel|static|favicon.ico|sitemap.xml).*)",
    "/dashboard/:path*",
  ],
};
