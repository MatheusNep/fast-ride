import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDirectionsSchema, FormDirectionsData } from '../schemas/directionsFormSchema';
import { useEffect } from "react";

type FormProps ={
    onSubmit: (data: FormDirectionsData) => void
    visibility?: boolean
}

const DirectionsForm = ({onSubmit, visibility=true}: FormProps) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitSuccessful },      
      reset,
    } = useForm<FormDirectionsData>({
      resolver: zodResolver(formDirectionsSchema),
      defaultValues:{
        id: undefined,
        destinationAddress: undefined,
        startAddress: undefined
      }
    });

    useEffect(() => {
        if(isSubmitSuccessful){
            reset();
        }
    },[isSubmitSuccessful])
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col w-3/4 gap-4 ${visibility ? '' : 'hidden'}`}>
            <div className='mb-3'>
                <label htmlFor="id" className="block text-lg font-medium text-gray-700">
                    ID do usuário
                </label>
                <input
                    type="text"
                    id="id"
                    {...register("id")}
                    className="mt-1 block w-full px-2 py-2 rounded-md shadow-sm sm:text-lg"
                    placeholder='Id'
                    defaultValue={''}
                />
                {errors.id && <p className="text-red-600 text-lg">{errors.id.message}</p>}
            </div>
            <div className='mb-3'>
                <label htmlFor="startAddress" className="block text-lg font-medium text-gray-700">
                    Endereço de Origem
                </label>
                <input
                    type="text"
                    id="startAddress"
                    {...register("startAddress")}
                    className="mt-1 block w-full px-2 py-2 rounded-md shadow-sm sm:text-lg"
                    placeholder='Av. Presidente Kenedy, 2299 - Jardim Marieta'
                    defaultValue={''}
                />
                {errors.startAddress && <p className="text-red-600 text-lg">{errors.startAddress.message}</p>}
            </div>
            <div className='mb-3'>
                <label htmlFor="destinationAddress" className="block text-lg font-medium text-gray-700">
                    Endereço de Destino
                </label>
                <input
                    type="text"
                    id="destinationAddress"
                    {...register("destinationAddress")}
                    className="mt-1 block w-full px-2 py-2 rounded-md shadow-sm sm:text-lg"
                    placeholder='Av. Presidente Kenedy, 2299 - Jardim Marieta'
                    defaultValue={''}
                />
                {errors.destinationAddress && <p className="text-red-600 text-lg">{errors.destinationAddress.message}</p>}
            </div>
            <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:bg-blue-500 focus:ring-offset-2"
            >
                Estimar valor
            </button>
        </form>
        
    );
};

export default DirectionsForm;