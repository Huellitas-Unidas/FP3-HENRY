const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteUser = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text(); 
    throw new Error(`Error al eliminar usuario: ${errorMessage}`);
  }
};

