import { mysqlTable, varchar, text, timestamp, mysqlEnum, date, unique, boolean } from 'drizzle-orm/mysql-core';

export const role = mysqlEnum('role', ['member', 'guest']);

export const users = mysqlTable('users', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    phone_number: varchar('phone_number', { length: 11 }).notNull(),
    role: role.notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    purpose: text('purpose'),
    image_path: text('image_path'),
    date_of_birth: date('date_of_birth').notNull(),
    status: mysqlEnum('status', ['pending', 'approved', 'rejected']).notNull().default('pending'),
    hashed_password: varchar('hashed_password', { length: 255 }).notNull(),
    fcmtoken: varchar('fcmtoken', { length: 255 }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow().onUpdateNow()
}, (t) => ({
    emailUnique: unique('users_email_unique').on(t.email),
    isVerified: boolean('is_verified').notNull().default(false),
    rejection_reason: text('rejection_reason'),
    start_membership_date: date('start_membership_date').notNull(),
    end_membership_date: date('end_membership_date').notNull()
}));