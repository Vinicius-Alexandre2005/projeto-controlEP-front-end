import { db, delay } from "../data/mockDb";

// Calcula os números do Painel Geral a partir dos mesmos dados mock
// usados nas outras páginas, para os cards ficarem consistentes entre si.
export const dashboardService = {
  async getSummary() {
    await delay();

    const activeEmployees = db.employees.filter((e) => e.status === "ativo").length;
    const equipmentTotal = db.equipment.length;
    const equipmentInUse = 0;

    return {
      date: new Date().toLocaleDateString("pt-BR"),
      activeEmployees,
      present: 0,
      absent: 0,
      justified: 0,
      unregistered: activeEmployees,
      equipmentRegistered: equipmentTotal,
      equipmentInUse,
      equipmentAvailable: equipmentTotal - equipmentInUse,
    };
  },
};
