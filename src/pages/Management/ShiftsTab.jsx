import { useCallback, useEffect, useState } from "react";
import Button from "../../components/common/Button";
import FormAlert from "../../components/common/FormAlert";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { shiftsService } from "../../services/shiftsService";
import ShiftFormModal from "./ShiftFormModal";

export default function ShiftsTab() {
  const [shifts, setShifts] = useState([]);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadShifts = useCallback(async () => {
    try {
      const data = await shiftsService.list();
      setShifts(data);
    } catch (err) {
      setError("Não foi possível carregar os turnos.");
    }
  }, []);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  function openNewShift() {
    setEditingShift(null);
    setFormOpen(true);
  }

  function openEditShift(shift) {
    setEditingShift(shift);
    setFormOpen(true);
  }

  async function handleSave(payload) {
    await shiftsService.save(payload);
    setFormOpen(false);
    await loadShifts();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await shiftsService.remove(pendingDelete.id);
      setPendingDelete(null);
      await loadShifts();
    } catch (err) {
      setError(err.message || "Não foi possível excluir o turno.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <FormAlert message={error} />

      <div className="page-toolbar">
        <span />
        <Button style={{ width: "auto" }} onClick={openNewShift}>
          Novo turno
        </Button>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td style={{ fontWeight: 600 }}>{shift.name}</td>
                <td>{shift.startTime}</td>
                <td>{shift.endTime}</td>
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => openEditShift(shift)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="icon-button icon-button--danger"
                      onClick={() => setPendingDelete(shift)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {shifts.length === 0 && (
              <tr>
                <td colSpan={4} className="data-table__empty">
                  Nenhum turno cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ShiftFormModal
        open={formOpen}
        shift={editingShift}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Excluir turno"
        message={
          pendingDelete ? `Tem certeza que deseja excluir o turno "${pendingDelete.name}"?` : ""
        }
        confirmLabel="Excluir"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
