'use client';

import React, { useState, useEffect } from 'react';
import { IPost } from '@/interfaces/types'; 
import CardList from '@/components/CardList/CardList';

export default function LostAndFound() {
  const [posts, setPosts] = useState<IPost[]>([]); 
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts?status=lost', { cache: 'no-store' });
      if (response.ok) {
        const data: IPost[] = await response.json(); 
        setPosts(data); 
      } else {
        console.error('Error fetching posts');
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id)); // actualizo mis status con los filtros
    } else {
      console.error('Error deleting post');
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<IPost>) => {
    const response = await fetch('/api/posts', {
      method: 'PATCH',
      body: JSON.stringify({ id, ...updatedData }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const updatedPost: IPost = await response.json();
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post))); //actualizo el post especifico
    } else {
      console.error('Error updating post');
    }
  };

  return (
    <div>
      <h1>Lost and Found</h1>
      <CardList posts={posts} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}
