import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../repositories/auth.repository.js";

export const registerUser = async (name, email, password) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("Email já cadastrado!")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await createUser(name, email, hashedPassword)
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Usuário não encontrado")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error("Credenciais inválidas")
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token };
}
