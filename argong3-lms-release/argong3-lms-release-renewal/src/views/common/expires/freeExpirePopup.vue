<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-container">
      <button class="close-btn" @click="close">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div class="modal-content">
        <div class="badge trial-badge">
          <span class="badge-icon">📋</span>
          체험 종료 안내
        </div>

        <h2 class="modal-title">
          오늘 체험이 종료돼요!<br />
          알공과 함께한 시간은 어떠셨나요? 😊
        </h2>

        <p class="modal-subtitle">
          정식 도입 시, 이런 기능들로<br />
          <strong>아이들이 매일 학습하는 교실</strong>을 만들 수 있어요!
        </p>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon monitoring-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M3 3v18h18" />
                <path d="M18 9l-5 5-4-4-3 3" />
              </svg>
            </div>
            <div class="feature-content">
              <h4>실시간 모니터링</h4>
              <p>누가 접속했고, 누가 빠졌는지 바로 확인</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon mission-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div class="feature-content">
              <h4>학습미션 + 보상 시스템</h4>
              <p>매일 미션과 골드로 자연스러운 학습 동기부여</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon feedback-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </div>
            <div class="feature-content">
              <h4>피드백 메시지</h4>
              <p>학습이 멈춘 학생에게 바로 한마디 건네기</p>
            </div>
          </div>
        </div>

        <button class="cta-button" @click="requestQuote">
          <span class="kakao-icon">💬</span>
          채널톡으로 견적 요청
        </button>

        <div class="contact-info">
          <span class="phone-icon">📞</span>
          전화 문의: 02-837-8313
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveCookie } from "../../../store/cookie";

export default {
  name: "TrialEndModal",
  methods: {
    close() {
      saveCookie("expiretype1", "1");
      this.$store.state.expire = {
        flag: false,
        type: 0,
      };
    },
    requestQuote() {
      window.open("https://4wlkw.channel.io/home");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #6b7280;
}

.modal-content {
  padding: 32px 24px 24px;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

.trial-badge {
  background: #fef3c7;
  color: #92400e;
}

.badge-icon {
  font-size: 16px;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
  margin: 0 0 12px;
}

.modal-subtitle {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 24px;
}

.modal-subtitle strong {
  color: #3b82f6;
  font-weight: 600;
}

.feature-list {
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  text-align: left;
}

.feature-item:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.monitoring-icon {
  background: #dbeafe;
  color: #2563eb;
}

.mission-icon {
  background: #fce7f3;
  color: #db2777;
}

.feedback-icon {
  background: #e0e7ff;
  color: #4f46e5;
}

.feature-content h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px;
}

.feature-content p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.cta-button {
  width: 100%;
  padding: 16px 24px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #2563eb;
}

.kakao-icon {
  font-size: 18px;
}

.contact-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 14px;
  color: #6b7280;
}

.phone-icon {
  font-size: 16px;
}
</style>
