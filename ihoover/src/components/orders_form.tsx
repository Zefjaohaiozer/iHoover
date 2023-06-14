import React, { useContext, useState } from 'react';
// import { useEffect } from 'react';
import { AuthContext } from '../App.tsx';

// Ce composant sert à la création du formulaire pour donner des ordres au robot. Il comporte également les fonctions permettant au robot de les exécuter
export default function OrdersForm() {
  // on importe les variables nécessaires à la bonne exécution des ordres
  const { vacPosition, setVacPosition, gridSize } = useContext(AuthContext);
  // on crée une variable qui correspond aux ordres donnés
  const [orders, setOrders] = useState('');

  //   cette fonction est appelée à la soumission du formulaire, elle va commencer par appliquer un upperCase à tous les caractères entrés par l'utilisateur
  const ActivateOrders = (e) => {
    e.preventDefault();

    const upperOrders = orders.toUpperCase();
    // ensuite je définis 2 variables : la première me permet de connaître le nombre d'ordres envoyés
    const orderLength = orders.length;
    // la seconde, tempVacLoc, me permet de déterminer la position de départ de Hoover, et de la manipuler un nombre de fois illimité sans avoir à recharger l'UI à chaque fois, et sans risquer d'utiliser un état de sa localisation qui risquerait de ne pas être à jour
    const tempVacLoc = { ...vacPosition };

    // ensuite, pour chaque ordre envoyé, je déclenche l'exécution de l'ordre, ainsi qu'un compte rendu visuel de celui ci pour l'utilisateur
    for (let i = 0; i < orderLength; i++) {
      // resultInfo est un objet qui me permettra d'afficher des messages à l'utilisateur en fonction de l'ordre effectué.
      let resultInfo = { text: '' };
      ExecuteOrder(upperOrders[i], tempVacLoc, resultInfo);
      GenerateContent(tempVacLoc, resultInfo);
    }
    // Une fois tous les ordres suivis, je mets à jour la position et la direction de Hoover en fonction du résultat obtenu.
    setVacPosition(tempVacLoc);
    return;
  };

  //   ce useEffect me permettait de voir en console à quels moments se déclenche la mise à jour de l'état de Hoover - il n'est plus utile
  //   useEffect(() => {
  //     console.log('vacPosition a changé :', vacPosition);
  //   }, [vacPosition]);

  //   Je définis ici 3 fonctions qui correspondent à chacun des ordres possibles.

  // RotationDroite vérifie la direction actuelle de Hoover grâce à ma variable locale, et la modifie de 90° vers la droite, puis elle définit un texte à montrer à l'utilisateur
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
  // RotationGauche fait la même chose que RotationDroite, mais vers la gauche
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
  //   MoveVac vérifie 2 éléments, la direction actuelle de Hoover, et sa position sur la grille.
  //   Si sa position et sa direction l'empêchent d'avancer alors j'affiche un message d'erreur pour l'utilisateur,
  //   puis je continue d'exécuter les ordres.
  //   Dans le cas où il peut avancer, je mets à jour les infos et je continue le travail
  const MoveVac = (tempVacLoc, resultInfo) => {
    resultInfo.text = "J'avance";
    if (tempVacLoc.o === 'N' && tempVacLoc.y < gridSize.y) {
      tempVacLoc.y = tempVacLoc.y + 1;
    } else if (tempVacLoc.o === 'E' && tempVacLoc.x < gridSize.x) {
      tempVacLoc.x = tempVacLoc.x + 1;
    } else if (tempVacLoc.o === 'S' && tempVacLoc.y > 0) {
      tempVacLoc.y = tempVacLoc.y - 1;
    } else if (tempVacLoc.o === 'W' && tempVacLoc.x > 0) {
      tempVacLoc.x = tempVacLoc.x - 1;
    } else {
      resultInfo.text = 'Désolé Hal, je ne peux pas faire ça, il y a un mur';
    }

    return [tempVacLoc, resultInfo];
  };

  //   Cette fonction est celle appelée dans la boucle d'exécution des ordres.
  // On commence par vérifier la validité de l'ordre, ci celui-ci n'est pas un D, un G ou un A, on affiche un message d'erreur, puis on continue la boucle.
  // Si la condition est vérifiée, on applique nos 3 cas possibles et on en retire les résultats.
  function ExecuteOrder(i, tempVacLoc, resultInfo) {
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
        'Je ne comprends pas. Mon IA contient un nombre limité de IF/ELSE imbriqués.');
    }
  }

  //   Enfin, on crée le formulaire, qui mettra à jour les ordres à chaque changement, et activera l'exécution à sa soumission
  return (
    <div className="inputFormDiv">
      <h1>Générateur d'Intelligence Aspiratoire</h1>
      <form
        action="#"
        method="post"
        className="inputForm"
        onSubmit={(e) => ActivateOrders(e)}
      >
        <label className="cleanFormLabel">
          <h2>Ordres Robotiques</h2>
          <p>
            Une suite de lettres au choix entre A pour avancer,
            <br /> G pour tourner à Gauche et D pour tourner à Droite{' '}
          </p>
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

// On finit avec une petite fonction qui permet de suivre l'avancée de Hoover, étape par étape, avec un message personnalisé.

function GenerateContent(tempVacLoc, resultInfo) {
  const resultDiv = document.getElementById('CleaningDiv');
  const currentX = tempVacLoc.x;
  const currentY = tempVacLoc.y;
  const currentO = tempVacLoc.o;
  const currentOrder = document.createElement('p');
  currentOrder.innerText = `${resultInfo.text}. Je suis désormais localisé en X = ${currentX}, Y = ${currentY}, et O = ${currentO}`;

  resultDiv?.appendChild(currentOrder);
  return;
}
