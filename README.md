# 🍅 Pomodoro Timer

[![Deploy to GitHub Pages](https://github.com/[YOUR-USERNAME]/PomodoroTimer-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/[YOUR-USERNAME]/PomodoroTimer-demo/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 현대적이고 아름다운 디자인의 뽀모도로 타이머 웹 애플리케이션

[🚀 Live Demo](https://[YOUR-USERNAME].github.io/PomodoroTimer-demo/) | [📋 PRD](./PRD.md) | [🔧 Tech Spec](./TECH_SPEC.md) | [📦 Deployment Guide](./DEPLOYMENT.md)

---

## ✨ Features

- ⏱️ **Customizable Timer**: 집중 시간, 휴식 시간 자유롭게 설정
- 🎨 **Beautiful UI**: 현대적이고 직관적인 인터페이스
- 🌓 **Dark Mode**: 눈의 피로를 줄이는 다크 모드 지원
- 📱 **Responsive Design**: 모바일, 태블릿, 데스크톱 모두 지원
- 🔔 **Smart Notifications**: 브라우저 알림과 사운드 알림
- 📊 **Statistics**: 생산성 추적 및 통계
- 🎯 **Focus Mode**: 방해 없는 집중 환경
- 💾 **Auto Save**: 설정과 진행 상황 자동 저장

---

## 🎯 Preview

![Pomodoro Timer Preview](./docs/design/screen.png)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20 이상
- npm 또는 yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/[YOUR-USERNAME]/PomodoroTimer-demo.git
cd PomodoroTimer-demo

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

---

## 📦 Build & Deploy

### Local Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

프로젝트는 `main` 브랜치에 푸시될 때 자동으로 배포됩니다.

```bash
git add .
git commit -m "feat: Your commit message"
git push origin main
```

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

---

## 🛠️ Tech Stack

### Core
- **HTML5** - Semantic markup
- **CSS3** - Modern styling
- **JavaScript (ES2022+)** - Application logic

### Frameworks & Libraries
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 5.0** - Build tool and dev server
- **Chart.js** - Statistics visualization (Phase 3)

### Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Playwright** - E2E testing

### Deployment
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static hosting

---

## 📁 Project Structure

```
pomodoro-timer/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── design/                     # Design references
│   ├── code.html
│   └── screen.png
├── docs/                       # Documentation
├── src/                        # Source code (Phase 2+)
│   ├── css/
│   ├── js/
│   └── assets/
├── index.html                  # Main HTML file
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── PRD.md                      # Product Requirements
├── TECH_SPEC.md                # Technical Specification
└── DEPLOYMENT.md               # Deployment Guide
```

---

## 🎨 Design System

### Colors

```css
Primary: #13c8ec (Cyan)
Background Light: #f6f8f8
Background Dark: #101f22
Surface Dark: #1a2c30
Border Dark: #223032
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components

- Circular Progress Ring (SVG)
- Timer Display
- Control Buttons
- Settings Modal
- Statistics Dashboard

---

## 📖 Documentation

- **[PRD.md](./docs/PRD.md)** - Product Requirements Document
  - Product vision and goals
  - Feature specifications
  - User stories and acceptance criteria
  - Development phases

- **[TECH_SPEC.md](./docs/TECH_SPEC.md)** - Technical Specification
  - System architecture
  - Technology stack details
  - Core modules and APIs
  - Performance optimization
  - Testing strategy

- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment Guide
  - GitHub Pages setup
  - Troubleshooting
  - Custom domain configuration

- **[TASKS.md](./docs/TASKS.md)** - Task Plan
  - Detailed task breakdown with code examples
  - Time estimates and dependencies
  - Phase-by-phase implementation guide
  - TDD and SOLID checklists

- **[docs/rules/](./docs/rules/)** - Development Rules
  - TDD methodology
  - SOLID principles
  - Code quality standards

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

---

## 🗺️ Roadmap

### Phase 1: MVP ✅
- [x] Basic timer functionality
- [x] Play/Pause/Reset controls
- [x] Circular progress indicator
- [x] Dark mode support
- [x] Responsive design
- [x] Browser notifications
- [x] Local storage

### Phase 2: Enhanced Features 🚧
- [ ] Settings modal
- [ ] Customizable timer durations
- [ ] Sound selection
- [ ] Keyboard shortcuts
- [ ] Auto-start options

### Phase 3: Statistics 📊
- [ ] Session tracking
- [ ] Daily/weekly statistics
- [ ] Visual charts
- [ ] Achievement system

### Phase 4: Advanced Features 🚀
- [ ] PWA support
- [ ] Offline mode
- [ ] Multi-language support
- [ ] Task management integration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Design inspiration from modern productivity apps
- [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique) by Francesco Cirillo
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility framework
- [Material Symbols](https://fonts.google.com/icons) for beautiful icons

---

## 📞 Contact

Project Link: [https://github.com/[YOUR-USERNAME]/PomodoroTimer-demo](https://github.com/[YOUR-USERNAME]/PomodoroTimer-demo)

---

<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>Happy Focusing! 🍅</p>
</div>