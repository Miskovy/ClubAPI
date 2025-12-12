import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { sliders } from "./sliders.js";
export const slider_images = mysqlTable("slider_images", {
    id: varchar("id", { length: 36 }).primaryKey().notNull(),
    image_path: text("image_path").notNull(),
    slider_id: varchar("slider_id", { length: 36 }).notNull().references(() => sliders.id),
});