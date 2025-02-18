// DEPENDÊNCIAS EXPLICADAS:
// express: Framework para criar o servidor e rotas
// auth.controller: Tem as funções de registro e login
// auth.middleware: Verifica se o usuário está logado

import express from "express";                                                    // Importa o framework Express
import { login, register } from "../controllers/auth.controller.js";             // Importa funções de login e registro
import authMiddleware from "../middleware/auth.middleware.js";                    // Importa verificador de login

const router = express.Router();                                                 // Cria o roteador do Express

router.post("/register", register);                                             // Rota para criar conta nova (POST /api/auth/register)

router.post("/login", login);                                                   // Rota para fazer login (POST /api/auth/login)

router.get("/teste", authMiddleware, (req, res) => {                           // Rota protegida que só funciona logado
    res.json({                                                                 // Retorna uma mensagem de sucesso
        message: "Se você ver essa mensagem, o middleware de autenticação está funcionando!",
        userId: req.userId                                                     // Mostra o ID do usuário logado
    })
});

export default router;                                                          // Exporta as rotas para usar no index.js
