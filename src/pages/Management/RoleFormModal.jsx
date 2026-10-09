import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import FormAlert from "../../components/common/FormAlert";
import { PERMISSIONS } from "../../data/mockDb";

export default function RoleFormModal({ open, role, onClose, onSave }) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName(role?.name || "");
      setPermissions(role?.permissions || []);
      setError("");
    }
  }, [open, role]);

  function togglePermission(permission) {
    setPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
    );
  }

  async function handleSave() {
    setError("");
    if (!name.trim()) {
      setError("O nome do papel é obrigatório.");
      return;
    }
    setSaving(true);
    try {
      await onSave({ id: role?.id, name, permissions });
    } catch (err) {
      setError(err.message || "Não foi possível salvar o papel.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={role ? "Editar papel" : "Novo papel"} size="md">
      <FormAlert message={error} />

      <TextField
        id="role-name"
        label="Nome do papel"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex.: Supervisor"
      />

      <label className="text-field__label" style={{ display: "block", margin: "4px 0 8px" }}>
        Permissões
      </label>
      <div className="checkbox-list">
        {PERMISSIONS.map((permission) => (
          <label key={permission} className="checkbox-item">
            <input
              type="checkbox"
              checked={permissions.includes(permission)}
              onChange={() => togglePermission(permission)}
            />
            {permission}
          </label>
        ))}
      </div>

      <div className="modal-actions">
        <Button variant="secondary" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button onClick={handleSave} loading={saving}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
