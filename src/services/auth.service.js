import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../repositories/auth.repository.js";

// Função para registrar um novo usuário
export const registerUser = async (name, email, password) => {
    // Verifica se já existe um usuário com este email
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("Email já cadastrado!")
    }
    
    // Criptografa a senha do usuário (salt = 10)
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Cria um novo usuário no banco de dados
    const newUser = await createUser(name, email, hashedPassword)
    
    // Remove a senha do objeto antes de retornar
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

// Função para autenticar um usuário existente
export const loginUser = async (email, password) => {
    // Busca o usuário pelo email
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Usuário não encontrado")
    }
    
    // Verifica se a senha fornecida corresponde à senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error("Credenciais inválidas")
    }
    
    // Gera um token JWT válido por 1 hora
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    
    // Remove a senha do objeto antes de retornar
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token };
}

