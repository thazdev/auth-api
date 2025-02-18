// Importa o prisma que é nossa ferramenta para mexer com o banco de dados
import prisma from "../config/prisma.js";

// Função para procurar um usuário pelo email dele
export const findUserByEmail = async (email) => {
    // É como procurar uma pessoa numa lista usando o email dela
    const user = await prisma.user.findUnique({
        where: {
            email  // Procura onde o email é igual ao que recebemos
        }
    })
    return user;  // Devolve o usuário que encontrou (ou null se não achou)
}

// Função para criar um usuário novo
export const createUser = async (name, email, password) => {
    // É como preencher uma ficha com dados de uma pessoa nova
    const user = await prisma.user.create({
        data: {
            name,            // Nome da pessoa
            email,          // Email dela (unico)
            username: email, // Username será igual ao email
            password        // Senha (já criptografada)
        }
    });
    return user;  // Devolve o usuário que acabou de criar
}
   