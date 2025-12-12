import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const email_verifications = mysqlTable('email_verifications', {
    user_id: varchar('user_id', { length: 36 }).primaryKey().notNull(),
    code: varchar('code', { length: 6 }).notNull(),
    created_at: timestamp('created_at').defaultNow()
});