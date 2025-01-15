import { IDonation } from "@/interfaces/types";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDonations = async (): Promise<IDonation[]> => {
  const response = await fetch(`${API_URL}/stripe/create`);
  if (!response.ok) {
    throw new Error("Error al obtener donaciones");
  }
  return response.json();
};
