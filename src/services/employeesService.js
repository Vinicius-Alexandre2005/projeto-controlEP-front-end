import { db, delay } from "../data/mockDb";

// Listagem básica — critérios de aceitação completos desta página ainda
// não foram definidos. Estrutura pronta para ganhar filtros/CRUD depois.
export const employeesService = {
  async list() {
    await delay();
    return [...db.employees];
  },
};
