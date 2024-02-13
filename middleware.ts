// import createMiddleware from "next-intl/middleware";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";

// export default createMiddleware({
//   locales: ["en", "ar"],
//   defaultLocale: "en",
// });

// export const config = {
//   matcher: ["/", "/:lang(en|ar)/:path*"],
// };

// export async function middleware(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getSession({ req });
//   console.log(session, "session");
//   return;
// }

import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["en", "ar"];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: (obj) => {
        console.log(obj, "dsds");
        return obj?.token != null;
      },
    },
  }
);

export default function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname, "req.nextUrl.pathname");
  const isPublicPage = req.nextUrl.pathname.includes("/login");
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    console.log("auth");
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
