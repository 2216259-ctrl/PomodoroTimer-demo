## 🎯 작업 배경

Pomodoro Timer 프로젝트를 시작하기 위해 GitHub Repository를 설정해야 합니다. 이는 프로젝트의 기반이 되며, GitHub Pages를 통한 자동 배포를 위한 필수 단계입니다.

---

## 📋 작업 내용

### 체크리스트

- [ ] GitHub에서 새 repository 생성 (PomodoroTimer-demo)
  - Public repository로 생성
  - README, .gitignore, LICENSE 추가하지 않음 (로컬에 이미 존재)
- [ ] 로컬 Git 초기화
  ```bash
  git init
  git add .
  git commit -m "chore: Initial project setup"
  ```
- [ ] 원격 저장소 연결
  ```bash
  git remote add origin https://github.com/[USERNAME]/PomodoroTimer-demo.git
  git branch -M main
  git push -u origin main
  ```
- [ ] GitHub Pages 활성화
  - Settings → Pages
  - Source: GitHub Actions 선택
- [ ] Actions 권한 설정
  - Settings → Actions → General
  - Workflow permissions: Read and write permissions 선택
  - Allow GitHub Actions to create and approve pull requests 체크

### 구현 세부사항

1. **Repository 생성**
   - Repository name: `PomodoroTimer-demo`
   - Description: "현대적이고 아름다운 디자인의 뽀모도로 타이머 웹 애플리케이션"
   - Visibility: Public

2. **로컬 연결**
   - 기존 로컬 프로젝트를 원격 저장소에 연결
   - 첫 커밋 및 푸시

3. **GitHub Pages 설정**
   - GitHub Actions를 통한 자동 배포 설정
   - `.github/workflows/deploy.yml` 파일이 정상 작동하도록 권한 설정

---

## ✅ 인수 조건

- [ ] GitHub repository가 생성되어 있음
- [ ] 로컬 코드가 원격 저장소에 푸시되어 있음
- [ ] GitHub Pages가 활성화되어 있음 (Source: GitHub Actions)
- [ ] Actions 워크플로우 권한이 설정되어 있음 (Read and write)
- [ ] Repository URL에 접속 가능
- [ ] Actions 탭에서 워크플로우 확인 가능

---

## 📚 참고 자료

- [TASKS.md - Task 1.1.1](../../docs/TASKS.md#task-111-github-repository-설정)
- [DEPLOYMENT.md](../../docs/DEPLOYMENT.md)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🏷️ Labels

`phase-1`, `setup`, `high-priority`

---

## ⏱️ 예상 시간

30분

---

## 🔗 의존성

없음 (첫 번째 작업)

---

## 📝 완료 후 작업

- [ ] Issue에 Repository URL 코멘트로 추가
- [ ] 다음 작업(#2) 시작 가능
