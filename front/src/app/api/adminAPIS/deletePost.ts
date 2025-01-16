import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deletePost = async (id: string): Promise<void> => {
  try {
    const token = Cookies.get("token");

    console.log("Token obtenido desde cookie:", token);
    console.log("Request URL:", `${API_URL}/admin/post/${id}`);

    if (!token) {
      throw new Error(
        "No se encontró el token de autorización. Inicia sesión nuevamente."
      );
    }

    const response = await fetch(`${API_URL}/admin/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response Status:", response.status);
    console.log("Response Body:", await response.text());

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al eliminar post: ${errorMessage}`);
    }

    console.log("Post eliminado correctamente");
  } catch (error) {
    console.error("Error en deletePost:", error);
    throw error;
  }
};
