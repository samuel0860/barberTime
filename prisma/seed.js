import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Limpa dados existentes 
  await prisma.agendamento.deleteMany();
  await prisma.servico.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('Dados antigos removidos');

  // Hash padrão para todas as senhas (senha123)
  const senhaHash = await bcrypt.hash('senha123', 10);

  // ADMIN
  const admin = await prisma.usuario.create({
    data: {
      nome: 'Admin Sistema',
      email: 'admin@barbertime.com',
      telefone: '(11) 99999-0000',
      senha: senhaHash,
      tipo: 'ADMIN',
    }
  });

  // BARBEIROS 
  const lucas = await prisma.usuario.create({
    data: {
      nome: 'Lucas Alberto de Santana Santos',
      email: 'lucas@barbertime.com',
      telefone: '+55 31 9957-5616',
      senha: senhaHash,
      tipo: 'BARBEIRO',
    }
  });

  const evely = await prisma.usuario.create({
    data: {
      nome: 'Evely Sena dos Santos',
      email: 'evely@barbertime.com',
      telefone: '+55 73 8109-4123',
      senha: senhaHash,
      tipo: 'BARBEIRO',
    }
  });

  const guilhermy = await prisma.usuario.create({
    data: {
      nome: 'Guilhermy Deveza da Silva',
      email: 'guilhermy@barbertime.com',
      telefone: '+55 21 98319-6702',
      senha: senhaHash,
      tipo: 'BARBEIRO',
    }
  });

  const samuel = await prisma.usuario.create({
    data: {
      nome: 'Samuel da Silva Sales',
      email: 'samuel@barbertime.com',
      telefone: '+55 31 7184-0575',
      senha: senhaHash,
      tipo: 'BARBEIRO',
    }
  });

  const ingrid = await prisma.usuario.create({
    data: {
      nome: 'Ingrid Sanuto Aguiar',
      email: 'ingrid@barbertime.com',
      telefone: '+55 21 99861-6686',
      senha: senhaHash,
      tipo: 'BARBEIRO',
    }
  });

  const letticia = await prisma.usuario.create({
    data: {
      nome: 'Lettícia Sabino da Conceição Eugenio',
      email: 'letticia@barbertime.com',
      telefone: '+55 21 98928-0182',
      senha: senhaHash,
      tipo: 'BARBEIRO',
    }
  });

  console.log('Barbeiros do squad criados');

  // 3. CLIENTES
  const cliente1 = await prisma.usuario.create({
    data: {
      nome: 'Pedro Santos',
      email: 'pedro@email.com',
      telefone: '(11) 97777-1111',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  const cliente2 = await prisma.usuario.create({
    data: {
      nome: 'Maria Oliveira',
      email: 'maria@email.com',
      telefone: '(11) 97777-2222',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  const cliente3 = await prisma.usuario.create({
    data: {
      nome: 'Ana Costa',
      email: 'ana@email.com',
      telefone: '(11) 97777-3333',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  const cliente4 = await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 97777-4444',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  const cliente5 = await prisma.usuario.create({
    data: {
      nome: 'Carla Mendes',
      email: 'carla@email.com',
      telefone: '(11) 97777-5555',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  const cliente6 = await prisma.usuario.create({
    data: {
      nome: 'Roberto Lima',
      email: 'roberto@email.com',
      telefone: '(11) 97777-6666',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  const cliente7 = await prisma.usuario.create({
    data: {
      nome: 'Juliana Souza',
      email: 'juliana@email.com',
      telefone: '(11) 97777-7777',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  const cliente8 = await prisma.usuario.create({
    data: {
      nome: 'Fernando Alves',
      email: 'fernando@email.com',
      telefone: '(11) 97777-8888',
      senha: senhaHash,
      tipo: 'CLIENTE',
    }
  });

  console.log('Clientes criados');

  // SERVIÇOS

  // Serviços do Lucas
  await prisma.servico.createMany({
    data: [
      {
        nome: 'Corte Degradê',
        descricao: 'Corte moderno com degradê profissional',
        preco: 45.00,
        duracao: 40,
        barbeiroId: lucas.id,
      },
      {
        nome: 'Barba Completa',
        descricao: 'Barba com navalha e toalha quente',
        preco: 30.00,
        duracao: 25,
        barbeiroId: lucas.id,
      }
    ]
  });

  // Serviços da Evely
  await prisma.servico.createMany({
    data: [
      {
        nome: 'Corte Feminino',
        descricao: 'Corte moderno feminino',
        preco: 50.00,
        duracao: 45,
        barbeiroId: evely.id,
      },
      {
        nome: 'Escova Profissional',
        descricao: 'Escova e finalização',
        preco: 40.00,
        duracao: 35,
        barbeiroId: evely.id,
      }
    ]
  });

  // Serviços do Guilhermy
  await prisma.servico.createMany({
    data: [
      {
        nome: 'Corte Tradicional',
        descricao: 'Corte clássico masculino',
        preco: 35.00,
        duracao: 30,
        barbeiroId: guilhermy.id,
      },
      {
        nome: 'Design Capilar',
        descricao: 'Desenhos e arte no cabelo',
        preco: 60.00,
        duracao: 50,
        barbeiroId: guilhermy.id,
      }
    ]
  });

  // Serviços do Samuel
  await prisma.servico.createMany({
    data: [
      {
        nome: 'Corte + Barba',
        descricao: 'Combo completo de corte e barba',
        preco: 55.00,
        duracao: 50,
        barbeiroId: samuel.id,
      },
      {
        nome: 'Barba Estilizada',
        descricao: 'Barba com design personalizado',
        preco: 35.00,
        duracao: 30,
        barbeiroId: samuel.id,
      }
    ]
  });

  // Serviços da Ingrid
  await prisma.servico.createMany({
    data: [
      {
        nome: 'Platinado',
        descricao: 'Descoloração completa do cabelo',
        preco: 120.00,
        duracao: 90,
        barbeiroId: ingrid.id,
      },
      {
        nome: 'Coloração Personalizada',
        descricao: 'Tintura profissional com cores exclusivas',
        preco: 80.00,
        duracao: 60,
        barbeiroId: ingrid.id,
      }
    ]
  });

  // Serviços da Lettícia
  await prisma.servico.createMany({
    data: [
      {
        nome: 'Hidratação Profunda',
        descricao: 'Tratamento completo de hidratação capilar',
        preco: 70.00,
        duracao: 50,
        barbeiroId: letticia.id,
      },
      {
        nome: 'Corte Infantil',
        descricao: 'Corte especializado para crianças',
        preco: 25.00,
        duracao: 20,
        barbeiroId: letticia.id,
      }
    ]
  });

  console.log('Serviços criados');

  // AGENDAMENTOS
  const todosServicos = await prisma.servico.findMany();
  
  const hoje = new Date();
  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);
  const depoisAmanha = new Date(hoje);
  depoisAmanha.setDate(depoisAmanha.getDate() + 2);

  await prisma.agendamento.createMany({
    data: [
      {
        dataHora: new Date(amanha.setHours(10, 0, 0, 0)),
        status: 'CONFIRMADO',
        observacao: 'Cliente preferencial',
        clienteId: cliente1.id,
        barbeiroId: lucas.id,
        servicoId: todosServicos[0].id,
      },
      {
        dataHora: new Date(amanha.setHours(14, 0, 0, 0)),
        status: 'CONFIRMADO',
        clienteId: cliente2.id,
        barbeiroId: evely.id,
        servicoId: todosServicos[2].id,
      },
      {
        dataHora: new Date(depoisAmanha.setHours(9, 0, 0, 0)),
        status: 'PENDENTE',
        clienteId: cliente3.id,
        barbeiroId: guilhermy.id,
        servicoId: todosServicos[4].id,
      },
      {
        dataHora: new Date(depoisAmanha.setHours(11, 0, 0, 0)),
        status: 'PENDENTE',
        clienteId: cliente1.id,
        barbeiroId: samuel.id,
        servicoId: todosServicos[6].id,
      },
      {
        dataHora: new Date(depoisAmanha.setHours(16, 0, 0, 0)),
        status: 'CONFIRMADO',
        observacao: 'Primeira vez na barbearia',
        clienteId: cliente2.id,
        barbeiroId: ingrid.id,
        servicoId: todosServicos[8].id,
      }
    ]
  });

  console.log('Agendamentos criados');

  // RESUMO
  const totalUsuarios = await prisma.usuario.count();
  const totalServicos = await prisma.servico.count();
  const totalAgendamentos = await prisma.agendamento.count();

  console.log('\nResumo do Seed:');
  console.log(`   Usuários: ${totalUsuarios}`);
  console.log(`   Serviços: ${totalServicos}`);
  console.log(`   Agendamentos: ${totalAgendamentos}`);
  console.log('\nSeed concluído com sucesso');
  console.log('\nCredenciais do Squad (senha: senha123):');
  console.log('   Admin: admin@barbertime.com');
  console.log('   Lucas Alberto: lucas@barbertime.com');
  console.log('   Evely Sena: evely@barbertime.com');
  console.log('   Guilhermy Deveza: guilhermy@barbertime.com');
  console.log('   Samuel da Silva: samuel@barbertime.com');
  console.log('   Ingrid Sanuto: ingrid@barbertime.com');
  console.log('   Lettícia Sabino: letticia@barbertime.com');
  console.log('   Cliente: pedro@email.com');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });