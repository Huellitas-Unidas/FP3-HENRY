import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface UserContextType {
  userId: string | null;
  setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (session?.user) {
          console.log("Autenticado con Next-Auth");
          const token = session.user.accessToken as string;
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
          } else {
            console.error("No se pudo obtener el usuario desde el backend.");
          }
        } else {
          console.log("Autenticado de forma tradicional");
          const token = localStorage.getItem("token");

          if (token) {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/user`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.ok) {
              const data = await response.json();
              setUserId(data.id);
            } else {
              console.error("No se pudo obtener el usuario desde el backend.");
            }
          } else {
            console.warn("No se encontró un token para autenticar al usuario.");
          }
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
