# 배포 가이드 - 인터넷 웹 주소로 접근하기

이 프로젝트를 인터넷에서 접근 가능한 웹 주소로 배포하는 방법을 안내합니다.

## 🚀 배포 옵션

### 옵션 1: Vercel (추천) ⭐

**장점**: 
- 무료
- 설정 간단
- 자동 HTTPS
- GitHub 연동 시 자동 배포

**배포 방법**:

1. **Vercel 계정 생성**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인 (또는 이메일로 가입)

2. **프로젝트 배포**
   ```bash
   # Vercel CLI 설치
   npm install -g vercel
   
   # 프로젝트 루트에서 배포
   vercel
   ```
   
   또는 웹에서:
   - Vercel 대시보드 → "Add New Project"
   - GitHub 저장소 연결 또는 파일 업로드
   - Framework Preset: "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy 클릭

3. **환경 변수 설정** (필요시)
   - 프로젝트 설정 → Environment Variables
   - `VITE_API_BASE_URL` 등 추가

4. **배포 완료**
   - 배포 후 `https://your-project.vercel.app` 형태의 URL 제공
   - 커스텀 도메인도 설정 가능

---

### 옵션 2: Netlify

**장점**:
- 무료
- 설정 간단
- 자동 HTTPS
- GitHub 연동 시 자동 배포

**배포 방법**:

1. **Netlify 계정 생성**
   - https://www.netlify.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트 배포**
   ```bash
   # Netlify CLI 설치
   npm install -g netlify-cli
   
   # 프로젝트 빌드
   npm run build
   
   # 배포
   netlify deploy --prod
   ```
   
   또는 웹에서:
   - Netlify 대시보드 → "Add new site" → "Import an existing project"
   - GitHub 저장소 연결
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy site 클릭

3. **배포 완료**
   - 배포 후 `https://your-project.netlify.app` 형태의 URL 제공

---

### 옵션 3: GitHub Pages

**장점**:
- 무료
- GitHub 저장소와 통합

**배포 방법**:

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/algong-lms.git
   git push -u origin main
   ```

2. **GitHub Actions 워크플로우 생성**
   - `.github/workflows/deploy.yml` 파일이 자동으로 생성됨 (아래 참고)

3. **GitHub Pages 활성화**
   - 저장소 Settings → Pages
   - Source: GitHub Actions 선택

4. **배포 완료**
   - 배포 후 `https://your-username.github.io/algong-lms` 형태의 URL 제공

---

## 📝 배포 전 체크리스트

### 1. 환경 변수 확인
`.env.production` 파일 생성 (필요시):
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_STUDY_ROOM_NAME=알공 영어 공부방
```

### 2. API URL 설정
- 배포 환경의 API 서버 URL로 변경
- `src/api/client.ts`에서 기본 URL 확인

### 3. 빌드 테스트
```bash
npm run build
npm run preview
```

### 4. 정적 파일 확인
- `public/logo.png` 등 정적 파일이 `dist` 폴더에 포함되는지 확인

---

## 🔧 GitHub Actions 자동 배포 설정

GitHub Pages를 사용하는 경우, `.github/workflows/deploy.yml` 파일을 생성하세요:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🌐 커스텀 도메인 설정

### Vercel
1. 프로젝트 설정 → Domains
2. 원하는 도메인 입력
3. DNS 설정 안내에 따라 CNAME 또는 A 레코드 추가

### Netlify
1. Site settings → Domain management
2. Add custom domain
3. DNS 설정 안내에 따라 레코드 추가

---

## 📊 배포 상태 확인

배포 후 다음을 확인하세요:

1. ✅ 홈페이지 로드 확인
2. ✅ 라우팅 동작 확인 (각 페이지 이동)
3. ✅ API 연결 확인
4. ✅ 이미지 로드 확인
5. ✅ 반응형 디자인 확인

---

## 🐛 문제 해결

### 빌드 실패
- `npm run build` 로컬에서 먼저 테스트
- 에러 메시지 확인 및 수정

### 라우팅 문제 (404)
- SPA 라우팅을 위한 rewrite 규칙 확인
- `vercel.json` 또는 `netlify.toml` 설정 확인

### API 연결 실패
- CORS 설정 확인
- 환경 변수 확인
- API 서버 URL 확인

---

## 💡 추천 배포 순서

1. **개발 완료** → 로컬에서 테스트
2. **GitHub에 푸시** → 버전 관리
3. **Vercel 또는 Netlify 연결** → 자동 배포
4. **도메인 연결** (선택사항)

---

## 📞 지원

배포 중 문제가 발생하면:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- GitHub Pages: https://docs.github.com/pages
