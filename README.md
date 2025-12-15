# 💈 BarberTime

<div align="center">

![BarberTime Logo](https://img.shields.io/badge/BarberTime-Premium-D4AF37?style=for-the-badge&logo=scissors&logoColor=white)

**Sistema completo de agendamento para barbearias modernas**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

[Demonstração](#-demonstração) • [Funcionalidades](#-funcionalidades) • [Instalação](#-instalação) • [Documentação](#-documentação-da-api)

</div>

---

## 📋 Sobre o Projeto

O **BarberTime** é uma solução completa e moderna para gestão de barbearias, permitindo agendamentos online 24/7, controle de serviços, gestão de barbeiros e muito mais. Desenvolvido com as melhores práticas de engenharia de software e arquitetura escalável.

### 🎯 Problema que Resolve

- ❌ Agendamentos por telefone/WhatsApp desorganizados
- ❌ Conflitos de horários entre barbeiros
- ❌ Dificuldade em gerenciar múltiplos serviços
- ❌ Falta de histórico de atendimentos
- ❌ Experiência do cliente fragmentada

### ✅ Solução

- ✔️ Sistema centralizado de agendamentos
- ✔️ Prevenção automática de conflitos
- ✔️ Gestão completa de serviços e preços
- ✔️ Histórico detalhado de agendamentos
- ✔️ Interface premium e intuitiva

---

## ✨ Funcionalidades

### 👥 Gestão de Usuários
- Cadastro de clientes, barbeiros e administradores
- Autenticação JWT com tokens seguros
- Controle de permissões por tipo de usuário
- Perfis personalizáveis

### 📅 Sistema de Agendamentos
- Agendamento online em tempo real
- Verificação automática de conflitos de horário
- Status de agendamento (Pendente, Confirmado, Cancelado, Concluído)
- Filtros por cliente, barbeiro ou data
- Histórico completo de agendamentos

### 💼 Gestão de Serviços
- Cadastro de serviços com preço e duração
- Vinculação de serviços a barbeiros específicos
- Catálogo completo visível para clientes
- Atualização dinâmica de preços

### 🔒 Segurança
- Autenticação via JWT
- Senhas criptografadas com bcrypt
- Middleware de autorização por tipo de usuário
- Soft delete para preservação de dados

### 📊 Recursos Avançados
- Paginação em todas as listagens
- Validação robusta com Zod
- Tratamento centralizado de erros
- Soft delete (exclusão lógica)
- Timestamps automáticos

---

## 🛠️ Stack Tecnológica

### Backend
```
Node.js 18+          - Runtime JavaScript
Express 4.18         - Framework web
Prisma ORM 5.7       - Object-Relational Mapping
PostgreSQL 15        - Banco de dados
JWT                  - Autenticação
Bcrypt               - Criptografia de senhas
Zod                  - Validação de schemas
```

### Frontend
```
HTML5                - Estrutura
CSS3                 - Estilização premium
JavaScript ES6+      - Interatividade
Font Awesome 6.4     - Ícones
Google Fonts         - Tipografia (Playfair Display + Montserrat)
```

### DevOps & Ferramentas
```
Nodemon              - Hot reload
Swagger UI           - Documentação interativa da API
dotenv               - Gerenciamento de variáveis de ambiente
```

---

## 🚀 Instalação

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 15 ou superior)
- [Git](https://git-scm.com/)

### Passo a Passo

#### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/Devezaa7/barberTime.git
cd barberTime
```

#### 2️⃣ Instale as Dependências

```bash
npm install
```

#### 3️⃣ Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
# DATABASE (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/database?sslmode=require"
DIRECT_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"

# SERVIDOR
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui
JWT_EXPIRES_IN=7d
```

**⚠️ IMPORTANTE:** Substitua os valores de exemplo pelos seus dados reais.

#### 4️⃣ Execute as Migrations do Banco de Dados

```bash
npx prisma migrate dev
```

#### 5️⃣ Popule o Banco com Dados Iniciais (Seed)

```bash
npx prisma db seed
```

Isso criará usuários de exemplo:

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | admin@barbertime.com | senha123 |
| Barbeiro | lucas@barbertime.com | senha123 |
| Barbeiro | evely@barbertime.com | senha123 |
| Barbeiro | guilhermy@barbertime.com | senha123 |
| Barbeiro | samuel@barbertime.com | senha123 |
| Barbeiro | ingrid@barbertime.com | senha123 |
| Barbeiro | letticia@barbertime.com | senha123 |
| Cliente | pedro@email.com | senha123 |

#### 6️⃣ Inicie o Servidor

```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

#### 7️⃣ Acesse o Frontend

Abra o arquivo `frontend/index.html` no seu navegador ou use uma extensão como Live Server no VS Code.

---

## 📁 Estrutura do Projeto

```
barberTime/
├── prisma/
│   ├── migrations/          # Histórico de migrações do banco
│   ├── schema.prisma        # Schema do banco de dados
│   └── seed.js              # Script de população inicial
│
├── src/
│   ├── config/
│   │   └── database.js      # Configuração do Prisma Client
│   │
│   ├── controllers/         # Controladores (lógica de requisição/resposta)
│   │   ├── agendamentoController.js
│   │   ├── authController.js
│   │   ├── servicoController.js
│   │   └── usuarioController.js
│   │
│   ├── middlewares/         # Middlewares da aplicação
│   │   ├── authMiddleware.js      # Autenticação JWT
│   │   └── errorHandler.js        # Tratamento de erros
│   │
│   ├── repositories/        # Camada de acesso ao banco de dados
│   │   ├── agendamentoRepository.js
│   │   ├── servicoRepository.js
│   │   └── usuarioRepository.js
│   │
│   ├── routes/              # Definição de rotas da API
│   │   ├── agendamentoRoutes.js
│   │   ├── authRoutes.js
│   │   ├── servicoRoutes.js
│   │   ├── usuarioRoutes.js
│   │   └── index.js
│   │
│   ├── services/            # Lógica de negócio
│   │   ├── agendamentoService.js
│   │   ├── authService.js
│   │   ├── servicoService.js
│   │   └── usuarioService.js
│   │
│   ├── validations/         # Schemas de validação (Zod)
│   │   ├── agendamentoValidation.js
│   │   ├── authValidation.js
│   │   ├── servicoValidation.js
│   │   └── usuarioValidation.js
│   │
│   ├── docs/
│   │   └── swagger.yaml     # Documentação OpenAPI
│   │
│   ├── app.js               # Configuração do Express
│   └── server.js            # Inicialização do servidor
│
├── frontend/
│   ├── css/
│   │   ├── style.css        # Estilos gerais e página de login
│   │   └── dashboard.css    # Estilos do dashboard
│   │
│   ├── js/
│   │   ├── auth.js          # Funções de autenticação
│   │   ├── login.js         # Lógica da página de login
│   │   ├── register.js      # Lógica de cadastro
│   │   └── dashboard.js     # Lógica do dashboard
│   │
│   ├── index.html           # Página de login
│   ├── register.html        # Página de cadastro
│   ├── dashboard.html       # Dashboard principal
│   └── forgot-password.html # Recuperação de senha
│
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore               # Arquivos ignorados pelo Git
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo
```

---

## 📖 Documentação da API

### Autenticação

Todas as rotas protegidas requerem um token JWT no header:

```
Authorization: Bearer {seu_token_aqui}
```

### Endpoints Principais

#### 🔐 Autenticação

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@barbertime.com",
  "senha": "senha123"
}
```

```http
POST /api/auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "senha": "senha123",
  "tipo": "CLIENTE"
}
```

```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### 👥 Usuários

```http
GET /api/usuarios?page=1&perPage=10
Authorization: Bearer {token}
```

```http
GET /api/usuarios/{id}
Authorization: Bearer {token}
```

```http
PUT /api/usuarios/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João da Silva Santos",
  "telefone": "11988888888"
}
```

```http
DELETE /api/usuarios/{id}
Authorization: Bearer {token}
```

#### 💼 Serviços

```http
GET /api/servicos?page=1&perPage=10
```

```http
GET /api/servicos/{id}
```

```http
POST /api/servicos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Corte Degradê",
  "descricao": "Corte moderno com degradê profissional",
  "preco": 45.00,
  "duracao": 40,
  "barbeiroId": "uuid-do-barbeiro"
}
```

```http
PUT /api/servicos/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "preco": 50.00
}
```

```http
DELETE /api/servicos/{id}
Authorization: Bearer {token}
```

#### 📅 Agendamentos

```http
GET /api/agendamentos?page=1&perPage=10
Authorization: Bearer {token}
```

```http
GET /api/agendamentos/{id}
Authorization: Bearer {token}
```

```http
POST /api/agendamentos
Authorization: Bearer {token}
Content-Type: application/json

{
  "dataHora": "2025-12-20T10:00:00.000Z",
  "servicoId": "uuid-do-servico",
  "barbeiroId": "uuid-do-barbeiro",
  "observacao": "Primeira vez na barbearia"
}
```

```http
PUT /api/agendamentos/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "CONFIRMADO",
  "observacao": "Cliente confirmou presença"
}
```

```http
DELETE /api/agendamentos/{id}
Authorization: Bearer {token}
```

### Swagger UI

Acesse a documentação interativa em: `http://localhost:3000/api-docs`

---

## 🎨 Design e Interface

### Paleta de Cores

```css
--gold-primary: #D4AF37    /* Dourado principal */
--gold-light: #F4E4C1      /* Dourado claro */
--gold-dark: #B8941F       /* Dourado escuro */
--black-primary: #0A0A0A   /* Preto principal */
--black-secondary: #1A1A1A /* Preto secundário */
--black-tertiary: #2A2A2A  /* Preto terciário */
--white: #FFFFFF           /* Branco */
--gray-light: #B8B8B8      /* Cinza claro */
```

### Tipografia

- **Títulos:** Playfair Display (Serif elegante)
- **Corpo:** Montserrat (Sans-serif moderna)

### Características do Design

- ✨ Design premium inspirado em barbearias de luxo
- 🌙 Tema dark com detalhes em dourado
- 📱 Totalmente responsivo
- 🎯 Animações sutis e transições suaves
- 🎨 Glassmorphism e efeitos modernos

---

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor com nodemon (hot reload)

# Produção
npm start                # Inicia o servidor em modo produção

# Banco de Dados
npx prisma migrate dev   # Cria e aplica uma nova migration
npx prisma migrate reset # Reseta o banco e reaplica todas as migrations
npx prisma db seed       # Popula o banco com dados de exemplo
npx prisma studio        # Abre o Prisma Studio (GUI do banco)
npx prisma generate      # Gera o Prisma Client

# Completo
npm run db:setup         # Executa migrations + seed (setup completo)
```

---

## 🔒 Tipos de Usuário e Permissões

### ADMIN
- ✅ Criar, ler, atualizar e deletar qualquer recurso
- ✅ Gerenciar todos os usuários
- ✅ Gerenciar todos os serviços
- ✅ Visualizar todos os agendamentos
- ✅ Acesso total ao sistema

### BARBEIRO
- ✅ Visualizar seus próprios agendamentos
- ✅ Atualizar status de seus agendamentos
- ✅ Visualizar seus serviços
- ❌ Não pode criar novos agendamentos
- ❌ Não pode gerenciar outros usuários

### CLIENTE
- ✅ Criar seus próprios agendamentos
- ✅ Visualizar seus próprios agendamentos
- ✅ Cancelar seus agendamentos
- ✅ Visualizar catálogo de serviços
- ❌ Não pode ver agendamentos de outros clientes

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC + Service Layer + Repository**:

```
┌─────────────┐
│   Routes    │  ← Define endpoints e middlewares
└──────┬──────┘
       │
┌──────▼──────┐
│ Controllers │  ← Recebe requisições, valida dados
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │  ← Lógica de negócio
└──────┬──────┘
       │
┌──────▼──────┐
│ Repositories│  ← Acesso ao banco de dados (Prisma)
└──────┬──────┘
       │
┌──────▼──────┐
│  Database   │  ← PostgreSQL
└─────────────┘
```

### Camadas

1. **Routes:** Define as rotas HTTP e aplica middlewares
2. **Controllers:** Recebe as requisições, valida entrada e retorna respostas
3. **Services:** Contém a lógica de negócio da aplicação
4. **Repositories:** Abstrai o acesso ao banco de dados
5. **Middlewares:** Autenticação, autorização e tratamento de erros

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use ESLint e Prettier
- Commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/)
- Documente funções complexas
- Adicione testes quando possível

---

## 📝 Licença

Este projeto está sob a licença **ISC**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Equipe de Desenvolvimento

### Squad One - Fundação & Arquitetura

<table>
  <tr>
    <td align="center">
      <b>Lucas Alberto</b><br>
      <sub>Desenvolvedor Full Stack</sub><br>
      📧 lucas@barbertime.com
    </td>
    <td align="center">
      <b>Evely Sena</b><br>
      <sub>Desenvolvedora Full Stack</sub><br>
      📧 evely@barbertime.com
    </td>
    <td align="center">
      <b>Guilhermy Deveza</b><br>
      <sub>Desenvolvedor Full Stack</sub><br>
      📧 guilhermy@barbertime.com
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>Samuel da Silva</b><br>
      <sub>Desenvolvedor Full Stack</sub><br>
      📧 samuel@barbertime.com
    </td>
    <td align="center">
      <b>Ingrid Sanuto</b><br>
      <sub>Desenvolvedora Full Stack</sub><br>
      📧 ingrid@barbertime.com
    </td>
    <td align="center">
      <b>Lettícia Sabino</b><br>
      <sub>Desenvolvedora Full Stack</sub><br>
      📧 letticia@barbertime.com
    </td>
  </tr>
</table>

---

## 📞 Contato e Suporte

- 📧 Email: contato@barbertime.com
- 📱 Telefone: +55 31 7184-0575
- 💬 WhatsApp: [Falar no WhatsApp](https://wa.me/5521993570463)
- 📸 Instagram: [@barber.time](https://www.instagram.com/barbertime.2025/)

---

## 🗺️ Roadmap

### Versão 1.1 (Em Desenvolvimento)
- [ ] Sistema de notificações por email
- [ ] Confirmação de agendamento por SMS
- [ ] Dashboard com gráficos e estatísticas
- [ ] Sistema de avaliações e feedbacks

### Versão 2.0 (Planejado)
- [ ] App mobile (React Native)
- [ ] Sistema de fidelidade e pontos
- [ ] Integração com pagamentos online
- [ ] Modo offline (PWA)
- [ ] Multi-idioma

---

## 🙏 Agradecimentos

- [Neon](https://neon.tech/) - Banco de dados PostgreSQL serverless
- [Prisma](https://www.prisma.io/) - ORM moderno e type-safe
- [Express](https://expressjs.com/) - Framework web minimalista
- Comunidade open-source

---

<div align="center">

**[⬆ Voltar ao topo](#-barbertime)**

Feito com ❤️ pela **Squad One**

[![GitHub](https://img.shields.io/badge/GitHub-BarberTime-181717?style=for-the-badge&logo=github)](https://github.com/Devezaa7/barberTime)

</div>
