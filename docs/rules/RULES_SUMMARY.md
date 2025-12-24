# 🎉 Development Rules Setup Complete!

## ✅ 생성된 규칙 파일

### 📁 프로젝트 구조
```
PomodoroTimer-demo/
├── docs/
│   └── rules/
│       ├── README.md           ✅ 규칙 요약
│       ├── tdd.md              ✅ TDD 규칙 (상세)
│       └── solid.md            ✅ SOLID 원칙 (상세)
│
├── tests/
│   ├── setup.js                ✅ 테스트 설정 (mocks)
│   └── examples/
│       └── TimerManager.example.test.js  ✅ TDD 예제
│
├── vitest.config.js            ✅ Vitest 설정
└── package.json                ✅ 테스트 스크립트
```

---

## 📋 규칙 요약

### 1️⃣ **TDD (Test-Driven Development)**
📄 **문서**: `docs/rules/tdd.md`

**핵심 원칙**:
- 🔴 **Red**: 실패하는 테스트 먼저 작성
- 🟢 **Green**: 테스트를 통과하는 최소한의 코드 작성
- 🔵 **Refactor**: 테스트를 유지하면서 코드 개선

**적용 대상**:
- ✅ Managers (TimerManager, StateManager, etc.)
- ✅ Utilities (formatters, validators, etc.)
- ✅ Business Logic
- ✅ Data Models

**적용 제외**:
- ⚠️ UI Components (integration/E2E 테스트 사용)
- ⚠️ CSS Styling
- ⚠️ Visual Animations

**커버리지 요구사항**:
- Core Logic: **90%+**
- Managers: **95%+**
- Utilities: **100%**

---

### 2️⃣ **SOLID Principles**
📄 **문서**: `docs/rules/solid.md`

**5가지 원칙**:

1. **S** - Single Responsibility Principle
   - 각 클래스는 **하나의 책임**만 가짐
   - 변경 이유가 하나여야 함

2. **O** - Open/Closed Principle
   - **확장에는 열려있고, 수정에는 닫혀있음**
   - 기존 코드 수정 없이 기능 추가

3. **L** - Liskov Substitution Principle
   - **서브클래스는 부모 클래스를 대체** 가능해야 함
   - 계약과 예상 동작 유지

4. **I** - Interface Segregation Principle
   - **작은 인터페이스 여러 개** > 큰 인터페이스 하나
   - 사용하지 않는 메서드 강제 구현 방지

5. **D** - Dependency Inversion Principle
   - **추상화에 의존**, 구체화에 의존하지 않음
   - 의존성 주입 사용

---

## 🧪 테스트 설정

### Vitest 설정 (`vitest.config.js`)

```javascript
{
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90
      }
    }
  }
}
```

### 테스트 Mocks (`tests/setup.js`)

자동으로 모킹되는 API:
- ✅ `localStorage`
- ✅ `Notification`
- ✅ `Audio`

---

## 🎯 개발 워크플로우

### TDD 사이클

```bash
# 1. 테스트 작성 (Red)
# tests/unit/TimerManager.test.js 에 테스트 작성

npm run test
# ❌ Test fails

# 2. 구현 (Green)
# src/js/managers/TimerManager.js 에 최소 구현

npm run test
# ✅ Test passes

# 3. 리팩토링 (Refactor)
# 코드 개선 (SOLID 원칙 적용)

npm run test
# ✅ Tests still pass

# 4. 커버리지 확인
npm run test -- --coverage
# ✅ Coverage ≥ 90%
```

### SOLID 체크리스트

코드 작성 전 확인:
- [ ] **SRP**: 각 클래스가 하나의 책임만 가지는가?
- [ ] **OCP**: 기존 코드 수정 없이 확장 가능한가?
- [ ] **LSP**: 서브클래스가 부모 클래스를 대체 가능한가?
- [ ] **ISP**: 인터페이스가 작고 집중되어 있는가?
- [ ] **DIP**: 의존성이 주입되는가? (하드코딩 X)

---

## 📝 예제: TDD + SOLID 적용

### Step 1: 테스트 작성 (TDD - Red)

```javascript
// tests/unit/TimerManager.test.js
import { describe, test, expect } from 'vitest';
import { TimerManager } from '../../src/js/managers/TimerManager.js';

describe('TimerManager', () => {
  test('should start timer with injected dependencies', () => {
    // Arrange
    const mockStorage = { save: vi.fn() };
    const mockNotifier = { notify: vi.fn() };
    const timer = new TimerManager(mockStorage, mockNotifier);

    // Act
    timer.start();

    // Assert
    expect(timer.isRunning).toBe(true);
  });
});
```

**실행**: `npm run test` → ❌ Fails

### Step 2: 구현 (TDD - Green + SOLID)

```javascript
// src/js/managers/TimerManager.js

// SRP: Timer는 타이머 로직만 담당
// DIP: 의존성 주입 (storage, notifier)
export class TimerManager {
  constructor(storage, notifier) {
    // DIP: 의존성 주입
    this.storage = storage;
    this.notifier = notifier;
    
    // 초기 상태
    this.isRunning = false;
    this.remainingTime = 0;
  }

  // SRP: 타이머 시작 책임만
  start() {
    if (this.isRunning) {
      throw new Error('Timer is already running');
    }
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  // SRP: 틱 로직 책임만
  tick() {
    if (this.remainingTime > 0) {
      this.remainingTime--;
    } else {
      this.complete();
    }
  }

  // SRP: 완료 처리 책임만
  complete() {
    this.pause();
    this.storage.save('lastCompleted', Date.now());
    this.notifier.notify('Timer Complete!');
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }
}
```

**실행**: `npm run test` → ✅ Passes

### Step 3: 리팩토링 (TDD - Refactor + SOLID)

```javascript
// OCP: 세션 전략으로 확장 가능하게
export class SessionStrategy {
  getDuration() { throw new Error('Not implemented'); }
}

export class FocusSession extends SessionStrategy {
  getDuration() { return 50 * 60; }
}

export class BreakSession extends SessionStrategy {
  getDuration() { return 10 * 60; }
}

// LSP: 어떤 SessionStrategy든 대체 가능
export class TimerManager {
  constructor(storage, notifier, sessionStrategy) {
    this.storage = storage;
    this.notifier = notifier;
    this.sessionStrategy = sessionStrategy;
    this.remainingTime = sessionStrategy.getDuration();
  }
  
  // ... 나머지 구현
}
```

**실행**: `npm run test` → ✅ Still passes

---

## ✅ 커밋 전 체크리스트

### TDD 체크리스트
- [ ] 테스트를 **먼저** 작성했는가?
- [ ] 모든 테스트가 통과하는가? (`npm run test`)
- [ ] 커버리지가 90% 이상인가? (`npm run test -- --coverage`)
- [ ] AAA 패턴을 따르는가? (Arrange-Act-Assert)
- [ ] 테스트 이름이 명확한가?

### SOLID 체크리스트
- [ ] **SRP**: 각 클래스가 단일 책임을 가지는가?
- [ ] **OCP**: 수정 없이 확장 가능한가?
- [ ] **LSP**: 서브클래스가 부모를 대체 가능한가?
- [ ] **ISP**: 인터페이스가 작고 집중되어 있는가?
- [ ] **DIP**: 의존성이 주입되는가?

### 코드 품질
- [ ] ESLint 통과: `npm run lint`
- [ ] Prettier 포맷팅: `npm run format`
- [ ] console.log 제거
- [ ] 의미있는 변수/함수명

---

## 🚀 다음 단계

### 1. 의존성 설치

```bash
npm install
```

### 2. 테스트 실행

```bash
# 모든 테스트 실행
npm run test

# Watch 모드
npm run test -- --watch

# 커버리지 확인
npm run test -- --coverage
```

### 3. 예제 테스트 확인

```bash
# 예제 테스트 파일 확인
cat tests/examples/TimerManager.example.test.js
```

### 4. Phase 1 MVP 구현 시작

TDD + SOLID 원칙을 따라 구현:
1. `tests/unit/TimerManager.test.js` 작성
2. `src/js/managers/TimerManager.js` 구현
3. 테스트 통과 확인
4. 리팩토링
5. 반복

---

## 📚 문서 읽는 순서

1. **`docs/rules/README.md`** ← 규칙 요약 (지금 여기!)
2. **`docs/rules/tdd.md`** ← TDD 상세 가이드
3. **`docs/rules/solid.md`** ← SOLID 상세 가이드
4. **`tests/examples/TimerManager.example.test.js`** ← 실제 예제
5. **`TECH_SPEC.md`** ← 기술 명세
6. **`PRD.md`** ← 제품 요구사항

---

## 💡 개발 팁

### TDD 팁
1. **작게 시작**: 가장 간단한 테스트부터
2. **한 번에 하나**: 한 테스트씩 통과시키기
3. **자주 실행**: 작은 변경마다 테스트 실행
4. **빠르게 유지**: 단위 테스트는 밀리초 단위
5. **행동 테스트**: 구현이 아닌 행동 테스트

### SOLID 팁
1. **클래스 작게**: 클래스가 크면 SRP 위반
2. **컴포지션 우선**: 상속보다 컴포지션
3. **의존성 주입**: 테스트 가능하고 유연함
4. **인터페이스 프로그래밍**: 구현이 아닌 인터페이스
5. **정기적 리팩토링**: 코드 깨끗하게 유지

---

## 🎯 성공 지표

### 코드 품질
- ✅ 90%+ 테스트 커버리지
- ✅ 모든 테스트 통과
- ✅ 빠른 테스트 실행 (< 5초)
- ✅ SOLID 원칙 준수
- ✅ 깨끗하고 유지보수 가능한 코드

### 개발 흐름
- ✅ TDD 워크플로우 준수
- ✅ 작고 집중된 커밋
- ✅ 지속적인 리팩토링
- ✅ 빠른 피드백 루프

---

## 🤝 기여하기

프로젝트에 기여할 때:

1. `docs/rules/` 문서 읽기
2. TDD 워크플로우 따르기
3. SOLID 원칙 적용
4. 모든 테스트 통과 확인
5. 린터/포맷터 실행
6. 명확한 설명과 함께 PR 제출

---

**기억하세요**: 
- TDD는 **디자인**에 관한 것입니다 (테스팅이 아님)
- SOLID는 **유지보수성**을 위한 것입니다
- 이 규칙들은 더 나은 코드를 작성하기 위한 **가이드**입니다

---

**Last Updated**: 2025-12-24  
**Status**: ✅ Active  
**Enforcement**: 모든 코어 로직에 필수 적용
