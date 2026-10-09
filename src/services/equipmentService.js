import { db, delay } from "../data/mockDb";

// Listagem básica — critérios de aceitação completos desta página ainda
// não foram definidos.
export const equipmentService = {
  async list() {
    await delay();
    return [...db.equipment];
  },
};
