import { getUserId } from "@/helpers/userId";
import { ChangeEvent, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { IpetForm, IUserBack } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ModalDashboardForm = ({
  animal,
  userData,
  onClose,
}: {
  animal: IpetForm;
  userData: IUserBack;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: `${animal.name}`,
    description: `${animal.description}`,
    petType: `${animal.type}`,
    contactInfo: `${userData.phone}`,
    dateLost: "",
    dateLostISO: "",
    direction: "",
    file: `${animal.imgUrl}`,
    status: "perdido",
    userId: getUserId(),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const convertUrlToFile = async (url: string, fileName: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const handleSubmit = async () => {
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

      if (!formData.direction) {
        throw new Error("La ubicación es obligatoria y debe ser válida.");
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("petType", formData.petType);
      data.append("contactInfo", formData.contactInfo);
      data.append("dateLost", formData.dateLostISO);
      data.append("status", formData.status);
      data.append("userId", formData.userId);
      if (animal.imgUrl) {
        const file = await convertUrlToFile(
          animal.imgUrl,
          `${animal.id}-image`
        );
        data.append("file", file);
      }

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
      console.log(result);

      Swal.fire({
        icon: "success",
        title: "Publicaste tu mascota como perdida 😔",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-800 text-white font-bold py-3 px-4 rounded",
        },
      });
    } catch (error) {
      Swal.fire(
        "Error",
        (error as Error).message || "Hubo un problema.",
        "error"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">
          Publicar mascota perdida
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled
            />
          </label>

          <label>
            Descripción:
            <input
              type="text"
              name="title"
              value={formData.description}
              onChange={handleChange}
              disabled
            />
          </label>

          <label>
            Teléfono:
            <input
              type="text"
              name="title"
              value={formData.contactInfo}
              onChange={handleChange}
              disabled
            />
          </label>

          <label>
            DATE:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled
            />
          </label>

          <label>
            Foto:
            <input
              type="text"
              name="title"
              value={formData.file}
              onChange={handleChange}
              disabled
            />
          </label>

          {/* <label>
            Foto:
            <input
              type="file"
              accept="image/*"
              className="block w-full text-lg text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500"
            />
          </label> */}

          <label>
            Dirección:
            <input
              type="text"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              required
            />
          </label>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green500 text-white p-2 rounded-lg hover:bg-green600 hover:bg-white hover:text-green500"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalDashboardForm;
