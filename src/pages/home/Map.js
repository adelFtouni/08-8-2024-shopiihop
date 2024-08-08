import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

const MapComponent = ({ apiKey }) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [locationName, setLocationName] = useState('');
console.log(apiKey)
  const handleMapClick = useCallback((event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setSelectedLocation(newLocation);
    reverseGeocode(newLocation.lat, newLocation.lng);
  }, []);

  const handleShowCoordinates = () => {
    if (selectedLocation) {
      alert(`Latitude: ${selectedLocation.lat}, Longitude: ${selectedLocation.lng}`);
    } else {
      alert('No location selected');
    }
  };

  const handleGoToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setCurrentLocation(newLocation);
        setSelectedLocation(newLocation);
        reverseGeocode(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const reverseGeocode = () => {
    console.log(selectedLocation)
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=${'AIzaSyDtMvhSyV3P2LQ9bqEYs1KnqRVxYPC9L-4'}`)
      .then(response => {
        if (response.data.results.length > 0) {
          setLocationName(response.data.results[0].formatted_address);
          console.log(response.data.results[0].formatted_address);
        } else {
          setLocationName('Location not found');
        }
      })
      .catch(error => {
        console.error('Error fetching location:', error);
        setLocationName('Error fetching location');
      });
  };

  const handleShowAddress = () => {
    if (selectedLocation) {
      reverseGeocode(selectedLocation.lat, selectedLocation.lng);
    } else {
      alert('No location selected');
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={10}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </LoadScript>
      <button onClick={handleShowAddress}>Show Address</button>
      <button onClick={handleShowCoordinates}>Show Coordinates</button>
      <button onClick={handleGoToCurrentLocation}>Go to Current Location</button>
      <div>
        <p>Selected Location: {locationName}</p>
      </div>
    </div>
  );
};

export default MapComponent;
