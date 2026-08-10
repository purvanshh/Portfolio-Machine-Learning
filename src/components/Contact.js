import React from 'react';

const contactLinks = [
    { label: 'Email', value: 'purvanshhsahu@gmail.com', url: 'mailto:purvanshhsahu@gmail.com' },
    { label: 'GitHub', value: '@purvanshh', url: 'https://github.com/purvanshh', external: true },
    { label: 'LinkedIn', value: 'Purvansh Sahu', url: 'https://linkedin.com/in/purvansh-sahu-25b24228a', external: true },
    { label: 'Frontend Portfolio', value: 'purvansh-sahu.vercel.app', url: 'https://purvansh-sahu.vercel.app/', external: true },
];

const Contact = () => {
    return (
        <section className="panel" id="contact">
            <h2 className="panel-heading">Contact</h2>
            <div className="panel-content">
                <p className="contact-intro">
                    Working on trustable ML systems and always open to interesting problems. Reach out anywhere.
                </p>
                <div className="contact-grid">
                    {contactLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            className="contact-card"
                        >
                            <div>
                                <div className="contact-card-label">{link.label}</div>
                                <div className="contact-card-value">{link.value}</div>
                            </div>
                            <span className="contact-card-arrow">↗</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
