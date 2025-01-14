// import { ISignUpDataGoogle } from "@/interfaces/types";
import NextAuth, { DefaultUser, NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ISignUpDataGoogle {
  id: string;
  name: string;
  email: string;
  password: string;
  confirm?: string;
  phone: string;
  role?: string; //!
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Registrar al usuario
          const userData: ISignUpDataGoogle = {
            id: user.id || "",
            name: user.name || "",
            email: user.email || "",
            password: "defaultPassword123", // Contraseña por defecto para usuarios de terceros
            phone: "",
            // role: "user",
          };

          const registerResponse = await fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
          console.log("id de google:", user.id);

          if (!registerResponse.ok) {
            const errorData = await registerResponse.json();
            if (
              errorData?.message?.includes(
                "El correo electrónico ya está en uso"
              )
            ) {
              console.log(
                "El usuario ya está registrado, procediendo con el inicio de sesión"
              );
              return true; // Permite el inicio de sesión si el correo ya está registrado
            }
            console.error("Error del backend al registrar usuario:", errorData);
            return false; // Bloquea el inicio de sesión si ocurre un error en el registro
          }

          // Actualizar la foto de perfil
          if (user.image) {
            const registeredUser = await registerResponse.json();
            const userId = registeredUser.user.id; // Obtener el UUID del usuario recién registrado

            // Descargar la imagen desde la URL
            const response = await fetch(user.image);
            if (!response.ok) {
              console.error(
                "Error al descargar la imagen:",
                response.status,
                response.statusText
              );
              return false;
            }

            // Convertir la respuesta en un Blob
            const blob = await response.blob();

            // Crear un FormData y adjuntar la imagen
            const formData = new FormData();
            formData.append("file", blob, `${userId} profile pic`); // Cambié "profilePicture" por "file"

            // Enviar la solicitud PATCH al backend
            const patchResponse = await fetch(
              `${API_URL}/profile/${userId}/profile-picture`,
              {
                method: "PATCH",
                body: formData,
              }
            );

            if (!patchResponse.ok) {
              console.error(
                "Error al actualizar la foto de perfil:",
                await patchResponse.text()
              );
              return false; // Bloquea el inicio de sesión si falla la actualización
            }
          }
          return true; // Permite el inicio de sesión si todo es exitoso
        } catch (error) {
          console.error("Error en signIn:", error);
          return false; // Bloquea el inicio de sesión si ocurre un error
        }
      }
      return true; // Permite el inicio de sesión para otros proveedores
    },

    async jwt({ token, user }: { token: JWT; user?: DefaultUser }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.accessToken = token.accessToken as string;
      session.user.id = token.userId as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
