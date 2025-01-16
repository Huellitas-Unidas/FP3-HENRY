'use client';

import React from 'react';
import Card from '../Card/Card';

import { IPost } from '@/interfaces/types';

interface CardListProps {
  posts: IPost[]; 
}

const CardList: React.FC<CardListProps> = ({ posts }) => {
  return (
    <div className="flex flex-wrap gap-8 p-8 justify-center">
      {posts.map((post) => (
      
          <Card key={post.id} {...post} />
       
      ))}
    </div>
  );
};

export default CardList;



