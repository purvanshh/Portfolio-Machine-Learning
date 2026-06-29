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
            'OCR-only pipelines lack spatial layout awareness and collapse on tables or multi-column layouts, while LLM extractors are non-deterministic, have high hallucinations, and are expensive at scale.',
        approach: [
            'Combines a layout-aware multimodal transformer (LayoutLMv3) with a deterministic post-processing pipeline',
            'Ingests documents via FastAPI, normalizes page images, and extracts text/bounding boxes using PaddleOCR',
            'Classifies tokens (KEY/VALUE/O) through LayoutLMv3, followed by regex validation and cross-field constraint enforcement',
        ],
        failureFix:
            'Raw OCR character misreads (e.g. O instead of 0) caused constraint errors. Context-aware artifact correction in the post-processing layer recovered these errors without model retraining.',
        differentiators: [
            'Deterministic post-processing guarantees identical output for identical inputs',
            'Spatial layout awareness via LayoutLMv3 coordinates encoding',
            'Defense-in-depth security with file extension, MIME type, and magic-byte checks',
        ],
        tech: 'Python · PyTorch · LayoutLMv3 · PaddleOCR · FastAPI · Docker',
        results: [
            'Achieves 100% schema validity and sub-300ms average latency',
            'Reaches 0.58 Field F1 on held-out test splits, statistically beating LLM baselines',
            'Built-in ablation framework evaluating spatial and constraint contributions',
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
            'Idempotent intake with transactional outbox committing API write and Celery task delivery intent atomically to PostgreSQL',
            'Worker claims task with atomic UPDATE and fetches or reuses cached credit, bank, and GST snapshots',
            'Orchestrates decisions using weighted risk, data reliability, calibrated confidence, and optional XGB_V1 ML scoring with fallback',
        ],
        failureFix:
            'External service timeouts caused silent task loss. Implementing transactional outbox and circuit breakers with fallback logic guaranteed no applications are lost.',
        differentiators: [
            'Explainable AI with SHAP-based feature contribution and audit-derived timelines',
            'Immutable audit log enforced by PostgreSQL database trigger preventing updates/deletes',
            'Resilient circuit breaker with half-open probe lock and automatic fallback to heuristics',
        ],
        tech: 'Python · FastAPI · Celery · PostgreSQL · Redis · XGBoost · SHAP · Docker · Prometheus',
        results: [
            'XGB_V1 model evaluated with 0.975 AUC-ROC and 0.025 Brier score',
            'Zero-skip test suite passing with 86% code coverage',
            'Simulated profit improvement of +$68.3M over baseline heuristics',
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
