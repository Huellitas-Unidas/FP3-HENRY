export function getUserId(): string | null {
  const userId = localStorage.getItem("userId");
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (userId && uuidRegex.test(userId)) {
    return userId;
  }

  console.warn(
    `El userId almacenado no es válido. Valor recibido: ${userId || "null"}`
  );
  return null;
}
