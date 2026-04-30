import React, { forwardRef } from 'react';

const Education = forwardRef((props, ref) => {
    return (
        <section className="section" id="education" ref={ref}>
            <h2 className="section-heading">Education</h2>
            <div className="section-content">
                <div className="entry">
                    <div className="entry-header">
                        <span className="entry-title">B.Sc. Computer Science - BITS Pilani</span>
                        <span className="badge">Current</span>
                    </div>
                    <div className="entry-meta">
                        <span>2023–2027</span>
                        <span>·</span>
                        <span>via Scaler School of Technology</span>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Education;
