export interface ICardAnimal {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
}

export interface IValidateErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  phone?: string;
}

export interface IButton {
  props: string;
}
