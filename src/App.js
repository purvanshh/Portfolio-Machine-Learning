import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import {
  Header,
  Hero,
  Experience,
  Proficiencies,
  Education,
  Projects,
  FrontendExplorations,
  Contact,
  Footer,
  ShaderAnimation,
} from './components';
import HamburgerMenuOverlay from './components/ui/HamburgerMenuOverlay';
import { Home, Briefcase, GraduationCap, FolderGit2, Palette, Mail } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Navigation menu items
const menuItems = [
  { label: 'Home', icon: <Home size={24} />, href: '#top' },
  { label: 'Experience', icon: <Briefcase size={24} />, href: '#experience' },
  { label: 'Proficiencies', icon: <Briefcase size={24} />, href: '#proficiencies' },
  { label: 'Education', icon: <GraduationCap size={24} />, href: '#education' },
  { label: 'Projects', icon: <FolderGit2 size={24} />, href: '#projects' },
  { label: 'Frontend Explorations', icon: <Palette size={24} />, href: '#frontend' },
  { label: 'Contact', icon: <Mail size={24} />, href: '#contact' },
];

function App() {
  const sectionsRef = useRef([]);

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

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <div className="shader-fullscreen-bg">
        <ShaderAnimation />
      </div>
      <HamburgerMenuOverlay
        items={menuItems}
        buttonTop="50px"
        buttonLeft="calc(100% - 50px)"
        buttonSize="md"
        buttonColor="rgba(20, 20, 35, 0.9)"
        overlayBackground="linear-gradient(135deg, rgba(10, 10, 20, 0.98) 0%, rgba(20, 20, 40, 0.98) 50%, rgba(10, 10, 25, 0.98) 100%)"
        textColor="#ffffff"
        fontSize="lg"
        enableBlur={true}
        animationDuration={0.8}
        staggerDelay={0.06}
      />
      <div className="portfolio">
        <Header />
        <Hero />
        <Experience ref={addSectionRef} />
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
