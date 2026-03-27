<template>
  <div>
    <p style="font-size: 16px; margin: 10px 0 0 10px; color: var(--main-black)">
      {{ langlist[$store.state.lang]["읽고 있는 책을 최신순으로 보여줍니다."] }}
    </p>
  </div>

  <Library
    textType="reading"
    :booklist="booklist[currentPage - 1]"
    :activeTab="'reading'"
    :booklistlength="booklistlength"
    :pagelength="itemsPerPage"
    @changePage="handlepage"
  />
</template>
  
<script>
import Library from "../Library.vue";
import { getstudentreadingbooks } from "../../../api/api-list-2";
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
    async initinfo() {
      const res = await getstudentreadingbooks(
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
        (a, b) => new Date(b.recentDate) - new Date(a.recentDate)
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
    handlepage(info) {
      this.currentPage = info;
    },
    showBookModal(book) {
      this.selectedBook = book;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    paginatedBooks() {
      const arr = this.booklist;

      const page = this.currentPage;

      const target = Math.floor(this.booklistlength / 15);
      const remain = this.booklistlength % 15;

      if (remain) {
        this.itemsPerPage = target + 1;
      } else {
        this.itemsPerPage = target;
      }

      if (this.itemsPerPage === page) {
        const startIndex = (page - 1) * 15;
        this.booklist = arr.slice(startIndex, arr.length - 1);
      } else {
        const startIndex = (page - 1) * 15;
        this.booklist = arr.slice(startIndex, startIndex + 15);
        this.booklist.length;
      }
    },
  },
  watch: {
    async selectedStudent(newVal) {
      this.initinfo();
    },
  },
};
</script>
  
  