import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><h2>Movie List</h2></li>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
