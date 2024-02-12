import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

// export const config = {
//   matcher: ["/", "/(en|ar)/:path*"],
// };

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // if (pathname == "/login" || pathname == "/admin/login") {
  //   return NextResponse.next();
  // }
  try {
    const token = await getToken({ req: request });
    console.log(token, "token");
  } catch (err) {
    console.log(err);
  }

  return NextResponse.next();
}
