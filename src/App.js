import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  LiquidEffectAnimation,
} from './components';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll-linked heading animation with GSAP ScrollTrigger
  useLayoutEffect(() => {
    // Small delay to ensure refs are populated
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach(section => {
        if (!section) return;
        const heading = section.querySelector('.section-heading');
        if (!heading) return;

        // Create smooth scrub animation for each heading
        gsap.to(heading, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.8, // Smooth scrubbing with 0.8s lag for buttery feel
          },
        });
      });
    });

    return () => ctx.revert(); // Cleanup
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
    <>
      <LiquidEffectAnimation />
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
    </>
  );
}

export default App;
