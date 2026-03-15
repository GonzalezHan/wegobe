# Component List

## App Layer

### `src/App.jsx`

- 역할:
  전체 페이지 조립, 배경색/텍스트색 전환, 인트로와 본문 연결
- 주요 책임:
  - `StartIntro` 렌더링
  - `mainContentRef.scrollIntoView()` 제공
  - `Phase1`~`Phase5` 순서 조립

## Intro

### `src/components/intro/StartIntro.jsx`

- 역할:
  첫 진입 인트로 애니메이션
- props:
  - `onStart`
- 내부 상태:
  - `isStarting`
  - `isInstalled`
- 수정 포인트:
  - 브랜드명
  - 좌우 상태 텍스트
  - 폴더 이동/바운스 타이밍

## Phase 1

### `src/components/phase1/Phase1.jsx`

- 역할:
  Scroll 1~3 래퍼
- 특징:
  `300vh` sticky scene

### `src/components/phase1/Problem.jsx`

- 역할:
  문제 상황 오프닝
- 주요 요소:
  - 플로팅 윈도우 생성 상수
  - 문서/시트/슬라이드 모션
  - 중앙 헤드라인

### `src/components/phase1/Agitation.jsx`

- 역할:
  pain point 증폭
- 주요 요소:
  - `PAIN_POINTS`
  - `CHAT_MESSAGES`

### `src/components/phase1/Solution.jsx`

- 역할:
  해결 선언
- 주요 요소:
  - 상단 배지
  - 메인 해결 카피
  - 서브 카피

## Phase 2

### `src/components/phase2/GasIntro.jsx`

- 역할:
  GAS 소개
- 주요 요소:
  - `FEATURE_ITEMS`
  - `appNodes`
  - `TERMINAL_ROWS`
- 수정 포인트:
  - 상단 연결 노드 종류
  - 설명 카드 4개
  - 코드 샘플

## Phase 3

### `src/components/phase3/Phase3.jsx`

- 역할:
  입력 -> 자동화 -> 결과 시연
- 주요 요소:
  - `TypingDoc`
  - `FlyingDoc`
  - sticky 3단계 전환
  - 최종 알림 팝업
- 수정 포인트:
  - 입력 문서 제목/캡션
  - 버튼 라벨
  - 대시보드 숫자
  - 봇 알림 카피

## Phase 4

### `src/components/phase4/Phase4.jsx`

- 역할:
  Scroll 8~9 래퍼

### `src/components/phase4/Cases.jsx`

- 역할:
  사례 카드 4개 + 모달
- 주요 데이터:
  - `cases`
  - `PEOPLE_TUTORIALS`
  - `PEOPLE_CODE_LINES`
  - `PEOPLE_LOG_LINES`
  - `PEOPLE_STATUS_STEPS`
  - `PEOPLE_OUTPUT_SECTIONS`
  - `PEOPLE_OUTPUT_ITEMS`
- 현재 특이사항:
  - 첫 카드만 클릭 가능
  - `gas_test.mov` 사용
  - 영상 재생 시 전체화면 진입 시도

### `src/components/phase4/Interviews.jsx`

- 역할:
  인터뷰/코멘트 섹션
- 주요 데이터:
  - `leader`
  - `members`

## Phase 5

### `src/components/phase5/Phase5.jsx`

- 역할:
  Scroll 10~12 래퍼

### `src/components/phase5/Roadmap.jsx`

- 역할:
  로드맵 카드 4개
- 주요 데이터:
  - `phases`

### `src/components/phase5/CallToAction.jsx`

- 역할:
  최종 가치 제안 카피 + 라인 차트

### `src/components/phase5/ContactUs.jsx`

- 역할:
  아이디어 제안 CTA
- 주요 요소:
  - 2줄 헤드라인
  - 외부 링크 버튼

### `src/components/phase5/RoadmapTest.jsx`

- 역할:
  해시 `#test-roadmap`로 여는 로컬 테스트 화면

## Public Asset 의존성

- `public/gas_test.mov`
- `public/wegobe-bot.svg`
- `public/terius.png`
- `public/gerrard.png`
- `public/gonzalez.png`
- `public/mark.png`
- `public/woody.png`
