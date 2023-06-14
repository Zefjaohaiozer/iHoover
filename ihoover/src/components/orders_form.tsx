import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../App.tsx';

export default function OrdersForm() {
  const { vacPosition, setVacPosition, gridSize } = useContext(AuthContext);

  const [orders, setOrders] = useState('');

  const ActivateOrders = (e) => {
    e.preventDefault();
    console.log('Appel de ActivateOrders');
    const upperOrders = orders.toUpperCase();
    const orderLength = orders.length;
    const tempVacLoc = { ...vacPosition };

    for (let i = 0; i < orderLength; i++) {
      let resultInfo = { text: '' };
      ExecuteOrder(upperOrders[i], tempVacLoc, resultInfo);
      GenerateContent(tempVacLoc, resultInfo);
    }

    setVacPosition(tempVacLoc);

    return;
  };
  useEffect(() => {
    console.log('vacPosition a changé :', vacPosition);
  }, [vacPosition]);

  const RotationDroite = (tempVacLoc, resultInfo) => {
    switch (tempVacLoc.o) {
      case 'N':
        tempVacLoc.o = 'E';

        break;
      case 'E':
        tempVacLoc.o = 'S';
        break;
      case 'S':
        tempVacLoc.o = 'W';
        break;
      case 'W':
        tempVacLoc.o = 'N';
        break;
    }

    resultInfo.text = 'Je tourne à droite';
    return [tempVacLoc, resultInfo];
  };

  const RotationGauche = (tempVacLoc, resultInfo) => {
    switch (tempVacLoc.o) {
      case (tempVacLoc.o = 'N'):
        tempVacLoc.o = 'W';
        break;
      case (tempVacLoc.o = 'E'):
        tempVacLoc.o = 'N';
        break;
      case (tempVacLoc.o = 'S'):
        tempVacLoc.o = 'E';
        break;
      case (tempVacLoc.o = 'W'):
        tempVacLoc.o = 'S';
        break;
    }
    resultInfo.text = 'Je tourne à gauche';
    return [tempVacLoc, resultInfo];
  };
  const MoveVac = (tempVacLoc, resultInfo) => {
    resultInfo.text = "J'avance";
    if (tempVacLoc.o === 'N' && tempVacLoc.y < gridSize.y) {
      tempVacLoc.y = tempVacLoc.y + 1;
      console.log('je monte');
    } else if (tempVacLoc.o === 'E' && tempVacLoc.x < gridSize.x) {
      tempVacLoc.x = tempVacLoc.x + 1;
      console.log('je vais à droite');
    } else if (tempVacLoc.o === 'S' && tempVacLoc.y > 0) {
      tempVacLoc.y = tempVacLoc.y - 1;
      console.log('je descends');
    } else if (tempVacLoc.o === 'W' && tempVacLoc.x > 0) {
      tempVacLoc.x = tempVacLoc.x - 1;
      console.log('je vais à gauche');
    } else {
      resultInfo.text = 'Désolé Hal, je ne peux pas faire ça, il y a un mur';
      console.log('Désolé Hal, je ne peux pas faire ça, il y a un mur');
    }

    return [tempVacLoc, resultInfo];
  };

  function ExecuteOrder(i, tempVacLoc, resultInfo) {
    console.log('Appel de ExecuteOrder');
    if (['D', 'G', 'A'].includes(i)) {
      switch (i) {
        case 'D':
          tempVacLoc = RotationDroite(tempVacLoc, resultInfo);
          break;
        case 'G':
          tempVacLoc = RotationGauche(tempVacLoc, resultInfo);
          break;
        case 'A':
          tempVacLoc = MoveVac(tempVacLoc, resultInfo);
          break;
      }

      return [tempVacLoc, resultInfo];
    } else {
      return (resultInfo.text =
        'Je ne suis pas certain de comprendre. Mon IA est limitée par un petit nombre de IF/ELSE embriqués.');
    }
  }

  return (
    <div className="inputFormDiv">
      <h1>Générateur d'IA de Nettoyage</h1>
      <form
        action="#"
        method="post"
        className="inputForm"
        onSubmit={(e) => ActivateOrders(e)}
      >
        <label className="cleanFormLabel">
          <h2>Ordres Robotiques</h2>

          <input
            className="formInput "
            name="gridsize-x"
            type="string"
            step="1"
            min="0"
            defaultValue={orders}
            onChange={(e) => setOrders(e.target.value)}
            required
          ></input>
        </label>

        <input
          type="submit"
          value="Nettoyer !"
          id="confirmCleanBtn"
          className="submitBtn"
        />
      </form>
    </div>
  );
}

function GenerateContent(tempVacLoc, resultInfo) {
  console.log(resultInfo);
  const resultDiv = document.getElementById('CleaningDiv');
  const currentX = tempVacLoc.x;
  const currentY = tempVacLoc.y;
  const currentO = tempVacLoc.o;
  const currentOrder = document.createElement('p');
  currentOrder.innerText = `${resultInfo.text}. Je suis désormais localisé en X = ${currentX}, Y = ${currentY}, et O = ${currentO}`;

  resultDiv?.appendChild(currentOrder);
  return;
}
