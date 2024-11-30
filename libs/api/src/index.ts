import configureOpenAPI from './libs/configure-open-api';
import createApp from './libs/create-app';
import index from './routes/index.route';
import user from './routes/examples/users.index';
import auth0 from './routes/auth0/auth0.index';

const app = createApp().basePath('/api');

configureOpenAPI(app);

const routes = [index, auth0, user] as const;

routes.forEach((route) => {
  app.route('/', route);
});

export type AppType = (typeof routes)[number];
export * from './routes/auth0/auth0.routes'
export default app;
