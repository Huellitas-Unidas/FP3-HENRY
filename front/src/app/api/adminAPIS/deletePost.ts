const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteUser = async (userId: string, token: string) => {
  const response = await fetch(`${API_URL}/admin/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }
};
