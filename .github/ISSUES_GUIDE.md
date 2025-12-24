# GitHub Issues 생성 가이드

## 📋 개요

이 문서는 TASKS.md의 작업들을 GitHub Issues로 등록하는 가이드입니다.

---

## 🚀 빠른 시작

### 방법 1: GitHub CLI 사용 (권장)

```bash
# GitHub CLI 설치 확인
gh --version

# 로그인
gh auth login

# Issues 생성 스크립트 실행
node .github/scripts/create-issues.js
```

### 방법 2: 수동 생성

`.github/issues/` 폴더의 마크다운 파일들을 GitHub Issues에 복사하여 생성

---

## 📝 Issue 템플릿 구조

각 Issue는 다음 구조를 따릅니다:

```markdown
## 🎯 작업 배경

[왜 이 작업이 필요한지 설명]

## 📋 작업 내용

### 체크리스트
- [ ] 항목 1
- [ ] 항목 2

### 구현 세부사항
[구체적인 구현 방법]

## ✅ 인수 조건

- [ ] 조건 1
- [ ] 조건 2

## 📚 참고 자료

- [TASKS.md](../docs/TASKS.md)
- [관련 문서]

## 🏷️ Labels

`phase-1`, `tdd`, `high-priority`

## ⏱️ 예상 시간

X시간

## 🔗 의존성

- Depends on #X
```

---

## 📊 Issue 생성 계획

### Phase 1: MVP (50개 Issues)

#### Milestone: Phase 1 - MVP
**Due Date**: 2주 후  
**Description**: 기본 타이머 기능을 가진 작동하는 웹 애플리케이션

#### Labels
- `phase-1`: Phase 1 작업
- `tdd`: TDD 필수 작업
- `solid`: SOLID 원칙 적용
- `high-priority`: 높은 우선순위
- `setup`: 프로젝트 설정
- `core-logic`: 코어 로직
- `ui`: UI 작업
- `testing`: 테스트 작업
- `deployment`: 배포 작업

---

## 📁 생성된 Issue 파일 목록

### 1.1 프로젝트 초기 설정
- `phase1-01-github-setup.md`
- `phase1-02-dev-environment.md`
- `phase1-03-project-structure.md`

### 1.2 Constants & EventEmitter
- `phase1-04-constants.md`
- `phase1-05-event-emitter.md`

### 1.3 TimerManager
- `phase1-06-timer-tests.md`
- `phase1-07-timer-implementation.md`

### 1.4 StateManager
- `phase1-08-state-tests.md`
- `phase1-09-state-implementation.md`

### 1.5 Utilities
- `phase1-10-time-utilities.md`
- `phase1-11-validator-utilities.md`

### 1.6 HTML 구조
- `phase1-12-html-structure.md`
- `phase1-13-accessibility.md`

### 1.7 CSS 스타일링
- `phase1-14-design-system.md`
- `phase1-15-component-styles.md`
- `phase1-16-responsive-design.md`

### 1.8 UI Components
- `phase1-17-circular-progress.md`
- `phase1-18-timer-display.md`
- `phase1-19-controls.md`

### 1.9 Application 통합
- `phase1-20-app-integration.md`
- `phase1-21-event-system.md`

### 1.10 추가 기능
- `phase1-22-localstorage.md`
- `phase1-23-notification-manager.md`
- `phase1-24-theme-manager.md`
- `phase1-25-session-manager.md`

### 1.11 테스트 및 최적화
- `phase1-26-integration-tests.md`
- `phase1-27-browser-tests.md`
- `phase1-28-performance.md`

### 1.12 배포
- `phase1-29-production-build.md`
- `phase1-30-github-pages.md`

---

## 🔧 GitHub CLI 명령어 예시

### Issue 생성
```bash
gh issue create \
  --title "Task 1.1.1: GitHub Repository 설정" \
  --body-file .github/issues/phase1-01-github-setup.md \
  --label "phase-1,setup,high-priority" \
  --milestone "Phase 1 - MVP"
```

### Milestone 생성
```bash
gh api repos/:owner/:repo/milestones \
  --method POST \
  --field title="Phase 1 - MVP" \
  --field description="기본 타이머 기능을 가진 작동하는 웹 애플리케이션" \
  --field due_on="2025-02-07T00:00:00Z"
```

### Label 생성
```bash
gh label create "phase-1" --color "0052CC" --description "Phase 1 작업"
gh label create "tdd" --color "00FF00" --description "TDD 필수"
gh label create "solid" --color "FF6B6B" --description "SOLID 원칙"
gh label create "high-priority" --color "FF0000" --description "높은 우선순위"
```

---

## 📝 다음 단계

1. **Labels 생성**: `.github/scripts/create-labels.sh` 실행
2. **Milestones 생성**: `.github/scripts/create-milestones.sh` 실행
3. **Issues 생성**: `.github/scripts/create-issues.js` 실행
4. **확인**: GitHub Issues 탭에서 확인

---

**최종 업데이트**: 2025-12-24  
**상태**: ✅ 준비 완료
