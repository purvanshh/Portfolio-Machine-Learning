import React from 'react';

function Header({ onMenuOpen }) {
    return (
        <header className="header">
            <div className="header-left">
                <span>◆ Purvansh Sahu</span>
            </div>
            <div className="header-right">
                <button className="menu-trigger" onClick={onMenuOpen}>
                    ☰ Menu
                </button>
            </div>
        </header>
    );
}

export default Header;
