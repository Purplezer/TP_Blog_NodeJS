import React, { useState, useEffect } from 'react'; // Importation de useState et useEffect depuis la bibliothèque React
import axios from 'axios';    // Importation de axios

export default function Locations() {   // Fonction Locations qui retourne le rendu de la page des locations
  const [locations, setLocations] = useState([]);     // Déclaration de la variable d'état locations
  const [userID] = useState(localStorage.getItem('id_utilisateur'));      // Déclaration de la variable d'état userID
  const [user] = useState(localStorage.getItem('nom_utilisateur'));     // Déclaration de la variable d'état user

  console.log(userID);
  console.log(user);

  useEffect(() => {     // Fonction useEffect qui s'active à chaque fois que le composant est monté
    const recup = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/utilisateurs/${userID}`);   // Requête GET pour récupérer les données utilisateursde la BDD
        
        if (response.data.length > 0) {
          const locationsResponse = await axios.get(`http://localhost:3001/locations/user/${userID}`);    // Requête GET pour récupérer les données de location de l'utilisateur de la BDD
          console.log(locationsResponse);
          setLocations(locationsResponse.data);
          
        } else {    // Si l'utilisateur n'est pas trouvé dans la BDD
          console.log('Utilisateur non trouvé dans la BDD');
          setLocations([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    recup(); // Appel initial de recup
  }, [userID]);

  const renderLocations = () => {   // Fonction renderLocations qui permet d'afficher les locations de l'utilisateur
    if (locations.length === 0) {   // Si l'utilisateur n'a pas de location
      return <p>Aucune location enregistrée.</p>;
    } else {    // Si l'utilisateur a des locations
      return (    // Retourne le rendu des locations
        <ul>
          {locations.map(location => (
            <LocationDetails key={location.id_location} location={location} user={user} />
          ))}
        </ul>
      );
    }
  };

  const LocationDetails = ({ location, user }) => {     // Fonction LocationDetails qui retourne le rendu des détails d'une location
    const [jeu, setJeu] = useState({});
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [newNote, setNewNote] = useState(location.note);
    const [isEditingCommentaire, setIsEditingCommentaire] = useState(false);
    const [newCommentaire, setNewCommentaire] = useState(location.commentaire);

    useEffect(() => {     // Fonction useEffect qui s'active à chaque fois que le composant est monté
      const fetchJeu = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/jeux/${location.id_jeu}`);    // Requête GET pour récupérer les données du jeu de la BDD
          console.log(response);
          if (response.data.length > 0) {     // Si le jeu est trouvé dans la BDD
            setJeu(response.data[0]);
          } else {
            console.log('Jeu non trouvé dans la BDD');
            setJeu({});
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      };

      fetchJeu(); // Appel initial de fetchJeu
    }, [location.id_jeu]);

    const handleEditNote = () => {      // Fonction handleEditNote qui permet de modifier la note d'une location
      setIsEditingNote(true);
    };
  
    const handleSaveNote = async () => {        // Fonction handleSaveNote qui permet d'enregistrer la note d'une location
      try {
        await axios.put(`http://localhost:3001/locations/${location.id_location}`, {    // Requête PUT pour mettre à jour la note de la location dans la BDD
          note: newNote,
          commentaire: location.commentaire,
        });
        setIsEditingNote(false);
        setLocations((prevLocations) =>
          prevLocations.map((prevLocation) =>
            prevLocation.id_location === location.id_location
              ? { ...prevLocation, note: newNote }
              : prevLocation
          )
        );
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la note :', error);
      }
    };
  
    const handleCancelEditNote = () => {      // Fonction handleCancelEditNote qui permet d'annuler la modification de la note d'une location
      setIsEditingNote(false);
      setNewNote(location.note);
    };
  
    const handleEditCommentaire = () => {   // Fonction handleEditCommentaire qui permet de modifier le commentaire d'une location
      setIsEditingCommentaire(true);
    };
  
    const handleSaveCommentaire = async () => {   // Fonction handleSaveCommentaire qui permet d'enregistrer le commentaire d'une location
      try {
        await axios.put(`http://localhost:3001/locations/${location.id_location}`, {    // Requête PUT pour mettre à jour le commentaire de la location dans la BDD
          commentaire: newCommentaire,
          note: location.note,
        });
        setIsEditingCommentaire(false);
        setLocations((prevLocations) =>
          prevLocations.map((prevLocation) =>
            prevLocation.id_location === location.id_location
              ? { ...prevLocation, commentaire: newCommentaire }
              : prevLocation
          )
        );
      } catch (error) {
        console.error('Erreur lors de la mise à jour du commentaire :', error);
      }
    };
  
    const handleCancelEditCommentaire = () => {     // Fonction handleCancelEditCommentaire qui permet d'annuler la modification du commentaire d'une location
      setIsEditingCommentaire(false);
      setNewCommentaire(location.commentaire);
    };
  
    const handleAddNote = () => {         // Fonction handleAddNote qui permet d'ajouter une note à une location
      setIsEditingNote(true);
    };
  
    const handleAddCommentaire = () => {      // Fonction handleAddCommentaire qui permet d'ajouter un commentaire à une location
      setIsEditingCommentaire(true);
    };

    return (        // Retourne le rendu des détails d'une location
      <div>
        <fieldset>
          <p>ID Location : {location.id_location}</p>
          {jeu && jeu.nom_jeu ? (     // Si le jeu est trouvé dans la BDD
            <p>Jeu : {jeu.nom_jeu}</p>      // Retourne le nom du jeu
          ) : (
            <p>Informations sur le jeu non disponibles.</p>
          )}
          <p>Locataire : {user}</p>     
          <p>Date de location : {location.date_location}</p>
          <p>Date de retour : {location.date_retour}</p>
        {isEditingNote ? (
          <>
            <label>Nouvelle note :</label>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={handleSaveNote}>Enregistrer</button>
            <button onClick={handleCancelEditNote}>Annuler</button>
          </>
        ) : (
          <>
            <p>Note : {location.note}</p>
            <button onClick={handleAddNote}>Ajouter une note</button>
          </>
        )}
        {isEditingCommentaire ? (
          <>
            <label>Nouveau commentaire :</label>
            <input
              type="text"
              value={newCommentaire}
              onChange={(e) => setNewCommentaire(e.target.value)}
            />
            <button onClick={handleSaveCommentaire}>Enregistrer</button>
            <button onClick={handleCancelEditCommentaire}>Annuler</button>
          </>
        ) : (
          <>
            <p>Commentaire : {location.commentaire}</p>
            <button onClick={handleAddCommentaire}>Ajouter un commentaire</button>
          </>
        )}
      </fieldset>
    </div>
  );
};

  return (
    <div>
      <h2>Locations effectuées par l'utilisateur :</h2>
      {renderLocations()}
    </div>
  );
}
