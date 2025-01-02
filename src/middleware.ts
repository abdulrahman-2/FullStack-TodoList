import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "Please define the AUTH_SECRET environment variable inside .env"
    );
  }

  const token = await getToken({ req, secret });
  const url = req.nextUrl.clone();

  const isOnTodosPage = url.pathname.startsWith("/todos");
  const isOnLoginPage = url.pathname.startsWith("/login");
  const isOnSignUpPage = url.pathname.startsWith("/signUp");

  // Redirect unauthenticated users away from protected routes
  if (isOnTodosPage && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login or signup pages
  if ((isOnLoginPage || isOnSignUpPage) && token) {
    url.pathname = "/todos";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
