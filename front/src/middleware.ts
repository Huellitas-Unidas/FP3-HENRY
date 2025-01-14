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

  // Decodificar el token para obtener el rol del usuario
  const userData = userToken ? decodeToken(userToken) : null;

  // No logueado: manejo de rutas protegidas
  if (!userToken) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", origin));
    }

    if (pathname.startsWith("/lostandfound")) {
      return NextResponse.redirect(new URL("/protectedRoute", origin));
    }
  }

  // Validación para Admin
  if (pathname.startsWith("/admin") && (!userData || userData.role !== "admin")) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Usuarios logueados no pueden acceder a /login o /register
  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    userToken
  ) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/lostandfound/:path*", "/login", "/register"],
};






