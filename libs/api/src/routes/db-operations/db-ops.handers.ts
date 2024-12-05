import type { AppRouteHandler } from '../../libs/types';
import { CreateDbRoute, createDbReponseType } from './db-ops.routes';
import * as HttpStatusCodes from 'stoker/http-status-codes';

export const createDb: AppRouteHandler<CreateDbRoute> = async (c) => {
  const body = c.req.valid('json');

  try {
    const response = await fetch(`${process.env.NEON_API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        authorization: `Bearer ${process.env.NEON_API_KEY}`,
      },
      body: JSON.stringify(
        body
      ),
    });

    if (!response.ok) {
      if (response.status === 409) {
        return c.json(
          {
            message: response.statusText,
          },
          HttpStatusCodes.CONFLICT
        );
      } else {
        throw new Error(`Unexpected error: ${response.status}, message: ${response.statusText}`);
      }
    }

    const data: createDbReponseType = await response.json();
    return c.json(data, HttpStatusCodes.CREATED);
  } catch (error) {
    console.error('Error creating database: ', error);
    return c.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error.',
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );

  }
};
