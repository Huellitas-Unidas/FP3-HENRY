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
    latitude: number;
    longitude: number;
  } | null; // Permitir que sea null si no hay ubicación
  userId: string;
}

export interface IPostAnimal {
  // Esta interfaz ahora es redundante, usa IPost
  id?: string; // Haz que id sea opcional aquí también para las solicitudes POST
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
} //! es igual a IUserLogin

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirm?: string;
  phone: string;
} //! register

export type TSignUpErrors = Partial<ISignUpData>;

// export interface IUserLogin {
//   email: string;
//   password: string;
// } //! es igual a IUserData

export interface IpqrProps {
  id?:string,
  fullname: string;
  email: string;
  type: string;
  description: string;
  userId?: string;
}

export interface IpetForm {
  id: string;
  name: string;
  type: string;
  genero: string;
  description: string;
  status: string;
  imgUrl: string;
  userId: string;
}

export interface IUserBack {
  id: string;
  name: string;
  email: string;
  phone?: string | number;
  profilePicture: string | null;
  createdAt: string;
}

export interface IUserSessionDt {
  id: number;
  email: string;
  name?: string;
}

export interface IProfilePic {
  profilePic: string;
}


export interface IDonation {
  amount: number; 
  email: string;  
  currency: string; 
}
