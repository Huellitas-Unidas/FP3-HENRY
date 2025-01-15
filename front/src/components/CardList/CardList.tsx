'use client';

import React from 'react';
import Card from '../Card/Card';
//import Link from 'next/link';
import { IPost } from '@/interfaces/types';

interface CardListProps {
  posts: IPost[]; // Recibe los posts como props
}

const CardList: React.FC<CardListProps> = ({ posts }) => {
  return (
    <div className="flex flex-wrap gap-8 p-8 justify-center">
      {posts.map((post) => (
       // <Link  href={`/post/${post.id}`}>
          <Card key={post.id} {...post} />
       // </Link>
      ))}
    </div>
  );
};

export default CardList;






{/*'use client';

import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Link from 'next/link';
import { IPost } from '@/interfaces/types';

const CardList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: IPost[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='flex flex-wrap gap-8 p-8 justify-center'>
      {posts &&
        posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <Card {...post} />
          </Link>
        ))}
    </div>
  );
};

export default CardList;*/}










{/*
import React from "react";
import Card from "../Card/Card";
import Link from "next/link";
import animalsArray from "@/helpers/animalsArray";

const CardList = () => {
  //HARDCODEO DE ARREGLO DE OBJ HASTA QUE ESTEN EN EL BACK
  const animalCard = animalsArray;
  
  return (
    <div className='flex flex-wrap gap-8 p-8 justify-center'>
            { animalCard&&
                animalCard?.map((animal) => {
                    return (
                        <Link key={animal.id} href={`/post/${animal.id}`} >
                            <Card  {...animal} />
                        </Link>
                    )
                })
            }

        </div>
  );
};

export default CardList;
*/}






