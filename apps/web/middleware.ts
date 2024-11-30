import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get('host');
  if (host) {
    const segments = host.split('.');
    if (host.includes('localhost') ? segments.length > 1 : segments.length > 2) {
      const orgName = segments[0];
      if (pathname === '/') {
        return NextResponse.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://${host}/${orgName}`
            : `http://${host}/${orgName}`
        );
      }
    } else if (pathname !== '/') {
      return NextResponse.redirect(
        process.env.NODE_ENV === 'production'
          ? `https://${pathname}.${host}/${pathname}`
          : `http://${pathname}.${host}/${pathname}`
      );
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
