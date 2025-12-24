# 테스트 주도 개발 (TDD) 규칙

## 📋 개요

이 프로젝트는 모든 코어 로직 구현(UI 컴포넌트 제외)에 **테스트 주도 개발(TDD)** 방법론을 따릅니다. 모든 비즈니스 로직, 매니저, 유틸리티, 데이터 처리는 TDD 접근 방식을 사용하여 개발해야 합니다.

---

## 🎯 TDD 원칙

### Red-Green-Refactor 사이클

1. **🔴 Red**: 실패하는 테스트를 먼저 작성
2. **🟢 Green**: 테스트를 통과하는 최소한의 코드 작성
3. **🔵 Refactor**: 테스트를 통과 상태로 유지하면서 코드 개선

### 황금 규칙

> **실패하는 테스트 없이는 절대 프로덕션 코드를 작성하지 마세요.**

---

## ✅ TDD를 따라야 하는 것

### 코어 로직 (TDD 필수)
- ✅ **Managers**: TimerManager, StateManager, AudioManager, NotificationManager
- ✅ **Utilities**: 시간 포맷터, 검증기, 스토리지 헬퍼
- ✅ **Data Models**: Settings, Statistics, Session state
- ✅ **Business Logic**: 타이머 계산, 세션 전환, 통계 추적
- ✅ **State Management**: LocalStorage 작업, 상태 업데이트

### UI 컴포넌트 (TDD 선택사항)
- ⚠️ **DOM 조작**: 직접적인 UI 업데이트 (통합 테스트 사용 가능)
- ⚠️ **시각적 컴포넌트**: CSS 스타일링, 애니메이션
- ⚠️ **이벤트 핸들러**: 통합/E2E 테스트로 테스트 가능

---

## 📝 TDD 워크플로우

### 단계별 프로세스

#### 1. 테스트를 먼저 작성 (Red 단계)

```javascript
// tests/unit/TimerManager.test.js
import { describe, test, expect, beforeEach } from 'vitest';
import { TimerManager } from '../../src/js/managers/TimerManager.js';

describe('TimerManager', () => {
  let timer;

  beforeEach(() => {
    timer = new TimerManager();
  });

  test('타이머를 시작하고 isRunning을 true로 설정해야 함', () => {
    // Arrange
    expect(timer.isRunning).toBe(false);

    // Act
    timer.start();

    // Assert
    expect(timer.isRunning).toBe(true);
  });
});
```

**테스트 실행**: `npm run test` → ❌ 테스트 실패 (Red)

#### 2. 최소한의 코드 작성 (Green 단계)

```javascript
// src/js/managers/TimerManager.js
export class TimerManager {
  constructor() {
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
  }
}
```

**테스트 실행**: `npm run test` → ✅ 테스트 통과 (Green)

#### 3. 리팩토링 (Refactor 단계)

```javascript
// 코드 품질 개선, 에러 처리 추가 등
export class TimerManager {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
  }

  start() {
    if (this.isRunning) {
      throw new Error('Timer is already running');
    }
    this.isRunning = true;
  }
}
```

**테스트 실행**: `npm run test` → ✅ 테스트 여전히 통과

#### 4. 추가 테스트 작성

```javascript
test('이미 실행 중인 타이머를 시작하면 에러를 던져야 함', () => {
  timer.start();
  expect(() => timer.start()).toThrow('Timer is already running');
});
```

---

## 🧪 테스트 구조

### AAA 패턴 (Arrange-Act-Assert)

```javascript
test('남은 시간을 올바르게 계산해야 함', () => {
  // Arrange - 테스트 데이터 설정
  const timer = new TimerManager();
  timer.remainingTime = 100;

  // Act - 함수 실행
  timer.tick();

  // Assert - 결과 검증
  expect(timer.remainingTime).toBe(99);
});
```

### 테스트 네이밍 규칙

```javascript
// ✅ 좋음: 설명적이고, 예상 동작을 명시
test('pause가 호출되면 타이머를 일시정지하고 interval을 클리어해야 함', () => {});
test('타이머가 0에 도달하면 complete 이벤트를 발생시켜야 함', () => {});
test('타이머를 초기 시간으로 리셋해야 함', () => {});

// ❌ 나쁨: 모호하고, 동작을 설명하지 않음
test('pause test', () => {});
test('timer works', () => {});
```

---

## 📊 테스트 커버리지 요구사항

### 최소 커버리지
- **Core Logic**: 90% 이상 커버리지
- **Managers**: 95% 이상 커버리지
- **Utilities**: 100% 커버리지

### 커버리지 명령어
```bash
npm run test -- --coverage
```

### 테스트해야 할 것

#### ✅ 반드시 테스트
- Public 메서드와 반환값
- 엣지 케이스와 경계 조건
- 에러 처리와 예외
- 상태 전환
- 부수 효과 (이벤트, 스토리지)

#### ❌ 테스트하지 않음
- Private 구현 세부사항
- 서드파티 라이브러리
- 단순한 getter/setter (로직이 없는 경우)
- UI 렌더링 (E2E 테스트 사용)

---

## 🎯 예제: TDD 구현

### 기능: 타이머 카운트다운

#### 테스트 1: 타이머는 1초씩 감소해야 함

```javascript
// tests/unit/TimerManager.test.js
test('tick이 호출되면 remainingTime이 1 감소해야 함', () => {
  // Arrange
  const timer = new TimerManager();
  timer.remainingTime = 100;

  // Act
  timer.tick();

  // Assert
  expect(timer.remainingTime).toBe(99);
});
```

**실행**: ❌ 실패 (tick 메서드 없음)

#### 구현 1

```javascript
// src/js/managers/TimerManager.js
tick() {
  this.remainingTime--;
}
```

**실행**: ✅ 통과

#### 테스트 2: 타이머가 0에 도달하면 완료되어야 함

```javascript
test('remainingTime이 0에 도달하면 complete를 호출해야 함', () => {
  // Arrange
  const timer = new TimerManager();
  timer.remainingTime = 1;
  const completeSpy = vi.spyOn(timer, 'complete');

  // Act
  timer.tick();

  // Assert
  expect(timer.remainingTime).toBe(0);
  expect(completeSpy).toHaveBeenCalled();
});
```

**실행**: ❌ 실패 (complete 메서드 없음)

#### 구현 2

```javascript
tick() {
  if (this.remainingTime > 0) {
    this.remainingTime--;
  }
  
  if (this.remainingTime === 0) {
    this.complete();
  }
}

complete() {
  this.pause();
  this.emit('complete', this.sessionType);
}
```

**실행**: ✅ 통과

---

## 🔧 테스팅 도구 및 설정

### 테스트 프레임워크: Vitest

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.js'
      ]
    }
  }
});
```

### LocalStorage Mock

```javascript
// tests/setup.js
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = localStorageMock;
```

### Timer Mock

```javascript
import { vi } from 'vitest';

test('매 초마다 tick을 호출해야 함', () => {
  vi.useFakeTimers();
  
  const timer = new TimerManager();
  const tickSpy = vi.spyOn(timer, 'tick');
  
  timer.start();
  vi.advanceTimersByTime(1000);
  
  expect(tickSpy).toHaveBeenCalledTimes(1);
  
  vi.useRealTimers();
});
```

---

## 📋 TDD 체크리스트

코드 커밋 전 확인사항:

- [ ] 모든 새 기능에 대해 테스트를 **먼저** 작성했는가
- [ ] 테스트가 Red-Green-Refactor 사이클을 따르는가
- [ ] 테스트 이름이 예상 동작을 명확히 설명하는가
- [ ] 테스트가 AAA 패턴을 사용하는가 (Arrange-Act-Assert)
- [ ] 엣지 케이스가 커버되는가
- [ ] 에러 케이스가 테스트되는가
- [ ] 코드 커버리지가 최소 요구사항을 충족하는가 (90% 이상)
- [ ] 모든 테스트가 통과하는가: `npm run test`
- [ ] 정당한 이유 없이 스킵되거나 비활성화된 테스트가 없는가

---

## 🚫 피해야 할 일반적인 TDD 안티패턴

### ❌ 코드 작성 후 테스트 작성
```javascript
// 잘못됨: 코드 먼저, 그 다음 테스트
function add(a, b) { return a + b; }
test('add should work', () => expect(add(1, 2)).toBe(3));
```

### ✅ 테스트 작성 후 코드 작성
```javascript
// 올바름: 테스트 먼저, 그 다음 코드
test('add는 두 숫자의 합을 반환해야 함', () => {
  expect(add(1, 2)).toBe(3);
});

// 그 다음 구현
function add(a, b) { return a + b; }
```

### ❌ 구현 세부사항 테스트
```javascript
// 잘못됨: private 메서드 테스트
test('_calculateProgress should...', () => {});
```

### ✅ Public 인터페이스 테스트
```javascript
// 올바름: public 동작 테스트
test('getProgress는 경과 시간의 백분율을 반환해야 함', () => {});
```

### ❌ 하나의 거대한 테스트
```javascript
// 잘못됨: 하나의 테스트에서 모든 것을 테스트
test('timer should work', () => {
  // 50줄의 테스트 코드...
});
```

### ✅ 작고 집중된 테스트
```javascript
// 올바름: 테스트당 하나의 동작
test('타이머를 시작해야 함', () => {});
test('타이머를 일시정지해야 함', () => {});
test('타이머를 리셋해야 함', () => {});
```

---

## 📚 TDD 리소스

### 책
- "Test Driven Development: By Example" by Kent Beck
- "Growing Object-Oriented Software, Guided by Tests" by Steve Freeman

### 아티클
- [Vitest 문서](https://vitest.dev/)
- [Testing JavaScript](https://testingjavascript.com/)

### 내부 문서
- 테스팅 전략은 `TECH_SPEC.md` 참조
- 테스트 예제는 `tests/examples/` 참조

---

## 🎯 성공 지표

### 코드 품질 지표
- ✅ 코어 로직 90% 이상 테스트 커버리지
- ✅ 머지 전 모든 테스트 통과
- ✅ 빠른 테스트 실행 (단위 테스트 5초 미만)
- ✅ 불안정한 테스트 없음
- ✅ 명확하고 설명적인 테스트 이름

### 개발 흐름
- ✅ 구현 전에 테스트 작성
- ✅ 작고 점진적인 커밋
- ✅ 지속적인 리팩토링
- ✅ 빠른 피드백 루프

---

## 💡 효과적인 TDD를 위한 팁

1. **작게 시작**: 가장 간단한 테스트 케이스부터 시작
2. **한 번에 하나씩**: 다음으로 넘어가기 전에 하나의 테스트를 통과시키는 데 집중
3. **두려움 없이 리팩토링**: 테스트가 코드 개선에 대한 자신감을 줌
4. **테스트를 빠르게 유지**: 단위 테스트는 밀리초 단위로 실행되어야 함
5. **구현이 아닌 동작 테스트**: 어떻게가 아닌 무엇에 집중
6. **설명적인 이름 사용**: 테스트 이름이 문서가 됨
7. **AAA 패턴 따르기**: Arrange, Act, Assert
8. **외부 의존성 Mock**: 테스트를 독립적으로 유지
9. **테스트 자주 실행**: 작은 변경마다 실행
10. **테스트를 단순하게 유지**: 테스트는 코드보다 이해하기 쉬워야 함

---

**기억하세요**: TDD는 테스팅에 관한 것이 아니라 **설계**에 관한 것입니다. 테스트는 좋은 설계의 부산물입니다.

---

**최종 업데이트**: 2025-12-24  
**상태**: ✅ 활성 규칙  
**적용 대상**: 모든 코어 로직 (managers, utilities, business logic)
