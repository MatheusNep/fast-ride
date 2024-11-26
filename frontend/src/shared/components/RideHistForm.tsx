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
      control,
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
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-row gap-4 w-3/4 ${visibility ? '' : 'hidden'}`}>
            <div className='h-14 mb-3'>
                <label htmlFor="id" className="block text-lg font-medium text-gray-700">
                    ID do usuário
                </label>
                <input
                    type="text"
                    id="id"
                    {...register("custumer_id")}
                    className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    placeholder='Id'
                />
                {errors.custumer_id && <p className="text-red-600 text-lg">{errors.custumer_id.message}</p>}
            </div>
            <div className='h-14 mb-3'>
                <label htmlFor="startAddress" className="block text-lg font-medium text-gray-700">
                    Motorista
                </label>
                <select className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg" {...register('driver_id')} name="use">
                    {drivers?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                    <option key={0} value={0} defaultValue="">
                        Todos
                    </option>
                </select>
                {errors.driver_id && <p className="text-red-600 text-lg">{errors.driver_id.message}</p>}
            </div>            
            <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Filtrar
            </button>
        </form>
        
    );
};

export default RideHistForm;
