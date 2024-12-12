import { IValidateErrors } from "@/interfaces/types";

const validate = (values: IValidateErrors): IValidateErrors => {
  const errors: IValidateErrors = {};

  (Object.keys(values) as (keyof IValidateErrors)[]).forEach((field) => {
    if (!values[field]) {
      errors[field] = "Este campo es requerido.";
    }
  });

  if (values.name && !/^[a-zA-Z\s]{1,30}$/.test(values.name)) {
    errors.name =
      "El nombre debe contener solo letras y no más de 30 caracteres.";
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  if (values.password && !/(?=.*[A-Z])(?=.*\d).{6,}/.test(values.password)) {
    errors.password =
      "La contraseña debe tener al menos una mayúscula, un número y 6 caracteres.";
  }

  if (values.confirm && values.confirm !== values.password) {
    errors.confirm = "Las contraseñas no coinciden.";
  }

  if (values.phone && !/^\+?\d{7,15}$/.test(values.phone)) {
    errors.phone =
      "El teléfono debe ser válido (entre 7 y 15 dígitos, con opcional +).";
  }

  return errors;
};

export default validate;
