import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Criar usuário (apenas ADMIN)
router.post('/', authenticate, isAdmin, UsuarioController.criar);

// Listar usuários (apenas ADMIN)
router.get('/', authenticate, isAdmin, UsuarioController.listar);

// Buscar usuário por ID (próprio usuário ou ADMIN)
router.get('/:id', authenticate, UsuarioController.buscarPorId);

// Atualizar usuário (próprio usuário ou ADMIN)
router.put('/:id', authenticate, UsuarioController.atualizar);

// Deletar usuário (apenas ADMIN)
router.delete('/:id', authenticate, isAdmin, UsuarioController.deletar);

export default router;