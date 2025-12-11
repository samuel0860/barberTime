import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

// Rota de login (pública)
router.post('/login', AuthController.login);

// Rota de registro (pública)
router.post('/register', AuthController.register);

// Rota para pegar dados do usuário logado (protegida)
router.get('/me', authenticate, AuthController.me);

export default router;