import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

export async function middleware(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname
  const host = request.headers.get('host');
  const session = await getSession(request, response);
  if (host) {
    const segments = host.split('.');
    if (host.includes('localhost') ? segments.length > 1 : segments.length > 2) {
      if (!session && pathname !== '/main') {
        return NextResponse.redirect(
          process.env.NODE_ENV === 'production' ? `https://${host}/main` : `http://${host}/main`
        );
      }
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
