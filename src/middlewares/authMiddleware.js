import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

// Middleware para verificar se o usuário está autenticado
export const authenticate = async (req, res, next) => {
  try {
    // Pegar o token do header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Token não fornecido'
      });
    }

    // Formato esperado: "Bearer TOKEN"
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({
        error: 'Formato de token inválido'
      });
    }

    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar o usuário no banco
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
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

    if (!usuario) {
      return res.status(401).json({
        error: 'Usuário não encontrado'
      });
    }

    // Adicionar o usuário no request para usar nas rotas
    req.usuario = usuario;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }

    return res.status(500).json({
      error: 'Erro ao verificar autenticação'
    });
  }
};

// Middleware para verificar se o usuário é um barbeiro
export const isBarbeiro = (req, res, next) => {
  if (req.usuario.tipo !== 'BARBEIRO') {
    return res.status(403).json({
      error: 'Acesso negado. Apenas barbeiros podem acessar esta rota'
    });
  }
  next();
};

// Middleware para verificar se o usuário é um cliente
export const isCliente = (req, res, next) => {
  if (req.usuario.tipo !== 'CLIENTE') {
    return res.status(403).json({
      error: 'Acesso negado. Apenas clientes podem acessar esta rota'
    });
  }
  next();
};