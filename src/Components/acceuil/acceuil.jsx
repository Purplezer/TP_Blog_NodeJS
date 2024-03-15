import React from 'react';    // import de React
import './acceuil.css';   // import du css

export default function Accueil() {   // fonction Accueil qui retourne le rendu de la page d'accueil
  return (
    <div className="main">
        <h1>Rendu de projet BTC2 25.1 Théo MENANT--FERRY + Alexandre DO</h1>
        <p>Du 16/11/2023 à 14:00 au 17/11/2023 à 16:45.</p>
        <p>Objectif : utiliser NodeJS pour créé une API et ses requêtes, MariaDB pour la base de donnée, et React JS pour la conception du site.</p>
        <p>Bienvenue sur notre site de location de jeux vidéos !</p>
        <p>Vous pouvez vous inscrire, vous connecter, voir les jeux dispo et les louer !</p>
        <p>Bonne visite !</p>
    </div>
  )
}