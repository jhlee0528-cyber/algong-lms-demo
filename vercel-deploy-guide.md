# 알공공부방 데모 — Vercel 배포 가이드

> Jay님(비개발자)이 따라할 수 있도록 하나씩 설명합니다.
> 전체 소요시간: 약 10~15분

---

## 1단계: GitHub에 새 저장소 만들기 (웹 브라우저)

1. https://github.com 접속 → DNSOFT 계정으로 로그인
2. 우측 상단 **+** 버튼 → **New repository** 클릭
3. 아래와 같이 입력:
   - **Repository name:** `algong-lms-demo`
   - **Description:** 알공공부방 데모 프론트엔드
   - **Public** 또는 **Private** 선택 (Private 추천 — 외부에 코드 비공개)
   - ⚠️ "Add a README file" 체크 **하지 마세요!** (비워둬야 합니다)
4. **Create repository** 버튼 클릭

→ 빈 저장소가 생성되면 URL을 복사하세요. 형태: `https://github.com/DNSOFT계정이름/algong-lms-demo.git`

---

## 2단계: 로컬 코드를 GitHub에 올리기 (터미널)

**새 터미널(명령 프롬프트)을 열고** 아래 명령어를 한 줄씩 실행하세요:

```bash
cd "C:\Users\DNSOFT\Documents\★작업폴더\LMS"

git remote add origin https://github.com/DNSOFT계정이름/algong-lms-demo.git

git push -u origin demo
```

⚠️ `DNSOFT계정이름` 부분을 실제 GitHub 아이디로 바꿔주세요!

GitHub 로그인 팝업이 뜨면 로그인하세요. 완료되면 GitHub 저장소 페이지를 새로고침해서 코드가 올라갔는지 확인!

---

## 3단계: Vercel 가입 + GitHub 연결 (웹 브라우저)

1. https://vercel.com 접속
2. **Sign Up** → **Continue with GitHub** 클릭
3. GitHub 계정으로 로그인 + Vercel에 GitHub 접근 허용

---

## 4단계: 프로젝트 배포 (웹 브라우저)

1. Vercel 대시보드에서 **Add New...** → **Project** 클릭
2. **Import Git Repository** 에서 `algong-lms-demo` 저장소 찾기 → **Import** 클릭
3. 설정 화면이 나오면:
   - **Framework Preset:** Vite (자동 감지될 수 있음)
   - **Root Directory:** 비워두기 (기본값)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Branch:** `demo` (기본이 main이면 demo로 변경!)
4. **Deploy** 버튼 클릭!

→ 1~2분 기다리면 배포 완료!
→ `https://algong-lms-demo.vercel.app` 같은 URL이 생성됩니다.

---

## 5단계: 배포 완료 확인

Vercel이 알려주는 URL을 클릭해서 데모가 정상적으로 보이는지 확인하세요.
이 URL을 성은님, 원장님들에게 공유하면 됩니다!

---

## 이후 업데이트 방법

Sprint 3 등 코드를 수정한 후:

```bash
cd "C:\Users\DNSOFT\Documents\★작업폴더\LMS"

git add -A
git commit -m "feat: Sprint 3 수정사항 반영"
git push origin demo
```

→ Vercel이 자동으로 감지해서 다시 빌드 + 배포합니다.
→ 1~2분 후 같은 URL에서 업데이트된 버전을 볼 수 있어요.

---

## 참고: 커스텀 도메인 연결 (선택사항)

나중에 `demo.algong.co.kr` 같은 자체 도메인을 연결하고 싶으면:

1. Vercel 프로젝트 → Settings → Domains
2. 도메인 입력 (예: `demo.algong.co.kr`)
3. 도메인 DNS 설정에서 Vercel이 알려주는 CNAME 레코드 추가

---

## 문제 해결

**Q: `git push`할 때 권한 에러가 나요**
→ GitHub 로그인 팝업에서 로그인하세요. 팝업이 안 뜨면:
```bash
git config --global credential.helper manager
```
실행 후 다시 push

**Q: Vercel 빌드가 실패해요**
→ 에러 로그를 확인하세요. 대부분 TypeScript 타입 에러입니다.
→ 로컬에서 `npm run build`를 먼저 실행해서 에러가 없는지 확인

**Q: demo 브랜치가 안 보여요**
→ Vercel 프로젝트 → Settings → Git → Production Branch를 `demo`로 변경
