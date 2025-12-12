import { mysqlTable, varchar, date, unique, datetime, mysqlEnum } from 'drizzle-orm/mysql-core';
import { users } from './users.js';
import { competitions } from '../competitions/competitions.js';

export const user_competition = mysqlTable('user_competition', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    user_id: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
    competition_id: varchar('competition_id', { length: 36 }).notNull().references(() => competitions.id),
    date_of_birth: date('date_of_birth').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    gender: mysqlEnum('gender', ['male', 'female']).notNull(),
}, (t) => ({
    uniqueUserCompetition: unique('unique_user_competition').on(t.user_id, t.competition_id),
}));
