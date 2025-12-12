import { mysqlTable, varchar, text, date } from 'drizzle-orm/mysql-core';

export const competitions = mysqlTable('competitions', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    start_date: date('start_date').notNull(),
    end_date: date('end_date').notNull(),
    main_image_path: text('main_image_path').notNull()
});
