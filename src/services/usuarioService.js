import bcrypt from 'bcrypt';
import UsuarioRepository from '../repositories/usuarioRepository.js';

const UsuarioService = {
  // Criar usuário
  criar: async (dados) => {
    // Verificar se email já existe
    const usuarioExistente = await UsuarioRepository.buscarPorEmail(dados.email);
    
    if (usuarioExistente) {
      const error = new Error('Email já cadastrado');
      error.statusCode = 409;
      throw error;
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    // Criar usuário
    return UsuarioRepository.criar({
      ...dados,
      senha: senhaHash
    });
  },

  // Listar usuários (apenas ADMIN pode ver todos)
  listar: async (user, page = 1, perPage = 10) => {
    // Se não for ADMIN, só pode ver seus próprios dados
    if (user.tipo !== 'ADMIN') {
      const error = new Error('Apenas administradores podem listar usuários');
      error.statusCode = 403;
      throw error;
    }

    const skip = (page - 1) * perPage;
    
    const usuarios = await UsuarioRepository.listar(skip, perPage);
    const total = await UsuarioRepository.contar();

    return {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
      data: usuarios
    };
  },

  // Buscar usuário por ID
  buscarPorId: async (id, user) => {
    // Usuário só pode ver seus próprios dados, a menos que seja ADMIN
    if (user.tipo !== 'ADMIN' && user.id !== id) {
      const error = new Error('Você não tem permissão para acessar estes dados');
      error.statusCode = 403;
      throw error;
    }

    const usuario = await UsuarioRepository.buscarPorId(id);
    
    if (!usuario) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return usuario;
  },

  // Atualizar usuário
  atualizar: async (id, dados, user) => {
    // Usuário só pode atualizar seus próprios dados, a menos que seja ADMIN
    if (user.tipo !== 'ADMIN' && user.id !== id) {
      const error = new Error('Você não tem permissão para atualizar estes dados');
      error.statusCode = 403;
      throw error;
    }

    // Verificar se usuário existe
    const usuarioExistente = await UsuarioRepository.buscarPorId(id);
    
    if (!usuarioExistente) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    // Se está atualizando senha, fazer hash
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    // Remove campos undefined
    const dadosLimpos = Object.fromEntries(
      Object.entries(dados).filter(([_, v]) => v !== undefined)
    );

    return UsuarioRepository.atualizar(id, dadosLimpos);
  },

  // Deletar usuário (soft delete)
  deletar: async (id, user) => {
    // Apenas ADMIN pode deletar usuários
    if (user.tipo !== 'ADMIN') {
      const error = new Error('Apenas administradores podem deletar usuários');
      error.statusCode = 403;
      throw error;
    }

    // Verificar se usuário existe
    const usuarioExistente = await UsuarioRepository.buscarPorId(id);
    
    if (!usuarioExistente) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return UsuarioRepository.deletar(id);
  }
};

export default UsuarioService;