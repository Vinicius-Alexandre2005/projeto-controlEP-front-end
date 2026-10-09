import { GoogleLogin } from "@react-oauth/google";

/**
 * Wrapper em volta do botão oficial do @react-oauth/google.
 * onCredential recebe o `credentialResponse.credential` (ID token JWT),
 * que deve ser enviado ao backend para validação (ver authService).
 *
 * Se VITE_GOOGLE_CLIENT_ID ainda não foi configurado, mostramos um botão
 * desabilitado em vez de deixar o SDK do Google quebrar a tela.
 */
export default function GoogleAuthButton({ onCredential, onError, label }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <button type="button" className="app-button app-button--secondary" disabled>
        Continuar com Google (configure o Client ID)
      </button>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse?.credential) {
            onCredential(credentialResponse.credential);
          } else {
            onError?.("Não foi possível obter as credenciais do Google.");
          }
        }}
        onError={() => {
          onError?.("Falha ao autenticar com o Google. Tente novamente.");
        }}
        text={label || "continue_with"}
        width="100%"
        locale="pt-BR"
      />
    </div>
  );
}
