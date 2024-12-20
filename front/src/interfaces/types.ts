export interface ICardAnimal {
  id: number;
  name: string;
  type: string;
  genre: string;
  image: string;
  description: string;
}

/* export interface IValidateErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  phone?: string;
} */

export interface IButton {
  props: string;
}

export interface IUserData {
  email?: string;
  password?: string;
}

/* export interface ILoginErrors {
  email?: string;
  password?: string;
} */

export interface ISignUpData {
  email: string;
  password: string;
  name: string;
  //address: string;  no necesaria
  //phone: string;
}

export type TSignUpErrors = Partial<ISignUpData>;

//TSignUpErrors -> es el mismo IValidateErrors?

/* export interface IPost {
  id: string;
  title: string;
  content: string;
  userId: string;
}  */

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

export interface IPostAnimal {
  //LOSTANDFOUND
  id?: number;
  userId?: string;
  status?: string;
  title?: string;
  photoUrl?: string;
  description?: string;
  petType?: string;
  dateLost?: Date;
  location?: string;
  contactInfo?: string;
}

export interface IPost {
  //POST DEL ANIMAL
  id: number;
  userId: string;
  status: string;
  title: string;
  photoUrl: string;
  description: string;
  petType: string;
  dateLost: Date;
  location: string;
  contactInfo: string;
}

export interface IPostDetailProps {
  params: {
    id: string; // Parámetro dinámico "id" de la URL
  };
}

export interface IpqrProps {
  name: string;
  email: string;
  type: string;
  description: string;
  userId?: string; //!
}
