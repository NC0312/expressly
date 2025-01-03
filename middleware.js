// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get environment variable
  const env = process.env.NEXT_PUBLIC_ENV
  
  // Define protected routes
  const protectedRoutes = ['/our-members-panel']
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  // If it's production and trying to access protected route, redirect to 404
  if (env === 'production' && isProtectedRoute) {
    return NextResponse.rewrite(new URL('/404', request.url))
  }
  
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/our-members-panel/:path*',
  ]
}