// Para Donations

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "El correo electrónico es requerido.";
  }
  if (!emailRegex.test(email)) {
    return "Por favor, ingresa un correo válido ejemplo: nombre@email.com.";
  }
  return null;
};

export const validateAmount = (amount: string): string | null => {
  const value = Number(amount);
  if (!amount || value < 1) {
    return "El monto debe ser al menos $1.";
  }
  return null;
};

  