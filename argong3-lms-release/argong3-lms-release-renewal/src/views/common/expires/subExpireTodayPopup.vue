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
        <div class="badge end-badge">
          <span class="badge-icon">🔔</span>
          구독 종료 안내
        </div>

        <h2 class="modal-title">선생님, 오늘 구독이 종료돼요!</h2>

        <p class="modal-subtitle">
          종료 후에는 아이들이 매일 쌓아온<br />
          <span class="highlight-text">학습 흐름 데이터</span>와 선생님이
          구축하신<br />
          <span class="highlight-text">수업 운영 체계</span>가 중단돼요.
        </p>

        <div class="renewal-prompt">
          <div class="prompt-icon">✨</div>
          <div class="prompt-content">
            <strong>갱신을 원하시면 지금 바로 알려주세요!</strong><br />
            빠르게 도와드릴게요 😊
          </div>
        </div>

        <button class="cta-button" @click="requestRenewal">
          <span class="chat-icon">💬</span>
          채널톡으로 갱신 요청
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
  name: "SubscriptionEndModal",
  methods: {
    close() {
      saveCookie("expiretype2", "1");
      this.$store.state.expire = {
        flag: false,
        type: 0,
      };
    },
    requestRenewal() {
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
  max-width: 380px;
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

.end-badge {
  background: #fef3c7;
  color: #b45309;
}

.badge-icon {
  font-size: 16px;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
  margin: 0 0 16px;
}

.modal-subtitle {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.7;
  margin: 0 0 24px;
}

.highlight-text {
  color: #3b82f6;
  font-weight: 600;
}

.renewal-prompt {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: left;
}

.prompt-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.prompt-content {
  font-size: 14px;
  color: #166534;
  line-height: 1.6;
}

.prompt-content strong {
  color: #15803d;
  font-weight: 600;
}

.cta-button {
  width: 100%;
  padding: 16px 24px;
  background: #6366f1;
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
  background: #4f46e5;
}

.chat-icon {
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
