import { useCallback, useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import Badge from "../../components/common/Badge";
import FormAlert from "../../components/common/FormAlert";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { usersService, AVAILABLE_ROLES } from "../../services/usersService";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await usersService.list();
      setUsers(data);
    } catch (err) {
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  async function handleStatusChange(user) {
    const nextStatus = user.status === "ativo" ? "inativo" : "ativo";
    try {
      await usersService.updateStatus(user.id, nextStatus);
      await loadUsers();
    } catch (err) {
      setError(err.message || "Não foi possível alterar o status.");
    }
  }

  async function handleRoleChange(user, role) {
    if (role === user.role) return;
    try {
      await usersService.updateRole(user.id, role);
      setError("");
      await loadUsers();
    } catch (err) {
      setError(err.message || "Não foi possível alterar o papel.");
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await usersService.remove(pendingDelete.id);
      setPendingDelete(null);
      await loadUsers();
    } catch (err) {
      setError(err.message || "Não foi possível excluir o usuário.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AppShell>
      <div className="page-header">
        <h1 className="page-header__title">Usuários</h1>
        <p className="page-header__subtitle">
          Gerencie o status e o papel de cada usuário da plataforma.
        </p>
      </div>

      <FormAlert message={error} />

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Papel</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const roleLocked = user.role === "Supervisor";
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <label className="status-toggle">
                      <input
                        type="checkbox"
                        checked={user.status === "ativo"}
                        onChange={() => handleStatusChange(user)}
                      />
                      <Badge tone={user.status === "ativo" ? "success" : "neutral"}>
                        {user.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </label>
                  </td>
                  <td>
                    <select
                      className="users-role-select"
                      value={user.role}
                      disabled={roleLocked}
                      title={
                        roleLocked
                          ? "Não é permitido alterar o papel de um usuário Supervisor."
                          : undefined
                      }
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                    >
                      {AVAILABLE_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="icon-button icon-button--danger"
                        onClick={() => setPendingDelete(user)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={5} className="data-table__empty">
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Excluir usuário"
        message={
          pendingDelete
            ? `Tem certeza que deseja excluir "${pendingDelete.name}"? Essa ação não pode ser desfeita.`
            : ""
        }
        confirmLabel="Excluir"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AppShell>
  );
}
