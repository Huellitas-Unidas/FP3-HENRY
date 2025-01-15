"use client";

import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import React, { useState } from "react";
import "./stylesMap.css";
import { IPost } from "@/interfaces/types";
import Image from "next/image";

interface GoogleMapaProps {
  posts: IPost[];
}

const GoogleMapa: React.FC<GoogleMapaProps> = ({ posts }) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const center = { lat: -34.6037, lng: -58.3816 };

  const handleMarkerClick = (markerId: string) => {
    setActiveMarker((prev) => (prev === markerId ? null : markerId));
  };

  return (
    <div className="App flex justify-center items-center min-h-screen bg-gray-100">
      <div className="Map w-full h-[80vh] relative rounded-lg shadow-md overflow-hidden border">
        <GoogleMap
          mapContainerClassName="map_container w-full h-full"
          center={center}
          zoom={10}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {posts.map((post) =>
            post.location ? (
              <React.Fragment key={post.id}>
                <MarkerF
                  position={{
                    lat: post.location.latitude,
                    lng: post.location.longitude,
                  }}
                  onClick={() => handleMarkerClick(post.id)}
                  icon={{
                    url:
                      post.status === "perdido"
                        ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  }}
                />
                {activeMarker === post.id && (
                  <InfoWindowF
                    position={{
                      lat: post.location.latitude,
                      lng: post.location.longitude,
                    }}
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div className="p-2 text-sm">
                      <h3 className="font-bold text-gray-700">{post.title}</h3>
                      <p className="text-gray-600">
                        <strong>Descripción:</strong> {post.description}
                      </p>
                      <p className="text-gray-600">
                        <strong>Estado:</strong>{" "}
                        <span
                          className={
                            post.status === "perdido"
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {post.status}
                        </span>
                      </p>
                      {post.photoUrl && (
                        <Image
                          src={post.photoUrl}
                          alt={post.title}
                          width={150}
                          height={150}
                          className="rounded-md shadow-md"
                        />
                      )}
                      <p className="text-gray-600">
                        <strong>Contacto:</strong> {post.contactInfo}
                      </p>
                    </div>
                  </InfoWindowF>
                )}
              </React.Fragment>
            ) : null
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleMapa;







