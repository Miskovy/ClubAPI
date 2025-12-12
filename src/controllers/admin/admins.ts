import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { admins } from '../../db/schema/admin/admins.js';


export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const allAdmins = await db.select().from(admins);
        const sanitizedAdmins = allAdmins.map(({ hashed_password, ...admin }) => admin);
        res.status(200).json(sanitizedAdmins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAdminById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const [admin] = await db.select().from(admins).where(eq(admins.id, id));

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const { hashed_password, ...sanitizedAdmin } = admin;
        res.status(200).json(sanitizedAdmin);
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, phone_number, password } = req.body;

        if (!name || !email || !phone_number || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingAdmin = await db.select().from(admins).where(eq(admins.email, email));
        if (existingAdmin.length > 0) {
            return res.status(409).json({ message: 'Admin with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = randomUUID();

        const newAdmin = {
            id,
            name,
            email,
            phone_number,
            hashed_password: hashedPassword,
        };

        await db.insert(admins).values(newAdmin);

        const { hashed_password: _, ...sanitizedAdmin } = newAdmin;
        res.status(201).json(sanitizedAdmin);
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateAdmin = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, phone_number, password } = req.body;

        const [existingAdmin] = await db.select().from(admins).where(eq(admins.id, id));

        if (!existingAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (email && email !== existingAdmin.email) {
            const [emailCheck] = await db.select().from(admins).where(eq(admins.email, email));
            if (emailCheck) {
                return res.status(409).json({ message: 'Email already in use' });
            }
        }

        const updateData: Partial<typeof admins.$inferInsert> = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone_number) updateData.phone_number = phone_number;
        if (password) updateData.hashed_password = await bcrypt.hash(password, 10);

        await db.update(admins).set(updateData).where(eq(admins.id, id));

        const [updatedAdmin] = await db.select().from(admins).where(eq(admins.id, id));

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found after update' });
        }

        const { hashed_password, ...sanitizedAdmin } = updatedAdmin;

        res.status(200).json(sanitizedAdmin);
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteAdmin = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        await db.delete(admins).where(eq(admins.id, id));
        res.status(200).json({ message: 'Admin deleted' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};