# GitHub Labels 생성 스크립트

Write-Host "🏷️  Creating GitHub Labels..." -ForegroundColor Cyan
Write-Host ""

$labels = @(
    @{name="phase-2"; color="5319E7"; description="Phase 2 작업"},
    @{name="phase-3"; color="0E8A16"; description="Phase 3 작업"},
    @{name="phase-4"; color="FBCA04"; description="Phase 4 작업"},
    @{name="tdd"; color="00FF00"; description="TDD 필수"},
    @{name="solid"; color="FF6B6B"; description="SOLID 원칙"},
    @{name="high-priority"; color="FF0000"; description="높은 우선순위"},
    @{name="setup"; color="D4C5F9"; description="프로젝트 설정"},
    @{name="core-logic"; color="1D76DB"; description="코어 로직"},
    @{name="ui"; color="FEF2C0"; description="UI 작업"},
    @{name="testing"; color="BFD4F2"; description="테스트"},
    @{name="deployment"; color="C2E0C6"; description="배포"},
    @{name="feature"; color="A2EEEF"; description="기능 추가"},
    @{name="utilities"; color="D93F0B"; description="유틸리티"},
    @{name="component"; color="FBCA04"; description="컴포넌트"},
    @{name="integration"; color="0E8A16"; description="통합"},
    @{name="performance"; color="F9D0C4"; description="성능"},
    @{name="accessibility"; color="C5DEF5"; description="접근성"}
)

foreach ($label in $labels) {
    try {
        gh label create $label.name --color $label.color --description $label.description 2>$null
        Write-Host "  ✅ Created label: $($label.name)" -ForegroundColor Green
    }
    catch {
        Write-Host "  ⚠️  Label $($label.name) may already exist" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "✨ Labels creation completed!" -ForegroundColor Green
