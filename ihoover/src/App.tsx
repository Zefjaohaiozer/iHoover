import './App.css';
import Cleaning from './components/cleaning.tsx';
import InputForm from './components/input_form.tsx';
import OrdersForm from './components/orders_form.tsx';
import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

// Je définis ici l'application centrale. Avec les variables et leurs états qui seront modifiés à travers l'application
function App() {
  const [gridSize, setGridSize] = useState({ x: 10, y: 10 });
  const [vacPosition, setVacPosition] = useState({ x: 5, y: 5, o: 'N' });
  const [gridSizeX, setGridSizeX] = useState(10);
  const [gridSizeY, setGridSizeY] = useState(10);
  const [vacPosX, setVacPosX] = useState(5);
  const [vacPosY, setVacPosY] = useState(5);
  const [vacPosO, setVacPosO] = useState('N');
  // je vais écouter les changements de coordonnées pour le robot et la grille, et appliquer un reload de l'ui lors des changements.
  useEffect(() => {
    setGridSize({ x: gridSizeX, y: gridSizeY });
    setVacPosition({ x: vacPosX, y: vacPosY, o: vacPosO });
  }, [gridSizeX, gridSizeY, vacPosX, vacPosY, vacPosO]);

  //  Je crée mon application qui a 3 composants : Le formulaire de génération de la grille et de position initiale de Hoover, le formulaire d'ordres à donner à Hoover, et les résultats à afficher ensuite
  return (
    <AuthContext.Provider
      value={{
        gridSize,
        setGridSize,
        vacPosition,
        setVacPosition,
        gridSizeX,
        gridSizeY,
        vacPosO,
        vacPosX,
        vacPosY,
        setGridSizeX,
        setGridSizeY,
        setVacPosO,
        setVacPosX,
        setVacPosY,
      }}
    >
      {' '}
      <div className="App">
        <div className="setUp">
          <InputForm />
          <OrdersForm />
        </div>
        <Cleaning />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
