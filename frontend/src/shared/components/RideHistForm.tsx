import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rideHistFormSchema, RideHistFormData } from "../schemas/rideHistFormSchema";
import useDrivers, { DRIVERS } from "../hooks/useDrivers";

type RideHistFormProps ={
    onSubmit: (data: RideHistFormData) => void
    visibility?: boolean
}

const RideHistForm = ({onSubmit, visibility=true}: RideHistFormProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RideHistFormData>({
      resolver: zodResolver(rideHistFormSchema),
    });

    const {data: drivers} = useDrivers({
        options:{
            queryKey: [DRIVERS],
            refetchOnWindowFocus: false,
        }
    });
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-row w-full sm:w-3/4 xl:w-1/2 justify-between items-end ${visibility ? '' : 'hidden'}`}>
            <div className='mb-3 w-1/4'>
                <label htmlFor="id" className="block text-lg font-medium text-gray-700">
                    ID do usuário
                </label>
                <input
                    type="text"
                    id="id"
                    {...register("customer_id")}
                    className="mt-1 block w-full px-2 py-2 rounded-md shadow-sm sm:text-lg"
                    placeholder='Id'
                    defaultValue={''}
                />
                {errors.customer_id && <p className="text-red-600 text-lg">{errors.customer_id.message}</p>}
            </div>
            <div className='mb-3 w-1/4'>
                <label htmlFor="startAddress" className="block text-lg font-medium text-gray-700">
                    Motorista
                </label>
                <select className="mt-1 block w-full px-2 py-2 rounded-md shadow-sm sm:text-lg" {...register('driver_id')} name="driver_id" defaultValue={0}>
                    {drivers?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                    <option key={0} value={0}>
                        Todos
                    </option>
                </select>
                {errors.driver_id && <p className="text-red-600 text-lg">{errors.driver_id.message}</p>}
            </div>            
            <button
            type="submit"
            className="w-1/6 h-1/2 mb-3 mt-1 inline-flex justify-center items-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Filtrar
            </button>
        </form>
        
    );
};

export default RideHistForm;
