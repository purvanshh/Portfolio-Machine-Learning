import React, { forwardRef } from 'react';

const contactLinks = [
    { label: 'Mail →', url: 'mailto:purvanshhsahu@gmail.com' },
    { label: 'GitHub →', url: 'https://github.com/purvanshh', external: true },
    { label: 'LinkedIn →', url: 'https://linkedin.com/in/purvansh-sahu-25b24228a', external: true },
    { label: 'Frontend Portfolio →', url: 'https://purvanshhsahu.vercel.app/', external: true },
];

const Contact = forwardRef((props, ref) => {
    return (
        <section className="section" id="contact" ref={ref}>
            <h2 className="section-heading">Contact</h2>
            <div className="section-content">
                {contactLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.url}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="contact-link"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </section>
    );
});

export default Contact;
