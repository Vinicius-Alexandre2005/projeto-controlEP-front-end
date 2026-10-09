// Base de dados simulada em memória. Serve para o front funcionar de ponta
// a ponta sem um backend ainda pronto. Quando a API real existir, cada
// arquivo em src/services/*.js pode trocar essas funções por chamadas
// via src/services/api.js (axios) mantendo a mesma assinatura.

let idCounter = 1000;
export function nextId() {
  idCounter += 1;
  return String(idCounter);
}

// Simula latência de rede para os componentes já lidarem com loading/erro.
export function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const PERMISSIONS = [
  "Ver painel",
  "Gerenciar usuários",
  "Gerenciar funcionários",
  "Registrar presença",
  "Aprovar solicitações",
  "Gerenciar papéis e permissões",
  "Gerenciar turnos",
  "Gerenciar equipamentos",
];

export const db = {
  users: [
    {
      id: "1",
      name: "Lyan Vinícius",
      email: "vinizacken@gmail.com",
      status: "ativo",
      role: "Supervisor",
    },
    {
      id: "2",
      name: "Marina Alves",
      email: "marina.alves@controlep.com",
      status: "ativo",
      role: "Administrador",
    },
    {
      id: "3",
      name: "João Pedro Souza",
      email: "joao.souza@controlep.com",
      status: "inativo",
      role: "Colaborador",
    },
  ],

  roles: [
    {
      id: "r1",
      name: "Administrador",
      permissions: [...PERMISSIONS],
    },
    {
      id: "r2",
      name: "Supervisor",
      permissions: [
        "Ver painel",
        "Gerenciar funcionários",
        "Registrar presença",
        "Aprovar solicitações",
        "Gerenciar equipamentos",
      ],
    },
    {
      id: "r3",
      name: "Colaborador",
      permissions: ["Ver painel", "Registrar presença"],
    },
  ],

  shifts: [
    { id: "s1", name: "Manhã", startTime: "06:00", endTime: "14:00" },
    { id: "s2", name: "Tarde", startTime: "14:00", endTime: "22:00" },
    { id: "s3", name: "Noite", startTime: "22:00", endTime: "06:00" },
  ],

  employees: [
    { id: "e1", name: "João Pedro Souza", role: "Técnico", shift: "Manhã", status: "ativo" },
    { id: "e2", name: "Marina Alves", role: "Supervisora", shift: "Tarde", status: "ativo" },
    { id: "e3", name: "Carlos Eduardo Lima", role: "Técnico", shift: "Noite", status: "ativo" },
  ],

  equipment: [
    { id: "eq1", name: "Notebook Dell 05", category: "Notebook", status: "disponível" },
  ],

  approvals: [
    {
      id: "a1",
      type: "Presença",
      date: "2026-09-22",
      requestedBy: "João Pedro Souza",
      lastModifiedBy: null,
      status: "pendente",
      details:
        "Solicitação de justificativa de falta no dia 22/09/2026, motivo: consulta médica.",
    },
    {
      id: "a2",
      type: "Empréstimo de equipamento",
      date: "2026-09-23",
      requestedBy: "Carlos Eduardo Lima",
      lastModifiedBy: null,
      status: "pendente",
      details: "Solicitação de empréstimo do Notebook Dell 05 por 3 dias para trabalho externo.",
    },
    {
      id: "a3",
      type: "Presença",
      date: "2026-09-20",
      requestedBy: "Marina Alves",
      lastModifiedBy: "Lyan Vinícius",
      status: "aprovado",
      details: "Ajuste de horário de entrada no dia 20/09/2026.",
    },
  ],
};
