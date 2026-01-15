# 빠른 배포 가이드 (5분 안에 배포하기)

## 🚀 가장 빠른 방법: Vercel CLI

### 1단계: Vercel CLI 설치 및 로그인
```bash
npm install -g vercel
vercel login
```

### 2단계: 프로젝트 배포
```bash
# 프로젝트 루트에서 실행
vercel
```

질문에 답변:
- **Set up and deploy?** → `Y`
- **Which scope?** → 본인 계정 선택
- **Link to existing project?** → `N` (처음 배포)
- **Project name?** → `algong-lms` (또는 원하는 이름)
- **Directory?** → `.` (현재 디렉토리)
- **Override settings?** → `N`

### 3단계: 완료! 🎉
배포가 완료되면 다음과 같은 URL이 제공됩니다:
```
https://algong-lms-xxxxx.vercel.app
```

이 URL로 인터넷 어디서나 접근 가능합니다!

---

## 🌐 웹에서 배포하기 (CLI 없이)

### Vercel 웹 배포

1. **https://vercel.com** 접속
2. **Sign Up** → GitHub 계정으로 로그인
3. **Add New Project** 클릭
4. GitHub 저장소 선택 (또는 파일 드래그 앤 드롭)
5. 설정:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Deploy** 클릭
7. 완료! URL 제공됨

---

## 📱 모바일에서도 접근 가능

배포된 URL은:
- ✅ 데스크톱 브라우저에서 접근 가능
- ✅ 모바일 브라우저에서 접근 가능
- ✅ 태블릿에서 접근 가능
- ✅ HTTPS 자동 적용 (보안)

---

## 🔄 업데이트 배포

코드를 수정한 후 다시 배포:

```bash
# 변경사항 커밋
git add .
git commit -m "Update features"

# Vercel에 다시 배포
vercel --prod
```

또는 GitHub에 푸시하면 자동 배포됩니다 (연동 시).

---

## 💡 팁

- **무료 플랜**: 충분히 사용 가능
- **자동 HTTPS**: SSL 인증서 자동 설정
- **글로벌 CDN**: 전 세계 어디서나 빠른 접속
- **커스텀 도메인**: 나중에 본인 도메인 연결 가능

---

## ❓ 문제 해결

### 배포 실패 시
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인 후 수정
```

### 환경 변수 설정
Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

---

**5분 안에 인터넷에서 접근 가능한 웹사이트 완성!** 🎉
