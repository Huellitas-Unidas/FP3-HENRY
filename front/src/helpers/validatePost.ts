import { IPost } from '@/interfaces/types';

export const validatePost = (formData: Partial<IPost & { file?: File | null }>): Record<string, string> => {
  const errors: Record<string, string> = {};

  
  if (!formData.title || formData.title.trim().length === 0) {
    errors.title = 'El título es obligatorio.';
  }

 
  if (!formData.description || formData.description.trim().length === 0) {
    errors.description = 'La descripción es obligatoria.';
  }

 
  if (!formData.petType || formData.petType.trim().length === 0) {
    errors.petType = 'Debe seleccionar un tipo de mascota.';
  }


  if (!formData.contactInfo || !/^\d+$/.test(formData.contactInfo)) {
    errors.contactInfo = 'El número de contacto debe ser válido y solo contener números.';
  }


  if (!formData.dateLost || isNaN(new Date(formData.dateLost).getTime())) {
    errors.dateLost = 'Debe seleccionar una fecha válida.';
  }

 
  if (formData.location) {
    if (
      !formData.location.address ||
      formData.location.address.trim().length === 0
    ) {
      errors["location.address"] = "La dirección es obligatoria.";
    }
  
    // Valida que latitude y longitude sean números válidos
    if (
      isNaN(Number(formData.location.latitude)) ||
      isNaN(Number(formData.location.longitude))
    ) {
      errors["location.latitude"] =
        "Latitud y longitud deben ser números válidos.";
    }
  }
  

  if (!formData.photoUrl && (!formData.file || formData.file === null)) {
    errors.file = 'Debe adjuntar una imagen.';
  }

  return errors;
};
