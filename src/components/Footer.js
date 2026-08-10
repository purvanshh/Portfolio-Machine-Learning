import React from 'react';
import { smoothScrollToTop } from '../lib/smoothScroll';

function Footer() {
    const handleBackToTop = (e) => {
        e.preventDefault();
        smoothScrollToTop(700);
    };

    return (
        <footer className="footer">
            <p className="footer-text">© 2026 Purvansh Sahu · Built with love · Crafted with care</p>
            <div className="footer-links">
                <a href="#top" onClick={handleBackToTop}>↑ Back to top</a>
            </div>
        </footer>
    );
}

export default Footer;
