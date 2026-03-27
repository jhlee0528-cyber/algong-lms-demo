<template>
  <div class="appdiv">
    <div class="success-container">
      <div class="icon-box">
        <svg viewBox="0 0 24 24" class="check-icon">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </div>

      <h2 class="success-title">동의가 완료되었습니다!</h2>
      <!-- <p class="success-desc">
        서비스 이용을 위한 모든 준비가 끝났습니다.<br />
        이제 메인 화면으로 이동하여 서비스를 이용해 보세요.
      </p> -->

      <div class="info-summary">
        <div class="info-row">
          <span>처리 일시</span>
          <strong>2026.01.14 14:30</strong>
        </div>
        <div class="info-row">
          <span>동의 항목</span>
          <strong>필수 항목(2건)</strong>
        </div>
      </div>

      <!-- <button class="home-btn" @click="goHome">메인으로 이동</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
/* PC와 모바일 공통 레이아웃 */
.appdiv {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 20px;
  box-sizing: border-box;
}

/* 완료 카드 박스 */
.success-container {
  width: 100%;
  max-width: 450px; /* PC 상한선 */
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  box-sizing: border-box;
}

/* 체크 아이콘 애니메이션 스타일 */
.icon-box {
  width: 80px;
  height: 80px;
  background-color: #e8f3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.check-icon {
  width: 50px;
  height: 50px;
  fill: #3182f6;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.success-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
}

/* 동의 요약 정보 박스 */
.info-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: left;
  margin-top: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-row span {
  color: #888;
}
.info-row strong {
  color: #333;
  font-weight: 600;
}

/* 버튼 */
.home-btn {
  width: 100%;
  height: 56px;
  background-color: #3182f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.home-btn:active {
  background-color: #1b64da;
}

/* 모바일 전용 (화면이 작을 때) */
@media screen and (max-width: 480px) {
  .success-container {
    padding: 30px 20px;
    box-shadow: none; /* 모바일은 깔끔하게 배경만 */
  }
  .success-title {
    font-size: 1.3rem;
  }
}
</style>