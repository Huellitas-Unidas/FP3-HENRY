'use client'
import React, { useState } from 'react'

//  FALTA FUNCIONALIAD:
// 1.  DEL X PARA CIERRE (ONCLICK)
// 2. ENVIAR FORMULARIO (HANDLESUBMIT)
// 3. CANCELAR EL FORMULARIO
// 4. AGREGAR IMAGENES

const ModalPAge = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className={`w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative 
                            transition-transform transform scale-0 animate-in fade-in duration-300 ease-in-out ${isModalOpen ? 'scale-100' : ''}`}>
                <div className="flex items-center">
                    <h3 className="text-blue-600 text-xl font-bold flex-1">Publicar una mascota perdida o encontrada</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                        viewBox="0 0 320.591 320.591"
                        onClick={() => setIsModalOpen(false)}>
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"></path>
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"></path>
                    </svg>
                </div>

                <form className="space-y-4 mt-8">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Nombre del animal</label>
                        <input type="text" placeholder="Enter product name"
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Foto</label>
                        <input type="file" placeholder="adjunte foto del animal"
                            accept="image/*"
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Descripción</label>
                        <textarea placeholder='Escriba caracteristicas del animal encontrado o perdido'
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"></textarea>
                    </div>
                    <div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Tipo</label>
                            <select
                                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                                required
                            >
                                <option value="">Seleccione un tipo</option>
                                <option value="perdido">Perdido</option>
                                <option value="encontrado">Encontrado</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Fecha que lo encontró o perdió</label>
                        <input type="date" placeholder="agregue la fecha"
                            min="2023-01-01"
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Ubicación</label>
                        <input type="text" placeholder="Escriba detalladamente la ubicación donde encontró o perdió el animal"
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Número de teléfono de contacto</label>
                        <input type="tel" placeholder="Ej: +54 11 1234 5678"
                            pattern="[+]{0,1}[0-9\s]{10,15}"
                            required
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>

                    <div className="flex justify-end gap-4 !mt-8">
                        <button type="button"
                            className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300">Cancelar</button>
                        <button type="button"
                            className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700">Publicar</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default ModalPAge