/**
 * GitHub Issues 자동 생성 스크립트
 * 
 * 사용법:
 * 1. GitHub CLI 설치: https://cli.github.com/
 * 2. 로그인: gh auth login
 * 3. 실행: node .github/scripts/create-issues.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Phase 1 Issues 정의
const phase1Issues = [
    {
        number: 1,
        title: 'Task 1.1.1: GitHub Repository 설정',
        file: 'phase1-01-github-setup.md',
        labels: ['phase-1', 'setup', 'high-priority'],
        estimate: '30분'
    },
    {
        number: 2,
        title: 'Task 1.1.2: 개발 환경 설정',
        file: 'phase1-02-dev-environment.md',
        labels: ['phase-1', 'setup', 'high-priority'],
        estimate: '30분',
        dependsOn: [1]
    },
    {
        number: 3,
        title: 'Task 1.1.3: 프로젝트 구조 생성',
        file: 'phase1-03-project-structure.md',
        labels: ['phase-1', 'setup', 'high-priority'],
        estimate: '30분',
        dependsOn: [2]
    },
    {
        number: 4,
        title: 'Task 1.2.1: Constants 정의 (TDD)',
        file: 'phase1-04-constants.md',
        labels: ['phase-1', 'tdd', 'core-logic', 'high-priority'],
        estimate: '1시간',
        dependsOn: [3]
    },
    {
        number: 5,
        title: 'Task 1.2.2: EventEmitter 구현 (TDD)',
        file: 'phase1-05-event-emitter.md',
        labels: ['phase-1', 'tdd', 'core-logic', 'high-priority'],
        estimate: '1시간',
        dependsOn: [4]
    },
    {
        number: 6,
        title: 'Task 1.3.1: TimerManager 테스트 작성',
        file: 'phase1-06-timer-tests.md',
        labels: ['phase-1', 'tdd', 'core-logic', 'testing', 'high-priority'],
        estimate: '3시간',
        dependsOn: [5]
    },
    {
        number: 7,
        title: 'Task 1.3.2: TimerManager 구현',
        file: 'phase1-07-timer-implementation.md',
        labels: ['phase-1', 'tdd', 'solid', 'core-logic', 'high-priority'],
        estimate: '4시간',
        dependsOn: [6]
    },
    {
        number: 8,
        title: 'Task 1.4.1: StateManager 테스트 작성',
        file: 'phase1-08-state-tests.md',
        labels: ['phase-1', 'tdd', 'core-logic', 'testing', 'high-priority'],
        estimate: '2시간',
        dependsOn: [5]
    },
    {
        number: 9,
        title: 'Task 1.4.2: StateManager 구현',
        file: 'phase1-09-state-implementation.md',
        labels: ['phase-1', 'tdd', 'solid', 'core-logic', 'high-priority'],
        estimate: '3시간',
        dependsOn: [8]
    },
    {
        number: 10,
        title: 'Task 1.5.1: Time Utilities (TDD)',
        file: 'phase1-10-time-utilities.md',
        labels: ['phase-1', 'tdd', 'utilities', 'high-priority'],
        estimate: '1.5시간',
        dependsOn: [4]
    },
    {
        number: 11,
        title: 'Task 1.5.2: Validator Utilities (TDD)',
        file: 'phase1-11-validator-utilities.md',
        labels: ['phase-1', 'tdd', 'utilities', 'high-priority'],
        estimate: '1.5시간',
        dependsOn: [4]
    },
    {
        number: 12,
        title: 'Task 1.6.1: index.html 기본 구조',
        file: 'phase1-12-html-structure.md',
        labels: ['phase-1', 'ui', 'html', 'high-priority'],
        estimate: '1시간',
        dependsOn: [3]
    },
    {
        number: 13,
        title: 'Task 1.6.2: Semantic HTML 및 Accessibility',
        file: 'phase1-13-accessibility.md',
        labels: ['phase-1', 'ui', 'html', 'accessibility', 'high-priority'],
        estimate: '1시간',
        dependsOn: [12]
    },
    {
        number: 14,
        title: 'Task 1.7.1: Design System 구축',
        file: 'phase1-14-design-system.md',
        labels: ['phase-1', 'ui', 'css', 'design', 'high-priority'],
        estimate: '2시간',
        dependsOn: [12]
    },
    {
        number: 15,
        title: 'Task 1.7.2: Component 스타일',
        file: 'phase1-15-component-styles.md',
        labels: ['phase-1', 'ui', 'css', 'design', 'high-priority'],
        estimate: '3시간',
        dependsOn: [14]
    },
    {
        number: 16,
        title: 'Task 1.7.3: 반응형 디자인',
        file: 'phase1-16-responsive-design.md',
        labels: ['phase-1', 'ui', 'css', 'responsive', 'high-priority'],
        estimate: '2시간',
        dependsOn: [15]
    },
    {
        number: 17,
        title: 'Task 1.8.1: CircularProgress Component',
        file: 'phase1-17-circular-progress.md',
        labels: ['phase-1', 'ui', 'component', 'high-priority'],
        estimate: '2시간',
        dependsOn: [15]
    },
    {
        number: 18,
        title: 'Task 1.8.2: TimerDisplay Component',
        file: 'phase1-18-timer-display.md',
        labels: ['phase-1', 'ui', 'component', 'high-priority'],
        estimate: '1.5시간',
        dependsOn: [10]
    },
    {
        number: 19,
        title: 'Task 1.8.3: Controls Component',
        file: 'phase1-19-controls.md',
        labels: ['phase-1', 'ui', 'component', 'high-priority'],
        estimate: '2시간',
        dependsOn: [7]
    },
    {
        number: 20,
        title: 'Task 1.9.1: App.js 메인 로직',
        file: 'phase1-20-app-integration.md',
        labels: ['phase-1', 'core-logic', 'integration', 'high-priority'],
        estimate: '3시간',
        dependsOn: [7, 9, 19]
    },
    {
        number: 21,
        title: 'Task 1.9.2: 이벤트 시스템 구축',
        file: 'phase1-21-event-system.md',
        labels: ['phase-1', 'core-logic', 'integration', 'high-priority'],
        estimate: '2시간',
        dependsOn: [20]
    },
    {
        number: 22,
        title: 'Task 1.10.1: LocalStorage 통합',
        file: 'phase1-22-localstorage.md',
        labels: ['phase-1', 'feature', 'storage'],
        estimate: '2시간',
        dependsOn: [9]
    },
    {
        number: 23,
        title: 'Task 1.10.2: NotificationManager (TDD)',
        file: 'phase1-23-notification-manager.md',
        labels: ['phase-1', 'tdd', 'feature', 'notification'],
        estimate: '2시간',
        dependsOn: [7]
    },
    {
        number: 24,
        title: 'Task 1.10.3: ThemeManager',
        file: 'phase1-24-theme-manager.md',
        labels: ['phase-1', 'feature', 'theme'],
        estimate: '1.5시간',
        dependsOn: [9]
    },
    {
        number: 25,
        title: 'Task 1.10.4: SessionManager',
        file: 'phase1-25-session-manager.md',
        labels: ['phase-1', 'feature', 'session'],
        estimate: '1시간',
        dependsOn: [7]
    },
    {
        number: 26,
        title: 'Task 1.11.1: 통합 테스트',
        file: 'phase1-26-integration-tests.md',
        labels: ['phase-1', 'testing', 'integration'],
        estimate: '3시간',
        dependsOn: [21]
    },
    {
        number: 27,
        title: 'Task 1.11.2: 브라우저 테스트',
        file: 'phase1-27-browser-tests.md',
        labels: ['phase-1', 'testing', 'browser'],
        estimate: '2시간',
        dependsOn: [26]
    },
    {
        number: 28,
        title: 'Task 1.11.3: 성능 최적화',
        file: 'phase1-28-performance.md',
        labels: ['phase-1', 'performance', 'optimization'],
        estimate: '2시간',
        dependsOn: [27]
    },
    {
        number: 29,
        title: 'Task 1.12.1: 프로덕션 빌드',
        file: 'phase1-29-production-build.md',
        labels: ['phase-1', 'deployment', 'build'],
        estimate: '2시간',
        dependsOn: [28]
    },
    {
        number: 30,
        title: 'Task 1.12.2: GitHub Pages 배포',
        file: 'phase1-30-github-pages.md',
        labels: ['phase-1', 'deployment', 'github-pages'],
        estimate: '1시간',
        dependsOn: [29]
    }
];

// Milestone 생성
function createMilestone() {
    console.log('📌 Creating Milestone: Phase 1 - MVP...');

    try {
        // 2주 후 날짜 계산
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        const dueDateISO = dueDate.toISOString();

        execSync(`gh api repos/:owner/:repo/milestones --method POST --field title="Phase 1 - MVP" --field description="기본 타이머 기능을 가진 작동하는 웹 애플리케이션" --field due_on="${dueDateISO}"`, {
            stdio: 'inherit'
        });

        console.log('✅ Milestone created successfully\n');
    } catch (error) {
        console.log('⚠️  Milestone may already exist or error occurred\n');
    }
}

// Labels 생성
function createLabels() {
    console.log('🏷️  Creating Labels...');

    const labels = [
        { name: 'phase-1', color: '0052CC', description: 'Phase 1 작업' },
        { name: 'phase-2', color: '5319E7', description: 'Phase 2 작업' },
        { name: 'phase-3', color: '0E8A16', description: 'Phase 3 작업' },
        { name: 'phase-4', color: 'FBCA04', description: 'Phase 4 작업' },
        { name: 'tdd', color: '00FF00', description: 'TDD 필수' },
        { name: 'solid', color: 'FF6B6B', description: 'SOLID 원칙' },
        { name: 'high-priority', color: 'FF0000', description: '높은 우선순위' },
        { name: 'setup', color: 'D4C5F9', description: '프로젝트 설정' },
        { name: 'core-logic', color: '1D76DB', description: '코어 로직' },
        { name: 'ui', color: 'FEF2C0', description: 'UI 작업' },
        { name: 'testing', color: 'BFD4F2', description: '테스트' },
        { name: 'deployment', color: 'C2E0C6', description: '배포' },
        { name: 'feature', color: 'A2EEEF', description: '기능 추가' },
        { name: 'utilities', color: 'D93F0B', description: '유틸리티' },
        { name: 'component', color: 'FBCA04', description: '컴포넌트' },
        { name: 'integration', color: '0E8A16', description: '통합' },
        { name: 'performance', color: 'F9D0C4', description: '성능' },
        { name: 'accessibility', color: 'C5DEF5', description: '접근성' }
    ];

    labels.forEach(label => {
        try {
            execSync(`gh label create "${label.name}" --color "${label.color}" --description "${label.description}"`, {
                stdio: 'pipe'
            });
            console.log(`  ✅ Created label: ${label.name}`);
        } catch (error) {
            console.log(`  ⚠️  Label ${label.name} may already exist`);
        }
    });

    console.log('\n');
}

// Issues 생성
function createIssues() {
    console.log('📝 Creating Issues...\n');

    const issuesDir = path.join(__dirname, '..', 'issues');

    phase1Issues.forEach((issue, index) => {
        const filePath = path.join(issuesDir, issue.file);

        // 파일이 존재하지 않으면 기본 템플릿 생성
        if (!fs.existsSync(filePath)) {
            console.log(`  ⚠️  File not found: ${issue.file}, creating basic template...`);
            const template = generateIssueTemplate(issue);
            fs.writeFileSync(filePath, template);
        }

        const labels = issue.labels.join(',');
        const dependsText = issue.dependsOn ? `\n\n**Depends on**: ${issue.dependsOn.map(n => `#${n}`).join(', ')}` : '';

        try {
            // Issue 생성
            const command = `gh issue create --title "${issue.title}" --body-file "${filePath}" --label "${labels}" --milestone "Phase 1 - MVP"`;

            console.log(`  Creating Issue #${issue.number}: ${issue.title}`);
            execSync(command, { stdio: 'pipe' });
            console.log(`  ✅ Created Issue #${issue.number}\n`);

            // 약간의 딜레이 (API rate limit 방지)
            if (index < phase1Issues.length - 1) {
                execSync('timeout /t 1 /nobreak > nul', { stdio: 'pipe' });
            }
        } catch (error) {
            console.log(`  ❌ Failed to create Issue #${issue.number}: ${error.message}\n`);
        }
    });
}

// 기본 Issue 템플릿 생성
function generateIssueTemplate(issue) {
    return `## 🎯 작업 배경

${issue.title}을(를) 구현해야 합니다.

---

## 📋 작업 내용

### 체크리스트

- [ ] 작업 항목 1
- [ ] 작업 항목 2
- [ ] 작업 항목 3

### 구현 세부사항

[TASKS.md](../../docs/TASKS.md)를 참조하세요.

---

## ✅ 인수 조건

- [ ] 모든 체크리스트 완료
- [ ] 테스트 통과 (해당하는 경우)
- [ ] 코드 리뷰 완료
- [ ] 문서 업데이트

---

## 📚 참고 자료

- [TASKS.md](../../docs/TASKS.md)
- [TDD Rules](../../docs/rules/tdd.md)
- [SOLID Principles](../../docs/rules/solid.md)

---

## ⏱️ 예상 시간

${issue.estimate}

---

## 🔗 의존성

${issue.dependsOn ? issue.dependsOn.map(n => `- Depends on #${n}`).join('\n') : '없음'}
`;
}

// 메인 실행
function main() {
    console.log('🚀 GitHub Issues 생성 시작...\n');
    console.log('='.repeat(50) + '\n');

    // 1. Milestone 생성
    createMilestone();

    // 2. Labels 생성
    createLabels();

    // 3. Issues 생성
    createIssues();

    console.log('='.repeat(50));
    console.log('\n✨ 완료! GitHub Issues가 생성되었습니다.');
    console.log('\n📊 생성된 Issues: ' + phase1Issues.length + '개');
    console.log('\n🔗 확인: https://github.com/[YOUR-USERNAME]/PomodoroTimer-demo/issues\n');
}

// 실행
if (require.main === module) {
    main();
}

module.exports = { phase1Issues, createMilestone, createLabels, createIssues };
