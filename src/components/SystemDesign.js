import React, { forwardRef } from 'react';
import { Github } from 'lucide-react';

const systems = [
    {
        name: 'PRGuard AI',
        tagline: 'Multi-agent code review with confidence arbitration',
        github: 'https://github.com/purvanshh/PRGuard-AI',
        pipeline: [
            { label: 'PR Event', sub: 'GitHub webhook' },
            { label: 'Validation', sub: 'HMAC · replay · rate limit' },
            { label: 'Repo Processing', sub: 'clone · sandbox · index' },
            { label: 'Agent Analysis', sub: '3× parallel Celery tasks', highlight: true },
            { label: 'Arbitration', sub: 'confidence scoring' },
            { label: 'PR Review', sub: 'comment · inline · audit' },
        ],
        supportSystems: {
            security: ['HMAC-SHA256 verification', 'Replay protection (Redis, 5-min TTL)', 'Per-repo + per-installation rate limiting', 'Sandboxed repo clones'],
            reliability: ['Celery retry with exponential backoff', 'Dedicated queues per agent', 'max_retries=1, autoretry on Exception'],
            data: ['ChromaDB for repo convention indexing', 'tree-sitter AST parsing', 'SQLite audit log'],
            observability: ['Prometheus metrics (latency, confidence)', 'Structured logging', 'WebSocket live progress events'],
        },
        failurePath: {
            trigger: 'LLM provider timeout or failure',
            flow: ['Agent task fails', 'Celery retries with backoff', 'If still fails: agent returns empty findings', 'Remaining agents continue independently', 'Arbitrator scores with available data'],
            outcome: 'Review still posts — degraded but not lost. Audit log records the failure.',
        },
        decisionLogic: {
            title: 'How confidence is computed',
            steps: [
                { label: 'Per-finding weight', detail: 'rule_based: 0.9 · llm_reasoning: 0.6 · inferred: 0.3' },
                { label: 'Per-agent score', detail: 'refined = (base_confidence + avg_issue_weight) / 2, clamped [0, 1]' },
                { label: 'Aggregate score', detail: 'mean(agent_scores) + 0.1 boost if any HIGH severity' },
                { label: 'Disagreement flag', detail: 'If agent A reports HIGH but agent B doesn\'t → flagged in review' },
            ],
        },
        decisions: [
            { point: 'Why multi-agent?', tradeoff: '3× LLM cost, but enables cross-concern disagreement detection — a signal no single agent can produce.' },
            { point: 'Why hybrid scoring?', tradeoff: 'Rule-based findings get 0.9 weight, LLM gets 0.6. Prevents confidence inflation from speculative LLM output.' },
            { point: 'Why async Celery?', tradeoff: 'GitHub webhooks timeout at 10s. Agent analysis takes 15–30s. Not a preference — a hard constraint.' },
        ],
        metrics: [
            { value: '<30s', label: 'Review Time', detail: 'median per PR' },
            { value: '3×', label: 'Parallel Agents', detail: 'style · logic · security' },
            { value: '0.9', label: 'Rule Confidence', detail: 'deterministic match weight' },
            { value: 'P/R', label: 'Eval Framework', detail: 'precision/recall on labeled data' },
        ],
    },
    {
        name: 'ALICe',
        tagline: 'Auditable credit decision engine with ML scoring and fallback guardrails',
        github: 'https://github.com/purvanshh/AuditLend-Intelligence-Core--ALICe-',
        pipeline: [
            { label: 'Loan Request', sub: 'POST /apply-loan' },
            { label: 'Intake', sub: 'idempotency · encrypt · outbox' },
            { label: 'External Data', sub: '3 providers in parallel', highlight: true },
            { label: 'Decision Engine', sub: 'scoring · ML model · fallback' },
            { label: 'Decision', sub: 'approve · decline · review' },
            { label: 'Audit + Explain', sub: 'append-only trail' },
        ],
        supportSystems: {
            security: ['AES-256-GCM encrypted PII', 'Salted SHA-256 PAN hash', 'API key auth (scoped)', 'Sanitized audit snapshots'],
            reliability: ['Transactional outbox (atomic commit)', 'Circuit breaker with half-open probe lock', 'Retry/backoff per provider', 'External data fetch reuse on retry'],
            data: ['PostgreSQL (applications, outbox, audit)', 'Redis (idempotency, broker, circuit state)', 'Alembic migrations'],
            observability: ['Prometheus metrics (7 series)', 'Worker health endpoint (:8004)', 'Structured JSON logs'],
        },
        failurePath: {
            trigger: 'External service failure or ML uncertainty degradation',
            flow: ['Provider call fails or ML confidence falls below threshold', 'Retry with backoff → if still fails: apply conservative fallback', 'Data reliability/confidence fields are reduced', 'Calibrated confidence drops → fallback to RULE_SET_V1 / NEEDS_REVIEW', 'Low confidence routes to human manual review'],
            outcome: 'Application is never lost. Fallback values reduce confidence, not correctness. Audit trail records exactly what happened.',
        },
        decisionLogic: {
            title: 'How decisions are made',
            steps: [
                { label: 'Heuristic Risk', detail: 'Weighted formula across credit, income, EMI burden, loan-to-income ratio' },
                { label: 'ML Scoring (XGB_V1)', detail: 'Calibrated ML probability calibrated via Isotonic Regression, SHAP explains' },
                { label: 'Data Reliability & Confidence', detail: 'Reduces score confidence if provider data is degraded or model is uncertain' },
                { label: 'Decision Gate / Fallback', detail: 'GST mismatch blocks approval. Low confidence falls back to heuristics or manual review.' },
            ],
        },
        decisions: [
            { point: 'Why transactional outbox?', tradeoff: 'Network failure between API commit and Celery dispatch loses the task. Outbox commits task intent with the DB write — at-least-once guaranteed.' },
            { point: 'Why heuristic fallback?', tradeoff: 'Under high drift or degraded data, ML scores become unreliable. Falling back to governed heuristics guarantees business continuity.' },
            { point: 'Why audit-derived explanations?', tradeoff: 'Recomputing explanations could differ if code changed. Reading from the audit trail guarantees the explanation matches what actually happened.' },
        ],
        metrics: [
            { value: '187', label: 'Tests', detail: '0 skipped' },
            { value: '86%', label: 'Coverage', detail: '85% gate' },
            { value: 'XGB', label: 'Calibrated', detail: '0.975 AUC-ROC' },
            { value: '+$68M', label: 'Sim Profit', detail: 'ML vs Heuristic' },
        ],
    },
];

/* ── Sub-components ── */

const PipelineFlow = ({ steps }) => (
    <div className="sd-pipeline">
        {steps.map((step, i) => (
            <React.Fragment key={i}>
                {i > 0 && <div className="sd-pipe-arrow">→</div>}
                <div className={`sd-pipe-node ${step.highlight ? 'sd-pipe-node--highlight' : ''}`}>
                    <div className="sd-pipe-label">{step.label}</div>
                    <div className="sd-pipe-sub">{step.sub}</div>
                </div>
            </React.Fragment>
        ))}
    </div>
);

const SupportSystems = ({ systems: s }) => (
    <div className="sd-support">
        {Object.entries(s).map(([key, items]) => (
            <div key={key} className="sd-support-group">
                <div className={`sd-support-label sd-support-label--${key}`}>{key}</div>
                <div className="sd-support-items">
                    {items.map((item, i) => (
                        <span key={i} className="sd-support-tag">{item}</span>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const FailurePath = ({ data }) => (
    <div className="sd-failure-path">
        <div className="sd-failure-path-header">
            <span className="sd-failure-path-icon">!</span>
            <span className="sd-failure-path-trigger">{data.trigger}</span>
        </div>
        <div className="sd-failure-flow">
            {data.flow.map((step, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <span className="sd-failure-arrow">→</span>}
                    <span className="sd-failure-step">{step}</span>
                </React.Fragment>
            ))}
        </div>
        <div className="sd-failure-outcome">{data.outcome}</div>
    </div>
);

const DecisionLogic = ({ data }) => (
    <div className="sd-decision-logic">
        <div className="sd-decision-logic-title">{data.title}</div>
        <div className="sd-decision-steps">
            {data.steps.map((step, i) => (
                <div key={i} className="sd-decision-step">
                    <div className="sd-decision-step-num">{i + 1}</div>
                    <div>
                        <div className="sd-decision-step-label">{step.label}</div>
                        <div className="sd-decision-step-detail">{step.detail}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Decisions = ({ items }) => (
    <div className="sd-why">
        {items.map((d, i) => (
            <div key={i} className="sd-why-item">
                <div className="sd-why-point">{d.point}</div>
                <div className="sd-why-tradeoff">{d.tradeoff}</div>
            </div>
        ))}
    </div>
);

const ImpactStrip = ({ metrics }) => (
    <div className="sd-metrics-grid">
        {metrics.map((m, i) => (
            <div key={i} className="sd-metric">
                <div className="sd-metric-value">{m.value}</div>
                <div className="sd-metric-label">{m.label}</div>
                <div className="sd-metric-detail">{m.detail}</div>
            </div>
        ))}
    </div>
);

/* ── Main Card ── */
const SystemCard = ({ system }) => (
    <div className="sd-card">
        <div className="sd-card-header">
            <div>
                <div className="sd-card-name">{system.name}</div>
                <div className="sd-card-tagline">{system.tagline}</div>
            </div>
            <a href={system.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`GitHub repository for ${system.name} system design`}>
                <Github size={14} /> GitHub
            </a>
        </div>

        <div className="sd-card-body">
            {/* 1. Primary Pipeline */}
            <div className="sd-section">
                <div className="sd-section-label">Pipeline</div>
                <PipelineFlow steps={system.pipeline} />
            </div>

            {/* 2. Failure Path */}
            <div className="sd-section">
                <div className="sd-section-label sd-section-label--warn">Failure Path</div>
                <FailurePath data={system.failurePath} />
            </div>

            {/* 3. Decision Logic */}
            <div className="sd-section">
                <div className="sd-section-label">Decision Logic</div>
                <DecisionLogic data={system.decisionLogic} />
            </div>

            {/* 4. Support Systems */}
            <div className="sd-section">
                <div className="sd-section-label">Support Systems</div>
                <SupportSystems systems={system.supportSystems} />
            </div>

            {/* 5. Engineering Decisions */}
            <div className="sd-section">
                <div className="sd-section-label">Why This Design</div>
                <Decisions items={system.decisions} />
            </div>

            {/* 6. Impact */}
            <ImpactStrip metrics={system.metrics} />
        </div>
    </div>
);

const SystemDesign = forwardRef((props, ref) => (
    <section className="section" id="system-design" ref={ref}>
        <h2 className="section-heading">System Design</h2>
        <div className="section-content">
            {systems.map((s) => (
                <SystemCard key={s.name} system={s} />
            ))}
        </div>
    </section>
));

export default SystemDesign;
