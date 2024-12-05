import type { AppRouteHandler } from '../../libs/types';
import {
  AccessTokenRoute,
  OrganizationsRoute,
  AccessTokenResponseType,
  OrganizationReponseType,
  OrganizationFromIdRoute
} from './auth0.routes';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';
import { fetchAccessToken } from "./auth0.getAccessToken";

export const getAccessToken: AppRouteHandler<AccessTokenRoute> = async (c) => {
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

    const data: AccessTokenResponseType = await response.json();
    return c.json(data, HttpStatusCodes.OK);
  } catch (error) {
    console.error('Error fetching Auth0 token:', error);
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }
};

export const getOrganizations: AppRouteHandler<OrganizationsRoute> = async (c) => {
  const { access_token: accessToken } = await fetchAccessToken();

  try {
    const response = await fetch(`${process.env.AUTH0_M2M_AUDIENCE}organizations`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch organization list: ${response.statusText}`);
    }

    const data: OrganizationReponseType[] = await response.json();
    return c.json(data, HttpStatusCodes.OK);
  } catch (error) {
    console.error('Error fetching organization list:', error);
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }
};

export const getOrganizationFromId: AppRouteHandler<OrganizationFromIdRoute> = async (c) => {
  const { org_id } = c.req.param();
  const { access_token: accessToken } = await fetchAccessToken();
  try {
    const response = await fetch(`${process.env.AUTH0_M2M_AUDIENCE}organizations/${org_id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch organization: ${response.statusText}`);
    }

    const data: OrganizationReponseType = await response.json();
    return c.json(data, HttpStatusCodes.OK);
  } catch (error) {
    console.error('Error fetching organization:', error);
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }
};
