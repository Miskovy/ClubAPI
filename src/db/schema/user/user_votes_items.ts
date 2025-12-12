import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { user_votes } from './user_votes.js';

export const user_votes_items = mysqlTable('user_votes_items', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    user_vote_id: varchar('user_vote_id', { length: 36 }).notNull().references(() => user_votes.id),
    item: varchar('item', { length: 255 }).notNull()
});
