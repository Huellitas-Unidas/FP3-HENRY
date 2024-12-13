// Página que lista publicaciones de Lost & Found
import CardList from '@/components/CardList/CardList'
import React from 'react'

const LostAndFound = () => {
  return (
    <div>
      <CardList />
    </div>
  );
};

export default LostAndFound; 

//EL LOSTANDFOUND SOLO LO VEN LAS PERSONAS REGISTRADAS
//3 Botones Perdidos, Encontrados, Todos
//AGREGAR BOTON 'QUIERO PUBLICAR MASCOTA'  y lleve a (/post)