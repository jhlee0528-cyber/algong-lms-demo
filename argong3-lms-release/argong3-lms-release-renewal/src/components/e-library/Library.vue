<template>
  <v-card class="library-container">
    <div class="bookList">
      <!-- pagination -->
      <!-- :length="Math.ceil(filteredBooks.length / itemsPerPage)" -->
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

      <!-- total -->
      <p v-show="$store.state.lang === 'ko'" class="total">
        {{ tabtext(activeTab) }} : 총 {{ booklistlength }}권
      </p>
      <p v-show="$store.state.lang !== 'ko'" class="total">
        {{ tabtext_nokor(activeTab) }} : Total {{ booklistlength }} Books
      </p>
      <!-- 기본: <p class="total">{{ activeTab }}: 총 {{ filteredBooks.length }}권</p> -->
      <!-- 검색: <p class="total">{{ activeTab }} 검색 결과: 총 {{ filteredBooks.length }}권</p> -->

      <div class="bookCase">
        <!-- v-for="(book, index) in paginatedBooks" -->
        <div
          v-for="(book, index) in booklist"
          :key="index"
          class="bookWrap"
          @click="showBookModal(book)"
        >
          <div class="library-book" :style="backgroundVars(book)"></div>
          <div class="library-book-text">
            <!-- 기본 -->
            <template v-if="textType === 'all'">
              <!-- <div class="flex" style="margin-top: 10px">
                <p>{{ book.book_name }}</p>
              </div> -->
            </template>

            <!-- 읽고있는 책 -->
            <template v-else-if="textType === 'reading'">
              <div style="margin-top: 5px">
                <div class="flex">
                  <span v-show="$store.state.lang === 'ko'">최근 열람</span>
                  <span v-show="$store.state.lang !== 'ko'">Recent</span>
                  <p>{{ prettydate(book.recentDate) }}</p>
                </div>
                <div class="chart_blue-bg">
                  <div
                    class="chart_bar"
                    :style="{
                      width: `${book.progress}%`,
                    }"
                  ></div>
                </div>
                <span
                  >{{ book.progress }}% ({{ book.page }} /
                  {{ book.total_page }} p)</span
                >
              </div>
            </template>

            <!-- 완독 -->
            <template v-else-if="textType === 'complete'">
              <div style="margin-top: 5px">
                <div class="flex">
                  <span>최초 완독</span>
                  <p>{{ prettydate(book.completeDate[0]) }}</p>
                </div>
                <div class="flex num">
                  <span>완독 횟수</span>
                  <div
                    class="book-bg"
                    :class="{
                      'book-bg-1': book.completeDate.length === 1,
                      'book-bg-2': book.completeDate.length === 2,
                      'book-bg-3': book.completeDate.length > 2,
                    }"
                  >
                    <p style="margin-top: 1px">
                      {{ book.completeDate.length }}독
                    </p>
                  </div>
                </div>
              </div>
            </template>
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
import BookModal from "./BookModal.vue";
import { books } from "./bookData";

export default {
  props: {
    textType: String,
    booklist: {
      required: true,
    },
    pagelength: Number,
    booklistlength: Number,
    activeTab: {
      required: true,
    },
  },
  created() {},
  components: {
    BookModal,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 40,
      books: books,
      isModalOpen: false,
      selectedBook: null,
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
    levelTab(tabName) {
      this.activeTab = tabName;
      this.currentPage = 1;
    },
    backgroundVars(info) {
      const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${info.book_code}.jpg`;
      return {
        "--bg-image": `url(${imageUrl})`,
      };
    },
    tabtext(tab) {
      if (tab === "all") {
        return "전체";
      }

      if (tab === 0) {
        return "Level Starter";
      }

      if (tab === -1) {
        return "Level K";
      }

      if (tab === 1) {
        return "Level 1";
      }
      if (tab === 2) {
        return "Level 2";
      }
      if (tab === 3) {
        return "Level 3";
      }
      if (tab === 4) {
        return "Level 4";
      }
      if (tab === 5) {
        return "Level 5";
      }
      if (tab === "reading") {
        return "읽고 있는 책";
      }
      if (tab === "finish") {
        return "Read 모드 완독한 책";
      }
    },
    tabtext_nokor(tab) {
      if (tab === "all") {
        return "All";
      }

      if (tab === 0) {
        return "Level Starter";
      }

      if (tab === -1) {
        return "Level K";
      }

      if (tab === 1) {
        return "Level 1";
      }
      if (tab === 2) {
        return "Level 2";
      }
      if (tab === 3) {
        return "Level 3";
      }
      if (tab === 4) {
        return "Level 4";
      }
      if (tab === 5) {
        return "Level 5";
      }
      if (tab === "reading") {
        return "Reading books";
      }
      if (tab === "finish") {
        return "Finished books";
      }
    },
    prettydate(str) {
      const arr = str.split(".");
      let year = arr[0];
      let prettyyear = `${arr[0][2]}${arr[0][3]}`;
      return `${prettyyear}/${arr[1]}/${arr[2]}`;
    },
  },
  watch: {
    currentPage(newpage) {
      this.$emit("changePage", newpage);
    },
    activeTab() {
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.library-container {
  max-width: 900px;
  width: 100%;
  height: 800px;
  margin-top: 20px;
  border: none !important;
  box-shadow: none;
  background: #fff;
  border-radius: 20px;
}
.bookList {
  position: relative;
  background-image: url(../../assets/image/bookcase.png);
  background-size: contain;
  background-position: center 28px;
  width: 100%;
  height: 100%;
  padding: 32px;
}
.bookCase {
  width: 660px;
  height: 608px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  /* grid-row-gap: 56px; */
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
.library-book:hover {
  filter: brightness(0.7);
  border: 3px solid white;
}
.library-book-text {
  position: absolute;
  top: 132px;
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
.chart_blue-bg {
  margin: 4px 0 2px 8px;
  width: 85px;
  height: 6px;
}
.book-bg {
  margin: 0 auto;
  justify-content: center;
  width: 28px;
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
.total {
  text-align: right;
}
</style>
