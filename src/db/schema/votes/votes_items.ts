import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { votes } from "./votes.js";

export const votes_items = mysqlTable('votes_items', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    vote_id: varchar('vote_id', { length: 36 }).notNull().references(() => votes.id),
    item: varchar('item', { length: 255 }).notNull(),
});
