import React, { forwardRef } from 'react';
import { Bot, Brain, FileCheck, Truck, Languages, Leaf } from 'lucide-react';

const projects = [
    {
        icon: <Bot size={32} />,
        name: 'AI-Assisted Sales Outreach Platform',
        description: 'End-to-end ML system combining NLP-driven content generation with lead prioritization and API-based model inference.',
        url: 'https://github.com/purvanshh/AI-Assisted-Sales-Outreach-Platform',
    },
    {
        icon: <Brain size={32} />,
        name: 'Transformer From Scratch',
        description: 'Implemented a transformer architecture from first principles to deeply understand attention, embeddings, and training dynamics.',
        url: 'https://github.com/purvanshh/Transformer-from-scratch',
    },
    {
        icon: <FileCheck size={32} />,
        name: 'Auto-Reviewer',
        description: 'AI-powered automated review system using NLP to analyze, summarize, and evaluate textual submissions with structured feedback.',
        url: 'https://github.com/purvanshh/Auto-Reviewer',
    },
    {
        icon: <Truck size={32} />,
        name: 'Delivery Operations Intelligence',
        description: 'Data-driven ML system for analyzing and optimizing delivery operations using predictive modeling and operational metrics.',
        url: 'https://github.com/purvanshh/Delivery-Operations-Inteligence',
    },
    {
        icon: <Languages size={32} />,
        name: 'Language Tutor (LangFlow)',
        description: 'Agentic language-learning assistant built using LangFlow, enabling structured conversation flows and adaptive responses.',
        url: 'https://github.com/purvanshh/langflow-language-tutor',
    },
    {
        icon: <Leaf size={32} />,
        name: 'Plant Disease Classification',
        description: 'Computer vision–based classification system for detecting plant diseases from leaf images using supervised deep learning.',
        url: 'https://github.com/purvanshh/Plant-Disease-Classification',
    },
];

const Projects = forwardRef((props, ref) => {
    return (
        <section className="section" id="projects" ref={ref}>
            <h2 className="section-heading">Projects</h2>
            <div className="section-content">
                {projects.map((project) => (
                    <a
                        key={project.name}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card"
                    >
                        <div className="project-icon">{project.icon}</div>
                        <div className="project-info">
                            <div className="project-name">{project.name}</div>
                            <div className="project-description">{project.description}</div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
});

export default Projects;
