import { initAuth0 } from '@auth0/nextjs-auth0';
import {NextRequest} from "next/server";
import { getHost, getDomain } from './shared-utils'

export const initializeAuth0 = (req : NextRequest): ReturnType<typeof initAuth0> => {
  const host = getHost()
  const domain = getDomain(host!)

  return initAuth0({
    baseURL: process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`,
    secret: process.env['AUTH0_SECRET'],
    issuerBaseURL: process.env['AUTH0_ISSUER_BASE_URL'],
    clientID: process.env['AUTH0_CLIENT_ID'],
    clientSecret: process.env['AUTH0_CLIENT_SECRET'],
    transactionCookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? `.${domain}` : undefined,
    },
    session: {
      cookie: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? `.${domain}` : undefined,
      },
    },
  });
};

export default initializeAuth0
