import React, { forwardRef, useState } from 'react';
import { Github, X } from 'lucide-react';

const systems = [
    {
        name: 'SentinelOps AI',
        tagline: 'Uncertainty-aware incident reasoning with LangGraph orchestration',
        github: 'https://github.com/purvanshh/SentinalOps',
        hasCaseStudy: true,
        pipeline: [
            { label: 'Incident Webhook', sub: 'POST /incidents/webhook' },
            { label: 'Router & Dispatch', sub: 'resilient LLM classification' },
            { label: 'Evidence Collection', sub: 'parallel send log/metric agents', highlight: true },
            { label: 'Root Cause Engine', sub: 'algorithmic scoring' },
            { label: 'Risk Assessment', sub: 'topology Monte Carlo' },
            { label: 'Approval Gate', sub: 'scoped JWT interrupt' },
            { label: 'Guarded Action', sub: 'allowlist execution' },
        ],
        supportSystems: {
            security: ['JWT approval tokens', 'Tool execution allowlists', 'JWT signature verification', 'FastAPI route authentication'],
            reliability: ['4-layer LLM failover provider client', 'Redis-backed circuit breakers', 'Celery retry queues', 'Durable state persistence'],
            data: ['PostgreSQL (incidents, checks, configurations)', 'Redis (caches, locks, tasks)', 'Qdrant (runbooks, topology maps)'],
            observability: ['Prometheus metrics (ECE drift, confidence)', 'Loki correlated log trace', 'Tempo microservice trace links'],
        },
        failurePath: {
            trigger: 'Primary LLM API failure (429 rate limit, 500 error, or timeout)',
            flow: [
                'Primary remote client call fails',
                'Auto-failover to secondary remote LLM API',
                'If secondary fails: route query to local Ollama (gemma3/qwen2.5)',
                'If Ollama fails: activate zero-dependency rule classifier',
                'Workflow transitions to DEGRADED state and alerts operator'
            ],
            outcome: 'The reasoning pipeline never halts. Causal analyses proceed under safety/fallback operating modes, flagging outcomes for manual operator confirmation.',
        },
        decisionLogic: {
            title: 'How incident causation is resolved',
            steps: [
                { label: 'Evidence Normalization', detail: 'Service-specific metrics and log anomalies are parsed and mapped via dynamic z-scores.' },
                { label: 'Candidate Generation', detail: 'Hypotheses are directly generated from specific log alerts, metric bounds, and deployment logs.' },
                { label: 'Causal Scoring', detail: 'Counterfactual, temporal, and spatial alignments are scored using a temperature=1.0 softmax.' },
                { label: 'Uncertainty & Ambiguity Resolution', detail: 'Flags competing causes, temporal instability, or telemetry blackouts, scaling down confidence.' },
            ],
        },
        decisions: [
            { point: 'Why LangGraph StateGraph?', tradeoff: 'Increases syntax complexity compared to conversational chains, but guarantees deterministic orchestration, custom state checkpointing, and safe operator interrupts.' },
            { point: 'Why algorithmic root-cause scoring?', tradeoff: 'Decoupling hypothesis scoring from LLMs prevents LLM hallucinations in SRE decisions, relying on LLMs solely for translation/prose synthesis.' },
            { point: 'Why 4-layer provider chain?', tradeoff: 'Incurs infrastructure and local configuration complexity, but guarantees SRE pipeline survivability during public endpoint outages.' },
        ],
        metrics: [
            { value: '0.991', label: 'Router Accuracy', detail: 'Measures classification consistency' },
            { value: '100%', label: 'Safety Rejection', detail: 'Dangerous remediations blocked' },
            { value: '0.089', label: 'Calibration ECE', detail: 'Calibrated post-temperature tuning' },
            { value: '121', label: 'Incidents Replayed', detail: 'Deterministic benchmark evaluation' },
        ],
    },
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
const SystemCard = ({ system, onViewCaseStudy }) => (
    <div className="sd-card">
        <div className="sd-card-header">
            <div>
                <div className="sd-card-name">{system.name}</div>
                <div className="sd-card-tagline">{system.tagline}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <a href={system.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`GitHub repository for ${system.name} system design`}>
                    <Github size={14} /> GitHub
                </a>
                {system.hasCaseStudy && (
                    <button
                        onClick={onViewCaseStudy}
                        className="project-link"
                        style={{
                            background: 'rgba(231, 195, 138, 0.05)',
                            border: '1px solid rgba(231, 195, 138, 0.25)',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontWeight: 'inherit',
                        }}
                    >
                        Case Study
                    </button>
                )}
            </div>
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

/* ── Case Study Modal Sub-component ── */
const SentinelOpsCaseStudyModal = ({ onClose }) => {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="sd-modal-overlay" onClick={onClose}>
            <div className="sd-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="sd-modal-header">
                    <div>
                        <div className="sd-modal-title">SentinelOps AI</div>
                        <div className="sd-modal-subtitle">System Design Case Study</div>
                    </div>
                    <button className="sd-modal-close-btn" onClick={onClose}>
                        <X size={14} /> Close
                    </button>
                </div>
                <div className="sd-modal-body">
                    {/* 1. Overview */}
                    <div>
                        <div className="sd-modal-section-title">Overview</div>
                        <div className="sd-modal-text">
                            SentinelOps is an uncertainty-aware incident reasoning system designed to help Site Reliability Engineers (SREs), operations teams, and system administrators investigate and resolve operational incidents. Unlike typical conversational AI assistants, SentinelOps structures raw telemetry into auditable, counterfactual reasoning graphs, computing explicit confidence levels and executing remediations under safe, operator-in-the-loop gates.
                        </div>
                    </div>

                    {/* 2. System Architecture */}
                    <div>
                        <div className="sd-modal-section-title">System Architecture</div>
                        <div className="sd-modal-text" style={{ marginBottom: '16px' }}>
                            The system splits into a FastAPI control plane, an asynchronous background Celery worker pipeline backed by Redis and PostgreSQL, a Qdrant semantic search index for vector runbooks, and a state-based LangGraph orchestrator that executes parallel agent tasks:
                        </div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">FastAPI & Routing</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Exposes REST endpoints for webhooks, incident persistence, WebSocket streaming, and validation. Implements API-key scopes and JWT signatures for secure action approval.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">LangGraph Orchestration</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Constructs a StateGraph defining agent execution loops. Prevents SRE runaways using manual interrupt states and conditional approval edges.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Database & Memory Layer</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    PostgreSQL stores structured incidents, trace logs, and compliance audits. Qdrant indexes service graphs and runbooks. Redis handles task broker queues and caching.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Visuals - Architecture Diagram */}
                    <div>
                        <div className="sd-modal-section-title">System Architecture Diagram</div>
                        <div className="sd-diagram-container">
                            <svg viewBox="0 0 800 360" className="sd-diagram-svg">
                                <defs>
                                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7C38A" />
                                    </marker>
                                </defs>
                                <rect x="20" y="110" width="160" height="70" rx="8" fill="rgba(19, 22, 27, 0.8)" stroke="#E7C38A" strokeWidth="1.5" />
                                <text x="100" y="145" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">FastAPI API Control</text>
                                <text x="100" y="162" fill="#9CA3AF" fontSize="10" textAnchor="middle">HTTP/WS Control Plane</text>
                                
                                <rect x="240" y="110" width="160" height="70" rx="8" fill="rgba(19, 22, 27, 0.8)" stroke="#E7C38A" strokeWidth="1.5" strokeDasharray="3 3" />
                                <text x="320" y="145" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">Celery & Redis</text>
                                <text x="320" y="162" fill="#9CA3AF" fontSize="10" textAnchor="middle">Async Broker & Queue</text>

                                <rect x="460" y="110" width="160" height="70" rx="8" fill="rgba(19, 22, 27, 0.8)" stroke="#E7C38A" strokeWidth="2" />
                                <text x="540" y="145" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">LangGraph StateGraph</text>
                                <text x="540" y="162" fill="#9CA3AF" fontSize="10" textAnchor="middle">Orchestration & Interrupts</text>

                                <rect x="660" y="30" width="120" height="50" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                <text x="720" y="60" fill="#FFFFFF" fontSize="11" textAnchor="middle">PostgreSQL DB</text>
                                
                                <rect x="660" y="120" width="120" height="50" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                <text x="720" y="150" fill="#FFFFFF" fontSize="11" textAnchor="middle">Redis Cache</text>

                                <rect x="660" y="210" width="120" height="50" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                <text x="720" y="240" fill="#FFFFFF" fontSize="11" textAnchor="middle">Qdrant Vector DB</text>

                                <rect x="20" y="240" width="160" height="60" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                <text x="100" y="275" fill="#FFFFFF" fontSize="11" textAnchor="middle">Evidence Agents (Send)</text>

                                <rect x="240" y="240" width="160" height="60" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                <text x="320" y="275" fill="#FFFFFF" fontSize="11" textAnchor="middle">Causal Engine (RCA)</text>

                                <rect x="460" y="240" width="160" height="60" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                <text x="540" y="275" fill="#FFFFFF" fontSize="11" textAnchor="middle">Execution Guard Gate</text>

                                <line x1="180" y1="145" x2="240" y2="145" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />
                                <line x1="400" y1="145" x2="460" y2="145" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />
                                <path d="M 460 170 L 410 195 L 180 255" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" marker-end="url(#arrow)" />
                                <line x1="180" y1="270" x2="240" y2="270" stroke="rgba(255,255,255,0.2)" strokeWidth="1" marker-end="url(#arrow)" />
                                <path d="M 400 270 L 430 270 L 510 180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" marker-end="url(#arrow)" />
                                <line x1="540" y1="180" x2="540" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" marker-end="url(#arrow)" />
                                <path d="M 620 125 L 660 65" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" marker-end="url(#arrow)" />
                                <line x1="620" y1="145" x2="660" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" marker-end="url(#arrow)" />
                                <path d="M 620 165 L 660 225" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" marker-end="url(#arrow)" />
                            </svg>
                        </div>
                    </div>

                    {/* 4. Data Flow */}
                    <div>
                        <div className="sd-modal-section-title">Data Flow (Request Lifecycle)</div>
                        <div className="sd-modal-text" style={{ marginBottom: '16px' }}>
                            The lifecycle of a SentinelOps incident query traces a strict data path from initial alert ingestion to structured postmortem generation:
                        </div>
                        <ul className="sd-modal-list" style={{ marginBottom: '20px' }}>
                            <li><strong>Ingestion:</strong> A webhook alert (e.g. from PagerDuty/Prometheus) hits FastAPI's `/incidents/webhook`, which stores the incident details and triggers a background Celery task.</li>
                            <li><strong>State Initialization:</strong> The Celery worker loads the incident StateGraph context and initializes the thread state.</li>
                            <li><strong>Resilient Routing:</strong> The StateGraph invokes the Router Node to classify the incident. The router uses the 4-layer resilient LLM provider chain to determine the service type and symptoms.</li>
                            <li><strong>Parallel Evidence Collection:</strong> LangGraph's `Send` command concurrently triggers metrics, logs, and deployment agents to gather data from mocks or integrations.</li>
                            <li><strong>Causal Reasoning:</strong> Collected evidence is normalized, logged as temporal nodes in an event graph, and scored algorithmically by the causal scaffolding without relying directly on LLM output.</li>
                            <li><strong>Risk & Remediation Planning:</strong> The Risk Node runs a Monte Carlo blast radius traffic simulation, proposing risk-ranked action items.</li>
                            <li><strong>Operator Verification:</strong> If a high risk threshold is crossed, the graph triggers a manual interrupt. The operator must authorize actions using a JWT token.</li>
                            <li><strong>Remediation Execution:</strong> Remediation is executed by the Action node under safety guards and allowlist filters, producing a structured postmortem report.</li>
                        </ul>
                        <div className="sd-diagram-container">
                            <svg viewBox="0 0 800 130" className="sd-diagram-svg">
                                <defs>
                                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7C38A" />
                                    </marker>
                                </defs>
                                <rect x="5" y="35" width="95" height="50" rx="4" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <text x="52.5" y="60" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">1. Webhook</text>
                                <text x="52.5" y="74" fill="#9CA3AF" fontSize="8" textAnchor="middle">Ingest Incident</text>
                                
                                <line x1="100" y1="60" x2="125" y2="60" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />

                                <rect x="130" y="35" width="95" height="50" rx="4" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <text x="177.5" y="60" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">2. Celery Queue</text>
                                <text x="177.5" y="74" fill="#9CA3AF" fontSize="8" textAnchor="middle">Task Scheduling</text>
                                
                                <line x1="225" y1="60" x2="250" y2="60" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />

                                <rect x="255" y="35" width="95" height="50" rx="4" fill="rgba(19, 22, 27, 0.8)" stroke="#E7C38A" strokeWidth="1" />
                                <text x="302.5" y="60" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">3. StateGraph</text>
                                <text x="302.5" y="74" fill="#9CA3AF" fontSize="8" textAnchor="middle">Orchestrator</text>
                                
                                <line x1="350" y1="60" x2="375" y2="60" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />

                                <rect x="380" y="35" width="95" height="50" rx="4" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <text x="427.5" y="60" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">4. Collectors</text>
                                <text x="427.5" y="74" fill="#9CA3AF" fontSize="8" textAnchor="middle">Parallel Agents</text>
                                
                                <line x1="475" y1="60" x2="500" y2="60" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />

                                <rect x="505" y="35" width="95" height="50" rx="4" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <text x="552.5" y="60" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">5. Causal Engine</text>
                                <text x="552.5" y="74" fill="#9CA3AF" fontSize="8" textAnchor="middle">Temporal Scoring</text>
                                
                                <line x1="600" y1="60" x2="625" y2="60" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />

                                <rect x="630" y="35" width="165" height="50" rx="4" fill="rgba(19, 22, 27, 0.8)" stroke="#E7C38A" strokeWidth="1.2" />
                                <text x="712.5" y="55" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">6. Execution & Postmortem</text>
                                <text x="712.5" y="68" fill="#E7C38A" fontSize="7.5" textAnchor="middle" fontWeight="500">JWT Scoped Gate & Action Allowlist</text>
                                <text x="712.5" y="78" fill="#9CA3AF" fontSize="7.5" textAnchor="middle">Incident resolution recorded</text>
                            </svg>
                        </div>
                    </div>

                    {/* 5. AI Workflow */}
                    <div>
                        <div className="sd-modal-section-title">AI Workflow & Resilience Chain</div>
                        <div className="sd-modal-text" style={{ marginBottom: '16px' }}>
                            SRE incident logic must remain online during API timeouts. SentinelOps implements a multi-layer failover mechanism designed to guarantee SRE reasoning continuity:
                        </div>
                        <ul className="sd-modal-list" style={{ marginBottom: '20px' }}>
                            <li><strong>Layer 1 - Primary Endpoint:</strong> Attempts call to primary remote LLM (GPT-4o or Claude 3.5 Sonnet) at `temperature=0.0`.</li>
                            <li><strong>Layer 2 - Secondary Endpoint:</strong> Fails over to secondary remote LLM endpoint automatically on 429 rate limit or timeout errors.</li>
                            <li><strong>Layer 3 - Local Ollama:</strong> If remote APIs are unavailable, redirects calls to local Ollama endpoints running pinned `gemma3:1b` or `qwen2.5:7b` instances.</li>
                            <li><strong>Layer 4 - Deterministic Rule Classifier:</strong> In the event of total network or service failure, falls back to a zero-dependency rule-based static classifier to generate standard state mappings.</li>
                        </ul>
                        <div className="sd-diagram-container">
                            <svg viewBox="0 0 800 160" className="sd-diagram-svg">
                                <defs>
                                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7C38A" />
                                    </marker>
                                </defs>
                                <circle cx="40" cy="80" r="14" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                <text x="40" y="83" fill="#FFFFFF" fontSize="9" textAnchor="middle">Start</text>
                                
                                <line x1="54" y1="80" x2="85" y2="80" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />

                                <rect x="90" y="50" width="125" height="60" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="#E7C38A" strokeWidth="1.5" />
                                <text x="152.5" y="75" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">1. Primary LLM</text>
                                <text x="152.5" y="90" fill="#9CA3AF" fontSize="8" textAnchor="middle">GPT-4o/Claude-3.5</text>
                                
                                <line x1="215" y1="80" x2="255" y2="80" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />
                                <text x="235" y="74" fill="#E7C38A" fontSize="8" textAnchor="middle">Fail</text>

                                <rect x="260" y="50" width="125" height="60" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                <text x="322.5" y="75" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">2. Secondary LLM</text>
                                <text x="322.5" y="90" fill="#9CA3AF" fontSize="8" textAnchor="middle">Secondary API</text>

                                <line x1="385" y1="80" x2="425" y2="80" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />
                                <text x="405" y="74" fill="#E7C38A" fontSize="8" textAnchor="middle">Fail</text>

                                <rect x="430" y="50" width="125" height="60" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                <text x="492.5" y="75" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">3. Local Ollama</text>
                                <text x="492.5" y="90" fill="#9CA3AF" fontSize="8" textAnchor="middle">gemma3/qwen2.5</text>

                                <line x1="555" y1="80" x2="595" y2="80" stroke="#E7C38A" strokeWidth="1.2" marker-end="url(#arrow)" />
                                <text x="575" y="74" fill="#E7C38A" fontSize="8" textAnchor="middle">Fail</text>

                                <rect x="600" y="50" width="180" height="60" rx="6" fill="rgba(19, 22, 27, 0.8)" stroke="#E7C38A" strokeWidth="1.5" />
                                <text x="690" y="72" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">4. Rule Classifier</text>
                                <text x="690" y="85" fill="#E7C38A" fontSize="8" textAnchor="middle" fontWeight="500">Deterministic Fallback</text>
                                <text x="690" y="98" fill="#9CA3AF" fontSize="8" textAnchor="middle">Zero-dependency module</text>
                            </svg>
                        </div>
                    </div>

                    {/* 6. Component Breakdown */}
                    <div>
                        <div className="sd-modal-section-title">Component Breakdown</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">FastAPI Control Plane</div>
                                <div className="sd-modal-list" style={{ fontSize: '12px' }}>
                                    <li><strong>Responsibility:</strong> Ingestion, status queries, WebSockets tracing, and action approval endpoints.</li>
                                    <li><strong>Inputs:</strong> HTTP webhook payloads, JWT auth tokens.</li>
                                    <li><strong>Outputs:</strong> Structured JSON logs, token validations, state summaries.</li>
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">LangGraph StateGraph</div>
                                <div className="sd-modal-list" style={{ fontSize: '12px' }}>
                                    <li><strong>Responsibility:</strong> Incident routing, parallel agent thread forks, and approval-interrupt gateways.</li>
                                    <li><strong>Inputs:</strong> Initial incident state, context dictionaries, manual approval callbacks.</li>
                                    <li><strong>Outputs:</strong> Final postmortems, action execution signals, interrupt states.</li>
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Telemetry Ingest & Integrity</div>
                                <div className="sd-modal-list" style={{ fontSize: '12px' }}>
                                    <li><strong>Responsibility:</strong> Scans incoming metrics/logs for corrupt signatures and calculates completeness z-scores.</li>
                                    <li><strong>Inputs:</strong> Raw stdout buffers, JSON metric structures.</li>
                                    <li><strong>Outputs:</strong> Normalized incident events, confidence penalties.</li>
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Causal Reasoning Engine</div>
                                <div className="sd-modal-list" style={{ fontSize: '12px' }}>
                                    <li><strong>Responsibility:</strong> Calculates hypothesis probability based on counterfactual and temporal dependencies.</li>
                                    <li><strong>Inputs:</strong> Timed event models, service topology schemas.</li>
                                    <li><strong>Outputs:</strong> Rank-ordered candidate causes, causal graph structures.</li>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Scalability & Reliability */}
                    <div>
                        <div className="sd-modal-section-title">Scalability & Reliability Design</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Scale-Out Task Queues</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    API routers are completely stateless and scale horizontally behind standard reverse proxies. Back-end workflows run inside distributed Celery worker instances, grouped into independent processing queues (e.g. triage, evaluation, recovery) to prevent long-running tasks from stalling critical alerts.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Graceful Degradation</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Integrates circuit-breaker locks via Redis cache. If external providers demonstrate network drift or timeouts, endpoints are flagged as unhealthy. The system transitions incident operations to DEGRADED or SAFE_MODE automatically, executing only static heuristics.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 8. Security Model */}
                    <div>
                        <div className="sd-modal-section-title">Security Architecture</div>
                        <div className="sd-modal-text" style={{ marginBottom: '12px' }}>
                            Operating an automated tool execution system requires defense-in-depth safety controls to protect cloud workloads:
                        </div>
                        <ul className="sd-modal-list">
                            <li><strong>Tool Execution Allowlist:</strong> Only tools explicitly listed in `configs/production/tool_allowlist.yaml` can be invoked by the worker, preventing arbitrary code executions.</li>
                            <li><strong>Scoped Token Authorization:</strong> Destructive remediations (rollbacks, scaling, restarts) require validation via JWT tokens signed with a local cryptographic secret, scoped to the specific incident ID and timestamp window.</li>
                            <li><strong>PII Encryption & Redaction:</strong> Environment configurations and client metadata are scrubbed and sanitized before log serialization, protecting infrastructure secrets.</li>
                        </ul>
                    </div>

                    {/* 9. Limitations & Roadmap */}
                    <div className="sd-modal-grid">
                        <div className="sd-modal-grid-card">
                            <div className="sd-modal-grid-card-title" style={{ color: 'var(--accent-text)' }}>Current Known Limitations</div>
                            <ul className="sd-modal-list" style={{ fontSize: '12.5px' }}>
                                <li><strong>Simulation-Only Datasets:</strong> Performance diagnostics and evaluation precision metrics are derived from mock telemetry databases rather than live traffic logs.</li>
                                <li><strong>Uncalibrated Heuristics:</strong> Graph confidence scoring curves are based on heuristic weights rather than empirical calibration curves against production failures.</li>
                                <li><strong>Volatile Checkpointing:</strong> The default orchestrator utilizes MemorySaver, losing running thread contexts during server restarts due to lack of durable postgres checkpoint adapters.</li>
                            </ul>
                        </div>
                        <div className="sd-modal-grid-card">
                            <div className="sd-modal-grid-card-title" style={{ color: 'var(--accent-text)' }}>Planned Improvements</div>
                            <ul className="sd-modal-list" style={{ fontSize: '12.5px' }}>
                                <li><strong>Learned Probabilistic Causality:</strong> Transitioning candidate generator templates to statistically grounded learned causality frameworks.</li>
                                <li><strong>Live Infrastructure Grounding:</strong> Replacing client mocks with production-ready telemetry queries to live Prometheus, Loki, and GitHub environments.</li>
                                <li><strong>Durable Postgres Checkpointing:</strong> Incorporating `langgraph-checkpoint-postgres` to support persistent cross-process state management.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 10. Technology Matrix */}
                    <div>
                        <div className="sd-modal-section-title">Technologies & Tools</div>
                        <table className="sd-modal-tech-table">
                            <tbody>
                                <tr>
                                    <td className="sd-modal-tech-label">Backend Control</td>
                                    <td>Python · FastAPI · Celery · Redis · Uvicorn</td>
                                </tr>
                                <tr>
                                    <td className="sd-modal-tech-label">Orchestration & AI</td>
                                    <td>LangGraph StateGraph · OpenAI / Anthropic API · Ollama · Pydantic</td>
                                </tr>
                                <tr>
                                    <td className="sd-modal-tech-label">Databases & Storage</td>
                                    <td>PostgreSQL · Redis Cache · Qdrant Vector Store · SQLAlchemy · Alembic</td>
                                </tr>
                                <tr>
                                    <td className="sd-modal-tech-label">Observability & Logs</td>
                                    <td>Prometheus metrics · Loki Log Correlation · Tempo trace mapping · Grafana dashboards</td>
                                </tr>
                                <tr>
                                    <td className="sd-modal-tech-label">Frontend & UI</td>
                                    <td>Next.js · React · TailwindCSS · WebSockets</td>
                                </tr>
                                <tr>
                                    <td className="sd-modal-tech-label">DevOps & Infra</td>
                                    <td>Docker · Docker Compose · GitHub Actions CI/CD · Ruff linter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Main SystemDesign Component ── */
const SystemDesign = forwardRef((props, ref) => {
    const [selectedSystem, setSelectedSystem] = useState(null);

    return (
        <section className="section" id="system-design" ref={ref}>
            <h2 className="section-heading">System Design</h2>
            <div className="section-content">
                {systems.map((s) => (
                    <SystemCard
                        key={s.name}
                        system={s}
                        onViewCaseStudy={() => setSelectedSystem(s.name)}
                    />
                ))}
            </div>

            {selectedSystem === 'SentinelOps AI' && (
                <SentinelOpsCaseStudyModal onClose={() => setSelectedSystem(null)} />
            )}
        </section>
    );
});

export default SystemDesign;
