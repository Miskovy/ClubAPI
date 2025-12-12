import { mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';
import { posts } from './posts.js';

export const posts_images = mysqlTable('posts_images', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    image_path: text('image_path').notNull(),
    post_id: varchar('post_id', { length: 36 }).notNull().references(() => posts.id)
});
