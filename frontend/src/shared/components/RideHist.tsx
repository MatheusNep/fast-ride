import { Drivers } from "../schemas/drivers";
import { FaStar } from "react-icons/fa";
import RideHistForm from "./RideHistForm";
import { RideHistFormData } from "../schemas/rideHistFormSchema";
import { useForm } from "react-hook-form";
import useRideHist, { RIDEHIST } from "../hooks/useRideHist";
import { useState } from "react";

type RideHistProps = {
    drivers?: Drivers[]
}

const RideHist = () => {
    const { getValues: getValuesRideHist, register: registerRideHist, handleSubmit: handleSubmitRideHist, reset: resetRideHist } = useForm<RideHistFormData>();
    const [filters, setFilters] = useState({custumer_id: "", driver_id: 0})

    const {data: rideHist} = useRideHist({
        params:{
            custumer_id: filters.custumer_id,
            driver_id: filters.driver_id
        }
    });

    const handleRideHistFormSubmit = async (data: RideHistFormData) => {
        console.log(data);
        if(data.custumer_id && data.driver_id){
            setFilters(data)
        }
    };
          
    return (
        <div className="grid grid-row-1">
            <h1>Pesquise o histórico de Viagens</h1>
            <RideHistForm onSubmit={handleRideHistFormSubmit} visibility={true} />
            <>
                {
                    rideHist?.rides && rideHist?.rides.length > 0 ?
                    rideHist.rides.map((ride) => {
                        <p>{ride.customer_id} {ride.origin}</p>
                    })
                    :
                    <div>Nenhuma viagem encontrada!</div>
                }
            </>
        </div>
    );
};

export default RideHist;
