import prisma from '../prisma/client.js';
// exportando as funções do serviço de agendamento
export const agendamentoService = {
    async create(data, clienteId) {
        //verificando se já existe um agendamento no mesmo horário
        const conflito = await prisma.agendamento.findFirst({
            where: {
                barbeiroId: data.barbeiroId,
                dataHora: new Date(data.dataHora),
                deletedAt: null,
            },
        });

        if (conflito) {
            throw new Error('Já existe um agendamento para este barbeiro neste horário.');
        }


        // criando o agendamento
        return prisma.agendamento.create({
            data: {
                dataHora: new Date(data.dataHora),
                observacao: data.observacao || null,
                clienteId, //associando o cliente
                barbeiroId: data.barbeiroId,
                servicoId: data.servicoId,
            },
            include: { servico: true, barbeiro: true},
        });
    },

// buscando todos os agendamentos
    async findAll(user) {
        const filtros = 
            user.tipo === "BARBEIRO"
            ? { barbeiroId: user.id}
            : { clienteId: user.id};
            // se for barbeiro, filtra pelo barbeiroId, se for cliente, filtra pelo clienteId

            return prisma.agendamento.findMany({
                where: { ...filtros, deletedAt: null},
                include: { servico: true, barbeiro: true, cliente: true},
                orderBy: { dataHora: "asc"},
            });
        
    },
// buscando agendamento por ID
    async findById(id, user) {
        const agendamento = await prisma.agendamento.findUnique({
            where: { id },
            include: { servico: true, barbeiro: true, cliente: true},

        });

        console.log("Usuário logado:", user);
        console.log("Agendamento:", agendamento);

        
                
//se não encontrar ou estiver deletado
        if(!agendamento || agendamento.deletedAt) {
            throw new Error("Agendamento não encontrado");
        }

        //restrição de acesso: cliente ou barbeiro só vê seus próprios agendamentos
        // Restrição de acesso 
const tipo = user.tipo?.toUpperCase(); // garante que "barbeiro" ou "BARBEIRO" funcionem igual

if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
    throw new Error("Acesso negado");
}

if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
    throw new Error("Acesso negado");
}

return agendamento;

},
// atualizando agendamento
    async update (id, data, user) {
        const agendamento = await prisma.agendamento.findUnique({ where: { id } });

       
        if(!agendamento) throw new Error("Agendamento não encontrado");
// verifica se o usuario é dono do agendamento

        const tipo = user.tipo?.toUpperCase();

        if (tipo === "CLIENTE" && agendamento.clienteId !== user.id) {
            throw new Error("Acesso negado");
        }
        if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
    throw new Error("Acesso negado");
  }
  // atualizando os campos permitidos
        return prisma.agendamento.update({
            where: { id },
            data: {
                dataHora: data.dataHora ? new Date (data.dataHora) : agendamento.dataHora,
                status: data.status || agendamento.status,
                observacao: data.observacao ?? agendamento.observacao,

            },
        });
            
    },
// deletando agendamento
    async delete (id, user) {
        const agendamento = await prisma.agendamento.findUnique({ where: { id } });
        if (!agendamento) throw new Error ("Agendamento não encontrado");
//verifica se o usuario é dono do agendamento

        const tipo = user.tipo?.toUpperCase();
        if (tipo === "CLIENTE" && agendamento.clienteId !==user.id){
            throw new Error ("Acesso negado");
        }   
        if (tipo === "BARBEIRO" && agendamento.barbeiroId !== user.id) {
            throw new Error("Acesso negado");
        }

        //soft delete
        return prisma.agendamento.update({
            where: { id },
            data: { deletedAt: new Date() }, 
        });
    },

};