import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export const hashPassword = (pw: string) => bcrypt.hash(pw, 10);
export const comparePassword = (pw: string, hash: string) => bcrypt.compare(pw, hash);

export const signToken = (payload: object) => jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });
export const verifyJwt = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string);