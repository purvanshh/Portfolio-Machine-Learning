import React, { forwardRef } from 'react';

const Experience = forwardRef((props, ref) => {
    return (
        <section className="section" id="experience" ref={ref}>
            <h2 className="section-heading">Experience</h2>
            <div className="section-content">
                <div className="entry">
                    <div className="entry-header">
                        <span className="entry-title">Machine Learning Research Intern</span>
                        <span className="badge">Current</span>
                    </div>
                    <div className="entry-meta">
                        <span>Jan 2026 – Present</span>
                        <span>·</span>
                        <span>IIT Madras (with ICAR–NRCB)</span>
                    </div>
                    <div className="entry-description">
                        Working on applied machine learning for agricultural systems, focusing on crop health analysis using drone imagery and structured field data. Designed reproducible data pipelines, implemented robust evaluation workflows, and performed systematic error analysis to improve model generalization under real-world variability (seasonal shifts, illumination changes, heterogeneous crop conditions). Conducted data quality validation, cross-domain testing, and controlled ablation studies to identify failure modes and strengthen model reliability. Collaborated closely with ICAR researchers to align modeling outputs with practical agronomic constraints and field-level decision requirements.
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Experience;
