import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/chat", request.url));
      } catch (e) {
        return NextResponse.next();
      }
    }
  }

  if (pathname === "/chat" || pathname === "/faq") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/chat", "/faq"],
};
