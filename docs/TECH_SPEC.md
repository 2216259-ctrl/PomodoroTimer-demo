# Technical Specification Document
# Pomodoro Timer Web Application

## 📋 Document Information
- **Project Name**: Pomodoro Timer
- **Version**: 1.0
- **Last Updated**: 2025-12-24
- **Author**: Engineering Team
- **Status**: Draft
- **Related Documents**: [PRD.md](./PRD.md)

---

## 🎯 Overview

### Purpose
본 문서는 Pomodoro Timer 웹 애플리케이션의 기술적 구현 방법, 아키텍처, 기술 스택, 그리고 개발 가이드라인을 정의합니다.

### Scope
- Frontend 아키텍처 및 구현
- 데이터 모델 및 상태 관리
- UI/UX 구현 세부사항
- 성능 최적화 전략
- 배포 및 운영 방안

### Goals
- 유지보수 가능한 코드 작성
- 높은 성능과 접근성
- 확장 가능한 아키텍처
- 개발자 경험(DX) 향상

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Timer   │  │ Settings │  │Statistics│  │ Header  │ │
│  │Component │  │  Modal   │  │   Page   │  │  Nav    │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Timer   │  │  State   │  │  Audio   │  │Notification││
│  │ Manager  │  │ Manager  │  │ Manager  │  │ Manager │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Local   │  │ Settings │  │Statistics│              │
│  │ Storage  │  │  Store   │  │  Store   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Header
│   ├── SettingsButton
│   ├── FocusModeIndicator
│   └── StatisticsButton
├── Main
│   ├── TimerDisplay
│   │   ├── CircularProgress
│   │   ├── TimeText
│   │   └── EndTimeIndicator
│   ├── SessionInfo
│   │   ├── SessionTitle
│   │   └── SessionDescription
│   └── RoundIndicator
├── Footer
│   └── Controls
│       ├── ResetButton
│       ├── PlayPauseButton
│       └── SkipButton
├── SettingsModal
│   ├── TimerSettings
│   ├── NotificationSettings
│   ├── AppearanceSettings
│   └── AdvancedSettings
└── StatisticsPage
    ├── SessionStats
    ├── Charts
    └── Achievements
```

---

## 💻 Technology Stack

### Core Technologies

#### 1. HTML5
**Version**: HTML5 (Living Standard)

**Usage**:
- Semantic markup
- Accessibility features (ARIA)
- Meta tags for SEO and PWA

**Key Features**:
```html
<!DOCTYPE html>
<html lang="ko" class="dark">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern Pomodoro Timer">
    <meta name="theme-color" content="#13c8ec">
    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.json">
  </head>
</html>
```

#### 2. CSS3 / Tailwind CSS
**Tailwind Version**: 3.4.x (CDN for MVP, Build process for production)

**Configuration**:
```javascript
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#13c8ec',
        'background-light': '#f6f8f8',
        'background-dark': '#101f22',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    }
  }
}
```

**Custom CSS**:
```css
/* Progress Ring Animation */
.progress-ring__circle {
  transition: stroke-dashoffset 0.35s ease-out;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

/* Smooth theme transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

#### 3. JavaScript (ES6+)
**Version**: ES2022+

**Browser Targets**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Key Features Used**:
- Classes and Modules
- Async/Await
- Template Literals
- Destructuring
- Optional Chaining (?.)
- Nullish Coalescing (??)
- Web APIs (Notification, Audio, LocalStorage)

### External Libraries & Resources

#### 1. Google Fonts
**Font**: Inter
**Weights**: 300, 400, 500, 600, 700, 800
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

#### 2. Material Symbols
**Icon Set**: Material Symbols Outlined
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

**Icons Used**:
- `settings` - Settings button
- `bar_chart` - Statistics button
- `notifications_active` - End time indicator
- `play_arrow` - Play button
- `pause` - Pause button
- `replay` - Reset button
- `skip_next` - Skip button

#### 3. Chart.js (Phase 3)
**Version**: 4.x
**Usage**: Statistics visualization
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
```

---

## 📁 Project Structure

```
pomodoro-timer/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest (Phase 4)
├── sw.js                   # Service worker (Phase 4)
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet
│   │   └── components.css  # Component-specific styles
│   ├── js/
│   │   ├── app.js          # Application entry point
│   │   ├── managers/
│   │   │   ├── TimerManager.js
│   │   │   ├── StateManager.js
│   │   │   ├── AudioManager.js
│   │   │   └── NotificationManager.js
│   │   ├── components/
│   │   │   ├── Timer.js
│   │   │   ├── Controls.js
│   │   │   ├── Settings.js
│   │   │   └── Statistics.js
│   │   ├── utils/
│   │   │   ├── storage.js
│   │   │   ├── time.js
│   │   │   └── validators.js
│   │   └── constants.js
│   ├── sounds/
│   │   ├── bell.mp3
│   │   ├── chime.mp3
│   │   └── tick.mp3
│   └── images/
│       ├── icon-192.png
│       └── icon-512.png
├── docs/
│   ├── PRD.md
│   ├── TECH_SPEC.md
│   └── API.md
├── tests/
│   ├── unit/
│   └── e2e/
├── .gitignore
├── README.md
└── package.json            # For build tools (Phase 2+)
```

---

## 🔧 Core Modules

### 1. TimerManager

**Responsibility**: 타이머 로직 관리

**Class Definition**:
```javascript
class TimerManager {
  constructor() {
    this.intervalId = null;
    this.remainingTime = 0;
    this.isRunning = false;
    this.sessionType = 'focus';
    this.currentRound = 1;
  }

  /**
   * Start the timer
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
    
    this.emit('start');
  }

  /**
   * Pause the timer
   */
  pause() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
    
    this.emit('pause');
  }

  /**
   * Reset the timer
   */
  reset() {
    this.pause();
    this.remainingTime = this.getSessionDuration();
    this.emit('reset');
  }

  /**
   * Tick function called every second
   */
  tick() {
    if (this.remainingTime > 0) {
      this.remainingTime--;
      this.emit('tick', this.remainingTime);
    } else {
      this.complete();
    }
  }

  /**
   * Complete current session
   */
  complete() {
    this.pause();
    this.emit('complete', this.sessionType);
    this.nextSession();
  }

  /**
   * Move to next session
   */
  nextSession() {
    if (this.sessionType === 'focus') {
      this.currentRound++;
      
      if (this.currentRound > 4) {
        this.sessionType = 'longBreak';
        this.currentRound = 1;
      } else {
        this.sessionType = 'shortBreak';
      }
    } else {
      this.sessionType = 'focus';
    }
    
    this.remainingTime = this.getSessionDuration();
    this.emit('sessionChange', this.sessionType);
  }

  /**
   * Get duration for current session type
   */
  getSessionDuration() {
    const settings = StateManager.getSettings();
    
    switch (this.sessionType) {
      case 'focus':
        return settings.focusDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
      default:
        return 0;
    }
  }

  /**
   * Event emitter
   */
  emit(event, data) {
    const customEvent = new CustomEvent(`timer:${event}`, { 
      detail: data 
    });
    document.dispatchEvent(customEvent);
  }
}
```

### 2. StateManager

**Responsibility**: 애플리케이션 상태 및 데이터 관리

**Class Definition**:
```javascript
class StateManager {
  static STORAGE_KEYS = {
    SETTINGS: 'pomodoro_settings',
    STATISTICS: 'pomodoro_statistics',
    SESSION: 'pomodoro_session'
  };

  static DEFAULT_SETTINGS = {
    focusDuration: 50,
    shortBreakDuration: 10,
    longBreakDuration: 20,
    longBreakInterval: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    notificationsEnabled: true,
    soundEnabled: true,
    soundVolume: 0.7,
    soundType: 'bell',
    tickingSound: false,
    theme: 'auto',
    language: 'ko'
  };

  /**
   * Get settings from localStorage
   */
  static getSettings() {
    const stored = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
    return stored ? { ...this.DEFAULT_SETTINGS, ...JSON.parse(stored) } : this.DEFAULT_SETTINGS;
  }

  /**
   * Save settings to localStorage
   */
  static saveSettings(settings) {
    localStorage.setItem(
      this.STORAGE_KEYS.SETTINGS, 
      JSON.stringify(settings)
    );
    this.emit('settingsChanged', settings);
  }

  /**
   * Update specific setting
   */
  static updateSetting(key, value) {
    const settings = this.getSettings();
    settings[key] = value;
    this.saveSettings(settings);
  }

  /**
   * Get statistics
   */
  static getStatistics() {
    const stored = localStorage.getItem(this.STORAGE_KEYS.STATISTICS);
    return stored ? JSON.parse(stored) : {
      totalPomodoros: 0,
      totalFocusTime: 0,
      dailyPomodoros: {},
      currentStreak: 0,
      longestStreak: 0,
      achievements: []
    };
  }

  /**
   * Update statistics
   */
  static updateStatistics(update) {
    const stats = this.getStatistics();
    const updated = { ...stats, ...update };
    localStorage.setItem(
      this.STORAGE_KEYS.STATISTICS, 
      JSON.stringify(updated)
    );
    this.emit('statisticsChanged', updated);
  }

  /**
   * Increment pomodoro count
   */
  static incrementPomodoro() {
    const stats = this.getStatistics();
    const today = new Date().toISOString().split('T')[0];
    
    stats.totalPomodoros++;
    stats.dailyPomodoros[today] = (stats.dailyPomodoros[today] || 0) + 1;
    
    this.updateStatistics(stats);
    this.checkAchievements();
  }

  /**
   * Add focus time
   */
  static addFocusTime(minutes) {
    const stats = this.getStatistics();
    stats.totalFocusTime += minutes;
    this.updateStatistics(stats);
  }

  /**
   * Check and unlock achievements
   */
  static checkAchievements() {
    const stats = this.getStatistics();
    const achievements = [
      { id: 'first_pomodoro', threshold: 1, name: '첫 뽀모도로' },
      { id: 'ten_pomodoros', threshold: 10, name: '10개 달성' },
      { id: 'hundred_pomodoros', threshold: 100, name: '100개 달성' },
      { id: 'hundred_hours', threshold: 6000, name: '100시간 집중' }
    ];

    achievements.forEach(achievement => {
      if (!stats.achievements.includes(achievement.id)) {
        const value = achievement.id.includes('hours') 
          ? stats.totalFocusTime 
          : stats.totalPomodoros;
          
        if (value >= achievement.threshold) {
          stats.achievements.push(achievement.id);
          this.emit('achievementUnlocked', achievement);
        }
      }
    });

    this.updateStatistics(stats);
  }

  /**
   * Event emitter
   */
  static emit(event, data) {
    const customEvent = new CustomEvent(`state:${event}`, { 
      detail: data 
    });
    document.dispatchEvent(customEvent);
  }
}
```

### 3. AudioManager

**Responsibility**: 사운드 재생 관리

**Class Definition**:
```javascript
class AudioManager {
  constructor() {
    this.sounds = {
      bell: new Audio('assets/sounds/bell.mp3'),
      chime: new Audio('assets/sounds/chime.mp3'),
      tick: new Audio('assets/sounds/tick.mp3')
    };
    
    this.tickInterval = null;
    this.updateVolume();
  }

  /**
   * Play notification sound
   */
  playNotification() {
    const settings = StateManager.getSettings();
    
    if (!settings.soundEnabled) return;
    
    const sound = this.sounds[settings.soundType] || this.sounds.bell;
    sound.volume = settings.soundVolume;
    sound.currentTime = 0;
    sound.play().catch(err => console.error('Audio play failed:', err));
  }

  /**
   * Start ticking sound
   */
  startTicking() {
    const settings = StateManager.getSettings();
    
    if (!settings.tickingSound || !settings.soundEnabled) return;
    
    this.stopTicking();
    this.tickInterval = setInterval(() => {
      const tick = this.sounds.tick;
      tick.volume = settings.soundVolume * 0.3;
      tick.currentTime = 0;
      tick.play().catch(err => console.error('Tick play failed:', err));
    }, 1000);
  }

  /**
   * Stop ticking sound
   */
  stopTicking() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }

  /**
   * Update volume for all sounds
   */
  updateVolume() {
    const settings = StateManager.getSettings();
    Object.values(this.sounds).forEach(sound => {
      sound.volume = settings.soundVolume;
    });
  }
}
```

### 4. NotificationManager

**Responsibility**: 브라우저 알림 관리

**Class Definition**:
```javascript
class NotificationManager {
  constructor() {
    this.permission = Notification.permission;
  }

  /**
   * Request notification permission
   */
  async requestPermission() {
    if (this.permission === 'granted') return true;
    
    try {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    } catch (err) {
      console.error('Notification permission error:', err);
      return false;
    }
  }

  /**
   * Show notification
   */
  async show(title, options = {}) {
    const settings = StateManager.getSettings();
    
    if (!settings.notificationsEnabled) return;
    
    if (this.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    const notification = new Notification(title, {
      icon: 'assets/images/icon-192.png',
      badge: 'assets/images/icon-192.png',
      vibrate: [200, 100, 200],
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  }

  /**
   * Show session complete notification
   */
  showSessionComplete(sessionType) {
    const messages = {
      focus: {
        title: '🎉 집중 시간 완료!',
        body: '잘하셨습니다! 이제 휴식 시간입니다.'
      },
      shortBreak: {
        title: '⏰ 휴식 시간 종료',
        body: '다시 집중할 준비가 되셨나요?'
      },
      longBreak: {
        title: '🌟 긴 휴식 완료!',
        body: '새로운 라운드를 시작하세요.'
      }
    };

    const message = messages[sessionType] || messages.focus;
    this.show(message.title, { body: message.body });
  }
}
```

---

## 🎨 UI Implementation

### 1. Circular Progress Ring

**SVG Implementation**:
```javascript
class CircularProgress {
  constructor(element) {
    this.element = element;
    this.circle = element.querySelector('.progress-ring__circle');
    this.radius = 46;
    this.circumference = 2 * Math.PI * this.radius;
    
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = this.circumference;
  }

  /**
   * Set progress (0-100)
   */
  setProgress(percent) {
    const offset = this.circumference - (percent / 100) * this.circumference;
    this.circle.style.strokeDashoffset = offset;
  }

  /**
   * Update from timer
   */
  updateFromTimer(remaining, total) {
    const percent = (remaining / total) * 100;
    this.setProgress(percent);
  }
}
```

**HTML Template**:
```html
<svg class="w-full h-full transform" viewBox="0 0 100 100">
  <!-- Background Circle -->
  <circle 
    class="text-slate-200 dark:text-[#1a2c30]" 
    cx="50" 
    cy="50" 
    r="46" 
    fill="transparent" 
    stroke="currentColor" 
    stroke-width="4"
  />
  
  <!-- Progress Circle -->
  <circle 
    class="text-primary progress-ring__circle drop-shadow-[0_0_10px_rgba(19,200,236,0.5)]" 
    cx="50" 
    cy="50" 
    r="46" 
    fill="transparent" 
    stroke="currentColor" 
    stroke-width="4" 
    stroke-linecap="round"
  />
</svg>
```

### 2. Timer Display

**Component**:
```javascript
class TimerDisplay {
  constructor(element) {
    this.element = element;
    this.timeText = element.querySelector('.time-text');
    this.endTimeText = element.querySelector('.end-time-text');
  }

  /**
   * Format seconds to MM:SS
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Calculate end time
   */
  calculateEndTime(seconds) {
    const now = new Date();
    const end = new Date(now.getTime() + seconds * 1000);
    return end.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  /**
   * Update display
   */
  update(remainingSeconds) {
    this.timeText.textContent = this.formatTime(remainingSeconds);
    this.endTimeText.textContent = this.calculateEndTime(remainingSeconds);
  }
}
```

### 3. Dark Mode Toggle

**Implementation**:
```javascript
class ThemeManager {
  constructor() {
    this.html = document.documentElement;
    this.init();
  }

  init() {
    const settings = StateManager.getSettings();
    this.applyTheme(settings.theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (settings.theme === 'auto') {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
  }

  applyTheme(theme) {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    } else {
      this.setTheme(theme);
    }
  }

  setTheme(theme) {
    if (theme === 'dark') {
      this.html.classList.add('dark');
    } else {
      this.html.classList.remove('dark');
    }
  }

  toggle() {
    const isDark = this.html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
    StateManager.updateSetting('theme', newTheme);
  }
}
```

---

## 🔐 Data Models

### Settings Model
```typescript
interface Settings {
  // Timer settings
  focusDuration: number;          // minutes (15-90)
  shortBreakDuration: number;     // minutes (5-30)
  longBreakDuration: number;      // minutes (10-60)
  longBreakInterval: number;      // rounds (2-8)
  
  // Behavior settings
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  
  // Notification settings
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  soundVolume: number;            // 0.0-1.0
  soundType: 'bell' | 'chime';
  tickingSound: boolean;
  
  // Appearance settings
  theme: 'auto' | 'light' | 'dark';
  language: 'ko' | 'en';
}
```

### Statistics Model
```typescript
interface Statistics {
  totalPomodoros: number;
  totalFocusTime: number;         // minutes
  dailyPomodoros: {
    [date: string]: number;       // YYYY-MM-DD: count
  };
  currentStreak: number;          // days
  longestStreak: number;          // days
  achievements: string[];         // achievement IDs
}
```

### Session Model
```typescript
interface Session {
  currentRound: number;           // 1-4
  sessionType: 'focus' | 'shortBreak' | 'longBreak';
  isRunning: boolean;
  remainingTime: number;          // seconds
  startTime: number;              // timestamp
}
```

---

## ⚡ Performance Optimization

### 1. Code Optimization

**Debouncing & Throttling**:
```javascript
// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const saveSettings = debounce((settings) => {
  StateManager.saveSettings(settings);
}, 500);
```

### 2. Lazy Loading

**Component Loading**:
```javascript
class App {
  async loadComponent(name) {
    const module = await import(`./components/${name}.js`);
    return module.default;
  }

  async showStatistics() {
    if (!this.statisticsComponent) {
      const Statistics = await this.loadComponent('Statistics');
      this.statisticsComponent = new Statistics();
    }
    this.statisticsComponent.show();
  }
}
```

### 3. LocalStorage Optimization

**Batch Updates**:
```javascript
class StorageOptimizer {
  constructor() {
    this.queue = [];
    this.flushInterval = null;
  }

  queueUpdate(key, value) {
    this.queue.push({ key, value });
    
    if (!this.flushInterval) {
      this.flushInterval = setTimeout(() => this.flush(), 1000);
    }
  }

  flush() {
    this.queue.forEach(({ key, value }) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    this.queue = [];
    this.flushInterval = null;
  }
}
```

### 4. Animation Performance

**Use CSS Transforms**:
```css
/* Good - GPU accelerated */
.button {
  transform: scale(1);
  transition: transform 0.2s ease;
}

.button:hover {
  transform: scale(1.1);
}

/* Avoid - causes reflow */
.button-bad {
  width: 100px;
  transition: width 0.2s ease;
}

.button-bad:hover {
  width: 110px;
}
```

**RequestAnimationFrame**:
```javascript
class SmoothProgressUpdater {
  update(targetProgress) {
    const animate = (currentProgress) => {
      if (Math.abs(currentProgress - targetProgress) < 0.1) {
        this.setProgress(targetProgress);
        return;
      }
      
      const newProgress = currentProgress + (targetProgress - currentProgress) * 0.1;
      this.setProgress(newProgress);
      requestAnimationFrame(() => animate(newProgress));
    };
    
    requestAnimationFrame(() => animate(this.currentProgress));
  }
}
```

---

## 🧪 Testing Strategy

### 1. Unit Tests

**Test Framework**: Jest or Vitest

**Example Tests**:
```javascript
// TimerManager.test.js
describe('TimerManager', () => {
  let timer;

  beforeEach(() => {
    timer = new TimerManager();
  });

  test('should start timer', () => {
    timer.start();
    expect(timer.isRunning).toBe(true);
  });

  test('should pause timer', () => {
    timer.start();
    timer.pause();
    expect(timer.isRunning).toBe(false);
  });

  test('should reset timer', () => {
    timer.remainingTime = 1500;
    timer.reset();
    expect(timer.remainingTime).toBe(3000);
  });

  test('should complete session when time reaches 0', () => {
    const completeSpy = jest.spyOn(timer, 'complete');
    timer.remainingTime = 1;
    timer.tick();
    expect(completeSpy).toHaveBeenCalled();
  });
});

// StateManager.test.js
describe('StateManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should return default settings', () => {
    const settings = StateManager.getSettings();
    expect(settings.focusDuration).toBe(50);
  });

  test('should save and retrieve settings', () => {
    const newSettings = { ...StateManager.DEFAULT_SETTINGS, focusDuration: 25 };
    StateManager.saveSettings(newSettings);
    const retrieved = StateManager.getSettings();
    expect(retrieved.focusDuration).toBe(25);
  });

  test('should increment pomodoro count', () => {
    StateManager.incrementPomodoro();
    const stats = StateManager.getStatistics();
    expect(stats.totalPomodoros).toBe(1);
  });
});
```

### 2. Integration Tests

**Example**:
```javascript
describe('Timer Integration', () => {
  test('should complete full pomodoro cycle', async () => {
    const timer = new TimerManager();
    const audio = new AudioManager();
    const notifications = new NotificationManager();

    // Start focus session
    timer.start();
    expect(timer.sessionType).toBe('focus');

    // Fast-forward to completion
    timer.remainingTime = 0;
    timer.tick();

    // Should move to short break
    expect(timer.sessionType).toBe('shortBreak');
    expect(audio.playNotification).toHaveBeenCalled();
  });
});
```

### 3. E2E Tests

**Framework**: Playwright or Cypress

**Example**:
```javascript
// e2e/timer.spec.js
describe('Pomodoro Timer E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should start and pause timer', () => {
    cy.get('[data-testid="play-button"]').click();
    cy.get('[data-testid="timer-display"]').should('not.contain', '50:00');
    
    cy.get('[data-testid="pause-button"]').click();
    cy.get('[data-testid="timer-display"]').invoke('text').then((text) => {
      cy.wait(2000);
      cy.get('[data-testid="timer-display"]').should('contain', text);
    });
  });

  it('should reset timer', () => {
    cy.get('[data-testid="play-button"]').click();
    cy.wait(3000);
    cy.get('[data-testid="reset-button"]').click();
    cy.get('[data-testid="timer-display"]').should('contain', '50:00');
  });

  it('should open settings modal', () => {
    cy.get('[data-testid="settings-button"]').click();
    cy.get('[data-testid="settings-modal"]').should('be.visible');
  });
});
```

---

## 🚀 Build & Deployment

### 1. Development Setup

**Package.json**:
```json
{
  "name": "pomodoro-timer",
  "version": "1.0.0",
  "description": "Modern Pomodoro Timer Web App",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint src",
    "format": "prettier --write src"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### 2. Build Process

**Vite Configuration**:
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['chart.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

### 3. Deployment

**GitHub Pages**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Netlify**:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 4. PWA Configuration (Phase 4)

**Manifest.json**:
```json
{
  "name": "Pomodoro Timer",
  "short_name": "Pomodoro",
  "description": "Modern Pomodoro Timer for productivity",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#101f22",
  "theme_color": "#13c8ec",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/assets/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Service Worker**:
```javascript
// sw.js
const CACHE_NAME = 'pomodoro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/app.js',
  '/assets/sounds/bell.mp3',
  '/assets/sounds/chime.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

---

## 🔒 Security Considerations

### 1. Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data:;
        connect-src 'self';
      ">
```

### 2. Input Validation

```javascript
class Validator {
  static validateDuration(value, min, max) {
    const num = parseInt(value, 10);
    if (isNaN(num)) return false;
    return num >= min && num <= max;
  }

  static validateVolume(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    return num >= 0 && num <= 1;
  }

  static sanitizeInput(input) {
    return input.replace(/[<>\"']/g, '');
  }
}
```

### 3. LocalStorage Security

```javascript
class SecureStorage {
  static encrypt(data) {
    // Simple obfuscation (for production, use proper encryption)
    return btoa(JSON.stringify(data));
  }

  static decrypt(data) {
    try {
      return JSON.parse(atob(data));
    } catch (e) {
      return null;
    }
  }

  static setItem(key, value) {
    localStorage.setItem(key, this.encrypt(value));
  }

  static getItem(key) {
    const data = localStorage.getItem(key);
    return data ? this.decrypt(data) : null;
  }
}
```

---

## 📊 Monitoring & Analytics

### 1. Performance Monitoring

```javascript
class PerformanceMonitor {
  static measurePageLoad() {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
    });
  }

  static measureFCP() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  }
}
```

### 2. Error Tracking

```javascript
class ErrorTracker {
  static init() {
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: 'Unhandled Promise Rejection',
        reason: event.reason
      });
    });
  }

  static logError(error) {
    console.error('Error logged:', error);
    // Send to error tracking service (e.g., Sentry)
  }
}
```

---

## 🎯 Code Quality Standards

### 1. ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
```

### 2. Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

### 3. Git Hooks (Husky)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.css": ["prettier --write"]
  }
}
```

---

## 📚 API Documentation

### Event System

**Timer Events**:
```javascript
// timer:start - Timer started
document.addEventListener('timer:start', () => {});

// timer:pause - Timer paused
document.addEventListener('timer:pause', () => {});

// timer:reset - Timer reset
document.addEventListener('timer:reset', () => {});

// timer:tick - Every second
document.addEventListener('timer:tick', (e) => {
  console.log('Remaining:', e.detail); // seconds
});

// timer:complete - Session completed
document.addEventListener('timer:complete', (e) => {
  console.log('Completed:', e.detail); // sessionType
});

// timer:sessionChange - Session type changed
document.addEventListener('timer:sessionChange', (e) => {
  console.log('New session:', e.detail); // sessionType
});
```

**State Events**:
```javascript
// state:settingsChanged - Settings updated
document.addEventListener('state:settingsChanged', (e) => {
  console.log('New settings:', e.detail);
});

// state:statisticsChanged - Statistics updated
document.addEventListener('state:statisticsChanged', (e) => {
  console.log('New stats:', e.detail);
});

// state:achievementUnlocked - Achievement unlocked
document.addEventListener('state:achievementUnlocked', (e) => {
  console.log('Achievement:', e.detail);
});
```

---

## 🔄 Migration Strategy

### Phase 1 → Phase 2 (Adding Build Process)

1. Initialize npm project
2. Install Vite and dependencies
3. Restructure files for module system
4. Update imports to ES modules
5. Configure Tailwind with PostCSS
6. Test build process
7. Update deployment workflow

### Vanilla JS → Framework (Future)

**Considerations for React Migration**:
```javascript
// Current: Vanilla JS
class Timer {
  constructor() {
    this.state = { time: 3000 };
  }
}

// Future: React
function Timer() {
  const [time, setTime] = useState(3000);
  return <div>{formatTime(time)}</div>;
}
```

---

## 📝 Development Guidelines

### 1. Naming Conventions

- **Classes**: PascalCase (`TimerManager`)
- **Functions**: camelCase (`startTimer`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_SETTINGS`)
- **Files**: kebab-case (`timer-manager.js`)
- **CSS Classes**: kebab-case (`timer-display`)

### 2. Code Organization

- One class per file
- Group related utilities
- Keep functions small and focused
- Use meaningful variable names
- Add JSDoc comments

### 3. Commit Messages

```
feat: Add statistics page
fix: Resolve timer pause bug
docs: Update API documentation
style: Format code with Prettier
refactor: Simplify state management
test: Add unit tests for TimerManager
chore: Update dependencies
```

---

## 🎓 Learning Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Web.dev](https://web.dev/)

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com/)

---

## 📅 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-24 | Engineering Team | Initial technical specification |

---

**Document Status**: ✅ Ready for Implementation
**Next Steps**: 
1. Set up development environment
2. Create project structure
3. Implement Phase 1 MVP
4. Code review and testing
