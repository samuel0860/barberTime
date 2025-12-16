import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../configuração/prisma.js';

class AuthController {
  
  // ... seus métodos existentes (login, register, me) ...

  // NOVO: Solicitar recuperação de senha
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email é obrigatório' });
      }

      // Busca usuário pelo email
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });

      // Por segurança, sempre retorna sucesso (não revela se email existe)
      if (!usuario) {
        return res.status(200).json({ 
          message: 'Se o email existir, você receberá um link de recuperação' 
        });
      }

      // Gera token de recuperação (válido por 1 hora)
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

      // Salva token no banco
      await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
          resetToken: resetTokenHash,
          resetTokenExpiry
        }
      });

      // URL do frontend com o token
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password.html?token=${resetToken}`;

      // TODO: Enviar email (você precisa configurar um serviço de email)
      console.log('🔗 Link de recuperação:', resetUrl);
      console.log('📧 Email seria enviado para:', email);

      // Por enquanto, retorna o link no console (REMOVA EM PRODUÇÃO!)
      return res.status(200).json({ 
        message: 'Link de recuperação enviado!',
        // REMOVA esta linha em produção:
        resetUrl: resetUrl 
      });

    } catch (error) {
      console.error('Erro ao solicitar recuperação:', error);
      return res.status(500).json({ message: 'Erro ao processar solicitação' });
    }
  }

  // NOVO: Resetar senha
  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res.status(400).json({ message: 'Token e senha são obrigatórios' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Senha deve ter no mínimo 6 caracteres' });
      }

      // Hash do token recebido
      const resetTokenHash = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      // Busca usuário com token válido
      const usuario = await prisma.usuario.findFirst({
        where: {
          resetToken: resetTokenHash,
          resetTokenExpiry: {
            gt: new Date() // Token ainda não expirou
          }
        }
      });

      if (!usuario) {
        return res.status(400).json({ message: 'Token inválido ou expirado' });
      }

      // Hash da nova senha
      const senhaHash = await bcrypt.hash(password, 10);

      // Atualiza senha e remove token
      await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
          senha: senhaHash,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

      return res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      return res.status(500).json({ message: 'Erro ao resetar senha' });
    }
  }
}

export default new AuthController();
