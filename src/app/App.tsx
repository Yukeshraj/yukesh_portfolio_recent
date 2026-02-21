import React, { useState } from 'react';
import { AIChatHero } from './components/AIChatHero';
import { IntroSplash } from './components/IntroSplash';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="font-sans antialiased">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroSplash key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <AIChatHero key="hero" />
        )}
      </AnimatePresence>
    </div>
  );
}
