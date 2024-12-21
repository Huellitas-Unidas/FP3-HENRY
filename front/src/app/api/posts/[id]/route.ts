//manejar publicaciones por ID obtener, actualizar, eliminar
/*
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener un post por ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID es obligatorio' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: response.status });
    }

    const post = await response.json();
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error obteniendo el post:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Actualizar un post por ID
export async function PATCH(req: Request) {
  try {
    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID es obligatorio' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'No se pudo actualizar el post' }, { status: response.status });
    }

    const post = await response.json();
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error actualizando el post:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Eliminar un post por ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID es obligatorio' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'No se pudo eliminar el post' }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error eliminando el post:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
*/