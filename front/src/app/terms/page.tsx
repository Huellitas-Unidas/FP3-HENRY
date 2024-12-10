'use client'

import router from 'next/router';
import React, { useState } from 'react'; 

const Terms = () => {
    const [isChecked, setIsChecked] = useState(false); 

    const handleboxChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked); 
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        if (isChecked) {
            alert("Envió formulario exitoso")
            router.push("/dashboard"); 
        } else {
          alert("Por favor, acepta los términos y condiciones para continuar.");
          return router.push("/");
    
        }; 
    }; 

  return (
    <form onSubmit={handleSubmit}>
        <h1 className='text-center text-xl mb-4'>Términos y Condiciones</h1>
        <div>
        <p className='mb-4'>¡Atención! 📢 Te invitamos a leer y confirmar los términos 
            y condiciones de nuestra plataforma.</p>
            <p className='mt-2 mb-4'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus reiciendis
               iste voluptas nemo, corporis quisquam, ullam molestiae quis voluptate, 
              autem iusto? Quos, quisquam consequuntur eveniet quasi quidem ad repellat pariatur!
            </p>
            </div>
            <div className='mb-4'>
                <input 
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={handleboxChanged}
                className='w-6 h-6 text-xl rounded-md focus: ring-1'
                />
                <label htmlFor="terms" className='ml-4'>
                He leído y estoy de acuerdo con los términos y condiciones.
                </label>
        </div>
        <button
        type="submit"
        className={`px-6 py-2 rounded font-bold text-white ${
          isChecked ? "bg-teal-500 hover:bg-teal-600" : "bg-gray-300 cursor-not-allowed"
        }`}
        
      >
        Continuar
      </button>
    </form>
  );
}; 

export default Terms; 

{/*disabled={!isChecked}*/}