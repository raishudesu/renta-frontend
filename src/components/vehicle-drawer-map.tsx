"use client";

import { LatLng } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { mapPin } from "@/constants/map-icons";

const LocationMarker = ({ position }: { position: LatLng }) => {
  return position === null ? null : (
    <Marker position={position} icon={mapPin}>
      <Popup>Rental Location</Popup>
    </Marker>
  );
};

const VehicleDrawerMap = ({ position }: { position: LatLng }) => {
  return (
    <div className="relative w-full">
      <MapContainer
        center={position}
        zoom={18}
        scrollWheelZoom={true}
        className="relative w-full min-h-[30vh] rounded-xl z-20"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} />
      </MapContainer>
    </div>
  );
};

export default VehicleDrawerMap;
