import React, { useContext } from 'react';
import { AuthContext } from '../App.tsx';

// Création du formulaire de création de la grille
export default function InputForm() {
  //   récupération des variables globales et des états
  const {
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

  // La fonction suivante n'est utile que si l'on souhaite réactiver le bouton "Submit" du formulaire.
  //   Les données se mettent à jour sans avoir à soumettre les informations, celui-ci a donc été désactivé pour l'instant.
  //
  //   const EditGridAndVacuum = (e) => {
  //     e.preventDefault();
  //     setGridSizeX(gridSizeX);
  //     setGridSizeY(gridSizeY);
  //     setVacPosX(vacPosX);
  //     setVacPosY(vacPosY);
  //     setVacPosO(vacPosO);
  //   };

  //   Ces fonctions viennent vérifier la validité des données entrées pour la direction et la position de hoover et le nombre de cellules,
  // en cas de direction non reconnue elle définit N comme valeur par défaut, ou la valeur max ou min de la grille selon les cas. De plus, elle s'assure de ne prendre en compte que le premier caractère entré dans le formulaire
  function CheckO(e) {
    const goodValue = e.target.value;
    const upperValue = goodValue.toUpperCase();
    if (['N', 'W', 'E', 'S'].includes(upperValue[0])) {
      setVacPosO(upperValue[0]);
    } else setVacPosO('N');
  }

  function CheckX(e) {
    const inputX = Math.round(e.target.value);
    if (inputX <= gridSizeX && inputX >= 0) {
      setVacPosX(Number(inputX));
    } else if (inputX > gridSizeX) {
      setVacPosX(Number(gridSizeX));
    } else {
      setVacPosX(Number(0));
    }
  }
  function CheckY(e) {
    const inputY = Math.round(e.target.value);
    if (inputY <= gridSizeY && inputY >= 0) {
      setVacPosY(Number(inputY));
    } else if (inputY > gridSizeY) {
      setVacPosY(Number(gridSizeY));
    } else {
      setVacPosY(Number(0));
    }
  }
  function CheckGridX(e) {
    const inputGridX = Math.round(e.target.value);
    if (inputGridX > 0) {
      setGridSizeX(Number(inputGridX));
    } else {
      setGridSizeX(Number(1));
    }
  }
  function CheckGridY(e) {
    const inputGridY = Math.round(e.target.value);
    if (inputGridY > 0) {
      setGridSizeY(Number(inputGridY));
    } else {
      setGridSizeY(Number(1));
    }
  }
  //   On crée ensuite le formulaire qui déclenchera les fonctions ci-dessus
  return (
    <div className="inputFormDiv">
      <h1>Gestionnaire d'environnement IA</h1>
      <form
        action="#"
        method="post"
        className="editVacuumInfo inputForm"
        // onSubmit={(e) => EditGridAndVacuum(e)}
      >
        <label className="editVacuumInfoLabel">
          <h2>Taille de la Grille</h2>
          <p>
            Largeur de la grille : <br />
            nombre entier supérieur à 0
          </p>
          <input
            className="formInput"
            name="gridsize-x"
            type="number"
            step="1"
            min="0"
            defaultValue={gridSizeX}
            onChange={(e) => CheckGridX(e)}
            required
          ></input>

          <p>
            Longueur de la grille : <br />
            nombre entier supérieur à 0
          </p>
          <input
            className="formInput"
            name="gridsize-y"
            type="number"
            step="1"
            min="1"
            defaultValue={gridSizeY}
            onChange={(e) => CheckGridY(e)}
            required
          ></input>
        </label>
        <label className="editVacuumInfoLabel">
          <h2>Position Initiale de l'Aspirateur</h2>
          <p>
            Position horizontale : <br /> nombre entier entre 0 et la largeur de
            la grille
          </p>
          <input
            className="formInput"
            name="vacpos-x"
            type="number"
            step="1"
            min="0"
            max={gridSizeX}
            defaultValue={vacPosX}
            onChange={(e) => CheckX(e)}
            required
          ></input>
          <p>
            Position Verticale : <br /> nombre entier entre 0 et la largeur de
            la grille
          </p>
          <input
            className="formInput"
            name="vacpos-x"
            type="number"
            step="1"
            min="0"
            max={gridSizeY}
            defaultValue={vacPosY}
            onChange={(e) => CheckY(e)}
            required
          ></input>
          <p>
            Direction : <br /> Une lettre au choix entre N, E, S et W. <br />{' '}
            Correspondant aux points cardinaux.{' '}
          </p>
          <input
            className="formInput"
            name="vacpos-o"
            type="string"
            defaultValue={vacPosO}
            onChange={(e) => CheckO(e)}
            required
          ></input>
        </label>

        {/* <input
          type="submit"
          value="Construire la pièce"
          id="confirmCreateRoom"
          className="submitBtn"
        /> */}
      </form>
    </div>
  );
}
