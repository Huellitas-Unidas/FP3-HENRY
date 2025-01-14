import { getUserId } from "@/helpers/userId";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { IpetForm, IUserBack } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { Autocomplete } from "@react-google-maps/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ModalDashboardPageProps {
  onClose: () => void;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animal: IpetForm;
  userData: IUserBack;
}

const ModalDashboardForm: React.FC<ModalDashboardPageProps> = ({
  animal,
  userData,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: `${animal.name}`,
    description: `${animal.description}`,
    petType: `${animal.type}`,
    contactInfo: `${userData.phone}`,
    dateLost: "",
    dateLostISO: "",
    location: { address: "", latitude: 0, longitude: 0 },
    file: `${animal.imgUrl}`,
    status: "perdido",
    userId: "",
  });

  const placeRef = useRef<google.maps.places.Autocomplete | null>(null);
  const router = useRouter();

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
    if (!place) {
      console.error("No place selected or insufficient data.");
      return;
    }

    if (place.geometry?.location) {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      const address = place.formatted_address || "";

      setFormData((prevState) => ({
        ...prevState,
        location: { address, latitude, longitude },
      }));
    } else {
      console.error("Place does not have geometry or location information.");
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
      const file = target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevState) => ({
            ...prevState,
            file: reader.result as string,
          }));
        };
        reader.readAsDataURL(file); // Convierte a base64
      }
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

  const convertUrlToFile = async (url: string, fileName: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      if (!formData.location) {
        throw new Error("La ubicación es obligatoria y debe ser válida.");
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("petType", formData.petType);
      data.append("contactInfo", formData.contactInfo);
      data.append("dateLost", formData.dateLostISO); // Asegúrate de pasar la fecha en formato ISO
      data.append("status", formData.status);
      data.append("userId", formData.userId);
      data.append("location", JSON.stringify(formData.location));
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
      console.log("Mascota marcada como perdida:", result);

      Swal.fire({
        icon: "success",
        title: "Publicaste tu mascota como perdida 😔",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-800 text-white font-bold py-3 px-4 rounded",
        },
      });
      //updatePetStatus(animal.id); //!!!!
      router.push("/misposteos"); // redirige a mis posteos luego de ser marcada como perdida
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
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              className="ml-2"
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
              className="ml-2"
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
              className="ml-2"
              type="text"
              name="title"
              value={formData.contactInfo}
              onChange={handleChange}
              disabled
            />
          </label>

          <label>
            Fecha:
            <input
              className="ml-2"
              type="date"
              name="dateLost"
              value={formData.dateLost}
              onChange={handleChange}
            />
          </label>

          <label>
            Ubicación:
            <Autocomplete
              onLoad={(autocomplete) => (placeRef.current = autocomplete)}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Ingrese una dirección"
                className="mt-2 px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-[#2e736b] focus:bg-transparent rounded-lg"
              />
            </Autocomplete>
          </label>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
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
