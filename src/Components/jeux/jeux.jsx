import React from 'react';      // import de React
import { useEffect, useState } from 'react';        // import de useEffect et useState depuis la bibliothèque React
import axios from 'axios';          // import de axios
import './jeux.css';            // import du css

export default function Article() {         // fonction Article qui retourne le rendu de la page des jeux
    const [jeux, setJeux] = useState([]);       // création d'un state jeux qui est un tableau vide
    const [search, setSearch] = useState("");       // création d'un state search qui est une chaine de caractère vide
    const [affichage, setAffichage] = useState(false);      // création d'un state affichage qui est un booléen

    const recup = async () => {         // fonction asynchrone recup qui récupère les données de la BDD
        await axios.get(`http://localhost:3001/Jeux`)       // requête GET pour récupérer les données de la BDD
        .then((res) => {        // si la requête est un succès
            console.log(res)
            setJeux(res.data)   
            setAffichage(true)
        })
    }
    useEffect(() => {       // fonction useEffect qui s'active à chaque fois que le composant est monté
        recup()
    }, [])

    const handleSearch = (e) => {       // fonction handleSearch qui permet de rechercher un jeu
        let value = e.target.value;
        setSearch(value);
    };

    console.log(search);        

    const handleAjoutPanier = (jeu) => {        // fonction handleAjoutPanier qui permet d'ajouter un jeu au panier
        // Récupérer le panier du localStorage
        const panier = JSON.parse(localStorage.getItem('panier')) || [];

        // Ajouter le jeu au panier
        panier.push(jeu);

        // Mettre à jour le localStorage avec le nouveau panier
        localStorage.setItem('panier', JSON.stringify(panier));
    };
    
return (        // retourne le rendu de la page des jeux
    <>
        <div className='search-bar'>
            <input 
                type='text' 
                name='search-bar' 
                id='search-bar' 
                placeholder='Rechercher un jeu'
                onChange={handleSearch}
            />
        </div>

        <div className='search-resultat'>
            {affichage ?
                jeux
                .filter((jeu) => {
                    return jeu.nom_jeu.toLowerCase().includes(search.toLowerCase());
                })
                .map(jeu => (
                    <div className='jeux'>
                        <fieldset>
                            <p>Nom : {jeu.nom_jeu}</p>
                            <img src={jeu.image} alt=''/>
                            <p>Prix : {jeu.prix} € / J <button onClick={() => handleAjoutPanier(jeu)}>AJOUTER</button> </p>
                        </fieldset>
                    </div>
                ))
                : (
                
                <p>Chargement...</p>
                )}
        </div>  
    </>
)
}