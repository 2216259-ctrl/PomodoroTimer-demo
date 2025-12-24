# GitHub Issues 자동 생성 스크립트 (PowerShell)

Write-Host "🚀 GitHub Issues 자동 생성 시작..." -ForegroundColor Cyan
Write-Host ""

# Phase 1 Issues 정의
$issues = @(
    @{number = 3; title = "Task 1.1.2: Development Environment Setup"; labels = "phase-1,setup,high-priority" },
    @{number = 4; title = "Task 1.1.3: Project Structure Creation"; labels = "phase-1,setup,high-priority" },
    @{number = 5; title = "Task 1.2.1: Constants Definition (TDD)"; labels = "phase-1,tdd,core-logic,high-priority" },
    @{number = 6; title = "Task 1.2.2: EventEmitter Implementation (TDD)"; labels = "phase-1,tdd,core-logic,high-priority" },
    @{number = 7; title = "Task 1.3.2: TimerManager Implementation"; labels = "phase-1,tdd,solid,core-logic,high-priority" },
    @{number = 8; title = "Task 1.4.1: StateManager Tests"; labels = "phase-1,tdd,core-logic,testing,high-priority" },
    @{number = 9; title = "Task 1.4.2: StateManager Implementation"; labels = "phase-1,tdd,solid,core-logic,high-priority" },
    @{number = 10; title = "Task 1.5.1: Time Utilities (TDD)"; labels = "phase-1,tdd,high-priority" },
    @{number = 11; title = "Task 1.5.2: Validator Utilities (TDD)"; labels = "phase-1,tdd,high-priority" },
    @{number = 12; title = "Task 1.6.1: index.html Basic Structure"; labels = "phase-1,high-priority" },
    @{number = 13; title = "Task 1.6.2: Semantic HTML and Accessibility"; labels = "phase-1,high-priority" },
    @{number = 14; title = "Task 1.7.1: Design System"; labels = "phase-1,high-priority" },
    @{number = 15; title = "Task 1.7.2: Component Styles"; labels = "phase-1,high-priority" },
    @{number = 16; title = "Task 1.7.3: Responsive Design"; labels = "phase-1,high-priority" },
    @{number = 17; title = "Task 1.8.1: CircularProgress Component"; labels = "phase-1,high-priority" },
    @{number = 18; title = "Task 1.8.2: TimerDisplay Component"; labels = "phase-1,high-priority" },
    @{number = 19; title = "Task 1.8.3: Controls Component"; labels = "phase-1,high-priority" },
    @{number = 20; title = "Task 1.9.1: App.js Main Logic"; labels = "phase-1,core-logic,high-priority" },
    @{number = 21; title = "Task 1.9.2: Event System"; labels = "phase-1,core-logic,high-priority" },
    @{number = 22; title = "Task 1.10.1: LocalStorage Integration"; labels = "phase-1" },
    @{number = 23; title = "Task 1.10.2: NotificationManager (TDD)"; labels = "phase-1,tdd" },
    @{number = 24; title = "Task 1.10.3: ThemeManager"; labels = "phase-1" },
    @{number = 25; title = "Task 1.10.4: SessionManager"; labels = "phase-1" },
    @{number = 26; title = "Task 1.11.1: Integration Tests"; labels = "phase-1,testing" },
    @{number = 27; title = "Task 1.11.2: Browser Tests"; labels = "phase-1,testing" },
    @{number = 28; title = "Task 1.11.3: Performance Optimization"; labels = "phase-1" },
    @{number = 29; title = "Task 1.12.1: Production Build"; labels = "phase-1" },
    @{number = 30; title = "Task 1.12.2: GitHub Pages Deployment"; labels = "phase-1" }
)

$created = 0
$failed = 0

foreach ($issue in $issues) {
    $body = @"
## 🎯 작업 배경

$($issue.title)을(를) 구현해야 합니다.

---

## 📋 작업 내용

### 체크리스트

상세 내용은 [TASKS.md](../../docs/TASKS.md)를 참조하세요.

- [ ] 작업 계획 확인
- [ ] 구현 시작
- [ ] 테스트 작성 (해당하는 경우)
- [ ] 코드 리뷰
- [ ] 문서 업데이트

---

## ✅ 인수 조건

- [ ] 모든 체크리스트 완료
- [ ] 테스트 통과 (해당하는 경우)
- [ ] 코드 리뷰 완료
- [ ] 커밋 완료

---

## 📚 참고 자료

- [TASKS.md](../../docs/TASKS.md)
- [TDD Rules](../../docs/rules/tdd.md)
- [SOLID Principles](../../docs/rules/solid.md)

---

## 🏷️ Labels

$($issue.labels)

---

## ⏱️ 예상 시간

TASKS.md 참조
"@

    try {
        Write-Host "Creating Issue #$($issue.number): $($issue.title)..." -ForegroundColor Yellow
        
        # Issue 생성
        $result = gh issue create --title $issue.title --body $body --label $issue.labels --milestone "Phase 1 - MVP" 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Created: $result" -ForegroundColor Green
            $created++
        }
        else {
            Write-Host "  ❌ Failed: $result" -ForegroundColor Red
            $failed++
        }
        
        # API rate limit 방지를 위한 딜레이
        Start-Sleep -Seconds 2
    }
    catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Issues 생성 완료!" -ForegroundColor Green
Write-Host "  📊 생성 성공: $created 개" -ForegroundColor Green
Write-Host "  ❌ 생성 실패: $failed 개" -ForegroundColor Red
Write-Host ""
Write-Host "🔗 확인: https://github.com/2216259-ctrl/PomodoroTimer-demo/issues" -ForegroundColor Cyan
Write-Host ""
