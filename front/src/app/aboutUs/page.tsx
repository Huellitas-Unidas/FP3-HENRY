import Image from 'next/image';
import React from 'react'

const AboutUs = () => {
  return (
    <div className="font-sans bg-[#b0dfd4] px-4 py-12 my-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
        <div className="text-left">
          <h2 className="text-gray-900 text-3xl font-extrabold mb-6">Sobre Huellas Unidas</h2>
          <p className="mb-4 text-lg text-black">¿Qué es Huellas Unidas?</p>
          <p className="mb-4 text-sm text-gray-900">Huellas Unidas es una plataforma web y móvil que transforma el cuidado y bienestar animal. Conectamos a personas, organizaciones y servicios especializados, creando una comunidad solidaria dedicada a localizar mascotas perdidas, ayudar a animales callejeros y promover el cuidado responsable.</p>
          <p className="mb-4 text-lg text-black">¿Cuál es nuestro objetivo principal?</p>
          <p className="mb-4 text-sm text-gray-900">Nuestro objetivo es facilitar la búsqueda de mascotas perdidas, fomentar la adopción responsable y brindar acceso a servicios esenciales para el cuidado animal, como veterinarias, urgencias, forrajerías y peluquerías caninas.</p>
          <p className="mb-4 text-lg text-black">¿A quién está dirigido?</p>
          <p className="mb-4 text-sm text-gray-900">Huellas Unidas está diseñada para amantes de los animales, dueños de mascotas y personas comprometidas con el bienestar animal que buscan ayudar, adoptar o cuidar mejor a sus peluditos.</p>
          <p className="mb-4 text-lg text-black">¿Qué valores nos definen?</p>
          <p className="mb-4 text-sm text-gray-900">Nos guían valores como la compasión, la solidaridad, la responsabilidad y la unión, con el objetivo de construir una comunidad activa y comprometida con el bienestar animal.</p>
          <p className="mb-4 text-lg text-black">¿Por qué es especial o diferente?</p>
          <p className="mb-4 text-sm text-gray-900">Lo que hace única a Huellas Unidas es su mapa interactivo que permite a los usuarios publicar y encontrar alertas de mascotas perdidas o encontradas, utilizando geolocalización para agilizar el proceso. Además, ofrecemos la opción de registrar a las mascotas con fotos y datos para facilitar su identificación, promoviendo una conexión confiable y efectiva entre quienes buscan y quienes encuentran.</p>
        </div>
        <div>
          <Image src="/images/aboutus.jpg" alt="imagen" className="rounded-lg object-contain w-full h-full" width={350} height={350}/>
        </div>
      </div>
    </div>
  )
}

export default AboutUs; 