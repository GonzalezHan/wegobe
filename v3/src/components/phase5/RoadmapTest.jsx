import { motion } from 'framer-motion';
import { Flag, Rocket, ShieldCheck, Zap, FileSpreadsheet, LineChart, RefreshCw, Server, Cloud } from 'lucide-react';

const phases = [
  {
    phase: "Phase 1: 기반 구축",
    title: "단순 수작업 제로화",
    description: "각 파트별 단순 반복적인 엑셀 취합 및 이메일 발송 작업을 100% 자동화합니다.",
    icon: Zap,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    phase: "Phase 2: 고도화",
    title: "외부 시스템 완벽 연동",
    description: "내부 ERP 및 외부 금융 API 실시간 연동을 통해 데이터의 정합성과 무결성을 확보합니다.",
    icon: ShieldCheck,
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    phase: "Phase 3: 혁신",
    title: "예측 분석 및 리포팅 플랫폼",
    description: "단순 통계를 넘어 AI 기반의 재무 예측 모델을 결합한 스마트 대시보드를 전 부서에 배포합니다.",
    icon: Rocket,
    color: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  {
    phase: "Phase 4: 내재화",
    title: "전사적 자동화 문화 확산",
    description: "재무 부서를 넘어 타 부서에도 자동화 성공 사례를 전파하고, 시민 개발자(Citizen Developer)를 양성합니다.",
    icon: Flag,
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
  }
];

const RoadmapTest = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-8 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 items-center">
        
        {/* LEFT: 2x2 Grid */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              우리가 그리는 <span className="text-white">내일</span>
            </h2>
            <p className="opacity-70 text-lg">TF의 최종 목표는 부서 전체의 체질 개선입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {phases.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all bg-white/5 relative overflow-hidden group"
                >
                  <div className="absolute -inset-4 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: item.color.includes('blue') ? '#3b82f6' : item.color.includes('purple') ? '#a855f7' : item.color.includes('green') ? '#22c55e' : '#f97316' }} />
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-full border mb-4 ${item.color}`}>
                    <Icon size={14} />
                    <span>{item.phase}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="opacity-70 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Automation Animation */}
        <div className="w-full lg:w-1/2 h-[500px] flex items-center justify-center relative bg-transparent rounded-3xl overflow-hidden">
          
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl mix-blend-screen translate-x-10 translate-y-10" />
          </div>

          <div className="relative z-10 w-full max-w-md h-full flex flex-col items-center justify-center">
            
            {/* Top API Sources */}
            <div className="absolute top-8 left-0 right-0 flex justify-between px-4 z-20">
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Server className="text-indigo-400" size={28} />
                </div>
                <span className="text-[11px] font-bold text-indigo-300 bg-indigo-900/50 px-2 py-1 rounded-md border border-indigo-500/20">내부 ERP 연동</span>
                
                {/* Data Packets flowing to center */}
                <motion.div
                  animate={{ y: [0, 100], x: [0, 80], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-16 left-12 w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                />
              </motion.div>

              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Cloud className="text-teal-400" size={28} />
                </div>
                <span className="text-[11px] font-bold text-teal-300 bg-teal-900/50 px-2 py-1 rounded-md border border-teal-500/20">외부 금융 API</span>
                
                {/* Data Packets flowing to center */}
                <motion.div
                  animate={{ y: [0, 100], x: [0, -80], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute top-16 right-12 w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                />
              </motion.div>
            </div>

            {/* Middle: Input Files & Core */}
            <div className="flex flex-row items-center justify-center gap-6 mt-16 z-10 w-full px-8">
              {/* Input Files */}
              <div className="flex flex-col gap-3">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ x: [0, 5, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                    className="w-12 h-14 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm relative"
                  >
                    <FileSpreadsheet className="text-green-400" size={20} />
                    {/* Packet flowing right */}
                    <motion.div
                      animate={{ x: [0, 30], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.7 }}
                      className="absolute top-1/2 -translate-y-1/2 -right-2 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)] z-0"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Processing core */}
              <div className="relative mx-auto shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center -m-4"
                >
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/40" />
                </motion.div>
                
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.6)] z-20 relative">
                  <RefreshCw className="text-white" size={40} />
                </div>
              </div>
              
              <div className="w-12 opacity-0 shrink-0" /> {/* Spacer to balance flex */}
            </div>

            {/* Output Dashboards (Bottom) */}
            <div className="mt-8 w-full flex justify-center z-10">
              <motion.div
                animate={{ y: [5, -5, 5], boxShadow: ['0 10px 30px rgba(0,0,0,0.3)', '0 20px 40px rgba(59,130,246,0.3)', '0 10px 30px rgba(0,0,0,0.3)'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-64 bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl relative"
              >
                 {/* Packets flowing from core to dashboard */}
                 <motion.div
                    animate={{ y: [-30, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(192,132,252,1)]"
                 />

                <div className="flex items-center gap-3 mb-4 border-b border-slate-700/50 pb-3">
                  <LineChart className="text-blue-400" size={22} />
                  <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="h-16 bg-blue-500/10 rounded-lg flex items-end p-2 border border-blue-500/20">
                    <motion.div className="w-full bg-blue-500/80 rounded-t-sm" animate={{ height: ['40%', '80%', '60%', '100%'] }} transition={{ duration: 5, repeat: Infinity }} />
                  </div>
                  <div className="h-16 bg-purple-500/10 rounded-lg flex items-end p-2 border border-purple-500/20">
                    <motion.div className="w-full bg-purple-500/80 rounded-t-sm" animate={{ height: ['70%', '50%', '90%', '60%'] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full mb-2" />
                <div className="h-2 w-2/3 bg-white/5 rounded-full" />
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default RoadmapTest;
