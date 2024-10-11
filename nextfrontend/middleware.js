import { NextResponse } from 'next/server'
// import { decrypt } from '@/app/lib/session'
// import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/', '/chat*', '/projects*', '/teams*']
const publicRoutes = ['/login']
 
// export default async function middleware(req) {
//   // 2. Check if the current route is protected or public
//   const path = req.nextUrl.pathname
//   const isProtectedRoute = protectedRoutes.includes(path)
//   const isPublicRoute = publicRoutes.includes(path)
 
//   // 3. Decrypt the session from the cookie
//   const cookie = cookies().get('session')?.value
//   const session = await decrypt(cookie)
 
//   // 5. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL('/login', req.nextUrl))
//   }
 
//   // 6. Redirect to /dashboard if the user is authenticated
//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith('/login')
//   ) {
//     return NextResponse.redirect(new URL('/', req.nextUrl))
//   }
 
//   return NextResponse.next()
// }

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get cookies from the request
  const username = request.cookies.get('username')?.value;

  // If no username cookie is found, redirect to login
  if (!username) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If username exists and user tries to get to "/login" redirect
  // to home
  if(username && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is logged in, continue with the request
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}