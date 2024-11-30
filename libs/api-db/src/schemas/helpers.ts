import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};
// createdAt: ('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
// updatedAt: integer('updated_at', { mode: 'timestamp' })
//   .$defaultFn(() => new Date())
//   .$onUpdate(() => new Date()),
