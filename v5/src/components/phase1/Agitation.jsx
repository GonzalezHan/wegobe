import { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { AlertTriangle, Database, ArrowRightLeft, Loader, UploadCloud, DownloadCloud, FileText, User, Zap, ArrowRight, BarChart2 } from 'lucide-react';

const CARDS = [
  {
    id: 1,
    icon: <ArrowRightLeft className="w-6 h-6 text-blue-400" />,
    title: "파편화된 업무 환경",
    desc: "원하는 파일 하나를 생성하기 위해 서로 연동되지 않는 툴들 사이에서 창을 수십 번 오고가는 ‘디지털 노가다’가 발생하고 있습니다."
  },
  {
    id: 2,
    icon: <Database className="w-6 h-6 text-purple-400" />,
    title: "방대한 데이터",
    desc: "처리할 데이터 양은 시간이 지날수록 늘어나고 있지만 우리의 처리 방식은 데이터를 따라가지 못하고 있습니다."
  },
  {
    id: 3,
    icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    title: "본질이 전도된 업무 구조",
    desc: "분석과 전략을 위해 필요한 데이터 가공을 시스템이 아닌 사람이 대신하고 있습니다."
  }
];

const CardItem = ({ card, idx, activeCard }) => {
  const isActive = activeCard === idx;

  return (
    <motion.div 
      className={`border rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-700 ease-in-out relative overflow-hidden ${
        isActive 
          ? "bg-[#1f1f2e] border-blue-500/50 scale-[1.02]" 
          : "bg-[#111111] border-white/10 scale-100 hover:bg-[#1a1a1a]"
      }`}
    >
      {isActive && (
         <motion.div 
           layoutId="activeCardHighlight"
           className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 pointer-events-none"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.8 }}
         />
      )}
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div className={`p-3 rounded-xl border ${isActive ? 'bg-blue-900/30 border-blue-500/50' : 'bg-white/5 border-white/5'}`}>
          {card.icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-100">{card.title}</h3>
      </div>
      <p className="text-sm md:text-base leading-relaxed font-medium break-keep relative z-10 text-white/90">
        {card.desc}
      </p>
    </motion.div>
  );
};

// ------ UI Components for Scene 1 ------
const DocumentWindow = ({ top, left, right, bottom, width, height, delay, title, colorClass }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: [0, 1, 1, 0, 0], scale: [0.8, 1, 1, 0.9, 0.8], y: [20, 0, 0, -10, 20] }}
    transition={{ 
      duration: 8, 
      delay, 
      repeat: Infinity,
      times: [0, 0.1, 0.8, 0.9, 1] // pop up fast, stay long, fade out fast, stay hidden
    }}
    className="absolute bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-slate-700 pointer-events-none z-10"
    style={{ top, left, right, bottom, width, height }}
  >
    <div className={`${colorClass} h-5 flex items-center px-2 shadow-sm`}>
      <div className="text-[9px] text-white font-semibold">{title}</div>
    </div>
    <div className="bg-slate-100 h-4 border-b border-slate-200 flex items-center px-1 gap-1">
      <div className="w-10 h-2 bg-slate-300 rounded-sm"></div>
      <div className="w-6 h-2 bg-slate-200 rounded-sm"></div>
      <div className="w-8 h-2 bg-slate-200 rounded-sm"></div>
    </div>
    <div className="p-1 grid grid-cols-4 gap-px bg-slate-200 h-full">
       {[...Array(16)].map((_, i) => (
         <div key={i} className="bg-white p-1">
           {i % 4 === 0 ? <div className="h-1 bg-slate-300 rounded px-1" /> : <div className="h-1 bg-slate-100 rounded" />}
         </div>
       ))}
    </div>
  </motion.div>
);

const MessengerBubble = ({ isRight, text, top, left, right, bottom, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, originX: isRight ? 1 : 0, originY: 1 }}
    animate={{ opacity: [0, 1, 1, 0, 0], scale: [0.6, 1, 1, 0.5, 0.6] }}
    transition={{ 
      duration: 6, 
      delay, 
      repeat: Infinity,
      times: [0, 0.15, 0.8, 0.9, 1] 
    }}
    className={`absolute rounded-2xl shadow-xl flex items-center justify-center p-3 z-20 pointer-events-none ${
      isRight 
        ? 'bg-blue-500 rounded-br-none border border-blue-600' 
        : 'bg-yellow-300 rounded-bl-none border border-yellow-400'
    }`}
    style={{ top, left, right, bottom }}
  >
    <div className={`text-[12px] font-bold whitespace-nowrap ${isRight ? 'text-white' : 'text-slate-800'}`}>
      {text}
    </div>
  </motion.div>
);

const TypingBubble = ({ top, left, right, bottom, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, originX: 0, originY: 1 }}
    animate={{ opacity: [0, 1, 1, 0, 0], scale: [0.6, 1, 1, 0.5, 0.6] }}
    transition={{ 
      duration: 4, 
      delay, 
      repeat: Infinity,
      times: [0, 0.2, 0.8, 0.9, 1] 
    }}
    className="absolute bg-yellow-300 rounded-2xl rounded-bl-none shadow-xl border border-yellow-400 flex items-center justify-center p-3 z-30 pointer-events-none"
    style={{ top, left, right, bottom }}
  >
    <div className="flex gap-1.5 items-center">
      <motion.div className="w-1.5 h-1.5 bg-yellow-700/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
      <motion.div className="w-1.5 h-1.5 bg-yellow-700/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
      <motion.div className="w-1.5 h-1.5 bg-yellow-700/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
    </div>
  </motion.div>
);

const FileTransferBox = ({ type, title, top, left, right, bottom, delay }) => {
  const isUpload = type === 'upload';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: [0, 1, 1, 0, 0], y: [20, 0, 0, -10, 20] }}
      transition={{ 
        duration: 7, 
        delay, 
        repeat: Infinity,
        times: [0, 0.1, 0.8, 0.9, 1] 
      }}
      className="absolute bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-200 p-2 z-40 pointer-events-none flex flex-col gap-2 w-40"
      style={{ top, left, right, bottom }}
    >
      <div className="flex items-center gap-2">
         {isUpload ? <UploadCloud className="w-4 h-4 text-blue-500" /> : <DownloadCloud className="w-4 h-4 text-emerald-500" />}
         <span className="text-[10px] font-bold text-slate-700 truncate">{title}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${isUpload ? 'bg-blue-500' : 'bg-emerald-500'}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, delay: delay + 0.5, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>
      <div className="text-[8px] text-slate-400 text-right">{isUpload ? '업로드 중...' : '다운로드 중...'}</div>
    </motion.div>
  );
};

// Scene 1: Fragmented Work (Multiple Windows & Live Typing)
const Scene1 = () => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
  >
    {/* Intertwined chaos background lines */}
    <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="xMidYMid meet">
       <defs>
          <linearGradient id="chaosPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
       </defs>
       <path d="M -100 150 Q 300 300, 900 200" fill="none" stroke="url(#chaosPulse)" strokeWidth="4" strokeDasharray="10 10" />
       <path d="M 150 700 Q 400 300, 500 -100" fill="none" stroke="url(#chaosPulse)" strokeWidth="4" strokeDasharray="10 10" />
       <path d="M 650 700 Q 600 200, -100 100" fill="none" stroke="url(#chaosPulse)" strokeWidth="4" strokeDasharray="10 10" />
    </svg>

    {/* Windows popping up - More variety and faster staggered delays */}
    <DocumentWindow top="5%" left="5%" width={140} height={100} delay={0.1} title="1분기_raw_data.xlsx" colorClass="bg-[#217346]" />
    <DocumentWindow top="20%" right="10%" width={160} height={110} delay={0.3} title="사업계획서_초안.pptx" colorClass="bg-[#B7472A]" />
    <DocumentWindow bottom="35%" left="10%" width={150} height={110} delay={0.5} title="회의록_정리.docx" colorClass="bg-[#1A73E8]" />
    <DocumentWindow bottom="10%" right="15%" width={180} height={130} delay={0.7} title="통합_ERP_대시보드" colorClass="bg-[#333333]" />
    <DocumentWindow top="35%" left="30%" width={150} height={100} delay={0.9} title="전체_통합본_v3.xlsx" colorClass="bg-[#217346]" />
    <DocumentWindow top="55%" right="35%" width={130} height={90} delay={1.2} title="비용청구서_양식.pdf" colorClass="bg-[#E5252A]" />

    {/* File Transfers */}
    <FileTransferBox type="download" title="첨부파일_모음.zip" top="15%" right="35%" delay={1.5} />
    <FileTransferBox type="upload" title="취합본_수정12.xlsx" bottom="20%" left="35%" delay={2.8} />

    {/* Messengers */}
    <TypingBubble top="20%" left="20%" delay={0.4} />
    <MessengerBubble isRight={true} text='"파일 어디있나요?"' bottom="45%" right="25%" delay={1.1} />
    <TypingBubble bottom="25%" right="40%" delay={1.4} />
    <MessengerBubble isRight={false} text='"또 수정사항 접수요ㅠㅠ"' bottom="15%" left="30%" delay={2.0} />
    <MessengerBubble isRight={true} text='"ERP 권한이 없어요"' top="30%" right="5%" delay={3.5} />
  </motion.div>
);

// Scene 2: Data Overload (Data particles rushing and bottling up)
const Scene2 = () => {
    const dataNodes = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: -50 - Math.random() * 200,
      y: 100 + Math.random() * 400,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2
    }));

    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
        className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center justify-center"
      >
        <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path d="M 0 300 Q 300 300, 450 300" fill="none" stroke="#475569" strokeWidth="180" strokeOpacity="0.2" strokeLinecap="round" />
            <path d="M 450 300 L 800 300" fill="none" stroke="#475569" strokeWidth="30" strokeOpacity="0.4" strokeLinecap="round" />
            
            {/* Simulate data particles rushing towards the funnel */}
            {dataNodes.map((node) => (
              <motion.circle
                key={`data-${node.id}`}
                r={node.size}
                fill="#a855f7"
                filter="url(#glow2)"
                initial={{ cx: node.x, cy: node.y, opacity: 0 }}
                animate={{ 
                  cx: [node.x, 350 + Math.random() * 80, 430 + Math.random() * 20], // Rush to funnel, get stuck
                  cy: [node.y, 230 + Math.random() * 140, 280 + Math.random() * 40], 
                  opacity: [0, 1, 0.8] 
                }}
                transition={{
                    cx: { duration: node.duration, ease: "easeOut", repeat: Infinity, delay: node.delay },
                    cy: { duration: node.duration, ease: "easeOut", repeat: Infinity, delay: node.delay },
                    opacity: { duration: node.duration, repeat: Infinity, delay: node.delay }
                }}
              />
            ))}
        </svg>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="relative z-10 text-purple-200 text-sm md:text-base font-bold bg-rose-900/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-rose-500/50 shadow-2xl flex items-center gap-2 mt-48"
        >
          <Loader className="w-5 h-5 animate-spin" /> Data Bottleneck
        </motion.div>
      </motion.div>
    );
};

// Helper component for live typing effect in Scene 3
const FORMULAS = [
  "VLOOKUP(A2, 'Raw Data'!A:Z, 5, FALSE)",
  "SUMIFS(Sales!C:C, Sales!A:A, \">=\"&DATE(2025,1,1))",
  "INDIRECT(\"'\"&B1&\"'!C:C\")",
  "IFERROR(INDEX(Data!B:B, MATCH(A2, Data!A:A, 0)), \"N/A\")",
  "PV(0.05/12, 60, -500000, 0, 0)",
  "FV(0.04/12, 120, -1000000)",
  "XLOOKUP(D5, Employee!A:A, Employee!F:F, \"Not Found\", 0, 1)",
  "SUMPRODUCT(--(MONTH(A2:A100)=1), B2:B100)",
  "INDEX(MatchData!$C$2:$C$1000, MATCH(1, (MatchData!$A$2:$A$1000=A2)*(MatchData!$B$2:$B$1000=B2), 0))"
];

const LiveTypingFormulas = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let charIndex = 0;
    const formula = FORMULAS[currentIdx];
    setDisplayText("");
    
    const startTyping = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (charIndex < formula.length) {
          setDisplayText(formula.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentIdx((prev) => (prev + 1) % FORMULAS.length);
          }, 1500); 
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }, 150);

    return () => clearTimeout(startTyping);
  }, [currentIdx]);

  return (
    <div className="font-mono text-[11px] md:text-sm text-green-400 font-bold whitespace-nowrap overflow-hidden">
      <span>=</span>{displayText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        |
      </motion.span>
    </div>
  );
};

// Scene 3: Labor vs Insight (DB -> Person -> Insight)
const Scene3 = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center"
    >
      <div className="w-full h-full flex flex-col items-center justify-between py-12 px-8">
        
        {/* Top: 3 Nodes (DB - Person - Insight) - Moved higher */}
        <motion.div 
          className="relative z-10 flex items-center justify-center gap-6 md:gap-10 mt-2"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          {/* DB Node */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md">
               <Database className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
            </div>
          </div>

          <ArrowRight className="text-white/20 w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />

          {/* Person Node */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-purple-500/10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md">
               <User className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />
            </div>
          </div>

          <motion.div 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
          >
            <ArrowRight className="text-white/20 w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
          </motion.div>

          {/* Planning/Analysis Node */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-500/10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md">
               <BarChart2 className="w-10 h-10 md:w-12 md:h-12 text-amber-400" />
            </div>
          </div>
        </motion.div>

        {/* Bottom: The Wide Excel Formulas Code Block (Live Typing) */}
        <motion.div 
          className="z-30 w-full max-w-[500px] mb-2"
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.5, type: 'spring' }}
        >
          <div className="bg-[#0b0e14]/90 border border-slate-700/60 rounded-xl p-4 shadow-2xl w-full">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/50">
               <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-500/60" />
                 <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                 <div className="w-2 h-2 rounded-full bg-green-500/60" />
               </div>
               <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">Process bottleneck</span>
            </div>
            <div className="h-10 flex items-center mb-1 px-1 overflow-hidden">
              <LiveTypingFormulas />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] md:text-xs text-red-400/90 bg-red-950/30 py-2.5 rounded-lg border border-red-500/20">
               <AlertTriangle className="w-3.5 h-3.5" />
               <span className="font-bold tracking-wide">데이터 가공에 뺏기는 소중한 시간</span>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
);

const Agitation = ({ progress }) => {
  const [activeCard, setActiveCard] = useState(0);

  // Sync activeCard with scroll progress within the 0.33 to 0.6 range
  useMotionValueEvent(progress, "change", (v) => {
    // Determine which third of the active scroll range we are in
    if (v < 0.42) setActiveCard(0);
    else if (v >= 0.42 && v < 0.48) setActiveCard(1);
    else if (v >= 0.48) setActiveCard(2);
  });

  const sectionOpacity = useTransform(progress, [0.25, 0.33, 0.6, 0.66], [0, 1, 1, 0]);
  const pointerEvents = useTransform(progress, (v) => (v < 0.25 || v > 0.66) ? "none" : "auto");

  // Keep the overall container visible earlier so cards are seen right away
  const opacity = useTransform(progress, [0.25, 0.33, 0.6, 0.66], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.25, 0.33, 0.6, 0.66], [40, 0, 0, -50]);
  
  return (
    <motion.section 
      style={{ opacity: sectionOpacity, pointerEvents }}
      className="absolute inset-0 w-full flex flex-col items-center justify-center overflow-hidden bg-white/5 backdrop-blur-sm"
    >
      <motion.div 
        style={{ opacity, y }}
        className="z-10 w-full max-w-7xl px-8 flex flex-col h-full justify-center"
      >
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-sm mb-4">
              우리의 업무는 잘 <span className="text-white">‘연결’</span> 되어 있나요?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              연결 도구의 부재가 불필요한 디지털 노동을 만들고 있습니다.
            </p>
          </motion.div>
        </div>

        {/* Content Section: 2 Columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          
          {/* Left: Text Cards Layer */}
          <div className="flex-1 flex flex-col gap-6 w-full max-w-xl">
            {CARDS.map((card, idx) => (
              <CardItem key={card.id} card={card} idx={idx} activeCard={activeCard} />
            ))}
          </div>

          {/* Right: Dynamic Animation Layer */}
          <div className="flex-1 w-full max-w-2xl aspect-[4/3] relative flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 rounded-3xl border border-slate-200/20 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeCard === 0 && <Scene1 key="scene1" />}
                  {activeCard === 1 && <Scene2 key="scene2" />}
                  {activeCard === 2 && <Scene3 key="scene3" />}
                </AnimatePresence>
             </div>
          </div>

        </div>
      </motion.div>
    </motion.section>
  );
};

export default Agitation;
