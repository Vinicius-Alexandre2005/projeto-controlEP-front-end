import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import FormAlert from "../../components/common/FormAlert";

export default function ShiftFormModal({ open, shift, onClose, onSave }) {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName(shift?.name || "");
      setStartTime(shift?.startTime || "");
      setEndTime(shift?.endTime || "");
      setError("");
    }
  }, [open, shift]);

  async function handleSave() {
    setError("");
    if (!name.trim() || !startTime || !endTime) {
      setError("Nome, horário de início e horário de fim são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      await onSave({ id: shift?.id, name, startTime, endTime });
    } catch (err) {
      setError(err.message || "Não foi possível salvar o turno.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={shift ? "Editar turno" : "Novo turno"} size="sm">
      <FormAlert message={error} />

      <TextField
        id="shift-name"
        label="Nome do turno"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex.: Manhã"
      />

      <div style={{ display: "flex", gap: 12 }}>
        <TextField
          id="shift-start"
          label="Início"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TextField
          id="shift-end"
          label="Fim"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
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
