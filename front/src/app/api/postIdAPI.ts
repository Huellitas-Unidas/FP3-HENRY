import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!API_URL) {
      console.error('API_URL is not defined');
      return NextResponse.json({ error: 'Error interno del Servidor: API_URL no esta definida' }, { status: 500 });
    }

    const response = await fetch(`${API_URL}/posts/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'No fue posible encontrar el post' }, { status: response.status });
    }

    const post = await response.json();
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


/*export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!API_URL) {
      console.error('API_URL is not defined');
      return NextResponse.json({ error: 'Internal server error: API_URL is not defined' }, { status: 500 });
    }

    const response = await fetch(`${API_URL}/posts/${params.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to delete post' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} */
