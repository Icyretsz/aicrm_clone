import { createRouter } from '../../libs/create-app';

import * as handlers from './auth0.handlers';
import * as routes from './auth0.routes';

const router = createRouter()
  .openapi(routes.accessToken, handlers.getAccessToken)
  .openapi(routes.organizations, handlers.getOrganizations)
  .openapi(routes.organizationFromId, handlers.getOrganizationFromId)


export default router;
