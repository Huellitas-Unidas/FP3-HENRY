export interface IValidateErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  // phone?: string; Eliminado ya que no es necesario
}

export interface IButton {
  label: string; // Texto que se muestra en el botón
  type?: "button" | "submit" | "reset"; // Tipo del botón (opcional)
  disabled?: boolean; // Propiedad para deshabilitar el botón (opcional)
}


export interface ISignUpData { 
  email: string;
  password: string;
  name: string;
  // address: string; // No necesaria
  // phone: string; // Eliminado
}

// export type TSignUpErrors = Partial<ISignUpData>; // Puedes usar Partial<ISignUpData> en lugar de IValidateErrors

// export interface IUserData {
//   email?: string;
//   password?: string;
// }

// export interface ILoginErrors {
//   email?: string;
//   password?: string;
// }

// export interface ICardAnimal {
//   id: number;
//   name: string;
//   type: string;
//   genre: string;
//   image: string;
//   description: string;
// }

// export interface IPost {
//   id: string;
//   title: string;
//   content: string;
//   userId: string;
// }

// export interface IPetValidateErrors {
//   name: string;
//   type: string;
//   genre: string;
//   description: string;
// }

export interface IUserLogin {
  email: string;
  password: string; 
}
