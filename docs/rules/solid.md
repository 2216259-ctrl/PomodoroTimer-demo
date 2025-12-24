# SOLID 원칙

## 📋 개요

이 프로젝트는 모든 코드 구현에 **SOLID 원칙**을 따릅니다. SOLID는 소프트웨어 설계를 더 이해하기 쉽고, 유연하며, 유지보수 가능하게 만드는 다섯 가지 설계 원칙의 약자입니다.

---

## 🎯 SOLID 원칙

### 1. **S** - 단일 책임 원칙 (Single Responsibility Principle, SRP)
### 2. **O** - 개방-폐쇄 원칙 (Open/Closed Principle, OCP)
### 3. **L** - 리스코프 치환 원칙 (Liskov Substitution Principle, LSP)
### 4. **I** - 인터페이스 분리 원칙 (Interface Segregation Principle, ISP)
### 5. **D** - 의존성 역전 원칙 (Dependency Inversion Principle, DIP)

---

## 1️⃣ 단일 책임 원칙 (Single Responsibility Principle, SRP)

> **클래스는 단 하나의 변경 이유만을 가져야 합니다.**

### 정의
각 클래스나 모듈은 기능의 단일 부분에 대한 책임을 가져야 하며, 그 책임은 클래스에 의해 완전히 캡슐화되어야 합니다.

### ❌ 나쁜 예: 다중 책임

```javascript
// 나쁨: TimerManager가 너무 많은 일을 함
class TimerManager {
  constructor() {
    this.remainingTime = 0;
  }

  start() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.remainingTime--;
    
    // ❌ 알림 책임
    if (this.remainingTime === 0) {
      new Notification('Timer Complete!');
    }
    
    // ❌ 스토리지 책임
    localStorage.setItem('timer', JSON.stringify(this.remainingTime));
    
    // ❌ 오디오 책임
    const audio = new Audio('bell.mp3');
    audio.play();
  }
}
```

### ✅ 좋은 예: 단일 책임

```javascript
// 좋음: 각 클래스가 하나의 책임을 가짐

// 책임: 타이머 로직만
class TimerManager {
  constructor(eventEmitter) {
    this.remainingTime = 0;
    this.eventEmitter = eventEmitter;
  }

  start() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.remainingTime--;
    
    if (this.remainingTime === 0) {
      this.eventEmitter.emit('timerComplete');
    }
  }
}

// 책임: 알림만
class NotificationManager {
  constructor(eventEmitter) {
    eventEmitter.on('timerComplete', () => this.showNotification());
  }

  showNotification() {
    new Notification('Timer Complete!');
  }
}

// 책임: 오디오만
class AudioManager {
  constructor(eventEmitter) {
    eventEmitter.on('timerComplete', () => this.playSound());
  }

  playSound() {
    const audio = new Audio('bell.mp3');
    audio.play();
  }
}

// 책임: 스토리지만
class StorageManager {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
```

### 이점
- ✅ 이해하고 유지보수하기 쉬움
- ✅ 테스트하기 쉬움 (한 번에 하나의 책임만 모킹)
- ✅ 한 책임의 변경이 다른 것에 영향을 주지 않음
- ✅ 코드 재사용성 향상

---

## 2️⃣ 개방-폐쇄 원칙 (Open/Closed Principle, OCP)

> **소프트웨어 엔티티는 확장에는 열려있고, 수정에는 닫혀있어야 합니다.**

### 정의
기존 코드를 변경하지 않고 새로운 기능을 추가할 수 있어야 합니다.

### ❌ 나쁜 예: 기존 코드 수정

```javascript
// 나쁨: 새 세션 타입을 추가하려면 클래스를 수정해야 함
class TimerManager {
  getSessionDuration(sessionType) {
    if (sessionType === 'focus') {
      return 50 * 60;
    } else if (sessionType === 'shortBreak') {
      return 10 * 60;
    } else if (sessionType === 'longBreak') {
      return 20 * 60;
    }
    // ❌ 새 세션 타입을 추가하려면 이 메서드를 수정해야 함
  }
}
```

### ✅ 좋은 예: 확장에 열림

```javascript
// 좋음: 확장성을 위해 전략 패턴 사용

// 기본 세션 클래스
class Session {
  constructor(duration) {
    this.duration = duration;
  }

  getDuration() {
    return this.duration;
  }
}

// 구체적인 세션 타입들
class FocusSession extends Session {
  constructor() {
    super(50 * 60);
  }
}

class ShortBreakSession extends Session {
  constructor() {
    super(10 * 60);
  }
}

class LongBreakSession extends Session {
  constructor() {
    super(20 * 60);
  }
}

// ✅ 기존 코드 수정 없이 새 세션 타입 추가 가능
class CustomSession extends Session {
  constructor(customDuration) {
    super(customDuration);
  }
}

// 타이머 매니저는 세션을 사용
class TimerManager {
  constructor(session) {
    this.session = session;
    this.remainingTime = session.getDuration();
  }

  setSession(session) {
    this.session = session;
    this.remainingTime = session.getDuration();
  }
}
```

### 이점
- ✅ 기존 코드를 깨뜨리지 않고 새 기능 추가
- ✅ 버그 도입 위험 감소
- ✅ 코드 재사용성 촉진
- ✅ 유지보수 및 확장이 쉬움

---

## 3️⃣ 리스코프 치환 원칙 (Liskov Substitution Principle, LSP)

> **슈퍼클래스의 객체는 애플리케이션을 깨뜨리지 않고 서브클래스의 객체로 대체 가능해야 합니다.**

### 정의
파생 클래스는 프로그램의 정확성을 변경하지 않고 기본 클래스를 대체할 수 있어야 합니다.

### ❌ 나쁜 예: LSP 위반

```javascript
// 나쁨: 서브클래스가 예상 동작을 변경
class Timer {
  start() {
    this.isRunning = true;
    return true;
  }
}

class PausableTimer extends Timer {
  start() {
    // ❌ boolean 대신 에러를 던짐
    if (this.isPaused) {
      throw new Error('Cannot start paused timer');
    }
    this.isRunning = true;
    return true;
  }
}

// Timer 동작을 기대하는 코드가 PausableTimer로 깨짐
function startTimer(timer) {
  const started = timer.start(); // boolean을 기대하지만 에러가 발생할 수 있음
  if (started) {
    console.log('Timer started');
  }
}
```

### ✅ 좋은 예: LSP 준수

```javascript
// 좋음: 서브클래스가 계약을 유지
class Timer {
  start() {
    this.isRunning = true;
    return true;
  }

  canStart() {
    return true;
  }
}

class PausableTimer extends Timer {
  constructor() {
    super();
    this.isPaused = false;
  }

  start() {
    if (!this.canStart()) {
      return false; // ✅ 반환 타입 계약 유지
    }
    this.isPaused = false;
    this.isRunning = true;
    return true;
  }

  canStart() {
    return !this.isPaused; // ✅ 동작을 적절히 확장
  }
}

// Timer와 PausableTimer 모두와 작동
function startTimer(timer) {
  if (timer.canStart()) {
    const started = timer.start();
    if (started) {
      console.log('Timer started');
    }
  }
}
```

### 이점
- ✅ 다형성이 올바르게 작동
- ✅ 코드가 더 예측 가능
- ✅ 기능 확장이 쉬움
- ✅ 예상치 못한 동작 감소

---

## 4️⃣ 인터페이스 분리 원칙 (Interface Segregation Principle, ISP)

> **클라이언트는 사용하지 않는 인터페이스에 의존하도록 강요받아서는 안 됩니다.**

### 정의
많은 특정 인터페이스가 하나의 범용 인터페이스보다 낫습니다.

### ❌ 나쁜 예: 비대한 인터페이스

```javascript
// 나쁨: 너무 많은 메서드를 가진 하나의 인터페이스
class TimerInterface {
  start() {}
  pause() {}
  reset() {}
  skip() {}
  
  // ❌ 모든 타이머가 이것들을 필요로 하지 않음
  saveToCloud() {}
  syncWithCalendar() {}
  exportToPDF() {}
  sendEmail() {}
}

// 간단한 타이머가 불필요한 메서드를 구현하도록 강요됨
class SimpleTimer extends TimerInterface {
  start() { /* 구현 */ }
  pause() { /* 구현 */ }
  reset() { /* 구현 */ }
  skip() { /* 구현 */ }
  
  // ❌ 필요하지 않은 메서드를 구현하도록 강요됨
  saveToCloud() { throw new Error('Not supported'); }
  syncWithCalendar() { throw new Error('Not supported'); }
  exportToPDF() { throw new Error('Not supported'); }
  sendEmail() { throw new Error('Not supported'); }
}
```

### ✅ 좋은 예: 분리된 인터페이스

```javascript
// 좋음: 작고 집중된 인터페이스

// 핵심 타이머 인터페이스
class ITimer {
  start() {}
  pause() {}
  reset() {}
}

// 선택적 기능들을 별도 인터페이스로
class ICloudSync {
  saveToCloud() {}
  loadFromCloud() {}
}

class IExportable {
  exportToPDF() {}
  exportToCSV() {}
}

class INotifiable {
  sendEmail() {}
  sendPushNotification() {}
}

// 간단한 타이머는 필요한 것만 구현
class SimpleTimer extends ITimer {
  start() { /* 구현 */ }
  pause() { /* 구현 */ }
  reset() { /* 구현 */ }
}

// 고급 타이머는 여러 인터페이스 구현
class AdvancedTimer extends ITimer {
  // 타이머 메서드
  start() { /* 구현 */ }
  pause() { /* 구현 */ }
  reset() { /* 구현 */ }
}

// 추가 기능을 위한 컴포지션
class CloudSyncTimer {
  constructor(timer, cloudSync) {
    this.timer = timer;
    this.cloudSync = cloudSync;
  }

  start() { return this.timer.start(); }
  pause() { return this.timer.pause(); }
  reset() { return this.timer.reset(); }
  
  saveToCloud() { return this.cloudSync.saveToCloud(); }
}
```

### 이점
- ✅ 클래스는 필요한 것만 구현
- ✅ 이해하고 유지보수하기 쉬움
- ✅ 더 유연한 컴포지션
- ✅ 결합도 감소

---

## 5️⃣ 의존성 역전 원칙 (Dependency Inversion Principle, DIP)

> **구체화가 아닌 추상화에 의존하세요.**

### 정의
상위 수준 모듈은 하위 수준 모듈에 의존해서는 안 됩니다. 둘 다 추상화에 의존해야 합니다.

### ❌ 나쁜 예: 강한 결합

```javascript
// 나쁨: 상위 수준 모듈이 하위 수준 구현에 의존
class TimerManager {
  constructor() {
    // ❌ 의존성을 직접 생성
    this.storage = new LocalStorage();
    this.notifier = new BrowserNotification();
    this.audio = new WebAudio();
  }

  complete() {
    this.storage.save('completed', true);
    this.notifier.show('Timer Complete!');
    this.audio.play('bell.mp3');
  }
}

// ❌ 테스트하기 어려움 (의존성을 모킹할 수 없음)
// ❌ storage/notification/audio 구현을 변경하기 어려움
```

### ✅ 좋은 예: 의존성 주입

```javascript
// 좋음: 추상화(인터페이스)에 의존

// 추상 인터페이스
class IStorage {
  save(key, value) { throw new Error('Not implemented'); }
  load(key) { throw new Error('Not implemented'); }
}

class INotifier {
  show(message) { throw new Error('Not implemented'); }
}

class IAudio {
  play(sound) { throw new Error('Not implemented'); }
}

// 구체적인 구현
class LocalStorage extends IStorage {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

class BrowserNotification extends INotifier {
  show(message) {
    new Notification(message);
  }
}

class WebAudio extends IAudio {
  play(sound) {
    const audio = new Audio(sound);
    audio.play();
  }
}

// 상위 수준 모듈은 추상화에 의존
class TimerManager {
  constructor(storage, notifier, audio) {
    // ✅ 의존성 주입됨
    this.storage = storage;
    this.notifier = notifier;
    this.audio = audio;
  }

  complete() {
    this.storage.save('completed', true);
    this.notifier.show('Timer Complete!');
    this.audio.play('bell.mp3');
  }
}

// ✅ 모킹으로 테스트하기 쉬움
const mockStorage = new MockStorage();
const mockNotifier = new MockNotifier();
const mockAudio = new MockAudio();
const timer = new TimerManager(mockStorage, mockNotifier, mockAudio);

// ✅ 구현을 쉽게 교체 가능
const cloudStorage = new CloudStorage();
const emailNotifier = new EmailNotifier();
const timer2 = new TimerManager(cloudStorage, emailNotifier, mockAudio);
```

### 이점
- ✅ 모듈 간 느슨한 결합
- ✅ 테스트하기 쉬움 (모킹 주입)
- ✅ 구현을 쉽게 교체 가능
- ✅ 더 유연하고 유지보수 가능

---

## 🎯 Pomodoro Timer에 SOLID 적용하기

### 예제: 타이머 시스템 아키텍처

```javascript
// 1. SRP: 각 클래스가 하나의 책임을 가짐

class TimerEngine {
  // 책임: 핵심 타이머 로직만
  tick() { this.remainingTime--; }
  isComplete() { return this.remainingTime === 0; }
}

class SessionManager {
  // 책임: 세션 타입 관리만
  nextSession() { /* 세션 타입 전환 */ }
  getCurrentSession() { /* 현재 세션 반환 */ }
}

class StatisticsTracker {
  // 책임: 통계 추적만
  recordCompletion() { /* 통계 업데이트 */ }
  getStats() { /* 통계 반환 */ }
}

// 2. OCP: 전략을 통한 확장

class SessionStrategy {
  getDuration() { throw new Error('Not implemented'); }
}

class FocusStrategy extends SessionStrategy {
  getDuration() { return 50 * 60; }
}

class BreakStrategy extends SessionStrategy {
  getDuration() { return 10 * 60; }
}

// 3. LSP: 대체 가능한 구현

class Notifier {
  notify(message) { throw new Error('Not implemented'); }
}

class BrowserNotifier extends Notifier {
  notify(message) {
    new Notification(message);
  }
}

class ConsoleNotifier extends Notifier {
  notify(message) {
    console.log(message);
  }
}

// 둘 다 상호 교환 가능하게 사용 가능
function sendNotification(notifier, message) {
  notifier.notify(message); // 모든 Notifier 서브클래스와 작동
}

// 4. ISP: 작고 집중된 인터페이스

class ITimerControl {
  start() {}
  pause() {}
  reset() {}
}

class ITimerObserver {
  onTick(time) {}
  onComplete() {}
}

class ITimerPersistence {
  save() {}
  load() {}
}

// 5. DIP: 의존성 주입

class Application {
  constructor(timer, storage, notifier, audio) {
    this.timer = timer;
    this.storage = storage;
    this.notifier = notifier;
    this.audio = audio;
  }

  run() {
    this.timer.start();
    // 주입된 의존성 사용
  }
}

// 의존성 주입
const app = new Application(
  new TimerEngine(),
  new LocalStorage(),
  new BrowserNotifier(),
  new WebAudio()
);
```

---

## 📋 SOLID 체크리스트

코드 커밋 전 확인사항:

- [ ] **SRP**: 각 클래스가 하나의 변경 이유만 가지는가
- [ ] **OCP**: 기존 코드 수정 없이 새 기능을 추가할 수 있는가
- [ ] **LSP**: 서브클래스가 코드를 깨뜨리지 않고 부모 클래스를 대체할 수 있는가
- [ ] **ISP**: 인터페이스가 작고 집중되어 있는가
- [ ] **DIP**: 의존성이 주입되며, 하드코딩되지 않았는가

---

## 🚫 피해야 할 일반적인 위반 사례

### ❌ God 클래스
```javascript
// 나쁨: 모든 것을 하는 하나의 클래스
class Application {
  startTimer() {}
  saveSettings() {}
  playSound() {}
  showNotification() {}
  updateUI() {}
  trackStatistics() {}
  // ... 50개 이상의 메서드
}
```

### ❌ 강한 결합
```javascript
// 나쁨: 하드코딩된 의존성
class Timer {
  constructor() {
    this.db = new MySQL(); // ❌ MySQL에 강하게 결합됨
  }
}
```

### ❌ 계약 위반
```javascript
// 나쁨: 서브클래스가 메서드 시그니처를 변경
class Timer {
  start() { return true; }
}

class SpecialTimer extends Timer {
  start(config) { // ❌ 다른 시그니처
    return config.enabled;
  }
}
```

---

## 📚 리소스

### 책
- "Clean Code" by Robert C. Martin
- "Design Patterns" by Gang of Four
- "Refactoring" by Martin Fowler

### 아티클
- [SOLID Principles Explained](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [JavaScript Design Patterns](https://www.patterns.dev/)

---

## 💡 모범 사례

1. **클래스를 작게 유지**: 클래스가 너무 크면 아마도 SRP를 위반한 것
2. **상속보다 컴포지션 사용**: 더 유연하고 ISP를 따름
3. **의존성 주입**: 코드를 테스트 가능하게 만들고 DIP를 따름
4. **인터페이스로 프로그래밍**: 구현이 아님 (OCP, DIP)
5. **불변성 선호**: 부수 효과와 버그 감소
6. **테스트를 먼저 작성**: TDD는 자연스럽게 SOLID 설계로 이어짐
7. **정기적으로 리팩토링**: 코드를 깨끗하고 유지보수 가능하게 유지
8. **디자인 패턴 사용**: SOLID 원칙을 구현함

---

**기억하세요**: SOLID 원칙은 규칙이 아닌 가이드라인입니다. 판단력을 사용하고 의미가 있는 곳에 적용하세요.

---

**최종 업데이트**: 2025-12-24  
**상태**: ✅ 활성 규칙  
**적용 대상**: 모든 코드 (특히 코어 로직과 매니저)
