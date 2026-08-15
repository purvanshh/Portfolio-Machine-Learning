import React, { useState } from 'react';
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
        hasCaseStudy: true,
        pipeline: [
            { label: 'PR Event', sub: 'GitHub webhook' },
            { label: 'Validation', sub: 'HMAC · replay · rate limit' },
            { label: 'Repo Processing', sub: 'clone · sandbox · index' },
            { label: 'Agent Analysis', sub: '3× parallel Celery tasks', highlight: true },
            { label: 'Refinement Loop', sub: 'rounds 1–3 + coordinator' },
            { label: 'Arbitration', sub: 'confidence scoring' },
            { label: 'PR Review', sub: 'comment · inline · audit' },
        ],
        supportSystems: {
            security: ['HMAC-SHA256 verification', 'Replay protection (Redis, 5-min TTL)', 'Per-repo + per-installation rate limiting', 'Sandboxed repo clones', 'Payload size limit (5 MB)'],
            reliability: ['Celery retry with exponential backoff', 'Dedicated queues per agent', 'Circuit breaker on LLM calls', 'Token budgeting via Redis', 'autoretry_for=(Exception,), max_retries=1'],
            data: ['ChromaDB for repo convention indexing', 'tree-sitter AST parsing', 'PostgreSQL audit logging', 'Alembic migrations'],
            observability: ['Prometheus metrics (latency, confidence)', 'Structured JSON logging', 'OpenTelemetry trace propagation', 'WebSocket live progress events'],
        },
        failurePath: {
            trigger: 'LLM response truncated mid-JSON — batch review silently kills all workers',
            flow: ['security agent calls json.loads() on truncated LLM response', 'JSONDecodeError propagates uncaught from worker thread', 'ThreadPoolExecutor context manager kills remaining workers on exit', 'No output, no errors, no results file written', 'TokenBudget.used returns 0 — token counter never wired to agents'],
            outcome: 'Fix: wrapped json.loads in try/except, incremental per-PR checkpoints, --resume flag. Agents still produce reviews — token tracking remains a cosmetic gap.',
        },
        decisionLogic: {
            title: 'How confidence is computed',
            steps: [
                { label: 'Per-finding weight', detail: 'rule_based: 0.9 · llm_reasoning: 0.6 · inferred: 0.3' },
                { label: 'Per-agent score', detail: 'refined = (base_confidence + avg_issue_weight) / 2, clamped [0, 1]' },
                { label: 'Aggregate score', detail: 'mean(agent_scores) + 0.1 boost if any HIGH severity (capped at 1.0)' },
                { label: 'Disagreement flag', detail: 'If agent A reports HIGH but agent B doesn\'t → flagged in review summary' },
            ],
        },
        decisions: [
            { point: 'Why multi-agent?', tradeoff: '3× LLM cost, but enables cross-concern disagreement detection — a signal no single agent can produce.' },
            { point: 'Why hybrid scoring?', tradeoff: 'Rule-based findings get 0.9 weight, LLM gets 0.6. Prevents confidence inflation from speculative LLM output.' },
            { point: 'Why async Celery?', tradeoff: 'GitHub webhooks timeout at 10s. Agent analysis takes 15–30s. Not a preference — a hard constraint.' },
            { point: 'Why refinement loop?', tradeoff: 'Adds latency but reduces false positives; agents can revise findings after reviewing other agents\' output across 3 rounds.' },
        ],
        metrics: [
            { value: '0.92', label: 'Real-World F1', detail: '50 CVE-fix PRs (cpython/node)' },
            { value: '0.82', label: 'Synthetic F1', detail: '200 fixture PRs (CI gate)' },
            { value: '288', label: 'Test Suite', detail: '77% coverage' },
            { value: '<30s', label: 'Median Review', detail: 'per PR, async pipeline' },
        ],
    },
    {
        name: 'DRISE',
        tagline: 'Layout-aware document intelligence with deterministic structured extraction',
        github: 'https://github.com/purvanshh/DRISE-experiments',
        hasCaseStudy: true,
        pipeline: [
            { label: 'Upload', sub: 'PDF / image intake' },
            { label: 'Validation', sub: 'extension · MIME · magic bytes' },
            { label: 'OCR + Layout', sub: 'PaddleOCR + bbox extraction', highlight: true },
            { label: 'LayoutLMv3', sub: 'token classification' },
            { label: 'Recovery', sub: 'category-aware grouping' },
            { label: 'Constraints', sub: 'normalize · validate · reconcile' },
            { label: 'JSON Output', sub: 'typed schema + confidence' },
        ],
        supportSystems: {
            security: ['Extension + MIME + magic-byte validation', 'Malformed PDF rejection', 'Path traversal prevention', 'Typed request validation via Pydantic'],
            reliability: ['Deterministic post-processing pipeline', 'Batch-safe cleanup routines', 'Constraint-based repair path', 'Explicit schema contracts between stages'],
            data: ['PaddleOCR token stream', 'LayoutLMv3 fine-tuned checkpoint', 'Structured JSON outputs', 'Benchmark datasets: CORD · FUNSD · 201 annotated docs'],
            observability: ['Per-field confidence traces', 'Ablation framework', 'Benchmark runner with McNemar tests', 'Latency + cost comparison tables'],
        },
        failurePath: {
            trigger: 'OCR artifacts or layout ambiguity cause invalid totals, fragmented fields, or malformed extraction spans',
            flow: [
                'OCR emits noisy tokens or bounding boxes',
                'LayoutLMv3 predicts fragmented KEY/VALUE spans',
                'Category-aware grouping attempts entity reconstruction',
                'Normalization repairs dates, currencies, and OCR artifacts',
                'Constraint engine checks line-item sums, totals, and required fields before emission'
            ],
            outcome: 'The system fails safe into deterministic validation and repair rather than hallucinating missing values. Outputs remain schema-valid and auditable even when raw OCR quality degrades.',
        },
        decisionLogic: {
            title: 'How document structure becomes trusted JSON',
            steps: [
                { label: 'Validated Intake', detail: 'Only supported files proceed past extension, MIME, magic-byte, and size checks before rasterization.' },
                { label: 'Spatial Extraction', detail: 'PaddleOCR returns tokens, bounding boxes, and confidences; LayoutLMv3 jointly reasons over text, geometry, and page pixels.' },
                { label: 'Entity Reconstruction', detail: 'BIO predictions are grouped into semantic entities with category propagation to preserve multi-token keys, totals, and line items.' },
                { label: 'Deterministic Trust Layer', detail: 'Normalization, regex validation, and cross-field constraints enforce schema validity and numeric consistency before final JSON is returned.' },
            ],
        },
        decisions: [
            { point: 'Why LayoutLMv3 instead of OCR-only?', tradeoff: 'OCR-only pipelines read text but not structure. Bounding-box and visual context are necessary to distinguish labels, values, and tables across vendor layout drift.' },
            { point: 'Why deterministic post-processing after the model?', tradeoff: 'The model improves recall, but enterprise ingestion needs guarantees. Deterministic normalization and constraints remove hallucination risk and make repeated runs identical.' },
            { point: 'Why benchmark against LLM and RAG baselines?', tradeoff: 'Raw accuracy claims mean little without a reference point. Side-by-side evaluation on 201 annotated documents makes the cost, latency, and trust tradeoffs visible.' },
        ],
        metrics: [
            { value: '0.8704', label: 'Val F1', detail: 'fine-tuned LayoutLMv3 run' },
            { value: '100%', label: 'Schema Validity', detail: 'validated JSON outputs' },
            { value: '$0.000049', label: 'Cost / Doc', detail: 'self-hosted extraction path' },
            { value: '349ms', label: 'CPU Latency', detail: 'average per document' },
        ],
    },
    {
        name: 'AuditLend Intelligence Core (ALICe)',
        tagline: 'Calibrated XGBoost credit scorer · SHAP explainability · immutable audit trail · full ML lifecycle',
        github: 'https://github.com/purvanshh/AuditLend-Intelligence-Core--ALICe-',
        hasCaseStudy: true,
        pipeline: [
            { label: 'Loan Request', sub: 'POST /apply-loan · idempotency key' },
            { label: 'Intake', sub: 'encrypt PII · transactional outbox' },
            { label: 'External Data', sub: 'bureau · bank · GST in parallel', highlight: true },
            { label: 'ML Engine', sub: 'XGB_V1 + isotonic calibration + SHAP' },
            { label: 'Decision Gate', sub: 'approve · decline · review · fallback' },
            { label: 'Audit + Explain', sub: 'append-only trail · SHAP · LLM narrative' },
        ],
        supportSystems: {
            security: ['AES-256-GCM encrypted PII', 'Salted SHA-256 PAN hash', 'OAuth2/OIDC + API key auth', 'HashiCorp Vault PII key mgmt', 'HSTS · CSP · X-Frame-Options'],
            reliability: ['Transactional outbox (atomic commit)', 'Circuit breaker with half-open probe lock', 'Retry/backoff per provider', 'ONNX export + LRU+TTL prediction cache', 'Graceful degradation to RULE_SET_V1'],
            data: ['PostgreSQL (applications, outbox, audit)', 'Redis (idempotency, broker, circuit state)', 'ChromaDB (policy RAG)', 'MLflow model registry (optional)', 'Alembic migrations'],
            observability: ['Prometheus metrics (7 series)', 'KS-test drift detection + Evidently dashboards', 'Grafana drift monitoring', 'Structured JSON logs', 'Immutable append-only audit trail'],
        },
        failurePath: {
            trigger: 'External service failure or ML confidence/drift degradation',
            flow: ['Provider call fails or times out', 'Retry with backoff → conservative fallback data applied', 'Data reliability fields reduced; calibrated confidence drops', 'ML confidence below threshold → fallback to RULE_SET_V1 heuristic scorecard', 'Unresolvable uncertainty → NEEDS_REVIEW routed to manual human review'],
            outcome: 'Application is never lost (transactional outbox). Fallback values reduce confidence, not correctness. Audit trail records exactly which path was taken.',
        },
        decisionLogic: {
            title: 'How credit decisions are made',
            steps: [
                { label: 'Heuristic Scoring (RULE_SET_V1)', detail: 'Weighted formula: credit score, income, EMI burden, loan-to-income ratio' },
                { label: 'ML Scoring (XGB_V1)', detail: 'XGBoost → Isotonic Regression calibration → P(default); ECE = 0.0036' },
                { label: 'SHAP Explainability', detail: 'Top-8 feature contributions per prediction; optional LLM narrative via litellm' },
                { label: 'Data Reliability Gate', detail: 'GST mismatch blocks. Low provider data quality reduces confidence. Drift triggers fallback.' },
            ],
        },
        decisions: [
            { point: 'Why transactional outbox?', tradeoff: 'Network failure between API commit and Celery dispatch silently loses tasks. Outbox commits task intent atomically with the DB write — at-least-once processing guaranteed.' },
            { point: 'Why isotonic calibration?', tradeoff: 'Raw XGBoost probabilities are poorly calibrated (ECE 0.016). Isotonic regression on the validation set reduced ECE to 0.0036 — making probability thresholds directly actionable for risk pricing.' },
            { point: 'Why heuristic fallback?', tradeoff: 'Under high drift or degraded provider data, ML scores become unreliable. Deterministic RULE_SET_V1 guarantees business continuity and a defensible audit trail even without ML.' },
            { point: 'Why audit-derived explanations?', tradeoff: 'Recomputing SHAP after the fact could differ if the model or code changed. Storing explanations in the audit trail guarantees the explanation matches what actually executed.' },
        ],
        metrics: [
            { value: '0.976', label: 'AUC-ROC', detail: 'calibrated, 49K held-out loans' },
            { value: '0.0036', label: 'ECE', detail: '78% calibration improvement' },
            { value: '+$68.3M', label: 'Sim Profit', detail: 'ML vs heuristic baseline' },
            { value: '437+', label: 'Tests', detail: '0 skipped · full ML pipeline' },
        ],
    },
    {
        name: 'PayShield',
        tagline: 'Multi-layer UPI fraud scoring · GNN graph intelligence · 14-agent orchestration · production-ready ops',
        github: 'https://github.com/purvanshh/PayShield',
        hasCaseStudy: true,
        pipeline: [
            { label: 'Transaction', sub: 'POST /v1/score · API key auth' },
            { label: 'L1: Statistical', sub: 'velocity · geo · Benford (12 rules)' },
            { label: 'Decision Gate', sub: 'BLOCK → WS alert · ESCALATE', highlight: true },
            { label: 'L2: GNN', sub: 'PyTorch Geometric · hetero graph' },
            { label: 'Fusion Engine', sub: 'weighted fusion + isotonic calib' },
            { label: 'L3: LLM (async)', sub: 'Ollama · Celery · investigation report' },
        ],
        supportSystems: {
            security: ['API key + JWT bearer auth (RBAC)', 'PCI-DSS 10 controls', 'OFAC/UN sanctions screening', 'AML velocity + structuring check', 'KYC tier verification', 'Security headers middleware'],
            reliability: ['Redis circuit breaker + fallback cache', 'Celery async task queue (investigation)', 'NetworkX fallback graph DB (Neo4j offline)', 'Graceful degradation on Ollama unavailability', 'Kubernetes HPA + PDBs + network policies'],
            data: ['PostgreSQL (users, audit, investigations, API keys)', 'Neo4j (fraud entity graph: users, merchants, devices)', 'Redis (cache, rate limit, Celery broker, feature store)', 'Vite + React TypeScript dashboard'],
            observability: ['Prometheus metrics + Grafana dashboards', 'Structlog structured logging', 'Population Stability Index drift detection', 'SLO definitions + error budget tracking', '5 chaos experiments (api, neo4j, ollama, pg, redis)'],
        },
        failurePath: {
            trigger: 'Neo4j graph DB latency spike blocking synchronous L2 GNN feature extraction',
            flow: ['L2 GNN feature engine calls Neo4j for entity graph features', 'Query latency exceeds scoring SLA threshold', 'Redis feature store checked for cached entity features', 'If cache miss: structural heuristic features computed in-process', 'Scoring proceeds with degraded graph features; L1 statistical score still authoritative'],
            outcome: 'L1+L2 scoring stays under 50ms p50. L3 LLM investigation runs async via Celery regardless — graph DB recovery is transparent to the scoring path.',
        },
        decisionLogic: {
            title: 'How fraud scores are computed',
            steps: [
                { label: 'L1 Statistical Filter', detail: '12 configurable YAML rules: velocity (6), geo-velocity (4), Benford\'s Law (2)' },
                { label: 'L2 GNN Inference', detail: 'Heterogeneous graph: User/Merchant/Device/Transaction nodes; edge features + message passing' },
                { label: 'Ensemble Fusion', detail: 'Weighted L1 + L2 combination → Isotonic calibration → calibrated P(fraud)' },
                { label: 'Decision Gate', detail: 'ALLOW / BLOCK / REVIEW threshold; BLOCK broadcasts WebSocket alert + queues LLM investigation' },
            ],
        },
        decisions: [
            { point: 'Why a heterogeneous GNN?', tradeoff: 'Per-transaction rules miss ring fraud (shared devices across accounts, velocity rings, merchant collusion). A graph over User/Merchant/Device/Transaction nodes captures cross-entity signals invisible to flat feature vectors.' },
            { point: 'Why async L3 LLM investigation?', tradeoff: 'Ollama inference takes 2–10s — blocking the scoring path would violate the <100ms SLA. Celery decouples investigation from decision, so BLOCK is immediate while the report is generated in the background.' },
            { point: 'Why 14 agents?', tradeoff: 'Monolithic scoring cannot self-correct. The reflection agent clusters false positives nightly and auto-tunes thresholds; the critic agent evaluates decision quality; human-review and mitigation agents handle edge cases — each concern is isolated and independently replaceable.' },
            { point: 'Why PCI-DSS + RBI + EU AI Act in one stack?', tradeoff: 'UPI payments touch Indian (RBI) data residency rules, international card network (PCI-DSS) controls, and EU AI Act transparency requirements simultaneously. Building compliance in rather than bolting it on eliminates gaps at audit time.' },
        ],
        metrics: [
            { value: '<50ms', label: 'p50 Latency', detail: 'L1+L2 scoring path' },
            { value: '14', label: 'Agents', detail: 'reflection · critic · mitigation' },
            { value: '3-layer', label: 'Compliance', detail: 'PCI-DSS · RBI · EU AI Act' },
            { value: 'GNN+L1', label: 'Fusion Score', detail: 'isotonic calibrated P(fraud)' },
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
const SystemCard = ({ system, onViewCaseStudy }) => {
    const [expanded, setExpanded] = useState(false);

    return (
    <div className={`sd-card ${expanded ? 'expanded' : ''}`}>
        <div className="sd-card-header">
            <div>
                <div className="sd-card-name">{system.name}</div>
                <div className="sd-card-tagline">{system.tagline}</div>
            </div>
            <div className="sd-card-actions">
                <a href={system.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`GitHub repository for ${system.name} system design`}>
                    <Github size={14} /> GitHub
                </a>
                {system.hasCaseStudy && (
                    <button
                        onClick={onViewCaseStudy}
                        className="project-link sd-case-btn"
                    >
                        Case Study
                    </button>
                )}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="project-link sd-expand-btn"
                    aria-expanded={expanded}
                >
                    {expanded ? 'Hide Details' : 'Details'}
                </button>
            </div>
        </div>

        <div className="sd-card-body">
            {/* 1. Primary Pipeline */}
            <div className="sd-section">
                <div className="sd-section-label">Pipeline</div>
                <PipelineFlow steps={system.pipeline} />
            </div>

            {/* 6. Impact (always visible) */}
            <ImpactStrip metrics={system.metrics} />

            {expanded && (
                <div className="sd-details">
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
                </div>
            )}
        </div>
    </div>
    );
};

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

/* ── DRISE Case Study Modal ── */
const DRISECaseStudyModal = ({ onClose }) => {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="sd-modal-overlay" onClick={onClose}>
            <div className="sd-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="sd-modal-header">
                    <div>
                        <div className="sd-modal-title">DRISE</div>
                        <div className="sd-modal-subtitle">System Design Case Study</div>
                    </div>
                    <button className="sd-modal-close-btn" onClick={onClose}>
                        <X size={14} /> Close
                    </button>
                </div>
                <div className="sd-modal-body">
                    <div>
                        <div className="sd-modal-section-title">Overview</div>
                        <div className="sd-modal-text">
                            DRISE is a document intelligence system built to turn messy PDFs, receipts, invoices, and scanned forms into validated structured JSON without the usual tradeoff between extraction quality and operational trust. It combines a fine-tuned LayoutLMv3 model with a deterministic post-processing and constraint layer, delivering layout-aware extraction, 100% schema-valid outputs, and materially lower per-document cost than LLM-only pipelines.
                        </div>
                    </div>

                    <div>
                        <div className="sd-modal-section-title">System Architecture</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Secure Ingestion Layer</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    FastAPI receives file uploads, validates extension, MIME type, magic bytes, and file size, then rasterizes PDFs into page images. This keeps malformed or adversarial files out of the OCR and model path before compute is spent.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">OCR + Layout Model</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    PaddleOCR extracts tokens, confidences, and bounding boxes. A CORD + FUNSD fine-tuned LayoutLMv3 checkpoint then performs token classification over text, geometry, and page pixels to separate keys, values, and background tokens.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Deterministic Trust Layer</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Category-aware grouping, locale-aware recovery, normalization, regex validation, and cross-field constraints convert noisy token predictions into typed JSON with per-field confidence and reconciliation flags.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="sd-modal-section-title">Architecture Diagram</div>
                        <div className="sd-diagram-container">
                            <svg viewBox="0 0 800 300" className="sd-diagram-svg">
                                <defs>
                                    <marker id="arrowD" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7C38A" />
                                    </marker>
                                </defs>
                                <rect x="20" y="35" width="120" height="55" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="80" y="58" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">Upload API</text>
                                <text x="80" y="73" fill="#9CA3AF" fontSize="8" textAnchor="middle">PDF / image intake</text>
                                <rect x="170" y="35" width="145" height="55" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="242.5" y="58" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">Validation Gate</text>
                                <text x="242.5" y="73" fill="#9CA3AF" fontSize="8" textAnchor="middle">ext · MIME · magic bytes</text>
                                <rect x="345" y="35" width="135" height="55" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="412.5" y="58" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">Rasterize + OCR</text>
                                <text x="412.5" y="73" fill="#9CA3AF" fontSize="8" textAnchor="middle">pages · tokens · bboxes</text>
                                <rect x="510" y="35" width="135" height="55" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="577.5" y="58" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">LayoutLMv3</text>
                                <text x="577.5" y="73" fill="#9CA3AF" fontSize="8" textAnchor="middle">BIO token classes</text>
                                <rect x="675" y="35" width="105" height="55" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="727.5" y="58" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">JSON Output</text>
                                <text x="727.5" y="73" fill="#9CA3AF" fontSize="8" textAnchor="middle">typed + trusted</text>

                                <rect x="200" y="165" width="400" height="70" rx="8" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="400" y="192" fill="#E7C38A" fontSize="11" fontWeight="bold" textAnchor="middle">Deterministic Post-Processing Layer</text>
                                <text x="400" y="210" fill="#fff" fontSize="9" textAnchor="middle">category grouping · locale-aware recovery · normalization · validation · constraints</text>
                                <text x="400" y="225" fill="#9CA3AF" fontSize="8" textAnchor="middle">same input -> same output, with schema checks before emission</text>

                                <rect x="20" y="245" width="150" height="35" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="95" y="266" fill="#fff" fontSize="9" textAnchor="middle">Benchmark Runner</text>
                                <rect x="620" y="245" width="160" height="35" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="700" y="266" fill="#fff" fontSize="9" textAnchor="middle">LLM / RAG Baselines</text>

                                <line x1="140" y1="62" x2="170" y2="62" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowD)"/>
                                <line x1="315" y1="62" x2="345" y2="62" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowD)"/>
                                <line x1="480" y1="62" x2="510" y2="62" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowD)"/>
                                <line x1="645" y1="62" x2="675" y2="62" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowD)"/>
                                <path d="M 577 90 L 577 135 L 520 165" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowD)"/>
                                <path d="M 400 165 L 400 120 L 690 120 L 690 90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowD)"/>
                                <path d="M 170 262 L 250 235" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" markerEnd="url(#arrowD)"/>
                                <path d="M 620 262 L 550 235" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" markerEnd="url(#arrowD)"/>
                            </svg>
                        </div>
                    </div>

                    <div>
                        <div className="sd-modal-section-title">Data Flow (Extraction Lifecycle)</div>
                        <ul className="sd-modal-list">
                            <li><strong>Ingestion:</strong> `/parse-document` or `/parse-batch` validates file type, checks magic bytes, and rejects malformed uploads before any OCR or model inference begins.</li>
                            <li><strong>Page Preparation:</strong> PDFs are rasterized page-wise and normalized deterministically so OCR inputs are stable across repeated runs.</li>
                            <li><strong>Spatial Understanding:</strong> PaddleOCR extracts text plus geometry, and LayoutLMv3 predicts BIO labels with semantic categories for keys, values, and supporting spans.</li>
                            <li><strong>Recovery:</strong> Grouping logic reconstructs multi-token entities, repairs OCR artifacts, and recovers locale-sensitive totals and line items missed by the raw model pass.</li>
                            <li><strong>Trust Gate:</strong> Validation and constraint checks enforce typing, required fields, and invariants such as line-item sums approximately matching total amount before final JSON is emitted.</li>
                        </ul>
                    </div>

                    <div>
                        <div className="sd-modal-section-title">Benchmarking & Case Study</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why this architecture won</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    The key insight was that extraction quality alone was not enough. DRISE pairs model intelligence with deterministic enforcement, so it can beat OCR-only pipelines on structure while staying cheaper and more auditable than LLM-driven extraction.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Evidence</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Fine-tuning pushed the model from a 0.625 masked micro-F1 starting point to 0.8704 validation F1 and 0.8576 token-level F1 on CORD. The benchmark suite compares DRISE, LLM-only, and RAG+LLM pipelines across 201 annotated documents with McNemar significance testing and ablations.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Operational outcome</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    The production-facing API returns typed JSON with per-field confidence, 100% schema validity, and roughly $0.000049 per-document cost, making it viable for high-volume finance and enterprise ingestion workflows.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="sd-modal-section-title">Technologies & Tools</div>
                        <table className="sd-modal-tech-table">
                            <tbody>
                                <tr><td className="sd-modal-tech-label">API & Contracts</td><td>Python 3.11 · FastAPI · Pydantic · Uvicorn</td></tr>
                                <tr><td className="sd-modal-tech-label">OCR & Vision</td><td>PaddleOCR · PDF rasterization · image normalization</td></tr>
                                <tr><td className="sd-modal-tech-label">Modeling</td><td>PyTorch · LayoutLMv3 · token classification · CORD + FUNSD fine-tune</td></tr>
                                <tr><td className="sd-modal-tech-label">Trust Layer</td><td>Deterministic grouping · locale-aware recovery · regex validation · constraint engine</td></tr>
                                <tr><td className="sd-modal-tech-label">Evaluation</td><td>Ablation studies · McNemar exact test · cost/latency benchmarks · baseline runner</td></tr>
                                <tr><td className="sd-modal-tech-label">Deployment</td><td>Docker · batch ingestion · background cleanup</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── ALICe Case Study Modal ── */
const ALICeCaseStudyModal = ({ onClose }) => {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);
    return (
        <div className="sd-modal-overlay" onClick={onClose}>
            <div className="sd-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="sd-modal-header">
                    <div>
                        <div className="sd-modal-title">AuditLend Intelligence Core (ALICe)</div>
                        <div className="sd-modal-subtitle">System Design Case Study</div>
                    </div>
                    <button className="sd-modal-close-btn" onClick={onClose}>
                        <X size={14} /> Close
                    </button>
                </div>
                <div className="sd-modal-body">
                    <div>
                        <div className="sd-modal-section-title">Overview</div>
                        <div className="sd-modal-text">
                            ALICe is an audit-grade credit decision engine trained on 1.3M Lending Club loans (2007–2018). A calibrated XGBoost model with isotonic regression achieves 0.976 AUC-ROC and 0.0036 ECE, reducing default rates from 15.1% (heuristic) to 2.3% (ML) while simultaneously increasing approvals — delivering a $68.3M simulated profit delta on 49,230 held-out loans. Every decision includes SHAP explainability, an immutable audit trail, and graceful degradation to a deterministic heuristic scorecard when ML confidence degrades.
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">System Architecture</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">FastAPI + Celery Worker</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    POST /apply-loan commits the application and task intent atomically to PostgreSQL via transactional outbox. Celery worker claims tasks with atomic UPDATE queries, fetches bureau/bank/GST data in parallel, then runs the scoring engine.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">ML Scoring Engine</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    XGB_V1 (max_depth=6, lr=0.05, 200 estimators) trained on 38 engineered features. Isotonic regression calibration on the 2017 validation set. ONNX export for optimized inference. LRU+TTL prediction cache in Redis. SHAP values computed per prediction with optional LLM narrative via litellm.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">ML Lifecycle & Governance</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    MLflow experiment tracking, file-backed model registry, KS-test + Evidently drift detection, A/B experimentation framework, causal inference via propensity score matching, uplift modeling, survival analysis (Kaplan-Meier + CoxPH), and portfolio risk aggregation with CLI tooling.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">System Architecture Diagram</div>
                        <div className="sd-diagram-container">
                            <svg viewBox="0 0 800 340" className="sd-diagram-svg">
                                <defs>
                                    <marker id="arrowA" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7C38A" />
                                    </marker>
                                </defs>
                                <rect x="20" y="20" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="90" y="47" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">FastAPI</text>
                                <text x="90" y="62" fill="#9CA3AF" fontSize="9" textAnchor="middle">POST /apply-loan</text>
                                <rect x="200" y="20" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5" strokeDasharray="4 3"/>
                                <text x="270" y="47" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Transactional Outbox</text>
                                <text x="270" y="62" fill="#9CA3AF" fontSize="9" textAnchor="middle">PostgreSQL atomic commit</text>
                                <rect x="380" y="20" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="450" y="47" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Celery Worker</text>
                                <text x="450" y="62" fill="#9CA3AF" fontSize="9" textAnchor="middle">claim · fetch · score</text>
                                <rect x="560" y="20" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="2"/>
                                <text x="630" y="47" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">XGB_V1 + Calibration</text>
                                <text x="630" y="62" fill="#9CA3AF" fontSize="9" textAnchor="middle">Isotonic · SHAP · ONNX</text>
                                <rect x="20" y="140" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="90" y="165" fill="#fff" fontSize="11" textAnchor="middle">PostgreSQL</text>
                                <text x="90" y="180" fill="#9CA3AF" fontSize="9" textAnchor="middle">apps · audit · outbox</text>
                                <rect x="200" y="140" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="270" y="165" fill="#fff" fontSize="11" textAnchor="middle">Redis</text>
                                <text x="270" y="180" fill="#9CA3AF" fontSize="9" textAnchor="middle">cache · broker · circuit</text>
                                <rect x="380" y="140" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="450" y="165" fill="#fff" fontSize="11" textAnchor="middle">Mock Providers</text>
                                <text x="450" y="180" fill="#9CA3AF" fontSize="9" textAnchor="middle">bureau · bank · GST</text>
                                <rect x="560" y="140" width="140" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="630" y="165" fill="#fff" fontSize="11" textAnchor="middle">MLflow + Registry</text>
                                <text x="630" y="180" fill="#9CA3AF" fontSize="9" textAnchor="middle">tracking · drift · A/B</text>
                                <rect x="200" y="260" width="340" height="55" rx="8" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="370" y="285" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Decision Gate + Audit Trail</text>
                                <text x="370" y="300" fill="#9CA3AF" fontSize="9" textAnchor="middle">approve · decline · review · immutable append-only log</text>
                                <line x1="160" y1="47" x2="200" y2="47" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowA)"/>
                                <line x1="340" y1="47" x2="380" y2="47" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowA)"/>
                                <line x1="520" y1="47" x2="560" y2="47" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowA)"/>
                                <line x1="450" y1="75" x2="450" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowA)"/>
                                <line x1="630" y1="75" x2="630" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowA)"/>
                                <path d="M 450 195 L 370 260" fill="none" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowA)"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">Data Flow (Request Lifecycle)</div>
                        <ul className="sd-modal-list">
                            <li><strong>Intake:</strong> POST /apply-loan validates the idempotency key against Redis, encrypts PII with AES-256-GCM, and writes the application + outbox task intent atomically to PostgreSQL.</li>
                            <li><strong>Worker Dispatch:</strong> Celery worker polls the outbox, claims the task with an atomic UPDATE, and fetches bureau, bank, and GST data in parallel with retry/backoff.</li>
                            <li><strong>Scoring:</strong> XGB_V1 scores the 38-feature vector. Isotonic calibration maps raw scores to calibrated P(default). SHAP values identify top-8 feature contributions.</li>
                            <li><strong>Decision Gate:</strong> GST mismatch hard-blocks. Low provider data quality reduces confidence. If calibrated confidence falls below threshold, system falls back to RULE_SET_V1 heuristic scorecard.</li>
                            <li><strong>Audit:</strong> Decision, SHAP snapshot, confidence metadata, and data reliability flags are written append-only to the audit log. PostgreSQL triggers block any subsequent UPDATE/DELETE.</li>
                        </ul>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">ML Performance</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Calibration</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Raw XGBoost ECE: 0.0162. After isotonic regression on 2017 validation set: 0.0036 — a 78% reduction. Brier score improved from 0.0266 to 0.0253. AUC-ROC held at 0.9757 post-calibration.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Business Impact</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Heuristic baseline: 85.14% approval, 15.06% default rate, −$9.4M simulated profit. ML model: 85.75% approval, 2.35% default rate, +$58.9M. Delta: +$68.3M profit, −12.7pp default rate, +0.6pp approvals.</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">Engineering Decisions</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why transactional outbox?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>A crash between the API commit and Celery dispatch silently loses the task. The outbox commits task intent atomically with the application row — the worker only processes tasks that are durably persisted, guaranteeing at-least-once delivery.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why isotonic calibration?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Raw XGBoost probabilities are systematically miscalibrated at the tails. Isotonic regression fit on the held-out 2017 validation set reduces ECE by 78%, making the output a true probability of default usable for risk pricing and threshold logic.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why audit-derived explanations?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Recomputing SHAP post-hoc could yield different values if the model or feature pipeline changed. Persisting SHAP values in the audit trail at decision time guarantees the explanation exactly matches what executed — a regulatory requirement, not just a nice-to-have.</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">Technologies & Tools</div>
                        <table className="sd-modal-tech-table">
                            <tbody>
                                <tr><td className="sd-modal-tech-label">API & Worker</td><td>Python · FastAPI · Celery · Redis · Uvicorn</td></tr>
                                <tr><td className="sd-modal-tech-label">ML & Calibration</td><td>XGBoost · Isotonic Regression · SHAP · scikit-learn · ONNX · onnxruntime</td></tr>
                                <tr><td className="sd-modal-tech-label">ML Lifecycle</td><td>MLflow · Evidently · KS-test drift · A/B framework · Uplift XGB · survival models</td></tr>
                                <tr><td className="sd-modal-tech-label">Databases</td><td>PostgreSQL · Redis · ChromaDB (policy RAG) · SQLAlchemy · Alembic</td></tr>
                                <tr><td className="sd-modal-tech-label">Security</td><td>AES-256-GCM · OAuth2/OIDC · HashiCorp Vault · Rate limiting · Security headers</td></tr>
                                <tr><td className="sd-modal-tech-label">Observability</td><td>Prometheus · Grafana · Structured JSON logs · Immutable audit trail</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── PayShield Case Study Modal ── */
const PayShieldCaseStudyModal = ({ onClose }) => {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);
    return (
        <div className="sd-modal-overlay" onClick={onClose}>
            <div className="sd-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="sd-modal-header">
                    <div>
                        <div className="sd-modal-title">PayShield</div>
                        <div className="sd-modal-subtitle">System Design Case Study</div>
                    </div>
                    <button className="sd-modal-close-btn" onClick={onClose}>
                        <X size={14} /> Close
                    </button>
                </div>
                <div className="sd-modal-body">
                    <div>
                        <div className="sd-modal-section-title">Overview</div>
                        <div className="sd-modal-text">
                            PayShield is a real-time UPI fraud detection engine combining a 3-layer scoring architecture with a 14-agent orchestration framework. L1 statistical rules (velocity, geo-velocity, Benford's Law) gate 12 configurable checks in under 5ms. L2 PyTorch Geometric GNN scores the heterogeneous fraud graph (Users, Merchants, Devices, Transactions). L3 Ollama LLM investigation runs asynchronously via Celery — keeping p50 scoring latency under 50ms while generating full evidence narratives in the background.
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">System Architecture</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">3-Layer Scoring Pipeline</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    L1 statistical filter applies 12 YAML-configurable rules (6 velocity, 4 geo, 2 Benford). Passing transactions go to L2 GNN inference over the Neo4j fraud graph. Fusion engine combines both scores with isotonic calibration into a final P(fraud). BLOCK triggers a WebSocket alert immediately.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Heterogeneous GNN</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    PyTorch Geometric models four node types (User, Merchant, Device, Transaction) with typed edges. Captures ring fraud patterns — shared device fingerprints, velocity rings, merchant collusion — that are invisible to per-transaction rule systems. GNNExplainer + SHAP bridge produces evidence subgraphs per decision.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">14-Agent Framework</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Reflection agent clusters FPs nightly and auto-tunes thresholds. Critic agent evaluates decision quality. Human-review agent ingests analyst feedback. Mitigation agent executes automated responses. Collective agent coordinates swarm. Validation, planner, profile, transaction, memory, and monitoring agents handle the full lifecycle.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">Architecture Diagram</div>
                        <div className="sd-diagram-container">
                            <svg viewBox="0 0 800 320" className="sd-diagram-svg">
                                <defs>
                                    <marker id="arrowP" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7C38A" />
                                    </marker>
                                </defs>
                                <rect x="20" y="30" width="120" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="80" y="54" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">POST /v1/score</text>
                                <text x="80" y="68" fill="#9CA3AF" fontSize="8" textAnchor="middle">API Key + RBAC</text>
                                <rect x="175" y="30" width="130" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="240" y="54" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">L1: Statistical</text>
                                <text x="240" y="68" fill="#9CA3AF" fontSize="8" textAnchor="middle">velocity · geo · Benford</text>
                                <rect x="340" y="30" width="120" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="400" y="50" fill="#E7C38A" fontSize="10" fontWeight="bold" textAnchor="middle">Decision Gate</text>
                                <text x="400" y="64" fill="#9CA3AF" fontSize="8" textAnchor="middle">BLOCK / ESCALATE</text>
                                <text x="400" y="75" fill="#9CA3AF" fontSize="7" textAnchor="middle">WS alert on BLOCK</text>
                                <rect x="495" y="30" width="130" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="560" y="54" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">L2: GNN</text>
                                <text x="560" y="68" fill="#9CA3AF" fontSize="8" textAnchor="middle">PyTorch Geometric</text>
                                <rect x="660" y="30" width="120" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="720" y="54" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">Fusion + Calib</text>
                                <text x="720" y="68" fill="#9CA3AF" fontSize="8" textAnchor="middle">isotonic P(fraud)</text>
                                <rect x="340" y="150" width="320" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="500" y="173" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">L3: Ollama LLM Investigation (async)</text>
                                <text x="500" y="187" fill="#9CA3AF" fontSize="8" textAnchor="middle">llama3.1:8b · Celery · evidence · SHAP · graph context</text>
                                <rect x="20" y="150" width="280" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="160" y="173" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">14-Agent Framework</text>
                                <text x="160" y="187" fill="#9CA3AF" fontSize="8" textAnchor="middle">reflection · critic · human-review · mitigation</text>
                                <rect x="20" y="265" width="200" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="120" y="286" fill="#fff" fontSize="10" textAnchor="middle">Neo4j Fraud Graph</text>
                                <text x="120" y="300" fill="#9CA3AF" fontSize="8" textAnchor="middle">User · Merchant · Device · Txn</text>
                                <rect x="250" y="265" width="160" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="330" y="286" fill="#fff" fontSize="10" textAnchor="middle">PostgreSQL</text>
                                <text x="330" y="300" fill="#9CA3AF" fontSize="8" textAnchor="middle">audit · investigations</text>
                                <rect x="440" y="265" width="160" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="520" y="286" fill="#fff" fontSize="10" textAnchor="middle">Redis</text>
                                <text x="520" y="300" fill="#9CA3AF" fontSize="8" textAnchor="middle">cache · broker · feature store</text>
                                <rect x="630" y="265" width="150" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                <text x="705" y="286" fill="#fff" fontSize="10" textAnchor="middle">Compliance Stack</text>
                                <text x="705" y="300" fill="#9CA3AF" fontSize="8" textAnchor="middle">PCI-DSS · RBI · EU AI Act</text>
                                <line x1="140" y1="55" x2="175" y2="55" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowP)"/>
                                <line x1="305" y1="55" x2="340" y2="55" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowP)"/>
                                <line x1="460" y1="55" x2="495" y2="55" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowP)"/>
                                <line x1="625" y1="55" x2="660" y2="55" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowP)"/>
                                <path d="M 720 80 L 500 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowP)"/>
                                <line x1="160" y1="200" x2="160" y2="265" stroke="rgba(255,255,255,0.15)" strokeWidth="1" markerEnd="url(#arrowP)"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">Data Flow (Scoring Lifecycle)</div>
                        <ul className="sd-modal-list">
                            <li><strong>Intake:</strong> POST /v1/score validates the API key, enforces rate limits, and passes the transaction to the statistical filter.</li>
                            <li><strong>L1 Filter:</strong> 12 YAML-configurable rules run synchronously. A BLOCK here triggers a WebSocket alert immediately and queues an LLM investigation via Celery — response returns in under 5ms.</li>
                            <li><strong>L2 GNN:</strong> Passing transactions are enriched with entity features from the Redis feature store (or Neo4j for non-cached entities) and scored by the heterogeneous GNN.</li>
                            <li><strong>Fusion:</strong> Weighted L1 + L2 scores are combined and passed through isotonic calibration to produce a final P(fraud). Decision gate applies environment-specific thresholds (dev/prod YAML).</li>
                            <li><strong>Async Investigation:</strong> BLOCK and REVIEW decisions queue an Ollama LLM investigation task. The Celery worker collects evidence (L1 triggers, L2 features, SHAP values, graph context) and generates a structured investigation report stored in PostgreSQL.</li>
                            <li><strong>Feedback Loop:</strong> Analyst feedback via the human-review agent feeds the reflection agent's nightly FP clustering. Statistically significant threshold adjustments are promoted via the A/B experimentation framework.</li>
                        </ul>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">Engineering Decisions</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why a heterogeneous GNN?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Per-transaction rules miss ring fraud: shared device fingerprints across accounts, velocity rings, and merchant collusion patterns require reasoning across multiple entity types simultaneously. A graph over User/Merchant/Device/Transaction nodes captures these cross-entity signals in a single forward pass.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why async L3 LLM?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Ollama inference takes 2–10s. Blocking the scoring path would violate the sub-100ms SLA on every BLOCK decision. Celery decouples investigation from decision — BLOCK is immediate, the narrative report is generated in the background and retrievable via GET /v1/investigation/{'{'}txn_id{'}'} .</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why 14 agents?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>A monolithic scorer cannot self-correct. The reflection agent clusters false positives nightly and auto-tunes rule thresholds. The critic agent evaluates decision quality independently. Human-review and mitigation agents handle edge cases. Each concern is isolated, testable, and independently replaceable.</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sd-modal-section-title">Technologies & Tools</div>
                        <table className="sd-modal-tech-table">
                            <tbody>
                                <tr><td className="sd-modal-tech-label">API & Worker</td><td>Python · FastAPI · Celery · Redis · Uvicorn</td></tr>
                                <tr><td className="sd-modal-tech-label">ML & Graph</td><td>PyTorch Geometric · SHAP · GNNExplainer · scikit-learn · Isotonic Calibration</td></tr>
                                <tr><td className="sd-modal-tech-label">LLM</td><td>Ollama (llama3.1:8b) · Async Celery worker · structlog</td></tr>
                                <tr><td className="sd-modal-tech-label">Databases</td><td>PostgreSQL · Neo4j · Redis · SQLAlchemy · Alembic</td></tr>
                                <tr><td className="sd-modal-tech-label">Compliance</td><td>PCI-DSS · RBI localization · EU AI Act · OFAC/UN sanctions · AML · KYC</td></tr>
                                <tr><td className="sd-modal-tech-label">Frontend & Ops</td><td>Vite · React · TypeScript · Kubernetes · Prometheus · Grafana · ArgoCD</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
/* ── PRGuard AI Case Study Modal ── */
const PRGuardCaseStudyModal = ({ onClose }) => {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);
    return (
        <div className="sd-modal-overlay" onClick={onClose}>
            <div className="sd-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="sd-modal-header">
                    <div>
                        <div className="sd-modal-title">PRGuard AI</div>
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
                            PRGuard AI is a production-grade, multi-agent pull request review system that analyzes PRs across style, logic, and security dimensions using a mix of rule-based detectors, tree-sitter AST parsing, and LLM reasoning. In a real-world evaluation against 50 CVE-fix PRs from python/cpython and nodejs/node, it achieved a 0.92 F1 score (0.92 precision, 0.92 recall). The system is built for production: async Celery task queues with retry, PostgreSQL audit logging, circuit breakers on LLM calls, Redis-backed token budgeting, HMAC webhook verification, replay protection, rate limiting, sandboxed repository cloning with LRU caching, and OpenTelemetry trace propagation.
                        </div>
                    </div>

                    {/* 2. System Architecture */}
                    <div>
                        <div className="sd-modal-section-title">System Architecture</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Webhook Control Plane</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    FastAPI receives POST /webhook, verifies the HMAC-SHA256 signature, rejects replays via X-GitHub-Delivery deduplication (Redis, 5-min TTL), validates payload timestamp (&lt; 2 min) and size (5 MB cap), then enforces per-repo and per-installation rate limits before enqueueing the review task.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Agent Pipeline</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Style, Logic, and Security agents run as independent Celery tasks on dedicated queues with automatic retry (autoretry_for=(Exception,), retry_backoff=True, max_retries=1) and a hard 5-minute task timeout. The orchestrator runs round 0 in parallel, then a refinement loop (rounds 1–3) with a coordinator agent before arbitration.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Confidence Arbitration</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Every finding carries a confidence_source tag (rule_based: 0.9, llm_reasoning: 0.6, inferred: 0.3). Per-agent score = (base_confidence + avg_issue_weight) / 2, clamped to [0, 1]. Aggregate = mean of agent scores with a +0.1 HIGH-severity boost (capped at 1.0). The arbitrator flags cross-agent disagreement.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. System Architecture Diagram */}
                    <div>
                        <div className="sd-modal-section-title">System Architecture Diagram</div>
                        <div className="sd-diagram-container">
                            <svg viewBox="0 0 800 360" className="sd-diagram-svg">
                                <defs>
                                    <marker id="arrowPR" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7C38A" />
                                    </marker>
                                </defs>
                                <rect x="20" y="25" width="110" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="75" y="48" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">GitHub</text>
                                <text x="75" y="62" fill="#9CA3AF" fontSize="8" textAnchor="middle">PR event webhook</text>
                                <rect x="165" y="25" width="140" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="235" y="48" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">FastAPI Verify</text>
                                <text x="235" y="62" fill="#9CA3AF" fontSize="8" textAnchor="middle">HMAC · replay · rate limit</text>
                                <rect x="340" y="25" width="130" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="405" y="48" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Repo Sandbox</text>
                                <text x="405" y="62" fill="#9CA3AF" fontSize="8" textAnchor="middle">clone · index · LRU cache</text>
                                <rect x="505" y="25" width="110" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="560" y="48" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">ChromaDB</text>
                                <text x="560" y="62" fill="#9CA3AF" fontSize="8" textAnchor="middle">convention index</text>

                                <rect x="20" y="155" width="130" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5" strokeDasharray="4 3"/>
                                <text x="85" y="178" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Celery Orchestrator</text>
                                <text x="85" y="192" fill="#9CA3AF" fontSize="8" textAnchor="middle">enqueue · coordinate</text>
                                <rect x="185" y="155" width="180" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="2"/>
                                <text x="275" y="178" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Style · Logic · Security</text>
                                <text x="275" y="192" fill="#9CA3AF" fontSize="8" textAnchor="middle">3× parallel Celery tasks</text>
                                <rect x="400" y="155" width="150" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                                <text x="475" y="178" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Refinement Loop</text>
                                <text x="475" y="192" fill="#9CA3AF" fontSize="8" textAnchor="middle">rounds 1–3 + coordinator</text>
                                <rect x="585" y="155" width="130" height="50" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="650" y="178" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">Confidence Arbitrator</text>
                                <text x="650" y="192" fill="#9CA3AF" fontSize="8" textAnchor="middle">weighted scoring</text>

                                <rect x="20" y="290" width="110" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="75" y="311" fill="#fff" fontSize="10" textAnchor="middle">Redis</text>
                                <text x="75" y="325" fill="#9CA3AF" fontSize="8" textAnchor="middle">context · broker · budget</text>
                                <rect x="165" y="290" width="140" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="235" y="311" fill="#fff" fontSize="10" textAnchor="middle">PostgreSQL</text>
                                <text x="235" y="325" fill="#9CA3AF" fontSize="8" textAnchor="middle">audit log · reports</text>
                                <rect x="340" y="290" width="130" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="#E7C38A" strokeWidth="1.5"/>
                                <text x="405" y="311" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">GitHub PR Review</text>
                                <text x="405" y="325" fill="#9CA3AF" fontSize="8" textAnchor="middle">comment · inline · audit</text>
                                <rect x="505" y="290" width="120" height="45" rx="6" fill="rgba(19,22,27,0.8)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="565" y="311" fill="#fff" fontSize="10" textAnchor="middle">DeepSeek LLM</text>
                                <text x="565" y="325" fill="#9CA3AF" fontSize="8" textAnchor="middle">circuit-breaker guarded</text>

                                <line x1="130" y1="50" x2="165" y2="50" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <line x1="305" y1="50" x2="340" y2="50" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <line x1="470" y1="50" x2="505" y2="50" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <path d="M 235 75 L 85 155" fill="none" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <path d="M 560 75 L 560 110 L 275 110 L 275 155" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrowPR)"/>
                                <line x1="150" y1="180" x2="185" y2="180" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <line x1="365" y1="180" x2="400" y2="180" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <line x1="550" y1="180" x2="585" y2="180" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <path d="M 650 205 L 650 240 L 405 240 L 405 290" fill="none" stroke="#E7C38A" strokeWidth="1.2" markerEnd="url(#arrowPR)"/>
                                <path d="M 75 290 L 75 205" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" markerEnd="url(#arrowPR)"/>
                                <path d="M 565 290 L 565 240 L 275 240 L 275 205" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arrowPR)"/>
                            </svg>
                        </div>
                    </div>

                    {/* 4. Data Flow */}
                    <div>
                        <div className="sd-modal-section-title">Data Flow (Request Lifecycle)</div>
                        <ul className="sd-modal-list">
                            <li><strong>Ingestion:</strong> POST /webhook verifies HMAC-SHA256, deduplicates X-GitHub-Delivery in Redis (5-min TTL), validates timestamp and 5 MB payload size, then applies per-repo + per-installation rate limits.</li>
                            <li><strong>Sandbox & Index:</strong> The repo is shallow-cloned into a sandboxed LRU cache (guaranteed cleanup), and repository conventions are embedded into the ChromaDB index for grounding.</li>
                            <li><strong>Parallel Analysis:</strong> The orchestrator enqueues Style, Logic, and Security tasks onto dedicated Celery queues. Each agent builds a per-file tree-sitter AST summary, runs rule-based detectors, then grounds its LLM prompt with semantically similar ChromaDB examples.</li>
                            <li><strong>Refinement Loop:</strong> Rounds 1–3 let agents revise findings after reviewing each other's output. The coordinator agent applies stopping conditions when the conversation converges.</li>
                            <li><strong>Arbitration:</strong> The confidence arbitrator weights each finding by source, computes the aggregate confidence, and flags disagreement when one agent reports HIGH severity that another does not.</li>
                            <li><strong>Delivery:</strong> Findings are posted as a PR comment plus up to 10 inline comments on diff lines. The full analysis trace is written to the PostgreSQL audit log and streamed live via WebSocket.</li>
                        </ul>
                    </div>

                    {/* 5. Agent Breakdown */}
                    <div>
                        <div className="sd-modal-section-title">Agent Breakdown</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Style Agent</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Two-pass approach: rule-based string matching (tab indentation, lines exceeding 120 characters) plus LLM-guided analysis grounded in semantically similar ChromaDB code to check naming conventions, docstring consistency, and file structure.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Logic Agent</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Three-pass: rule-based pattern matching on added lines (bare except:, unresolved TODOs), tree-sitter AST summaries (Python, Go, TypeScript, Rust), and LLM reasoning over the AST + diff context for off-by-one errors, null dereferences, boundary conditions, and unhandled exceptions.
                                </div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Security Agent</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>
                                    Rule-based regex detection (eval()/exec(), SQL injection patterns, hardcoded secrets) plus security-focused LLM prompting for command injection, unsafe deserialization, privilege escalation, SSRF, and path traversal. Each detector is independently exported and testable.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Production Incident */}
                    <div>
                        <div className="sd-modal-section-title">Production Incident: The Batch Review That Vanished</div>
                        <div className="sd-modal-text" style={{ marginBottom: '16px' }}>
                            Running 40 PRs through the batch evaluator launched 4 parallel workers. Twenty minutes later — no output, no errors, no results file. The process had been silently killed with no crash log or traceback.
                        </div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title" style={{ color: 'var(--accent-text)' }}>Root Cause Chain</div>
                                <ul className="sd-modal-list" style={{ fontSize: '12.5px' }}>
                                    <li>ThreadPoolExecutor context manager exits on any unhandled exception in a worker thread</li>
                                    <li>The security agent's _parse_llm_issues calls json.loads() on the LLM response</li>
                                    <li>DeepSeek occasionally truncates JSON mid-string (one response ended with an unclosed quote)</li>
                                    <li>JSONDecodeError propagated uncaught out of the worker thread</li>
                                    <li>with ThreadPoolExecutor() as pool: killed the remaining workers on exit</li>
                                    <li>No try/except, no finally block to flush partial results</li>
                                </ul>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">The Fix That Held</div>
                                <ul className="sd-modal-list" style={{ fontSize: '12.5px' }}>
                                    <li>Wrapped json.loads() in try/except that records the raw response for debugging instead of crashing</li>
                                    <li>Incremental checkpoints — results saved after every completed PR instead of once at the end</li>
                                    <li>Added --resume flag that skips already-completed PRs by reading the partial results file</li>
                                </ul>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px', marginTop: '10px' }}>
                                    The cosmetic gap: TokenBudget.used returned 0 for all 40 PRs. The batch runner's token_budget was never wired into the agents — each agent constructs its own LLMClient internally instead of forwarding the one passed in. Unfixed because it doesn't affect correctness.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Engineering Decisions */}
                    <div>
                        <div className="sd-modal-section-title">Engineering Decisions</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why multi-agent?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>3× LLM cost, but enables cross-concern disagreement detection — a signal no single agent can produce. The arbitrator surfaces when one agent reports HIGH severity that another misses.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why hybrid scoring?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Rule-based findings carry 0.9 weight vs 0.6 for LLM output. Prevents confidence inflation from speculative LLM reasoning while trusting deterministic detectors.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why async Celery?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>GitHub webhooks time out at 10s while agent analysis takes 15–30s. Not a preference — a hard constraint. Dedicated queues and retry with exponential backoff guarantee delivery.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Why refinement loop?</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Adds latency but reduces false positives; agents can revise findings after reviewing other agents' output across 3 rounds, with coordinator-driven stopping conditions.</div>
                            </div>
                        </div>
                    </div>

                    {/* 8. Evaluation */}
                    <div>
                        <div className="sd-modal-section-title">Evaluation</div>
                        <div className="sd-modal-grid">
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Real-World CVE (50 PRs)</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>0.92 F1 (0.92 precision, 0.92 recall) across python/cpython and nodejs/node. Batch 2: 17/17 security PRs detected with zero false negatives. The only false positive flagged a legitimate DER certificate concern that was not CVE-tagged.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Synthetic Benchmark (200 PRs)</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>0.82 F1 (0.71 precision, 0.96 recall) in the CI regression gate. Real-world F1 exceeding synthetic F1 indicates the system generalizes to unseen real-world patches.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Test Suite</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>288 tests at 77% coverage, enforcing a 70% minimum gate in CI. Covers diff parsing, agent analysis, arbitration, circuit breakers, token budgeting, and the end-to-end pipeline.</div>
                            </div>
                            <div className="sd-modal-grid-card">
                                <div className="sd-modal-grid-card-title">Cost & Latency</div>
                                <div className="sd-modal-text" style={{ fontSize: '12.5px' }}>Median review &lt; 30s per PR across the async pipeline. Each PR triggers 12+ LLM calls; at DeepSeek pricing a moderate PR costs ~$0.01–0.03, with circuit breaker + token budget guarding runaway spend.</div>
                            </div>
                        </div>
                    </div>

                    {/* 9. Technologies & Tools */}
                    <div>
                        <div className="sd-modal-section-title">Technologies & Tools</div>
                        <table className="sd-modal-tech-table">
                            <tbody>
                                <tr><td className="sd-modal-tech-label">Backend & Worker</td><td>Python 3.11 · FastAPI · Celery · Redis · Uvicorn</td></tr>
                                <tr><td className="sd-modal-tech-label">AI & Analysis</td><td>DeepSeek (deepseek-chat) · tree-sitter AST · ChromaDB RAG · prompt templates</td></tr>
                                <tr><td className="sd-modal-tech-label">Data & Storage</td><td>PostgreSQL · Redis (data + broker) · ChromaDB · Alembic migrations</td></tr>
                                <tr><td className="sd-modal-tech-label">Security</td><td>HMAC-SHA256 · replay protection · rate limiting · sandboxed clones · token budgeting · LLM output sanitization</td></tr>
                                <tr><td className="sd-modal-tech-label">Observability</td><td>Prometheus metrics · structured JSON logs · OpenTelemetry · WebSocket events</td></tr>
                                <tr><td className="sd-modal-tech-label">DevOps & Infra</td><td>Docker · Docker Compose · Kubernetes Helm · Terraform · GitHub Actions CI</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Main SystemDesign Component ── */
const SystemDesign = () => {
    const [selectedSystem, setSelectedSystem] = useState(null);

    return (
        <section className="panel" id="system-design">
            <h2 className="panel-heading">System Design</h2>
            <div className="panel-content">
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
            {selectedSystem === 'DRISE' && (
                <DRISECaseStudyModal onClose={() => setSelectedSystem(null)} />
            )}
            {selectedSystem === 'AuditLend Intelligence Core (ALICe)' && (
                <ALICeCaseStudyModal onClose={() => setSelectedSystem(null)} />
            )}
            {selectedSystem === 'PayShield' && (
                <PayShieldCaseStudyModal onClose={() => setSelectedSystem(null)} />
            )}
            {selectedSystem === 'PRGuard AI' && (
                <PRGuardCaseStudyModal onClose={() => setSelectedSystem(null)} />
            )}
        </section>
    );
};

export default SystemDesign;
