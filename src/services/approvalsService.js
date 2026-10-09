import { db, delay } from "../data/mockDb";

export const APPROVAL_TYPES = ["Presença", "Empréstimo de equipamento"];

export const approvalsService = {
  /** filters: { type?: string, date?: 'YYYY-MM-DD' } */
  async list(filters = {}) {
    await delay();
    return db.approvals
      .filter((item) => (filters.type ? item.type === filters.type : true))
      .filter((item) => (filters.date ? item.date === filters.date : true))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  },

  async decide(id, decision, decidedBy) {
    await delay(300);
    const item = db.approvals.find((a) => a.id === id);
    if (!item) throw new Error("Solicitação não encontrada.");
    if (item.status !== "pendente") {
      throw new Error("Esta solicitação já foi analisada.");
    }
    item.status = decision; // "aprovado" | "rejeitado"
    item.lastModifiedBy = decidedBy;
    return { ...item };
  },
};
