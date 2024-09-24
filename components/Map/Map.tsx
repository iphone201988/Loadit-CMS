"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import InputField from "../Input/Input";

interface MapInputProps {
  name: string;
  label: string;
  placeholder: string;
  handleChange?: any;
}

const MapInput = ({
  name,
  label,
  placeholder,
  handleChange,
}: MapInputProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const [location, setLocation] = useState<any>({});
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState("");
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Function to get the address from lat/lng
  const geocodeLatLng = async (lat: number, lng: number) => {
    if (!geocoderRef.current) return;
    const geocoder = geocoderRef.current;
    const location = { lat, lng };

    geocoder.geocode({ location }, (results, status) => {
      //   console.log("Geocoding status:", status);
      //   console.log("Geocoding results:", results);
      if (status === "OK" && results && results[0]) {
        setAddress(results[0].formatted_address);
        handleChange(results[0].formatted_address, lat, lng);
      } else {
        setAddress("Address not found");
      }
    });
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newLocation = {
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    };

    setLocation(newLocation);
    geocodeLatLng(newLocation.lat, newLocation.lng);
    setShowMap(false);
  };

  const handleMapLoad = () => {
    // Initialize geocoder when the map loads
    geocoderRef.current = new window.google.maps.Geocoder();
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          console.log({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          // Default to a location if geolocation fails (e.g., San Francisco)
          setLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    } else {
      // If geolocation is not supported, set a default location
      setLocation({ lat: 37.7749, lng: -122.4194 });
    }
  }, []);

  return (
    <div>
      <div onClick={() => setShowMap(!showMap)}>
        <InputField
          name={name}
          label={label}
          placeholder={placeholder}
          value={address}
          handleChange={handleChange}
          readOnly={true}
        />
      </div>
      {showMap && (
        <div className="absolute w-full h-[400px] z-10">
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={location}
            zoom={15}
            onClick={handleMapClick}
            onLoad={handleMapLoad} // Ensure geocoder is initialized after the map loads
          >
            <Marker
              position={location}
              draggable={true} // Allow users to drag the marker
              onDragEnd={handleMapClick} // Get the new location on drag end
            />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default MapInput;
