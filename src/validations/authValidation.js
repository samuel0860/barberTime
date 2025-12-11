import { z } from 'zod';

// Validação para Login
export const loginValidation = z.object({
  email: z
    .string({
      required_error: 'O email é obrigatório',
      invalid_type_error: 'O email deve ser uma string'
    })
    .email('Email inválido')
    .toLowerCase()
    .trim(),

  senha: z
    .string({
      required_error: 'A senha é obrigatória',
      invalid_type_error: 'A senha deve ser uma string'
    })
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
});

// Validação para Registro
export const registerValidation = z.object({
  nome: z
    .string({
      required_error: 'O nome é obrigatório',
      invalid_type_error: 'O nome deve ser uma string'
    })
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .trim(),

  email: z
    .string({
      required_error: 'O email é obrigatório',
      invalid_type_error: 'O email deve ser uma string'
    })
    .email('Email inválido')
    .toLowerCase()
    .trim(),

  telefone: z
    .string({
      required_error: 'O telefone é obrigatório',
      invalid_type_error: 'O telefone deve ser uma string'
    })
    .min(10, 'Telefone inválido')
    .max(11, 'Telefone inválido')
    .trim(),

  senha: z
    .string({
      required_error: 'A senha é obrigatória',
      invalid_type_error: 'A senha deve ser uma string'
    })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),

  tipo: z
    .enum(['BARBEIRO', 'CLIENTE'], {
      errorMap: () => ({ message: 'Tipo deve ser BARBEIRO ou CLIENTE' })
    })
    .default('CLIENTE')
});