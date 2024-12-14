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

