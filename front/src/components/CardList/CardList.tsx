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
