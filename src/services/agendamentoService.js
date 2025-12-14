import AgendamentoRepository from '../repositories/agendamentoRepository.js';
import { ServicoService } from './servicoService.js';

export const agendamentoService = {
    async create(data, clienteId) {
        // buscar serviço
        const servico = await ServicoService.buscarPorId(data.servicoId);
        
        if (!servico || servico.deletedAt) {
            throw new Error('Serviço não encontrado ou indisponível.');
        }

        // verificar se barbeiro oferece o serviço
        if (servico.barbeiroId !== data.barbeiroId) {
            throw new Error('O barbeiro informado não oferece esse serviço.');
        }
        
        // verificar conflito de horário
        const conflito = await AgendamentoRepository.verificarConflito(
            data.barbeiroId,
            new Date(data.dataHora),
            servico.duracao
        );
        
        if (conflito) {
            throw new Error('Já existe um agendamento para este barbeiro neste horário.');
        }

        // criar agendamento
        return AgendamentoRepository.criar({
            dataHora: new Date(data.dataHora),
            observacao: data.observacao || null,
            clienteId,
            barbeiroId: data.barbeiroId,
            servicoId: data.servicoId,
        });
    },

    async findAll(user, page = 1, perPage = 10) {
        const tipo = user.tipo?.toUpperCase();
        
        let filtros = {};
        
        // CLIENTE só vê os próprios
        if (tipo === "CLIENTE") {
            filtros.clienteId = user.id;
        }
        
        // BARBEIRO vê os dele
        if (tipo === "BARBEIRO") {
            filtros.barbeiroId = user.id;
        }
        
        // ADMIN vê todos (não adiciona filtro)

        const skip = (page - 1) * perPage;

        const agendamentos = await AgendamentoRepository.listar(
            skip, 
            perPage, 
            filtros
        );
        
        const total = await AgendamentoRepository.contar(filtros);

        return {
            success: true,
            message: "Lista de agendamentos retornada com sucesso",
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage)
            },
            data: agendamentos,
        };
    },

    async findById(id, user) {
        const agendamento = await AgendamentoRepository.buscarPorId(id);

        if (!agendamento || agendamento.deletedAt) {
            throw new Error("Agendamento não encontrado");
        }

        const tipo = user.tipo?.toUpperCase();

        // ADMIN pode ver qualquer agendamento
        if (tipo === "ADMIN") {
            return agendamento;
        }

        // CLIENTE só vê os próprios
        if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
            throw new Error("Acesso negado");
        }

        // BARBEIRO só vê os dele
        if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
            throw new Error("Acesso negado");
        }

        return agendamento;
    },

    async update(id, data, user) {
        const agendamento = await AgendamentoRepository.buscarPorId(id);

        if (!agendamento) {
            throw new Error("Agendamento não encontrado");
        }

        const tipo = user.tipo?.toUpperCase();

        // ADMIN pode atualizar qualquer agendamento
        if (tipo !== "ADMIN") {
            // CLIENTE só atualiza os próprios
            if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
                throw new Error("Acesso negado");
            }

            // BARBEIRO só atualiza os dele
            if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
                throw new Error("Acesso negado");
            }
        }

        // se mudou dataHora, verificar conflito
        if (data.dataHora && data.dataHora !== agendamento.dataHora.toISOString()) {
            const servico = await ServicoService.buscarPorId(agendamento.servicoId);
            
            const conflito = await AgendamentoRepository.verificarConflito(
                agendamento.barbeiroId,
                new Date(data.dataHora),
                servico.duracao,
                id // ignora o próprio agendamento
            );

            if (conflito) {
                throw new Error('Já existe um agendamento para este barbeiro neste horário.');
            }
        }

        return AgendamentoRepository.atualizar(id, {
            dataHora: data.dataHora ? new Date(data.dataHora) : agendamento.dataHora,
            status: data.status || agendamento.status,
            observacao: data.observacao ?? agendamento.observacao,
        });
    },

    async delete(id, user) {
        const agendamento = await AgendamentoRepository.buscarPorId(id);

        if (!agendamento) {
            throw new Error("Agendamento não encontrado");
        }

        const tipo = user.tipo?.toUpperCase();

        // ADMIN pode deletar qualquer agendamento
        if (tipo !== "ADMIN") {
            // CLIENTE só deleta os próprios
            if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
                throw new Error("Acesso negado");
            }

            // BARBEIRO só deleta os dele
            if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
                throw new Error("Acesso negado");
            }
        }

        return AgendamentoRepository.deletar(id);
    },
};