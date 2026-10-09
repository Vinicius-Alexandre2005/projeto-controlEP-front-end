import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

// Enquanto o Client ID real não é configurado no .env, usamos um valor
// vazio válido para o provider não quebrar a aplicação — o botão do
// Google mostra um aviso nesse caso (ver GoogleAuthButton.jsx).
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
