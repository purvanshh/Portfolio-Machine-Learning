import React from 'react';

const menuItems = [
    { label: 'Proficiencies', id: 'proficiencies' },
    { label: 'Education', id: 'education' },
    { label: 'Projects', id: 'projects' },
    { label: 'Frontend Explorations', id: 'frontend' },
    { label: 'Contact', id: 'contact' },
    { label: 'Back Home', id: 'top' },
];

function MenuOverlay({ isOpen, onClose }) {
    const handleMenuClick = (e, targetId) => {
        e.preventDefault();
        onClose();
        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={`menu-overlay ${isOpen ? 'menu-open' : ''}`}>
            <div className="menu-content">
                <div className="menu-left">
                    <span className="menu-label">Purvansh Sahu's Resume</span>
                </div>
                <div className="menu-right">
                    <nav className="menu-nav">
                        {menuItems.map((item, index) => (
                            <div key={item.id} className="menu-item-wrapper">
                                <a
                                    href={`#${item.id}`}
                                    className="menu-item"
                                    onClick={(e) => handleMenuClick(e, item.id)}
                                >
                                    {item.label}
                                </a>
                                {index < menuItems.length - 1 && <div className="menu-divider" />}
                            </div>
                        ))}
                    </nav>
                    <button
                        className="menu-button menu-button-active"
                        onClick={onClose}
                    >
                        ☰ Menu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MenuOverlay;
