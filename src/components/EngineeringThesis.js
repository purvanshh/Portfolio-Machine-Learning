import React, { forwardRef } from 'react';

const EngineeringThesis = forwardRef((props, ref) => {
    return (
        <section className="section" id="thesis" ref={ref}>
            <h2 className="section-heading">Thesis</h2>
            <div className="section-content">
                <div className="thesis-text">
                    I build ML systems where the hard problem isn't the model - it's making the output trustable.
                    Confidence calibration, deterministic post-processing, failure-mode-aware pipelines, and audit trails
                    that explain what actually happened. I work at the gap between "model works in a notebook" and
                    "system runs in production."
                </div>
            </div>
        </section>
    );
});

export default EngineeringThesis;
