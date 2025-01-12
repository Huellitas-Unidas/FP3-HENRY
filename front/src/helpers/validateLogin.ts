import { IUserData } from "@/interfaces/types";

const validate = (values: IUserData): Partial<IUserData> => {
    const errors: Partial<IUserData> = {};
  
    if (!values.email) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "El correo electrónico no es válido, debe ser similar a: nombre@email.com";
    }
  
    if (!values.password) {
      errors.password = "La contraseña es obligatoria.";
    } else if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres, con una mayúscula y un número.";
    }
  
    return errors;
  };
  
  export default validate;

  