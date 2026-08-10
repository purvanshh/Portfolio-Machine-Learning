import React from 'react';

const EngineeringThesis = () => {
    return (
        <section className="panel" id="thesis">
            <h2 className="panel-heading">Thesis</h2>
            <div className="panel-content">
                <div className="thesis-card">
                    I build ML systems where the hard problem isn't the model - it's making the output trustable.
                    Confidence calibration, deterministic post-processing, failure-mode-aware pipelines, and audit trails
                    that explain what actually happened. I work at the gap between "model works in a notebook" and
                    "system runs in production."
                </div>
            </div>
        </section>
    );
};

export default EngineeringThesis;
