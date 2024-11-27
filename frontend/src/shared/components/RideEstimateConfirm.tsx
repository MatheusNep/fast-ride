import  {  useEffect, useRef, useState } from 'react';
import { DirectionsRenderer, GoogleMap, LoadScript } from "@react-google-maps/api";
import { RideEstimateResponse, RideRequest } from '../schemas/rideEstimateResponse';
import { getRideEstimate } from '../api/ride/rideEstimate';
import { convertDirectionsResponseToDirectionsResult } from '../utils/convertDirectionsResponseToDirectionsResult';
import { getRideConfirm } from '../api/ride/rideConfirm';
import DirectionsForm from './DirectionsForm';
import DriverOptions from './DriverOptions';
import { showErrorAlert, showSuccessAlert } from '../utils/sweetalert';

interface LocationData {
  id: string;
  startAddress: string;
  destinationAddress: string;
}

type RideEstimateConfirmProps = {
  showRideHist: () => void
}

const RideEstimateConfirm = ({showRideHist}: RideEstimateConfirmProps) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<RideEstimateResponse | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [formData, setFormData] = useState<{ id: string, startAddress: string, destinationAddress: string}>();
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: -23.55052, lng: -46.633308 });
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const clearDirections = () => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
    setDirectionsResponse(null);
  };
  
  const handleFormSubmit = async (data: LocationData) => {
    if(directionsResponse){
      clearDirections();
    }    
    setDirectionsResponse(null);
    setFormData(data);

    try {
      const getRideEstimateResult: RideEstimateResponse = await getRideEstimate(data.startAddress, data.destinationAddress, data.id)
      if (getRideEstimateResult) {
        let convertedToDirectionsResult = convertDirectionsResponseToDirectionsResult(getRideEstimateResult.routeResponse);
        const renderer = new google.maps.DirectionsRenderer();
        directionsRendererRef.current = renderer;
        renderer.setMap(mapRef.current);
        renderer.setDirections(convertedToDirectionsResult);
        setDirectionsResponse(convertedToDirectionsResult);        
        setLocationData(getRideEstimateResult);
        setShowMap(true);
      } else {
        throw new Error("Rota não encontrada. Verifique os endereços e tente novamente.");
      }
    } catch (err: any) {
      showErrorAlert("Erro", err.message);
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
      
      try {
        const saveRide = await getRideConfirm(rideRequest);
        if(saveRide){
          showSuccessAlert("Sucesso!", "A viagem foi salva!")
        }
        setDirectionsResponse(null);
      } catch (error: any) {
        showErrorAlert("Erro", error.message)
      }      
      showRideHist();
    }
    
  };

  const handleShowForm = () =>{
    setShowMap(false);
    clearDirections();
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!} libraries={['geometry', 'drawing']}>
      <div className="w-full h-full flex flex-col justify-center items-center z-20">
        <DirectionsForm onSubmit={handleFormSubmit} visibility={!showMap}/>     
        <div className={`flex flex-col items-center w-3/4 ${showMap ? '' : 'hidden'} `}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "500px" }}
            center={mapCenter} 
            zoom={12}
            onLoad={(map) => {(mapRef.current = map)}}
          >
            {directionsResponse && 
              <DirectionsRenderer 
                directions={ directionsResponse } 
                options={{ suppressMarkers: true, suppressPolylines: true }}                
              />}
          </GoogleMap>
          <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">Motoristas Disponíveis</h1>
            {
              locationData?.options && locationData?.options.length > 0 ?          
                <DriverOptions drivers={locationData?.options} onSelectDriver={handleSelectDriver}></DriverOptions>                        
              :
              <p>
                Nenhum Motorista Encontrado. Tente outra rota!
              </p>
            }
            <div className='flex flex-row w-full justify-center items-center mt-4'>
              <button onClick={handleShowForm}  type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:bg-red-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </LoadScript>  
  );
}

export default RideEstimateConfirm;
