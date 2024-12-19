//Envía datos para crear un nuevo post al backend.

import { NextResponse } from 'next/server';

//const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function POST(req: Request) {
  const formData = await req.formData();

  const response = await fetch('${API_URL}/posts', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: response.status });
  }

  const post = await response.json();
  return NextResponse.json(post);
}


