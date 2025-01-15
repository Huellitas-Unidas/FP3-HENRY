import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const userToken = request.cookies.get("token")?.value;

  if (pathname.startsWith("/lostandfound") && !userToken) {
    const loginURL = new URL("/protectedRoute", origin);
    return NextResponse.redirect(loginURL);
  }

  if (pathname.startsWith("/admin") && !userToken) {
    const loginURL = new URL("/login", origin);
    return NextResponse.redirect(loginURL);
  }

  // Si el usuario logueado intenta acceder a "login" o "signup", redirige al home
  // if (
  //   (pathname.includes("/login") || pathname.includes("/register")) &&
  //   userToken
  // ) {
  //   const homeURL = new URL("/", origin);
  //   return NextResponse.redirect(homeURL);
  // }

  // Si ninguna condición aplica, deja continuar
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/lostandfound/:path*", "/login", "/register"],
};
