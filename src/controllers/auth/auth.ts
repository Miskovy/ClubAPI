import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/user/users.js";
import { admins } from "../../db/schema/admin/admins.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

export const Register = async (req: Request<{ email: string }>, res: Response) => {
    try {
        // Name , Email , phone_number , password , date_of_birth as input
        const { name, email, phone_number, password, date_of_birth, purpose } = req.body;
        // check if user already exists

        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (user) {
            return res.status(400).json({ message: "User already exists, Try Logging In" });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = randomUUID();
        const newUser = {
            id,
            name,
            email,
            phone_number,
            hashed_password: hashedPassword,
            date_of_birth,
            role: "member" as const,
            created_at: new Date(),
            updated_at: new Date(),
            purpose,
            image_path: "",
            status: "pending" as const,
            fcmtoken: ""
        };
        await db.insert(users).values(newUser);
        const { hashed_password: _, ...sanitizedUser } = newUser;
        return res.status(201).json(sanitizedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const Login = async (req: Request<{ email: string }>, res: Response) => {
    try {
        const { email, password } = req.body;
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        const { hashed_password: _, ...sanitizedUser } = user;
        return res.status(200).json({ ...sanitizedUser, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const adminLogin = async (req: Request<{ email: string }>, res: Response) => {
    try {
        const { email, password } = req.body;
        const [user] = await db.select().from(admins).where(eq(admins.email, email));
        if (!user) {
            return res.status(400).json({ message: "Admin not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        const { hashed_password: _, ...sanitizedUser } = user;
        return res.status(200).json({ ...sanitizedUser, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};