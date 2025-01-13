"use client";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { validatePost } from "@/helpers/validatePost";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserId } from "@/helpers/userId";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

const libraries: Libraries = ["places"];

interface ModalPageProps {
  onClose: () => void;
  onRefreshList: () => void;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalPage: React.FC<ModalPageProps> = ({ onClose, onRefreshList }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    petType: "",
    contactInfo: "",
    dateLost: "",
    dateLostISO: "",
    location: { address: "", latitude: 0, longitude: 0 },
    file: null as File | null,
    status: "perdido",
    userId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const placeRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Verificar el userId del almacenamiento local

  useEffect(() => {
    const storedUserId = getUserId(); // Usa la función centralizada para obtener el userId
    if (storedUserId) {
      setFormData((prevState) => ({
        ...prevState,
        userId: storedUserId, // Actualiza el userId dinámicamente
      }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "No estás autenticado. Por favor, inicia sesión para continuar.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      }).then(() => {
        onClose();
        router.push("/login");
      });
    }
  }, [onClose, router]);

  const handlePlaceChanged = () => {
    const place = placeRef.current?.getPlace();
    if (place?.geometry?.location) {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      const address = place.formatted_address || "";

      setFormData((prevState) => ({
        ...prevState,
        location: { address, latitude, longitude },
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "file") {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0] || null;
      setFormData((prevState) => ({ ...prevState, file }));
      //}
      //else if (name.startsWith("location")) {
      //const field = name.split(".")[1];
      //setFormData((prevState) => ({
      //  ...prevState,
      //  location: {
      //    ...prevState.location,
      //    [field]: value,           // Mantén el valor como string para permitir el signo negativo
      //  },
      //}));
    } else if (name === "dateLost") {
      const selectedDate = new Date(value);
      selectedDate.setDate(selectedDate.getDate() + 1);
      const isoDate = selectedDate.toISOString();

      setFormData((prevState) => ({
        ...prevState,
        dateLost: value,
        dateLostISO: isoDate,
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validatePost(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Swal.fire(
        "Error",
        "Por favor, corrige los errores en el formulario.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("token"); // Recupera el token desde las cookies
      if (!token) {
        console.error("Token no encontrado.");
        return;
      }
      // Validar userId antes de enviar el formulario
      if (
        !formData.userId ||
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          formData.userId
        )
      ) {
        throw new Error(
          "El ID de usuario no es válido o no fue proporcionado."
        );
      }

      if (!formData.file) {
        throw new Error("Debe adjuntar una imagen");
      }

      /* if (
        !formData.location.address ||
        !formData.location.latitude ||
        !formData.location.longitude
      ) {
        throw new Error("La ubicación es obligatoria y debe ser válida.");
      }
  
      // Convertir la latitud y longitud a números flotantes y enviarlos como strings
      const locationData = {
        address: formData.location.address,
        latitude: parseFloat(String(formData.location.latitude)) || 0, // Asegurar número flotante
        longitude: parseFloat(String(formData.location.longitude)) || 0, // Asegurar número flotante
      };
      */

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("petType", formData.petType);
      data.append("contactInfo", formData.contactInfo);
      data.append("dateLost", formData.dateLostISO);
      data.append("location", JSON.stringify(formData.location));
      data.append("file", formData.file as File);
      data.append("status", formData.status);
      data.append("userId", formData.userId);

      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.message || "Error al crear el post en el backend";
        throw new Error(errorMessage);
      }
      const result = await response.json();
      console.log("Post creado:", result);
      Swal.fire({
        icon: "success",
        title: "El post se creó exitosamente",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-800 text-white font-bold py-3 px-4 rounded",
        },
      });

      onRefreshList();
      onClose();

      setFormData({
        title: "",
        description: "",
        petType: "",
        contactInfo: "",
        dateLost: "",
        dateLostISO: "",
        location: { address: "", latitude: 0, longitude: 0 }, // <- Resetear campos
        file: null,
        status: "",
        userId: formData.userId,
      });

      onClose();
    } catch (error) {
      Swal.fire(
        "Error",
        (error as Error).message || "Hubo un problema.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY!} libraries={libraries}>
      <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
          <div className="flex items-center">
            <h3 className="text-[#2e736b] text-xl font-bold flex-1">
              Publicar una mascota perdida o encontrada
            </h3>
            <button
              onClick={onClose} // Llama a la función onClose al hacer clic
              className="text-gray-400 hover:text-red-500"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
          <form className="space-y-4 mt-8" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Osito Perdido"
                className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Escriba características del animal"
                className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Tipo</label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg ${
                  errors.petType ? "border-red-500" : ""
                }`}
              >
                <option value="">Seleccione un tipo</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
              {errors.petType && (
                <span className="text-red-500 text-sm">{errors.petType}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Número de contacto
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Ej: 123456789"
                className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg ${
                  errors.contactInfo ? "border-red-500" : ""
                }`}
              />
              {errors.contactInfo && (
                <span className="text-red-500 text-sm">
                  {errors.contactInfo}
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Fecha de pérdida/encontrado
              </label>
              <input
                type="date"
                name="dateLost"
                value={formData.dateLost}
                onChange={handleChange}
                className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg ${
                  errors.dateLost ? "border-red-500" : ""
                }`}
              />
              {errors.dateLost && (
                <span className="text-red-500 text-sm">{errors.dateLost}</span>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Ubicación
              </label>
              <Autocomplete
                onLoad={(autocomplete) => (placeRef.current = autocomplete)}
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Ingrese una dirección"
                  className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg"
                />
              </Autocomplete>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Estado de la mascota
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg"
              >
                <option value="perdido">Perdido</option>
                <option value="encontrado">Encontrado</option>
              </select>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Subir imagen
              </label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                onClick={onClose} // También llama a onClose en el botón Cancelar
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#2e736b] hover:bg-green-500"
              >
                {loading ? "Cargando..." : "Publicar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoadScript>
  );
};

export default ModalPage;
{
  /*
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
*/
}
