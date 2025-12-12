import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";


export const complaints_category = mysqlTable('complaints_category', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull()
});