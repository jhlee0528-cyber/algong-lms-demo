<template>
  <div>
    <div v-if="!agree" class="privacy-page">
      <div class="privacy-inner">
        <h2 class="form-title">알공 이용 약관 동의</h2>

        <div class="all-agree-section" :class="{ 'is-active': allAgreed }">
          <input
            type="checkbox"
            id="all-check"
            v-model="allAgreed"
            class="large-check"
          />
          <label for="all-check" class="all-label">전체 동의하기</label>
        </div>

        <div class="agreement-list">
          <div class="agree-item">
            <div class="row">
              <input type="checkbox" id="terms" v-model="agreements.terms" />
              <label for="terms" class="item-label">[필수] 이용약관 동의</label>
            </div>
            <div class="content-viewer">
              이용약관 상세 내용 이용약관 상세 내용 이용약관 상세 내용 이용약관
              상세 내용 이용약관 상세 내용 이용약관 상세 내용 이용약관 상세 내용
              이용약관 상세 내용
            </div>
          </div>

          <div class="agree-item">
            <div class="row">
              <input
                type="checkbox"
                id="privacy"
                v-model="agreements.privacy"
              />
              <label for="privacy" class="item-label"
                >[필수] 개인정보 수집 동의</label
              >
            </div>
            <div class="content-viewer">
              어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
            </div>
          </div>
        </div>

        <div class="action-area">
          <button
            @click="agreeCheck"
            :disabled="!isRequiredAgreed"
            class="main-submit-btn"
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
    <div v-if="agree">
      <agreeComplete></agreeComplete>
    </div>
  </div>
</template>

<script>
import agreeComplete from "./agreeComplete.vue";

export default {
  created() {
    const info = this.$route.params.info;
    // 유저 값이 아니면 잘못된 링크

    // 동의한 유저의 경우 완료 UI로 돌리기
  },
  components: {
    agreeComplete,
  },
  data() {
    return {
      agreements: {
        terms: false,
        privacy: false,
      },
      agree: false,
    };
  },
  computed: {
    allAgreed: {
      get() {
        return this.agreements.terms && this.agreements.privacy;
      },
      set(val) {
        this.agreements.terms = val;
        this.agreements.privacy = val;
      },
    },
    isRequiredAgreed() {
      return this.agreements.terms && this.agreements.privacy;
    },
  },
  methods: {
    agreeCheck() {
      if (window.confirm("알공 이용 약관에 모두 동의하시겠습니까?")) {
        this.agree = true;
        return;
      }
    },
  },
};
</script>

<style scoped>
/* 모바일에서 작게 보이는 현상을 막는 핵심 스타일 */
.privacy-page {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  color: #222;
  /* 폰트 크기 기본값 상향 */
  font-size: 16px;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%; /* iOS 가로모드 시 글자 커짐 방지 */
}

.privacy-inner {
  width: 100%;
  max-width: 600px; /* PC에서는 폭 제한 */
  margin: 0 auto;
  padding: 24px 20px;
  box-sizing: border-box;
}

.form-title {
  font-size: 1.6rem; /* 크게 설정 */
  font-weight: 800;
  margin-bottom: 30px;
  letter-spacing: -0.5px;
}

/* 전체 동의 박스 강조 */
.all-agree-section {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f4f6f8;
  border-radius: 12px;
  margin-bottom: 25px;
  border: 2px solid transparent;
  transition: all 0.2s;
}
.all-agree-section.is-active {
  border-color: #3182f6;
  background-color: #ebf4ff;
}

.all-label {
  font-size: 1.15rem;
  font-weight: 700;
  margin-left: 12px;
  cursor: pointer;
}

/* 체크박스 크기 강제 확대 */
input[type="checkbox"] {
  width: 24px;
  height: 24px;
  flex-shrink: 0; /* 크기 줄어듦 방지 */
  cursor: pointer;
}

.agree-item {
  margin-bottom: 25px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item-label {
  font-size: 1rem;
  margin-left: 10px;
  color: #444;
}

/* 약관 내용 박스 가독성 증대 */
.content-viewer {
  width: 100%;
  height: 140px;
  overflow-y: auto;
  background: #fafafa;
  border: 1px solid #eee;
  padding: 15px;
  font-size: 0.95rem; /* 15px 내외 */
  line-height: 1.8;
  color: #666;
  border-radius: 8px;
  box-sizing: border-box;
}

/* 버튼 모바일 최적화 */
.main-submit-btn {
  width: 100%;
  height: 60px; /* 높이를 충분히 확보 */
  background-color: #3182f6;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
}

.main-submit-btn:disabled {
  background-color: #e5e8eb;
  color: #94a3b8;
  cursor: not-allowed;
}

/* 화면이 아주 작은 기기 대응 */
@media (max-width: 360px) {
  .form-title {
    font-size: 1.4rem;
  }
  .all-label {
    font-size: 1rem;
  }
  .main-submit-btn {
    height: 54px;
    font-size: 1.1rem;
  }
}
</style>