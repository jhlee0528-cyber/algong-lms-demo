<template>
  <transition name="fade">
    <div v-if="visible" class="chat-window" :style="chatStyle">
      <div class="chat-header">
        🤖 LMS 비서
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="chat-messages" ref="chatMessages">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="['message', msg.from === 'user' ? 'user' : 'bot']"
        >
          <span>{{ msg.text }}</span>
          <span v-if="msg.cursor" class="blinking-cursor">|</span>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="chat-input-area">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="메시지를 입력하세요..."
          autocomplete="off"
        />
        <button style="font-size: 14px" type="submit">전송</button>
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
  },
  data() {
    return {
      inputMessage: "",
      messages: [
        {
          from: "bot",
          text: "안녕하세요 선생님! 무엇을 도와드릴까요?",
          cursor: false,
        },
      ],
    };
  },
  computed: {
    chatStyle() {
      const margin = 10;
      const width = 600;
      const height = 550;
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
      if (!this.inputMessage.trim()) return;
      this.messages.push({
        from: "user",
        text: this.inputMessage.trim(),
        cursor: false,
      });

      const userMsg = this.inputMessage.trim();
      this.inputMessage = "";

      const res = await axios.post(
        `http://localhost:5000/chat`,
        {
          message: userMsg,
        },
        { headers: { Authorization: getSaveCookie("info") } }
      );

      this.streamBotMessage(`${res.data.message}`);

      this.$nextTick(this.scrollToBottom);
    },
    streamBotMessage(fullText) {
      const botMessage = { from: "bot", text: "", cursor: true };
      this.messages.push(botMessage);
      this.$nextTick(this.scrollToBottom);

      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          botMessage.text += fullText[i];

          // 강제로 배열 갱신 → Vue에게 "messages 배열이 바뀌었다"고 인식시키기
          this.messages = [...this.messages];

          i++;
          this.$nextTick(this.scrollToBottom);
        } else {
          botMessage.cursor = false;
          this.messages = [...this.messages];
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
</style>
