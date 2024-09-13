import React, { useState } from 'react';
import './HamburgerMenu.css';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-menu">
            <button className={`hamburger-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className={`bar bar1 ${isOpen ? 'change' : ''}`}></div>
                <div className={`bar bar2 ${isOpen ? 'change' : ''}`}></div>
                <div className={`bar bar3 ${isOpen ? 'change' : ''}`}></div>
            </button>
            <nav className={`menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    <Link
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/menus"
                        onClick={toggleMenu}
                    >
                        Menus
                    </Link>
                    <a
                        href="#footer"
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </a>
                </ul>
            </nav>
        </div>
    );
};

export default HamburgerMenu;
























