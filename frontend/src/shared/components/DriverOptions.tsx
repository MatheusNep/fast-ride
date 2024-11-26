import { Drivers } from "../schemas/drivers";
import { FaStar } from "react-icons/fa";

type DriverOptionsProps = {
    drivers: Drivers[]
    onSelectDriver: (id: number, name: string, value: number) => void;
}

const DriverOptions = ({drivers, onSelectDriver}: DriverOptionsProps) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`h-5 w-5 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ));
      };
      
    return (
        <div className="grid grid-row-1 gap-6">
            {drivers.map((item) => (
                <div
                key={item.id}
                className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
                >
                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                    <p className="text-sm font-medium text-gray-800 mb-1">
                        Veículo: {item.vehicle}
                    </p>
                    <div className="flex items-center mb-2">
                        {renderStars(Math.round(item.review.rating))}
                    </div>
                    <p className="text-lg text-gray-600">
                        <span className="font-medium">Preço:</span> R${item.value.toFixed(2).replace(".", ",")}
                    </p>
                    <button
                        onClick={() => onSelectDriver(item.id, item.name, item.value)}
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Select
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DriverOptions;
