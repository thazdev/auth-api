import { registerUser, loginUser } from "../services/auth.service.js";

// Função que controla o registro de usuários
export const register = async (req, res) => {
    try {
        // Pega os dados que o usuário enviou
        const {name, email, password} = req.body;
        
        // Chama o serviço de registro e aguarda o resultado
        const user = await registerUser(name, email, password) 
        
        // Se deu certo, retorna os dados do usuário
        res.status(201).json(user)
    } catch (error) {
        // Se deu erro, avisa o que aconteceu
        res.status(500).json({message: error.message})
    }
} 

// Função que controla o login
export const login = async (req, res) => {
    try {
        // Pega o email e senha que o usuário enviou
        const {email, password} = req.body;
        
        // Tenta fazer o login
        const user = await loginUser(email, password)
        
        // Se deu certo, retorna os dados e o token
        res.status(200).json(user)
    } catch (error) {
        // Se deu erro, avisa o que aconteceu
        res.status(500).json({message: error.message})
    }
}
