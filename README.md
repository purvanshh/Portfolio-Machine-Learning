# Purvansh Sahu — ML Systems Portfolio

Personal portfolio focused on applied ML systems engineering — multi-agent orchestration, document intelligence, graph-aware retrieval, credit decision engines, and incident reasoning. Built with React.

**Live:** [purvanshsahu.vercel.app](https://purvanshsahu.vercel.app)

## Projects

### [SentinelOps AI](https://github.com/purvanshh/SentinalOps)
Uncertainty-aware incident reasoning with LangGraph orchestration. Features a 4-layer LLM failover chain, algorithmic root-cause scoring via Monte Carlo simulation, and JWT-scoped operator approval gates. Validated on 121 replayed incidents with 0.9917 router consistency and 100% dangerous remediation rejection.

### [PRGuard AI](https://github.com/purvanshh/PRGuard-AI)
Multi-agent pull request review system with 3 parallel Celery agents (Style, Logic, Security) combining deterministic rules, tree-sitter AST analysis, and DeepSeek LLM reasoning. Achieves **0.92 F1** on 50 real-world CVE-fix PRs from python/cpython and nodejs/node. Features HMAC webhook verification, replay protection, rate limiting, sandboxed repo clones, PostgreSQL audit logging, and OpenTelemetry tracing.

### [DRISE](https://github.com/purvanshh/DRISE-experiments)
Document intelligence engine combining LayoutLMv3 with deterministic post-processing for key-value extraction. Reaches 0.58 Field F1 (p=0.004 over LLM baselines), enforces 100% schema validity, and delivers sub-300ms inference. Defense-in-depth security with magic-byte validation.

### [GitHub Codebase Intelligence](https://github.com/purvanshh/github-rag)
Graph-aware RAG for code understanding: tree-sitter AST parsing → symbol-level chunking → ChromaDB embeddings → graph expansion via import/call relationships → cross-encoder reranking. Every answer cites file, symbol, and line number.

### [ALICe](https://github.com/purvanshh/AuditLend-Intelligence-Core--ALICe-)
Auditable credit decision engine with XGBoost ML scoring (0.975 AUC-ROC) and deterministic heuristic fallbacks. Features transactional outbox pattern, circuit breakers, immutable audit trail via PostgreSQL triggers, and SHAP explainability. 187 tests at 86% coverage.

## System Design

Architecture deep-dives for every system — pipeline flows, failure paths, decision logic, support systems, engineering tradeoffs, and impact metrics.

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
