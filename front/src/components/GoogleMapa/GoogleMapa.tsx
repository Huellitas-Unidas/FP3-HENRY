'use client'
import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import "./stylesMap.css";
import { IPost } from "@/interfaces/types";
import Image from "next/image";

// INTERFAZ DE LAS PROPS
interface GoogleMapaProps {
  posts: IPost[];
}

const GoogleMapa: React.FC<GoogleMapaProps> = ({ posts }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
  });

  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const center = { lat: -34.6037, lng: -58.3816 };

  // CLIC P/ ABRIR INFOWINDOW
  const handleMarkerClick = (markerId: string) => {
    setActiveMarker((prev) => (prev === markerId ? null : markerId)); // ABRIR-CERRAR
  };

  return (
    <div className="App">
      <div className="Map">
        {!isLoaded ? (
          <h3>Cargando...</h3>
        ) : (
          <GoogleMap
            mapContainerClassName="map_container"
            center={center}
            zoom={10}
            options={{
              streetViewControl: false,
            }}
          >
            {/* MARKERS */}
            {posts.map((post) => (
              post.location && (
                <React.Fragment key={post.id}>
                  <MarkerF
                    position={{ lat: post.location.latitude, lng: post.location.longitude }}
                    icon={{
                      url:
                        post.status === "perdido"
                          ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                          : "http://maps.google.com/mapfiles/ms/icons/green-dot.png", 
                    }}
                    onClick={() => handleMarkerClick(post.id)} 
                  />

                  {/* INFOWINDOW DETALLES */}
                  {activeMarker === post.id && (
                    <InfoWindowF
                      position={{ lat: post.location.latitude, lng: post.location.longitude }}
                      onCloseClick={() => setActiveMarker(null)} // CIERRA INFOWOINDOW
                    >

                      <div>
                        <strong>Estado:</strong> {post.status.toUpperCase()}<br />
                        <strong>Nombre:</strong> {post.title || "No especificada"} <br />
                        <strong>Descripción:</strong> {post.description || "Sin detalles"}<br />
                        {post.photoUrl ? (
                          <Image src={post.photoUrl} alt={post.title} width={150} height={150} />
                        ) : "No especificada"}<br />
                        <strong>Ubicación:</strong> {post.location.address || "Sin detalles"}
                      </div>
                    </InfoWindowF>
                  )}
                </React.Fragment>
              )
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default GoogleMapa;

//style={{ width: "100px", height: "auto" }}