import RideHistForm from "./RideHistForm";
import { RideHistFormData } from "../schemas/rideHistFormSchema";
import useRideHist from "../hooks/useRideHist";
import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, } from "@tanstack/react-table";
import { Ride } from "../schemas/rideHistResponse";
import Moment from 'react-moment'
import { formatCurrency } from "../utils/formatCurrency";
import { showErrorAlert } from "../utils/sweetalert";
import { formatNumber } from "../utils/formatNumber";

const columns: ColumnDef<Ride>[] = [
    {
      accessorKey: "createdAt",
      header: "Data e Hora",
      cell: (createdAt) => <Moment format="DD/MM/YYYY - hh:mm" date={new Date(createdAt.getValue() as string)}></Moment>
    },
    {
      accessorKey: "driver.name",
      header: "Motorista",
    },
    {
      accessorKey: "origin",
      header: "Origem",
    },
    {
      accessorKey: "destination",
      header: "Destino",
    },
    {
      accessorKey: "distance",
      header: "Distância",
      cell: (distance) => `${formatNumber(Math.round(distance.getValue() as number * 100) / 100)} km`
    },
    {
      accessorKey: "duration",
      header: "Tempo",
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: (value) => formatCurrency(Math.round(value.getValue() as number * 100) / 100)
    },
  ];

const RideHist = () => {
    const [filters, setFilters] = useState({customer_id: "", driver_id: 0})
    const [tripData, setTripData] = useState<Ride[]>([]);

    const {data: rideHist, error} = useRideHist({
        params:{
            customer_id: filters.customer_id,
            driver_id: filters.driver_id
        }
    });

    const handleRideHistFormSubmit = async (data: RideHistFormData) => {
        if(data.customer_id && data.driver_id){
            setFilters({
                customer_id: data.customer_id,
                driver_id: parseInt(data.driver_id)
            })
        }
    };

    useEffect(() => {
        setTripData(rideHist?.rides ? rideHist?.rides : []);
        if(error){
            showErrorAlert("Tente novamente", error.message) 
        }        
    }, [rideHist, error]);

    const table = useReactTable({
        data: tripData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
          
    return (
        <div className="w-full h-full flex flex-col justify-center items-center z-20">
            <RideHistForm onSubmit={handleRideHistFormSubmit} visibility={true} />
            <div className="w-full sm:w-3/4 xl:w-1/2">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-100">
                        {headerGroup.headers.map((header) => (
                            <th
                            key={header.id}
                            className="border border-gray-300 px-4 py-2 text-left"
                            >
                            {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="bg-gray-50 hover:bg-white">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="border border-gray-300 px-4 py-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                {
                    !rideHist ?
                    <div className="w-full flex flex-row justify-center">Nenhum registro encontrado</div>
                    : <></>
                }
            </div>
        </div>            
    );
};

export default RideHist;
