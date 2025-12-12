import { Router } from "express";
import ServicoController from "../controllers/servicoController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Rotas públicas (qualquer um pode ver serviços)
router.get("/", ServicoController.listar);
router.get("/:id", ServicoController.buscarPorId);

// Rotas protegidas (apenas ADMIN pode criar/editar/deletar)
router.post("/", authenticate, isAdmin, ServicoController.criar);
router.put("/:id", authenticate, isAdmin, ServicoController.atualizar);
router.delete("/:id", authenticate, isAdmin, ServicoController.deletar);

export default router;