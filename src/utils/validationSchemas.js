import * as yup from "yup";

// Regra de senha: 8 a 20 caracteres, com ao menos 1 maiúscula, 1 minúscula,
// 1 número e 1 caractere especial.
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

export const passwordRules = {
  minLength: 8,
  maxLength: 20,
  hasUpper: /[A-Z]/,
  hasLower: /[a-z]/,
  hasNumber: /\d/,
  hasSpecial: /[^A-Za-z0-9]/,
};

export const registerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("O e-mail é obrigatório.")
    .email("Informe um e-mail em um formato válido."),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(passwordRules.minLength, "A senha deve ter entre 8 e 20 caracteres.")
    .max(passwordRules.maxLength, "A senha deve ter entre 8 e 20 caracteres.")
    .matches(passwordRules.hasUpper, "A senha deve conter ao menos uma letra maiúscula.")
    .matches(passwordRules.hasLower, "A senha deve conter ao menos uma letra minúscula.")
    .matches(passwordRules.hasNumber, "A senha deve conter ao menos um número.")
    .matches(passwordRules.hasSpecial, "A senha deve conter ao menos um caractere especial."),
  confirmPassword: yup
    .string()
    .required("A confirmação de senha é obrigatória.")
    .oneOf([yup.ref("password")], "As senhas não coincidem."),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("O e-mail é obrigatório.")
    .email("Informe um e-mail em um formato válido."),
  password: yup.string().required("A senha é obrigatória."),
});
