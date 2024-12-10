//Página para Peticiones, Quejas y Reclamos
import React from 'react'

const Pqr = () => {
  return (
    <section className="bg-white p-8 text-teal-700">
  <h1 className="text-2xl font-bold mb-4">Peticiones, Quejas y Reclamos</h1>
  <p className="mb-6">Para procesar tú solicitud, porfavor diligencia este formulario</p>
  <form className="space-y-6">
    <input type="text" placeholder="Nombre" className="border rounded w-full p-2" />
    <input type="email" placeholder="Correo Electrónico" className="border rounded w-full p-2" />
    <select className="border rounded w-full p-2">
      <option value="peticion">Petición</option>
      <option value="queja">Queja</option>
      <option value="reclamo">Reclamo</option>
    </select>
    <textarea placeholder="Descripción" className="border rounded w-full p-2" rows={4}></textarea>
    <button type="submit" className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600">
      Enviar Solicitud!
    </button>
  </form>
</section>

  )
}

export default Pqr;

