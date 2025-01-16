"use client";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { validatePost } from "@/helpers/validatePost";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserId } from "@/helpers/userId";
import { Autocomplete } from "@react-google-maps/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  useEffect(() => {
    const storedUserId = getUserId();
    if (storedUserId) {
      setFormData((prevState) => ({
        ...prevState,
        userId: storedUserId,
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

    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Token no encontrado.");
        return;
      }

      if (!formData.userId) {
        throw new Error("El ID de usuario no es válido o no fue proporcionado.");
      }

      if (!formData.file) {
        throw new Error("Debe adjuntar una imagen");
      }

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
        location: { address: "", latitude: 0, longitude: 0 },
        file: null,
        status: "perdido",
        userId: formData.userId,
      });
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
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
        <div className="flex items-center">
          <h3 className="text-[#2e736b] text-xl font-bold flex-1">
            Publicar una mascota perdida o encontrada
          </h3>
          <button
            onClick={onClose}
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
              <span className="text-red-500 text-sm">{errors.description}</span>
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
              <span className="text-red-500 text-sm">{errors.contactInfo}</span>
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
              onClick={onClose} 
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#2e736b] hover:bg-white hover:text-green500"
            >
              {loading ? "Cargando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPage;
