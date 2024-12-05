import configureOpenAPI from './libs/configure-open-api';
import createApp from './libs/create-app';
import index from './routes/index.route';
import user from './routes/examples/users.index';
import auth0 from './routes/auth0/auth0.index';
import database from './routes/db-operations/db-ops.index'
import { cors } from 'hono/cors';

const app = createApp().basePath('/api')
app.use('*', cors())

configureOpenAPI(app);

const routes = [index, auth0, user, database] as const;

routes.forEach((route) => {
  app.route('/', route);
});

export type AppType = (typeof routes)[number];
export * from './routes/auth0/auth0.routes'
export * from './routes/db-operations/db-ops.routes'
export default app;
