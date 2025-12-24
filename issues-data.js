const issuesData = [
    {
        title: "🎯 Phase 1: MVP",
        tasks: [
            {
                title: "Task 1.1.1: GitHub Repository 설정",
                labels: ["priority: 🔴 high", "type: ⚙️ config", "phase-1: mvp"],
                body: `## 📋 작업 배경
프로젝트를 시작하기 위해 GitHub 저장소를 설정하고 GitHub Pages를 활성화해야 합니다.

## 🎯 작업 내용
- [ ] GitHub에서 새 repository 생성 (PomodoroTimer-demo)
- [ ] 로컬 Git 초기화: \`git init\`
- [ ] 원격 연결: \`git remote add origin <URL>\`
- [ ] 첫 커밋 및 푸시
- [ ] GitHub Pages 활성화 (Settings → Pages → Source: GitHub Actions)
- [ ] Actions 권한 설정 (Settings → Actions → Read and write permissions)

## ✅ 인수 조건
- [ ] GitHub repository 생성 완료
- [ ] GitHub Pages 활성화 확인
- [ ] Actions 워크플로우 정상 작동

**예상 시간**: 30분`
            },
            {
                title: "Task 1.2.1: Constants 정의 (TDD)",
                labels: ["priority: 🔴 high", "type: 🧪 tdd", "area: core-logic", "phase-1: mvp"],
                body: `## 📋 작업 배경
프로젝트 전반에서 사용할 상수들을 정의하여 코드의 일관성과 유지보수성을 높입니다.

## 🎯 작업 내용
- [ ] SESSION_TYPES 정의 (FOCUS, SHORT_BREAK, LONG_BREAK)
- [ ] DEFAULT_DURATIONS 정의 (초 단위)
- [ ] EVENTS 정의 (타이머, 세션, 설정 이벤트)
- [ ] STORAGE_KEYS 정의 (localStorage 키)
- [ ] 테스트 100% 통과
- [ ] 커밋: \`test: Add constants tests\`
- [ ] 커밋: \`feat: Implement constants\`

## ✅ 인수 조건
- [ ] 모든 테스트 통과
- [ ] 커버리지 100%

**예상 시간**: 1시간`
            },
            {
                title: "Task 1.2.2: EventEmitter 구현 (TDD)",
                labels: ["priority: 🔴 high", "type: 🧪 tdd", "type: 🧰 utility", "phase-1: mvp"],
                body: `## 📋 작업 배경
이벤트 기반 아키텍처를 위한 EventEmitter를 구현합니다.

## 🎯 작업 내용
- [ ] on() 메서드 구현
- [ ] off() 메서드 구현
- [ ] emit() 메서드 구현
- [ ] once() 메서드 구현 (한 번만 실행)
- [ ] 테스트 100% 통과
- [ ] 커버리지 100% 확인
- [ ] 커밋: \`test: Add EventEmitter tests\`
- [ ] 커밋: \`feat: Implement EventEmitter\`

## ✅ 인수 조건
- [ ] 모든 테스트 통과
- [ ] 커버리지 100%

**예상 시간**: 1시간`
            },
            {
                title: "Task 1.3.1: TimerManager 테스트 작성",
                labels: ["priority: 🔴 high", "type: 🧪 tdd", "type: 🔧 manager", "area: core-logic", "phase-1: mvp"],
                body: `## 📋 작업 배경
타이머의 핵심 로직을 담당하는 TimerManager의 테스트를 먼저 작성합니다 (TDD).

## 🎯 작업 내용
- [ ] Constructor 테스트 (초기 상태, 의존성 주입)
- [ ] start() 테스트 (상태 변경, 에러 처리, interval, 이벤트)
- [ ] pause() 테스트 (상태 변경, interval 정리, 이벤트)
- [ ] tick() 테스트 (시간 감소, complete 호출, 이벤트)
- [ ] reset() 테스트 (일시정지, 시간 초기화, 이벤트)
- [ ] complete() 테스트 (일시정지, 이벤트)
- [ ] setSession() 테스트 (세션 변경, 시간 업데이트)
- [ ] 커밋: \`test: Add TimerManager comprehensive tests\`

## ✅ 인수 조건
- [ ] 모든 테스트 케이스 작성 완료
- [ ] 테스트 실행 시 실패 확인 (Red)

**예상 시간**: 3시간`
            },
            {
                title: "Task 1.3.2: TimerManager 구현",
                labels: ["priority: 🔴 high", "type: 🧪 tdd", "type: 🔧 manager", "area: core-logic", "phase-1: mvp"],
                body: `## 📋 작업 배경
작성된 테스트를 통과하도록 TimerManager를 구현합니다.

## 🎯 작업 내용
- [ ] Constructor 구현
- [ ] start() 메서드 구현
- [ ] pause() 메서드 구현
- [ ] tick() 메서드 구현
- [ ] reset() 메서드 구현
- [ ] complete() 메서드 구현
- [ ] setSession() 메서드 구현
- [ ] 모든 테스트 통과 확인
- [ ] 커버리지 95% 이상 확인
- [ ] ESLint 통과 확인
- [ ] 커밋: \`feat: Implement TimerManager with TDD\`

## ✅ 인수 조건
- [ ] 모든 테스트 통과 (Green)
- [ ] 커버리지 95% 이상
- [ ] SOLID 원칙 준수

**예상 시간**: 4시간
**의존성**: Task 1.3.1`
            },
            {
                title: "Task 1.4.1: StateManager 테스트 작성",
                labels: ["priority: 🔴 high", "type: 🧪 tdd", "type: 🔧 manager", "area: core-logic", "phase-1: mvp"],
                body: `## 📋 작업 배경
상태 관리를 담당하는 StateManager의 테스트를 작성합니다.

## 🎯 작업 내용
- [ ] getSettings() 테스트 (기본값, 저장된 값 로드)
- [ ] saveSettings() 테스트 (localStorage 저장, 이벤트)
- [ ] updateSetting() 테스트 (특정 설정 업데이트)
- [ ] getStatistics() 테스트 (기본값, 저장된 값 로드)
- [ ] updateStatistics() 테스트 (통계 업데이트)
- [ ] incrementPomodoro() 테스트 (카운트 증가, 일일 통계)
- [ ] addFocusTime() 테스트 (시간 누적)
- [ ] localStorage 에러 처리 테스트
- [ ] 커밋: \`test: Add StateManager tests\`

## ✅ 인수 조건
- [ ] 모든 테스트 케이스 작성
- [ ] 테스트 실행 시 실패 확인 (Red)

**예상 시간**: 2시간`
            },
            {
                title: "Task 1.4.2: StateManager 구현",
                labels: ["priority: 🔴 high", "type: 🧪 tdd", "type: 🔧 manager", "area: core-logic", "phase-1: mvp"],
                body: `## 📋 작업 배경
테스트를 통과하도록 StateManager를 구현합니다.

## 🎯 작업 내용
- [ ] DEFAULT_SETTINGS 정의
- [ ] getSettings() 구현
- [ ] saveSettings() 구현
- [ ] updateSetting() 구현
- [ ] getStatistics() 구현
- [ ] updateStatistics() 구현
- [ ] incrementPomodoro() 구현
- [ ] addFocusTime() 구현
- [ ] 에러 처리 (corrupt data)
- [ ] 모든 테스트 통과
- [ ] 커버리지 95% 이상
- [ ] 커밋: \`feat: Implement StateManager\`

## ✅ 인수 조건
- [ ] 모든 테스트 통과
- [ ] 커버리지 95% 이상

**예상 시간**: 3시간
**의존성**: Task 1.4.1`
            },
            {
                title: "Task 1.6.1: index.html 기본 구조",
                labels: ["priority: 🔴 high", "type: 🎨 ui", "area: ui-components", "phase-1: mvp"],
                body: `## 📋 작업 배경
웹 애플리케이션의 기본 HTML 구조를 작성합니다.

## 🎯 작업 내용
- [ ] HTML5 doctype 및 기본 구조
- [ ] Meta 태그 (charset, viewport, description, theme-color)
- [ ] Google Fonts 로드 (Inter)
- [ ] Material Symbols 로드
- [ ] Tailwind CSS CDN (임시)
- [ ] Header 구조 (Settings, Focus Mode, Statistics 버튼)
- [ ] Main 구조 (Timer Display, Progress, Session Info)
- [ ] Footer 구조 (Controls: Reset, Play/Pause, Skip)
- [ ] Script 태그 (type="module")
- [ ] 커밋: \`feat: Add index.html basic structure\`

## ✅ 인수 조건
- [ ] HTML 구조 완성
- [ ] 브라우저에서 렌더링 확인

**예상 시간**: 1시간`
            },
            {
                title: "Task 1.7.1: Design System 구축",
                labels: ["priority: 🔴 high", "type: 🎨 ui", "area: styling", "phase-1: mvp"],
                body: `## 📋 작업 배경
일관된 디자인을 위한 Design System을 구축합니다.

## 🎯 작업 내용
- [ ] CSS 변수 정의 (색상, 폰트, 간격, border-radius)
- [ ] 다크 모드 변수 (.dark 클래스)
- [ ] 기본 리셋 스타일 (*, box-sizing)
- [ ] Typography 스타일 (font-family, sizes, weights)
- [ ] 유틸리티 클래스 (flex, grid, spacing)
- [ ] 애니메이션 정의 (pulse, ping, fade)
- [ ] 커밋: \`feat: Add design system and CSS variables\`

## ✅ 인수 조건
- [ ] Design system 완성
- [ ] 다크 모드 변수 정의

**예상 시간**: 2시간`
            },
            {
                title: "Task 1.9.1: App.js 메인 로직",
                labels: ["priority: 🔴 high", "type: 📦 integration", "area: core-logic", "phase-1: mvp"],
                body: `## 📋 작업 배경
모든 매니저와 컴포넌트를 통합하는 메인 애플리케이션 로직을 작성합니다.

## 🎯 작업 내용
- [ ] EventEmitter 인스턴스 생성
- [ ] TimerManager 초기화
- [ ] StateManager 초기화
- [ ] UI Components 초기화
- [ ] 이벤트 리스너 설정 (timer events)
- [ ] 초기 상태 로드 (localStorage)
- [ ] 에러 처리 (try-catch)
- [ ] 커밋: \`feat: Add app.js main logic\`

## ✅ 인수 조건
- [ ] 모든 매니저 및 컴포넌트 연결
- [ ] 기본 타이머 기능 작동

**예상 시간**: 3시간
**의존성**: Task 1.3.2, 1.4.2, 1.8.3`
            }
        ]
    }
];
