## 🎯 작업 배경

TimerManager는 Pomodoro Timer의 핵심 로직을 담당하는 매니저입니다. TDD 방법론을 따라 테스트를 먼저 작성하여 요구사항을 명확히 하고, SOLID 원칙을 적용하여 유지보수 가능한 코드를 작성해야 합니다.

이 작업은 Red-Green-Refactor 사이클의 **Red 단계**로, 실패하는 테스트를 먼저 작성합니다.

---

## 📋 작업 내용

### 체크리스트

#### Constructor 테스트
- [ ] 초기 상태 확인 테스트 (isRunning = false, remainingTime = 0)
- [ ] 의존성 주입 확인 테스트 (DIP 원칙)
- [ ] 세션 타입 초기화 테스트

#### start() 메서드 테스트
- [ ] isRunning이 true로 변경되는지 테스트
- [ ] 이미 실행 중일 때 에러 발생 테스트
- [ ] interval 시작 확인 테스트 (fake timers 사용)
- [ ] TIMER_START 이벤트 발생 테스트

#### pause() 메서드 테스트
- [ ] isRunning이 false로 변경되는지 테스트
- [ ] interval 정리 확인 테스트
- [ ] TIMER_PAUSE 이벤트 발생 테스트

#### tick() 메서드 테스트
- [ ] remainingTime 1초 감소 테스트
- [ ] 0에 도달 시 complete() 호출 테스트
- [ ] 0 이하로 감소하지 않는지 테스트
- [ ] TIMER_TICK 이벤트 발생 테스트

#### reset() 메서드 테스트
- [ ] 타이머 일시정지 테스트
- [ ] remainingTime 초기화 테스트
- [ ] TIMER_RESET 이벤트 발생 테스트

#### complete() 메서드 테스트
- [ ] 타이머 일시정지 테스트
- [ ] TIMER_COMPLETE 이벤트 발생 테스트 (세션 타입 포함)

#### setSession() 메서드 테스트
- [ ] 세션 타입 변경 테스트
- [ ] remainingTime 업데이트 테스트

### 구현 세부사항

**테스트 파일**: `tests/unit/managers/TimerManager.test.js`

**테스트 구조**:
```javascript
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { TimerManager } from '../../../src/js/managers/TimerManager.js';
import { EventEmitter } from '../../../src/js/utils/EventEmitter.js';
import { SESSION_TYPES, DEFAULT_DURATIONS, EVENTS } from '../../../src/js/constants.js';

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

  // ... 나머지 테스트
});
```

**Mock 사용**:
- `vi.useFakeTimers()`: interval 테스트
- `vi.spyOn()`: 메서드 호출 확인
- `vi.fn()`: 이벤트 콜백 모킹

---

## ✅ 인수 조건

- [ ] 모든 테스트 케이스 작성 완료 (최소 20개 이상)
- [ ] 테스트 실행 시 모두 실패 확인 (Red 단계)
- [ ] AAA 패턴 준수 (Arrange-Act-Assert)
- [ ] 테스트 이름이 명확하고 설명적
- [ ] Mock과 Spy 적절히 사용
- [ ] 커밋 메시지: `test: Add TimerManager comprehensive tests`
- [ ] 코드 리뷰 완료

---

## 📚 참고 자료

- [TASKS.md - Task 1.3.1](../../docs/TASKS.md#task-131-timermanager-테스트-작성)
- [TDD Rules](../../docs/rules/tdd.md)
- [Vitest Documentation](https://vitest.dev/)
- [TimerManager Example Test](../../tests/examples/TimerManager.example.test.js)

---

## 🏷️ Labels

`phase-1`, `tdd`, `core-logic`, `testing`, `high-priority`

---

## ⏱️ 예상 시간

3시간

---

## 🔗 의존성

- Depends on #5 (EventEmitter 구현)

---

## 📝 TDD 체크리스트

- [ ] **Red**: 실패하는 테스트 작성 ← 현재 단계
- [ ] **Green**: 최소 구현으로 테스트 통과 (다음 Issue)
- [ ] **Refactor**: 코드 개선 (다음 Issue)

---

## 💡 팁

1. **한 번에 하나씩**: 테스트를 하나씩 작성하고 실행하여 실패 확인
2. **명확한 이름**: 테스트 이름이 무엇을 테스트하는지 명확히 표현
3. **독립성**: 각 테스트는 독립적으로 실행 가능해야 함
4. **Mock 활용**: 외부 의존성은 Mock으로 대체
5. **엣지 케이스**: 정상 케이스뿐만 아니라 엣지 케이스도 테스트
