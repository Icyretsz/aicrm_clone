import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: `${__dirname}/src/schemas/index.ts`,
  dialect: 'postgresql',
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.DATABASE_URL!,
  },
});
