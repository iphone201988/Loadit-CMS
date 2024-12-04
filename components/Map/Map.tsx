"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import InputField from "../Input/Input";
import { validateAddress } from "@/actions/customers";
import { toast } from "react-toastify";

interface MapInputProps {
  name: string;
  label: string;
  placeholder: string;
  handleChange?: any;
  setShowLoader: any;
  pickup: boolean;
}

const MapInput = ({
  name,
  label,
  placeholder,
  handleChange,
  setShowLoader,
  pickup,
}: MapInputProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ["places"], // Ensure the places library is loaded
  });

  const [location, setLocation] = useState<any>({});
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState("");
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null); // <-- Define mapRef here
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Function to get the address from lat/lng
  const geocodeLatLng = async (lat: number, lng: number) => {
    if (!geocoderRef.current) return;
    const geocoder = geocoderRef.current;
    const location = { lat, lng };

    geocoder.geocode({ location }, async (results, status) => {
      if (status === "OK" && results && results[0]) {
        setAddress(results[0].formatted_address);
        setShowLoader(true);
        const response: any = await validateAddress(lat, lng, pickup);
        setShowLoader(false);

        if (response.success) {
          handleChange(results[0].formatted_address, lat, lng, setAddress);
        } else {
          toast.error(response.message);
          setAddress("");
        }
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

  const handleMapLoad = (map: google.maps.Map) => {
    // Initialize geocoder when the map loads
    geocoderRef.current = new window.google.maps.Geocoder();
    mapRef.current = map; // <-- Store the map instance
  };

  // const handlePlaceChanged = () => {
  //   if (autocompleteRef.current) {
  //     const place = autocompleteRef.current.getPlace();
  //     if (place.geometry && mapRef.current) {
  //       // <-- Check if mapRef.current is defined
  //       const location: any = place.geometry.location;
  //       setLocation({ lat: location.lat(), lng: location.lng() });
  //       mapRef.current.panTo({ lat: location.lat(), lng: location.lng() }); // <-- Use mapRef.current
  //       geocodeLatLng(location.lat(), location.lng());
  //     }
  //   }
  // };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry && mapRef.current) {
        const location: any = place.geometry.location;

        if (place.geometry.viewport) {
          // If the place has a viewport (which means it's an area, not a specific point)
          mapRef.current.fitBounds(place.geometry.viewport); // Fit the map to the area
        } else {
          // If it's a specific location, like an address
          setLocation({ lat: location.lat(), lng: location.lng() });
          mapRef.current.panTo({ lat: location.lat(), lng: location.lng() });
          mapRef.current.setZoom(15); // Set a closer zoom for specific locations
        }

        geocodeLatLng(location.lat(), location.lng());
      }
    }
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
      {/* <div onClick={() => setShowMap(!showMap)}>
        <InputField
          name={name}
          label={label}
          placeholder={placeholder}
          value={address}
          handleChange={handleChange}
          readOnly={true}
        />
      </div> */}
      {isLoaded && (
        <>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged}
          >
            <div>
              <label htmlFor="">{label}</label>
              <input
                type="text"
                placeholder="Search for places..."
                ref={inputRef}
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                  zIndex: 5,
                }}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setShowMap(true);
                }}
                value={address}
                onClick={() => setShowMap(!showMap)}
              />
            </div>
          </Autocomplete>
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
        </>
      )}
    </div>
  );
};

export default MapInput;
