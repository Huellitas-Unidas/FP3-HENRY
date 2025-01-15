import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeToken(token: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    return payload;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const userToken = request.cookies.get("token")?.value;

  const userData = userToken ? decodeToken(userToken) : null;

  // Permitir acceso sin restricciones a /adminRegister
  if (pathname.startsWith("/adminRegister")) {
    return NextResponse.next();
  }

  // Ruta protegida para /admin
  if (pathname.startsWith("/admin")) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", origin));
    }
    if (!userData || userData.role.toUpperCase() !== "ADMIN") {
      return NextResponse.redirect(new URL("/", origin));
    }
  }

  // Rutas protegidas para /lostandfound
  if (pathname.startsWith("/lostandfound") && !userToken) {
    return NextResponse.redirect(new URL("/protectedRoute", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/lostandfound/:path*",
    "/register",
    "/login",
    "/adminRegister",
  ],
};










