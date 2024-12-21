export interface IPost {
  id: string;
  title: string;
  description: string;
  petType: string;
  dateLost: string;
  contactInfo: string;
  photoUrl: string;
  status: string;
  location?: {
    address: string;
    latitude: string;
    longitude: string; } | null; // Permitir que sea null si no hay ubicación
  userId?: string;
    
 }

export interface IPostAnimal { // Esta interfaz ahora es redundante, usa IPost
  id?: string;        // Haz que id sea opcional aquí también para las solicitudes POST
  userId?: string;
  status?: string;
  title?: string;
  photoUrl?: string;
  description?: string;
  petType?: string;
  dateLost?: string;
  contactInfo?: string;
}

export interface IPostDetailProps {
  params: {
      id: string;
  };
}

// Las otras interfaces permanecen sin cambios, ya que no están directamente relacionadas con la respuesta de la API.
export interface ICardAnimal {
  id: number;
  name: string;
  type: string;
  genre: string;
  image: string;
  description: string;
}

export interface IButton {
  props: string;
}

export interface IUserData {
  email?: string;
  password?: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  name: string;
}

export type TSignUpErrors = Partial<ISignUpData>;

export interface IPetValidateErrors {
  name: string;
  type: string;
  genre: string;
  description: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IpqrProps {
  name: string;
  email: string;
  type: string;
  description: string;
  userId?: string;
}