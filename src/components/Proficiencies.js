import React from 'react';

const proficiencyGroups = [
    {
        title: 'ML / Modeling',
        items: [
            'Supervised classification',
            'Token classification',
            'Sequence labeling',
            'Multimodal models (LayoutLMv3)',
            'Transformer architectures',
            'RAG pipelines',
            'LLM prompt engineering',
            'Ablation studies',
            'Precision / recall evaluation',
            'Confidence calibration',
        ],
    },
    {
        title: 'Systems / Backend',
        items: [
            'Async task pipelines (Celery + Redis)',
            'Transactional outbox',
            'Idempotent APIs',
            'Circuit breakers',
            'Multi-agent orchestration',
            'Confidence arbitration',
            'PostgreSQL',
            'SQLAlchemy',
            'Database-level constraints',
        ],
    },
    {
        title: 'Tools / Infra',
        items: [
            'Python',
            'PyTorch',
            'FastAPI',
            'Docker',
            'GitHub Actions CI/CD',
            'ChromaDB',
            'tree-sitter',
            'NetworkX',
            'Prometheus',
            'Structured logging',
        ],
    },
];

const Proficiencies = () => {
    return (
        <section className="panel" id="proficiencies">
            <h2 className="panel-heading">Proficiencies</h2>
            <div className="panel-content">
                <div className="proficiency-grid">
                    {proficiencyGroups.map((group) => (
                        <div key={group.title} className="content-card proficiency-card">
                            <div className="proficiency-title">{group.title}</div>
                            <div className="skill-tags">
                                {group.items.map((item, i) => (
                                    <span key={i} className="skill-tag">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Proficiencies;
