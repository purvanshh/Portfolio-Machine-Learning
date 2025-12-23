import React, { forwardRef } from 'react';

const Proficiencies = forwardRef((props, ref) => {
    return (
        <section className="section" id="proficiencies" ref={ref}>
            <h2 className="section-heading">Proficiencies</h2>
            <div className="section-content">
                <div className="proficiency-group">
                    <div className="proficiency-title">Core Machine Learning</div>
                    <div className="proficiency-items">
                        <span>Supervised & Unsupervised Learning</span>
                        <span>NLP & Text Processing</span>
                        <span>Feature Engineering</span>
                        <span>Model Evaluation (ROC-AUC, Precision-Recall)</span>
                        <span>LLM Integration & Fine-tuning</span>
                    </div>
                </div>
                <div className="proficiency-group">
                    <div className="proficiency-title">ML Systems & Deployment</div>
                    <div className="proficiency-items">
                        <span>Python, Scikit-learn, Pandas</span>
                        <span>FastAPI, Streamlit</span>
                        <span>LangChain, LangGraph</span>
                        <span>AWS, Docker</span>
                        <span>SQL, Vector Databases</span>
                    </div>
                </div>
                <div className="proficiency-group proficiency-muted">
                    <div className="proficiency-title">Frontend & Product (Supporting)</div>
                    <div className="proficiency-items">
                        <span>React, TypeScript</span>
                        <span>UI for ML Dashboards</span>
                        <span>Framer Motion (visualization)</span>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Proficiencies;
