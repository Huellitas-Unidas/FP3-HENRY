import Link from 'next/link'
import React from 'react'

const ProtectedRoute = () => {
  return (
    <div className="p-16">
      <h1 className="text-[#244b47] text-2xl font-bold text-center mb-6 mt-4">
        ¡Hola! 🌟 Nos encantaría que formes parte de nuestra comunidad.
      </h1>
      <h2 className="text-gray-800 text-lg mt-6">
        Para acceder a la página de mascotas perdidas y encontradas, es necesario que te registres o inicies sesión. Esto nos ayuda a mantener un espacio seguro y colaborativo para todos. 🐾
      </h2>
      <h2 className="text-gray-800 text-lg mt-4">
        Si ya tienes una cuenta, inicia sesión para continuar. Y si no, ¡regístrate! Nos encantará tenerte aquí. ❤️
      </h2>
      <h2 className="text-gray-800 text-lg mt-4">
        Muchas gracias por tu interés en ser parte de esta hermosa comunidad. 💕
      </h2>

      <div className='flex justify-center gap-6 my-14'>
        <Link href='/login' className='px-8 py-4 rounded-lg text-white text-sm font-semibold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md'>Iniciar Sesión</Link>
        <Link href='/' className='px-8 py-4 rounded-lg text-white text-sm font-semibold border-none outline-none tracking-wide bg-[#2e736b] hover:bg-teal-950 shadow-md'>Volver Al Home</Link>
      </div>
    </div>
  )
}

export default ProtectedRoute