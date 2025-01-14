"use client";

import { LoadScript } from "@react-google-maps/api";
import React from "react";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY!} libraries={["places"]}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
