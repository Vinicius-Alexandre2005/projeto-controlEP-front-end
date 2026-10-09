import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Landing from "../pages/Landing/Landing";
import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Users/Users";
import Employees from "../pages/Employees/Employees";
import Approvals from "../pages/Approvals/Approvals";
import Management from "../pages/Management/Management";
import Equipment from "../pages/Equipment/Equipment";
import Presence from "../pages/Presence/Presence";

/** Bloqueia rotas internas para quem não está autenticado. */
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

/** Evita que quem já está logado veja a landing page de novo. */
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/painel" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />

      <Route
        path="/painel"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />

      <Route
        path="/funcionarios"
        element={
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        }
      />

      <Route
        path="/presenca"
        element={
          <PrivateRoute>
            <Presence />
          </PrivateRoute>
        }
      />

      <Route
        path="/aprovacoes"
        element={
          <PrivateRoute>
            <Approvals />
          </PrivateRoute>
        }
      />

      <Route
        path="/gestao"
        element={
          <PrivateRoute>
            <Management />
          </PrivateRoute>
        }
      />

      <Route
        path="/equipamentos"
        element={
          <PrivateRoute>
            <Equipment />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
