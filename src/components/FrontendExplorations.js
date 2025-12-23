import React, { forwardRef } from 'react';

const frontendProjects = [
    {
        icon: '🎨',
        name: 'Interactive Portfolio System',
        description: 'Experimental React portfolio with scroll-linked motion and editorial layout.',
    },
    {
        icon: '📱',
        name: 'FitTrack Pro',
        description: 'React Native fitness tracking app with step counter and health analytics.',
    },
];

const FrontendExplorations = forwardRef((props, ref) => {
    return (
        <section className="section" id="frontend" ref={ref}>
            <h2 className="section-heading">Frontend Explorations</h2>
            <div className="section-content">
                {frontendProjects.map((project) => (
                    <div key={project.name} className="project-card project-card-muted">
                        <div className="project-icon">{project.icon}</div>
                        <div className="project-info">
                            <div className="project-name">{project.name}</div>
                            <div className="project-description">{project.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default FrontendExplorations;
