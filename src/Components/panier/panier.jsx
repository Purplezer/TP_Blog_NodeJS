import React from 'react';    // Importer le hook useState
import { useState } from 'react';   // Importer le hook useState
import { differenceInDays } from 'date-fns';    // Importer la fonction differenceInDays
import axios from 'axios';    // Importer axios

export default function Panier() {    // Créer le composant Panier

  const [dateLocation, setDateLocation] = useState('');   // Déclarer la variable d'état dateLocation
  const [dateRetour, setDateRetour] = useState('');     // Déclarer la variable d'état dateRetour
  const [panier, setPanier] = useState(JSON.parse(localStorage.getItem('panier')) || []);   // Déclarer la variable d'état panier

  //Calculer nombre de jour de location
  const calculerNombreJours = (dateLocation, dateRetour) => {
    const jours = differenceInDays(new Date(dateRetour), new Date(dateLocation));
    return jours > 0 ? jours : 0;
  };

  //Calculer prix total du panier
  const calculerPrixTotal = () => {
    let prixTotal = 0;
    panier.forEach((jeu) => {
      prixTotal += jeu.prix * calculerNombreJours(dateLocation, dateRetour);
    });
    return prixTotal;
  };

  const handleValiderLocation = async (jeu) => {
    // Vérification des dates de location et de retour
    if (!dateLocation || !dateRetour) {
      alert("Veuillez sélectionner les dates de location et de retour.");
      return;
    }

    // Vérification si la date de retour est ultérieure à la date de location
    if (new Date(dateRetour) <= new Date(dateLocation)) {
      alert("La date de retour doit être ultérieure à la date de location.");
      return;
    }

    // Calculer le prix total de la location
    const prixTotal = calculerPrixTotal();

    // Construire l'objet de location à envoyer dans la BDD
    const locationData = {
      id_utilisateur: localStorage.getItem('id_utilisateur'), // ou tout autre moyen d'identifier l'utilisateur
      id_jeu: jeu.id_jeu,
      date_location: dateLocation,
      date_retour: dateRetour,
      prix: prixTotal,
    };

    try {
      // Envoyer la requête POST au backend pour ajouter la location dans la BDD
      const response = await axios.post('http://localhost:3001/locations', locationData);

      if (response.data.success) {  // Si la location a été ajoutée avec succès
        alert('Location validée avec succès !');
        // Retirer le jeu du panier
        const nouveauPanier = panier.filter((item) => item.id_jeu !== jeu.id_jeu);  
        setPanier(nouveauPanier);   // Mettre à jour le panier
        localStorage.setItem('panier', JSON.stringify(nouveauPanier));    // Mettre à jour le localStorage
        // Réinitialiser les dates de location et de retour si nécessaire
        setDateLocation('');    
        setDateRetour('');
      } else {
        alert('Erreur lors de la validation de la location.');
      }
    } catch (error) {
      console.error('Erreur lors de la validation de la location :', error);
    }
  };



  return (  // Retourner le JSX
    <div>
      {panier.length > 0 ? (    // Si le panier n'est pas vide
        panier.map((jeu, index) => (    // Pour chaque jeu dans le panier retourner le JSX
          <fieldset key={index}>    
            <p>Nom : {jeu.nom_jeu}</p>
            <img src={jeu.image} alt='' />
            <label htmlFor="Date">Date de location</label>
            <input
              type="date"
              id="date"
              onChange={(e) => setDateLocation(e.target.value)}
            />
            <label htmlFor="Date">Date de retour</label>
            <input
              type="date"
              id="date"
              onChange={(e) => setDateRetour(e.target.value)}
            />
            <p>Prix/J : {jeu.prix} €</p>
            <p>Prix total : {calculerPrixTotal(jeu.prix, calculerNombreJours(dateLocation, dateRetour))} €</p>
            <button onClick={() => handleValiderLocation(jeu)}>Valider la location</button>
          </fieldset>
        ))
      ) : (
        <p>Le panier est vide.</p>
      )}
    </div>
  );
}
