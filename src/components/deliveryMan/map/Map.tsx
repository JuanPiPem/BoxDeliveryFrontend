import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const MapContainer = () => {
  const mapStyles = {
    width: "300px",
    height: "396px",
  };

  const defaultCenter = {
    lat: -34.615689,
    lng:  -58.435104
  };

  return (
       <LoadScript
      googleMapsApiKey="AIzaSyA5qc0Wk9unLNVkctpDDrGYcNQ_UF-mBKg"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
   
  );
};

export default MapContainer;
