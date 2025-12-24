---
name: "Task 1.2.1: Constants 정의 (TDD)"
about: 프로젝트 상수 정의 (TDD 방식)
title: "Task 1.2.1: Constants 정의 (TDD)"
labels: ["priority: 🔴 high", "type: 🧪 tdd", "area: core-logic", "phase-1: mvp"]
assignees: ''
---

## 📋 작업 배경
프로젝트 전반에서 사용할 상수들을 TDD 방식으로 정의하여 코드의 일관성과 유지보수성을 높입니다.

## 🎯 작업 내용
- [ ] SESSION_TYPES 정의 (FOCUS, SHORT_BREAK, LONG_BREAK)
- [ ] DEFAULT_DURATIONS 정의 (초 단위: 3000, 600, 1200)
- [ ] EVENTS 정의 (TIMER_START, TIMER_PAUSE, TIMER_TICK, TIMER_COMPLETE, TIMER_RESET)
- [ ] STORAGE_KEYS 정의 (localStorage 키)
- [ ] 테스트 파일 작성: `tests/unit/constants.test.js`
- [ ] 테스트 100% 통과
- [ ] 커밋: `test: Add constants tests`
- [ ] 커밋: `feat: Implement constants`

## ✅ 인수 조건
- [ ] 모든 테스트 통과
- [ ] 커버리지 100%
- [ ] ESLint 통과

---
**예상 시간**: 1시간  
**의존성**: Task 1.1.2
