# Purvansh Sahu — ML Systems Portfolio

Personal portfolio focused on applied ML systems engineering — multi-agent orchestration, document intelligence, graph-aware retrieval, credit decision engines, and incident reasoning. Built with React.

**Live:** [purvanshsahu.vercel.app](https://purvanshsahu.vercel.app)

## Projects

### [SentinelOps AI](https://github.com/purvanshh/SentinalOps)
Uncertainty-aware incident reasoning with LangGraph orchestration. Features a 4-layer LLM failover chain, algorithmic root-cause scoring via Monte Carlo simulation, and JWT-scoped operator approval gates. Validated on 121 replayed incidents with 0.9917 router consistency and 100% dangerous remediation rejection.

### [PRGuard AI](https://github.com/purvanshh/PRGuard-AI)
Multi-agent pull request review system with 3 parallel Celery agents (Style, Logic, Security) combining deterministic rules, tree-sitter AST analysis, and DeepSeek LLM reasoning. Achieves **0.92 F1** on 50 real-world CVE-fix PRs from python/cpython and nodejs/node. Features HMAC webhook verification, replay protection, rate limiting, sandboxed repo clones, PostgreSQL audit logging, and OpenTelemetry tracing.

### [DRISE](https://github.com/purvanshh/DRISE-experiments)
Document intelligence engine combining a fine-tuned LayoutLMv3 stack with deterministic post-processing for trustworthy structured extraction. Reaches 0.8704 validation F1, enforces 100% schema-valid JSON, benchmarks against LLM-only and RAG+LLM baselines on 201 annotated documents, and runs at roughly $0.000049 per document with defense-in-depth upload validation.

### [GitHub Codebase Intelligence](https://github.com/purvanshh/github-rag)
Graph-aware RAG for code understanding: tree-sitter AST parsing → symbol-level chunking → ChromaDB embeddings → graph expansion via import/call relationships → cross-encoder reranking. Every answer cites file, symbol, and line number.

### [ALICe](https://github.com/purvanshh/AuditLend-Intelligence-Core--ALICe-)
Auditable credit decision engine with XGBoost ML scoring (0.975 AUC-ROC) and deterministic heuristic fallbacks. Features transactional outbox pattern, circuit breakers, immutable audit trail via PostgreSQL triggers, and SHAP explainability. 187 tests at 86% coverage.

### [PayShield](https://github.com/purvanshh/PayShield)
Return-risk scorer for Indian e-commerce. Scores every order before it ships via a Razorpay `order.paid` webhook → 7-feature XGBoost pipeline → LOW / MEDIUM / HIGH tier (ship / review / prepaid-only). Evaluated across three Progressive Merchant Maturity scenarios with identical model architecture:

| Stage | Merchant segment | PR-AUC | ROC-AUC | ₹/month (Electronics) | ₹/month (Fashion) |
|---|---|---|---|---|---|
| **Stage 1: Basic** | high hidden variance | **0.7991** | **0.8431** | ₹36.8L | ₹17.4L |
| **Stage 2: Enriched** | rating + delivery observed | **0.8834** | **0.9198** | ₹44.7L | ₹21.4L |
| **Stage 3: Premium** | mature instrumentation | **0.9497** | **0.9612** | **₹53.5L** | **₹26.0L** |

Stage 1 is the honest conservative floor: trained on a non-circular synthetic DGP with hidden confounders (product rating, delivery speed, packaging, weather, customer mood) the model never observes. The 0.50 review gate saves **₹17.4L/month** on 10k fashion orders (precision 0.644, recall 0.812, ROI 34.5%) — a 34.5% reduction of the ₹50.31L/month return bleed. Tuned champion (HalvingGridSearchCV): PR-AUC 0.8089 / ROC-AUC 0.8477. Features a live React dashboard, four agent workers (transaction / profile / reflection / human-review) with Redis heartbeats, PSI drift monitoring, and config-driven per-vertical gate thresholds.

## System Design

Architecture deep-dives for every flagship system — now including DRISE — with pipeline flows, failure paths, decision logic, support systems, engineering tradeoffs, case-study detail, and impact metrics.

## Tech Stack

- **Frontend:** React.js, GSAP + ScrollTrigger, Lucide React, Custom WebGL shader (Three.js), Vanilla CSS
- **Backend (projects):** Python, FastAPI, Celery, Redis, PostgreSQL, ChromaDB, tree-sitter, LangGraph, DeepSeek API, XGBoost, PyTorch

## Run locally

```bash
git clone https://github.com/purvanshh/Portfolio-Machine-Learning.git
cd Portfolio-Machine-Learning
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── components/
│   ├── Hero.js
│   ├── EngineeringThesis.js
│   ├── Experience.js
│   ├── Projects.js          # 5 project cards with expandable detail
│   ├── SystemDesign.js      # Architecture deep-dives + case study modal
│   ├── Proficiencies.js
│   ├── Education.js
│   ├── Contact.js
│   ├── Header.js
│   ├── Footer.js
│   ├── ShaderAnimation.js   # WebGL background (Three.js)
│   └── ui/
│       └── HamburgerMenuOverlay.js
├── App.js
├── App.css
├── index.css
└── index.js
```

## Contact

- GitHub: [@purvanshh](https://github.com/purvanshh)
- LinkedIn: [Purvansh Sahu](https://www.linkedin.com/in/purvansh-sahu-25b24228a)
- Email: purvanshhsahu@gmail.com

## License

MIT
