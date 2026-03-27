<template>
  <div>
    <p style="font-size: 16px; margin: 10px 0 0 10px; color: var(--main-black)">
      {{
        langlist[$store.state.lang][
          "교과 단원과 연계된 도서를 단원별로 보여줍니다."
        ]
      }}
    </p>

    <Dropdown
      :preSelect="targetGrade"
      :units="grade"
      @selected="onGradeSelected"
    />
    <Dropdown2
      :preSelect="targetPublisher"
      :units="Object.values(publisher)"
      @selected="onPublisherSelected"
    />

    <button class="inputbtn" @click="search">
      {{ langlist[$store.state.lang]["검색"] }}
    </button>
  </div>

  <v-card class="library-container">
    <div v-show="$store.state.lang === 'ko'" class="text-box">
      <p>{{ targetGrade }} {{ targetPublisher }} 추천 도서</p>
    </div>
    <div v-for="(unit, unitIndex) in bookUnits" :key="unitIndex" class="unit">
      <div>
        <h4>{{ unit.title }}</h4>
        <p>{{ unit.description }}</p>
      </div>
      <div class="books">
        <div
          v-for="(j, i) in unit.books"
          :key="i"
          @click="bookClick(j)"
          class="book"
          :style="backgroundVars(j)"
        ></div>
      </div>
    </div>
  </v-card>

  <v-dialog
    width="1000"
    v-model="$store.state.bookDetailModal"
    @close="closeModal()"
  >
    <BookModal :book="selectedBook" />
  </v-dialog>
</template>

<script>
import Dropdown from "../Dropdown.vue";
import Dropdown2 from "../Dropdown2.vue";
import { userInfo } from "../../../api/api-list";
import { getLessonBook } from "../../../api/api-list-2";
import { bookKeyList } from "../../../assets/bookinfo/bookkey";
import BookModal from "../BookModal.vue";

import { library_vt } from "../../../assets/translate/vt";
import { library_ko } from "../../../assets/translate/ko";

import { lessoninfo } from "../title.json";

export default {
  async created() {
    const res = await userInfo();
    const { grade, publisher } = res.data.data;

    this.selectedGrade = `${grade}학년`;
    this.selectedPublisher = this.publisher[publisher];

    window.dispatchEvent(
      new CustomEvent("preSelectGrade", {
        detail: this.selectedGrade,
      })
    );

    window.dispatchEvent(
      new CustomEvent("preSelectPublisher", {
        detail: this.selectedPublisher,
      })
    );

    this.search();
  },
  components: {
    Dropdown,
    Dropdown2,
    BookModal,
  },
  data() {
    return {
      langlist: {
        ko: library_ko,
        vt: library_vt,
      },
      grade: ["3학년", "4학년", "5학년", "6학년"],
      publisher: {
        CJ: "천재 출판사 (함순애)",
        CJL: "천재 출판사 (이동환)",
        CJK: "천재 출판사 (김태은)",
        DA: "동아 출판사",
        YBMK: "YBM 출판사 (김혜리)",
        YBMC: "YBM 출판사(최희경)",
        IC: "아이스크림 출판사",
        MN: "미래엔 출판사",
        // DK: "대교 출판사",
        VS: "비상 출판사",
      },
      selectedGrade: "",
      selectedPublisher: "",
      targetGrade: "",
      targetPublisher: "",
      bookUnits: [],
      selectedBook: "",
    };
  },
  methods: {
    backgroundVars(info) {
      try {
        const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${info.book_code}.jpg`;
        return {
          "--bg-image": `url(${imageUrl})`,
        };
      } catch {
        return "";
      }
    },
    onGradeSelected(selected) {
      this.selectedGrade = selected;
    },
    onPublisherSelected(selected) {
      this.selectedPublisher = selected;
    },
    async search() {
      window.dispatchEvent(new CustomEvent("close", {}));

      this.targetGrade = this.selectedGrade;
      this.targetPublisher = this.selectedPublisher;

      const grade = this.getGrade(this.selectedGrade);
      const publisher = this.getPublisher(this.selectedPublisher);
      const lessonLength = this.getLessonLength(grade, publisher);

      let arr = [];

      for (let i = 0; i < lessonLength; i++) {
        const data = { grade, publisher, lesson: i + 1 };
        const res = await getLessonBook(data);

        const result = res.data.data;

        const num = result.num;
        const title = result.title;
        const bookData = result.data;

        let bookarr = [];
        for (let j = 0; j < bookData.length; j++) {
          if (bookData[j]) {
            bookarr.push(bookKeyList[bookData[j]]);
          }
        }

        if (this.$store.state.lang === "ko") {
          arr.push({
            title: `${num + 1}단원`,
            description: title,
            books: bookarr,
          });
        } else {
          arr.push({
            title: `Lesson ${num + 1}`,
            description: title,
            books: bookarr,
          });
        }
      }

      this.bookUnits = arr;
    },
    getGrade(grade) {
      const temp = {
        "3학년": 3,
        "4학년": 4,
        "5학년": 5,
        "6학년": 6,
      };

      return temp[grade];
    },
    getPublisher(publisher) {
      const temp = {
        "천재 출판사 (함순애)": "CJ",
        "천재 출판사 (이동환)": "CJL",
        "천재 출판사 (김태은)": "CJK",
        "동아 출판사": "DA",
        "YBM 출판사 (김혜리)": "YBMK",
        "YBM 출판사 (최희경)": "YBMC",
        "아이스크림 출판사": "IC",
        "미래엔 출판사": "MN",
        //"대교 출판사": "DK",
        "비상 출판사": "VS",
      };

      return temp[publisher];
    },
    getLessonLength(grade, publisher) {
      return lessoninfo[publisher][`grade${grade}`].length;
    },
    bookClick(book) {
      this.$store.state.bookDetailModal = true;
      this.selectedBook = book;
    },
    closeModal() {
      this.$store.state.bookDetailModal = false;
    },
  },
};
</script>

<style scoped>
.library-container {
  max-width: 900px;
  width: 100%;
  margin-top: 20px;
  border: none !important;
  box-shadow: none;
  padding: 32px;
  background: #fff;
  border-radius: 20px;
}
.inputbtn {
  display: inline-flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 40px;
  border-radius: 5px;
  background: var(--main-blue);
  color: #fff;
}
.unit {
  background: #f1f8ff;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.unit h4 {
  font-size: 18px;
}
.unit p {
  font-size: 16px;
}
.books {
  width: 50%;
  height: 150px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  gap: 42px;
  align-items: center;
  padding: 42px;
}
.books > div {
  width: 72px;
  height: 108px;
  background-image: var(--bg-image);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
  cursor: pointer;
}
.books > div:hover {
  filter: brightness(0.7);
  border: 3px solid white;
}
.text-box {
  display: flex;
  justify-content: end;
  padding-bottom: 20px;
  font-size: 20px;
}
</style>
