import { apiReference } from '@scalar/hono-api-reference';

import type { AppOpenAPI } from './types';

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '0.0.1',
      title: 'AI CRM API',
    },
  });

  app.get(
    '/reference',
    apiReference({
      theme: 'kepler',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/api/doc',
      },
    })
  );
}
