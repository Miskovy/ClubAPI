import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { users } from './users.js';
import { votes } from '../votes/votes.js';

export const user_votes = mysqlTable('user_votes', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    user_id: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
    vote_id: varchar('vote_id', { length: 36 }).notNull().references(() => votes.id)
});
