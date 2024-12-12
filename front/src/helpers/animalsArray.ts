import { ICardAnimal } from "@/interfaces/types";

const animalsArray: ICardAnimal[] = [
  {
    id: 1,
    name: "Docky",
    type: "lost",
    image:
      "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
    description:
      "Este es mi perro, se perdio el dia..... a las ..... en la direccion.....",
  },
  {
    id: 2,
    name: "Mora",
    type: "lost",
    image:
      "https://static.fundacion-affinity.org/cdn/farfuture/d7DdEvJ5ubNSotjxX1i1dvNJIreizc6ylSQXKGHd2qw/mtime:1528830328/sites/default/files/el-gato-ese-gran-desconocido.jpg",
    description:
      "Esta es mi gata, se perdio el dia..... a las ..... en la direccion.....",
  },
  {
    id: 3,
    name: "No lo se",
    type: "found",
    image:
      "https://doggiesintown.com/wp-content/uploads/2023/08/El-Fascinante-Mundo-del-Perro-Salchicha-Explorando-su-Historia-Crianza-y-Personalidad-Unica-Doggies-in-Town-1200x676-5.jpg",
    description:
      "Encontre este perro, el dia..... a las ..... en la direccion.....",
  },
  {
    id: 4,
    name: "No se",
    type: "found",
    image:
      "https://content.elmueble.com/medio/2022/06/07/gato-erik-jan-leusink-ibpxglgjimi-unsplash_21d35523_1280x853.jpg",
    description:
      "Encontre este gatito, el dia..... a las ..... en la direccion.....",
  },
];

export default animalsArray;
