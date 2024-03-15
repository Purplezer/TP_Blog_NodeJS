import React from "react";
import { useState } from "react";
// import "../styles/inscription.css";

export default function Inscription() {
  const [nom_utilisateur, set_nom_utilisateur] = useState("");
  const [email, set_email] = useState("");
  const [mot_de_passe, set_mot_de_passe] = useState("");

  const handleInscription = async (event) => {
    event.preventDefault();

    const nouveau_utilisateur = {
      email: email,
      nom_utilisateur: nom_utilisateur,
      mot_de_passe: mot_de_passe,
    };

    try {
      //Ajout user dans BDD
      const response = await fetch("http://localhost:3001/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveau_utilisateur),
      });

      if (response.ok) {
        console.log("Utilisateur ajouté avec succès");
        set_nom_utilisateur("");
        set_email("");
        set_mot_de_passe("");
        window.location.href = "/jeux"; //Redirection vers la page d'accueil
      } else {
        console.log("Erreur lors de l'ajout de l'utilisateur");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="inscription">
      <h1>Inscription</h1>
      <form onSubmit={handleInscription}>
        <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
        <input
          type="text"
          id="nom_utilisateur"
          value={nom_utilisateur}
          onChange={(e) => set_nom_utilisateur(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => set_email(e.target.value)}
        />

        <label htmlFor="mot_de_passe">Mot de passe</label>
        <input
          type="text"
          id="mot_de_passe"
          value={mot_de_passe}
          onChange={(e) => set_mot_de_passe(e.target.value)}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}