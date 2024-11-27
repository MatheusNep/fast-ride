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
      <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-6 shadow-md z-10">
        <h1 className="text-2xl font-bold">Fast Ride</h1>
      </header>
      <div className="flex pt-16">
        <nav className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-blue-100 p-4 border-r border-gray-300 overflow-y-auto">
          <ul className="space-y-4">
            <li>
              <button onClick={handleShowRideEstimateConfirm} className="text-blue-600 hover:underline">
                Nova Viagem
              </button>
            </li>
            <li>
              <button onClick={handleShowRideHist} className="text-blue-600 hover:underline">
                Histórico de Viagens
              </button>
            </li>
          </ul>
        </nav>

        <main className="ml-64 w-full p-6">
          <section className={`mb-6 ${showRideEstimateConfirm ? '' : 'hidden'}`}>
            <h2 className="text-xl font-semibold text-gray-700">Faça sua Viagem</h2>
            <div className="bg-white p-4 shadow rounded-lg">
              <RideEstimateConfirm></RideEstimateConfirm>
            </div>
          </section>

          <section className={`mb-6 ${showRideEstimateConfirm ? 'hidden' : ''}`}>
            <h2 className="text-xl font-semibold text-gray-700">Histórico de Viagem</h2>
            <div className="bg-white p-4 shadow rounded-lg">
              <RideHist></RideHist>
            </div>
          </section>
        </main>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 text-gray-600 py-4 text-center shadow-md">
        <p>&copy; {new Date().getFullYear()} Minha Aplicação. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
