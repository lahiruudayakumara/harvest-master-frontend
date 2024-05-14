import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { TextField, CircularProgress, Button } from "@mui/material";
import { updateSoldStock } from "src/api/communitymarket";

const MapComponent = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState({
    lat: 7.8731,
    lng: 80.7718,
  });
  const [selectedLocation, setSelectedLocation] = useState(props.location);

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => { 

    setSelectedLocation(props.location)
  }
  , [props.location]);



  const changelocation = async () => {
    const response =  await updateSoldStock(props.id, selectedLocation)
    if(response.status === 200){
      alert("Location updated successfully")
    }
  }

  const options = {
    componentRestrictions: { country: "lk" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };

  const onLoad = useCallback((map) => {
    setIsLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {}, []);

  const loadMap = () => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    setIsLoaded(true);
    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(location);
        setDefaultLocation(location);
        setSelectedLocation(place.formatted_address); // Set selected location as a string
        console.log(location);
      } else {
        // Handle cases where place details are not available
        console.error("Place details are not available");
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
          onChange={(e) => setSelectedLocation(e.target.value)}
          value={selectedLocation}
          sx={{ mb: 3.5, mr: 2, height: 40, width: "100%" }}
        />
        <Button sx={{ mb: 2, height: 40 }} onClick={changelocation}>Set Location</Button>
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
          <CircularProgress /> // or any loading indicator
        )}
      </div>
      
    </div>
  );
};

export default MapComponent;
