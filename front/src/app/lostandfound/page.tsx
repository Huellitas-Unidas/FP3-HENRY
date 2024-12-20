import ButtonCreatePost from '@/components/Buttons/ButtonCreatePost';
import ButtonLostAndFound from '@/components/Buttons/ButtonLostAndFound';
import CardList from '@/components/CardList/CardList'
import React from 'react'

const LostAndFound = () => {
  
  return (
    <div>
       <ButtonCreatePost/>
      <ButtonLostAndFound/>  
      <CardList />
    </div>
  );
};

export default LostAndFound;

//EL LOSTANDFOUND SOLO LO VEN LAS PERSONAS REGISTRADAS
