import React, { forwardRef, useState } from 'react';
import { Shield, FileSearch, GitBranch, Landmark, ChevronDown, Github } from 'lucide-react';

const projects = [
    {
        icon: <Shield size={28} />,
        name: 'PRGuard AI',
        problem:
            'Automated linters catch syntax errors. Human reviewers miss security flaws under fatigue. Neither produces structured confidence scores for findings.',
        approach: [
            'Three parallel Celery agents (Style, Logic, Security) - each combines deterministic rule checks with LLM reasoning on dedicated queues',
            'Style agent retrieves repo conventions from ChromaDB; Logic agent feeds tree-sitter AST summaries to LLM; Security agent runs regex + prompt-based vulnerability detection',
            'Confidence Arbitrator assigns weighted scores (rule-based: 0.9, LLM: 0.6, inferred: 0.3) and detects inter-agent disagreements',
        ],
        failureFix:
            'Single-agent design produced noisy, inconsistent severity ratings. Splitting into three domain-specific agents with independent scoring surfaced cross-concern disagreements a single agent misses.',
        differentiators: [
            'Disagreement detection - flags when agents disagree on severity across concerns',
            'Hybrid scoring prevents confidence inflation from speculative LLM findings',
            'Full webhook security: HMAC, replay protection, rate limiting, sandboxed clones',
        ],
        tech: 'Python · FastAPI · Celery · Redis · ChromaDB · tree-sitter · NVIDIA NIM',
        results: [
            'Catches command injection, SQL injection, hardcoded secrets in test PRs with planted bugs',
            'Precision/recall evaluation framework against hand-labeled datasets',
            'Async pipeline with retry/backoff, <30s median review time per PR',
        ],
        github: 'https://github.com/purvanshh/PRGuard-AI',
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

                    <div className="project-links">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
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
