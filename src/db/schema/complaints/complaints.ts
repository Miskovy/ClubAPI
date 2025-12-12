import { mysqlTable, varchar, boolean, date } from 'drizzle-orm/mysql-core';
import { complaints_category } from './complaints_category.js';
import { users } from '../user/users.js';

export const complaints = mysqlTable('complaints', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    explain: varchar('explain', { length: 255 }).notNull(),
    seen: boolean('seen').default(false),
    category_id: varchar('category_id', { length: 36 }).notNull().references(() => complaints_category.id),
    user_id: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
    date: date('date').notNull(),
    status: boolean('status').notNull()
});
