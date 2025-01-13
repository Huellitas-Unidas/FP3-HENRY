import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
const { pathname, origin } = request.nextUrl;

  if ((pathname === "/lostandfound") && !request.cookies.get("userData")?.value) {
    const routeURL = new NextURL("/protectedRoute", origin);
    return NextResponse.redirect(routeURL);
  }
else {
    return NextResponse.next();
} 
} 
 