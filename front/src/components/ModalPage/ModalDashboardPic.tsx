import { deletePic, patchPic } from "@/app/api/profilePicAPI";
import { getUserId } from "@/helpers/userId";
import { useState } from "react";
import Swal from "sweetalert2";

const ModalDashboardPic = ({
  isOpen,
  onClose,
}: {
  isOpen: string;
  onClose: () => void;
}) => {
  const userId = getUserId();
  const [isDeleted, setisDeleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDeletePic = async (): Promise<void> => {
    if (userId)
      try {
        await deletePic(userId);
        onClose();
      } catch (error) {
        console.error("Error al eliminar la foto de perfil:", error);
      }
  };

  const handlePicButton = async (): Promise<void> => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No se seleccionó ningún archivo",
        text: "Por favor selecciona una imagen antes de subirla.",
        customClass: {
          confirmButton:
            "bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      setIsSubmitted(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    try {
      await patchPic(formData);
      onClose();
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
    }

    if (!isOpen) return;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Subir nueva foto</h2>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-lg text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500"
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => {
              handleDeletePic();
              setisDeleted(true);
            }}
            className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            {isDeleted === false ? "🗑️ Foto actual" : "🗑️ Eliminando..."}
          </button>
          <button
            onClick={onClose}
            className="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              handlePicButton();
              setIsSubmitted(true);
            }}
            type="submit"
            className="bg-green500 text-white p-2 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300"
          >
            {isSubmitted === false ? "Subir" : "Subiendo..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDashboardPic;
