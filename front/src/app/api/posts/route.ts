//obtener todas las publicaciones

/*import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const query = status ? `?status=${status}` : ''; // Construir query string solo si `status` está definido.

    const response = await fetch(`${API_URL}/posts${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'No se pudieron obtener las publicaciones' }, { status: response.status });
    }

    const posts = await response.json();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error obteniendo publicaciones:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
*/