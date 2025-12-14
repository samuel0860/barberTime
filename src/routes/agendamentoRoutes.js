import express from 'express';
import { agendamentoController } from '../controllers/agendamentoController.js';
import { authenticate, isCliente, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware para verificar se é CLIENTE ou ADMIN
const podeAgendar = (req, res, next) => {
  const tipo = req.usuario.tipo;
  
  if (tipo === 'CLIENTE' || tipo === 'ADMIN') {
    return next();
  }
  
  return res.status(403).json({
    error: 'Apenas clientes e administradores podem criar agendamentos'
  });
};

// Criar agendamento (clientes e admins)
router.post('/', authenticate, podeAgendar, agendamentoController.create);

// Listar agendamentos (todos autenticados)
router.get('/', authenticate, agendamentoController.findAll);

// Buscar agendamento por ID
router.get('/:id', authenticate, agendamentoController.findById);

// Atualizar agendamento
router.put('/:id', authenticate, agendamentoController.update);

// Deletar agendamento (clientes e admins)
router.delete('/:id', authenticate, podeAgendar, agendamentoController.delete);

export default router;