import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Define the list of routes that require ADMIN Authentication
  // These are the folders inside your (admin) folder
  const adminRoutes = [
    '/', // The main dashboard
    '/families',
    '/students',
    '/library-resources',
    '/quizzes',
    '/assignments',
    '/badges',
    '/fee-payments',
    '/student-progress',
    '/achievements',
  ];

  // Helper to check if the current path is an Admin route
  // We check if it matches exactly OR starts with it (e.g. /quizzes/1)
  const isAdminRoute = adminRoutes.some((route) => {
    if (route === '/') return pathname === '/'; // Exact match for root
    return pathname.startsWith(route);
  });

  // 2. Define Public Auth Routes (Admin Login)
  const isAuthRoute = pathname === '/login';

  // --- LOGIC ---

  // Scenario A: User is already logged in as Admin, but tries to go to Login page
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Scenario B: User tries to access an ADMIN route without a token
  if (isAdminRoute && !token) {
    // Redirect to admin login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Scenario C: Everything else (Family Links, Student Portal, etc.)
  // We let them pass! The specific pages (like Student Dashboard) will handle 
  // their own protection (e.g. checking localStorage) or just be public.
  return NextResponse.next();
}

export const config = {
  // Match everything except static files/images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};