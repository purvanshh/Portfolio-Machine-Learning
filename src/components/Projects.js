import React, { forwardRef, useState } from 'react';
import { Shield, FileSearch, GitBranch, Landmark, ChevronDown, Github, Activity } from 'lucide-react';

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
            'OCR-only pipelines lack spatial layout awareness and collapse on tables or multi-column layouts, while LLM extractors are non-deterministic, suffer from high hallucination rates, and are prohibitively expensive at scale.',
        approach: [
            'Combines a layout-aware multimodal transformer (LayoutLMv3 base) with a deterministic post-processing pipeline to jointly encode pixel context, text tokens, and bounding-box coordinates',
            'Ingests files via FastAPI, performs magic-byte validation, rasterizes PDFs to page images, and extracts text/geometry using a PaddleOCR backend',
            'Classifies tokens into KEY/VALUE/O segments, normalizes formatting (dates to ISO 8601, currencies to floats), and applies constraint validations like line-item summation matching',
        ],
        failureFix:
            'Raw OCR character misreads (e.g. O instead of 0) caused constraint errors. Context-aware artifact correction in the post-processing layer recovered these errors without model retraining, recovering 15–25% accuracy loss.',
        differentiators: [
            'Deterministic Post-Processing: Guarantees identical, syntactically valid JSON output for identical inputs across all document runs',
            'Spatial Layout Awareness: Employs bounding-box geometry to distinguish labels from values across multi-column, tabular, or non-linear reading orders',
            'Defense-in-Depth Security: Checks file uploads at the extension, MIME type, and magic-byte level, rejecting malformed formats and path traversals before model inference',
        ],
        tech: 'Python · PyTorch · LayoutLMv3 · PaddleOCR · FastAPI · Docker',
        results: [
            'Reaches 0.58 Field F1 on held-out test splits (N=201), demonstrating statistically significant improvement (McNemar test p = 0.004) over LLM-only baselines',
            'Enforces 100% schema validity across all test documents, eliminating typical hallucinated fields',
            'Delivers sub-300ms average local inference latency and supports concurrent batch ingestion with background file cleanup',
        ],
        github: 'https://github.com/purvanshh/DRISE-experiments',
        limitations: [
            'LayoutLMv3 base model — not fine-tuned on domain-specific document types, limiting specialized field extraction accuracy',
            'PaddleOCR introduces language-specific dependencies; non-English documents may degrade OCR quality',
            'Deterministic post-processing rules are hand-crafted per field type and do not generalise to arbitrary document schemas without reconfiguration',
            'Memory-bound: rasterising multi-page PDFs at full resolution can exceed container memory limits on large documents',
        ],
        futureImprovements: [
            'Fine-tune LayoutLMv3 on a diverse multi-domain document corpus to improve field-level F1',
            'Replace PaddleOCR with a multilingual OCR backend for broader language support',
            'Learn post-processing rules automatically from annotated schema examples instead of hand-crafted logic',
            'Add streaming page rasterisation to handle large documents within fixed memory budgets',
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
        name: 'ALICe',
        problem:
            'Credit decisions must be explainable, auditable, and deterministic. Under degraded data conditions, typical systems fail silently or compute biased/unreliable risk scores.',
        approach: [
            'Implements a transactional outbox pattern to atomically commit API application writes and Celery task intents to PostgreSQL, eliminating task loss',
            'Worker claims tasks via atomic UPDATE queries and fetches mock external bureau, banking, and GST verification data with retry fetch reuse',
            'Evaluates decisions using a calibrated XGB_V1 ML model (trained on 1.1M Lending Club rows) with isotonic regression and SHAP explainability',
        ],
        failureFix:
            'External service timeouts caused silent task loss. Implementing transactional outbox and circuit breakers with fallback logic guaranteed no applications are lost.',
        differentiators: [
            'Immutable Audit Trail: PostgreSQL database triggers block UPDATE and DELETE queries on audit logs, securing compliance logs against tampering',
            'Deterministic Heuristic Fallbacks: Instantly degrades to a governed RULE_SET_V1 scorecard when ML calibration confidence or provider data degrades',
            'Chaos-tested Resilience: Redis-backed circuit breaker with half-open probe lock and mock APIs simulating timed out, stale, or partial data responses',
        ],
        tech: 'Python · FastAPI · Celery · PostgreSQL · Redis · XGBoost · SHAP · Docker · Prometheus',
        results: [
            'Achieves a verified 0.975 AUC-ROC and 0.025 Brier score for calibrated ML probability scoring on held-out test sets',
            'Delivers +$68.3M simulated profit increase over baseline heuristics at a 0.50 calibrated default-probability threshold',
            'Maintains a robust codebase verified by 187 zero-skip unit, integration, and chaos tests with 86% test coverage',
        ],
        github: 'https://github.com/purvanshh/AuditLend-Intelligence-Core--ALICe-',
        limitations: [
            'Trained on Lending Club data (2012–2015 US marketplace loans) — performance on contemporary or non-US credit populations is unvalidated',
            'Mock external bureau, banking, and GST verification — real provider integration with variable latency and availability is untested',
            'XGB_V1 is a single model; ensemble or multi-modal approaches may improve generalisation across underserved credit segments',
            'SHAP explanations are post-hoc and model-specific; regulatory alignment requires further compliance audit validation',
        ],
        futureImprovements: [
            'Train and evaluate on contemporary lending datasets with geographic and demographic diversity',
            'Integrate live bureau, banking, and GST API providers with circuit breaker and retry orchestration',
            'Explore lightGBM or NGBoost ensembles with conformal prediction intervals for calibrated uncertainty',
            'Implement regulatory compliance suite with automated audit report generation aligned to local credit bureau standards',
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

const Projects = forwardRef((props, ref) => {
    return (
        <section className="section" id="projects" ref={ref}>
            <h2 className="section-heading">Projects</h2>
            <div className="section-content">
                {projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>
        </section>
    );
});

export default Projects;
