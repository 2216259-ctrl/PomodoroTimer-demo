# 🍅 Pomodoro Timer

[![Deploy to GitHub Pages](https://github.com/2216259-ctrl/PomodoroTimer-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/2216259-ctrl/PomodoroTimer-demo/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 현대적이고 아름다운 디자인의 뽀모도로 타이머 웹 애플리케이션

[🚀 라이브 데모](https://2216259-ctrl.github.io/PomodoroTimer-demo/) | [📋 PRD](./docs/PRD.md) | [🔧 기술 명세](./docs/TECH_SPEC.md) | [📦 배포 가이드](./docs/DEPLOYMENT.md)

---

## ✨ 주요 기능

- ⏱️ **커스터마이징 가능한 타이머**: 집중 시간, 휴식 시간 자유롭게 설정
- 🎨 **아름다운 UI**: 현대적이고 직관적인 인터페이스
- 🌓 **다크 모드**: 눈의 피로를 줄이는 다크 모드 지원
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- 🔔 **스마트 알림**: 브라우저 알림과 사운드 알림
- 📊 **통계**: 생산성 추적 및 통계
- 🎯 **집중 모드**: 방해 없는 집중 환경
- 💾 **자동 저장**: 설정과 진행 상황 자동 저장

---

## 🎯 미리보기

![Pomodoro Timer Preview](./docs/design/screen.png)

---

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 20 이상
- npm 또는 yarn

### 설치 방법

```bash
# 1. 저장소 클론
git clone https://github.com/2216259-ctrl/PomodoroTimer-demo.git
cd PomodoroTimer-demo

# 2. 의존성 설치
npm install

# 3. 개발 서버 시작
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

---

## 📦 빌드 및 배포

### 로컬 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 빌드 미리보기
npm run preview
```

### GitHub Pages 배포

프로젝트는 `main` 브랜치에 푸시될 때 자동으로 배포됩니다.

```bash
git add .
git commit -m "feat: 커밋 메시지"
git push origin main
```

자세한 배포 가이드는 [DEPLOYMENT.md](./docs/DEPLOYMENT.md)를 참조하세요.

---

## 🛠️ 기술 스택

### 핵심 기술
- **HTML5** - 시맨틱 마크업
- **CSS3** - 현대적인 스타일링
- **JavaScript (ES2022+)** - 애플리케이션 로직

### 프레임워크 및 라이브러리
- **Tailwind CSS 3.4** - 유틸리티 우선 CSS 프레임워크
- **Vite 5.0** - 빌드 도구 및 개발 서버
- **Chart.js** - 통계 시각화 (Phase 3)

### 도구
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅
- **Vitest** - 유닛 테스트
- **Playwright** - E2E 테스트

### 배포
- **GitHub Actions** - CI/CD 파이프라인
- **GitHub Pages** - 정적 호스팅

---

## 📁 프로젝트 구조

```
pomodoro-timer/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 워크플로우
├── design/                     # 디자인 참고 자료
│   ├── code.html
│   └── screen.png
├── docs/                       # 문서
├── src/                        # 소스 코드 (Phase 2+)
│   ├── css/
│   ├── js/
│   └── assets/
├── index.html                  # 메인 HTML 파일
├── package.json                # 의존성
├── vite.config.js              # Vite 설정
├── tailwind.config.js          # Tailwind 설정
├── PRD.md                      # 제품 요구사항
├── TECH_SPEC.md                # 기술 명세
└── DEPLOYMENT.md               # 배포 가이드
```

---

## 🎨 디자인 시스템

### 색상

```css
Primary: #13c8ec (Cyan)
Background Light: #f6f8f8
Background Dark: #101f22
Surface Dark: #1a2c30
Border Dark: #223032
```

### 타이포그래피

- **폰트**: Inter (Google Fonts)
- **굵기**: 300, 400, 500, 600, 700, 800

### 컴포넌트

- 원형 프로그레스 링 (SVG)
- 타이머 디스플레이
- 컨트롤 버튼
- 설정 모달
- 통계 대시보드

---

## 📖 문서

- **[PRD.md](./docs/PRD.md)** - 제품 요구사항 문서
  - 제품 비전 및 목표
  - 기능 명세
  - 사용자 스토리 및 인수 조건
  - 개발 단계

- **[TECH_SPEC.md](./docs/TECH_SPEC.md)** - 기술 명세서
  - 시스템 아키텍처
  - 기술 스택 상세
  - 핵심 모듈 및 API
  - 성능 최적화
  - 테스트 전략

- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - 배포 가이드
  - GitHub Pages 설정
  - 문제 해결
  - 커스텀 도메인 설정

- **[TASKS.md](./docs/TASKS.md)** - 작업 계획
  - 코드 예시가 포함된 상세 작업 분류
  - 시간 예측 및 의존성
  - 단계별 구현 가이드
  - TDD 및 SOLID 체크리스트

- **[docs/rules/](./docs/rules/)** - 개발 규칙
  - TDD 방법론
  - SOLID 원칙
  - 코드 품질 기준

---

## 🧪 테스트

### 유닛 테스트

```bash
npm run test
```

### E2E 테스트

```bash
npm run test:e2e
```

---

## 🗺️ 로드맵

### Phase 1: MVP ✅
- [x] 기본 타이머 기능
- [x] Play/Pause/Reset 컨트롤
- [x] 원형 프로그레스 표시
- [x] 다크 모드 지원
- [x] 반응형 디자인
- [x] 브라우저 알림
- [x] 로컬 스토리지

### Phase 2: 향상된 기능 🚧
- [ ] 설정 모달
- [ ] 커스터마이징 가능한 타이머 시간
- [ ] 사운드 선택
- [ ] 키보드 단축키
- [ ] 자동 시작 옵션

### Phase 3: 통계 📊
- [ ] 세션 추적
- [ ] 일일/주간 통계
- [ ] 시각적 차트
- [ ] 성취 시스템

### Phase 4: 고급 기능 🚀
- [ ] PWA 지원
- [ ] 오프라인 모드
- [ ] 다국어 지원
- [ ] 작업 관리 통합

---

## 🤝 기여하기

기여는 언제나 환영합니다! Pull Request를 자유롭게 제출해주세요.

1. 프로젝트 포크
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 열기

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 🙏 감사의 말

- 현대적인 생산성 앱에서 디자인 영감을 받았습니다
- Francesco Cirillo의 [뽀모도로 기법](https://francescocirillo.com/pages/pomodoro-technique)
- 놀라운 유틸리티 프레임워크를 제공한 [Tailwind CSS](https://tailwindcss.com/)
- 아름다운 아이콘을 제공한 [Material Symbols](https://fonts.google.com/icons)

---

## 📞 연락처

프로젝트 링크: [https://github.com/2216259-ctrl/PomodoroTimer-demo](https://github.com/2216259-ctrl/PomodoroTimer-demo)

---

<div align="center">
  <p>❤️와 ☕로 만들었습니다</p>
  <p>즐거운 집중 시간 되세요! 🍅</p>
</div>
