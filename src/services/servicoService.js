import ServicoRepository from "../repositories/servicoRepository.js";

export const ServicoService = {
  // Criar um novo serviço
  criar: async (dados) => {
    return ServicoRepository.criar(dados);
  },

  // Listar serviços com paginação
  listar: async (page = 1, perPage = 10) => {
    const skip = (page - 1) * perPage;

    const servicos = await ServicoRepository.listar(skip, perPage);
    const total = await ServicoRepository.contar();

    return {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
      data: servicos
    };
  },

  // Buscar serviço por ID
  buscarPorId: async (id) => {
    const servico = await ServicoRepository.buscarPorId(id);
    
    if (!servico) {
      throw new Error("Serviço não encontrado");
    }
    
    return servico;
  },

  // Atualizar serviço
  atualizar: async (id, dados) => {
    // Remove campos undefined
    const dadosLimpos = Object.fromEntries(
      Object.entries(dados).filter(([_, v]) => v !== undefined)
    );

    return ServicoRepository.atualizar(id, {
      ...dadosLimpos,
      updatedAt: new Date(),
    });
  },

  // Soft delete de serviço
  deletar: async (id) => {
    return ServicoRepository.deletar(id);
  },
};