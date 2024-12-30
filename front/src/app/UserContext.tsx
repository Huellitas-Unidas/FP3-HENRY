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
  const { data: session } = useSession(); // Para manejar sesiones de Next-Auth
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Verifica si el usuario está logueado con Next-Auth o de manera tradicional
        if (session?.user) {
          // Usuario autenticado con Next-Auth
          setUserId(session.user.email || null); // Asume que el email es único y lo usa como ID
        } else {
          // Usuario autenticado tradicionalmente
          const token = localStorage.getItem("token");
          if (token) {
            const response = await fetch("/user", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              setUserId(data.id); // Asume que el backend devuelve un objeto con el campo "id"
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
  }, [session]); // Ejecuta el efecto cuando cambie la sesión

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
