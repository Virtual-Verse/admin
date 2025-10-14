import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // 1. Get the token from the user's cookies
  const token = request.cookies.get('auth-token')?.value;

  // 2. Get the requested URL's pathname
  const { pathname } = request.nextUrl;

  // 3. Define public and protected paths
  const isPublicPath = pathname === '/login';

  // 4. Redirect logic
  // If the user is trying to access a public path but they ARE logged in,
  // redirect them to the dashboard home.
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is trying to access a protected path but they are NOT logged in,
  // redirect them to the login page.
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 5. If none of the above, let them proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // This matcher ensures the middleware runs on all paths EXCEPT for
  // static assets like images or Next.js-specific files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};