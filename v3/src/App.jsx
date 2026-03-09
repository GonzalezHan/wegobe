
import { motion, useScroll, useTransform } from 'framer-motion';

// Part 1
import Phase1 from './components/phase1/Phase1';

// Part 2
import GasIntro from './components/phase2/GasIntro';

// Part 3
import Phase3 from './components/phase3/Phase3';

// Part 4
import Phase4 from './components/phase4/Phase4';

// Part 5
import Phase5 from './components/phase5/Phase5';
import RoadmapTest from './components/phase5/RoadmapTest';

function App() {
  const { scrollYProgress } = useScroll();

  // Background and text color transitions
  // 0.0 -> 0.15: Dark (Problem, Agitation)
  // 0.15 -> 0.22: Transition to Light (Solution)
  // 0.22 -> 0.65: Light (GasIntro, Phase3, Cases, Interviews)
  // 0.65 -> 0.75: Transition to Navy (Roadmap)
  // 0.75 -> 0.95: Navy (CallToAction, ContactUs)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.08, 0.09, 0.65, 0.75, 0.90, 0.95], 
    ['#0a0a0a', '#ffffff', '#ffffff', '#284283', '#284283', '#284283'] 
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0.08, 0.09, 0.65, 0.75, 0.90, 0.95],
    ['#cecece', '#0f172a', '#0f172a', '#cecece', '#cecece', '#ffffff']
  );

  // Simple routing for test page
  if (typeof window !== 'undefined' && window.location.hash === '#test-roadmap') {
    return <RoadmapTest />;
  }

  return (
    <motion.div 
      style={{ backgroundColor, color: textColor }} 
      className="font-sans min-h-screen transition-colors duration-500"
    >
      <Phase1 />
      
      <GasIntro />
      
      <Phase3 />

      
      <Phase4 />
      
      <Phase5 />
    </motion.div>
  );
}

export default App;
