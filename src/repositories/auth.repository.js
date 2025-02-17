import prisma from "../config/prisma.js";

export const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user;
}

export const createUser = async (name, email, password) => {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            username: email,
            password
        }
    });
    return user;
}
