import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';
import { notFoundSchema } from '../../libs/constants';

const tags = ['auth0', 'managementAPI']

const accessTokenResponseSchema = z.object({
  access_token: z.string(),
  scope: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
})

const organizationAPIResponseSchema =
  z.object({
    id: z.string(),
    name: z.string(),
    display_name: z.string(),
    branding: z.object({
      logo_url: z.string(),
    })
  })


export const accessToken = createRoute({
  path: '/getAccessToken',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(accessTokenResponseSchema, 'The access token object.'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'The access token not found/ cannot be fetched.'),
  },

});

export const organizations = createRoute({
  path: '/organizations',
  method: 'get',
  tags: [...tags, 'organizations'],
  headers: {
    authorization: {
      type: 'string',
      required: true,
      description: 'Bearer token for authorization',
      example: 'Bearer <token>',
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(organizationAPIResponseSchema), 'The organization list object.'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Organizations not found/ cannot be fetched.'),
  }
});

export const organizationFromId = createRoute({
  path: '/organizationFromId/:org_id',
  method: 'get',
  tags: [...tags, 'organization'],
  headers: {
    authorization: {
      type: 'string',
      required: true,
      description: 'Bearer token for authorization',
      example: 'Bearer <token>',
    }
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(organizationAPIResponseSchema, 'The organization object.'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Organization not found/ cannot be fetched.'),
  }
})

export type AccessTokenRoute = typeof accessToken
export type OrganizationsRoute = typeof organizations
export type OrganizationFromIdRoute = typeof organizationFromId

export type AccessTokenResponseType = z.infer<typeof accessTokenResponseSchema>
export type OrganizationReponseType = z.infer<typeof organizationAPIResponseSchema>
