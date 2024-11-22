import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './shared/styles/index.css';
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import DirectionsForm from './shared/components/DirectionsForm';

interface LocationData {
  id: string;
  startAddress: string;
  destinationAddress: string;
}

function App() {
  const [googleApiKey, setGoogleApiKey] = useState<string>(process.env.REACT_APP_GOOGLE_API_KEY!)

  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [directions, setDirections] = useState<any>();
  
  const calculateRoute = async (locationData: LocationData) => {
    const { DirectionsService } = window.google.maps;

    const directionsService = new DirectionsService();
    directionsService.route(
      {
        origin: locationData.startAddress,
        destination: locationData.destinationAddress,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Erro ao buscar rotas:", status);
        }
      }
    );
  };

  const handleFormSubmit = (data: LocationData) => {
    console.log("Dados recebidos:", data);
    setLocationData(data);
    calculateRoute(data);
  };

  useEffect(() => {
    console.log(directions)
    console.log(process.env)
    if(process.env.REACT_APP_GOOGLE_API_KEY){
      setGoogleApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
    }
  },[directions, process.env])
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-black/20 z-20">
      <DirectionsForm onSubmit={handleFormSubmit} />      
      <LoadScript googleMapsApiKey={googleApiKey}>
        <div className="flex flex-col items-center w-3/4">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "500px" }}
            center={{ lat: -23.55052, lng: -46.633308 }} 
            zoom={12}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
}

export default App;
