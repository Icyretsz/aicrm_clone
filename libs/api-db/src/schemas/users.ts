import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { timestamps } from './helpers';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  ...timestamps,
});

export const selectUsersSchema = createSelectSchema(users);

export const insertUsersSchema = createInsertSchema(users, {
  name: (schema) => schema.name.min(1).max(500),
})
  .required({
    name: true,
  })
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
  });

export const patchUsersSchema = insertUsersSchema.partial();
