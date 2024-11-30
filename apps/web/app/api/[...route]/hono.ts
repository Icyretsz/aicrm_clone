import { hc } from "hono/client"

import { AppType } from '@aicrm/api';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:3000';

export const client = hc<AppType>(`${baseURL}/api/`)
