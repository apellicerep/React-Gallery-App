import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ searchApi }) => {

    return (

        <nav className="main-nav">
            <ul>
                <li><NavLink to="/car">Car</NavLink></li>
                <li><NavLink to="/sunset">Sunset</NavLink></li>
                <li><NavLink to="/bike">bike</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav