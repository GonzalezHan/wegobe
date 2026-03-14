# v4 Documentation

`v4` 랜딩 페이지를 다른 프로젝트로 옮겨 재사용할 때 참고할 수 있도록 만든 문서 세트입니다.

## 문서 목록

- `scroll-structure.md`
  현재 `v4`의 전체 스크롤 흐름, 각 스크롤 번호, 연결 컴포넌트, 전환 구조 정리
- `component-list.md`
  주요 컴포넌트 역할, props, 의존 관계, 재사용 시 수정 포인트 정리
- `copywriting.md`
  실제 화면에 노출되는 핵심 카피, 카드 문구, 모달 탭 문구 정리
- `reuse-checklist.md`
  다른 프로젝트 폴더로 복사할 때 필요한 파일, 자산, 검수 순서 체크리스트

## 루트 구조

- `src/App.jsx`
  전체 스크롤 순서를 조립하는 메인 엔트리
- `src/components/intro/StartIntro.jsx`
  첫 진입 인트로
- `src/components/phase1/*`
  Scroll 1~3
- `src/components/phase2/GasIntro.jsx`
  Scroll 4
- `src/components/phase3/Phase3.jsx`
  Scroll 5~7
- `src/components/phase4/*`
  Scroll 8~9
- `src/components/phase5/*`
  Scroll 10~12

## 주요 정적 자산

- `public/gas_test.mov`
  Scroll 8 Weekly Issue 모달의 `4. DEMO Live` 영상
- `public/wegobe-bot.svg`
  Scroll 7 알림 팝업 봇 아이콘
- `public/terius.png`
- `public/gerrard.png`
- `public/gonzalez.png`
- `public/mark.png`
- `public/woody.png`
  Scroll 9 인터뷰 섹션 아바타 이미지

## 빠른 재사용 포인트

1. `src/components`와 `public` 자산을 같이 옮깁니다.
2. `src/App.jsx`의 조립 순서를 유지합니다.
3. 컬러/카피/사례 데이터는 각 phase 내부 상수부터 교체합니다.
4. 옮긴 뒤 반드시 `npm run build`로 전환 타이밍과 자산 경로를 확인합니다.
