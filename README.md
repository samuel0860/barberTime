# BarberTime - API

Sistema de agendamento para barbearia (Em desenvolvimento)

---

## Como Rodar

### 1. Clone e instale
```bash
git clone https://github.com/Devezaa7/barberTime.git
cd barberTime
npm install
```

### 2. Configure o .env

Crie um arquivo `.env` baseado no `.env.example`

### 3. Rode as migrations
```bash
npx prisma migrate dev
```

### 4. Popule o banco (opcional)
```bash
npx prisma db seed
```

### 5. Inicie o servidor
```bash
npm run dev
```

Servidor: `http://localhost:3000`

---

## Estrutura do Projeto
```
barberTime/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── .env.example
└── package.json
```

---

## Stack

- Node.js + Express
- Prisma ORM
- PostgreSQL
- Arquitetura MVC + Service Layer

---

**Desenvolvido pela Dupla 1 - Fundação & Arquitetura**