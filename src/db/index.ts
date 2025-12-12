import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = createPool({
    uri: process.env.DATABASE_URL!
});

export const db = drizzle(pool);
export default db;