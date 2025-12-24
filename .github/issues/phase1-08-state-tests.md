---
title: "Task 1.4.1: StateManager 테스트 작성"
labels: ["priority: 🔴 high", "type: 🧪 tdd", "type: 🔧 manager", "area: core-logic", "phase-1: mvp", "status: 📝 ready"]
---

## 📋 작업 배경
상태 관리를 담당하는 StateManager의 테스트를 먼저 작성합니다 (TDD Red 단계).

## 🎯 작업 내용
- [ ] getSettings() 테스트 (기본값, 저장된 값 로드)
- [ ] saveSettings() 테스트 (localStorage 저장, 이벤트)
- [ ] updateSetting() 테스트 (특정 설정 업데이트)
- [ ] getStatistics() 테스트 (기본값, 저장된 값 로드)
- [ ] updateStatistics() 테스트 (통계 업데이트)
- [ ] incrementPomodoro() 테스트 (카운트 증가, 일일 통계)
- [ ] addFocusTime() 테스트 (시간 누적)
- [ ] localStorage 에러 처리 테스트
- [ ] 커밋: `test: Add StateManager tests`

## ✅ 인수 조건
- [ ] 모든 테스트 케이스 작성
- [ ] 테스트 실행 시 실패 확인 (Red)

**예상 시간**: 2시간  
**의존성**: Task 1.2.2
