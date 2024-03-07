// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware"
// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;
const FORBIDDEN_PATHS = ["/myquestions", "/account", "/teacher"];
const TEACHER_PATHS = ["/teacher"];

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const matchesForbiddenPath = FORBIDDEN_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  const matchesTeacherPath = TEACHER_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  if (matchesForbiddenPath) {
    // console.log("middleware", request.url)
    const token = await getToken({
      req: request,
      secret: process.env.SECRET,
    });
    // console.log("user in Middleware", token);
    if (!token) {
      const url = new URL(`/account/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.role !== "teacher" && matchesTeacherPath) {
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/teacher/:path*",
    "/account",
    "/myquestions",
    // "/api/auth/signin",
    // "/api/auth/signout",
    // "/api/auth/session",
    // "/api/auth/csrf",
  ],
};
