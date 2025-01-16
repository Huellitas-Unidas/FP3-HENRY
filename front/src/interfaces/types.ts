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
  } | null; 
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
  name: string;
  email: string;
  password: string;
  confirm?: string;
  phone: string;
  role?: string;
} 

export interface ISignUpDataGoogle {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
} // register con Google, no usada

export type TSignUpErrors = Partial<ISignUpData>;

export interface IpqrProps {
  id?: string;
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
  role: "admin" | "user";
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
