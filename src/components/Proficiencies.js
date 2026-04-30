import React, { forwardRef } from 'react';

const Proficiencies = forwardRef((props, ref) => {
    return (
        <section className="section" id="proficiencies" ref={ref}>
            <h2 className="section-heading">Proficiencies</h2>
            <div className="section-content">
                <div className="proficiency-group">
                    <div className="proficiency-title">ML / Modeling</div>
                    <div className="proficiency-items">
                        <span>Supervised classification, token classification, sequence labeling</span>
                        <span>Multimodal models (LayoutLMv3), transformer architectures</span>
                        <span>RAG pipelines, LLM prompt engineering</span>
                        <span>Evaluation: ablation studies, precision/recall, confidence calibration</span>
                    </div>
                </div>
                <div className="proficiency-group">
                    <div className="proficiency-title">Systems / Backend</div>
                    <div className="proficiency-items">
                        <span>Async task pipelines (Celery + Redis)</span>
                        <span>Transactional outbox, idempotent APIs, circuit breakers</span>
                        <span>Multi-agent orchestration, confidence arbitration</span>
                        <span>PostgreSQL, SQLAlchemy, database-level constraints</span>
                    </div>
                </div>
                <div className="proficiency-group">
                    <div className="proficiency-title">Tools / Infra</div>
                    <div className="proficiency-items">
                        <span>Python, PyTorch, FastAPI</span>
                        <span>Docker, GitHub Actions CI/CD</span>
                        <span>ChromaDB, tree-sitter, NetworkX</span>
                        <span>Prometheus, structured logging</span>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Proficiencies;
