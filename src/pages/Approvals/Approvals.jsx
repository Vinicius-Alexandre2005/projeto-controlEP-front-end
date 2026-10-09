import { useCallback, useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import Badge from "../../components/common/Badge";
import FormAlert from "../../components/common/FormAlert";
import SelectField from "../../components/common/SelectField";
import TextField from "../../components/common/TextField";
import { approvalsService, APPROVAL_TYPES } from "../../services/approvalsService";
import { useAuth } from "../../hooks/useAuth";
import ApprovalDetailsModal from "./ApprovalDetailsModal";
import "./Approvals.css";

const STATUS_TONE = {
  pendente: "warning",
  aprovado: "success",
  rejeitado: "error",
};

export default function Approvals() {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [decidingId, setDecidingId] = useState(null);

  const loadApprovals = useCallback(async () => {
    try {
      const data = await approvalsService.list({
        type: typeFilter || undefined,
        date: dateFilter || undefined,
      });
      setApprovals(data);
    } catch (err) {
      setError("Não foi possível carregar as solicitações.");
    }
  }, [typeFilter, dateFilter]);

  useEffect(() => {
    loadApprovals();
  }, [loadApprovals]);

  async function handleDecision(approval, decision) {
    setDecidingId(approval.id);
    setError("");
    try {
      await approvalsService.decide(approval.id, decision, user?.name || "Usuário atual");
      await loadApprovals();
    } catch (err) {
      setError(err.message || "Não foi possível registrar a decisão.");
    } finally {
      setDecidingId(null);
    }
  }

  return (
    <AppShell>
      <div className="page-header">
        <h1 className="page-header__title">Aprovações</h1>
        <p className="page-header__subtitle">
          Solicitações de presença e empréstimo de equipamento aguardando análise.
        </p>
      </div>

      <FormAlert message={error} />

      <div className="page-toolbar">
        <div className="page-toolbar__filters">
          <SelectField
            id="filter-type"
            label="Tipo"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            {APPROVAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>

          <TextField
            id="filter-date"
            label="Data"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Data</th>
              <th>Solicitante</th>
              <th>Última modificação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((approval) => (
              <tr key={approval.id}>
                <td>{approval.type}</td>
                <td>{new Date(approval.date + "T00:00:00").toLocaleDateString("pt-BR")}</td>
                <td>{approval.requestedBy}</td>
                <td>{approval.lastModifiedBy || "—"}</td>
                <td>
                  <Badge tone={STATUS_TONE[approval.status]}>{approval.status}</Badge>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => setSelected(approval)}
                    >
                      Ver detalhes
                    </button>
                    {approval.status === "pendente" && (
                      <>
                        <button
                          type="button"
                          className="icon-button"
                          disabled={decidingId === approval.id}
                          onClick={() => handleDecision(approval, "aprovado")}
                        >
                          Aprovar
                        </button>
                        <button
                          type="button"
                          className="icon-button icon-button--danger"
                          disabled={decidingId === approval.id}
                          onClick={() => handleDecision(approval, "rejeitado")}
                        >
                          Rejeitar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {approvals.length === 0 && (
              <tr>
                <td colSpan={6} className="data-table__empty">
                  Nenhuma solicitação encontrada para os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ApprovalDetailsModal approval={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
