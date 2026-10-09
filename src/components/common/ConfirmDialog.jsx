import Modal from "./Modal";
import Button from "./Button";

/**
 * Diálogo de confirmação reutilizável — usado, por exemplo, antes de
 * excluir um usuário, papel ou turno.
 */
export default function ConfirmDialog({
  open,
  title = "Confirmar ação",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <p style={{ margin: "0 0 20px", color: "var(--color-text-secondary)", fontSize: "0.9375rem" }}>
        {message}
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
