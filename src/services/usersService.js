import { db, delay } from "../data/mockDb";

export const usersService = {
  async list() {
    await delay();
    return [...db.users];
  },

  async updateStatus(id, status) {
    await delay(250);
    const user = db.users.find((u) => u.id === id);
    if (!user) throw new Error("Usuário não encontrado.");
    user.status = status;
    return { ...user };
  },

  async updateRole(id, role) {
    await delay(250);
    const user = db.users.find((u) => u.id === id);
    if (!user) throw new Error("Usuário não encontrado.");
    if (user.role === "Supervisor") {
      throw new Error("Não é permitido alterar o papel de um usuário Supervisor.");
    }
    user.role = role;
    return { ...user };
  },

  async remove(id) {
    await delay(250);
    const index = db.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("Usuário não encontrado.");
    db.users.splice(index, 1);
    return true;
  },
};

export const AVAILABLE_ROLES = ["Administrador", "Supervisor", "Colaborador"];
