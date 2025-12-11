import AuthService from '../services/authService.js';
import { loginValidation, registerValidation } from '../validations/authValidation.js';

const AuthController = {
  login: async (req, res) => {
    try {
      // Validar dados de entrada
      const dados = loginValidation.parse(req.body);

      // Fazer login
      const resultado = await AuthService.login(dados.email, dados.senha);

      return res.status(200).json({
        message: 'Login realizado com sucesso',
        ...resultado
      });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors
        });
      }

      return res.status(401).json({
        error: error.message
      });
    }
  },

  register: async (req, res) => {
    try {
      // Validar dados de entrada
      const dados = registerValidation.parse(req.body);

      // Registrar usuário
      const resultado = await AuthService.register(dados);

      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso',
        ...resultado
      });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors
        });
      }

      return res.status(400).json({
        error: error.message
      });
    }
  },

  me: async (req, res) => {
    try {
      // req.usuario vem do middleware de autenticação
      return res.status(200).json(req.usuario);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao buscar dados do usuário'
      });
    }
  }
};

export default AuthController;