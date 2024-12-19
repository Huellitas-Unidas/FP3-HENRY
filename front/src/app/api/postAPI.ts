

//Obtener lista de posts, filtrados opcionalmente por estado.

import { NextResponse } from 'next/server';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  const response = await fetch(`${API_URL}/posts?status=${status || ''}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: response.status });
  }

  const posts = await response.json();
  return NextResponse.json(posts);
}





