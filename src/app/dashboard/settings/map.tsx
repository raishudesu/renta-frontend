"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { type Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { mapPin } from "@/constants/map-icons";

const fallbackCenter = {
  lat: 14.59,
  lng: 120.98,
};

interface LocationPickerProps {
  onLocationPicked: (latLng: string) => void;
  position: { lat: number; lng: number };
  setPosition: (pos: { lat: number; lng: number }) => void;
}

const PanToUserButton = ({
  setPosition,
}: {
  setPosition: (pos: { lat: number; lng: number }) => void;
}) => {
  const map = useMap();

  useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
      setPosition(e.latlng); // ✅ update marker
    },
  });

  const panToLocation = () => {
    map.locate();
  };

  return (
    <Button
      type="button"
      onClick={panToLocation}
      className="absolute top-2 right-2"
      style={{ zIndex: 1000 }}
    >
      Use my current location
    </Button>
  );
};

const DraggableMarker = ({
  onLocationPicked,
  position,
  setPosition,
}: LocationPickerProps) => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef<LeafletMarker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          onLocationPicked(JSON.stringify(newPos));
          setPosition(newPos);
        }
      },
    }),
    [onLocationPicked, setPosition]
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={mapPin}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
};

// ✅ Component to auto-locate on map load
const AutoLocate = ({
  setPosition,
  businessCoords,
}: {
  setPosition: (pos: { lat: number; lng: number }) => void;
  businessCoords?: string | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (businessCoords) {
      const [lat, lng] = businessCoords.split(",").map(Number);
      const coords = { lat, lng };
      setPosition(coords);
      map.setView(coords, map.getZoom());
    } else {
      // fallback to user's current location
      map.locate();
    }
  }, [businessCoords, map, setPosition]);

  return null;
};

const Map = ({
  onLocationPicked,
}: {
  onLocationPicked: (latLng: string) => void;
}) => {
  const [position, setPosition] = useState(fallbackCenter);

  const { data: session } = useSession();
  const businessCoords = session?.user?.businessCoordinatesString ?? null;

  return (
    <div className="relative w-full">
      <MapContainer
        center={fallbackCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="relative w-full min-h-[80vh] md:min-h-[50vh] rounded-xl z-20"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="z-10"
        />

        {/* ✅ auto position on load */}
        <AutoLocate setPosition={setPosition} businessCoords={businessCoords} />

        <DraggableMarker
          onLocationPicked={onLocationPicked}
          position={position}
          setPosition={setPosition}
        />
        <PanToUserButton setPosition={setPosition} />
      </MapContainer>
    </div>
  );
};

export default Map;
