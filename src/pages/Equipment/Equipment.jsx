import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import Badge from "../../components/common/Badge";
import { equipmentService } from "../../services/equipmentService";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    equipmentService.list().then(setEquipment);
  }, []);

  return (
    <AppShell>
      <div className="page-header">
        <h1 className="page-header__title">Equipamentos</h1>
        <p className="page-header__subtitle">
          Listagem básica dos equipamentos cadastrados. Critérios de aceitação completos desta
          página ainda serão definidos.
        </p>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Equipamento</th>
              <th>Categoria</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <Badge tone={item.status === "disponível" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </td>
              </tr>
            ))}

            {equipment.length === 0 && (
              <tr>
                <td colSpan={3} className="data-table__empty">
                  Nenhum equipamento cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
