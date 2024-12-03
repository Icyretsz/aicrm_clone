import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { getDomain } from '@aicrm/shared-utils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get('host');
  const session = await getSession(request, response);

  console.log('session', session);
  if (host) {
    const domain = getDomain(host);
    const segments = host.split('.');
    if (host.includes('localhost') ? segments.length > 1 : segments.length > 2) {
      if (!session && pathname !== '/main') {
        return NextResponse.redirect(
          process.env.NODE_ENV === 'production' ? `https://${host}/main` : `http://${host}/main`
        );
      } else if (session && segments[0] !== session.user.org_name) {
        return NextResponse.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://${domain}/error/401/unauthorized_org`
            : `http://${domain}/error/401/unauthorized_org`
        );
      } else if (session) {
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
