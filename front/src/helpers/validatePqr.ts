export const validateField = (name: string, value: string): string => {
    switch (name) {
      case "fullname":
      if (!value) return "El nombre es obligatorio";
      if (value.length < 3) return "El nombre debe tener al menos 3 caracteres";
      if (value.length > 25) return "El nombre no puede tener más de 25 caracteres";
      if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
        return "El nombre solo puede contener letras y espacios";
      const words = value.trim().split(/\s+/);
      if (words.length < 2)
        return "Debes incluir al menos dos palabras (nombre y apellidos)";
      if (words.some((word) => word.length < 3))
        return "Cada palabra debe tener al menos 3 caracteres";
      break;

      case "email":
        if (!value) return "El correo electrónico es requerido";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "El correo electrónico no es válido";
        break;

      case "type":
        if (!value) return "Selecciona el tipo de solicitud";
        break;

        case "description":
          if (!value) return "La descripción es obligatoria";
          if (value.length < 10)
            return "La descripción debe tener al menos 10 caracteres";
          if (value.length > 250)
            return "La descripción no puede tener más de 250 caracteres, 35 a 42 palabras aprox";
          break;

      default:
        return "";
    }
    return "";
  };
  
  export const validateForm = (data: { [key: string]: string }) => {
    const errors: { [key: string]: string } = {};
  
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        errors[key] = error;
      }
    });
  
    return errors;
  };
  