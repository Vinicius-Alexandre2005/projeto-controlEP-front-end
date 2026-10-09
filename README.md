# Control EP — Front-end

Front-end completo do sistema de controle de presença de funcionários e disponibilidade de equipamentos, em **React + Vite**.

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

Acesse `http://localhost:3000`.

Por padrão, `VITE_USE_MOCK_AUTH=true` no `.env` — ou seja, **login e cadastro funcionam com dados simulados**, então dá pra navegar pelo site inteiro (painel, usuários, aprovações, gestão etc.) mesmo sem um backend pronto ainda. Basta digitar qualquer e-mail/senha válidos na tela de login. Quando a API real estiver no ar, troque essa variável para `false` e ajuste `VITE_API_BASE_URL`.

## Fluxo da aplicação

1. **Landing (`/`)** — página pública com mensagem de boas-vindas e botão "Entrar / Criar conta", que abre um **pop-up (modal)** com abas de Login e Cadastro.
2. Ao autenticar, o usuário é enviado para **`/painel`** (Painel Geral), dentro do layout com **menu lateral** (presente em todas as páginas internas).
3. Clicando no nome do usuário no rodapé do menu lateral, acessa **`/usuarios`** — gestão de usuários (status, papel, exclusão).

## Estrutura de pastas

```
src/
├── components/
│   ├── auth/
│   │   └── AuthModal.jsx        # pop-up com abas Entrar/Criar conta
│   ├── common/                   # componentes genéricos reutilizáveis
│   │   ├── Modal.jsx / ConfirmDialog.jsx
│   │   ├── Button.jsx / TextField.jsx / PasswordField.jsx / SelectField.jsx
│   │   ├── Badge.jsx / Tabs.jsx / Divider.jsx / FormAlert.jsx
│   │   └── GoogleAuthButton.jsx
│   └── layout/
│       ├── AppShell.jsx          # sidebar + área de conteúdo (páginas logadas)
│       └── Sidebar.jsx           # menu lateral fixo
├── context/
│   └── AuthContext.jsx           # usuário logado, signIn/signOut
├── data/
│   └── mockDb.js                 # "banco de dados" simulado em memória
├── hooks/
│   └── useAuth.js
├── pages/
│   ├── Landing/                  # página inicial pública
│   ├── Login/LoginForm.jsx       # formulário de login (usado dentro do AuthModal)
│   ├── Register/RegisterForm.jsx # formulário de cadastro (idem)
│   ├── Dashboard/                # Painel Geral
│   ├── Users/                    # gestão de usuários
│   ├── Approvals/                # aprovações (filtros, detalhes, aprovar/rejeitar)
│   ├── Management/                # Gestão: abas Papéis e Permissões / Operação
│   │   ├── RolesTab.jsx + RoleFormModal.jsx
│   │   └── ShiftsTab.jsx + ShiftFormModal.jsx
│   ├── Employees/                # placeholder — critérios ainda a definir
│   ├── Equipment/                # placeholder — critérios ainda a definir
│   └── Presence/                 # placeholder — critérios ainda a definir
├── routes/
│   └── AppRoutes.jsx             # todas as rotas + proteção por autenticação
├── services/                     # uma "API" por módulo (hoje usando mockDb,
│   │                                amanhã trocando por chamadas reais via api.js)
│   ├── api.js                    # instância axios (para quando o backend existir)
│   ├── authService.js
│   ├── usersService.js
│   ├── approvalsService.js
│   ├── rolesService.js
│   ├── shiftsService.js
│   ├── employeesService.js
│   ├── equipmentService.js
│   └── dashboardService.js
├── styles/
│   ├── tokens.css                # cores, raios, sombra — identidade Control EP
│   ├── patterns.css              # padrões de página (tabelas, cards, toolbar)
│   └── global.css
└── utils/
    └── validationSchemas.js      # regras de validação (yup) do login/cadastro
```

## Funcionalidades já implementadas

### Usuários (`/usuarios`)
- Lista nome e e-mail de todos os usuários.
- Alterna status ativo/inativo (checkbox).
- Altera o papel do usuário (select) — **bloqueado quando o papel atual é "Supervisor"**.
- Exclusão com diálogo de confirmação.
- Listagem atualizada automaticamente após qualquer alteração.

### Aprovações (`/aprovacoes`)
- Filtro por tipo e por data.
- Tabela com tipo, data, solicitante, última modificação e status.
- Botão "Ver detalhes" (modal).
- Aprovar/Rejeitar solicitações pendentes, com atualização imediata do status.

### Gestão (`/gestao`)
- Abas **Papéis e Permissões** e **Operação**, alternáveis por clique.
- **Papéis**: listar, criar, editar (com seleção de permissões via checkboxes), excluir. Não salva sem nome. Botões Salvar/Cancelar.
- **Operação (turnos)**: listar, criar, editar (nome + início + fim), excluir. Não salva sem os campos obrigatórios.
- Listagens atualizadas após qualquer alteração.

### Painel Geral (`/painel`)
Réplica do protótipo enviado: cards de funcionários ativos, presentes, ausentes, falta justificada, não registrados, e equipamentos (cadastrados/em uso/disponíveis).

### Funcionários, Presença e Equipamentos
Páginas com listagem básica e navegação já funcionando — a lógica completa (filtros, CRUD, regras específicas) entra assim que você definir os critérios de aceitação, seguindo o mesmo padrão das páginas acima.

## Próximos passos sugeridos
- Me passar os critérios de aceitação de Funcionários, Presença e Equipamentos.
- Quando o backend estiver pronto: trocar `VITE_USE_MOCK_AUTH` para `false` e substituir as funções dentro de `src/services/*.js` por chamadas reais via `api.js` (a assinatura de cada função já foi pensada para isso).
