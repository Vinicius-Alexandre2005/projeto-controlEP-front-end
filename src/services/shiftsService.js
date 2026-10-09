import { db, delay, nextId } from "../data/mockDb";

export const shiftsService = {
  async list() {
    await delay();
    return [...db.shifts];
  },

  /** payload: { id?, name, startTime, endTime } */
  async save(payload) {
    await delay(300);
    const name = payload.name?.trim();
    const { startTime, endTime } = payload;
    if (!name || !startTime || !endTime) {
      throw new Error("Nome, horário de início e horário de fim são obrigatórios.");
    }

    if (payload.id) {
      const shift = db.shifts.find((s) => s.id === payload.id);
      if (!shift) throw new Error("Turno não encontrado.");
      Object.assign(shift, { name, startTime, endTime });
      return { ...shift };
    }

    const newShift = { id: nextId(), name, startTime, endTime };
    db.shifts.push(newShift);
    return { ...newShift };
  },

  async remove(id) {
    await delay(250);
    const index = db.shifts.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Turno não encontrado.");
    db.shifts.splice(index, 1);
    return true;
  },
};
