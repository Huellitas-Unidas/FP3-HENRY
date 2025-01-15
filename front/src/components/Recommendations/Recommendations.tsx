import React from 'react';

const Recommendations = () => {
    return (
        <div className="py-4 flex flex-wrap justify-start">
            <div className="sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full sm:w-[48%] lg:w-[30%] max-w-xl rounded-lg font-[sans-serif] overflow-hidden mx-2 my-4">
                <div className="flex items-center">
                    <img src="/images/peluIvana.png" className="w-32 h-32 ml-4" alt="Peluquería Ivanna" />
                    <div className="flex flex-col p-4 m-2">
                        <h2 className="text-lg font-semibold text-gray-900 text-center">Peluquería Canina +QUE PELU</h2>
                        <h3 className="text-gray-800 text-lg mt-4 mb-3 text-center">Ivanna</h3>
                        <p className="mb-2"><strong>Ubicación: </strong> Arturo Illia Nº 87, Santiago del Estero (Capital), Argentina</p>
                        <p className="mb-2"><strong>Teléfono: </strong> (+54 9 0385) 155 98-4543</p>
                        <p><strong>Descripción: </strong> Baños y cortes higiénicos. Guardería Felina y Canina. Todos nuestros trabajos son realizados con amor y para ellos.</p>
                    </div>
                </div>
            </div>
            <div className="sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full sm:w-[48%] lg:w-[30%] max-w-xl rounded-lg font-[sans-serif] overflow-hidden mx-2 my-4">
                <div className="flex items-center">
                    <img src="/images/laHuella.jpeg" className="w-32 h-32 ml-6" alt="Transporte de Mascotas" />
                    <div className="flex flex-col p-4">
                        <h2 className="text-lg font-semibold text-gray-900 text-center">Transporte de Mascotas</h2>
                        <h3 className="text-gray-800 text-lg mt-4 mb-3 text-center">Sebastián Domínguez</h3>
                        <p className="mb-2"><strong>Ubicación: </strong>Santiago del Estero (Capital), Argentina</p>
                        <p className="mb-2"><strong>Teléfono: </strong>(+54 9 0385) 156 14-3917</p>
                        <p><strong>Descripción: </strong>Traslado de mascotas las 24 horas. Contamos con traslado a bajo costo para refugios y personas dedicadas a la ayuda de animales en situación de calle.</p>
                    </div>
                </div>
            </div>
            <div className="sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full sm:w-[48%] lg:w-[30%] max-w-xl rounded-lg font-[sans-serif] overflow-hidden mx-2 my-4">
                <div className="flex items-center">
                    <img src="/images/forrajeria1.jpeg" className="w-32 h-32 ml-6" alt="Forrajería Solo Mascotas" />
                    <div className="flex flex-col p-4">
                        <h2 className="text-lg font-semibold text-gray-900 text-center">Forrajería Solo Mascotas</h2>
                        <h3 className="text-gray-800 text-lg mt-4 mb-3 text-center">Artículos para Mascotas</h3>
                        <p className="mb-2"><strong>Ubicación: </strong>Mitre Nº 312, Santiago del Estero (Capital), Argentina</p>
                        <p className="mb-2"><strong>Teléfono: </strong> -</p>
                        <p><strong>Descripción: </strong> Forrajería y Pet Shop. Disponemos de alimentos balanceados, snacks y húmedos. También puedes encontrar juguetes y accesorios para tus mascotas.</p>
                    </div>
                </div>
            </div>
            <div className="sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full sm:w-[48%] lg:w-[30%] max-w-xl rounded-lg font-[sans-serif] overflow-hidden mx-2 my-4">
                <div className="flex items-center">
                    <img src="/images/alePeluqueria.jpeg" className="w-32 h-32 ml-4" alt="Ale Peluquería Canina" />
                    <div className="flex flex-col p-4 m-2">
                        <h2 className="text-lg font-semibold text-gray-900 text-center">Ale Peluquería Canina</h2>
                        <h3 className="text-gray-800 text-lg mt-4 mb-3 text-center">Alejandra y Marikena</h3>
                        <p className="mb-2"><strong>Ubicación: </strong> Barrio Saint Germes, Santiago del Estero (Capital), Argentina</p>
                        <p className="mb-2"><strong>Teléfono: </strong>(+54 9 0385) 15482-3957</p>
                        <p><strong>Descripción: </strong>Contamos con el mejor servicio y cuidado para los mimados de la casa. Baño y corte en diferentes razas y tamaños. Deslanado y recuperación de manto. Realizamos traslados.</p>
                    </div>
                </div>
            </div>
            <div className="sm:p-8 p-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full sm:w-[48%] lg:w-[30%] max-w-xl rounded-lg font-[sans-serif] overflow-hidden mx-2 my-4">
                <div className="flex items-center">
                    <img src="/images/vetCamino.jpeg" className="w-32 h-32 ml-4" alt="veterinaria El Camino" />
                    <div className="flex flex-col p-4 m-2">
                        <h2 className="text-lg font-semibold text-gray-900 text-center">Veterinaria El Camino</h2>
                        <h3 className="text-gray-800 text-lg mt-4 mb-3 text-center">Dr. Mariano A. Pietro - Dra. Ana Carolina Castro</h3>
                        <p className="mb-2"><strong>Ubicación: </strong>Moreno (sur) Nº 1595, Santiago del Estero (Capital), Argentina</p>
                        <p className="mb-2"><strong>Teléfono: </strong> (+54 9 0385) 15418-9871</p>
                        <p><strong>Descripción: </strong>Ecografía veterinaria, radiografías, electrocardiografías, citologías.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recommendations;