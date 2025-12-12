import { z } from 'zod';

// TODO: @Letícia (Dupla 2) - Implementar validações completas
// Esta é uma versão BÁSICA temporária para o servidor não quebrar
// 
// Tarefas:
// 1. Melhorar mensagens de erro em português
// 2. Adicionar validação de formato de telefone (regex)
// 3. Validar força da senha (maiúscula, número, caractere especial)
// 4. Revisar se precisa de mais validações específicas
//
// Referência: ver authValidation.js e servicoValidation.js

export const criarUsuarioValidation = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  telefone: z.string(),
  senha: z.string().min(6),
  tipo: z.enum(['BARBEIRO', 'CLIENTE', 'ADMIN']).default('CLIENTE')
});

export const atualizarUsuarioValidation = z.object({
  nome: z.string().min(3).optional(),
  telefone: z.string().optional(),
  senha: z.string().min(6).optional()
});