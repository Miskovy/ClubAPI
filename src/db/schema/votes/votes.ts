import { date, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const votes = mysqlTable('votes', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    max_selections: int('max_selections').notNull(),
    start_date: date('start_date').notNull(),
    end_date: date('end_date').notNull()
});