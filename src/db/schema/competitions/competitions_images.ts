import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { competitions } from "./competitions.js";

export const competitions_images = mysqlTable("competitions_images", {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    image_path: text('image_path').notNull(),
    competition_id: varchar('competition_id', { length: 36 }).notNull().references(() => competitions.id),

});