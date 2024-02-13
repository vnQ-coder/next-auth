import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["en", "ar"];
const publicPages = ["/login", "/forgotPassword"];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: (obj) => {
        return obj?.token != null;
      },
    },
    pages: {
      signIn: "/en/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname, "req.nextUrl.pathname");
  const isPublicPage = req.nextUrl.pathname.includes("/login");
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
