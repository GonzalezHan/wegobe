# Scroll Structure

기준 파일: `src/App.jsx`

## 전체 흐름

1. Intro
2. Scroll 1. Problem
3. Scroll 2. Agitation
4. Scroll 3. Solution
5. Scroll 4. GAS Intro
6. Scroll 5. Data Input
7. Scroll 6. Automation Magic
8. Scroll 7. Result & Distribution
9. Scroll 8. Cases
10. Scroll 9. Interviews
11. Scroll 10. Roadmap
12. Scroll 11. Call To Action
13. Scroll 12. Contact

## 배경 전환 기준

`src/App.jsx`에서 메인 콘텐츠(`Phase1~Phase5`)만 기준으로 배경색이 전환됩니다.

- `0.08 ~ 0.09`
  Dark -> Light
- `0.09 ~ 0.65`
  Light 유지
- `0.65 ~ 0.75`
  Light -> Dark
- `0.90 ~ 0.95`
  Dark -> Navy

인트로(`StartIntro`)는 이 전환 로직 바깥에 별도 섹션으로 존재합니다.

## 섹션별 상세

### Intro

- 파일: `src/components/intro/StartIntro.jsx`
- 역할:
  가장 첫 화면. `START` 클릭 시 왼쪽 `야근` 상태에서 오른쪽 `우리집/칼퇴` 상태로 이동하는 설치형 비유 연출
- 현재 동작:
  - 폴더 아이콘 이동: 2초
  - 도착 후 0.8초 뒤 `우리집 -> 칼퇴`
  - 목적지 아이콘 바운스
  - 이후 3.5초 뒤 본문으로 스크롤 이동

### Scroll 1~3

- 래퍼 파일: `src/components/phase1/Phase1.jsx`
- 높이: `300vh`
- 구조:
  sticky 1장 안에서 `Problem -> Agitation -> Solution`이 순차 전환

#### Scroll 1. Problem

- 파일: `src/components/phase1/Problem.jsx`
- 역할:
  수많은 문서/시트/슬라이드 창이 떠다니는 문제 제기
- 특징:
  - 플로팅 문서 배경
  - 타입라이터형 문서 내용
  - 막대/도넛/카운트업 그래프 모션

#### Scroll 2. Agitation

- 파일: `src/components/phase1/Agitation.jsx`
- 역할:
  휴먼에러, 업무병목, 데이터분산, 비표준화, 단순반복의 감정적 증폭
- 특징:
  - pain point 루프
  - 메신저형 말풍선 등장

#### Scroll 3. Solution

- 파일: `src/components/phase1/Solution.jsx`
- 역할:
  해결 선언

### Scroll 4

- 파일: `src/components/phase2/GasIntro.jsx`
- 역할:
  GAS가 어떤 도구인지 소개하는 메인 설명 섹션
- 구조:
  - 좌측 카피
  - 우측 `Google Sheets / Google Docs / Google Slides -> GAS Runtime` 네트워크
  - 하단 코드 라이브 타이핑
  - 모바일용 별도 축소 레이아웃 포함

### Scroll 5~7

- 파일: `src/components/phase3/Phase3.jsx`
- 높이: `600vh`
- 구조:
  sticky 1장 안에서 3단계 시연

#### Scroll 5. Data Input

- 구글 폼/시트/슬라이드 조각이 들어오는 단계

#### Scroll 6. Automation Magic

- 마우스 클릭 -> 자동 취합 실행 -> 검증/병합 단계

#### Scroll 7. Result & Distribution

- 대시보드 완성
- 위고비 봇 알림 팝업 노출

### Scroll 8~9

- 래퍼 파일: `src/components/phase4/Phase4.jsx`
- 높이: `300vh`
- 구조:
  sticky 1장 안에서 `Cases -> Interviews`

#### Scroll 8. Cases

- 파일: `src/components/phase4/Cases.jsx`
- 역할:
  사례 카드 4개와 첫 번째 카드 전용 모달
- 현재 인터랙션:
  - 첫 카드 `시너지지원 Weekly Issue`만 클릭 가능
  - 모달 탭:
    - `1. GAS 코드 화면`
    - `2. 코드 실행 과정`
    - `3. 생성된 산출물`
    - `4. DEMO Live`

#### Scroll 9. Interviews

- 파일: `src/components/phase4/Interviews.jsx`
- 역할:
  TF 구성원 인터뷰 아바타와 인용문

### Scroll 10~12

- 래퍼 파일: `src/components/phase5/Phase5.jsx`
- 높이: `300vh`
- 구조:
  sticky 1장 안에서 `Roadmap -> CallToAction -> ContactUs`

#### Scroll 10. Roadmap

- 파일: `src/components/phase5/Roadmap.jsx`
- 역할:
  미래 자동화 로드맵 4단계

#### Scroll 11. Call To Action

- 파일: `src/components/phase5/CallToAction.jsx`
- 역할:
  자동화 이후 확보한 시간을 본질 업무에 투자하자는 메시지

#### Scroll 12. Contact

- 파일: `src/components/phase5/ContactUs.jsx`
- 역할:
  자동화 아이디어 제안 CTA

## 다른 프로젝트로 옮길 때 최소 유지 포인트

- `App.jsx`의 phase 조립 순서
- sticky 구간 높이
- `public` 자산 경로
- `Cases.jsx` 내 첫 카드 전용 모달 로직
- `StartIntro.jsx`의 `onStart -> scrollIntoView` 연결
