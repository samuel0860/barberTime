import UsuarioService from '../services/usuarioService.js';
import { 
  criarUsuarioValidation, 
  atualizarUsuarioValidation 
} from '../validations/usuarioValidation.js';

const UsuarioController = {
  // Criar usuário
  criar: async (req, res, next) => {
    try {
      const dados = criarUsuarioValidation.parse(req.body);
      const usuario = await UsuarioService.criar(dados);
      
      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: usuario
      });
    } catch (error) {
      next(error);
    }
  },

  // Listar usuários
  listar: async (req, res, next) => {
    try {
      const { page = 1, perPage = 10 } = req.query;
      const resultado = await UsuarioService.listar(
        req.usuario, 
        Number(page), 
        Number(perPage)
      );
      
      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  },

  // Buscar usuário por ID
  buscarPorId: async (req, res, next) => {
    try {
      const usuario = await UsuarioService.buscarPorId(
        req.params.id, 
        req.usuario
      );
      
      return res.status(200).json({
        success: true,
        data: usuario
      });
    } catch (error) {
      next(error);
    }
  },

  // Atualizar usuário
  atualizar: async (req, res, next) => {
    try {
      const dados = atualizarUsuarioValidation.parse(req.body);
      const usuario = await UsuarioService.atualizar(
        req.params.id, 
        dados, 
        req.usuario
      );
      
      return res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuario
      });
    } catch (error) {
      next(error);
    }
  },

  // Deletar usuário
  deletar: async (req, res, next) => {
    try {
      await UsuarioService.deletar(req.params.id, req.usuario);
      
      return res.status(200).json({
        success: true,
        message: 'Usuário deletado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
};

export default UsuarioController;