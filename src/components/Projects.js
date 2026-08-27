import React, { useState } from 'react';
import { Shield, FileSearch, GitBranch, Landmark, ChevronDown, Github, Activity, Zap } from 'lucide-react';

const projects = [
    {
        icon: <Activity size={28} />,
        name: 'SentinelOps AI',
        problem:
            'Automated incident reasoning systems often hallucinate under pressure, lack deterministic safety gates, and fail when primary APIs error. SRE operations require auditable reasoning and strict operator control.',
        approach: [
            'FastAPI control plane manages incident state, approvals, dynamic evaluations, and WebSocket telemetry streaming',
            'LangGraph StateGraph deterministically orchestrates the incident pipeline (from triage and concurrent evidence collection to risk analysis)',
            'Root-cause engine algorithmically scores candidates and estimates blast radius via static topology traversal and Monte Carlo simulations',
        ],
        failureFix:
            'Integrated a multi-layer provider resilience chain (Primary API → Secondary Provider → Local Ollama → Deterministic Rule Classifier) to prevent execution halts during API outages.',
        differentiators: [
            'Telemetry Integrity Scoring: Detects gaps, completeness, and corruption in incoming metrics/logs before reasoning',
            'Causal Ambiguity Detection: Resolves causal conflicts into stable, competing, or insufficient evidence states',
            'Durable Operator Escalations: Human-in-the-loop validation triggers on low confidence, high blast radius, or telemetry blackouts',
        ],
        tech: 'Python · FastAPI · LangGraph · Redis · Celery · PostgreSQL · Qdrant · Prometheus · Next.js',
        results: [
            'Attains 0.9917 router consistency and 100% dangerous remediation rejection rate under red-team evaluation',
            'Maintains operational survivability with automatic fallback modes: Full, Degraded, Local_Only, Safe_Mode, and Observe_Only',
            'Verified via a deterministic replay benchmark suite containing 121 incidents and 40 operational chaos scenarios',
        ],
        github: 'https://github.com/purvanshh/SentinalOps',
        limitations: [
            'Simulation-Only Validation: Evaluations are performed on synthetic incident datasets and chaos-injected replays rather than live production environments.',
            'LLM Non-Determinism: Core reasoning relies on external LLM APIs, where outputs can vary across runs even with pinned seeds.',
            'Uncalibrated Confidence Scoring: Confidence bounds are derived from heuristic evidence weights and are not yet empirically calibrated.',
            'In-Process Checkpoint Persistence: Workflows use an in-process MemorySaver, meaning cross-process interrupt and resume is not supported.',
        ],
        futureImprovements: [
            'Enriching Mock Evidence: Injecting configuration changes and causal dependency metadata into the evaluation harness.',
            'Learned Causality: Replacing rule-based candidate scoring with statistically grounded causal inference models.',
            'Live Telemetry Connectors: Migrating evidence agents from mocked clients to production-ready Prometheus, Loki, and GitHub integrations.',
            'Durable Checkpointing: Integrating langgraph-checkpoint-postgres for persistent cross-process state management.',
        ],
    },
    {
        icon: <Shield size={28} />,
        name: 'PRGuard AI',
        problem:
            'Code review is a bottleneck: it consumes senior developer hours, slows delivery, and vulnerabilities slip through when reviews are rushed. Automated linters catch syntax errors; human reviewers miss security flaws under fatigue. Neither produces structured confidence scores for findings.',
        approach: [
            'Three parallel Celery agents (Style, Logic, Security) on dedicated queues — each combines deterministic rule checks with LLM reasoning and runs in under 5 minutes with autoretry/backoff',
            'Style agent retrieves semantically similar code from ChromaDB for project-specific conventions; Logic agent feeds tree-sitter AST summaries (Python/Go/TypeScript/Rust) to the LLM; Security agent runs regex + security-prompted LLM detection',
            'Refinement loop (rounds 1–3) with a Coordinator agent and a Confidence Arbitrator that assigns weighted scores (rule_based: 0.9, llm_reasoning: 0.6, inferred: 0.3) and detects cross-concern disagreements',
            'Full webhook security pipeline: HMAC-SHA256 verification, replay protection (Redis, 5-min TTL), timestamp validation, per-repo/IP rate limiting, sandboxed repo clones with LRU-evicted caching',
        ],
        failureFix:
            'The batch review script silently killed all 4 workers when a single thread hit a JSONDecodeError from a truncated LLM response. The fix: wrapped json.loads() in try/except to record raw responses instead of crashing, switched from end-of-batch writes to per-PR incremental checkpoints, and added a --resume flag that skips completed PRs by reading the partial results file.',
        differentiators: [
            'Disagreement detection — flags when one agent reports high-severity findings that another does not',
            'Hybrid confidence scoring prevents inflation from speculative LLM output',
            'Production-grade security: HMAC, replay protection, rate limiting, sandboxed clones, payload size limits',
            'Structured JSON logging with OpenTelemetry trace propagation, Prometheus metrics, WebSocket live streaming',
        ],
        tech: 'Python · FastAPI · Celery · Redis · ChromaDB · tree-sitter · DeepSeek API · PostgreSQL · Docker',
        results: [
            '0.92 F1 (0.92 precision, 0.92 recall) on 50 real-world CVE-fix PRs from python/cpython and nodejs/node',
            '0.82 F1 on synthetic benchmark of 200 fixture PRs (CI/regression gate)',
            'Catches command injection, SQL injection, hardcoded secrets, bare excepts, off-by-one errors across 288 test cases at 77% coverage',
            'Async pipeline with retry/backoff, circuit breakers, token budgeting, <30s median review time per PR',
        ],
        github: 'https://github.com/purvanshh/PRGuard-AI',
        limitations: [
            'Rule-based detectors are shallow — regex heuristics produce false positives on complex code (not a replacement for Semgrep/CodeQL)',
            'Multi-language support is uneven — AST parsing is Python-heavy; Go/TypeScript/Rust rely almost entirely on the LLM pass',
            'No incremental analysis — every PR is fully re-analysed without diff-aware caching across sequential PRs',
            'Chunked PR analysis not yet implemented — PRs exceeding 50 files or 5000 lines are truncated rather than chunked and merged',
            'Secret scanning is regex-only — no entropy analysis or pre-commit hook integration; misses obfuscated JWT tokens',
        ],
        futureImprovements: [
            'Integrate CodeQL or Semgrep for deep static analysis across all supported languages',
            'Implement diff-aware caching for file-level analysis across sequential PRs',
            'Add chunked PR analysis with merge for PRs exceeding 50 files',
            'Integrate GitHub Advisory Database / NVD direct query instead of pip-audit shell-out',
            'Add entropy-based secret scanning to catch obfuscated structured secrets',
        ],
    },
    {
        icon: <FileSearch size={28} />,
        name: 'DRISE',
        problem:
            'Enterprise document extraction breaks on a three-way tradeoff: OCR-only systems lose layout semantics, template matchers break on vendor drift, and LLM extractors are expensive, non-deterministic, and unsafe for schema-critical finance workflows.',
        approach: [
            'Uses a CORD + FUNSD fine-tuned LayoutLMv3 pipeline to jointly encode text, bounding boxes, and page pixels, preserving document structure across receipts, invoices, and scanned forms',
            'Runs a typed FastAPI ingestion path with extension, MIME, and magic-byte validation, PDF rasterization, deterministic image normalization, PaddleOCR token extraction, and batch-safe cleanup',
            'Applies category-aware grouping, locale-aware field recovery, normalization (dates to ISO 8601, currencies to floats), and cross-field constraint checks so outputs remain schema-valid and auditable',
        ],
        failureFix:
            'Early extraction quality collapsed on OCR artifacts like O/0 confusion, split totals, and locale-specific decimal separators. I fixed this in the deterministic recovery layer with context-aware artifact correction, semantic category propagation, and invoice-total reconciliation instead of chasing the issue with repeated model retraining.',
        differentiators: [
            'Deterministic Post-Processing: Guarantees identical outputs for identical inputs, with 100% schema-valid JSON and zero hallucination risk in the extraction layer',
            'Benchmark Discipline: Compares DRISE head-to-head against LLM-only and RAG+LLM baselines on 201 annotated documents with McNemar significance testing and ablation studies',
            'Cost-Efficient Document AI: Delivers near-SOTA structured extraction at roughly $0.000049 per document, far below token-priced LLM extraction approaches',
            'Defense-in-Depth Security: Validates uploads at extension, MIME type, and magic-byte level before OCR or model inference begins',
        ],
        tech: 'Python · PyTorch · LayoutLMv3 · PaddleOCR · FastAPI · Docker',
        results: [
            'Reaches 0.8704 validation F1 on the fine-tuned model and 0.8576 token-level F1 on the CORD test split, up from a 0.625 masked micro-F1 starting checkpoint',
            'Maintains 100% schema validity across all processed documents while benchmarking against LLM-only and RAG+LLM baselines on 201 annotated documents',
            'Runs at roughly $0.000049 per document with ~349ms CPU inference, making the system materially cheaper than LLM-only extraction while staying self-hosted and deterministic',
        ],
        github: 'https://github.com/purvanshh/DRISE-experiments',
        limitations: [
            'Current model quality is strongest on receipts, invoices, and form-style documents; broader generalization across highly specialized layouts still needs more annotated data',
            'OCR quality remains a hard dependency, so heavily degraded scans or non-English documents can still bottleneck downstream extraction quality',
            'Deterministic recovery logic is intentionally schema-aware; expanding to arbitrary new document families requires new normalization and constraint rules',
            'High-resolution multi-page rasterization is memory-heavy, so very large PDF batches need streaming page handling to stay resource-bounded',
        ],
        futureImprovements: [
            'Expand fine-tuning to broader enterprise document families beyond CORD/FUNSD-style layouts',
            'Add multilingual OCR and evaluation coverage for non-English business documents',
            'Turn the evaluation harness into a reusable benchmarking framework for document-intelligence system comparisons',
            'Implement streaming rasterization and page-wise batching for large multi-document workloads',
        ],
    },
    {
        icon: <GitBranch size={28} />,
        name: 'GitHub Codebase Intelligence',
        problem:
            'Understanding a new codebase requires reading thousands of files. Grep has no semantics. LLMs hallucinate without grounded context.',
        approach: [
            'Ingestion: clone → tree-sitter AST parsing → symbol-level chunking (function/class boundaries, not token windows) → embeddings → ChromaDB',
            'Graph construction: file-level dependency graph + function-level call graph via NetworkX',
            'Retrieval: vector similarity → graph expansion (imports + callers/callees) → cross-encoder reranking (bge-reranker-large)',
        ],
        failureFix:
            'Pure vector search returned topically similar but structurally unrelated code. Adding graph expansion via actual import/call relationships grounded retrieval in real code structure.',
        differentiators: [
            'Graph-aware retrieval using real dependency and call relationships, not just embedding distance',
            'Symbol-level chunking preserves function/class boundaries',
            'Every answer includes file, symbol, and line-number citations',
        ],
        tech: 'Python · tree-sitter · ChromaDB · NetworkX · GPT-4o · bge-reranker-large · FastAPI · Streamlit',
        results: [
            'Tested on nanoGPT, FastAPI, LangChain - answers architectural questions with file-level citations',
            'Graph-aware retrieval improves relevance over pure vector search',
            'Full UI: repo ingestion, QA, architecture dashboard with dependency hubs',
        ],
        github: 'https://github.com/purvanshh/github-rag',
        limitations: [
            'Graph expansion is limited to one hop of imports and callers/callees; deeper structural relationships are not explored',
            'Cross-encoder reranking adds ~200ms latency per query, impacting interactive response times at scale',
            'Chunking at symbol boundaries works well for functions and classes but breaks on top-level scripts and unstructured modules',
            'No incremental indexing — full re-ingestion is required when the codebase changes',
        ],
        futureImprovements: [
            'Extend graph expansion to multi-hop traversal with configurable depth limits to capture transitive dependencies',
            'Replace cross-encoder reranking with binary passage re-ranking distillation for sub-50ms overhead',
            'Add support for module-level natural language documentation chunking alongside symbol-level chunks',
            'Implement incremental indexing via git diff change detection and selective re-embedding',
        ],
    },
    {
        icon: <Landmark size={28} />,
        name: 'AuditLend Intelligence Core (ALICe)',
        problem:
            'Credit decisions must be explainable, auditable, and deterministic. Typical systems fail silently under degraded data, lack calibrated probability estimates, and produce no per-decision audit trail defensible in regulatory review.',
        approach: [
            'Implements a transactional outbox pattern to atomically commit API application writes and Celery task intents to PostgreSQL, eliminating silent task loss under network partition',
            'Calibrated XGBoost model (XGB_V1) trained on 1.3M Lending Club loans with isotonic regression reduces ECE from 0.0162 to 0.0036 — per-decision SHAP values explain top-8 feature contributions',
            'Full ML lifecycle: MLflow experiment tracking, file-backed model registry, KS-test drift detection, ONNX export, LRU+TTL prediction cache, A/B experimentation, causal inference via PSM, uplift modeling, and portfolio risk analytics',
            'Dual scoring paths: deterministic RULE_SET_V1 heuristic and calibrated RULE_SET_V2 ML — system falls back gracefully when confidence degrades',
        ],
        failureFix:
            'External service timeouts caused silent task loss: tasks were dispatched to Celery after the API committed to Postgres, so a crash mid-flight meant the application was persisted but never processed. Fix: transactional outbox — task intent is committed atomically with the application row, and a Redis-backed circuit breaker with half-open probe lock gates retries without cascading failures.',
        differentiators: [
            'Immutable Audit Trail: PostgreSQL triggers block UPDATE/DELETE on audit logs at the DB level — compliance evidence cannot be tampered with even by application code',
            'Calibrated Probabilities: Isotonic regression reduced Expected Calibration Error by 78% (0.016 → 0.0036), making predicted default probabilities actionable across the full risk spectrum',
            'SHAP + LLM Narratives: Every decision includes top-8 SHAP contributions and optional natural-language explanations via LLM integration, with policy RAG via ChromaDB for regulatory grounding',
            'Proxy Fairness Audit: SPD and EOD measured across zip_code_prefix and employment_length_band groups at inference time alongside live drift detection',
        ],
        tech: 'Python · FastAPI · Celery · PostgreSQL · Redis · XGBoost · SHAP · Isotonic Calibration · MLflow · ONNX · Evidently · Docker · Prometheus',
        results: [
            '0.9757 AUC-ROC and 0.0036 ECE on 49,230 held-out 2018 loans — 78% calibration improvement over uncalibrated model',
            '+$68.3M simulated profit delta vs. heuristic baseline: ML reduced default rate from 15.1% to 2.3% while simultaneously increasing approval rate by 0.6pp',
            '437+ zero-skip unit, integration, and chaos tests — full ML evaluation pipeline runnable end-to-end from raw Lending Club CSV',
        ],
        github: 'https://github.com/purvanshh/AuditLend-Intelligence-Core--ALICe-',
        limitations: [
            'Trained on Lending Club (2007–2018 US marketplace loans) — performance on contemporary or non-US credit populations is unvalidated',
            'Mock external bureau, banking, and GST verification — real provider integration with variable latency and partial-data responses is untested',
            'XGB_V1 is a single model; ensemble approaches or conformal prediction intervals would improve uncertainty quantification for edge-case applicants',
            'SHAP explanations are post-hoc and model-specific; full regulatory alignment requires a formal compliance audit beyond proxy fairness checks',
        ],
        futureImprovements: [
            'Train and evaluate on contemporary lending datasets with geographic and demographic diversity beyond US marketplace loans',
            'Integrate live bureau, banking, and GST API providers with circuit breaker and retry orchestration replacing deterministic mocks',
            'Explore LightGBM or NGBoost ensembles with conformal prediction intervals for calibrated uncertainty on tail-risk applicants',
            'Implement automated regulatory compliance reporting aligned to local credit bureau standards with evidence archiving',
        ],
    },
    {
        icon: <Zap size={28} />,
        name: 'PayShield',
        problem:
            'Indian e-commerce return rates hit 18–32% in fashion, yet most orders ship blind. Merchants need to score return risk before dispatch — catching high-risk orders at high precision without blocking legitimate purchases.',
        approach: [
            'Scores every order before it ships: Razorpay order.paid webhook → POST /v1/return/score → feature engine + config-driven rules engine over Redis user/merchant profiles',
            '7 engineered features: user_return_rate_30d/90d, txn_amount_risk (log-normalised AOV), txn_category_return_baseline, user_cod_refusal_rate, user_return_velocity_7d, user_serial_returner_flag',
            'XGBoost primary scorer (200 trees, tuned) captures nonlinear feature interactions; a transparent hand-weighted composite serves as the always-available fallback',
            'Tiered decision gate — LOW → ship, MEDIUM → FLAG_FOR_REVIEW, HIGH → REQUIRE_PREPAID — with config-driven per-vertical thresholds (configs/return_risk_rules.yaml)',
        ],
        failureFix:
            'Early integration testing surfaced a PSI drift report reading 43.4 — a false alarm from a broken estimator masking real drift. Root cause: 10 fixed bins on 14 discrete samples, zero-mass bins, and density=True double normalization. Fix: shared quantile edges, adaptive bin count (max(3, n//5)), and Laplace smoothing — the real drift case now reads a credible 3.86.',
        differentiators: [
            'Honest, non-circular evaluation: trained on a synthetic DGP with hidden confounders (product rating, delivery speed, packaging, weather, customer mood) the model never observes — PR-AUC 0.8067, +0.11 over the best naive baseline',
            'Return risk framed as a cost decision, not an accuracy contest: a wrong review flag costs ₹200 while a wrong block costs ₹3,180 (~16×), so the gate optimizes precision where it is cheapest',
            'The 0.50 review gate saves a fashion merchant ₹17.5L/month on 10,000 orders (precision 0.677, recall 0.774, ROI 34.9%) — verified across a config-driven gate sweep and vertical sensitivity analysis',
            'Ablation study proves every feature earns its place — removing both return-rate features together costs −10.5% PR-AUC, the largest single block',
        ],
        tech: 'Python · FastAPI · XGBoost · Redis · Razorpay (order.paid webhooks) · Docker · YAML config rules · PSI drift monitoring',
        results: [
            'Offline XGBoost PR-AUC 0.8067 — learns from noisy, incomplete signal on 7 raw features, 2,000-order hold-out',
            '₹17.5L/month saved at the 0.50 review gate on a 10k-order fashion merchant (₹2.5k AOV, 18% return rate)',
            'Confusion matrix (gate 0.50): TN=915, FP=293, FN=179, TP=613 — precision 0.677, recall 0.774, F1 0.722',
            'Hyperparameter tuning over 144 combos selected max_depth=3, n_estimators=200, lr=0.05, scale_pos_weight=1.5',
        ],
        github: 'https://github.com/purvanshh/PayShield',
        limitations: [
            'Labels come from a generator calibrated to published Indian e-commerce distributions — real merchant data is not yet validated',
            'No live pilot yet: the 0.50 gate and base-rate calibration are projections pending an A/B test with a live Razorpay merchant',
            'device_fingerprint_match is a neutral 0.5 at inference — the return-risk module keeps no device store, so the model leans on the other six features at scoring time',
        ],
        futureImprovements: [
            'Retrain XGBoost on the enriched feature pipeline (feature_engine.py + Redis profiles) to close the gap with live feature distributions',
            'A/B test with a Razorpay merchant to validate the 0.50 gate on real return distributions via the champion/challenger harness',
            'Tune vertical-specific gates — fashion-high 0.50, low-return verticals 0.60–0.70 — using the existing config system',
        ],
    },
];

const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`project-detail-card ${expanded ? 'expanded' : ''}`}>
            <button
                className="project-detail-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <div className="project-icon">{project.icon}</div>
                <div className="project-header-text">
                    <div className="project-name">{project.name}</div>
                    <div className="project-problem">{project.problem}</div>
                </div>
                <ChevronDown
                    size={18}
                    className={`project-chevron ${expanded ? 'rotated' : ''}`}
                />
            </button>

            {expanded && (
                <div className="project-detail-body">
                    <div className="project-section">
                        <div className="project-section-title">Approach</div>
                        <ul className="project-section-list">
                            {project.approach.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="project-section project-section-highlight">
                        <div className="project-section-title">Failure → Fix</div>
                        <div className="failure-fix-text">{project.failureFix}</div>
                    </div>

                    <div className="project-section">
                        <div className="project-section-title">Key Differentiators</div>
                        <ul className="project-section-list">
                            {project.differentiators.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="project-section">
                        <div className="project-section-title">Tech Stack</div>
                        <div className="project-tech-badges">
                            {project.tech.split(' · ').map((t, idx) => (
                                <span key={idx} className="project-tech-badge">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className="project-section">
                        <div className="project-section-title">Results / Impact</div>
                        <ul className="project-section-list">
                            {project.results.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {project.limitations && (
                        <div className="project-section">
                            <div className="project-section-title">Current Limitations</div>
                            <ul className="project-section-list">
                                {project.limitations.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.futureImprovements && (
                        <div className="project-section">
                            <div className="project-section-title">Future Improvements</div>
                            <ul className="project-section-list">
                                {project.futureImprovements.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="project-links">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            aria-label={`GitHub repository for ${project.name}`}
                        >
                            <Github size={14} />
                            GitHub
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

const Projects = () => {
    return (
        <section className="panel" id="projects">
            <h2 className="panel-heading">Projects</h2>
            <div className="panel-content">
                {projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
