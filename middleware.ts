import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["en", "ar"];

let publicPages: string[] = [];

for (let i = 0; i < locales.length; i++) {
  publicPages.push(`/${locales[i]}/login`);
  publicPages.push(`/${locales[i]}/forgotPassword`);
  publicPages.push(`/${locales[i]}/privacyPolicy`);
}

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  function middlware(req) {
    return intlMiddleware(req);
  },
  {
    pages: {
      signIn: "/en/login",
    },
    callbacks: {
      authorized: (obj) => {
        return obj?.token != null;
      },
    },
  }
);

export default async function middleware(req: NextRequest) {
  const isPublicPage = publicPages.includes(req.nextUrl.pathname);
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    if (req.nextUrl.pathname.startsWith("/api")) {
      console.log("API route:", req.nextUrl.pathname);
    } else {
      console.log("UI route:", req.nextUrl.pathname);
      return (authMiddleware as any)(req);
    }
  }
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|/api.*).*)"],
};
