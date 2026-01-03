import React, { forwardRef } from 'react';
import { Plane, Video, Croissant, Stethoscope } from 'lucide-react';

const frontendProjects = [
    {
        icon: <Plane size={32} />,
        name: 'Travel Planner',
        description: 'A seamless travel planning interface designed to help users organize itineraries, discover destinations, and manage trip details with a modern, intuitive UI.',
        url: 'https://travel-planner-rho-three.vercel.app/',
        github: 'https://github.com/purvanshh/travel-planner',
    },
    {
        icon: <Video size={32} />,
        name: 'Content Creator',
        description: 'A personal portfolio hub for digital creators, featuring a sleek design to showcase videos, social media presence, and creative projects in one unified space.',
        url: 'https://content-creator-sage.vercel.app/',
        github: 'https://github.com/purvanshh/content-creator',
    },
    {
        icon: <Croissant size={32} />,
        name: 'Bakery Landing',
        description: 'An enticing landing page for an artisanal bakery, combining warm aesthetics with mouth-watering product showcases to drive customer engagement and orders.',
        url: 'https://bakery-landing-one.vercel.app/',
        github: 'https://github.com/purvanshh/bakery-landing',
    },
    {
        icon: <Stethoscope size={32} />,
        name: 'Dentist Landing',
        description: 'A professional, trustworthy web presence for a dental clinic, emphasizing service clarity, appointment booking, and patient comfort in a clean, sterile design.',
        url: 'https://dentist-landing-brch.vercel.app/',
        github: 'https://github.com/purvanshh/dentist-landing',
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
                        href={project.url}
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
