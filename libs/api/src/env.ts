import { z } from 'zod';

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default('dev'),
    PORT: z.coerce.number().default(9999),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'],
        message: "Must be set when NODE_ENV is 'production'",
      });
    }
  });

export type env = z.infer<typeof EnvSchema>;

const { data: envVar, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default envVar;