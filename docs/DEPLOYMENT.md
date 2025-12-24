# Deployment Guide
# Pomodoro Timer - GitHub Pages

## 📋 Overview

이 문서는 Pomodoro Timer 웹 애플리케이션을 GitHub Pages에 배포하는 방법을 설명합니다.

---

## 🚀 배포 프로세스

### 자동 배포 (GitHub Actions)

프로젝트는 `main` 브랜치에 푸시될 때마다 자동으로 빌드되고 배포됩니다.

**워크플로우 파일**: `.github/workflows/deploy.yml`

**배포 단계**:
1. 코드 체크아웃
2. Node.js 20 설정
3. 의존성 설치 (`npm ci`)
4. 프로젝트 빌드 (`npm run build`)
5. GitHub Pages에 배포

---

## ⚙️ GitHub Pages 설정

### 1. Repository 설정

1. GitHub 저장소로 이동
2. **Settings** → **Pages** 클릭
3. **Source** 섹션에서:
   - Source: **GitHub Actions** 선택
4. 저장

### 2. 첫 배포

```bash
# 1. 의존성 설치
npm install

# 2. 로컬에서 빌드 테스트
npm run build

# 3. 로컬에서 프리뷰
npm run preview

# 4. Git에 커밋 및 푸시
git add .
git commit -m "feat: Initial deployment setup"
git push origin main
```

### 3. 배포 확인

1. GitHub 저장소의 **Actions** 탭에서 워크플로우 실행 확인
2. 배포 완료 후 다음 URL에서 확인:
   ```
   https://[YOUR-USERNAME].github.io/PomodoroTimer-demo/
   ```

---

## 🔧 설정 파일 설명

### vite.config.js

```javascript
export default defineConfig({
  base: '/PomodoroTimer-demo/',  // GitHub Pages 경로
  // ... 기타 설정
});
```

**중요**: `base` 경로는 반드시 저장소 이름과 일치해야 합니다.

### package.json

주요 스크립트:
- `npm run dev`: 개발 서버 실행 (localhost:3000)
- `npm run build`: 프로덕션 빌드 (dist 폴더 생성)
- `npm run preview`: 빌드된 파일 미리보기

---

## 🌐 Custom Domain 설정 (선택사항)

### 1. DNS 설정

도메인 제공업체에서 다음 레코드 추가:

```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: [YOUR-USERNAME].github.io
```

### 2. GitHub 설정

1. **Settings** → **Pages**
2. **Custom domain**에 도메인 입력
3. **Enforce HTTPS** 체크

### 3. CNAME 파일 추가

`public/CNAME` 파일 생성:
```
yourdomain.com
```

---

## 🔍 트러블슈팅

### 문제 1: 404 에러

**원인**: `base` 경로가 잘못 설정됨

**해결**:
```javascript
// vite.config.js
base: '/PomodoroTimer-demo/',  // 저장소 이름과 일치해야 함
```

### 문제 2: 빌드 실패

**원인**: 의존성 설치 오류

**해결**:
```bash
# package-lock.json 삭제 후 재설치
rm package-lock.json
npm install
```

### 문제 3: GitHub Actions 권한 오류

**원인**: Pages 권한 미설정

**해결**:
1. **Settings** → **Actions** → **General**
2. **Workflow permissions**에서 **Read and write permissions** 선택
3. **Allow GitHub Actions to create and approve pull requests** 체크

### 문제 4: 캐시 문제

**원인**: 브라우저 캐시

**해결**:
- 하드 리프레시: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
- 또는 시크릿 모드에서 확인

---

## 📊 배포 모니터링

### GitHub Actions 로그 확인

1. 저장소의 **Actions** 탭 클릭
2. 최근 워크플로우 실행 선택
3. 각 단계별 로그 확인

### 배포 상태 확인

```bash
# 배포된 사이트 확인
curl -I https://[YOUR-USERNAME].github.io/PomodoroTimer-demo/
```

---

## 🔄 업데이트 배포

### 코드 변경 후 배포

```bash
# 1. 변경사항 커밋
git add .
git commit -m "feat: Add new feature"

# 2. 푸시 (자동 배포 트리거)
git push origin main

# 3. GitHub Actions에서 배포 진행 확인
```

### 수동 배포 트리거

GitHub 저장소에서:
1. **Actions** 탭 클릭
2. **Deploy to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. **Run workflow** 확인

---

## 🧪 배포 전 체크리스트

- [ ] `npm run build` 로컬 빌드 성공
- [ ] `npm run preview` 프리뷰 확인
- [ ] 모든 링크와 이미지 경로 확인
- [ ] 다크 모드 정상 작동 확인
- [ ] 모바일 반응형 확인
- [ ] 브라우저 콘솔 에러 없음
- [ ] Lighthouse 점수 확인 (90+ 목표)

---

## 📈 성능 최적화

### 빌드 최적화

현재 Vite 설정:
- **Minification**: Terser (console.log 제거)
- **Code Splitting**: Vendor 청크 분리
- **Asset Optimization**: 자동 압축

### CDN 캐싱

GitHub Pages는 자동으로 CDN을 통해 제공됩니다:
- 정적 파일 캐싱
- HTTPS 자동 적용
- 전 세계 배포

---

## 🔐 보안

### HTTPS

GitHub Pages는 자동으로 HTTPS를 제공합니다.

### Content Security Policy

`index.html`에 CSP 헤더 추가:
```html
<meta http-equiv="Content-Security-Policy" content="...">
```

---

## 📝 환경별 설정

### Development

```bash
npm run dev
# http://localhost:3000
```

### Production (Local Preview)

```bash
npm run build
npm run preview
# http://localhost:4173
```

### Production (GitHub Pages)

```
https://[YOUR-USERNAME].github.io/PomodoroTimer-demo/
```

---

## 🎯 다음 단계

1. ✅ GitHub Pages 설정 완료
2. ✅ 자동 배포 워크플로우 설정
3. ⬜ Custom domain 연결 (선택사항)
4. ⬜ PWA 설정 추가 (Phase 4)
5. ⬜ Analytics 추가 (선택사항)

---

## 📞 지원

문제가 발생하면:
1. [GitHub Issues](../../issues) 확인
2. [GitHub Actions 로그](../../actions) 확인
3. [Vite 문서](https://vitejs.dev/) 참조
4. [GitHub Pages 문서](https://docs.github.com/en/pages) 참조

---

**Last Updated**: 2025-12-24
**Status**: ✅ Ready for Deployment
