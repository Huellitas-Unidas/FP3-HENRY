import { Toast } from "@/helpers";


export const createCheckoutSession = async ({ amount, email }: {
   amount: number,
   email: string,  
}): Promise<string | null> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
 

  try {
    const response = await fetch(`${API_URL}/stripe/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount,  email, currency: "usd" }),     
    });

    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", response.status);
      Toast.fire({
        icon: "error",
        iconColor: "red",
        title: "Error al procesar la donación",
        text: "Por favor, inténtalo de nuevo más tarde.",
        customClass: {
          confirmButton:
            "bg-green500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded",
        },
      });

      return null;
    }

    const data = await response.json();
    return data.checkoutUrl;                   
  } catch (error) {
    console.error("Error al crear la sesión de pago", error);
      Toast.fire({
      icon: "error",
      iconColor: "red",
      title: "Error en la conexión",
      text: "No se pudo conectar al servidor. Por favor, verifica tu conexión.",
      customClass: {
        confirmButton:
          "bg-green500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded",
      },
    });

    return null;
  }
};

  