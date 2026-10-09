import { useCallback, useEffect, useState } from "react";
import Button from "../../components/common/Button";
import FormAlert from "../../components/common/FormAlert";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { rolesService } from "../../services/rolesService";
import RoleFormModal from "./RoleFormModal";

export default function RolesTab() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadRoles = useCallback(async () => {
    try {
      const data = await rolesService.list();
      setRoles(data);
    } catch (err) {
      setError("Não foi possível carregar os papéis.");
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  function openNewRole() {
    setEditingRole(null);
    setFormOpen(true);
  }

  function openEditRole(role) {
    setEditingRole(role);
    setFormOpen(true);
  }

  async function handleSave(payload) {
    await rolesService.save(payload);
    setFormOpen(false);
    await loadRoles();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await rolesService.remove(pendingDelete.id);
      setPendingDelete(null);
      await loadRoles();
    } catch (err) {
      setError(err.message || "Não foi possível excluir o papel.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <FormAlert message={error} />

      <div className="page-toolbar">
        <span />
        <Button style={{ width: "auto" }} onClick={openNewRole}>
          Novo papel
        </Button>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Papel</th>
              <th>Permissões</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td style={{ fontWeight: 600 }}>{role.name}</td>
                <td>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {role.permissions.map((permission) => (
                      <span key={permission} className="badge badge--neutral">
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="row-actions">
                    <button type="button" className="icon-button" onClick={() => openEditRole(role)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="icon-button icon-button--danger"
                      onClick={() => setPendingDelete(role)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {roles.length === 0 && (
              <tr>
                <td colSpan={3} className="data-table__empty">
                  Nenhum papel cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RoleFormModal
        open={formOpen}
        role={editingRole}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Excluir papel"
        message={
          pendingDelete
            ? `Tem certeza que deseja excluir o papel "${pendingDelete.name}"?`
            : ""
        }
        confirmLabel="Excluir"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
