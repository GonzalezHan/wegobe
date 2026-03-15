import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  LayoutDashboard,
  Play,
  TrendingUp,
  X,
} from 'lucide-react';

const cases = [
  {
    id: 'people-ops',
    category: 'Issue Analysis',
    title: '시너지지원 Weekly Issue',
    description: '약 10개의 구글독스 Weekly Issue를 자동 취합하고, 제미나이 요약을 더해 마스터 독스에 최종 분석 보고서를 생성합니다.',
    highlight: '문서 취합과 요약 분석 자동화',
    accent: 'from-amber-400 to-orange-500',
    tags: ['Google Docs', 'Gemini', 'Master Docs'],
    metrics: [
      { label: '원본 문서 수', value: '약 10개', icon: TrendingUp, color: 'text-blue-600' },
      { label: '최종 보고서', value: '1개', icon: CheckCircle2, color: 'text-green-600' },
    ],
    demoTitle: '시연 화면 04. Weekly Issue 취합 분석',
    demoSubtitle: '각사 Weekly Issue 문서를 모아 Key Issue Summary, Executive Summary, Weekly Issue 구조의 최종 분석 보고서를 생성하는 흐름',
    demo: {
      type: 'people',
      chips: ['Google Docs 수집', 'Gemini 요약', '마스터 독스 생성', '최종 보고서 공유'],
    },
  },
  {
    id: 'finance-ops',
    category: 'Finance Ops',
    title: '모달창 팝업 테스트(클릭)',
    description: '각 파트에서 개별적으로 작성하던 엑셀 데이터를 GAS를 통해 하나의 시트로 자동 병합 및 검증합니다.',
    highlight: '보고 전 취합 공수 대폭 절감',
    accent: 'from-sky-500 to-blue-600',
    tags: ['Sheets', 'Docs', 'Validation'],
    metrics: [
      { label: '단축 시간', value: '월 40시간', icon: Clock, color: 'text-blue-600' },
      { label: '오류율 감소', value: '95%', icon: TrendingUp, color: 'text-green-600' },
    ],
    demoTitle: '시연 화면 01. 결산 데이터 자동 취합',
    demoSubtitle: '부서별 원본 시트가 실시간으로 하나의 마스터 결산 보드로 병합되는 흐름',
    demo: {
      type: 'finance',
      chips: ['파트별 시트 감지', '중복 행 제거', '오류값 검증', '마스터 반영'],
    },
  },
  {
    id: 'workflow',
    category: 'Workflow',
    title: '비용 정산 알림 봇',
    description: '구글 폼으로 접수된 비용 정산 내역을 파악하여, 이메일과 구글 챗으로 자동 승인/반려 알림을 전송합니다.',
    highlight: '승인 리드타임 단축',
    accent: 'from-emerald-400 to-teal-500',
    tags: ['Forms', 'Mail', 'Chat'],
    metrics: [
      { label: '처리 대기 시간', value: '-3일', icon: Clock, color: 'text-blue-600' },
      { label: '누락 방지', value: '100%', icon: CheckCircle2, color: 'text-green-600' },
    ],
    demoTitle: '시연 화면 02. 비용 정산 알림 워크플로우',
    demoSubtitle: '폼 제출부터 승인 상태 알림까지 자동으로 이어지는 운영 흐름',
    demo: {
      type: 'workflow',
      chips: ['폼 제출', '승인자 탐색', '메일 발송', '챗 알림'],
    },
  },
  {
    id: 'external-data',
    category: 'External Data',
    title: '환율 데이터 자동 스크래핑',
    description: '매일 고시되는 환율 정보를 자동으로 읽어와 내부 데이터베이스 시트에 기록하고 변동 추이를 리포팅합니다.',
    highlight: '실시간 지표 업데이트',
    accent: 'from-violet-500 to-fuchsia-500',
    tags: ['API', 'Database', 'Reporting'],
    metrics: [
      { label: '휴먼 에러', value: '0', icon: AlertTriangle, color: 'text-amber-500' },
      { label: '데이터 최신성', value: '실시간', icon: Activity, color: 'text-purple-600' },
    ],
    demoTitle: '시연 화면 03. 환율 데이터 자동 수집',
    demoSubtitle: '외부 소스에서 읽은 환율 데이터가 내부 표준 포맷으로 정리되는 흐름',
    demo: {
      type: 'external',
      chips: ['외부 API 호출', '데이터 정규화', '변동률 계산', '리포트 반영'],
    },
  },
];

const PEOPLE_TUTORIALS = [
  {
    id: 'painpoint',
    label: '페인포인트 정의',
    helper: '매주 10여 개의 개별 구글독스로 흩어져 작성되는 Weekly Issue의 수동 취합 및 요약 부재 문제를 정의합니다.',
    chips: ['문서 파편화', '요약 공수 과다', '보고 지연'],
    stats: [
      ['취합 문서', '10개+'],
      ['소요 시간', '주 4시간'],
      ['분석 수준', '단순 나열'],
    ],
  },
  {
    id: 'analysis',
    label: '업무 분석',
    helper: '각사별 문서 구조를 파악하고, 제미나이(Gemini)를 통한 핵심 이슈 추출 및 요약 로직을 분석합니다.',
    chips: ['문서 구조화', 'Gemini 프롬프트', '요약 알고리즘'],
    stats: [
      ['추출 섹션', '3개'],
      ['요약 레벨', 'Executive'],
      ['언어 모델', 'Gemini Pro'],
    ],
  },
  {
    id: 'code',
    label: '코드 설계·구현',
    helper: 'DriveApp과 DocumentApp을 연동하여 문서를 수집하고, Gemini API로 요약을 생성하는 GAS 스크립트를 구현합니다.',
    chips: ['DriveApp', 'DocumentApp', 'Gemini API'],
    stats: [
      ['GAS 코드', '180 lines'],
      ['API 호출', 'Vertex AI/Gemini'],
      ['자동화 수준', 'Full-Auto'],
    ],
  },
  {
    id: 'validation',
    label: '결과 검증',
    helper: '생성된 마스터 보고서의 요약 정확도와 문서 병합 상태를 최종 검증하여 보고 품질을 확보합니다.',
    chips: ['요약 정합성', '문서 레이아웃', '공유 자동화'],
    stats: [
      ['보고 품질', '상향'],
      ['취합 오류', '0건'],
      ['공수 절감', '90%'],
    ],
  },
  {
    id: 'demo',
    label: 'Live Demo',
    helper: '실제 문서 취합부터 제미나이 요약, 마스터 독스 생성까지의 전 과정을 시연 영상으로 확인합니다.',
    chips: ['Screen Recording', 'Runtime Flow', 'Final Output'],
    stats: [
      ['데모 타입', '실제 녹화'],
      ['포함 구간', '실행 전 과정'],
      ['출력 결과', '최종 보고서'],
    ],
  },
];

const PEOPLE_CODE_LINES = [
  'function buildWeeklyIssueReport() {',
  '  const docs = collectWeeklyDocs(sourceFolders);',
  '  const merged = mergeCompanyIssues(docs);',
  '  const keySummary = summarizeTopIssuesWithGemini(merged, 5);',
  '  const executive = summarizeByCompanyWithGemini(merged);',
  '  writeMasterDoc({ keySummary, executive, merged });',
  '}',
];

const PEOPLE_LOG_LINES = [
  '[08:00:01] trigger started: buildWeeklyIssueReport',
  '[08:00:08] source docs loaded: 10',
  '[08:00:17] Gemini connected: Analyzing content...',
  '[08:00:26] Gemini generated: Executive Summary',
  '[08:00:38] master docs updated and shared',
];

const PEOPLE_STATUS_STEPS = [
  '원본 구글독스 수집',
  '회사별 이슈 병합',
  '제미나이 요약 생성',
  '마스터 독스 작성',
];

const PEOPLE_OUTPUT_ITEMS = [
  'Key Issue Summary 5개 자동 생성',
  '각사 Executive Summary 자동 생성',
  'Weekly Issue 원문 취합 및 정렬',
  '마스터 독스 최종 보고서 공유',
];

const FINANCE_TUTORIALS = [
  {
    id: 'painpoint',
    label: '페인포인트 정의',
    helper: '매월 각 파트에서 개별적으로 작성하는 엑셀 시트의 파편화로 인해 발생하는 비효율을 정의합니다.',
    chips: ['데이터 파편화', '수동 취합 공수', '휴먼 에러'],
    stats: [
      ['취합 시간', '월 40시간'],
      ['참여 인원', '12명'],
      ['데이터 원본', 'Excel/Sheets'],
    ],
  },
  {
    id: 'analysis',
    label: '업무 분석',
    helper: '기존의 복잡한 데이터 수집 및 정규화 과정을 분석하여 자동화 가능한 로직을 도출합니다.',
    chips: ['데이터 흐름도', '정규화 규칙', '검증 프로세스'],
    stats: [
      ['분석 단계', '4단계'],
      ['필수 항목', '24개'],
      ['데이터 볼륨', '1,200+ rows'],
    ],
  },
  {
    id: 'code',
    label: '코드 설계·구현',
    helper: '각 파트별 개별 시트 데이터를 감지하고 마스터 결산 보드로 병합하는 GAS 로직을 설계하고 구현합니다.',
    chips: ['SpreadsheetApp', 'Trigger', 'Normalization'],
    stats: [
      ['GAS 코드', '150 lines'],
      ['API 활용', 'Sheets API'],
      ['실행 주기', '실시간/Triggers'],
    ],
  },
  {
    id: 'validation',
    label: '결과 검증',
    helper: '자동 취합된 데이터의 정확도와 정합성을 최종 검증하여 데이터 신뢰성을 확보합니다.',
    chips: ['무결성 검사', '수치 대조', '자동 리포팅'],
    stats: [
      ['데이터 정확도', '99.9%'],
      ['오류 감소율', '95%'],
      ['검증 시간', '5분 미만'],
    ],
  },
  {
    id: 'demo',
    label: 'Live Demo',
    helper: '준비 중인 시연 화면입니다.',
    chips: ['Coming Soon'],
    stats: [
      ['상태', '준비 중'],
    ],
  },
];

const FINANCE_CODE_LINES = [
  'function consolidateFinanceData() {',
  '  const masterSheet = SpreadsheetApp.getActive().getSheetByName("Master");',
  '  const sourceSheets = getSourceSheets();',
  '  sourceSheets.forEach(sheet => {',
  '    const data = sheet.getDataRange().getValues();',
  '    const cleaned = validateAndClean(data);',
  '    appendDataToMaster(masterSheet, cleaned);',
  '  });',
  '}',
];

function CaseModal({ item, onClose }) {
  const [activeTutorialId, setActiveTutorialId] = useState('painpoint');
  const [typedCodeUnits, setTypedCodeUnits] = useState(0);
  const [visibleLogCount, setVisibleLogCount] = useState(0);
  const [completedStatusCount, setCompletedStatusCount] = useState(0);
  const [outputRevealCount, setOutputRevealCount] = useState(0);
  const demoVideoRef = useRef(null);

  useEffect(() => {
    if (item) {
      setActiveTutorialId('painpoint');
    }
  }, [item]);

  const isPeopleOps = item?.id === 'people-ops';
  const isFinanceOps = item?.id === 'finance-ops';
  
  const currentTutorials = isPeopleOps ? PEOPLE_TUTORIALS : isFinanceOps ? FINANCE_TUTORIALS : [];
  const currentCodeLines = isPeopleOps ? PEOPLE_CODE_LINES : isFinanceOps ? FINANCE_CODE_LINES : [];

  useEffect(() => {
    if (!item || (!isPeopleOps && !isFinanceOps)) {
      return undefined;
    }

    setTypedCodeUnits(0);
    setVisibleLogCount(0);
    setCompletedStatusCount(0);
    setOutputRevealCount(0);

    const cleanups = [];

    if (activeTutorialId === 'code') {
      const totalUnits = currentCodeLines.reduce((sum, line) => sum + line.length + 6, 0);
      const intervalId = window.setInterval(() => {
        setTypedCodeUnits((prev) => {
          if (prev >= totalUnits) {
            window.clearInterval(intervalId);
            return prev;
          }
          return prev + 2;
        });
      }, 22);
      cleanups.push(() => window.clearInterval(intervalId));
    }

    if (activeTutorialId === 'painpoint' || activeTutorialId === 'analysis' || activeTutorialId === 'validation') {
      for (let i = 0; i < 8; i++) {
        const timeoutId = window.setTimeout(() => {
          setOutputRevealCount(i + 1);
        }, 260 + i * 170);
        cleanups.push(() => window.clearTimeout(timeoutId));
      }
    }

    if (activeTutorialId === 'run') {
      const logLines = isPeopleOps ? PEOPLE_LOG_LINES : ['[Finance] Starting consolidation...', '[Finance] Validating columns...', '[Finance] Merging rows...', '[Finance] Master updated.'];
      const statusSteps = isPeopleOps ? PEOPLE_STATUS_STEPS : ['시트 감지', '데이터 클렌징', '중복 제거', '마스터 반영'];
      
      logLines.forEach((_, index) => {
        const timeoutId = window.setTimeout(() => {
          setVisibleLogCount(index + 1);
        }, 350 + index * 420);
        cleanups.push(() => window.clearTimeout(timeoutId));
      });

      statusSteps.forEach((_, index) => {
        const timeoutId = window.setTimeout(() => {
          setCompletedStatusCount(index + 1);
        }, 1400 + index * 360);
        cleanups.push(() => window.clearTimeout(timeoutId));
      });
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [activeTutorialId, item, isPeopleOps, isFinanceOps]);

  const activeTutorial =
    currentTutorials.find((tutorial) => tutorial.id === activeTutorialId) ?? currentTutorials[0];

  const handleDemoPlay = () => {
    const video = demoVideoRef.current;
    if (!video) return;
    if (document.fullscreenElement) return;
    if (typeof video.requestFullscreen === 'function') {
      video.requestFullscreen().catch(() => {});
    } else if (typeof video.webkitEnterFullscreen === 'function') {
      video.webkitEnterFullscreen();
    }
  };

  return (
    <AnimatePresence>
      {item && (isPeopleOps || isFinanceOps) ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`w-full rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_30px_100px_rgba(15,23,42,0.3)] max-w-6xl`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className={`mx-auto inline-flex rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
                  {item.category}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-6 flex flex-wrap justify-center gap-3">
              {currentTutorials.map((tutorial, index) => (
                <button
                  key={tutorial.id}
                  type="button"
                  onClick={() => setActiveTutorialId(tutorial.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    activeTutorialId === tutorial.id
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {index + 1}. {tutorial.label}
                </button>
              ))}
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between rounded-[22px] bg-slate-100 px-5 py-4">
                <div>
                  <div className="mt-1 text-lg font-bold text-slate-900">{activeTutorial?.label}</div>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#f7f8fb]">
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-300" />
                      <span className="h-3 w-3 rounded-full bg-slate-300" />
                      <span className="h-3 w-3 rounded-full bg-slate-300" />
                    </div>
                    <div className="rounded-full bg-slate-100 px-6 py-2 text-sm font-semibold text-slate-500">
                      {activeTutorial?.label}
                    </div>
                    <div className="text-sm font-semibold text-slate-400">확장</div>
                  </div>

                  <div className="h-full pt-[72px]">
                    {activeTutorial?.id === 'code' ? (
                      <div className="grid h-full grid-cols-[220px_minmax(0,1fr)]">
                        <div className="border-r border-slate-200 bg-slate-950 p-5 text-white">
                          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-sky-300">
                            <Code2 size={16} />
                            {isFinanceOps ? 'finance-consolidation.gs' : 'weekly-issue-report.gs'}
                          </div>
                          <div className="space-y-2 text-xs text-white/55">
                            {activeTutorial.chips.map((label) => (
                              <div key={label} className="rounded-xl bg-white/5 px-3 py-2">
                                {label}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="relative p-6">
                          <div className="mb-4 flex flex-wrap gap-3">
                            {activeTutorial.chips.map((chip) => (
                              <div key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
                                {chip}
                              </div>
                            ))}
                          </div>

                          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="text-sm font-semibold text-white/80">{isFinanceOps ? '데이터 취합 스크립트' : 'Weekly Issue 분석 스크립트'}</div>
                              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">EDIT MODE</div>
                            </div>
                            <div className="space-y-2 font-mono text-[13px] leading-7 text-slate-200">
                              {currentCodeLines.map((line, idx) => (
                                <div key={idx} className="flex gap-4">
                                  <span className="w-6 text-right text-slate-500">{idx + 1}</span>
                                  <span>
                                    {(() => {
                                      const prefixUnits = currentCodeLines
                                        .slice(0, idx)
                                        .reduce((sum, currentLine) => sum + currentLine.length + 6, 0);
                                      const localUnits = Math.max(typedCodeUnits - prefixUnits, 0);
                                      const visibleChars = Math.min(localUnits, line.length);
                                      const showCursor = localUnits >= 0 && localUnits < line.length + 6;
                                      return (
                                        <>
                                          {line.slice(0, visibleChars)}
                                          {showCursor ? (
                                            <motion.span
                                              animate={{ opacity: [1, 0, 1] }}
                                              transition={{ duration: 0.8, repeat: Infinity }}
                                              className="ml-[1px] inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-cyan-300 align-middle"
                                            />
                                          ) : null}
                                        </>
                                      );
                                    })()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : activeTutorial?.id === 'demo' ? (
                      <div className="relative p-6">
                        <div className="mb-4 flex flex-wrap gap-3">
                          {activeTutorial?.chips.map((chip) => (
                            <div key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
                              {chip}
                            </div>
                          ))}
                        </div>
                        {isPeopleOps ? (
                          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-sm">
                              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-white">
                                <div className="flex items-center gap-2 text-sm font-semibold text-sky-300">
                                  <Play size={16} />
                                  Weekly Issue Demo Recording
                                </div>
                                <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">LIVE PLAYBACK</div>
                              </div>
                              <div className="bg-black p-3">
                                <video
                                  ref={demoVideoRef}
                                  className="aspect-video w-full rounded-[18px] bg-black"
                                  src="/gas_test.mov"
                                  controls
                                  playsInline
                                  preload="metadata"
                                  onPlay={handleDemoPlay}
                                />
                              </div>
                            </div>
                            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Demo Scope</div>
                              <div className="space-y-3">
                                {activeTutorial?.stats.map(([label, value]) => (
                                  <div key={label} className="rounded-2xl bg-slate-50 px-4 py-4">
                                    <div className="text-sm text-slate-500">{label}</div>
                                    <div className="mt-2 text-xl font-bold text-slate-900">{value}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center min-h-[400px]">
                            <Play size={48} className="text-slate-200 mb-4" />
                            <div className="text-xl font-bold text-slate-400">Live Demo 준비 중</div>
                            <div className="text-slate-400 mt-2">실제 시연 영상이 곧 업데이트될 예정입니다.</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative p-6">
                        <div className="mb-4 flex flex-wrap gap-3">
                          {activeTutorial?.chips.map((chip) => (
                            <div key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
                              {chip}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col items-center justify-center min-h-[400px]">
                          {activeTutorial?.id === 'painpoint' && <AlertTriangle size={48} className="text-amber-500 mb-4" />}
                          {activeTutorial?.id === 'analysis' && <TrendingUp size={48} className="text-blue-500 mb-4" />}
                          {activeTutorial?.id === 'validation' && <CheckCircle2 size={48} className="text-emerald-500 mb-4" />}
                          
                          <div className="text-xl font-bold text-slate-900">{activeTutorial?.label}</div>
                          <div className="text-slate-500 mt-2 text-center max-w-md">{activeTutorial?.helper}</div>
                          
                          <div className="mt-8 grid gap-4 md:grid-cols-3 w-full">
                             {activeTutorial?.stats.map(([label, value]) => (
                               <motion.div 
                                 key={label} 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                               >
                                 <div className="text-sm text-slate-500">{label}</div>
                                 <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
                               </motion.div>
                             ))}
                          </div>

                          {/* Render specific output reveal for validation */}
                          {activeTutorial?.id === 'validation' && (
                            <div className="mt-10 w-full">
                               <div className="grid gap-3 md:grid-cols-2">
                                  {(isPeopleOps ? PEOPLE_OUTPUT_ITEMS : ['파트별 데이터 정규화 완료', '중복 및 누락 데이터 0건', '마스터 시트 실시간 연동', '부서별 열람 권한 설정']).map((output, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: outputRevealCount > idx ? 1 : 0, x: outputRevealCount > idx ? 0 : 10 }}
                                      className="rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-800 flex items-center gap-2"
                                    >
                                      <CheckCircle2 size={16} />
                                      {output}
                                    </motion.div>
                                  ))}
                               </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const Cases = ({ progress }) => {
  const [activeCaseId, setActiveCaseId] = useState(null);
  const trackX = useTransform(progress, [0.42, 0.54], ['0%', '-22%']);
  const sectionOpacity = useTransform(progress, [0.06, 0.12, 0.46, 0.56], [0, 1, 1, 0]);
  const sectionY = useTransform(progress, [0.46, 0.56], [0, -24]);
  const sectionScale = useTransform(progress, [0.46, 0.56], [1, 0.985]);
  const railOpacity = useTransform(progress, [0.08, 0.12, 0.46, 0.54], [0, 1, 1, 0]);

  const activeCase = cases.find((item) => item.id === activeCaseId) ?? null;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveCaseId(null);
      }
    };

    if (activeCase) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [activeCase]);

  return (
    <>
      <motion.section
        style={{ opacity: sectionOpacity, y: sectionY, scale: sectionScale }}
        className="flex h-full w-full items-center overflow-hidden py-10 text-slate-900"
      >
        <div className="w-full">
          <div className="mx-auto max-w-[1560px] px-4 md:px-8">
            <div className="mb-10 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
                  우리가 만든 작은 변화들
                </h2>
                <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-600">
                  담당자들의 페인포인트는 작은 자동화 단위로 해결되었고 일부는 현업에 적용되어 운영중입니다.
                </p>
              </div>
            </div>
          </div>

          <motion.div style={{ opacity: railOpacity }} className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent md:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent md:w-32" />
            <motion.div
              style={{ x: trackX }}
              className="mx-auto flex w-max gap-6 px-4 py-3 md:gap-8 md:px-8"
            >
              {cases.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`group relative text-left ${['people-ops', 'finance-ops'].includes(item.id) ? 'cursor-pointer' : ''}`}
                onClick={['people-ops', 'finance-ops'].includes(item.id) ? () => setActiveCaseId(item.id) : undefined}
              >
                <div className={`absolute -inset-0.5 rounded-[28px] bg-gradient-to-r ${item.accent} opacity-0 blur transition duration-500 group-hover:opacity-25`} />

                <div className="relative flex h-[500px] w-[300px] flex-col rounded-[28px] border border-slate-200 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:w-[360px]">
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
                      {item.category}
                    </div>
                    <ArrowRight size={18} className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>

                  <div className={`mb-6 rounded-2xl bg-gradient-to-br ${item.accent} p-[1px]`}>
                    <div className="rounded-2xl bg-slate-950/95 px-5 py-4 text-white">
                      <div className="text-xs uppercase tracking-[0.24em] text-white/50">Impact</div>
                      <div className="mt-2 text-lg font-bold leading-snug">{item.highlight}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto space-y-4 border-t border-slate-100 pt-5">
                    {item.metrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.label} className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-slate-500">
                            <Icon size={16} className={metric.color} />
                            {metric.label}
                          </span>
                          <span className="text-lg font-bold text-slate-800">{metric.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {['people-ops', 'finance-ops'].includes(item.id) ? (
                    <div className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Click to view demo
                    </div>
                  ) : null}
                </div>
              </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <CaseModal item={activeCase} onClose={() => setActiveCaseId(null)} />
    </>
  );
};

export default Cases;
