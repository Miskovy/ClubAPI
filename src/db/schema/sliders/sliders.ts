import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const sliders = mysqlTable("sliders", {
    id: varchar("id", { length: 36 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    status: boolean("status").notNull().default(true),
    arrange: int("arrange").notNull()
});