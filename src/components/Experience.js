import React from 'react';

const Experience = () => {
    return (
        <section className="panel" id="experience">
            <h2 className="panel-heading">Experience</h2>
            <div className="panel-content">
                <div className="content-card">
                    <div className="entry-header">
                        <span className="entry-title">Machine Learning Research Intern</span>
                        <span className="badge">Current</span>
                    </div>
                    <div className="entry-meta">
                        <span>Jan 2026 – Present</span>
                        <span>·</span>
                        <span>IIT Madras (with ICAR–NRCB)</span>
                    </div>
                    <ul className="experience-bullets">
                        <li>
                            Built crop health classification pipeline for drone imagery across multiple ICAR field sites - designed to generalize under seasonal variation, illumination shifts, and heterogeneous crop conditions
                        </li>
                        <li>
                            Ran controlled ablation studies to isolate failure modes: measured individual impact of illumination normalization, augmentation strategies, and feature subsets on cross-site accuracy
                        </li>
                        <li>
                            Implemented automated data quality validation - flagging mislabeled samples, corrupt captures, and annotation drift before they entered the training loop
                        </li>
                        <li>
                            Separated in-distribution accuracy from cross-domain robustness in evaluation - different metrics for "does it work here" vs "will it transfer there"
                        </li>
                        <li>
                            Set model confidence thresholds with ICAR agronomists tied to field-level action boundaries - predictions below threshold route to manual inspection, not automated decisions
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Experience;
