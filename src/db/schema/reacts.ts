import { mysqlTable, varchar, boolean, unique } from 'drizzle-orm/mysql-core';
import { users } from './user/users.js';
import { posts } from './posts/posts.js';

export const reacts = mysqlTable('reacts', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    user_id: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
    post_id: varchar('post_id', { length: 36 }).notNull().references(() => posts.id),
    status: boolean('status').notNull().default(true)
}, (t) => ({
    uniqueUserPostReact: unique('unique_user_post_react').on(t.user_id, t.post_id)
}));
