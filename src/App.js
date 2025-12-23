import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const sectionsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach(section => {
        if (!section) return;
        const heading = section.querySelector('.section-heading');
        if (!heading) return;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const start = windowHeight * 0.2;
        const end = windowHeight * 0.8;

        if (rect.top < end && rect.bottom > start) {
          const progress = (start - rect.top) / (rect.height - windowHeight);
          const clamped = Math.min(Math.max(progress, 0), 1);
          heading.style.transform = `translateY(${clamped * 40}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const handleMenuClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { label: 'Proficiencies', id: 'proficiencies' },
    { label: 'Education', id: 'education' },
    { label: 'Projects', id: 'projects' },
    { label: 'Frontend Explorations', id: 'frontend' },
    { label: 'Contact', id: 'contact' },
    { label: 'Back Home', id: 'top' },
  ];

  return (
    <div className="portfolio">
      {/* Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'menu-open' : ''}`}>
        <div className="menu-content">
          <div className="menu-left">
            <span className="menu-label">Purvansh Sahu's Resume</span>
          </div>
          <div className="menu-right">
            <nav className="menu-nav">
              {menuItems.map((item, index) => (
                <div key={item.id} className="menu-item-wrapper">
                  <a
                    href={`#${item.id}`}
                    className="menu-item"
                    onClick={(e) => handleMenuClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                  {index < menuItems.length - 1 && <div className="menu-divider" />}
                </div>
              ))}
            </nav>
            <button
              className="menu-button menu-button-active"
              onClick={() => setMenuOpen(false)}
            >
              ☰ Menu
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span>◆ Purvansh Sahu</span>
        </div>
        <div className="header-right">
          <button className="menu-trigger" onClick={() => setMenuOpen(true)}>
            ☰ Menu
          </button>
        </div>
      </header>

      {/* Hero - ML First */}
      <section className="hero" id="top">
        <h1 className="hero-name">Purvansh<br />Sahu</h1>
        <div className="hero-right">
          <div className="hero-about">
            <div className="hero-role">Machine Learning Engineer | Applied AI Systems</div>
            <div className="hero-role-secondary">Frontend development as a supporting craft for ML products</div>
            <div className="hero-status">
              <span>Bangalore, India</span>
              <span>+91 91713 03506</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proficiencies - ML First Structure */}
      <section className="section" id="proficiencies" ref={addSectionRef}>
        <h2 className="section-heading">Proficiencies</h2>
        <div className="section-content">
          <div className="proficiency-group">
            <div className="proficiency-title">Core Machine Learning</div>
            <div className="proficiency-items">
              <span>Supervised & Unsupervised Learning</span>
              <span>NLP & Text Processing</span>
              <span>Feature Engineering</span>
              <span>Model Evaluation (ROC-AUC, Precision-Recall)</span>
              <span>LLM Integration & Fine-tuning</span>
            </div>
          </div>
          <div className="proficiency-group">
            <div className="proficiency-title">ML Systems & Deployment</div>
            <div className="proficiency-items">
              <span>Python, Scikit-learn, Pandas</span>
              <span>FastAPI, Streamlit</span>
              <span>LangChain, LangGraph</span>
              <span>AWS, Docker</span>
              <span>SQL, Vector Databases</span>
            </div>
          </div>
          <div className="proficiency-group proficiency-muted">
            <div className="proficiency-title">Frontend & Product (Supporting)</div>
            <div className="proficiency-items">
              <span>React, TypeScript</span>
              <span>UI for ML Dashboards</span>
              <span>Framer Motion (visualization)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education - Real Data */}
      <section className="section" id="education" ref={addSectionRef}>
        <h2 className="section-heading">Education</h2>
        <div className="section-content">
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">M.Sc. Computer Science</span>
              <span className="badge">Expected 2027</span>
            </div>
            <div className="entry-meta">
              <span>Woolf University</span>
            </div>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Integrated Computer Science Course</span>
              <span className="badge">Current</span>
            </div>
            <div className="entry-meta">
              <span>2023–2027</span>
              <span>·</span>
              <span>Scaler School of Technology</span>
            </div>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">B.Sc. Computer Science (Online)</span>
              <span className="badge">Current</span>
            </div>
            <div className="entry-meta">
              <span>2023–2026</span>
              <span>·</span>
              <span>BITS Pilani</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects - ML First */}
      <section className="section" id="projects" ref={addSectionRef}>
        <h2 className="section-heading">Projects</h2>
        <div className="section-content">
          <a href="https://github.com/purvanshh/AI-Assisted-Sales-Outreach-Platform" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-icon">🤖</div>
            <div className="project-info">
              <div className="project-name">AI-Assisted Sales Outreach Platform</div>
              <div className="project-description">End-to-end ML system combining NLP-driven content generation with lead prioritization and API-based model inference.</div>
            </div>
          </a>
          <a href="https://github.com/purvanshh/Transformer-from-scratch" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-icon">🧠</div>
            <div className="project-info">
              <div className="project-name">Transformer From Scratch</div>
              <div className="project-description">Implemented a transformer architecture from first principles to deeply understand attention, embeddings, and training dynamics.</div>
            </div>
          </a>
          <a href="https://github.com/purvanshh/Auto-Reviewer" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-icon">✅</div>
            <div className="project-info">
              <div className="project-name">Auto-Reviewer</div>
              <div className="project-description">AI-powered automated review system using NLP to analyze, summarize, and evaluate textual submissions with structured feedback.</div>
            </div>
          </a>
          <a href="https://github.com/purvanshh/Delivery-Operations-Inteligence" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-icon">📊</div>
            <div className="project-info">
              <div className="project-name">Delivery Operations Intelligence</div>
              <div className="project-description">Data-driven ML system for analyzing and optimizing delivery operations using predictive modeling and operational metrics.</div>
            </div>
          </a>
          <a href="https://github.com/purvanshh/langflow-language-tutor" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-icon">💬</div>
            <div className="project-info">
              <div className="project-name">Language Tutor (LangFlow)</div>
              <div className="project-description">Agentic language-learning assistant built using LangFlow, enabling structured conversation flows and adaptive responses.</div>
            </div>
          </a>
          <a href="https://github.com/purvanshh/Plant-Disease-Classification" target="_blank" rel="noopener noreferrer" className="project-card">
            <div className="project-icon">🌱</div>
            <div className="project-info">
              <div className="project-name">Plant Disease Classification</div>
              <div className="project-description">Computer vision–based classification system for detecting plant diseases from leaf images using supervised deep learning.</div>
            </div>
          </a>
        </div>
      </section>

      {/* Frontend Explorations - Clearly Secondary */}
      <section className="section" id="frontend" ref={addSectionRef}>
        <h2 className="section-heading">Frontend Explorations</h2>
        <div className="section-content">
          <div className="project-card project-card-muted">
            <div className="project-icon">🎨</div>
            <div className="project-info">
              <div className="project-name">Interactive Portfolio System</div>
              <div className="project-description">Experimental React portfolio with scroll-linked motion and editorial layout.</div>
            </div>
          </div>
          <div className="project-card project-card-muted">
            <div className="project-icon">📱</div>
            <div className="project-info">
              <div className="project-name">FitTrack Pro</div>
              <div className="project-description">React Native fitness tracking app with step counter and health analytics.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - Real Data */}
      <section className="section" id="contact" ref={addSectionRef}>
        <h2 className="section-heading">Contact</h2>
        <div className="section-content">
          <a href="mailto:purvanshhsahu@gmail.com" className="contact-link">
            Mail →
          </a>
          <a href="https://github.com/purvanshh" target="_blank" rel="noopener noreferrer" className="contact-link">
            GitHub →
          </a>
          <a href="https://linkedin.com/in/purvansh-sahu-25b24228a" target="_blank" rel="noopener noreferrer" className="contact-link">
            LinkedIn →
          </a>
          <a href="https://purvanshhsahu.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-link">
            Frontend Portfolio →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2025 Purvansh Sahu · Built in React · Deployed on Vercel</p>
        <div className="footer-links">
          <a href="#top" onClick={(e) => handleMenuClick(e, 'top')}>↑ Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
