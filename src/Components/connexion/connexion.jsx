import axios from "axios";
import React from "react";
import { useState } from "react";
// import "../styles/Connexion.css";

export default function Connexion() {
    localStorage.clear();
  const [nom_utilisateur, setNomUtilisateur] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");

  const handleConnexion = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_utilisateur, mot_de_passe }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Authentification réussie
        // Effectuez ici les actions nécessaires pour rediriger l'utilisateur vers la page d'accueil, etc.
        localStorage.setItem("nom_utilisateur", nom_utilisateur);

        const recupInfoUser = await axios.get(`http://localhost:3001/utilisateurs/nom/${nom_utilisateur}`
        );
        const id_utilisateur = recupInfoUser.data[0].id_utilisateur;

        localStorage.setItem("id_utilisateur", id_utilisateur);

        window.location.href = "/Jeux"; //Redirection vers la page d'accueil
      } else {
        console.log(data.message); // Affiche les erreurs d'authentification
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="connexion">
      <h1>Connexion</h1>
      <form onSubmit={handleConnexion}>
        <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
        <input
          type="text"
          id="nom_utilisateur"
          value={nom_utilisateur}
          onChange={(e) => setNomUtilisateur(e.target.value)}
        />

        <label htmlFor="mot_de_passe">Mot de passe</label>
        <input
          type="password"
          id="mot_de_passe"
          value={mot_de_passe}
          onChange={(e) => setMotDePasse(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}