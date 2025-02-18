// Importa a ferramenta para verificar tokens
import jwt from "jsonwebtoken";

// Função que verifica se o usuário está logado
const authMiddleware = (req, res, next) => {
    try {
        // Pega o token do cabeçalho da requisição
        const token = req.headers.authorization.split(" ")[1]
        
        // Verifica se mandaram um token
        if(!token) {
            return res.status(401).json({message: "Token não fornecido"})
        }

        // Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Guarda o ID do usuário para usar depois
        req.userId = decoded.userId
        
        // Deixa a requisição continuar
        next();
    } catch (error) {
        // Se o token for inválido, retorna erro
        return res.status(401).json({message: "Token inválido"})
    }
}

// Exporta o middleware para usar nas rotas
export default authMiddleware;