import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { popups_images } from './popups_images.js';
import { app_pages } from '../app_pages.js';

export const popups_pages = mysqlTable('popups_pages', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    image_id: varchar('image_id', { length: 36 }).notNull().references(() => popups_images.id),
    page_id: varchar('page_id', { length: 36 }).notNull().references(() => app_pages.id)
});
