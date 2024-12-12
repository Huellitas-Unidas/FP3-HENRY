"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Terms = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleboxChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isChecked) {
      Swal.fire({
        title: "Por favor, acepta los términos y condiciones para continuar.",
        icon: "question",
        customClass: {
          confirmButton:
            "bg-green500 text-white p-2 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
        }
      });
      return;
    }

    const { value: accept } = await Swal.fire({
      title: "Términos y Condiciones",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: "Estoy de acuerdo con los términos y condiciones",
      confirmButtonText: `Continuar <i class="fa fa-arrow-right"></i>`,
      customClass: {
        confirmButton:
          "bg-green500 text-white p-2 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
      },
      inputValidator: (result) => {
        return !result && "Debes aceptar los términos y condiciones.";
      }
    });

    if (accept) {
      Swal.fire({
        title:
          "¡Aceptación de los términos y condiciones recibida exitosamente! 🎉",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-green500 text-white p-4 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
        }
      });
      router.push("/register");
    }
    else {
      Swal.fire({
        title: "Por favor, acepta los términos y condiciones para continuar.",
        icon: "warning",
        customClass: {
          confirmButton:
            "bg-green500 text-white p-4 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-screen-xl p-6 sm:p-8 lg:p-10 bg-teal-50 shadow-xl shadow-teal-950 rounded-lg"
    >
      <h1 className="text-center text-xl text-teal-950 md:text-2xl mb-7 font-bold">
        Términos y Condiciones
      </h1>
      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          1. Términos Generales
        </h2>
        <p className="text-md md:text-base mb-6">
          ¡Atención! 📢 Te invitamos a leer y confirmar los términos y
          condiciones de nuestra plataforma.
        </p>
        <p className="text-sm md:text-base mt-2 mb-6">
          <strong>Gracias por visitar Huellas Unidas</strong>, una plataforma
          diseñada para facilitar la localización de mascotas perdidas, promover
          adopciones responsables y conectar con servicios relacionados con el
          bienestar animal. Al utilizar este sitio web{" "}
          <strong>Huellas Unidas</strong>, aceptas los términos y condiciones
          descritos en este documento. Si no estás de acuerdo con estos
          términos, por favor no utilices el Sitio.!
        </p>
        <p className="text-sm md:text-base mb-6">
          <strong>Definiciones:</strong>
        </p>
        <ul className="list-disc list-inside mt-2 mb-4">
          <li>
            <strong>Nosotros, nuestro/a y Huellas Unidas:</strong> se refieren a
            la plataforma Huellas Unidas.
          </li>
          <li>
            <strong>Tú y Usuario:</strong> se refieren a cualquier persona que
            acceda o utilice este Sitio.
          </li>
        </ul>
        <p className="text-sm md:text-base mb-8">
          <strong>Huellas Unidas</strong> se reserva el derecho de modificar
          estos términos en cualquier momento. Te recomendamos revisarlos
          periódicamente.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          2. Política de Privacidad
        </h2>
        <p className="text-sm md:text-base mt-2 mb-6">
          Cualquier información personal enviada al Sitio estará sujeta a
          nuestra Política de Privacidad. Te recomendamos leerla antes de
          proporcionar cualquier dato personal.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          3. Exactitud de la Información
        </h2>
        <p className="text-sm md:text-base mt-2 mb-6">
          Aunque nos esforzamos por garantizar que la información publicada en
          Huellas Unidas sea precisa, no podemos garantizar que sea
          completamente libre de errores. El uso de esta información es bajo tu
          propio riesgo. Es tu responsabilidad monitorear cualquier
          actualización o cambio en el contenido del Sitio.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          4. Contenido Generado por el Usuario
        </h2>
        <h3 className="text-md md:text-lg font-medium mb-2 text-teal-950">
          Enviar Contenido:
        </h3>
        <p className="text-sm md:text-base mb-4">
          Cualquier información, imagen o comentario que envíes a{" "}
          <strong>Huellas Unidas</strong> se considerará como contenido no
          confidencial. Al enviar contenido, garantizas que:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base mb-6">
          <li>
            Eres propietario de los derechos necesarios sobre el contenido.
          </li>
          <li>
            El contenido no infringe derechos de terceros ni viola ninguna ley
            aplicable.
          </li>
        </ul>
        <p className="text-sm md:text-base mb-6">
          <strong>Huellas Unidas</strong> podrá usar, reproducir o modificar el
          contenido enviado para mejorar sus servicios, sin necesidad de
          compensación.
        </p>
        <h3 className="text-md md:text-lg font-medium mb-2 text-teal-950">
          Reglas de Conducta:
        </h3>
        <h4 className="text-md md:text-lg font-medium mb-2 text-teal-950">
          No se permite:
        </h4>
        <ul className="list-disc list-inside text-sm md:text-base mb-6">
          <li>
            Publicar contenido que sea difamatorio, ilegal, violento o
            inapropiado.
          </li>
          <li>Subir archivos que contengan virus o software malicioso.</li>
          <li>Usar el Sitio para actividades comerciales sin autorización.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          5. Propiedad Intelectual
        </h2>
        <p className="text-sm md:text-base mt-2 mb-6">
          Todos los derechos de autor, marcas comerciales y otros derechos de
          propiedad intelectual relacionados con el contenido del Sitio
          pertenecen a <strong>Huellas Unidas</strong> o se utilizan con el
          permiso de sus propietarios respectivos. Está prohibido reproducir,
          modificar o distribuir cualquier parte del Sitio sin nuestra
          autorización previa por escrito.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          6. Enlaces a Otros Sitios
        </h2>
        <p className="text-sm md:text-base mt-2 mb-6">
          Huellas Unidas puede contener enlaces a sitios web de terceros. No
          somos responsables del contenido, la precisión o la funcionalidad de
          estos sitios. Te recomendamos leer las políticas de privacidad y
          términos de uso de los sitios que visites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          7. Garantías y Exoneración de Responsabilidad
        </h2>
        <h3 className="text-md md:text-lg font-medium mb-2 text-teal-950">
          Garantías:
        </h3>
        <p className="text-sm md:text-base mb-4">
          El Sitio se proporciona <strong>tal cual</strong> y{" "}
          <strong>según disponibilidad</strong>. No garantizamos que:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base mb-6">
          <li>El Sitio estará libre de errores o interrupciones..</li>
          <li>La información publicada sea completa, precisa o actualizada.</li>
        </ul>
        <h3 className="text-md md:text-lg font-medium mb-2 text-teal-950">
          Limitación de Responsabilidad:
        </h3>
        <p>
          <strong>Huellas Unidas</strong> no será responsable de daños directos,
          indirectos, incidentales o consecuentes derivados del uso o la
          imposibilidad de usar el Sitio.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          8. Actividades Prohibidas
        </h2>
        <h3 className="text-md md:text-lg font-medium mb-2 text-teal-950">
          Está prohibido:
        </h3>
        <ul className="list-disc list-inside text-sm md:text-base mb-6">
          <li>Violar derechos de privacidad o propiedad intelectual.</li>
          <li>Publicar contenido difamatorio, obsceno o amenazante.</li>
          <li>Subir archivos que contengan virus o software dañino.</li>
          <li>
            Acceder al Sitio mediante métodos automatizados no autorizados.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          9. Servicios Móviles
        </h2>
        <p className="text-sm md:text-base mt-2 mb-6">
          Si utilizas servicios móviles para acceder a Huellas Unidas, eres
          responsable de cualquier cargo asociado con tu proveedor de servicios
          (como datos o mensajes de texto). Asegúrate de que tu dispositivo sea
          compatible con nuestro contenido.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          10. Jurisdicción y Ley Aplicable
        </h2>
        <p className="text-sm md:text-base mt-2 mb-6">
          Este Sitio está operado desde Bolivia, Colombia, Argentina. Al usar{" "}
          <strong>Huellas Unidas</strong>, aceptas que cualquier controversia o
          reclamación se regirá por las leyes locales de Bolivia, Colombia,
          Argentina, sin considerar conflictos de leyes internacionales.
        </p>
      </section>
      <h3 className="text-md md:text-xl mb-6">
        Para consultas o más información, contáctanos en
        pf3shhuellasunidas@hotmail.com.
      </h3>

      <div className="mb-4 mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={handleboxChanged}
          className="w-5 h-5 md:w-6 md:h-6 text-teal-800 rounded-md focus:ring-2 focus:ring-teal-600"
        />
        <label htmlFor="terms" className="ml-4 text-sm md:text-base">
          He leído los Términos y Condiciones!
        </label>
      </div>
      <button
        type="submit"
        className={`w-full md:w-auto bg-green500 text-white text-lg p-4 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300 ${
          isChecked
            ? "bg-green500 hover:bg-teal-800"
            : "bg-green500 shadow-teal-50 shadow-md cursor-not-allowed"
        }`}
      >
        seguir
      </button>
    </form>
  );
};

export default Terms;
