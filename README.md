# iHoover

Ce projet est un test technique d'embauche.

Le produit fini est utilisable à l'adresse https://ihoover.arthurpellissier.com

Cette application a pour but de permettre à l'utilisateur de définir une grille ayant une largeur X et une hauteur Y. X et Y doivent être des nombres entiers supérieurs à 0.
Il pourra également déterminer l'emplacement et la direction de Hoover, le petit robot intelligent.

L'emplacement de Hoover est défini par des nombres entiers X et Y également, qui doivent être supérieurs à 0, et inférieurs ou égaux à la longueur et largeur de la grille.

La "Direction" à laquelle Hoover fait face est définie par les lettres NEWS, pour Nord, Est, Ouest et Sud. Le formulaire traite les minuscules comme des majuscules, si plusieurs lettres sont entrées, seule la première est prise en compte. Si cette première lettre n'est pas l'une des 4 reconnues par l'interface, alors la direction par défaut sera le Nord.

Diriger le Robot :
Hoover l'aventurier peut être dirigé à l'aide du formulaire Générateur d'IA de Nettoyage !! Pour celà il suffit d'entrer les commandes A pour avancer, D pour tourner à droite, et G pour tourner à gauche. Il est possible d'entrer n'importe quel caractère dans n'importe quel ordre, mais si Hoover ne comprend pas votre ordre, il ne l'exécutera pas.

Le résultat du nettoyage s'affichera à droite de l'écran sur un PC, et en dessous du formulaire sur un moniteur d'une taille inférieur à 994 pixels.
Il est également accompagné d'un suivi de toutes les actions que Hoover aura faites pour vous.

L'application est utilisable directement sur le site mentionné ci-dessus. Pour l'utiliser en local, il faudra initialiser NPM et lancer un environnement de développement dans le dossier "ihoover"

Pour cela, vérifiez que vous avez bien installé Node et Node Package Manager, puis suivez ces consignes :
cd ihoover
npm install
npm start

Cela devrait ouvrir une fenêtre avec votre navigateur par défaut.
