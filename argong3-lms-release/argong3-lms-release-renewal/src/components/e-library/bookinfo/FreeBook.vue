<template>
  <div>
    <p style="font-size: 16px; margin: 10px 0 0 10px; color: var(--main-black)">
      {{
        langlist[$store.state.lang][
          "학생들의 수준에 맞게 읽을 수 있는 스탠다드 플랜 대상 무료체험 도서입니다."
        ]
      }}
    </p>
  </div>
  <!-- 전체 도서 -->
  <v-card class="library-container" style="height: 700px">
    <div class="bookList">
      <div class="bookCase">
        <div
          v-for="(book, index) in books"
          :key="index"
          class="bookWrap"
          @click="showBookModal(book)"
        >
          <div class="library-book" :style="backgroundVars(book)"></div>
          <div class="library-book-text">
            <div class="flex">
              <p>{{ book.level }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog
      width="1000"
      v-model="$store.state.bookDetailModal"
      @close="closeModal()"
    >
      <BookModal :book="selectedBook" />
    </v-dialog>
  </v-card>
</template>

<script>
import BookModal from "../BookModal.vue";
import { books } from "../bookData";

import { library_vt } from "../../../assets/translate/vt";
import { library_ko } from "../../../assets/translate/ko";

export default {
  components: {
    BookModal,
  },
  created() {},
  data() {
    return {
      langlist: {
        ko: library_ko,
        vt: library_vt,
      },
      books: books,
      isModalOpen: false,
      selectedBook: null,
    };
  },
  methods: {
    showBookModal(book) {
      this.selectedBook = book;
      this.$store.state.bookDetailModal = true;
    },
    closeModal() {
      this.$store.state.bookDetailModal = false;
    },
    backgroundVars(info) {
      const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${info.book_code}.jpg`;
      return {
        "--bg-image": `url(${imageUrl})`,
      };
    },
  },
};
</script>

<style scoped>
.library-container {
  max-width: 900px;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  border: none !important;
  box-shadow: none;
  background: #fff;
  border-radius: 20px;
}
.bookList {
  position: relative;
  background-image: url(../../../assets/image/bookcase.png);
  background-size: contain;
  background-position: center -15px;
  width: 100%;
  height: 100%;
  padding: 32px;
}
.bookCase {
  width: 660px;
  height: 544px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 56px;
}
.bookWrap {
  position: relative;
  justify-content: center;
  display: flex;
}
.library-book {
  position: relative;
  width: 85px;
  height: 120px;
  border-radius: 4px;
  background-image: var(--bg-image);
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
}
.library-book-text {
  position: absolute;
  bottom: -50px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  text-align: center;
}
.library-book-text span {
  color: #66686b;
  margin-right: 4px;
}
.flex {
  display: flex;
}
.flex:nth-child(2) {
  margin-top: 6px;
}
.library-book:hover {
  filter: brightness(0.7);
  border: 3px solid white;
}
</style>
