import  {  useState } from 'react';
import './App.css';
import './shared/styles/index.css';
import RideHist from './shared/components/RideHist';
import RideEstimateConfirm from './shared/components/RideEstimateConfirm';

function App() {
  const [showRideEstimateConfirm, setshowRideEstimateConfirm] = useState<boolean>(true);

  const handleShowRideEstimateConfirm = () =>{
    setshowRideEstimateConfirm(true)
  }

  const handleShowRideHist = () =>{
    setshowRideEstimateConfirm(false)
  }


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="fixed flex flex-row items-center top-0 left-0 right-0 bg-blue-600 text-white py-4 px-6 shadow-md z-10">
        <div className='w-1/4 h-full flex'>
          <h1 className="text-2xl font-bold">Fast Ride</h1>
        </div>
        <div className='w-3/4 h-full flex flex-row items-between justify-center'>          
          <button onClick={handleShowRideEstimateConfirm} className="py-2 px-4 text-xl text-white sm:me-16">
            Nova Viagem
          </button>
          <button onClick={handleShowRideHist} className="py-2 px-4 text-xl text-white">
            Histórico de Viagens
          </button>
        </div>
      </header>
      <main className="flex-1 mb-20 mt-24 mx-10 h-auto bg-gray-300 shadow rounded-lg">
        <section className={`mb-6 p-3 ${showRideEstimateConfirm ? '' : 'hidden'}`}>
          <h2 className="text-xl font-semibold text-gray-700 mb-1">Nova Viagem</h2>
          <div className="p-4">
            <RideEstimateConfirm showRideHist={handleShowRideHist}></RideEstimateConfirm>
          </div>
        </section>

        <section className={`mb-6 p-3 ${showRideEstimateConfirm ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700">Histórico de Viagem</h2>
          <div className="bg-gray-300 p-4">
            <RideHist></RideHist>
          </div>
        </section>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 text-gray-600 py-4 text-center shadow-md">
        <p>&copy; {new Date().getFullYear()} Fast Ride. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
