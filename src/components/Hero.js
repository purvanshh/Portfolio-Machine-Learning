import React from 'react';

function Hero() {
    return (
        <section className="hero" id="top">
            <p className="hero-eyebrow">Applied ML Systems · Trustable AI</p>
            <h1 className="hero-name">Purvansh Sahu</h1>
            <p className="hero-role">ML Research Intern @ IIT Madras · Applied AI Systems</p>
            <div className="hero-meta">
                <span>Bangalore, India</span>
                <span className="hero-meta-dot">·</span>
                <span>+91 91713 03506</span>
            </div>
            <p className="hero-bio">
                Engineer focused on production-grade ML systems — multi-agent orchestration, document
                intelligence, graph-aware retrieval, and auditable credit decision engines. I work at the
                gap between "model works in a notebook" and "system runs in production."
            </p>
        </section>
    );
}

export default Hero;
