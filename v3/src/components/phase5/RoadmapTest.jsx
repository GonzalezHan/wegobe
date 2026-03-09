import { motion } from 'framer-motion';
import { Flag, Rocket, ShieldCheck, Zap, FileSpreadsheet, LineChart, RefreshCw } from 'lucide-react';

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
              우리가 그리는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">내일</span>
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
        <div className="w-full lg:w-1/2 h-[500px] flex items-center justify-center relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden glass-panel">
          
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl mix-blend-screen translate-x-10 translate-y-10" />
          </div>

          <div className="relative z-10 w-full max-w-md h-full flex flex-col items-center justify-center gap-12">
            
            {/* Input Files */}
            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-20 bg-green-900/40 border border-green-500/30 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm"
                >
                  <FileSpreadsheet className="text-green-400" size={32} />
                </motion.div>
              ))}
            </div>

            {/* Processing core */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/50" />
              </motion.div>
              
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] z-10 relative">
                <RefreshCw className="text-white" size={40} />
              </div>

              {/* Data stream dots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex justify-center -z-10 pointer-events-none">
                 <motion.div 
                   animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 bg-blue-500/20 rounded-full"
                 />
              </div>
            </div>

            {/* Output Dashboards */}
            <motion.div
              animate={{ 
                y: [5, -5, 5],
                boxShadow: ['0 10px 30px rgba(0,0,0,0.2)', '0 20px 40px rgba(59,130,246,0.3)', '0 10px 30px rgba(0,0,0,0.2)']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-64 bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-3">
                <LineChart className="text-blue-400" size={24} />
                <div className="h-2 w-24 bg-white/20 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="h-16 bg-blue-500/20 rounded-lg flex items-end p-2 border border-blue-500/20">
                  <motion.div className="w-full bg-blue-500 rounded-t-sm" animate={{ height: ['40%', '80%', '60%', '100%'] }} transition={{ duration: 5, repeat: Infinity }} />
                </div>
                <div className="h-16 bg-purple-500/20 rounded-lg flex items-end p-2 border border-purple-500/20">
                  <motion.div className="w-full bg-purple-500 rounded-t-sm" animate={{ height: ['70%', '50%', '90%', '60%'] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
                </div>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full mb-2" />
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RoadmapTest;
