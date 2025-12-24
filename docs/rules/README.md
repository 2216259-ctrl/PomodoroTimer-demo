# 개발 규칙

## 📋 개요

이 디렉토리에는 Pomodoro Timer 프로젝트에 기여할 때 **반드시** 따라야 하는 핵심 개발 규칙과 원칙이 포함되어 있습니다.

---

## 🎯 핵심 규칙

### 1. **테스트 주도 개발 (TDD)**
📄 **문서**: [tdd.md](./tdd.md)

**요약**: 모든 코어 로직은 TDD 방법론을 사용하여 개발해야 합니다.

**핵심 사항**:
- ✅ 구현 **전에** 테스트 작성
- ✅ Red-Green-Refactor 사이클 준수
- ✅ 코어 로직 90% 이상 테스트 커버리지
- ✅ 테스트는 빠르고 독립적이어야 함

**적용 대상**:
- Managers (TimerManager, StateManager 등)
- Utilities (formatters, validators 등)
- 비즈니스 로직
- 데이터 모델

**적용 제외**:
- UI 컴포넌트 (통합/E2E 테스트 사용)
- CSS 스타일링
- 시각적 애니메이션

---

### 2. **SOLID 원칙**
📄 **문서**: [solid.md](./solid.md)

**요약**: 모든 코드는 SOLID 설계 원칙을 따라야 합니다.

**5가지 원칙**:

1. **S** - 단일 책임 원칙 (Single Responsibility Principle)
   - 각 클래스는 하나의 변경 이유만 가짐
   - 하나의 클래스 = 하나의 책임

2. **O** - 개방-폐쇄 원칙 (Open/Closed Principle)
   - 확장에는 열려있고, 수정에는 닫혀있음
   - 기존 코드 변경 없이 기능 추가

3. **L** - 리스코프 치환 원칙 (Liskov Substitution Principle)
   - 서브클래스는 부모 클래스를 대체할 수 있어야 함
   - 계약과 예상 동작 유지

4. **I** - 인터페이스 분리 원칙 (Interface Segregation Principle)
   - 작은 인터페이스 여러 개 > 큰 인터페이스 하나
   - 사용하지 않는 메서드 구현 강제하지 않음

5. **D** - 의존성 역전 원칙 (Dependency Inversion Principle)
   - 추상화에 의존, 구체화에 의존하지 않음
   - 의존성 주입 사용

**적용 대상**:
- 모든 코드 (특히 코어 로직)
- 클래스 설계
- 모듈 아키텍처

---

## 📚 빠른 참조

### TDD 워크플로우

```bash
# 1. 실패하는 테스트 작성 (Red)
npm run test
# ❌ 테스트 실패

# 2. 최소한의 코드 작성 (Green)
# ... 기능 구현 ...
npm run test
# ✅ 테스트 통과

# 3. 리팩토링 (Refactor)
# ... 코드 개선 ...
npm run test
# ✅ 테스트 여전히 통과
```

### SOLID 빠른 체크

커밋 전에 자문하기:

- [ ] **SRP**: 각 클래스가 하나의 책임만 가지는가?
- [ ] **OCP**: 기존 코드 수정 없이 기능을 추가할 수 있는가?
- [ ] **LSP**: 서브클래스가 부모 클래스를 안전하게 대체할 수 있는가?
- [ ] **ISP**: 인터페이스가 작고 집중되어 있는가?
- [ ] **DIP**: 의존성이 주입되며, 하드코딩되지 않았는가?

---

## 🎯 예제: 두 규칙 모두 적용하기

### Step 1: 테스트 먼저 작성 (TDD)

```javascript
// tests/unit/TimerManager.test.js
import { describe, test, expect } from 'vitest';
import { TimerManager } from '../../src/js/managers/TimerManager.js';

describe('TimerManager', () => {
  test('주입된 의존성으로 타이머를 시작해야 함', () => {
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

### Step 2: SOLID 원칙을 따라 구현 (Green)

```javascript
// src/js/managers/TimerManager.js

// SRP: Timer는 타이머 로직만 관리
// DIP: 의존성 주입, 하드코딩하지 않음
export class TimerManager {
  constructor(storage, notifier) {
    this.storage = storage;      // DIP: 주입된 의존성
    this.notifier = notifier;    // DIP: 주입된 의존성
    this.isRunning = false;
    this.remainingTime = 0;
  }

  // SRP: 단일 책임 - 타이머 시작
  start() {
    if (this.isRunning) {
      throw new Error('Timer already running');
    }
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  // SRP: 단일 책임 - 틱 로직
  tick() {
    if (this.remainingTime > 0) {
      this.remainingTime--;
    } else {
      this.complete();
    }
  }

  // SRP: 단일 책임 - 완료 로직
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

// ISP: 관심사별로 인터페이스 분리
export class IStorage {
  save(key, value) { throw new Error('Not implemented'); }
  load(key) { throw new Error('Not implemented'); }
}

export class INotifier {
  notify(message) { throw new Error('Not implemented'); }
}
```

### Step 3: 리팩토링 (Refactor)

```javascript
// OCP: 전략 패턴을 통한 확장
export class SessionStrategy {
  getDuration() { throw new Error('Not implemented'); }
}

export class FocusSession extends SessionStrategy {
  getDuration() { return 50 * 60; }
}

export class BreakSession extends SessionStrategy {
  getDuration() { return 10 * 60; }
}

// LSP: TimerManager는 모든 SessionStrategy와 작동 가능
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

---

## ✅ 커밋 전 체크리스트

코드 커밋 전 확인사항:

### TDD 체크리스트
- [ ] 구현 **전에** 테스트 작성
- [ ] 모든 테스트 통과: `npm run test`
- [ ] 테스트 커버리지 ≥ 90%: `npm run test -- --coverage`
- [ ] 테스트가 AAA 패턴 사용 (Arrange-Act-Assert)
- [ ] 테스트 이름이 예상 동작을 설명

### SOLID 체크리스트
- [ ] 각 클래스가 단일 책임을 가짐 (SRP)
- [ ] 새 기능이 기존 코드를 수정하지 않음 (OCP)
- [ ] 서브클래스가 부모 계약을 유지 (LSP)
- [ ] 인터페이스가 작고 집중됨 (ISP)
- [ ] 의존성이 주입됨 (DIP)

### 코드 품질
- [ ] console.log 문 없음
- [ ] ESLint 통과: `npm run lint`
- [ ] 코드 포맷팅: `npm run format`
- [ ] 의미있는 변수/함수 이름
- [ ] 복잡한 로직에만 주석

---

## 🚫 일반적인 위반 사례

### TDD 위반

❌ **테스트 전에 코드 작성**
```javascript
// 잘못된 순서
function add(a, b) { return a + b; }
test('add works', () => expect(add(1, 2)).toBe(3));
```

✅ **코드 전에 테스트 작성**
```javascript
// 올바른 순서
test('add should return sum', () => expect(add(1, 2)).toBe(3));
function add(a, b) { return a + b; }
```

### SOLID 위반

❌ **God 클래스 (SRP 위반)**
```javascript
class Application {
  startTimer() {}
  saveData() {}
  playSound() {}
  showNotification() {}
  // ... 20개 이상의 메서드
}
```

✅ **단일 책임**
```javascript
class TimerManager { startTimer() {} }
class StorageManager { saveData() {} }
class AudioManager { playSound() {} }
class NotificationManager { showNotification() {} }
```

❌ **강한 결합 (DIP 위반)**
```javascript
class Timer {
  constructor() {
    this.storage = new LocalStorage(); // 하드코딩
  }
}
```

✅ **의존성 주입**
```javascript
class Timer {
  constructor(storage) {
    this.storage = storage; // 주입됨
  }
}
```

---

## 📖 추가 자료

### TDD 리소스
- [tdd.md](./tdd.md) - 완전한 TDD 가이드
- [Vitest 문서](https://vitest.dev/)
- "Test Driven Development: By Example" by Kent Beck

### SOLID 리소스
- [solid.md](./solid.md) - 완전한 SOLID 가이드
- "Clean Code" by Robert C. Martin
- "Design Patterns" by Gang of Four

### 프로젝트 문서
- [TECH_SPEC.md](../../TECH_SPEC.md) - 기술 명세서
- [PRD.md](../../PRD.md) - 제품 요구사항

---

## 💡 성공을 위한 팁

1. **테스트부터 시작**: 항상 테스트를 먼저 작성
2. **단순하게 유지**: 테스트를 통과하는 최소한의 코드 작성
3. **자주 리팩토링**: 테스트가 통과하는 동안 코드 개선
4. **하나의 책임**: 각 클래스는 한 가지를 잘 해야 함
5. **의존성 주입**: 코드를 테스트 가능하고 유연하게 만듦
6. **작은 커밋**: Red-Green-Refactor 사이클마다 커밋
7. **테스트 자주 실행**: 작은 변경마다 실행
8. **SOLID 검토**: 새 클래스 설계 전에 검토

---

## 🎯 성공 지표

### 코드 품질 지표
- ✅ 90% 이상 테스트 커버리지
- ✅ 모든 테스트 통과
- ✅ 빠른 테스트 실행 (단위 테스트 5초 미만)
- ✅ SOLID 위반 없음
- ✅ 깨끗하고 유지보수 가능한 코드

### 개발 흐름
- ✅ TDD 워크플로우 준수
- ✅ 작고 집중된 커밋
- ✅ 지속적인 리팩토링
- ✅ 빠른 피드백 루프

---

## 🤝 기여하기

이 프로젝트에 기여할 때:

1. [tdd.md](./tdd.md)와 [solid.md](./solid.md) 읽기
2. 모든 코어 로직에 TDD 워크플로우 따르기
3. 설계에 SOLID 원칙 적용
4. 모든 테스트 통과 확인
5. 린터와 포맷터 실행
6. 명확한 설명과 함께 PR 제출

---

**기억하세요**: 이 규칙들은 더 나은, 더 유지보수 가능한 코드를 작성하는 데 도움을 주기 위해 존재합니다. 이것들은 업계 모범 사례를 기반으로 한 가이드라인입니다.

---

**최종 업데이트**: 2025-12-24  
**상태**: ✅ 활성  
**적용**: 모든 코어 로직 기여에 필수
