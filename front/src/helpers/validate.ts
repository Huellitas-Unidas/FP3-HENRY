import { ISignUpData, TSignUpErrors } from "@/interfaces/types";

const validate = (values: ISignUpData): TSignUpErrors => {
  const errors: TSignUpErrors = {};

  // Validar campos requeridos
  (Object.keys(values) as (keyof ISignUpData)[]).forEach((field) => {
    if (!values[field] || (typeof values[field] === "string" && values[field].trim() === "")) {
      errors[field] = "Este campo es requerido.";
    }
  });

  // Validar nombre
  if (values.name && !/^[a-zA-Z\s]{1,30}$/.test(values.name)) {
    errors.name = "El nombre debe contener solo letras y no más de 30 caracteres.";
  }

  // Validar correo electrónico
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  // Validar contraseña
  if (values.password && !/(?=.*[A-Z])(?=.*\d).{6,}/.test(values.password)) {
    errors.password = "La contraseña debe tener al menos 6 caracteres, con una mayúscula y un número.";
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





