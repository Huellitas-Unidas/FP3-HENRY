import { NextApiRequest, NextApiResponse } from 'next';
import { IPost } from '@/interfaces/types'; 
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        title,
        description,
        petType,
        dateLost,
        contactInfo,
        photoUrl,
        userId,
        status,
        location,
      }: Omit<IPost, 'id'> = req.body;

      if (!title || !description || !petType || !dateLost || !contactInfo || !photoUrl || !userId || !status) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
      }

      const normalizedDateLost = new Date(dateLost).toISOString();

      const newPost: IPost = {
        id: uuidv4(),
        title,
        description,
        petType,
        dateLost: normalizedDateLost,
        contactInfo,
        photoUrl,
        userId,
        status,
        location: location || null,
      };

     
      console.log('Nuevo post creado:', newPost);
      return res.status(201).json(newPost);
    } catch (error: unknown) {
      let errorMessage = 'Ocurrió un error desconocido.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Error al crear el post:', errorMessage);
      return res.status(500).json({ message: 'Ocurrió un error al crear el post.', error: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}

