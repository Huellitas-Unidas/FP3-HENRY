//Operaciones relacionadas con publicaciones: obtener, actualizar, eliminar.
//API intermedia para obtener un post por ID

 import { NextResponse } from 'next/server';

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const response = await fetch(`${API_URL}/post/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Post not found' }, { status: response.status });
  }

  const post = await response.json();
  return NextResponse.json(post);
}

///////////////******** */


export async function PATCH(req: Request) {
  const { id, ...data } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const response = await fetch(`${API_URL}/post/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: response.status });
  }

  const post = await response.json();
  return NextResponse.json(post);
}
 
/////////////**********///////////***********

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const response = await fetch(`${API_URL}/post/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: response.status });
  }

  return NextResponse.json({ success: true });
}

