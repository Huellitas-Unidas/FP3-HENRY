const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deletePqr = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/pqr/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar PQR");
  }
};
