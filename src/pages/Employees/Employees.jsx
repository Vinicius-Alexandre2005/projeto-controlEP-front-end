import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import Badge from "../../components/common/Badge";
import { employeesService } from "../../services/employeesService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    employeesService.list().then(setEmployees);
  }, []);

  return (
    <AppShell>
      <div className="page-header">
        <h1 className="page-header__title">Funcionários</h1>
        <p className="page-header__subtitle">
          Listagem básica dos funcionários cadastrados. Critérios de aceitação completos desta
          página ainda serão definidos.
        </p>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Turno</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.shift}</td>
                <td>
                  <Badge tone={employee.status === "ativo" ? "success" : "neutral"}>
                    {employee.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="data-table__empty">
                  Nenhum funcionário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
