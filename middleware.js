import { NextResponse } from 'next/server'

const protectedRoutes = ['/', '/chat*', '/projects*', '/teams*']
const publicRoutes = ['/login', "/register"]

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/google') || pathname.startsWith('/bing')) {
    return NextResponse.next();
  }

  // Skip middleware for public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get cookies from the request
  const username = request.cookies.get('username')?.value;

  // If no username cookie is found, redirect to login
  if (!username && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If username exists and user tries to get to "/login", redirect to home
  if (username && pathname === '/login') {
    return NextResponse.redirect(new URL('/teams', request.url));
  }
  
    // If username exists and user tries to get to "/login", redirect to home
    if (username && pathname === '/register') {
      return NextResponse.redirect(new URL('/teams', request.url));
    }

    if (username && pathname === "/") {
      return NextResponse.redirect(new URL('/teams', request.url));
    }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$|google.*\\.html|bing.*\\.html).*)',
  ],
};