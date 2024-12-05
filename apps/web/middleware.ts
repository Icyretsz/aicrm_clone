import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getSession, withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export const getDomain = (host: string, needPort? : boolean) => {
  if (!host) return null;

  const cleanHost = host.split('/')[0];

  const segments = cleanHost.split('.');

  if (cleanHost.includes('localhost') && !needPort) {
    return 'localhost';
  } else if (cleanHost.includes('localhost') && needPort) {
    return 'localhost:3002'
  }

  return segments.slice(-2).join('.');
};

export default withMiddlewareAuthRequired( async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get('host');
  const session = await getSession(request, response);

  if (host) {
    const domain = getDomain(host, true);
    const segments = host.split('.');
    if (host.includes('localhost') ? segments.length > 1 : segments.length > 2) {
      if ((!session && pathname !== '/main') || (session && pathname !== '/main')) {
        return NextResponse.redirect(
          process.env.NODE_ENV === 'production' ? `https://${host}/main` : `http://${host}/main`
        );
      } else if (session && segments[0] !== session.user.org_name) {
        return NextResponse.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://${domain}/error/401/unauthorized_org`
            : `http://${domain}/error/401/unauthorized_org`
        );
      }
    } else if (pathname === '/main') {
      return NextResponse.redirect(
        process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`
      );
    } else {
      return NextResponse.next()
    }
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
