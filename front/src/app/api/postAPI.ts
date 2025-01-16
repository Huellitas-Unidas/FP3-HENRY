import { IPost } from "@/interfaces/types";
import { NextResponse } from "next/server";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined"); 
}

// GET: Obtener un post por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_URL}/posts/${params.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch post" },
        { status: response.status }
      );
    }

    const post = await response.json();
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

if (!API_URL) {
  throw new Error("API_URL no esta definida");
}

// Función para actualizar el estado perdido o encontrado de un post

export async function updatePostStatus(id: string, status: string) {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Token de auth no encontrado");
  }
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Error al actualizar el Post con ID ${id}`
      );
    }

    const result = await response.json();
    return result.updatedPost;

    
  } catch (error) {
    console.error("Error actualizando el post por status:", error);
    throw error;
  }
}

// read - obtener los posteos relacionadas al usuario
export async function getPostsByUser(
  id: string | number
): Promise<IPost[] | []> {
  try {
    const response = await fetch(`${API_URL}/user/${id}/posts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al obtener los posteos del usuario";

    Swal.fire({
      icon: "error",
      iconColor: "rose",
      text: errorMessage,
      title: "No se logró obtener los posteos del usuario",
      customClass: {
        confirmButton:
          "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
      },
    });
    console.error("Error al obtener los posteos del usuario:", errorMessage);
    throw error;
  }
}
