import React, { useContext, useState } from 'react';

import { AuthContext } from '../App.tsx';

export default function InputForm() {
  const {
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
  } = useContext(AuthContext);

  const EditGridAndVacuum = (e) => {
    e.preventDefault();
    setGridSizeX(gridSizeX);
    setGridSizeY(gridSizeY);
    setVacPosX(vacPosX);
    setVacPosY(vacPosY);
    setVacPosO(vacPosO);
  };

  function CheckO(e) {
    const goodValue = e.target.value;
    const upperValue = goodValue.toUpperCase();
    if (['N', 'W', 'E', 'S'].includes(upperValue[0])) {
      setVacPosO(upperValue[0]);
    } else setVacPosO('N');
  }
  return (
    <div className="inputFormDiv">
      <h1>Gestionnaire d'environnement IA</h1>
      <form
        action="#"
        method="post"
        className="editVacuumInfo inputForm"
        onSubmit={(e) => EditGridAndVacuum(e)}
      >
        <label className="editVacuumInfoLabel">
          <h2>Taille de la Grille</h2>
          <p>Largeur de la grille</p>
          <input
            className="formInput"
            name="gridsize-x"
            type="number"
            step="1"
            min="0"
            defaultValue={gridSizeX}
            onChange={(e) => setGridSizeX(Number(e.target.value))}
            required
          ></input>

          <p>Longueur de la grille</p>
          <input
            className="formInput"
            name="gridsize-y"
            type="number"
            step="1"
            min="1"
            defaultValue={gridSizeY}
            onChange={(e) => setGridSizeY(Number(e.target.value))}
            required
          ></input>
        </label>
        <label className="editVacuumInfoLabel">
          <h2>Position Initiale de l'Aspirateur</h2>
          <p>Position horizontale</p>
          <input
            className="formInput"
            name="vacpos-x"
            type="number"
            step="1"
            min="0"
            max={gridSizeX}
            defaultValue={vacPosX}
            onChange={(e) => setVacPosX(Number(e.target.value))}
            required
          ></input>
          <p>Position Verticale</p>
          <input
            className="formInput"
            name="vacpos-x"
            type="number"
            step="1"
            min="0"
            max={gridSizeY}
            defaultValue={vacPosY}
            onChange={(e) => setVacPosY(Number(e.target.value))}
            required
          ></input>
          <p>Direction</p>
          <input
            className="formInput"
            name="vacpos-o"
            type="string"
            defaultValue={vacPosO}
            onChange={(e) => CheckO(e)}
            required
          ></input>
        </label>

        <input
          type="submit"
          value="Construire la pièce"
          id="confirmCreateRoom"
          className="submitBtn"
        />
      </form>
    </div>
  );
}
