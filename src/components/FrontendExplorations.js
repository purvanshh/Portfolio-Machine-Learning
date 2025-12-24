import React, { forwardRef } from 'react';

const frontendProjects = [
    {
        icon: '💪',
        name: 'FitTrack Pro',
        description: 'A comprehensive React Native fitness companion that tracks workouts, monitors daily meal intake, logs water consumption, and counts footsteps in real-time. Released as an APK on GitHub for seamless health management.',
        github: 'https://github.com/purvanshh/fittrack-pro',
    },
    {
        icon: '💰',
        name: 'PocketExpense+',
        description: 'An intelligent expense tracking mobile app featuring secure authentication, dynamic spending analytics with interactive graphs, and smart suggestions to help users optimize their financial habits.',
        github: 'https://github.com/purvanshh/PocketExpense-',
    },
    {
        icon: '🛒',
        name: 'FarmFresh',
        description: 'A sleek quick-commerce grocery application with seamless payment integration, intuitive UI/UX design, and comprehensive order history tracking for a delightful shopping experience.',
        github: 'https://github.com/purvanshh/Quick-E-Commerce',
    },
];

const FrontendExplorations = forwardRef((props, ref) => {
    return (
        <section className="section" id="frontend" ref={ref}>
            <h2 className="section-heading">Frontend Explorations</h2>
            <div className="section-content">
                {frontendProjects.map((project) => (
                    <a
                        key={project.name}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card project-card-muted project-card-link"
                    >
                        <div className="project-icon">{project.icon}</div>
                        <div className="project-info">
                            <div className="project-name">{project.name}</div>
                            <div className="project-description">{project.description}</div>
                        </div>
                        <div className="project-link-icon">↗</div>
                    </a>
                ))}
            </div>
        </section>
    );
});

export default FrontendExplorations;
