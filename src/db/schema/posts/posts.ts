import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { posts_category } from './posts_category.js';

export const posts = mysqlTable('posts', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    category_id: varchar('category_id', { length: 36 }).notNull().references(() => posts_category.id)
});

