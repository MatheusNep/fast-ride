import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './shared/styles/index.css';
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import DirectionsForm from './shared/components/DirectionsForm';
import { useForm } from 'react-hook-form';
import { formSchema, FormData } from './shared/schemas/directionsFormSchema';

interface LocationData {
  id: string;
  startAddress: string;
  destinationAddress: string;
}

function App() {
  const [showMap, setShowMap] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  
  const handleFormSubmit = async (data: LocationData) => {
    console.log("Dados recebidos:", data);
    setError(null); // Reset errors
    setDirectionsResponse(null); // Reset directions
    
    const directionsService = new google.maps.DirectionsService();
    
    try {
      const result: any = await directionsService.route({
        origin: data.startAddress,
        destination: data.destinationAddress,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (result?.status === "OK") {
        setDirectionsResponse(result); // Update map with route
        reset(); // Clear the form
      } else {
        throw new Error("Rota não encontrada. Verifique os endereços e tente novamente.");
      }
    } catch (err: any) {
      console.log(err)
      setError(err.message || "Erro ao buscar rota.");
    }
    setLocationData(data);
    setShowMap(true);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-black/20 z-20">
      <DirectionsForm onSubmit={handleFormSubmit} visibility={!showMap} />
      {error && <div className="error-message">{error}</div>}
         
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}>
        <div className={`flex flex-col items-center w-3/4 ${showMap ? '' : 'hidden'}`}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "500px" }}
            center={{ lat: -23.55052, lng: -46.633308 }} 
            zoom={12}
          >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </div>
      </LoadScript>
         
      
    </div>
  );
}

export default App;
