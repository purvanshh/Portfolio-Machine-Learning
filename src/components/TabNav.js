import React from 'react';
import { Home, FolderGit2, Layers, Wrench, Mail } from 'lucide-react';

const tabs = [
    { id: 'about', label: 'About', icon: <Home size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={16} /> },
    { id: 'system-design', label: 'System Design', icon: <Layers size={16} /> },
    { id: 'proficiencies', label: 'Proficiencies', icon: <Wrench size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
];

const TabNav = ({ activeTab, onSelect }) => {
    return (
        <nav className="tab-nav" aria-label="Primary navigation">
            <div className="tab-nav-inner">
                <button
                    className="tab-nav-brand"
                    onClick={() => onSelect('about')}
                    aria-label="Go to About"
                >
                    <span className="tab-nav-brand-mark">◆</span>
                    <span className="tab-nav-brand-name">Purvansh Sahu</span>
                </button>
                <div className="tab-nav-links">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => onSelect(tab.id)}
                            aria-current={activeTab === tab.id ? 'page' : undefined}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default TabNav;
