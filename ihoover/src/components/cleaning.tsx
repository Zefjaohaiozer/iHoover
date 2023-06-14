import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../App.tsx';
export default function Cleaning() {
  const { vacPosition, gridSize } = useContext(AuthContext);
  // après avoir récupéré les différentes valeurs, je les affiche ci-dessous
  return (
    <div className="cleaningResult">
      <h1>Résultats !</h1>
      <div className="InfosEnvironnement">
        <h2>Informations sur Hoover et la Grille</h2>
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
        <h2>Journal de bord d'un aspirateur</h2>
        <p>Hoover chargé et prêt à décoller.</p>
      </div>
    </div>
  );
}
