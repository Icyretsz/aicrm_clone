import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import {conflictSchema, internalErrorSchema, unauthorizedUserSchema} from '../../libs/constants';

const tags = ['database', 'organization'];

const createDbResponseSchema = z.object({
  database: z.object({
    id: z.string(),
    branch_id: z.string(),
    name: z.string(),
    owner_name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  operations: z.object({
    id: z.string(),
    project_id: z.string(),
    branch_id: z.string(),
    endpoint_id: z.string(),
    action: z.string(),
    status: z.string(),
    failures_count: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    total_duration_ms: z.number(),
  }),
});

const createDbBodySchema = z.object({
  database: z.object({
    name: z.string(),
    owner_name: z.string(),
  }),
});

export const createDb = createRoute({
  path: '/createDb',
  method: 'post',
  tags,
  headers: {
    accept: 'string',
    'content-type': 'string',
    authorization: `Bearer <token>`,
  },
  request: {
    body: jsonContentRequired(createDbBodySchema, 'The name and owner of the database.'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      createDbResponseSchema,
      'The response contain the created database object.'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(internalErrorSchema, 'Internal server error.'),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(unauthorizedUserSchema, 'User unauthorized.'),
    [HttpStatusCodes.CONFLICT]: jsonContent(conflictSchema, 'Duplicate database name.')
  },
});

export type CreateDbRoute = typeof createDb;

export type createDbReponseType = z.infer<typeof createDbResponseSchema>;
