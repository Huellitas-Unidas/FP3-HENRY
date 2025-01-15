/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Función básica para verificar si el token existe
function isTokenPresent(token: string | undefined): boolean {
  return !!token; // Solo verifica que el token exista
}

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Obtén el token de las cookies
  const userToken = request.cookies.get("token")?.value;

  // Verifica si el token está presente
  const isAuthenticated = isTokenPresent(userToken);

  // Rutas protegidas: Requieren autenticación
  if (pathname.startsWith("/lostandfound") || pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginURL = new URL("/login", origin);
      return NextResponse.redirect(loginURL);
    }
  }

  // Si ninguna condición aplica, deja continuar
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/lostandfound/:path*", "/login", "/register"],
};











