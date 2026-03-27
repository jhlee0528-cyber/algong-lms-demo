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
        <div class="badge expiry-badge">
          <span class="badge-icon">📅</span>
          구독 종료 2주 전
        </div>

        <h2 class="modal-title">
          선생님, 구독이<br />
          <span class="highlight-date">{{ $store.state.expire.date }}</span
          >에 종료 예정이에요
        </h2>

        <p class="modal-subtitle">
          종료 후에는 그동안 쌓아온 데이터와<br />
          수업 운영 체계가 중단될 수 있어요.
        </p>

        <div class="warning-box">
          <div class="warning-title">끊기면 사라지는 것들</div>

          <div class="warning-item">
            <div class="warning-icon data-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M3 3v18h18" />
                <path d="M18 9l-5 5-4-4-3 3" />
              </svg>
            </div>
            <div class="warning-content">
              <strong>학생별 학습 흐름 데이터</strong> — 누가 매일 했고, 어디서
              멈췄는지의 패턴
            </div>
          </div>

          <div class="warning-item">
            <div class="warning-icon system-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v10M1 12h6m6 0h10" />
              </svg>
            </div>
            <div class="warning-content">
              <strong>수업 운영 체계</strong> — 미션 세팅, 보상 체계, 학생 계정
            </div>
          </div>

          <div class="warning-item">
            <div class="warning-icon reading-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path
                  d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                />
              </svg>
            </div>
            <div class="warning-content">
              <strong>독서 활동 기록</strong> — 독서량, 퀴즈 결과
              <span class="premium-tag">영어 프리미엄만</span>
            </div>
          </div>
        </div>

        <p class="renewal-message">
          아이들이 매일 학습하던 흐름이 끊기지 않도록,<br />
          미리 갱신 준비해 주시면 좋겠어요 🙏
        </p>

        <button class="cta-button" @click="requestRenewal">
          <span class="chat-icon">💬</span>
          채널톡으로 갱신 견적 요청
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
  name: "SubscriptionExpiryWarningModal",
  props: {
    expiryDate: {
      type: String,
      default: "2026-03-20",
    },
  },
  methods: {
    close() {
      saveCookie("expiretype3", "1");
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
  max-width: 420px;
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

.expiry-badge {
  background: #ede9fe;
  color: #6d28d9;
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

.highlight-date {
  color: #6366f1;
}

.modal-subtitle {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 24px;
}

.warning-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.warning-title {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 16px;
}

.warning-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
}

.warning-item:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}

.warning-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.data-icon {
  background: #dbeafe;
  color: #2563eb;
}

.system-icon {
  background: #fce7f3;
  color: #db2777;
}

.reading-icon {
  background: #d1fae5;
  color: #059669;
}

.warning-content {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
}

.warning-content strong {
  color: #1f2937;
  font-weight: 600;
}

.premium-tag {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: -5px;
}

.renewal-message {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 24px;
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
