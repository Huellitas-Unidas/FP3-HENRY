export function getUserId(): string | null {
  // Verificar si estamos en el cliente
  if (typeof window === "undefined") {
    return null;
  }

  const userId = localStorage.getItem("userId");

  // Validar si el userId tiene formato de UUID
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (userId && uuidRegex.test(userId)) {
    return userId;
  }

  // Si el userId no es válido
  console.warn(
    `El userId almacenado no es válido. Valor recibido: ${userId || "null"}`
  );
  return null;
}
