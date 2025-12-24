# GitHub 이슈 라벨 가이드

## 라벨 목록

### 우선순위 (Priority)
| 라벨명 | 색상 | 설명 |
|--------|------|------|
| `priority: 🔴 high` | `#d73a4a` | Phase 1 - MVP 작업 (즉시 처리 필요) |
| `priority: 🟡 medium` | `#fbca04` | Phase 2 - Enhanced Features |
| `priority: 🟢 low` | `#0e8a16` | Phase 3 - Statistics & Analytics |
| `priority: 🔵 future` | `#0075ca` | Phase 4 - Advanced Features |

### 작업 타입 (Type)
| 라벨명 | 색상 | 설명 |
|--------|------|------|
| `type: 🧪 tdd` | `#7057ff` | TDD로 진행하는 작업 (테스트 먼저 작성) |
| `type: 🎨 ui` | `#e99695` | UI/UX 관련 작업 |
| `type: ⚙️ config` | `#c2e0c6` | 설정 및 환경 구성 |
| `type: 📦 integration` | `#bfd4f2` | 통합 작업 |
| `type: 🧰 utility` | `#d4c5f9` | 유틸리티 함수 작성 |
| `type: 🚀 deployment` | `#fef2c0` | 배포 관련 작업 |
| `type: 📊 analytics` | `#c5def5` | 통계 및 분석 기능 |
| `type: 🔧 manager` | `#d876e3` | Manager 클래스 구현 |

### 작업 영역 (Area)
| 라벨명 | 색상 | 설명 |
|--------|------|------|
| `area: core-logic` | `#5319e7` | 핵심 로직 (TimerManager, StateManager 등) |
| `area: ui-components` | `#f9d0c4` | UI 컴포넌트 |
| `area: styling` | `#ffc0cb` | CSS 스타일링 |
| `area: testing` | `#006b75` | 테스트 작성 및 개선 |
| `area: docs` | `#0075ca` | 문서화 |
| `area: performance` | `#ff6b6b` | 성능 최적화 |

### 상태 (Status)
| 라벨명 | 색상 | 설명 |
|--------|------|------|
| `status: 📝 ready` | `#ededed` | 작업 시작 가능 |
| `status: 🏗️ in-progress` | `#fbca04` | 작업 진행 중 |
| `status: 👀 review` | `#0e8a16` | 리뷰 대기 중 |
| `status: ✅ done` | `#1d76db` | 완료 |
| `status: ⏸️ blocked` | `#d73a4a` | 의존성으로 인해 대기 중 |

### Phase 구분
| 라벨명 | 색상 | 설명 |
|--------|------|------|
| `phase-1: mvp` | `#d73a4a` | Phase 1: MVP (기본 타이머 기능) |
| `phase-2: enhanced` | `#fbca04` | Phase 2: Enhanced Features |
| `phase-3: statistics` | `#0e8a16` | Phase 3: Statistics & Analytics |
| `phase-4: advanced` | `#0075ca` | Phase 4: Advanced Features (PWA) |

### 기타
| 라벨명 | 색상 | 설명 |
|--------|------|------|
| `good first issue` | `#7057ff` | 처음 시작하기 좋은 작업 |
| `help wanted` | `#008672` | 도움이 필요한 작업 |
| `bug` | `#d73a4a` | 버그 수정 |
| `enhancement` | `#a2eeef` | 기능 개선 |

---

## 라벨 생성 방법

### 방법 1: GitHub UI에서 수동 생성

1. GitHub 저장소 → **Issues** 탭
2. **Labels** 버튼 클릭
3. **New label** 클릭
4. 위 표의 정보를 참고하여 라벨 생성
   - **Name**: 라벨명 입력
   - **Description**: 설명 입력
   - **Color**: 색상 코드 입력 (# 제외)

### 방법 2: GitHub CLI 사용 (일괄 생성)

```bash
# 우선순위 라벨
gh label create "priority: 🔴 high" --color d73a4a --description "Phase 1 - MVP 작업"
gh label create "priority: 🟡 medium" --color fbca04 --description "Phase 2 - Enhanced Features"
gh label create "priority: 🟢 low" --color 0e8a16 --description "Phase 3 - Statistics & Analytics"
gh label create "priority: 🔵 future" --color 0075ca --description "Phase 4 - Advanced Features"

# 작업 타입 라벨
gh label create "type: 🧪 tdd" --color 7057ff --description "TDD로 진행하는 작업"
gh label create "type: 🎨 ui" --color e99695 --description "UI/UX 관련 작업"
gh label create "type: ⚙️ config" --color c2e0c6 --description "설정 및 환경 구성"
gh label create "type: 📦 integration" --color bfd4f2 --description "통합 작업"
gh label create "type: 🧰 utility" --color d4c5f9 --description "유틸리티 함수 작성"
gh label create "type: 🚀 deployment" --color fef2c0 --description "배포 관련 작업"
gh label create "type: 📊 analytics" --color c5def5 --description "통계 및 분석 기능"
gh label create "type: 🔧 manager" --color d876e3 --description "Manager 클래스 구현"

# 작업 영역 라벨
gh label create "area: core-logic" --color 5319e7 --description "핵심 로직"
gh label create "area: ui-components" --color f9d0c4 --description "UI 컴포넌트"
gh label create "area: styling" --color ffc0cb --description "CSS 스타일링"
gh label create "area: testing" --color 006b75 --description "테스트 작성 및 개선"
gh label create "area: docs" --color 0075ca --description "문서화"
gh label create "area: performance" --color ff6b6b --description "성능 최적화"

# 상태 라벨
gh label create "status: 📝 ready" --color ededed --description "작업 시작 가능"
gh label create "status: 🏗️ in-progress" --color fbca04 --description "작업 진행 중"
gh label create "status: 👀 review" --color 0e8a16 --description "리뷰 대기 중"
gh label create "status: ✅ done" --color 1d76db --description "완료"
gh label create "status: ⏸️ blocked" --color d73a4a --description "의존성으로 인해 대기 중"

# Phase 라벨
gh label create "phase-1: mvp" --color d73a4a --description "Phase 1: MVP"
gh label create "phase-2: enhanced" --color fbca04 --description "Phase 2: Enhanced Features"
gh label create "phase-3: statistics" --color 0e8a16 --description "Phase 3: Statistics & Analytics"
gh label create "phase-4: advanced" --color 0075ca --description "Phase 4: Advanced Features"

# 기타 라벨
gh label create "good first issue" --color 7057ff --description "처음 시작하기 좋은 작업"
gh label create "help wanted" --color 008672 --description "도움이 필요한 작업"
gh label create "bug" --color d73a4a --description "버그 수정"
gh label create "enhancement" --color a2eeef --description "기능 개선"
```

---

## 이슈 작성 시 라벨 사용 예시

### 예시 1: TimerManager 구현
- `priority: 🔴 high`
- `type: 🧪 tdd`
- `type: 🔧 manager`
- `area: core-logic`
- `phase-1: mvp`
- `status: 📝 ready`

### 예시 2: CSS 스타일링
- `priority: 🔴 high`
- `type: 🎨 ui`
- `area: styling`
- `phase-1: mvp`
- `status: 📝 ready`

### 예시 3: 통계 기능
- `priority: 🟢 low`
- `type: 📊 analytics`
- `area: core-logic`
- `phase-3: statistics`
- `status: ⏸️ blocked`

---

## 이슈 템플릿 구조

각 이슈는 다음 구조로 작성하세요:

```markdown
## 📋 작업 배경
<!-- 왜 이 작업이 필요한지 설명 -->

## 🎯 작업 내용
<!-- 구체적으로 무엇을 해야 하는지 체크리스트 형태로 작성 -->

- [ ] 항목 1
- [ ] 항목 2
- [ ] 항목 3

## ✅ 인수 조건
<!-- 이 작업이 완료되었다고 판단할 수 있는 기준 -->

- [ ] 조건 1
- [ ] 조건 2
- [ ] 조건 3

## 📚 참고 자료
<!-- 관련 문서, 코드 예시 등 -->

## 🔗 관련 이슈
<!-- 의존성이 있는 다른 이슈 -->
```

---

**생성일**: 2025-12-24  
**최종 업데이트**: 2025-12-24
