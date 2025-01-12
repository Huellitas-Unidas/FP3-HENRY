import { ISignUpData, TSignUpErrors } from "@/interfaces/types";

const validate = (values: ISignUpData): TSignUpErrors => {
  const errors: TSignUpErrors = {};

  const fieldLabels: Record<string, string> = {
    name: "Nombre y Apellido",
    email: "Correo electrónico",
    password: "Contraseña",
    confirm: "Confirmación de contraseña",
    phone: "Teléfono",
  };
  
  // Validar campos requeridos
  (Object.keys(values) as (keyof ISignUpData)[]).forEach((field) => {
    if (!values[field] || (typeof values[field] === "string" && values[field].trim() === "")) {
      errors[field] = `Por favor ingresa  ${fieldLabels[field]}.`
    }
  });

  // Validar nombre completo
  if (values.name && values.name.trim().length > 30) {
    errors.name = `El ${fieldLabels.name} no debe exceder los 30 caracteres.`;
  } else if (
    values.name &&
    !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,}(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,})+$/.test(values.name.trim())
  ) {
    errors.name =
      "Debe ingresar al menos un nombre y un apellido válidos, separados por un espacio.";
  }

  // Validar correo electrónico
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Por favor, ingresa un correo electrónico válido.";
  }

  // Validar contraseña
  if (values.password && !/(?=.*[A-Z])(?=.*\d).{6,}/.test(values.password)) {
    errors.password =
      "La contraseña debe tener al menos 6 caracteres, con una mayúscula y un número.";
  }

  // Validar confirmación de contraseña
  if (values.confirm && values.confirm !== values.password) {
    errors.confirm = "Las contraseñas no coinciden.";
  }

  // Validar teléfono
  const phone = values.phone ? String(values.phone) : "";
  if (!/^\d{7,15}$/.test(phone)) {
    errors.phone = "El teléfono debe contener entre 7 y 15 dígitos.";
  }

  return errors;
};

export default validate;

export const validationGuide = {
  name: "Debe ingresar un nombre y apellido válido, separados por un espacio y máximo de 30 caracteres.",
  email: "Debe ser un correo electrónico válido.",
  password: "Debe tener al menos 6 caracteres, una mayúscula y un número.",
  confirm: "Debe coincidir con la contraseña.",
  phone: "Debe contener entre 7 y 15 dígitos.",
};







