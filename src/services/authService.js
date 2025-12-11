import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

const AuthService = {
  login: async (email, senha) => {
    // 1. Buscar usuário por email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        senha: true,
        tipo: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Se não encontrar o usuário
    if (!usuario) {
      throw new Error('Email ou senha inválidos');
    }

    // 2. Comparar senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error('Email ou senha inválidos');
    }

    // 3. Gerar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email, 
        tipo: usuario.tipo 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // 4. Retornar token + dados do usuário (sem a senha)
    const { senha: _, ...usuarioSemSenha } = usuario;

    return {
      token,
      usuario: usuarioSemSenha
    };
  },

  register: async (dados) => {
    // Verificar se o email já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: dados.email }
    });

    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    // Criar usuário
    const usuario = await prisma.usuario.create({
      data: {
        ...dados,
        senha: senhaHash
      },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        tipo: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Gerar token
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email, 
        tipo: usuario.tipo 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      token,
      usuario
    };
  },

  verificarToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
};

export default AuthService;