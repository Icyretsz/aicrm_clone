import { AppRouteHandlerFnContext, CallbackHandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { initializeAuth0, getOrg, getHost, getDomain } from '@aicrm/shared-utils';
import { NextRequest, NextResponse } from 'next/server';
import {createDb} from "../../../features/auth/hooks/useCreateDb";

export const GET = (req: NextRequest, res: NextResponse) => {
  const auth0 = initializeAuth0(req);
  return auth0.handleAuth({
    async login(req: NextApiRequest, res: NextApiResponse) {
      const host = getHost();
      if (host) {
        const orgName = getOrg(host);
        if (orgName) {
          return await auth0.handleLogin(req, res, {
            authorizationParams: { organization: `${orgName}` },
          });
        }
        return await auth0.handleLogin(req, res);
      }
    },
    async callback(req: NextRequest, ctx: AppRouteHandlerFnContext) {
      const host = getHost();
      if (host) {
        try {
          const res = (await auth0.handleCallback(req, ctx)) as NextResponse;
          const session = await auth0.getSession(req, res);
          const orgName = getOrg(host);
          if (session) {
            if (orgName) {
              return NextResponse.redirect(
                process.env.NODE_ENV === 'production'
                  ? `https://${host}/main`
                  : `http://${host}/main`,
                res
              );
            } else if (session.user.org_name_initial) {
              await createDb(session.user.org_name_initial)
              return NextResponse.redirect(
                process.env.NODE_ENV === 'production'
                  ? `https://${session.user.org_name_initial}.${host}/main`
                  : `http://${session.user.org_name_initial}.${host}/main`
              );
            } else if (session.user.org_name) {
              return NextResponse.redirect(
                process.env.NODE_ENV === 'production'
                  ? `https://${session.user.org_name}.${host}/main`
                  : `http://${session.user.org_name}.${host}/main`,
                res
              );
            } else {
              return NextResponse.redirect(
                process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`,
                res
              );
            }
          } else {
            return NextResponse.redirect(
              process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`,
              res
            );
          }
        } catch (error) {
          const domain = getDomain(host, true);
          if (error instanceof CallbackHandlerError) {
            return NextResponse.redirect(
              process.env.NODE_ENV === 'production'
                ? `https://${domain}/error/${error.status}/${error.cause?.message}`
                : `http://${domain}/error/${error.status}/${error.cause?.message}`
            );
          } else {
            return NextResponse.redirect(
              process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`,
              res
            );
          }
        }
      } else {
        return NextResponse.redirect(
          process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`,
          res
        );
      }
    },
  })(req, res);
};
