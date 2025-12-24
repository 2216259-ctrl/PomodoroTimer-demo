# 작업 계획 (Task Plan)

## 📋 개요

이 문서는 Pomodoro Timer 웹 애플리케이션 개발을 위한 세부 작업 계획입니다. 모든 작업은 **TDD(테스트 주도 개발)**와 **SOLID 원칙**을 따라 진행됩니다.

### 작업 진행 규칙

1. **TDD 필수**: 모든 코어 로직은 테스트를 먼저 작성 (Red-Green-Refactor)
2. **SOLID 원칙**: 5가지 원칙 적용 (SRP, OCP, LSP, ISP, DIP)
3. **커버리지**: 코어 로직 90% 이상, Managers 95% 이상, Utilities 100%
4. **작은 커밋**: 각 작업 완료 시 또는 Red-Green-Refactor 사이클마다 커밋
5. **문서화**: 복잡한 로직에 주석 추가

### 진행 상황 추적

| Phase | 총 작업 | 완료 | 진행 중 | 대기 | 진행률 |
|-------|---------|------|---------|------|--------|
| Phase 1: MVP | 50 | 0 | 0 | 50 | 0% |
| Phase 2: Enhanced | 17 | 0 | 0 | 17 | 0% |
| Phase 3: Statistics | 13 | 0 | 0 | 13 | 0% |
| Phase 4: Advanced | 9 | 0 | 0 | 9 | 0% |
| **전체** | **89** | **0** | **0** | **89** | **0%** |

---

## 🎯 Phase 1: MVP (Minimum Viable Product)

**목표**: 기본 타이머 기능을 가진 작동하는 웹 애플리케이션  
**기간**: 2주 (80시간)  
**우선순위**: 🔴 High

### 주간 계획

#### Week 1: 기반 구축 (40시간)
- Day 1-2: 프로젝트 설정 및 Constants (8시간)
- Day 3-4: Core Logic - TimerManager, StateManager (16시간)
- Day 5: Utilities 및 EventEmitter (8시간)
- Review: 코드 리뷰 및 리팩토링 (8시간)

#### Week 2: UI 구현 및 통합 (40시간)
- Day 6-7: HTML/CSS 및 Design System (16시간)
- Day 8: UI Components (8시간)
- Day 9: Application 통합 및 기능 완성 (8시간)
- Day 10: 테스트, 최적화, 배포 (8시간)

---

### 1.1 프로젝트 초기 설정 (1.5시간)

#### Task 1.1.1: GitHub Repository 설정
**예상 시간**: 30분 | **의존성**: 없음

**체크리스트**:
- [ ] GitHub에서 새 repository 생성 (PomodoroTimer-demo)
- [ ] 로컬 Git 초기화: `git init`
- [ ] 원격 연결: `git remote add origin <URL>`
- [ ] 첫 커밋 및 푸시
- [ ] GitHub Pages 활성화 (Settings → Pages → Source: GitHub Actions)
- [ ] Actions 권한 설정 (Settings → Actions → Read and write permissions)

**완료 조건**:
- GitHub repository 생성 완료
- GitHub Pages 활성화 확인
- Actions 워크플로우 정상 작동

---

#### Task 1.1.2: 개발 환경 설정
**예상 시간**: 30분 | **의존성**: Task 1.1.1

**체크리스트**:
- [ ] Node.js 의존성 설치: `npm install`
- [ ] 개발 서버 실행 확인: `npm run dev` (http://localhost:3000)
- [ ] 빌드 테스트: `npm run build`
- [ ] 테스트 실행 확인: `npm run test`
- [ ] ESLint 실행 확인: `npm run lint`
- [ ] Prettier 실행 확인: `npm run format`

**완료 조건**:
- 모든 npm 스크립트 정상 작동
- 개발 서버 접속 가능

---

#### Task 1.1.3: 프로젝트 구조 생성
**예상 시간**: 30분 | **의존성**: Task 1.1.2

**폴더 구조**:
```
src/
├── css/
│   ├── main.css
│   └── components.css
├── js/
│   ├── app.js
│   ├── managers/
│   ├── components/
│   ├── utils/
│   └── constants.js
└── assets/
    ├── sounds/
    └── images/

tests/
├── unit/
│   ├── managers/
│   ├── utils/
│   └── components/
├── integration/
└── setup.js
```

**체크리스트**:
- [ ] 모든 폴더 생성
- [ ] 기본 파일 생성 (빈 파일)
- [ ] index.html에서 import 경로 확인
- [ ] 샘플 테스트 파일 작성 및 실행 확인

**완료 조건**:
- 폴더 구조 완성
- 샘플 테스트 통과

---

### 1.2 Constants 및 EventEmitter (2시간)

#### Task 1.2.1: Constants 정의 (TDD)
**예상 시간**: 1시간 | **의존성**: Task 1.1.3

**테스트 파일**: `tests/unit/constants.test.js`

**테스트 작성** (Red):
```javascript
import { describe, test, expect } from 'vitest';
import { SESSION_TYPES, DEFAULT_DURATIONS, EVENTS, STORAGE_KEYS } from '../../src/js/constants.js';

describe('Constants', () => {
  test('SESSION_TYPES should have correct values', () => {
    expect(SESSION_TYPES.FOCUS).toBe('focus');
    expect(SESSION_TYPES.SHORT_BREAK).toBe('shortBreak');
    expect(SESSION_TYPES.LONG_BREAK).toBe('longBreak');
  });

  test('DEFAULT_DURATIONS should be in seconds', () => {
    expect(DEFAULT_DURATIONS.FOCUS).toBe(3000); // 50분
    expect(DEFAULT_DURATIONS.SHORT_BREAK).toBe(600); // 10분
    expect(DEFAULT_DURATIONS.LONG_BREAK).toBe(1200); // 20분
  });

  test('EVENTS should have timer events', () => {
    expect(EVENTS.TIMER_START).toBeDefined();
    expect(EVENTS.TIMER_PAUSE).toBeDefined();
    expect(EVENTS.TIMER_COMPLETE).toBeDefined();
  });
});
```

**구현 파일**: `src/js/constants.js`

**체크리스트**:
- [ ] SESSION_TYPES 정의 (FOCUS, SHORT_BREAK, LONG_BREAK)
- [ ] DEFAULT_DURATIONS 정의 (초 단위)
- [ ] EVENTS 정의 (타이머, 세션, 설정 이벤트)
- [ ] STORAGE_KEYS 정의 (localStorage 키)
- [ ] 테스트 100% 통과
- [ ] 커밋: `test: Add constants tests`
- [ ] 커밋: `feat: Implement constants`

**완료 조건**:
- 모든 테스트 통과
- 커버리지 100%

---

#### Task 1.2.2: EventEmitter 구현 (TDD)
**예상 시간**: 1시간 | **의존성**: Task 1.2.1

**테스트 파일**: `tests/unit/utils/EventEmitter.test.js`

**테스트 작성** (Red):
```javascript
describe('EventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test('should register and emit events', () => {
    const callback = vi.fn();
    emitter.on('test', callback);
    emitter.emit('test', 'data');
    
    expect(callback).toHaveBeenCalledWith('data');
  });

  test('should remove event listeners', () => {
    const callback = vi.fn();
    emitter.on('test', callback);
    emitter.off('test', callback);
    emitter.emit('test');
    
    expect(callback).not.toHaveBeenCalled();
  });

  test('should handle multiple listeners', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test', callback1);
    emitter.on('test', callback2);
    emitter.emit('test');
    
    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });
});
```

**구현 파일**: `src/js/utils/EventEmitter.js`

**체크리스트**:
- [ ] on() 메서드 구현
- [ ] off() 메서드 구현
- [ ] emit() 메서드 구현
- [ ] once() 메서드 구현 (한 번만 실행)
- [ ] 테스트 100% 통과
- [ ] 커버리지 100% 확인
- [ ] 커밋: `test: Add EventEmitter tests`
- [ ] 커밋: `feat: Implement EventEmitter`

**완료 조건**:
- 모든 테스트 통과
- 커버리지 100%

---

### 1.3 Core Logic: TimerManager (7시간)

#### Task 1.3.1: TimerManager 테스트 작성
**예상 시간**: 3시간 | **의존성**: Task 1.2.2

**테스트 파일**: `tests/unit/managers/TimerManager.test.js`

**테스트 구조**:
```javascript
describe('TimerManager', () => {
  let timer;
  let mockEventEmitter;

  beforeEach(() => {
    mockEventEmitter = new EventEmitter();
    timer = new TimerManager(mockEventEmitter);
  });

  describe('Constructor', () => {
    test('should initialize with default values', () => {
      expect(timer.isRunning).toBe(false);
      expect(timer.remainingTime).toBe(0);
      expect(timer.sessionType).toBe(SESSION_TYPES.FOCUS);
    });

    test('should accept injected dependencies (DIP)', () => {
      expect(timer.eventEmitter).toBe(mockEventEmitter);
    });
  });

  describe('start()', () => {
    test('should set isRunning to true', () => {
      timer.remainingTime = 100;
      timer.start();
      expect(timer.isRunning).toBe(true);
    });

    test('should throw error when already running', () => {
      timer.remainingTime = 100;
      timer.start();
      expect(() => timer.start()).toThrow('Timer is already running');
    });

    test('should start interval timer', () => {
      vi.useFakeTimers();
      const tickSpy = vi.spyOn(timer, 'tick');
      
      timer.remainingTime = 100;
      timer.start();
      vi.advanceTimersByTime(1000);
      
      expect(tickSpy).toHaveBeenCalledTimes(1);
      vi.useRealTimers();
    });

    test('should emit TIMER_START event', () => {
      const callback = vi.fn();
      mockEventEmitter.on(EVENTS.TIMER_START, callback);
      
      timer.remainingTime = 100;
      timer.start();
      
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('pause()', () => {
    test('should set isRunning to false', () => {
      timer.remainingTime = 100;
      timer.start();
      timer.pause();
      expect(timer.isRunning).toBe(false);
    });

    test('should clear interval', () => {
      vi.useFakeTimers();
      const tickSpy = vi.spyOn(timer, 'tick');
      
      timer.remainingTime = 100;
      timer.start();
      timer.pause();
      vi.advanceTimersByTime(1000);
      
      expect(tickSpy).toHaveBeenCalledTimes(0);
      vi.useRealTimers();
    });

    test('should emit TIMER_PAUSE event', () => {
      const callback = vi.fn();
      mockEventEmitter.on(EVENTS.TIMER_PAUSE, callback);
      
      timer.remainingTime = 100;
      timer.start();
      timer.pause();
      
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('tick()', () => {
    test('should decrement remainingTime by 1', () => {
      timer.remainingTime = 100;
      timer.tick();
      expect(timer.remainingTime).toBe(99);
    });

    test('should call complete when reaching 0', () => {
      const completeSpy = vi.spyOn(timer, 'complete');
      timer.remainingTime = 1;
      timer.tick();
      
      expect(timer.remainingTime).toBe(0);
      expect(completeSpy).toHaveBeenCalled();
    });

    test('should not decrement below 0', () => {
      timer.remainingTime = 0;
      timer.tick();
      expect(timer.remainingTime).toBe(0);
    });

    test('should emit TIMER_TICK event', () => {
      const callback = vi.fn();
      mockEventEmitter.on(EVENTS.TIMER_TICK, callback);
      
      timer.remainingTime = 100;
      timer.tick();
      
      expect(callback).toHaveBeenCalledWith(99);
    });
  });

  describe('reset()', () => {
    test('should pause timer', () => {
      timer.remainingTime = 50;
      timer.start();
      timer.reset();
      expect(timer.isRunning).toBe(false);
    });

    test('should reset remainingTime to session duration', () => {
      timer.sessionType = SESSION_TYPES.FOCUS;
      timer.remainingTime = 100;
      timer.reset();
      expect(timer.remainingTime).toBe(DEFAULT_DURATIONS.FOCUS);
    });

    test('should emit TIMER_RESET event', () => {
      const callback = vi.fn();
      mockEventEmitter.on(EVENTS.TIMER_RESET, callback);
      
      timer.reset();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('complete()', () => {
    test('should pause timer', () => {
      timer.start();
      timer.complete();
      expect(timer.isRunning).toBe(false);
    });

    test('should emit TIMER_COMPLETE event', () => {
      const callback = vi.fn();
      mockEventEmitter.on(EVENTS.TIMER_COMPLETE, callback);
      
      timer.sessionType = SESSION_TYPES.FOCUS;
      timer.complete();
      
      expect(callback).toHaveBeenCalledWith(SESSION_TYPES.FOCUS);
    });
  });

  describe('setSession()', () => {
    test('should change session type', () => {
      timer.setSession(SESSION_TYPES.SHORT_BREAK);
      expect(timer.sessionType).toBe(SESSION_TYPES.SHORT_BREAK);
    });

    test('should update remainingTime', () => {
      timer.setSession(SESSION_TYPES.SHORT_BREAK);
      expect(timer.remainingTime).toBe(DEFAULT_DURATIONS.SHORT_BREAK);
    });
  });
});
```

**체크리스트**:
- [ ] Constructor 테스트 (초기 상태, 의존성 주입)
- [ ] start() 테스트 (상태 변경, 에러 처리, interval, 이벤트)
- [ ] pause() 테스트 (상태 변경, interval 정리, 이벤트)
- [ ] tick() 테스트 (시간 감소, complete 호출, 이벤트)
- [ ] reset() 테스트 (일시정지, 시간 초기화, 이벤트)
- [ ] complete() 테스트 (일시정지, 이벤트)
- [ ] setSession() 테스트 (세션 변경, 시간 업데이트)
- [ ] 커밋: `test: Add TimerManager comprehensive tests`

**완료 조건**:
- 모든 테스트 케이스 작성 완료
- 테스트 실행 시 실패 확인 (Red)

---

#### Task 1.3.2: TimerManager 구현
**예상 시간**: 4시간 | **의존성**: Task 1.3.1

**구현 파일**: `src/js/managers/TimerManager.js`

**SOLID 원칙 적용**:
- **SRP**: 타이머 로직만 담당 (알림, 저장 등은 다른 매니저가 담당)
- **DIP**: EventEmitter를 주입받아 사용
- **OCP**: 세션 타입 추가 시 확장 가능

**구현 예시**:
```javascript
export class TimerManager {
  constructor(eventEmitter) {
    // DIP: 의존성 주입
    this.eventEmitter = eventEmitter;
    
    // 초기 상태
    this.isRunning = false;
    this.remainingTime = 0;
    this.sessionType = SESSION_TYPES.FOCUS;
    this.intervalId = null;
  }

  start() {
    if (this.isRunning) {
      throw new Error('Timer is already running');
    }
    
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
    this.eventEmitter.emit(EVENTS.TIMER_START);
  }

  pause() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.eventEmitter.emit(EVENTS.TIMER_PAUSE);
  }

  tick() {
    if (this.remainingTime > 0) {
      this.remainingTime--;
      this.eventEmitter.emit(EVENTS.TIMER_TICK, this.remainingTime);
    }
    
    if (this.remainingTime === 0) {
      this.complete();
    }
  }

  reset() {
    this.pause();
    this.remainingTime = DEFAULT_DURATIONS[this.sessionType.toUpperCase().replace('_', '')];
    this.eventEmitter.emit(EVENTS.TIMER_RESET);
  }

  complete() {
    this.pause();
    this.eventEmitter.emit(EVENTS.TIMER_COMPLETE, this.sessionType);
  }

  setSession(sessionType) {
    this.sessionType = sessionType;
    this.remainingTime = DEFAULT_DURATIONS[sessionType.toUpperCase().replace('_', '')];
  }
}
```

**체크리스트**:
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
- [ ] 커밋: `feat: Implement TimerManager with TDD`

**완료 조건**:
- 모든 테스트 통과 (Green)
- 커버리지 95% 이상
- SOLID 원칙 준수

---

### 1.4 Core Logic: StateManager (5시간)

#### Task 1.4.1: StateManager 테스트 작성
**예상 시간**: 2시간 | **의존성**: Task 1.2.2

**테스트 파일**: `tests/unit/managers/StateManager.test.js`

**체크리스트**:
- [ ] getSettings() 테스트 (기본값, 저장된 값 로드)
- [ ] saveSettings() 테스트 (localStorage 저장, 이벤트)
- [ ] updateSetting() 테스트 (특정 설정 업데이트)
- [ ] getStatistics() 테스트 (기본값, 저장된 값 로드)
- [ ] updateStatistics() 테스트 (통계 업데이트)
- [ ] incrementPomodoro() 테스트 (카운트 증가, 일일 통계)
- [ ] addFocusTime() 테스트 (시간 누적)
- [ ] localStorage 에러 처리 테스트
- [ ] 커밋: `test: Add StateManager tests`

**완료 조건**:
- 모든 테스트 케이스 작성
- 테스트 실행 시 실패 확인 (Red)

---

#### Task 1.4.2: StateManager 구현
**예상 시간**: 3시간 | **의존성**: Task 1.4.1

**구현 파일**: `src/js/managers/StateManager.js`

**SOLID 원칙 적용**:
- **SRP**: 상태 관리만 담당
- **OCP**: 새 설정 추가 시 확장 가능

**체크리스트**:
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
- [ ] 커밋: `feat: Implement StateManager`

**완료 조건**:
- 모든 테스트 통과
- 커버리지 95% 이상

---

### 1.5 Utilities (3시간)

#### Task 1.5.1: Time Utilities (TDD)
**예상 시간**: 1.5시간 | **의존성**: Task 1.2.1

**파일**: `tests/unit/utils/time.test.js`, `src/js/utils/time.js`

**테스트 및 구현**:
```javascript
// 테스트
describe('formatTime', () => {
  test('should format seconds to MM:SS', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(59)).toBe('00:59');
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(3599)).toBe('59:59');
    expect(formatTime(3600)).toBe('60:00');
  });
});

describe('calculateEndTime', () => {
  test('should calculate end time from remaining seconds', () => {
    // Mock current time
    const now = new Date('2025-01-01T12:00:00');
    vi.setSystemTime(now);
    
    const endTime = calculateEndTime(300); // 5분
    expect(endTime).toBe('12:05');
  });
});
```

**체크리스트**:
- [ ] formatTime() 테스트 작성
- [ ] formatTime() 구현
- [ ] calculateEndTime() 테스트 작성
- [ ] calculateEndTime() 구현
- [ ] 엣지 케이스 테스트 (0, 음수, 큰 숫자)
- [ ] 커버리지 100% 확인
- [ ] 커밋: `test: Add time utilities tests`
- [ ] 커밋: `feat: Implement time utilities`

**완료 조건**:
- 모든 테스트 통과
- 커버리지 100%

---

#### Task 1.5.2: Validator Utilities (TDD)
**예상 시간**: 1.5시간 | **의존성**: Task 1.2.1

**파일**: `tests/unit/utils/validators.test.js`, `src/js/utils/validators.js`

**체크리스트**:
- [ ] validateDuration() 테스트 (15-90분 범위)
- [ ] validateDuration() 구현
- [ ] validateVolume() 테스트 (0.0-1.0 범위)
- [ ] validateVolume() 구현
- [ ] 잘못된 입력 처리 테스트
- [ ] 커버리지 100% 확인
- [ ] 커밋: `test: Add validator utilities tests`
- [ ] 커밋: `feat: Implement validator utilities`

**완료 조건**:
- 모든 테스트 통과
- 커버리지 100%

---

### 1.6 HTML 구조 (2시간)

#### Task 1.6.1: index.html 기본 구조
**예상 시간**: 1시간 | **의존성**: Task 1.1.3

**파일**: `index.html`

**체크리스트**:
- [ ] HTML5 doctype 및 기본 구조
- [ ] Meta 태그 (charset, viewport, description, theme-color)
- [ ] Google Fonts 로드 (Inter)
- [ ] Material Symbols 로드
- [ ] Tailwind CSS CDN (임시)
- [ ] Header 구조 (Settings, Focus Mode, Statistics 버튼)
- [ ] Main 구조 (Timer Display, Progress, Session Info)
- [ ] Footer 구조 (Controls: Reset, Play/Pause, Skip)
- [ ] Script 태그 (type="module")
- [ ] 커밋: `feat: Add index.html basic structure`

**완료 조건**:
- HTML 구조 완성
- 브라우저에서 렌더링 확인

---

#### Task 1.6.2: Semantic HTML 및 Accessibility
**예상 시간**: 1시간 | **의존성**: Task 1.6.1

**체크리스트**:
- [ ] ARIA 레이블 추가 (buttons, timer display)
- [ ] 적절한 heading 구조 (h1: Timer, h2: Session info)
- [ ] button role 및 aria-label
- [ ] 키보드 네비게이션 지원 (tabindex)
- [ ] Focus indicators (CSS)
- [ ] lang 속성 설정
- [ ] Lighthouse Accessibility 점수 90+ 확인
- [ ] 커밋: `feat: Add semantic HTML and accessibility features`

**완료 조건**:
- Accessibility 점수 90+
- 키보드 네비게이션 작동

---

### 1.7 CSS 스타일링 (7시간)

#### Task 1.7.1: Design System 구축
**예상 시간**: 2시간 | **의존성**: Task 1.6.1

**파일**: `src/css/main.css`

**체크리스트**:
- [ ] CSS 변수 정의 (색상, 폰트, 간격, border-radius)
- [ ] 다크 모드 변수 (.dark 클래스)
- [ ] 기본 리셋 스타일 (*, box-sizing)
- [ ] Typography 스타일 (font-family, sizes, weights)
- [ ] 유틸리티 클래스 (flex, grid, spacing)
- [ ] 애니메이션 정의 (pulse, ping, fade)
- [ ] 커밋: `feat: Add design system and CSS variables`

**완료 조건**:
- Design system 완성
- 다크 모드 변수 정의

---

#### Task 1.7.2: Component 스타일
**예상 시간**: 3시간 | **의존성**: Task 1.7.1

**파일**: `src/css/components.css`

**체크리스트**:
- [ ] Header 스타일 (flex layout, buttons)
- [ ] Timer Display 스타일 (큰 폰트, tabular-nums)
- [ ] Circular Progress 스타일 (SVG, stroke-dasharray)
- [ ] Controls 스타일 (버튼 크기, 호버 효과)
- [ ] Round Indicator 스타일 (점, 애니메이션)
- [ ] Focus Mode Indicator 스타일 (pulse 애니메이션)
- [ ] 호버 효과 및 트랜지션
- [ ] 커밋: `feat: Add component styles`

**완료 조건**:
- 모든 컴포넌트 스타일 완성
- 디자인 참고 이미지와 일치

---

#### Task 1.7.3: 반응형 디자인
**예상 시간**: 2시간 | **의존성**: Task 1.7.2

**체크리스트**:
- [ ] 모바일 (< 640px) 스타일
- [ ] 태블릿 (640px - 1024px) 스타일
- [ ] 데스크톱 (> 1024px) 스타일
- [ ] 터치 친화적 버튼 크기 (최소 44px)
- [ ] 가로/세로 모드 대응
- [ ] 모바일 브라우저 테스트
- [ ] 커밋: `feat: Add responsive design`

**완료 조건**:
- 모든 디바이스에서 정상 작동
- Lighthouse Mobile 점수 90+

---

### 1.8 UI Components (5.5시간)

#### Task 1.8.1: CircularProgress Component
**예상 시간**: 2시간 | **의존성**: Task 1.7.2

**파일**: `src/js/components/CircularProgress.js`

**체크리스트**:
- [ ] SVG 원형 프로그레스 바 생성
- [ ] setProgress(percent) 메서드
- [ ] stroke-dashoffset 계산
- [ ] 부드러운 애니메이션 (transition)
- [ ] DOM 업데이트 최적화 (requestAnimationFrame)
- [ ] 커밋: `feat: Add CircularProgress component`

**완료 조건**:
- 프로그레스 바 정상 작동
- 부드러운 애니메이션

---

#### Task 1.8.2: TimerDisplay Component
**예상 시간**: 1.5시간 | **의존성**: Task 1.5.1

**파일**: `src/js/components/TimerDisplay.js`

**체크리스트**:
- [ ] 시간 표시 (MM:SS 형식)
- [ ] 종료 예상 시간 표시
- [ ] 세션 정보 표시 (제목, 설명)
- [ ] 실시간 업데이트 (이벤트 리스너)
- [ ] 커밋: `feat: Add TimerDisplay component`

**완료 조건**:
- 시간 표시 정상 작동
- 실시간 업데이트 확인

---

#### Task 1.8.3: Controls Component
**예상 시간**: 2시간 | **의존성**: Task 1.3.2

**파일**: `src/js/components/Controls.js`

**체크리스트**:
- [ ] Play/Pause 버튼 (아이콘 전환)
- [ ] Reset 버튼
- [ ] Skip 버튼
- [ ] 이벤트 핸들러 연결
- [ ] 버튼 상태 관리 (disabled)
- [ ] 호버 효과 (CSS 클래스 토글)
- [ ] 커밋: `feat: Add Controls component`

**완료 조건**:
- 모든 버튼 정상 작동
- 상태에 따른 UI 변경

---

### 1.9 Application 통합 (5시간)

#### Task 1.9.1: App.js 메인 로직
**예상 시간**: 3시간 | **의존성**: Task 1.3.2, 1.4.2, 1.8.3

**파일**: `src/js/app.js`

**체크리스트**:
- [ ] EventEmitter 인스턴스 생성
- [ ] TimerManager 초기화
- [ ] StateManager 초기화
- [ ] UI Components 초기화
- [ ] 이벤트 리스너 설정 (timer events)
- [ ] 초기 상태 로드 (localStorage)
- [ ] 에러 처리 (try-catch)
- [ ] 커밋: `feat: Add app.js main logic`

**완료 조건**:
- 모든 매니저 및 컴포넌트 연결
- 기본 타이머 기능 작동

---

#### Task 1.9.2: 이벤트 시스템 구축
**예상 시간**: 2시간 | **의존성**: Task 1.9.1

**체크리스트**:
- [ ] TIMER_START 이벤트 처리
- [ ] TIMER_PAUSE 이벤트 처리
- [ ] TIMER_TICK 이벤트 처리 (UI 업데이트)
- [ ] TIMER_COMPLETE 이벤트 처리
- [ ] TIMER_RESET 이벤트 처리
- [ ] 메모리 누수 방지 (cleanup 함수)
- [ ] 커밋: `feat: Implement event system`

**완료 조건**:
- 모든 이벤트 정상 작동
- 메모리 누수 없음

---

### 1.10 추가 기능 (6.5시간)

#### Task 1.10.1: LocalStorage 통합
**예상 시간**: 2시간 | **의존성**: Task 1.4.2

**체크리스트**:
- [ ] 페이지 로드 시 설정 복원
- [ ] 설정 변경 시 자동 저장
- [ ] 세션 상태 저장 (타이머, 라운드)
- [ ] 페이지 새로고침 시 복원
- [ ] 기본값 처리
- [ ] 에러 처리 (corrupt data)
- [ ] 커밋: `feat: Add localStorage integration`

**완료 조건**:
- 설정 저장/로드 정상 작동
- 새로고침 시 상태 복원

---

#### Task 1.10.2: NotificationManager (TDD)
**예상 시간**: 2시간 | **의존성**: Task 1.3.2

**테스트**: `tests/unit/managers/NotificationManager.test.js`  
**구현**: `src/js/managers/NotificationManager.js`

**체크리스트**:
- [ ] requestPermission() 테스트 및 구현
- [ ] show() 테스트 및 구현
- [ ] showSessionComplete() 테스트 및 구현
- [ ] 권한 거부 처리
- [ ] 에러 처리
- [ ] 커버리지 95% 이상
- [ ] 커밋: `test: Add NotificationManager tests`
- [ ] 커밋: `feat: Implement NotificationManager`

**완료 조건**:
- 브라우저 알림 정상 작동
- 권한 처리 완료

---

#### Task 1.10.3: ThemeManager
**예상 시간**: 1.5시간 | **의존성**: Task 1.4.2

**파일**: `src/js/managers/ThemeManager.js`

**체크리스트**:
- [ ] 시스템 설정 감지 (prefers-color-scheme)
- [ ] 다크 모드 토글 (HTML class)
- [ ] 설정 저장 (localStorage)
- [ ] 부드러운 전환 애니메이션
- [ ] 커밋: `feat: Add ThemeManager`

**완료 조건**:
- 다크 모드 정상 작동
- 시스템 설정 감지

---

#### Task 1.10.4: SessionManager
**예상 시간**: 1시간 | **의존성**: Task 1.3.2

**파일**: `src/js/managers/SessionManager.js`

**체크리스트**:
- [ ] 라운드 카운팅 (1-4)
- [ ] nextSession() 구현
- [ ] 4 라운드 후 긴 휴식
- [ ] 라운드 리셋
- [ ] 커밋: `feat: Add SessionManager`

**완료 조건**:
- 세션 전환 정상 작동
- 라운드 시스템 작동

---

### 1.11 테스트 및 최적화 (7시간)

#### Task 1.11.1: 통합 테스트
**예상 시간**: 3시간 | **의존성**: Task 1.9.2

**파일**: `tests/integration/app.test.js`

**체크리스트**:
- [ ] 전체 타이머 사이클 테스트
- [ ] 설정 변경 테스트
- [ ] 세션 전환 테스트
- [ ] localStorage 통합 테스트
- [ ] 에러 시나리오 테스트
- [ ] 커밋: `test: Add integration tests`

**완료 조건**:
- 모든 통합 테스트 통과

---

#### Task 1.11.2: 브라우저 테스트
**예상 시간**: 2시간 | **의존성**: Task 1.11.1

**체크리스트**:
- [ ] Chrome 테스트
- [ ] Firefox 테스트
- [ ] Safari 테스트
- [ ] Edge 테스트
- [ ] 모바일 Chrome 테스트
- [ ] 모바일 Safari 테스트
- [ ] 버그 수정 및 커밋

**완료 조건**:
- 모든 브라우저에서 정상 작동

---

#### Task 1.11.3: 성능 최적화
**예상 시간**: 2시간 | **의존성**: Task 1.11.2

**체크리스트**:
- [ ] Lighthouse 감사 실행
- [ ] Performance 점수 90+ 달성
- [ ] Accessibility 점수 90+ 달성
- [ ] Best Practices 점수 90+ 달성
- [ ] SEO 점수 90+ 달성
- [ ] 이미지 최적화
- [ ] CSS/JS 최적화
- [ ] 커밋: `perf: Optimize performance`

**완료 조건**:
- Lighthouse 모든 항목 90+

---

### 1.12 배포 (3시간)

#### Task 1.12.1: 프로덕션 빌드
**예상 시간**: 2시간 | **의존성**: Task 1.11.3

**체크리스트**:
- [ ] Tailwind CSS 빌드 프로세스 설정
- [ ] CSS 최적화 (PurgeCSS)
- [ ] JavaScript 번들링 (Vite)
- [ ] 에셋 최적화
- [ ] 빌드 테스트 (`npm run build`)
- [ ] 프리뷰 확인 (`npm run preview`)
- [ ] 커밋: `build: Configure production build`

**완료 조건**:
- 빌드 성공
- 프리뷰 정상 작동

---

#### Task 1.12.2: GitHub Pages 배포
**예상 시간**: 1시간 | **의존성**: Task 1.12.1

**체크리스트**:
- [ ] GitHub Actions 워크플로우 확인
- [ ] main 브랜치에 푸시
- [ ] 빌드 성공 확인 (Actions 탭)
- [ ] 배포 URL 접속 확인
- [ ] 모든 기능 정상 작동 확인
- [ ] README 업데이트 (Live Demo URL)
- [ ] 커밋: `docs: Update README with live demo URL`

**완료 조건**:
- GitHub Pages 배포 성공
- 모든 기능 정상 작동

---

## 🎯 Phase 2: Enhanced Features

**목표**: 설정 기능 및 사용자 경험 개선  
**기간**: 2주 (80시간)  
**우선순위**: 🟡 Medium

### 2.1 Settings Modal (7시간)

#### Task 2.1.1: Modal Component (TDD)
**예상 시간**: 3시간 | **의존성**: Phase 1 완료

**테스트**: `tests/unit/components/Modal.test.js`  
**구현**: `src/js/components/Modal.js`

**체크리스트**:
- [ ] open() 테스트 및 구현
- [ ] close() 테스트 및 구현
- [ ] ESC 키로 닫기
- [ ] 외부 클릭으로 닫기
- [ ] 애니메이션 (fade in/out)
- [ ] 접근성 (focus trap, aria-modal)
- [ ] 키보드 네비게이션
- [ ] 커버리지 90% 이상
- [ ] 커밋: `test: Add Modal tests`
- [ ] 커밋: `feat: Implement Modal component`

**완료 조건**:
- 모달 정상 작동
- 접근성 확보

---

#### Task 2.1.2: Settings Form
**예상 시간**: 4시간 | **의존성**: Task 2.1.1

**파일**: `src/js/components/SettingsForm.js`

**체크리스트**:
- [ ] 타이머 시간 설정 (슬라이더: 15-90분)
- [ ] 알림 설정 (토글 스위치)
- [ ] 사운드 설정 (볼륨 슬라이더, 타입 선택)
- [ ] 테마 설정 (Auto/Light/Dark 라디오)
- [ ] 폼 검증 (validators 사용)
- [ ] 실시간 미리보기
- [ ] 저장 버튼
- [ ] 취소 버튼
- [ ] 커밋: `feat: Add Settings form`

**완료 조건**:
- 모든 설정 항목 작동
- 폼 검증 정상

---

### 2.2 Audio System (4시간)

#### Task 2.2.1: AudioManager 확장 (TDD)
**예상 시간**: 3시간 | **의존성**: Phase 1 완료

**테스트**: `tests/unit/managers/AudioManager.test.js`  
**구현**: `src/js/managers/AudioManager.js`

**체크리스트**:
- [ ] playNotification() 테스트 및 구현
- [ ] startTicking() 테스트 및 구현
- [ ] stopTicking() 테스트 및 구현
- [ ] updateVolume() 테스트 및 구현
- [ ] 사운드 타입 전환 테스트 및 구현
- [ ] 사운드 프리로드
- [ ] 커버리지 95% 이상
- [ ] 커밋: `test: Add AudioManager tests`
- [ ] 커밋: `feat: Implement AudioManager`

**완료 조건**:
- 사운드 재생 정상
- 볼륨 조절 작동

---

#### Task 2.2.2: 사운드 파일 추가
**예상 시간**: 1시간 | **의존성**: Task 2.2.1

**체크리스트**:
- [ ] bell.mp3 추가 (또는 생성)
- [ ] chime.mp3 추가
- [ ] tick.mp3 추가
- [ ] 사운드 최적화 (크기, 품질)
- [ ] 라이선스 확인
- [ ] 커밋: `feat: Add sound files`

**완료 조건**:
- 모든 사운드 파일 추가
- 정상 재생 확인

---

### 2.3 키보드 단축키 (2시간)

#### Task 2.3.1: KeyboardManager (TDD)
**예상 시간**: 2시간 | **의존성**: Task 2.1.2

**테스트**: `tests/unit/managers/KeyboardManager.test.js`  
**구현**: `src/js/managers/KeyboardManager.js`

**체크리스트**:
- [ ] Space 키 (Play/Pause) 테스트 및 구현
- [ ] R 키 (Reset) 테스트 및 구현
- [ ] N 키 (Next) 테스트 및 구현
- [ ] 단축키 비활성화 테스트
- [ ] input focus 시 충돌 방지
- [ ] 커버리지 95% 이상
- [ ] 커밋: `test: Add KeyboardManager tests`
- [ ] 커밋: `feat: Implement keyboard shortcuts`

**완료 조건**:
- 모든 단축키 작동
- 충돌 없음

---

### 2.4 세션 자동 시작 (2시간)

#### Task 2.4.1: Auto-start 기능
**예상 시간**: 2시간 | **의존성**: Task 2.1.2

**체크리스트**:
- [ ] 설정 옵션 추가 (autoStartBreaks, autoStartPomodoros)
- [ ] 휴식 후 자동 시작 구현
- [ ] 집중 후 자동 시작 구현
- [ ] 카운트다운 표시 (3, 2, 1...)
- [ ] 취소 버튼
- [ ] 커밋: `feat: Add auto-start feature`

**완료 조건**:
- 자동 시작 정상 작동
- 취소 가능

---

### 2.5 Round Indicator UI (2시간)

#### Task 2.5.1: Round Indicator Component
**예상 시간**: 2시간 | **의존성**: Task 1.10.4

**파일**: `src/js/components/RoundIndicator.js`

**체크리스트**:
- [ ] 라운드 점 표시 (4개)
- [ ] 현재 라운드 하이라이트
- [ ] 완료된 라운드 표시
- [ ] 애니메이션 효과
- [ ] 커밋: `feat: Add Round Indicator UI`

**완료 조건**:
- 라운드 표시 정상 작동
- 애니메이션 부드러움

---

## 🎯 Phase 3: Statistics & Analytics

**목표**: 통계 추적 및 시각화  
**기간**: 2주 (80시간)  
**우선순위**: 🟢 Low

### 3.1 통계 추적 (4시간)

#### Task 3.1.1: StatisticsTracker (TDD)
**예상 시간**: 4시간 | **의존성**: Phase 2 완료

**테스트**: `tests/unit/managers/StatisticsTracker.test.js`  
**구현**: `src/js/managers/StatisticsTracker.js`

**체크리스트**:
- [ ] recordCompletion() 테스트 및 구현
- [ ] getDailyStats() 테스트 및 구현
- [ ] getWeeklyStats() 테스트 및 구현
- [ ] calculateStreak() 테스트 및 구현
- [ ] 커버리지 95% 이상
- [ ] 커밋: `test: Add StatisticsTracker tests`
- [ ] 커밋: `feat: Implement StatisticsTracker`

**완료 조건**:
- 통계 추적 정상 작동

---

### 3.2 통계 페이지 (7시간)

#### Task 3.2.1: Statistics Component
**예상 시간**: 4시간 | **의존성**: Task 3.1.1

**파일**: `src/js/components/Statistics.js`

**체크리스트**:
- [ ] 통계 카드 (총 뽀모도로, 총 시간)
- [ ] 주간 히트맵
- [ ] 일일 그래프
- [ ] 연속 달성 표시
- [ ] 커밋: `feat: Add Statistics component`

**완료 조건**:
- 통계 페이지 완성

---

#### Task 3.2.2: Chart.js 통합
**예상 시간**: 3시간 | **의존성**: Task 3.2.1

**체크리스트**:
- [ ] Chart.js 설치
- [ ] 일일 세션 수 그래프
- [ ] 주간 활동 히트맵
- [ ] 집중 시간 vs 휴식 시간 차트
- [ ] 반응형 차트
- [ ] 커밋: `feat: Integrate Chart.js`

**완료 조건**:
- 모든 차트 정상 작동

---

### 3.3 성취 시스템 (5시간)

#### Task 3.3.1: AchievementManager (TDD)
**예상 시간**: 3시간 | **의존성**: Task 3.1.1

**테스트**: `tests/unit/managers/AchievementManager.test.js`  
**구현**: `src/js/managers/AchievementManager.js`

**체크리스트**:
- [ ] checkAchievements() 테스트 및 구현
- [ ] unlockAchievement() 테스트 및 구현
- [ ] 각 성취 조건 테스트
- [ ] 커버리지 95% 이상
- [ ] 커밋: `test: Add AchievementManager tests`
- [ ] 커밋: `feat: Implement AchievementManager`

**완료 조건**:
- 성취 시스템 작동

---

#### Task 3.3.2: Achievement UI
**예상 시간**: 2시간 | **의존성**: Task 3.3.1

**체크리스트**:
- [ ] 성취 배지 디자인
- [ ] 언락 애니메이션
- [ ] 성취 목록 표시
- [ ] 진행률 표시
- [ ] 커밋: `feat: Add Achievement UI`

**완료 조건**:
- 성취 UI 완성

---

### 3.4 데이터 내보내기 (2시간)

#### Task 3.4.1: Export 기능
**예상 시간**: 2시간 | **의존성**: Task 3.2.1

**체크리스트**:
- [ ] CSV 내보내기
- [ ] JSON 내보내기
- [ ] 날짜 범위 선택
- [ ] 다운로드 기능
- [ ] 커밋: `feat: Add data export feature`

**완료 조건**:
- 데이터 내보내기 작동

---

## 🎯 Phase 4: Advanced Features

**목표**: PWA 및 고급 기능  
**기간**: 2주 (80시간)  
**우선순위**: 🔵 Future

### 4.1 PWA 설정 (5시간)

#### Task 4.1.1: Manifest 생성
**예상 시간**: 1시간 | **의존성**: Phase 3 완료

**파일**: `manifest.json`

**체크리스트**:
- [ ] 앱 정보 정의
- [ ] 아이콘 생성 (192x192, 512x512)
- [ ] 테마 색상 설정
- [ ] 디스플레이 모드 설정 (standalone)
- [ ] 커밋: `feat: Add PWA manifest`

**완료 조건**:
- PWA 설치 가능

---

#### Task 4.1.2: Service Worker
**예상 시간**: 4시간 | **의존성**: Task 4.1.1

**파일**: `sw.js`

**체크리스트**:
- [ ] 캐시 전략 정의
- [ ] 오프라인 지원
- [ ] 백그라운드 동기화
- [ ] 푸시 알림 준비
- [ ] 커밋: `feat: Add Service Worker`

**완료 조건**:
- 오프라인 작동

---

### 4.2 다국어 지원 (3시간)

#### Task 4.2.1: i18n 시스템 구축
**예상 시간**: 3시간 | **의존성**: Phase 3 완료

**체크리스트**:
- [ ] 번역 파일 구조 (`locales/`)
- [ ] 한국어 (ko.json)
- [ ] 영어 (en.json)
- [ ] 언어 전환 기능
- [ ] 날짜/시간 로케일
- [ ] 커밋: `feat: Add i18n support`

**완료 조건**:
- 다국어 전환 작동

---

### 4.3 태스크 관리 (4시간)

#### Task 4.3.1: Task 기능
**예상 시간**: 4시간 | **의존성**: Phase 3 완료

**체크리스트**:
- [ ] 태스크 입력
- [ ] 태스크 목록
- [ ] 태스크 완료 체크
- [ ] 태스크별 뽀모도로 수
- [ ] 커밋: `feat: Add task management`

**완료 조건**:
- 태스크 관리 작동

---

## 📝 커밋 메시지 규칙

### 형식
```
<type>: <subject>

<body>

<footer>
```

### Type
- `feat`: 새 기능
- `fix`: 버그 수정
- `test`: 테스트 추가/수정
- `refactor`: 리팩토링
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `perf`: 성능 개선
- `build`: 빌드 설정
- `chore`: 기타 변경

### 예시
```
feat: Implement TimerManager with TDD

- Add comprehensive tests for TimerManager
- Implement all timer methods (start, pause, tick, reset, complete)
- Apply SOLID principles (SRP, DIP)
- Achieve 95% test coverage

Closes #1
```

---

## 🎯 다음 단계

### 즉시 시작 가능한 작업
1. **Task 1.1.1**: GitHub Repository 설정 (30분)
2. **Task 1.1.2**: 개발 환경 설정 (30분)
3. **Task 1.1.3**: 프로젝트 구조 생성 (30분)

### 이번 주 목표 (Week 1)
- [ ] 프로젝트 설정 완료 (1.1)
- [ ] Constants 및 EventEmitter 완료 (1.2)
- [ ] TimerManager 완료 (1.3)
- [ ] StateManager 완료 (1.4)
- [ ] Utilities 완료 (1.5)

---

**최종 업데이트**: 2025-12-24  
**상태**: ✅ 준비 완료  
**다음 작업**: Task 1.1.1 (GitHub Repository 설정)
