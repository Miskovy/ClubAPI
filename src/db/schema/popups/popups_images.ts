import { date, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";


export const popups_images = mysqlTable('popups_images', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    image_path: varchar('image_path', { length: 255 }).notNull(),
    start_date: date('start_date').notNull(),
    end_date: date('end_date').notNull(),
    status: mysqlEnum('status', ['active', 'disabled']).notNull().default('active'),
    title: varchar('title', { length: 255 }).notNull()
});