import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => (
    <nav className="navbar navbar-dark navbar-expand bg-dark">
        <NavLink className="navbar-brand" to="/">JEDI</NavLink>
        <div id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/people">People <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/planets">Planets</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/starships">Starships</NavLink>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navbar;
