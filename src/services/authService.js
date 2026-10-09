import api from "./api";
import { db } from "../data/mockDb";

/**
 * Extrai uma mensagem de erro amigável a partir da resposta da API.
 * Ajuste os campos (error.response.data.message) conforme o contrato
 * real do backend que você vai integrar.
 */
export function getApiErrorMessage(error, fallback) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.response?.status === 401) {
    return "E-mail ou senha inválidos.";
  }
  if (error?.response?.status === 409) {
    return "Já existe uma conta cadastrada com este e-mail.";
  }
  return fallback || "Ocorreu um erro inesperado. Tente novamente.";
}

// Enquanto o backend não está pronto (VITE_USE_MOCK_AUTH=true no .env),
// login/cadastro funcionam com dados simulados, para o site inteiro poder
// ser navegado de ponta a ponta. Basta trocar a env para "false" (ou apagar)
// assim que a API real estiver disponível — o restante do código não muda.
const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";

function buildMockSession(email) {
  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  const user = existing || {
    id: "demo",
    name: email.split("@")[0],
    email,
    status: "ativo",
    role: "Administrador",
  };
  return {
    token: "mock-token",
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

export const authService = {
  async register({ email, password }) {
    if (USE_MOCK_AUTH) {
      return buildMockSession(email);
    }
    const { data } = await api.post("/auth/register", { email, password });
    return data;
  },

  async login({ email, password }) {
    if (USE_MOCK_AUTH) {
      return buildMockSession(email);
    }
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  /**
   * Envia o credential (ID token JWT) recebido do Google ao backend,
   * que deve validar o token e retornar o usuário/token da aplicação.
   */
  async loginWithGoogle(credential) {
    if (USE_MOCK_AUTH) {
      return buildMockSession("usuario.google@controlep.com");
    }
    const { data } = await api.post("/auth/google", { credential });
    return data;
  },

  async registerWithGoogle(credential) {
    if (USE_MOCK_AUTH) {
      return buildMockSession("usuario.google@controlep.com");
    }
    const { data } = await api.post("/auth/google/register", { credential });
    return data;
  },
};
