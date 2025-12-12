import express from 'express';
import { agendamentoController } from '../controllers/agendamentoController.js';
import { authenticate, isCliente } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota de teste
router.get("/teste-simples", (req, res) => {
  res.json({ mensagem: "A rota AGENDAMENTOS/TESTE-SIMPLES está funcionando!" });
});

// Criar agendamento (apenas clientes)
router.post('/', authenticate, isCliente, agendamentoController.create);

// Listar agendamentos (clientes veem os seus, barbeiros veem os deles)
router.get('/', authenticate, agendamentoController.findAll);

// Buscar agendamento por ID
router.get('/:id', authenticate, agendamentoController.findById);

// Atualizar agendamento
router.put('/:id', authenticate, agendamentoController.update);

// Deletar agendamento (apenas clientes)
router.delete('/:id', authenticate, isCliente, agendamentoController.delete);

export default router;