import NextAuth, { Account, NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Callback para manejar el token JWT
    async jwt({ token, account }: { token: JWT; account?: Account | null }): Promise<JWT> {
      if (account) {
        // Almacena el accessToken de Google en el token
        token.accessToken = account.access_token;
      }
      return token;
    },
    // Callback para agregar el token a la sesión
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session.user.accessToken = token.accessToken as string; // Agrega el accessToken a la sesión
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // Protege contra acceso del cliente
        sameSite: "lax", // Protege contra ataques CSRF
        path: "/",
        secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secreto para firmar los tokens
  session: {
    strategy: "jwt", // Manejo de sesión con JWT
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };




