<template>
  <transition name="fade">
    <div v-if="visible" class="chat-window" :style="chatStyle">
      <div class="chat-header">
        🤖 알공 코파일럿
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="chat-messages" ref="chatMessages">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="['message', msg.from === 'user' ? 'user' : 'bot']"
        >
          <span v-if="msg.loading" class="loading-dots">{{ msg.text }}</span>
          <span v-else v-html="msg.htmlContent"></span>
          <span v-if="msg.cursor" class="blinking-cursor">|</span>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="chat-input-area">
        <input
          v-model="inputMessage"
          :disabled="!inputFlag"
          type="text"
          placeholder="메시지를 입력하세요..."
          autocomplete="off"
        />
        <button :disabled="!inputFlag" style="font-size: 14px" type="submit">
          전송
        </button>
      </form>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import { getSaveCookie } from "../../store/cookie";

export default {
  name: "ChatWindow",
  props: {
    visible: { type: Boolean, default: false },
    buttonPosition: {
      type: Object,
      default: () => ({ top: 0, left: 0 }),
    },
    routeId: {
      type: String,
    },
  },
  data() {
    return {
      inputMessage: "",
      loading: false,
      messages: [
        {
          from: "bot",
          text: "안녕하세요 선생님! 무엇을 도와드릴까요?",
          htmlContent: "안녕하세요 선생님! 무엇을 도와드릴까요?",
          cursor: false,
        },
      ],
      inputFlag: true,
    };
  },
  computed: {
    chatStyle() {
      // 모바일: 화면 중앙 고정
      if (window.innerWidth <= 767) {
        return {
          position: "fixed",
          top: "60px",
          left: "0",
          right: "0",
          bottom: "70px",
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          transform: "none",
          borderRadius: "0",
          "z-index": 999,
        };
      }

      // PC: 기존 로직
      const margin = 10;
      const width = 800;
      const height = 600;
      const rightSpace = window.innerWidth - (this.buttonPosition.left + 60);

      let top = this.buttonPosition.top;
      if (top + height > window.innerHeight) {
        top = window.innerHeight - height - margin;
      }
      if (top < margin) top = margin;

      let left;
      if (rightSpace < width + margin) {
        left = this.buttonPosition.left - width - margin;
      } else {
        left = this.buttonPosition.left + 60 + margin;
      }

      return {
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        "z-index": 9999,
      };
    },
  },
  methods: {
    async sendMessage() {
      if (!this.inputMessage.trim() || !this.inputFlag) return;

      this.inputFlag = false;

      this.messages.push({
        from: "user",
        text: this.inputMessage.trim(),
        htmlContent: this.inputMessage.trim(),
        cursor: false,
      });

      const userMsg = this.inputMessage.trim();
      this.inputMessage = "";

      // 로딩 메시지 추가
      this.loading = true;
      const loadingMessage = {
        from: "bot",
        text: "분석 중",
        cursor: false,
        loading: true,
      };
      this.messages.push(loadingMessage);
      this.$nextTick(this.scrollToBottom);

      try {
        const sessionId = sessionStorage.getItem("chatSessionId");

        let headers = { Authorization: getSaveCookie("info") };
        let body = {
          message: userMsg,
          sessionId: "",
          userId: this.routeId || "",
          subject: this.$store.state.currentSubject,
        };
        if (sessionId) {
          body["sessionId"] = sessionId;
        }

        const res = await axios.post(
          `${process.env.VUE_APP_CONNECT}/talk/lms/secretary`,
          body,
          { headers }
        );

        // 로딩 메시지 제거
        this.messages = this.messages.filter((msg) => !msg.loading);

        if (!sessionId) {
          sessionStorage.setItem("chatSessionId", res.data.data.sessionId);
        }

        // stream 출력
        this.streamBotMessage(`${res.data.data.message}`);
      } catch (error) {
        this.messages = this.messages.filter((msg) => !msg.loading);
        this.messages.push({
          from: "bot",
          text: "오류가 발생했습니다. 다시 시도해주세요.",
          cursor: false,
        });
        this.inputFlag = true;
      } finally {
        this.inputFlag = true;
        this.loading = false;
        this.$nextTick(this.scrollToBottom);
      }
    },

    streamBotMessage(fullText) {
      const botMessage = {
        from: "bot",
        text: "",
        htmlContent: "",
        cursor: true,
      };
      this.messages.push(botMessage);
      this.$nextTick(this.scrollToBottom);

      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          botMessage.text += fullText[i];
          // htmlContent는 항상 text에서 \n을 <br>로 변환한 형태로 업데이트
          botMessage.htmlContent = botMessage.text.replace(/\n/g, "<br>");
          this.messages = [...this.messages]; // 강제 갱신
          i++;
          this.$nextTick(this.scrollToBottom);
        } else {
          botMessage.cursor = false;
          this.messages = [...this.messages];
          this.inputFlag = true;
          clearInterval(interval);
        }
      }, 30);
    },

    scrollToBottom() {
      const container = this.$refs.chatMessages;
      if (container) container.scrollTop = container.scrollHeight;
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(this.scrollToBottom);
      }
    },
  },
};
</script>

<style scoped>
.chat-window {
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.chat-header {
  background: #007bff;
  color: white;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
}
.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.message {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 18px;
  word-wrap: break-word;
  font-size: 15px;
  line-height: 1.3;
  display: flex;
  align-items: center;
  user-select: text;
  cursor: text;
}
.message.user {
  align-self: flex-end;
  background: #007bff;
  color: white;
  border-bottom-right-radius: 4px;
}
.message.bot {
  align-self: flex-start;
  background: #e5e5ea;
  color: black;
  border-bottom-left-radius: 4px;
}
.blinking-cursor {
  margin-left: 2px;
  animation: blink 1s steps(2, start) infinite;
}
@keyframes blink {
  to {
    visibility: hidden;
  }
}
.loading-dots::after {
  content: "";
  display: inline-block;
  width: 1em;
  text-align: left;
  animation: dots 1.2s steps(4, end) infinite;
}
@keyframes dots {
  0% {
    content: "";
  }
  25% {
    content: ".";
  }
  50% {
    content: "..";
  }
  75% {
    content: "...";
  }
  100% {
    content: "";
  }
}
.chat-input-area {
  display: flex;
  padding: 10px 16px;
  border-top: 1px solid #ddd;
}
.chat-input-area input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 8px 14px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}
.chat-input-area input:focus {
  border-color: #007bff;
}
.chat-input-area button {
  margin-left: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.chat-input-area button:hover {
  background: #0056b3;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 모바일 최적화 */
@media (max-width: 767px) {
  .chat-window {
    position: fixed !important;
    top: 60px !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 70px !important;
    width: 100% !important;
    max-width: 100% !important;
    transform: none !important;
    border-radius: 0 !important;
    z-index: 999 !important;
  }

  .chat-header {
    border-radius: 0 !important;
  }

  .chat-messages {
    padding: 10px !important;
  }

  .chat-input-area {
    padding: 10px !important;
  }

  .chat-input-area input {
    font-size: 14px !important;
  }

  .chat-input-area button {
    font-size: 12px !important;
    padding: 6px 12px !important;
  }
}
</style>
