<template>
  <div>
    <p style="font-size: 16px; margin: 10px 0 0 10px; color: var(--main-black)">
      {{
        langlist[$store.state.lang][
          "Read 모드로 완독한 책을 모두 보여줍니다. 최초 완독일이 가장 최신인 책부터 정렬됩니다."
        ]
      }}
    </p>
  </div>

  <Library
    textType="complete"
    :booklist="booklist[currentPage - 1]"
    :activeTab="'finish'"
    :booklistlength="booklistlength"
    :pagelength="itemsPerPage"
    @changePage="handlepage"
  />
</template>
  
<script>
import Library from "../Library.vue";
import { getstudentfinishbooks } from "../../../api/api-list-2";
import { bookKeyList } from "../../../assets/bookinfo/bookkey";

import { library_ko } from "../../../assets/translate/ko";
import { library_vt } from "../../../assets/translate/vt";

export default {
  async created() {
    this.initinfo();
  },
  components: {
    Library,
  },
  data() {
    return {
      langlist: {
        ko: library_ko,
        vt: library_vt,
      },
      booklist: [],
      isModalOpen: false,
      selectedBook: null,
      bookKeyList: bookKeyList,
      booklistlength: 0,
      itemsPerPage: 0,
      currentPage: 1,
    };
  },
  computed: {
    selectedStudent() {
      return this.$store.state.selectedStudent;
    },
  },
  methods: {
    handlepage(info) {
      this.currentPage = info;
    },
    async initinfo() {
      const res = await getstudentfinishbooks(
        this.$store.state.selectedStudent
      );

      const booklist = res.data.data;

      const userBookInfo = booklist.map((item) => ({
        bookCode: item.bookCode,
        ...item.value,
        ...this.bookKeyList[item.bookCode],
      }));

      let temp = [...userBookInfo];

      this.booklist = temp.sort(
        (a, b) => new Date(b.completeDate[0]) - new Date(a.completeDate[0])
      );

      this.booklistlength = temp.length;

      const result = [];
      for (let i = 0; i < this.booklist.length; i += 15) {
        const chunk = this.booklist.slice(i, i + 15);
        result.push(chunk);
      }

      this.itemsPerPage = result.length;
      this.booklist = result;
    },
    showBookModal(book) {
      this.selectedBook = book;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  watch: {
    async selectedStudent(newVal) {
      this.initinfo();
    },
  },
};
</script>