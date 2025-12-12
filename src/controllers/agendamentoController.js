import { agendamentoService } from "../services/agendamentoService.js";
import { agendamentoSchema } from "../validations/agendamentoValidation.js";

export const agendamentoController = {
    async create(req, res, next) {
        try {
            const data = agendamentoSchema.parse(req.body);
            const clienteId = req.usuario.id; 

            const novoAgendamento = await agendamentoService.create(data, clienteId);
            
            res.status(201).json({
                success: true,
                message: "Agendamento criado com sucesso",
                data: novoAgendamento,
            });
        } catch (err) {
            next(err); // Deixa errorHandler tratar
        }
    },

    async findAll(req, res, next) {
        try {
            const user = req.usuario;
            const { page = 1, perPage = 10 } = req.query;

            const lista = await agendamentoService.findAll(
                user, 
                Number(page), 
                Number(perPage)
            );
            
            res.json(lista);
        } catch (err) {
            next(err);
        }
    },

    async findById(req, res, next) {
        try {
            const user = req.usuario; 
            const agendamento = await agendamentoService.findById(req.params.id, user);
            
            res.status(200).json({
                success: true,
                data: agendamento,
            });
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const user = req.usuario;
            const atualizado = await agendamentoService.update(
                req.params.id, 
                req.body, 
                user
            );
            
            res.status(200).json({
                success: true,
                message: "Agendamento atualizado com sucesso",
                data: atualizado,
            }); 
        } catch (err) {
            next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const user = req.usuario; 
            await agendamentoService.delete(req.params.id, user);
            
            res.status(200).json({
                success: true,
                message: "Agendamento excluído com sucesso",
            });
        } catch (err) {
            next(err);
        }
    },
};