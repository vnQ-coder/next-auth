import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  matcher: [
    "/",
    // "/api/:path*", // Match API routes
    "/:lang(en|ar)/:path*", // Match language-specific routes
  ],
};

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   console.log(pathname, "pathname");

//   // Extract language parameter from URL
//   const match = pathname.match(/^\/(en|ar)(\/.*)?/);
//   const lang = match ? match[1] : "en";

//   // You can use the 'lang' variable to determine the language and perform actions accordingly

//   // For example, if you want to skip middleware for API routes:
//   if (pathname.startsWith(`/${lang}/api/`)) {
//     return NextResponse.next();
//   }

//   // Your authentication logic with getToken can go here

//   return NextResponse.next();
// }
