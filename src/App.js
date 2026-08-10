import { useState, useCallback } from 'react';
import './App.css';
import {
  Hero,
  EngineeringThesis,
  Experience,
  Proficiencies,
  Education,
  Projects,
  SystemDesign,
  Contact,
  Footer,
  ShaderAnimation,
} from './components';
import TabNav from './components/TabNav';
import HamburgerMenuOverlay from './components/ui/HamburgerMenuOverlay';
import { smoothScrollToTop } from './lib/smoothScroll';
import { Home, FolderGit2, Layers, Wrench, Mail } from 'lucide-react';

// Navigation menu items
const menuItems = [
  { label: 'About', icon: <Home size={24} />, id: 'about' },
  { label: 'Projects', icon: <FolderGit2 size={24} />, id: 'projects' },
  { label: 'System Design', icon: <Layers size={24} />, id: 'system-design' },
  { label: 'Proficiencies', icon: <Wrench size={24} />, id: 'proficiencies' },
  { label: 'Contact', icon: <Mail size={24} />, id: 'contact' },
];

function App() {
  const [activeTab, setActiveTab] = useState('about');

  const selectTab = useCallback((id) => {
    setActiveTab(id);
    smoothScrollToTop(700);
  }, []);

  const mobileItems = menuItems.map((item) => ({
    ...item,
    onClick: () => selectTab(item.id),
  }));

  return (
    <>
      <div className="shader-fullscreen-bg">
        <ShaderAnimation />
      </div>
      <TabNav activeTab={activeTab} onSelect={selectTab} />
      <div className="mobile-menu-wrap">
        <HamburgerMenuOverlay
          items={mobileItems}
          buttonTop="28px"
          buttonRight="44px"
          buttonSize="md"
          buttonColor="rgba(19, 22, 27, 0.92)"
          overlayBackground="linear-gradient(135deg, rgba(11, 13, 16, 0.98) 0%, rgba(19, 22, 27, 0.98) 50%, rgba(9, 11, 14, 0.98) 100%)"
          textColor="#ffffff"
          fontSize="lg"
          enableBlur={true}
          animationDuration={0.8}
          staggerDelay={0.06}
        />
      </div>
      <div className="portfolio">
        <main className="tab-panels">
          {activeTab === 'about' && (
            <div className="tab-panel">
              <Hero />
              <EngineeringThesis />
              <Experience />
              <Education />
            </div>
          )}
          {activeTab === 'projects' && (
            <div className="tab-panel">
              <Projects />
            </div>
          )}
          {activeTab === 'system-design' && (
            <div className="tab-panel">
              <SystemDesign />
            </div>
          )}
          {activeTab === 'proficiencies' && (
            <div className="tab-panel">
              <Proficiencies />
            </div>
          )}
          {activeTab === 'contact' && (
            <div className="tab-panel">
              <Contact />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
