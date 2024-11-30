import { AccessTokenResponseType} from "./auth0.routes";

export const fetchAccessToken = async (): Promise<AccessTokenResponseType> => {
  try {
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_M2M_CLIENT_ID,
        client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
        audience: process.env.AUTH0_M2M_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Auth0 token: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Auth0 token:', error);
    throw error; // Allow the error to propagate
  }
};
