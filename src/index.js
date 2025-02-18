// Importa as ferramentas que vamos usar
import express from "express";      // Framework para criar o servidor
import cors from "cors";           // Permite que outros sites acessem nossa API
import dotenv from "dotenv";       // Para usar variáveis de ambiente
import authRoutes from "./routes/auth.routes.js";  // Nossas rotas de autenticação

// Configura as variáveis de ambiente
dotenv.config();

// Cria nosso servidor
const app = express();

// Configura o servidor para:
app.use(cors());           // Aceitar requisições de outros sites
app.use(express.json());   // Entender quando enviamos JSON

// Define que todas as rotas de autenticação começam com /api/auth
app.use("/api/auth", authRoutes);

// Define a porta onde o servidor vai rodar
const PORT = process.env.PORT || 3000;

// Rota simples de teste
app.get("/teste-direto", (req, res) => {
    res.json({ message: "Rota de teste funcionando!" });
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));