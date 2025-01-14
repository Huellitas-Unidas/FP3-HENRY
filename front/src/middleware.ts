import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const userId = request.cookies.get("next-auth.session-token")?.value;
  if (userId) {
    if (userId) {
      const response = NextResponse.next();
      response.cookies.set("next-auth.user-id", userId, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      return response;
    }
    return NextResponse.next();
  }

  // Obtén el token de las cookies
  const userToken = request.cookies.get("token")?.value;

  // Si intenta acceder a "/lostandfound" sin estar logueado, redirige a "/login"
  if (pathname.startsWith("/lostandfound") && !userToken) {
    const loginURL = new URL("/login", origin);
    return NextResponse.redirect(loginURL);
  }

  // Si intenta acceder a "/admin" sin estar logueado, redirige a "/login"
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
