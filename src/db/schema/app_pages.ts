import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';


export const app_pages = mysqlTable('app_pages', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull()
});