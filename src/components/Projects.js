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
        name: 'Document Intelligence Engine',
        problem:
            'OCR-only systems collapse on multi-column layouts. LLM extractors are non-deterministic - same input, different output. Neither is production-safe.',
        approach: [
            'PaddleOCR extracts tokens + bounding boxes → LayoutLMv3 classifies per-token as KEY/VALUE/OTHER using joint pixel-layout-text encoding',
            'Three-layer deterministic post-processing: OCR artifact correction (O→0, l→1 in numeric context) → field normalization (date→ISO 8601, currency→float) → cross-field constraint validation',
            'Every field carries explicit valid boolean, confidence score, and correction provenance. Constraint violations are flagged, not silenced.',
        ],
        failureFix:
            'Raw model output had ~15–25% error rate from OCR character misreads. Context-aware artifact correction in the post-processing layer recovered these without retraining the model.',
        differentiators: [
            'Deterministic guarantee: same document → same JSON, every run',
            'Post-processing makes model output production-safe without model changes',
            'Built-in ablation framework: remove layout, remove post-processing, degrade OCR - all runnable',
        ],
        tech: 'Python · PyTorch · LayoutLMv3 · PaddleOCR · FastAPI · Docker',
        results: [
            'Target F1 ≥ 0.80 on key-value extraction (FUNSD, CORD datasets)',
            '+15–25% accuracy recovery vs raw OCR through deterministic correction',
            'p99 API latency <2s, batch endpoint for multi-file ingestion',
        ],
        github: 'https://github.com/purvanshh/document-intelligence-engine',
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
        name: 'AuditLend',
        problem:
            'Credit decisions must be explainable, auditable, and deterministic. Most systems mix scoring with side effects, produce no audit trail, and can\'t be tested against failure scenarios.',
        approach: [
            'Idempotent intake with transactional outbox - API write + task intent committed atomically to PostgreSQL',
            'Worker claims via atomic UPDATE WHERE status=PENDING → fetches external data (credit, bank, GST) → reuses already-persisted fetches on retry',
            'Three separate output fields: risk_score, data_reliability, confidence - fallback data reduces confidence and routes to manual review',
            'Explanation endpoint reads from append-only audit trail, not recomputation',
        ],
        failureFix:
            'Direct Celery dispatch from the API caused silent task loss on network failures. Transactional outbox - committing task intent alongside the database write - eliminated the failure window.',
        differentiators: [
            'Explanation matches what happened - derived from audit logs, not fresh computation',
            'Deterministic mock services with 4 failure modes each enable chaos testing',
            'Append-only audit log enforced by DB trigger - application code cannot tamper',
        ],
        tech: 'Python · FastAPI · Celery · PostgreSQL · Redis · SQLAlchemy · Docker · Prometheus',
        results: [
            '124 tests passing, 87.24% coverage (85% gate)',
            'Circuit breaker with half-open probe lock, retry/backoff, idempotent intake',
            'Full e2e: intake → outbox → worker → decision → audit → explanation',
        ],
        github: 'https://github.com/purvanshh/AuditLend',
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
                        <div className="project-tech">{project.tech}</div>
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
