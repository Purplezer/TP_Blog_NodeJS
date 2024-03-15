import React from "react";
import "./body.css";
import { Routes, Route } from "react-router-dom";

import Acceuil from "../acceuil/acceuil.jsx";
import Inscription from "../inscription/inscription.jsx";
import Connexion from "../connexion/connexion.jsx";
import Jeux from "../jeux/jeux.jsx";
import Panier from "../panier/panier.jsx";
import Locations from "../locations/locations.jsx";

export default function Body() {
    return (
        <div className="body">
            <Routes>
                <Route path="/" element={<Acceuil />} />
                <Route path="/Inscription" element={<Inscription />} />
                <Route path="/Connexion" element={<Connexion />} />
                <Route path="/Jeux" element={<Jeux />} />
                <Route path="/Panier" element={<Panier />} />
                <Route path="/Locations" element={<Locations />} />
            </Routes>
        </div>
    )


}