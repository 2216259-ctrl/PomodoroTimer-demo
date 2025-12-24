---
name: "Task 1.5.1: Time Utilities (TDD)"
about: 시간 포맷팅 및 계산 유틸리티 구현
title: "Task 1.5.1: Time Utilities (TDD)"
labels: ["priority: 🔴 high", "type: 🧪 tdd", "type: 🧰 utility", "phase-1: mvp"]
assignees: ''
---

## 📋 작업 배경
시간 포맷팅 및 계산을 위한 유틸리티 함수를 TDD로 구현합니다.

## 🎯 작업 내용
- [ ] 테스트 파일 생성: `tests/unit/utils/time.test.js`
- [ ] formatTime() 테스트 작성 (초 → MM:SS)
- [ ] formatTime() 구현
- [ ] calculateEndTime() 테스트 작성
- [ ] calculateEndTime() 구현 (현재 시각 + 남은 시간)
- [ ] 엣지 케이스 테스트 (0, 음수, 큰 숫자)
- [ ] 커버리지 100% 확인
- [ ] 커밋: `test: Add time utilities tests`
- [ ] 커밋: `feat: Implement time utilities`

## ✅ 인수 조건
- [ ] 모든 테스트 통과
- [ ] 커버리지 100%
- [ ] formatTime(3599) === "59:59"

---
**예상 시간**: 1.5시간  
**의존성**: Task 1.2.1
