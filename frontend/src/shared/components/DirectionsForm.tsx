import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from '../schemas/directionsFormSchema';

const DirectionsForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
    });
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-3/4">
            <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                    ID
                </label>
                <input
                    type="text"
                    id="id"
                    {...register("id")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.id && <p className="text-red-600 text-sm">{errors.id.message}</p>}
            </div>
            <div>
                <label htmlFor="startAddress" className="block text-sm font-medium text-gray-700">
                    Endereço de Origem
                </label>
                <input
                    type="text"
                    id="startAddress"
                    {...register("startAddress")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.startAddress && <p className="text-red-600 text-sm">{errors.startAddress.message}</p>}
            </div>
            <div>
                <label htmlFor="destinationAddress" className="block text-sm font-medium text-gray-700">
                    Endereço de Destino
                </label>
                <input
                    type="text"
                    id="destinationAddress"
                    {...register("destinationAddress")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.destinationAddress && <p className="text-red-600 text-sm">{errors.destinationAddress.message}</p>}
            </div>
            <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            Enviar
            </button>
        </form>
        
    );
};

export default DirectionsForm;



// const DirectionsForm = () => {
//     const [startAddress, setStartAddress] = useState<string>();
//     const [destinationAddress, setDestinationAddress] = useState<string>();
//     const [userId, setUserId] = useState<string>();

//     const handleSubmit = () => {
//         if(startAddress || destinationAddress || userId || startAddress !== '' || destinationAddress !== '' || userId !== ''){

//         }
//     }
//     return (
//         <div className="w-full h-full">
//             <form onSubmit={handleSubmit} >
//                 <div className="space-y-12">
//                     <div className="border-b border-gray-900/10 pb-12">
//                         <h2 className="text-base font-semibold text-gray-900">Profile</h2>
//                         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                         <input
//                             type="text"
//                             placeholder="Endereço de Partida"
//                             value={startAddress}
//                             onChange={(e) => setStartAddress(e.target.value)}
//                             className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Endereço de Destino"
//                             value={destinationAddress}
//                             onChange={(e) => setDestinationAddress(e.target.value)}
//                             className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                         />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-6 flex items-center justify-end gap-x-6">
//                     <button type="button" className="text-sm font-semibold text-gray-900">
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export { DirectionsForm }
