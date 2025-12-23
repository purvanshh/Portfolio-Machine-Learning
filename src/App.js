import { useEffect, useRef, useState } from 'react';
import './App.css';
import {
  Header,
  MenuOverlay,
  Hero,
  Proficiencies,
  Education,
  Projects,
  FrontendExplorations,
  Contact,
  Footer,
} from './components';

function App() {
  const sectionsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-linked heading animation
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

  return (
    <div className="portfolio">
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <Hero />
      <Proficiencies ref={addSectionRef} />
      <Education ref={addSectionRef} />
      <Projects ref={addSectionRef} />
      <FrontendExplorations ref={addSectionRef} />
      <Contact ref={addSectionRef} />
      <Footer />
    </div>
  );
}

export default App;
