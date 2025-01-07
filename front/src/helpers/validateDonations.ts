// Para Donations

export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "El correo electrónico es requerido.";
    }
    if (!emailRegex.test(email)) {
      return "Por favor, ingresa un correo válido.";
    }
    return "";
  };
  
  export const validateAmount = (amount: number): string => {
    if (amount < 1) {
      return "El monto debe ser al menos $1.";
    }
    return "";
  };
  