import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/painel", label: "Painel", icon: "▦" },
  { to: "/presenca", label: "Presença", icon: "🗓" },
  { to: "/funcionarios", label: "Funcionários", icon: "👥" },
  { to: "/aprovacoes", label: "Aprovações", icon: "✔" },
  { to: "/gestao", label: "Gestão", icon: "⚙" },
  { to: "/equipamentos", label: "Equipamentos", icon: "🖥" },
];

export default function Sidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/");
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__brand">
          <span className="sidebar__brand-mark">
            Control <span className="sidebar__brand-accent">EP</span>
          </span>
          <span className="sidebar__brand-tagline">Presença &amp; Equipamentos</span>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
            >
              <span className="sidebar__link-icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__user"
          onClick={() => navigate("/usuarios")}
          title="Gerenciar usuários"
        >
          <span className="sidebar__user-name">{user?.name || "Usuário"}</span>
          <span className="sidebar__user-email">{user?.email}</span>
        </button>
        <button type="button" className="sidebar__signout" onClick={handleSignOut}>
          <span aria-hidden="true">↪</span> Sair
        </button>
      </div>
    </aside>
  );
}
