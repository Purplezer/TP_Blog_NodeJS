import React from 'react';
import './header.css';

import Cart from './shopping-cart.png';


import { Link } from 'react-router-dom';



export default function Header() {
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <h1>Loca</h1> <p>Play</p>
            </div>
            <div className='menu'>
            <ul className='nav-menu'>
                <li><Link to="/" className='Link'>Acceuil</Link></li>
                <li><Link to="/Inscription" className='Link'>Inscription</Link></li>
                <li><Link to="/Connexion" className='Link'>Connexion</Link></li>
                <li><Link to="/Jeux" className='Link'>Jeux</Link></li>
                <li><Link to="/Locations" className='Link'>Mes Locations</Link></li>
                <div className='panier'>
                        <li><Link to="/Panier" className='Linkpanier'>
                            <img src={Cart} alt="panier" className='cart' />
                            <div className='panier-count'></div>
                        </Link></li>
                    </div>
            </ul>
            </div>
        </div>
    );
}