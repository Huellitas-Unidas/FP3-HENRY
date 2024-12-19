import React from 'react';
import Card from '../Card/Card';
import { IPost } from '@/interfaces/types';

interface CardListProps {
  posts: IPost[]; // Use IPost[] for the posts prop
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedData: Partial<IPost>) => void;
}

const CardList: React.FC<CardListProps> = ({ posts, onDelete, onUpdate }) => {
  return (
    <div className="flex flex-wrap gap-8 p-8 justify-center">
      {posts.map((post) => (
        <Card
          key={post.id}
          {...post}
          onDelete={() => onDelete(post.id)}
          onUpdate={(updatedData) => onUpdate(post.id, updatedData)}
        />
      ))}
    </div>
  );
};

export default CardList;




