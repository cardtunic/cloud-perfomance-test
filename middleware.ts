import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const logged = !!cookies().get("user_id")?.value;
  const answered = cookies().get("answered")?.value;

  if (answered && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/results", request.url));
  }

  if (!answered && request.nextUrl.pathname === "/results") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (logged && request.nextUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !logged &&
    (request.nextUrl.pathname === "/results" ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
