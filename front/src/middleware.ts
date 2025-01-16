import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import{jwtDecode} from "jwt-decode"; // Decodifica el token JWT

// Middleware principal
export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Obtener el token de las cookies
  const userToken = request.cookies.get("token")?.value;

  try {
<<<<<<< HEAD
    // Si no hay token, redirige a login para rutas protegidas
    if (
      !userToken &&
      (pathname.startsWith("/admin") || pathname.startsWith("/lostandfound"))
    ) {
      const loginURL = new URL("/login", origin);
      return NextResponse.redirect(loginURL);
=======
    // Si no hay token, redirige a login o protectedRoute para rutas específicas
    if (!userToken) {
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", origin));
      }
      if (pathname.startsWith("/lostandfound")) {
        return NextResponse.redirect(new URL("/protectedRoute", origin));
      }
>>>>>>> 34dfcdb61b0565aa9dd75fb4099c8e4b11fb5b10
    }

    // Si hay un token, decodificarlo para obtener el rol
    if (userToken) {
      const decodedToken = jwtDecode<{ role: string }>(userToken);
      const userRole = decodedToken?.role?.toUpperCase();

      // Redirige a login si un usuario intenta acceder a rutas de admin
      if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", origin));
      }

      // Redirige a protectedRoute si un usuario que no es admin intenta acceder a lostandfound
      if (pathname.startsWith("/lostandfound") && userRole !== "USER" && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/protectedRoute", origin));
      }

      // Evita que usuarios logueados accedan a login o register
      if ((pathname === "/login" || pathname === "/register") && userToken) {
        const dashboardURL = userRole === "ADMIN" ? "/admin" : "/";
        return NextResponse.redirect(new URL(dashboardURL, origin));
      }
    }
  } catch (error) {
    console.error("Error en el middleware:", error);

    // Si ocurre un error, redirige al login
    return NextResponse.redirect(new URL("/login", origin));
  }

  // Si ninguna condición aplica, deja continuar
  return NextResponse.next();
}

// Configuración para definir las rutas protegidas
export const config = {
  matcher: ["/admin/:path*", "/lostandfound/:path*", "/login", "/register"],
};
<<<<<<< HEAD
=======

>>>>>>> 34dfcdb61b0565aa9dd75fb4099c8e4b11fb5b10
