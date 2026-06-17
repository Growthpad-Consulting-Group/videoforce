"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// The Westwood Office, Westlands, Nairobi
const OFFICE_COORDS = { lat: -1.2599, lng: 36.8034 };

const mapContainerStyle = { width: "100%", height: "360px" };

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#111111" }],
    },
  ],
};

export default function ContactMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

  return (
    <div className="overflow-hidden rounded-sm">
      <LoadScript googleMapsApiKey={apiKey} loadingElement={
        <div className="flex h-[360px] w-full items-center justify-center bg-white/5 text-sm text-white/30">
          Loading map…
        </div>
      }>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={OFFICE_COORDS}
          zoom={15}
          options={mapOptions}
        >
          <Marker
            position={OFFICE_COORDS}
            title="Video Force — The Westwood Office, Westlands"
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
