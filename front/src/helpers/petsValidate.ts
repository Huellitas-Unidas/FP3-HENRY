// const petValidate = (values: IPetValidateErrors) => {
//   const errors: Partial<IPetValidateErrors> = {};

//   Object.keys(values).forEach((field) => {
//     if (!values[field as keyof IPetValidateErrors]) {
//       errors[field as keyof IPetValidateErrors] = "Este campo es requerido.";
//     }
//   });

//   if (values.name && !/^[a-zA-Z\s]+$/.test(values.name)) {
//     errors.name = "El nombre solo puede contener letras.";
//   } else if (values.name && values.name.length > 15) {
//     errors.name = "El nombre no puede exceder los 15 caracteres.";
//   }

//   if (values.description && !/^[a-zA-Z\s]+$/.test(values.description)) {
//     errors.description = "La descripción solo puede contener letras.";
//   } else if (values.description && values.description.length > 40) {
//     errors.description = "La descripción no puede exceder los 40 caracteres.";
//   }

//   if (!values.type) {
//     errors.type = "Debes seleccionar un tipo de mascota.";
//   }

//   if (!values.raza) {
//     errors.raza = "Debes seleccionar un género.";
//   }

//   return errors;
// };

// export default petValidate;
