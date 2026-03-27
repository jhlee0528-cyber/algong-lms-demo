<template>
  <div class="floating-button-wrapper">
    <button
      ref="floatingBtn"
      class="floating-button"
      @click="$emit('toggle-chat')"
      @mousedown.prevent="startDrag"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M2 2h20v16H5.17L2 22V2z" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        viewBox="0 0 24 24"
      >
        <line x1="18" y1="6" x2="6" y2="18" stroke="white" stroke-width="2" />
        <line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="2" />
      </svg>

      <!-- 호버 툴팁 -->
      <div v-show="!dragging" class="hover-tooltip">
        📌 드래그해서 위치를 자유롭게 조정할 수 있어요!
      </div>
    </button>
  </div>
</template>


<script>
export default {
  name: "FloatingChatButton",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragging: false,
      startX: 0,
      startY: 0,
      top: 0,
      left: 0,
    };
  },
  mounted() {
    const pos = this.getPositionFromLocalStorage();
    const isMobile = window.innerWidth <= 767;

    if (pos) {
      this.top = pos.top;
      this.left = pos.left;

      // 모바일에서 하단 네비 위로 조정
      if (isMobile && this.top > window.innerHeight - 140) {
        this.top = window.innerHeight - 140;
      }
    } else {
      // 기본 위치
      if (isMobile) {
        // 모바일: 우측 하단 (하단 네비 위)
        this.top = window.innerHeight - 140;
        this.left = window.innerWidth - 72;
      } else {
        // PC: 우측 상단
        this.top = 100;
        this.left = window.innerWidth - 92;
      }
    }

    this.$emit("update-position", { top: this.top, left: this.left });

    window.addEventListener("mousemove", this.onDrag);
    window.addEventListener("mouseup", this.stopDrag);
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onDrag);
    window.removeEventListener("mouseup", this.stopDrag);
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    startDrag(event) {
      this.dragging = true;
      this.startX = event.clientX - this.left;
      this.startY = event.clientY - this.top;
    },
    onDrag(event) {
      if (!this.dragging) return;
      let newLeft = event.clientX - this.startX;
      let newTop = event.clientY - this.startY;
      // 화면 경계 처리
      newLeft = Math.min(Math.max(0, newLeft), window.innerWidth - 60);
      newTop = Math.min(Math.max(0, newTop), window.innerHeight - 60);
      this.left = newLeft;
      this.top = newTop;
    },
    stopDrag() {
      if (this.dragging) {
        this.dragging = false;
        this.savePositionToLocalStorage(this.top, this.left);
        this.$emit("update-position", { top: this.top, left: this.left });
      }
    },
    savePositionToLocalStorage(top, left) {
      localStorage.setItem('floatingBtnPos', JSON.stringify({ top, left }));
    },
    getPositionFromLocalStorage() {
      try {
        const pos = localStorage.getItem('floatingBtnPos');
        if (pos) {
          const { top, left } = JSON.parse(pos);
          if (!isNaN(top) && !isNaN(left)) {
            return { top, left };
          }
        }
      } catch (e) {
        console.error('Failed to parse position from localStorage:', e);
      }
      return null;
    },
    onResize() {
      this.left = Math.min(this.left, window.innerWidth - 60);
      this.top = Math.min(this.top, window.innerHeight - 60);
      this.savePositionToLocalStorage(this.top, this.left);
    },
  },
};
</script>

<style scoped>
.floating-button-wrapper {
  position: relative;
}

.floating-button {
  position: fixed;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  border: none;
  border-radius: 50%;
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgb(0 123 255 / 0.6);
  user-select: none;
  z-index: 10000;
  transition: box-shadow 0.2s ease;
}
.floating-button:active {
  cursor: grabbing;
  box-shadow: 0 6px 16px rgb(0 123 255 / 0.8);
}
.floating-button svg {
  width: 28px;
  height: 28px;
  fill: white;
}

/* 호버 툴팁 */
.hover-tooltip {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 14px;
  background-color: #333;
  color: white;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  z-index: 10001;
}

/* 말풍선 꼬리 (오른쪽을 향함) */
.hover-tooltip::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 0 8px 8px;
  border-color: transparent transparent transparent #333;
}

/* 버튼 호버 시 툴팁 표시 */
.floating-button:hover .hover-tooltip {
  opacity: 1;
  visibility: visible;
}

/* 모바일 반응형 */
@media (max-width: 767px) {
  .floating-button {
    width: 48px;
    height: 48px;
  }

  .floating-button svg {
    width: 24px;
    height: 24px;
  }

  /* 모바일에서 툴팁 숨김 */
  .hover-tooltip {
    display: none;
  }
}
</style>
