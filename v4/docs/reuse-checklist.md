# Reuse Checklist

다른 프로젝트 폴더로 `v4` 구조를 옮길 때의 체크리스트입니다.

## 1. 반드시 같이 복사할 것

- `src/App.jsx`
- `src/components/intro/`
- `src/components/phase1/`
- `src/components/phase2/`
- `src/components/phase3/`
- `src/components/phase4/`
- `src/components/phase5/`
- `src/index.css`
- `public/gas_test.mov`
- `public/wegobe-bot.svg`
- 인터뷰 아바타 이미지 5종

## 2. 프로젝트별로 가장 먼저 바꿀 것

### Intro

- 브랜드 라벨 `WegoVy`
- 좌우 상태 텍스트 `야근 / 우리집 / 칼퇴`

### Scroll 1~3

- 문제 카피
- pain point 목록
- 해결 메시지 배지/서브카피

### Scroll 4

- 설명 카드 4개
- 연결 노드 이름
- 코드 예시

### Scroll 5~7

- 입력 문서 이름
- 자동 취합 버튼 문구
- 출력 대시보드 수치
- 알림 봇 이름/수신자

### Scroll 8

- 사례 카드 4개 데이터
- 첫 카드 모달의 코드/로그/산출물/영상
- `gas_test.mov` 교체 여부

### Scroll 9

- 팀원 이름, 역할, 인용문, 아바타

### Scroll 10~12

- 로드맵 제목/설명
- 최종 CTA 카피
- 외부 제안 링크

## 3. 코드 수정 우선순위

1. `src/components/phase4/Cases.jsx`
   사례 데이터와 모달 로직이 가장 많음
2. `src/components/phase2/GasIntro.jsx`
   제품 소개 성격이 가장 강함
3. `src/components/phase3/Phase3.jsx`
   실제 업무 흐름 데모 구간
4. `src/components/intro/StartIntro.jsx`
   브랜딩 변경 시 가장 먼저 바뀜

## 4. 타이밍/전환 확인 항목

- Intro `START` 클릭 후 스크롤 이동 타이밍
- `Phase1` 3구간 전환
- `Phase3` 3단계 sticky 진행
- `Phase4` `Cases -> Interviews` 전환
- `Phase5` `Roadmap -> CTA -> Contact` 전환

## 5. 자산 경로 확인

- `public` 자산은 절대 경로(`/filename`)로 참조됨
- 파일명을 바꾸면 다음 컴포넌트를 같이 수정해야 함
  - `Cases.jsx`
  - `Interviews.jsx`
  - `Phase3.jsx`

## 6. 최종 검수 명령

```bash
npm run build
```

검수 포인트:

- 모달 정상 오픈
- 영상 재생
- sticky 구간 점프 없음
- 모바일 레이아웃 깨짐 없음
- `public` 이미지 404 없음
