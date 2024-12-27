"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./AuthContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}

export default Providers;
