import React from 'react';

function Footer() {
    const handleBackToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <p className="footer-text">© 2025 Purvansh Sahu · Built in React · Deployed on Vercel</p>
            <div className="footer-links">
                <a href="#top" onClick={handleBackToTop}>↑ Back to top</a>
            </div>
        </footer>
    );
}

export default Footer;
