import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "../../components/common/TextField";
import PasswordField from "../../components/common/PasswordField";
import Button from "../../components/common/Button";
import FormAlert from "../../components/common/FormAlert";
import Divider from "../../components/common/Divider";
import GoogleAuthButton from "../../components/common/GoogleAuthButton";

import { loginSchema } from "../../utils/validationSchemas";
import { authService, getApiErrorMessage } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

/**
 * Formulário de login, pensado para ser usado dentro do AuthModal
 * (pop-up da página inicial). onSuccess é chamado após autenticar.
 */
export default function LoginForm({ onSuccess }) {
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  async function onSubmit(formData) {
    setApiError("");
    setSubmitting(true);
    try {
      const { token, user } = await authService.login(formData);
      signIn({ token, user });
      onSuccess?.();
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Não foi possível entrar."));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleCredential(credential) {
    setApiError("");
    setSubmitting(true);
    try {
      const { token, user } = await authService.loginWithGoogle(credential);
      signIn({ token, user });
      onSuccess?.();
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Não foi possível entrar com o Google."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <FormAlert message={apiError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          id="login-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordField
          id="login-password"
          label="Senha"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" loading={submitting}>
          Entrar
        </Button>
      </form>

      <Divider />

      <GoogleAuthButton
        label="signin_with"
        onCredential={handleGoogleCredential}
        onError={setApiError}
      />
    </div>
  );
}
