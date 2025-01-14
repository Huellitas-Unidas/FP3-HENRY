const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }
};
