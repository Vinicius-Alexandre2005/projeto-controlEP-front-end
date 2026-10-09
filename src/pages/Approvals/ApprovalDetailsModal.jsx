import Modal from "../../components/common/Modal";
import Badge from "../../components/common/Badge";

export default function ApprovalDetailsModal({ approval, onClose }) {
  return (
    <Modal open={Boolean(approval)} onClose={onClose} title="Detalhes da solicitação" size="md">
      {approval && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <strong>Tipo:</strong> {approval.type}
          </div>
          <div>
            <strong>Data:</strong> {new Date(approval.date + "T00:00:00").toLocaleDateString("pt-BR")}
          </div>
          <div>
            <strong>Solicitado por:</strong> {approval.requestedBy}
          </div>
          <div>
            <strong>Última modificação por:</strong> {approval.lastModifiedBy || "—"}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <Badge tone={approval.status === "pendente" ? "warning" : approval.status === "aprovado" ? "success" : "error"}>
              {approval.status}
            </Badge>
          </div>
          <div>
            <strong>Descrição:</strong>
            <p style={{ margin: "6px 0 0", color: "var(--color-text-secondary)" }}>
              {approval.details}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
