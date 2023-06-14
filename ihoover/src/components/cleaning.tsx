import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../App.tsx';
export default function Cleaning() {
  const { vacPosition, setVacPosition, gridSize, setGridSize } =
    useContext(AuthContext);
  return (
    <div className="cleaningResult">
      <h1>Résultats !</h1>
      <div className="InfosEnvironnement">
        <p>
          Taille de la Grille : {gridSize.x}X{gridSize.y}
        </p>
        <p>Position de Hoover : </p>
        <ul>
          <li>X : {vacPosition.x}</li>
          <li>Y : {vacPosition.y}</li>
          <li>Direction : {vacPosition.o}</li>
        </ul>
      </div>
      <div id="CleaningDiv">
        <p>Hoover chargé et prêt à décoller.</p>
      </div>
    </div>
  );
}
