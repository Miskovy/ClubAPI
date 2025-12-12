import { mysqlTable, varchar } from "drizzle-orm/mysql-core";


export const posts_category = mysqlTable('posts_category', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull()
});