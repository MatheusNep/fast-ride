import  {  useState } from 'react';
import './App.css';
import './shared/styles/index.css';
import { DirectionsRenderer, GoogleMap, LoadScript } from "@react-google-maps/api";
import DirectionsForm from './shared/components/DirectionsForm';
import { useForm } from 'react-hook-form';
import {  FormData } from './shared/schemas/directionsFormSchema';
import { getRideEstimate } from './shared/api/ride/rideEstimate';
import { RideEstimateResponse, RideRequest } from './shared/schemas/rideEstimateResponse';
import { convertDirectionsResponseToDirectionsResult } from './shared/utils/convertDirectionsResponseToDirectionsResult';
import DriverOptions from './shared/components/DriverOptions';
import { getRideConfirm } from './shared/api/ride/rideConfirm';

interface LocationData {
  id: string;
  startAddress: string;
  destinationAddress: string;
}

function App() {
  const [showMap, setShowMap] = useState<boolean>(false);
  const { getValues, register, handleSubmit, reset } = useForm<FormData>();
  const [locationData, setLocationData] = useState<RideEstimateResponse | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [formData, setFormData] = useState<{ id: string, startAddress: string, destinationAddress: string}>();
  
  const [error, setError] = useState<string | null>(null);
  
  const handleFormSubmit = async (data: LocationData) => {
    setError(null);
    setDirectionsResponse(null);
    setFormData(data)
    try {
      const getRideEstimateResult: RideEstimateResponse = await getRideEstimate(data.startAddress, data.destinationAddress, data.id)
      if (getRideEstimateResult) {
        let convertedToDirectionsResult = convertDirectionsResponseToDirectionsResult(getRideEstimateResult.routeResponse);
        setDirectionsResponse(convertedToDirectionsResult);        
        setLocationData(getRideEstimateResult);
        setShowMap(true);
      } else {
        throw new Error("Rota não encontrada. Verifique os endereços e tente novamente.");
      }
    } catch (err: any) {
      console.log(err)
      setError(err.message || "Erro ao buscar rota.");
    }    
  };

  const handleSelectDriver = async (id: number, name: string, value: number) => {

    if(formData && locationData?.destination && locationData?.destination && locationData?.distance){
      const rideRequest: RideRequest = {
        customer_id: formData?.id,
        origin: formData?.startAddress,
        destination: formData?.destinationAddress,
        distance: locationData?.distance,
        duration: locationData?.duration,
        driver: {
          id,
          name
        }, 
        value
      }

      const saveRide = await getRideConfirm(rideRequest);
      reset();
    }
    
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!} libraries={['geometry', 'drawing']}>
      <div className="w-full h-full flex flex-col justify-center items-center bg-black/20 z-20">
        <DirectionsForm onSubmit={handleFormSubmit} visibility={!showMap}/>
        {error && <div className="error-message">{error}</div>}        
        <div className={`flex flex-col items-center w-3/4 ${showMap ? '' : 'hidden'} `}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "500px" }}
            center={{ lat: -23.55052, lng: -46.633308 }} 
            zoom={12}
          >
            {directionsResponse && 
              <DirectionsRenderer 
                directions={ directionsResponse } 
                options={{ suppressMarkers: false }}                
              />}
          </GoogleMap>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Motoristas Disponíveis</h1>
            {
              locationData?.options && locationData?.options.length > 0 ?          
                <DriverOptions drivers={locationData?.options} onSelectDriver={handleSelectDriver}></DriverOptions>                        
              :
              <p>
                Nenhum Motorista Encontrado. Tente outra rota!
              </p>
            }
          </div> 

        </div>
      </div>
    </LoadScript>  
  );
}

export default App;
