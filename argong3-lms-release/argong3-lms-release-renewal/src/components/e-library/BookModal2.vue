<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-head flex">
        <div class="info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M1 4.05561C1 3.77565 1.10864 3.50715 1.30203 3.30919C1.49541 3.11122 1.7577 3.00001 2.03119 3.00001H7.8787C9.56571 3.00001 11.0644 3.83042 12.0034 5.11263C12.4835 4.45572 13.1067 3.92264 13.8235 3.55586C14.5403 3.18909 15.3309 2.99875 16.1323 3.00001H21.9688C22.2423 3.00001 22.5046 3.11122 22.698 3.30919C22.8914 3.50715 23 3.77565 23 4.05561V18.8341C23 19.1141 22.8914 19.3826 22.698 19.5805C22.5046 19.7785 22.2423 19.8897 21.9688 19.8897H15.7721C15.3658 19.8897 14.9635 19.9716 14.5882 20.1308C14.2129 20.2899 13.8719 20.5232 13.5846 20.8172L12.7294 21.6913C12.536 21.889 12.274 22 12.0007 22C11.7274 22 11.4653 21.889 11.272 21.6913L10.4168 20.8172C10.1295 20.5232 9.78849 20.2899 9.41316 20.1308C9.03783 19.9716 8.63555 19.8897 8.2293 19.8897H2.03119C1.7577 19.8897 1.49541 19.7785 1.30203 19.5805C1.10864 19.3826 1 19.1141 1 18.8341V4.05561ZM10.9695 18.5864L10.975 11.4463L10.9723 8.27523C10.9715 7.43582 10.6453 6.63105 10.0652 6.03776C9.48512 5.44448 8.69868 5.11122 7.8787 5.11122H3.06237V17.7785H8.22792C9.19782 17.7785 10.1481 18.0585 10.9695 18.5864ZM13.0374 8.27804L13.0319 18.5836C13.8529 18.0573 14.802 17.7783 15.7707 17.7785H20.9363V5.11122H16.1309C15.3105 5.11122 14.5236 5.44487 13.9435 6.03876C13.3633 6.63265 13.0374 7.43815 13.0374 8.27804Z"
              fill="#3D90EF"
            />
          </svg>
          <h4>도서정보</h4>
        </div>
        <span class="close" @click="closeModal"></span>
      </div>

      <div class="cont">
        <div class="flex">
          <div>
            <div class="cont-book" :style="backgroundVars(book)"></div>
            <button @click="reader()" class="btn">e-book 보기</button>
          </div>

          <div class="detail">
            <p class="text">e-future Classic Readers</p>
            <h2 class="title">{{ book.book_name }}</h2>
            <table class="book-modal-table">
              <tr>
                <td class="tabletd" style="border-top-left-radius: 16px">
                  작가
                </td>
                <td class="tabletd2">{{ book.author }}</td>
                <td class="tabletd">레벨분류</td>
                <td
                  class="tabletd2"
                  style="
                    border-right: 1px solid #cae3ff;
                    border-top-right-radius: 16px;
                  "
                >
                  {{ booklevel(book.level_seq) }}
                </td>
              </tr>
              <tr>
                <td class="tabletd">추천대상</td>
                <td class="tabletd2">3학년 이상</td>
                <td class="tabletd">CEFR</td>
                <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                  {{ book.cefr }}
                </td>
              </tr>
              <tr>
                <td class="tabletd">총 단어수</td>
                <td class="tabletd2">{{ book.word_count }}개</td>
                <td class="tabletd">페이지수</td>
                <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                  {{ book.total_page }}p
                </td>
              </tr>
              <tr>
                <td
                  class="tabletd"
                  style="
                    border-bottom-left-radius: 16px;
                    border-bottom: 1px solid #cae3ff;
                  "
                >
                  학습활동
                </td>
                <td
                  class="tabletd2"
                  colspan="3"
                  style="
                    border-right: 1px solid #cae3ff;
                    border-bottom: 1px solid #cae3ff;
                    border-bottom-right-radius: 16px;
                  "
                >
                  <LearningActivity :bookinfo="book" />
                </td>
              </tr>
            </table>
            <p
              style="
                color: #258bff;
                font-family: notosansregular;
                font-size: 13px;
                margin-top: 10px;
                margin-left: 130px;
              "
            >
              *현재 Read 학습만 제공되며, 다른 활동은 순차적으로 오픈될
              예정입니다.
            </p>
          </div>
        </div>

        <div class="summary">
          <h4>줄거리 요약</h4>
          <div class="lightblue_bg">
            <p>
              {{ story[book["no."]] || "-" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LearningActivity from "./LearningActivity.vue";
import * as bookinfo from "../../assets/bookinfo/bookinfo.json";
import * as story from "../../assets/bookinfo/story.json";
import { schoolinfo } from "../../api/api-list-2";

export default {
  created() {
    this.payCheck();
  },
  data() {
    return {
      story: story,
      plan: false,
      plantext: true,
    };
  },
  components: {
    LearningActivity,
  },
  props: {
    book: {
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$store.state.bookDetailModal = false;
    },
    booklevel(seq) {
      if (seq == -1) {
        return "Level K";
      } else if (seq == 0) {
        return "Starter";
      } else {
        return `Level ${seq}`;
      }
    },
    backgroundVars(info) {
      const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${info.book_code}.jpg`;
      return {
        "--bg-image": `url(${imageUrl})`,
      };
    },
    async payCheck() {
      const res = await schoolinfo();
      const plan = res.data.data.payPlan;
      if (plan === "p" || plan === "pm") {
        this.plan = true;
      } else {
        this.plan = false;
        this.plantext = false;
      }
    },
    reader() {
      const url = `${window.location.origin}/e-book-reader`;
      var child = window.open(url);

      const bookCode = this.book.book_code;

      child.onload = function () {
        child.postMessage({ type: "bookcode", data: bookCode }, url);
      };
    },
  },
  watch: {
    book(newbook) {},
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position: fixed;
  width: 990px;
  background-color: #fefefe;
  border-radius: 13px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}
.modal-head {
  padding: 30px 0 15px;
  border-bottom: 1px solid #cae3ff;
  margin: 0 50px;
  font-size: 24px;
}
.modal-head .info {
  display: flex;
  justify-content: start;
  align-items: center;
}
.modal-head .info h4 {
  margin-left: 6px;
}
.close {
  float: right;
  width: 40px;
  height: 40px;
  background: url(../../assets/image/Btn_Close.png);
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.cont {
  width: 100%;
  padding: 40px 50px;
}
.detail .text {
  color: #9a9a9a;
  font-size: 16px;
}
.summary {
  margin-top: 20px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.cont-book {
  width: 210px;
  height: 300px;
  border-radius: 10px;
  background-image: var(--bg-image);
  background-size: cover;
  background-repeat: no-repeat;
}
button.btn {
  display: block;
  margin: 20px auto 10px;
  padding: 8px 24px;
  color: #fff;
  /* background-color: #d0e6ff; */
  background-color: #258bff;
  border-radius: 5px;
  font-size: 14px;
}
button.btn2 {
  display: block;
  margin: 20px auto 10px;
  padding: 8px 24px;
  color: #fff;
  background-color: #d0e6ff;
  /* background-color: #258bff; */
  border-radius: 5px;
  font-size: 14px;
}
button.btn:hover {
  filter: brightness(0.7);
}
.cont p.red-sm {
  color: #f34c4c;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.6px;
}
.book-modal-table {
  width: 650px;
  text-align: center;
  border-spacing: 0;
  margin-top: 25px;
}
.tabletd {
  width: 115px;
  padding: 7px 20px;
}
.tabletd2 {
  width: 210px;
  padding: 7px 20px;
}
.lightblue_bg {
  background-color: #f1f8ff;
  border-radius: 14px;
  padding: 25px;
  width: 100%;
  height: 150px;
  margin-top: 15px;
}
</style>
