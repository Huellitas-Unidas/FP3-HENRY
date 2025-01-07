'use client'
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React from "react";
import "./stylesMap.css"
import { IPost } from "@/interfaces/types";

// INTERFAZ DE LAS PROPS
interface GoogleMapaProps {
  posts: IPost[];
}

const GoogleMapa: React.FC<GoogleMapaProps> = ({ posts }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
  });
  const center = { lat: -34.6037, lng: -58.3816 };
  const onLoadMarker = (marker: google.maps.Marker) => { //MARKER ESTA DEPRECADO. VER EN LA CONSOLA 
    console.log("Marker", marker.getPosition()?.lat());
  };
  return (
    <div className="App">
      <div className="Map">
        {!isLoaded ? (
          <h3>Cargando...</h3>
        ) : (
          <GoogleMap mapContainerClassName="map_container" center={center} zoom={10}
            options={{
              streetViewControl: false
            }}
          >
            {/* Renderizar markers dinámicamente */}
            {posts.map((post) => {
              if (post.location) {
                return (
                  <MarkerF
                    key={post.id}
                    position={{ lat: post.location.latitude, lng: post.location.longitude }}
                    onLoad={onLoadMarker}
                    icon={{
                      url:
                        post.status === "perdido"
                          ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Icono para perdidos
                          : "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Icono para encontrados
                    }}
                  />
                )
              }
            })}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default GoogleMapa;