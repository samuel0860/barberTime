import express from 'express';
import { agendamentoController } from '../controllers/agendamentoController.js';
import { Router } from 'express';

const router = express.Router();


// Quando a dupla 2 terminar a autenticação
// import { authMiddleware } from '../middlewares/authMiddleware.js';

//rotas

router.post('/', agendamentoController.create);
router.get('/', agendamentoController.findAll);
router.get('/:id', agendamentoController.findById);
router.put('/:id', agendamentoController.update);
router.delete('/:id', agendamentoController.delete);

//router.get('/', (req, res) => {
 // res.json({ msg: 'agendamentos - a fazer' });
//});

export default router;