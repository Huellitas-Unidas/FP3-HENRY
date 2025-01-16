/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Decodifica el token JWT

// Middleware principal
export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Obtener el token de las cookies
  const userToken = request.cookies.get("token")?.value;

  try {
    // Si no hay token, redirige a login para rutas protegidas
    if (!userToken && (pathname.startsWith("/admin") || pathname.startsWith("/lostandfound"))) {
      const loginURL = new URL("/login", origin);
      return NextResponse.redirect(loginURL);
    }

    // Si hay un token, decodificarlo para obtener el rol
    if (userToken) {
      const decodedToken = jwtDecode<{ role: string }>(userToken);
      const userRole = decodedToken?.role?.toUpperCase();

      // Verificar acceso al panel de administración
      if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
        const forbiddenURL = new URL("/login", origin); // Redirige al dashboard del usuario
        return NextResponse.redirect(forbiddenURL);
      }

      // Verificar acceso a rutas de usuarios (como lostandfound)
      if (pathname.startsWith("/lostandfound") && userRole !== "USER") {
        const forbiddenURL = new URL("/protectedRoute", origin); // Redirige al dashboard del usuario
        return NextResponse.redirect(forbiddenURL);
      }

      // Evitar acceso a login o register si el usuario ya está autenticado
      if ((pathname === "/login" || pathname === "/register") && userToken) {
        const dashboardURL = userRole === "ADMIN" ? "/admin" : "/"; // Redirige según el rol
        return NextResponse.redirect(new URL(dashboardURL, origin));
      }
    }
  } catch (error) {
    console.error("Error en el middleware:", error);

    // Si ocurre un error, redirige al login
    const loginURL = new URL("/login", origin);
    return NextResponse.redirect(loginURL);
  }

  // Si ninguna condición aplica, deja continuar
  return NextResponse.next();
}

// Configuración para definir las rutas protegidas
export const config = {
  matcher: ["/admin/:path*", "/lostandfound/:path*", "/login", "/register"],
};


