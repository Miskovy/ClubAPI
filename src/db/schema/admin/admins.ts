import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const admins = mysqlTable('admins', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    phone_number: varchar('phone_number', { length: 11 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    hashed_password: varchar('hashed_password', { length: 255 }).notNull(),
});