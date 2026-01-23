import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Documentation from './components/Documentation';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#0A0A0F]">
    {/* Soft Mesh Gradients */}
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px] animate-blob pointer-events-none"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none"></div>
    <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-accent/3 rounded-full blur-[100px] animate-blob animation-delay-4000 pointer-events-none"></div>

    {/* Clean Subtle Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/50 via-transparent to-[#0A0A0F]/50 pointer-events-none"></div>
  </div>
);

import Welcome from './components/Welcome';

function App() {
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen text-gray-200 selection:bg-primary selection:text-white overflow-x-hidden font-sans">
      <AnimatePresence>
        {showWelcome && <Welcome onComplete={() => setShowWelcome(false)} />}
      </AnimatePresence>

      <Background />

      {/* Global Spotlight Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 139, 250, 0.08), transparent 40%)`
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col gap-0">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Documentation />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
