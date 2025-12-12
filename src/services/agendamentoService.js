import AgendamentoRepository from '../repositories/agendamentoRepository.js';
import { ServicoService } from './servicoService.js';

export const agendamentoService = {
    async create(data, clienteId) {
        // 1. Buscar serviço
        const servico = await ServicoService.buscarPorId(data.servicoId);
        
        if (!servico || servico.deletedAt) {
            throw new Error('Serviço não encontrado ou indisponível.');
        }

        // 2. Verificar se barbeiro oferece o serviço
        if (servico.barbeiroId !== data.barbeiroId) {
            throw new Error('O barbeiro informado não oferece esse serviço.');
        }
        
        // 3. Verificar conflito de horário (AGORA CORRETO)
        const conflito = await AgendamentoRepository.verificarConflito(
            data.barbeiroId,
            new Date(data.dataHora),
            servico.duracao
        );
        
        if (conflito) {
            throw new Error('Já existe um agendamento para este barbeiro neste horário.');
        }

        // 4. Criar agendamento
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
        
        const filtros = tipo === "BARBEIRO"
            ? { barbeiroId: user.id }
            : { clienteId: user.id };

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

        // Verificar permissão
        const tipo = user.tipo?.toUpperCase();

        if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
            throw new Error("Acesso negado");
        }

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

        // Verificar permissão
        const tipo = user.tipo?.toUpperCase();

        if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
            throw new Error("Acesso negado");
        }

        if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
            throw new Error("Acesso negado");
        }

        // Se mudou dataHora, verificar conflito
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

        // Verificar permissão
        const tipo = user.tipo?.toUpperCase();

        if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
            throw new Error("Acesso negado");
        }

        if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
            throw new Error("Acesso negado");
        }

        return AgendamentoRepository.deletar(id);
    },
};