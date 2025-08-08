import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is trying to access protected routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/whiteboard")) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      // Redirect to login if no token found
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check if authenticated user is trying to access auth pages
  if (pathname === "/" || pathname === "/signup") {
    // const token = request.cookies.get("accessToken")?.value;

    // if (token) {
    //   // Redirect to dashboard if already authenticated
    //   return NextResponse.redirect(new URL("/dashboard", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
