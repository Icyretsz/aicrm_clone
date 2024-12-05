import { hc } from "hono/client"

import { AppType } from '@aicrm/api';

export const client = hc<AppType>('http://localhost:3002/api/')
