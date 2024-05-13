import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { TextField, CircularProgress, Button } from "@mui/material";

const MapComponent = () => {
  const [isLoaded, setisLoaded] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState({
    lat: 7.8731,
    lng: 80.7718,
  });

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: "lk" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };

  const onLoad = useCallback((map) => {
    setisLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {}, []);

  const loadMap = () => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    setisLoaded(true);
    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(location);
        setDefaultLocation(location);
      }
    });
  };

  return (
    <div>
      <div>
        <TextField
          inputRef={inputRef}
          onFocus={loadMap}
          placeholder="Enter your address"
          sx={{ mb: 3.5,mr:2,height: 40, width: "100%"}}
        />
        <Button sx={{mb:2,height:40}}>Set Location</Button>
      </div>
      <div>
        {isLoaded ? (
          <GoogleMap
            onLoad={onLoad}
            center={defaultLocation}
            zoom={12}
            mapContainerStyle={{
              height: "285px",
              width: "100%",
              borderRadius: 4,
            }}
            onUnmount={onUnmount}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        ) : (
          <GoogleMap
            onLoad={onLoad}
            center={defaultLocation}
            zoom={12}
            mapContainerStyle={{
              height: "320px",
              width: "100%",
              borderRadius: 4,
            }}
            onUnmount={onUnmount}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
