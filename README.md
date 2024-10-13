# 📋 Projeto de Gerenciamento de Tarefas

Bem-vindo ao **Projeto de Gerenciamento de Tarefas**! Este sistema permite gerenciar tarefas de forma prática, oferecendo autenticação, gerenciamento de usuários e filtros avançados. O projeto é dividido em **API** (backend .NET) e **App** (frontend Angular).

---

## 🗂 Estrutura do Projeto

O projeto está organizado da seguinte forma:

```bash
|-- api/     # Backend (API em .NET Core)
|-- app/     # Frontend (Aplicação em Angular)
```

## 🚀 Funcionalidades

### 🔧 API (Backend)
- Autenticação JWT
- CRUD de Usuários e Tarefas
- Filtros avançados de tarefas (status, nome, data)

### 🌐 App (Frontend)
- Interface intuitiva para gerenciar tarefas
- Filtros por nome, status e datas
- Dashboard com progresso das tarefas
- Autenticação de usuários

---

## 💻 Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/ToDoApp.git
cd ToDoApp
```

### 2. Executando a API

```bash
cd api
dotnet restore
dotnet run
```

- A API estará disponível em `http://localhost:37923`

### 3. Executando o App

```bash
cd app
npm install
ng serve
```

- O App estará disponível em `http://localhost:4200`

---

## 🔗 Endpoints da API

Alguns dos principais endpoints disponíveis:

- **POST** `/api/login` - Autenticação de usuário
- **GET** `/api/users` - Lista de usuários
- **GET** `/api/tasks` - Lista de tarefas (com filtros)
- **POST** `/api/tasks` - Criar nova tarefa
- **PUT** `/api/tasks/{id}` - Atualizar tarefa

---

## 🛠 Tecnologias Utilizadas

- **Backend**: .NET Core 8
- **Frontend**: Angular 18
- **Banco de Dados**: Entity Framework Core

---

## 🛣️ Roadmap de Funcionalidades Futuras

- 🔔 Notificações de tarefas próximas do vencimento
- 📅 Integração com Google Calendar e Outlook
- 📊 Relatórios personalizados para exportação

---

Feito com ❤️ por [Murilo Silvestre](https://github.com/MuriloSilvestre)

