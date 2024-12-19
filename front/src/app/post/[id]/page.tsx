'use client'
import CardDetail from '@/components/Card/CardDetail';
import animalsArray from '@/helpers/animalsArray';
import { IPost } from '@/interfaces/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditPost: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<IPost | null>(null)

  useEffect(() => {
    const postId = parseInt(params?.id as string, 10); // Convierte el string a número

    const selectPost = animalsArray.find((item) => item.id === postId) as IPost;
    setPost(selectPost || null);
  }
    , [params])

  if (!post) {
    return <p>Tarjeta/post no encontrada</p>
  }

  return (
    <div>
     <CardDetail {...post}/>
    </div>
  )
};

export default EditPost;





