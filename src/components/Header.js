import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Movie List</Link></li>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
