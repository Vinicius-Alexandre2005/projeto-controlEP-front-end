import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "../../components/common/TextField";
import PasswordField from "../../components/common/PasswordField";
import Button from "../../components/common/Button";
import FormAlert from "../../components/common/FormAlert";
import Divider from "../../components/common/Divider";
import GoogleAuthButton from "../../components/common/GoogleAuthButton";

import { registerSchema } from "../../utils/validationSchemas";
import { authService, getApiErrorMessage } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

/**
 * Formulário de cadastro, pensado para ser usado dentro do AuthModal
 * (pop-up da página inicial). onSuccess é chamado após cadastrar.
 */
export default function RegisterForm({ onSuccess }) {
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  async function onSubmit(formData) {
    setApiError("");
    setSubmitting(true);
    try {
      const { token, user } = await authService.register({
        email: formData.email,
        password: formData.password,
      });
      signIn({ token, user });
      onSuccess?.();
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Não foi possível concluir o cadastro."));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleCredential(credential) {
    setApiError("");
    setSubmitting(true);
    try {
      const { token, user } = await authService.registerWithGoogle(credential);
      signIn({ token, user });
      onSuccess?.();
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Não foi possível cadastrar com o Google."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <FormAlert message={apiError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          id="register-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordField
          id="register-password"
          label="Senha"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordField
          id="register-confirmPassword"
          label="Confirmar senha"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" loading={submitting}>
          Cadastrar
        </Button>
      </form>

      <Divider />

      <GoogleAuthButton
        label="signup_with"
        onCredential={handleGoogleCredential}
        onError={setApiError}
      />
    </div>
  );
}
