import { db, delay, nextId } from "../data/mockDb";

export const rolesService = {
  async list() {
    await delay();
    return db.roles.map((r) => ({ ...r, permissions: [...r.permissions] }));
  },

  /** payload: { id?, name, permissions[] } */
  async save(payload) {
    await delay(300);
    const name = payload.name?.trim();
    if (!name) {
      throw new Error("O nome do papel é obrigatório.");
    }

    if (payload.id) {
      const role = db.roles.find((r) => r.id === payload.id);
      if (!role) throw new Error("Papel não encontrado.");
      role.name = name;
      role.permissions = payload.permissions || [];
      return { ...role };
    }

    const newRole = {
      id: nextId(),
      name,
      permissions: payload.permissions || [],
    };
    db.roles.push(newRole);
    return { ...newRole };
  },

  async remove(id) {
    await delay(250);
    const index = db.roles.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Papel não encontrado.");
    db.roles.splice(index, 1);
    return true;
  },
};
