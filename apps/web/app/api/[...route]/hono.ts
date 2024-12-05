import { hc } from "hono/client"

import { AppType } from '@aicrm/api';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://aicrm.club' : 'http://localhost:3002'

export const client = hc<AppType>(`${baseURL}/api/`)
