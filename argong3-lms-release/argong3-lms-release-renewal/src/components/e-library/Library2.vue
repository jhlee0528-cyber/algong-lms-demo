<template>
  <v-card class="library-container">
    <div class="bookList">
      <v-pagination
        class="pagination-default"
        color="blue"
        v-model="currentPage"
        :length="pagelength"
        :size="30"
        total-visible="8"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      ></v-pagination>

      <p class="total">
        <span>{{ langlist[$store.state.lang]["최신 열람순"] }}</span>
        {{ langlist[$store.state.lang]["열람한 책"] }} :
        {{ langlist[$store.state.lang]["총"] }} {{ booklistlength
        }}{{ langlist[$store.state.lang]["권"] }}
      </p>

      <div class="bookCase">
        <div
          v-for="(book, index) in booklist"
          :key="index"
          class="bookWrap"
          @click="showBookModal(book)"
        >
          <div
            class="library-book"
            :style="backgroundVars(book.bookCode)"
          ></div>
          <div class="library-book-text">
            <div style="margin-top: 5px">
              <div>
                <span v-show="$store.state.lang === 'ko'">최근 열람</span>
                <span v-show="$store.state.lang !== 'ko'">Recent</span>
                <span>{{ prettyRecentDate(book.recentDate) }}</span>
              </div>
              <div class="chart_blue-bg">
                <div
                  class="chart_bar"
                  :style="{ width: `${book.progress}%` }"
                ></div>
              </div>
              <span
                >{{ book.progress }}% ({{ book.currentPage }}/{{
                  bookData[book.bookCode]["total_page"]
                }}
                p)</span
              >
            </div>
            <div v-show="book.completeDate.length > 0" class="num">
              <div
                class="book-bg"
                :class="{
                  'book-bg-1': book.completeDate.length === 1,
                  'book-bg-2': book.completeDate.length === 2,
                  'book-bg-3': book.completeDate.length > 2,
                }"
                style="text-align: center"
              >
                <p style="margin-top: 1px; margin-left: -4px">
                  {{ book.completeDate.length
                  }}{{ langlist[$store.state.lang]["독"] }}
                </p>
              </div>
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
      <BookModal :book="selectedBook" :detail="true" :userId="id" />
    </v-dialog>
  </v-card>
</template>

<script>
import BookModal from "./BookModal.vue";
import { books } from "./bookData";
import { getReadHistory, getReadHistoryPageLength } from "../../api/api-list-2";
import { bookKeyList } from "../../assets/bookinfo/bookkey";

import { library_ko } from "../../assets/translate/ko";
import { library_vt } from "../../assets/translate/vt";

export default {
  props: {
    textType: String,
    id: String,
  },
  created() {
    this.fetchBookList(this.id, 1);
  },
  components: {
    BookModal,
  },
  data() {
    return {
      langlist: {
        ko: library_ko,
        vt: library_vt,
      },
      booklist: [],
      booklistlength: 0,
      pagelength: 0,
      currentPage: 1,
      itemsPerPage: 5,
      books: books,
      isModalOpen: false,
      selectedBook: null,
      bookData: bookKeyList,
    };
  },
  computed: {},
  methods: {
    showBookModal(book) {
      this.selectedBook = book;
      this.$store.state.bookDetailModal = true;
    },
    closeModal() {
      this.$store.state.bookDetailModal = false;
    },
    prettyRecentDate(date) {
      if (!date) {
        return "-";
      }
      let str = date.split(" ")[0];
      let str2 = str.split(".");
      let year = str.split(".")[0].slice(2, 4);

      return `${year}/${str2[1]}/${str2[2]}`;
    },
    backgroundVars(book) {
      const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${book}.jpg`;
      return {
        "--bg-image": `url(${imageUrl})`,
      };
    },
    bookPaging(data) {
      this.booklistlength = data.length;

      const result = [];
      for (let i = 0; i < data.length; i += 15) {
        const chunk = data.slice(i, i + 15);
        result.push(chunk);
      }

      this.itemsPerPage = result.length;
      this.booklist = result;
    },
    handlepage(info) {
      this.currentPage = info;
    },
    prettydate(str) {
      const arr = str.split(".");
      let year = arr[0];
      let prettyyear = `${arr[0][2]}${arr[0][3]}`;
      return `${prettyyear}/${arr[1]}/${arr[2]}`;
    },
    async fetchBookList(id, page) {
      const { totalItems, totalPages } = (await getReadHistoryPageLength(id))
        .data.data;

      if (totalPages > 0) {
        this.booklistlength = totalItems;
        this.pagelength = totalPages;

        const history = (await getReadHistory(id, page)).data.data;

        const keys = Object.getOwnPropertyNames(history);

        let arr = [];
        for (let i = 0; i < keys.length; i++) {
          const value = history[keys[i]];
          const bookData = this.bookData[keys[i]];

          arr.push({ bookCode: keys[i], ...value, ...bookData });
        }

        this.booklist = arr;
        return;
      } else {
        this.booklistlength = 0;
        this.pagelength = 0;
        this.booklist = [];
        return;
      }
    },
  },
  watch: {
    currentPage(newpage) {
      //this.$emit("changePage", newpage);
      this.fetchBookList(this.id, newpage);
    },
    id(newId) {
      this.currentPage = 1;
      this.fetchBookList(newId, 1);
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
  background: #fff;
  border-radius: 20px;
}
.bookList {
  padding: 32px;
}
.bookCase {
  height: 720px;
  background-image: url(../../assets/image/bookcase2.png);
  background-position: center top;
  display: grid;
  justify-content: center;
  align-items: top;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 5px 80px;
  margin-top: 20px;
}
.bookWrap {
  position: relative;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}
.library-book {
  position: relative;
  background-image: var(--bg-image);
  width: 85px;
  height: 120px;
  border-radius: 4px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
}
.bookWrap .num {
  position: absolute;
  top: -12px;
  right: 15px;
}
.library-book:hover {
  filter: brightness(0.7);
  border: 3px solid white;
}
.library-book-text {
  margin-top: 18px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  text-align: center;
}
.library-book-text span {
  color: #66686b;
  margin-right: 4px;
}
.chart_blue-bg {
  margin: 4px 0 2px 8px;
  width: 85px;
  height: 6px;
}
.book-bg {
  margin: 0 auto;
  justify-content: center;
  text-align: center;
  width: 32px;
  height: 24px;
  color: #fff;
}
.book-bg-1 {
  background-image: url("../../assets/image/book-bg-1.png");
}
.book-bg-2 {
  background-image: url("../../assets/image/book-bg-2.png");
}
.book-bg-3 {
  background-image: url("../../assets/image/book-bg-3.png");
}
.background-box {
  background-image: var(--bg-image);
}
.total {
  text-align: right;
  padding: 0 80px;
  font-size: 14px;
}
.total span {
  color: #9a9a9a;
  font-size: 14px;
  margin-right: 8px;
}
</style>
