"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useCallback, useMemo, useRef, useState } from "react";
import { Icon, type Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 51.505,
  lng: -0.09,
};

const mapPin = new Icon({
  iconUrl: "/map/map-pin.svg",
  iconSize: [45, 45],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const DraggableMarker = () => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef<LeafletMarker | null>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker.getLatLng());
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
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

const Map = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="relative w-full min-h-[80vh] md:min-h-screen z-10 rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
