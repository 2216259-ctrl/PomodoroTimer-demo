# GitHub Issues 생성 및 관리 가이드

## 📋 개요

이 가이드는 TASKS.md의 작업들을 GitHub Issues로 생성하고 관리하는 방법을 설명합니다.

---

## 🚀 빠른 시작

### 1. GitHub CLI 설치

#### Windows (PowerShell)
```powershell
winget install --id GitHub.cli
```

#### macOS
```bash
brew install gh
```

#### Linux
```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora/RHEL
sudo dnf install gh
```

### 2. GitHub CLI 인증

```bash
gh auth login
```

대화형 프롬프트를 따라 인증을 완료합니다:
1. GitHub.com 선택
2. HTTPS 선택
3. 브라우저에서 인증

### 3. Issues 생성

```bash
# 프로젝트 루트에서 실행
cd C:\Users\user\Desktop\upstage-demo\PomodoroTimer-demo

# Node.js 스크립트 실행
node .github/scripts/create-issues.js
```

---

## 📝 수동으로 Issues 생성하기

GitHub CLI를 사용할 수 없는 경우, 수동으로 생성할 수 있습니다.

### 방법 1: GitHub 웹 인터페이스

1. Repository의 **Issues** 탭으로 이동
2. **New issue** 클릭
3. `.github/issues/` 폴더의 마크다운 파일 내용 복사
4. 제목과 내용 붙여넣기
5. Labels 추가
6. Milestone 선택
7. **Submit new issue** 클릭

### 방법 2: GitHub CLI 개별 생성

```bash
# 예시: Task 1.1.1 생성
gh issue create \
  --title "Task 1.1.1: GitHub Repository 설정" \
  --body-file .github/issues/phase1-01-github-setup.md \
  --label "phase-1,setup,high-priority" \
  --milestone "Phase 1 - MVP"
```

---

## 🏷️ Labels 설명

| Label | 색상 | 설명 |
|-------|------|------|
| `phase-1` | 🔵 Blue | Phase 1 작업 |
| `phase-2` | 🟣 Purple | Phase 2 작업 |
| `phase-3` | 🟢 Green | Phase 3 작업 |
| `phase-4` | 🟡 Yellow | Phase 4 작업 |
| `tdd` | 🟢 Green | TDD 필수 작업 |
| `solid` | 🔴 Red | SOLID 원칙 적용 |
| `high-priority` | 🔴 Red | 높은 우선순위 |
| `setup` | 🟣 Purple | 프로젝트 설정 |
| `core-logic` | 🔵 Blue | 코어 로직 |
| `ui` | 🟡 Yellow | UI 작업 |
| `testing` | 🔵 Blue | 테스트 작업 |
| `deployment` | 🟢 Green | 배포 작업 |
| `feature` | 🔵 Cyan | 기능 추가 |
| `utilities` | 🟠 Orange | 유틸리티 |
| `component` | 🟡 Yellow | 컴포넌트 |
| `integration` | 🟢 Green | 통합 작업 |
| `performance` | 🟠 Orange | 성능 최적화 |
| `accessibility` | 🔵 Blue | 접근성 |

---

## 📊 Milestones

### Phase 1 - MVP
- **Due Date**: 2주 후
- **Description**: 기본 타이머 기능을 가진 작동하는 웹 애플리케이션
- **Issues**: 30개

### Phase 2 - Enhanced Features
- **Due Date**: 4주 후
- **Description**: 설정 기능 및 사용자 경험 개선
- **Issues**: 17개

### Phase 3 - Statistics
- **Due Date**: 6주 후
- **Description**: 통계 추적 및 시각화
- **Issues**: 13개

### Phase 4 - Advanced
- **Due Date**: 8주 후
- **Description**: PWA 및 고급 기능
- **Issues**: 9개

---

## 🔗 Issue 의존성 관리

### 의존성 표시 방법

Issue 본문에 다음과 같이 표시:
```markdown
## 🔗 의존성

- Depends on #5
- Depends on #7
- Blocks #10
```

### 의존성 확인

```bash
# 특정 Issue의 의존성 확인
gh issue view 7
```

---

## ✅ Issue 작업 흐름

### 1. Issue 선택
```bash
# 열린 Issues 목록 보기
gh issue list --label "phase-1"

# 특정 Issue 보기
gh issue view 1
```

### 2. 작업 시작
```bash
# 브랜치 생성
git checkout -b feature/task-1.1.1

# Issue에 코멘트
gh issue comment 1 --body "작업 시작합니다."
```

### 3. 작업 진행
- 체크리스트 항목 완료 시 Issue에 업데이트
- 커밋 메시지에 Issue 번호 포함: `feat: Implement feature (#1)`

### 4. 작업 완료
```bash
# PR 생성
gh pr create --title "Task 1.1.1: GitHub Repository 설정" --body "Closes #1"

# 또는 커밋 메시지로 자동 닫기
git commit -m "feat: Complete GitHub setup

Closes #1"
```

---

## 📝 Issue 템플릿 구조

모든 Issue는 다음 구조를 따릅니다:

```markdown
## 🎯 작업 배경
[왜 이 작업이 필요한지]

## 📋 작업 내용
### 체크리스트
- [ ] 항목 1
- [ ] 항목 2

### 구현 세부사항
[구체적인 구현 방법, 코드 예제]

## ✅ 인수 조건
- [ ] 조건 1
- [ ] 조건 2

## 📚 참고 자료
- [링크 1]
- [링크 2]

## 🏷️ Labels
`label1`, `label2`

## ⏱️ 예상 시간
X시간

## 🔗 의존성
- Depends on #X
```

---

## 🎯 Issue 관리 팁

### 1. 진행 상황 추적

```bash
# 진행 중인 Issues
gh issue list --label "phase-1" --state open

# 완료된 Issues
gh issue list --label "phase-1" --state closed
```

### 2. 필터링

```bash
# TDD 작업만 보기
gh issue list --label "tdd"

# 높은 우선순위만 보기
gh issue list --label "high-priority"

# 특정 Milestone
gh issue list --milestone "Phase 1 - MVP"
```

### 3. 검색

```bash
# 제목으로 검색
gh issue list --search "TimerManager"

# 작성자로 검색
gh issue list --author "@me"
```

### 4. 일괄 작업

```bash
# 여러 Issues에 Label 추가
gh issue edit 1 2 3 --add-label "bug"

# 여러 Issues 닫기
gh issue close 1 2 3
```

---

## 📊 진행 상황 보드

### GitHub Projects 사용

1. Repository의 **Projects** 탭으로 이동
2. **New project** 클릭
3. **Board** 템플릿 선택
4. 컬럼 생성:
   - 📋 To Do
   - 🏗️ In Progress
   - 👀 In Review
   - ✅ Done

5. Issues를 드래그 앤 드롭으로 이동

---

## 🔄 자동화

### GitHub Actions로 자동화

`.github/workflows/issue-automation.yml`:
```yaml
name: Issue Automation

on:
  issues:
    types: [opened, closed]

jobs:
  auto-label:
    runs-on: ubuntu-latest
    steps:
      - name: Add labels based on title
        uses: actions/github-script@v6
        with:
          script: |
            const title = context.payload.issue.title;
            const labels = [];
            
            if (title.includes('TDD')) labels.push('tdd');
            if (title.includes('Test')) labels.push('testing');
            
            if (labels.length > 0) {
              github.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                labels: labels
              });
            }
```

---

## 📈 통계 및 리포트

### Issue 통계 보기

```bash
# 열린 Issues 수
gh issue list --state open --json number --jq 'length'

# 닫힌 Issues 수
gh issue list --state closed --json number --jq 'length'

# Label별 Issues 수
gh issue list --label "tdd" --json number --jq 'length'
```

### 진행률 계산

```bash
# Phase 1 진행률
TOTAL=$(gh issue list --milestone "Phase 1 - MVP" --json number --jq 'length')
CLOSED=$(gh issue list --milestone "Phase 1 - MVP" --state closed --json number --jq 'length')
echo "Progress: $CLOSED / $TOTAL"
```

---

## 🆘 문제 해결

### GitHub CLI 인증 문제

```bash
# 인증 상태 확인
gh auth status

# 재인증
gh auth logout
gh auth login
```

### Permission 에러

Repository Settings → Actions → General → Workflow permissions에서 "Read and write permissions" 활성화

### Rate Limit 초과

```bash
# Rate limit 확인
gh api rate_limit

# 대기 후 재시도 (스크립트에 delay 추가됨)
```

---

## 📚 추가 리소스

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub Issues Documentation](https://docs.github.com/en/issues)
- [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [TASKS.md](../docs/TASKS.md)

---

**최종 업데이트**: 2025-12-24  
**상태**: ✅ 준비 완료
