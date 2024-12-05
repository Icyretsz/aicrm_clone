import { createRouter } from '../../libs/create-app';

import * as handlers from './db-ops.handers';
import * as routes from './db-ops.routes';

const router = createRouter().openapi(routes.createDb, handlers.createDb);

export default router;
