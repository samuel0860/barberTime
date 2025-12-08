import { agendamentoService } from "../services/agendamentoService.js";
import { agendamentoSchema } from "../validations/agendamentoValidation.js";


// exportando as funções do controlador de agendamento
export const agendamentoController = {
    async create(req, res) {
        try {

            //id pra teste
            const clienteId = "2d92b846-f761-4518-b41f-6f978acefe66";

            //validando dados com zod
            const data = agendamentoSchema.parse(req.body);

            //dependo da autenticação Jwt
            // depois trocar o user fixo por req.user.id

            const clientedId = req.user?.id || "2d92b846-f761-4518-b41f-6f978acefe66";

            const novoAgendamento = await agendamentoService.create(data, clienteId);
            res.status(201).json(novoAgendamento);
        } catch (e) {
            res.status(400).json({error: e.message });
        }
    },

    async findAll(req, res) {
        try {
            const user = req.user || { id: "15883368-aa78-40de-b22e-e66c32959f47", tipo: "BARBEIRO" }; // depende da dupla 2
            const lista = await agendamentoService.findAll(user);
            res.json(lista);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    },

    async findById(req, res) {
        console.log("entrou no controller findById");
        try {
            const user = req.user || { id: "15883368-aa78-40de-b22e-e66c32959f47", tipo: "BARBEIRO" }; // depende da dupla 2
            const agendamento = await agendamentoService.findById(req.params.id, user);
            res.json(agendamento);
        } catch (e) {
            res.status(404).json({ error: e.message });
        }
    },

    async update(req, res) {
        try {
            const user = req.user || { id: "2d92b846-f761-4518-b41f-6f978acefe66", tipo: "CLIENTE" }; // depende da dupla 2
            const agendamento = await agendamentoService.update(req.params.id, req.body, user);
            res.json(agendamento);
        } catch (e) {
            res.status(400).json({ error: e.message});
        }
    },

    async delete(req,res) {
        try {
            const user = req.user || { id: "2d92b846-f761-4518-b41f-6f978acefe66", tipo: "CLIENTE" }; // depende da dupla 2
            await agendamentoService.delete(req.params.id, user);
            res.json({ message: "Agendamento excluído com sucesso"});


        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

};