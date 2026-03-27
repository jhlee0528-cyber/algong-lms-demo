<template>
  <div>
    <p style="font-size: 16px; margin: 10px 0 0 10px; color: var(--main-black)">
      {{
        langlist[$store.state.lang][
          "전체 도서를 레벨별로 볼 수 있으며, 도서명을 검색할 수 있습니다."
        ]
      }}
    </p>
  </div>

  <!-- tab -->
  <div class="btn_wrap">
    <button :class="{ active: activeTab === 'all' }" @click="levelTab('all')">
      All
    </button>
    <button :class="{ active: activeTab === -1 }" @click="levelTab(-1)">
      Level K
    </button>
    <button :class="{ active: activeTab === 0 }" @click="levelTab(0)">
      Starter
    </button>
    <button :class="{ active: activeTab === 1 }" @click="levelTab(1)">
      Level 1
    </button>
    <button :class="{ active: activeTab === 2 }" @click="levelTab(2)">
      Level 2
    </button>
    <button :class="{ active: activeTab === 3 }" @click="levelTab(3)">
      Level 3
    </button>
    <button :class="{ active: activeTab === 4 }" @click="levelTab(4)">
      Level 4
    </button>
    <button :class="{ active: activeTab === 5 }" @click="levelTab(5)">
      Level 5
    </button>
  </div>

  <!-- search -->
  <div>
    <input
      @keyup.enter="search()"
      type="text"
      class="inputstyle"
      :placeholder="langlist[$store.state.lang]['책 이름을 입력해주세요.']"
      v-model="searchQuery"
    />

    <button class="inputbtn" @click="search()">
      {{ langlist[$store.state.lang]["검색"] }}
    </button>
    <span v-if="isSearchEmpty" class="empty">{{
      langlist[$store.state.lang]["검색어를 입력해주세요."]
    }}</span>
  </div>

  <Library
    textType="all"
    :booklist="booklist[currentPage - 1]"
    :pagelength="itemsPerPage"
    :booklistlength="booklistlength"
    :activeTab="activeTab"
    @changePage="handlepage"
  />
</template>

<script>
import Library from "../Library.vue";
import {
  level1,
  level2,
  level3,
  level4,
  level5,
  levelk,
  levelstarter,
  allbookinfo,
} from "../../../assets/bookinfo/bookinfo.js";

import { library_vt } from "../../../assets/translate/vt";
import { library_ko } from "../../../assets/translate/ko";

export default {
  components: {
    Library,
  },
  created() {
    window.addEventListener("searchInit", this.handleSearchInit);

    const data = this.bookFilter("all");

    this.bookPaging(data);
  },

  data() {
    return {
      langlist: {
        ko: library_ko,
        vt: library_vt,
      },
      currentPage: 1,
      itemsPerPage: 0,
      isModalOpen: false,
      selectedBook: null,
      activeTab: "all",
      searchQuery: null,
      isSearchEmpty: false,
      booklistlength: 0,
      searchlist: [],
      booklist: [],
      searchtemp: [],
    };
  },

  computed: {
    // 탭에 따라 필터링된 도서 목록
    // 현재 페이지에 보여질 도서 목록
  },

  methods: {
    handleSearchInit() {
      this.searchQuery = "";
      this.isSearchEmpty = false;

      this.activeTab = "all";
      const data = this.bookFilter("all");

      this.bookPaging(data);
    },
    bookFilter(tab) {
      if (tab === "all") {
        return allbookinfo;
      } else if (tab === -1) {
        return levelk;
      } else {
        let arr = [levelstarter, level1, level2, level3, level4, level5];
        return arr[tab];
      }
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
    levelTab(info) {
      this.activeTab = info;
    },
    search() {
      if (!this.searchQuery) {
        this.isSearchEmpty = true;
        return;
      } else {
        this.isSearchEmpty = false;

        const tab = this.activeTab;
        const data = this.bookFilter(tab);
        if (tab === "all") {
          const data2 = data.filter((item) =>
            item.book_name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          );

          this.bookPaging(data2);
        } else {
          const data2 = data.filter(
            (item) =>
              item.level_seq === tab &&
              item.book_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
          );

          this.bookPaging(data2);
        }
      }
    },
  },
  watch: {
    activeTab(newTab) {
      const tab = newTab;

      if (tab === "all") {
        if (this.searchQuery) {
          this.search();
        } else {
          const data = this.bookFilter("all");

          this.bookPaging(data);
        }
      } else {
        if (this.searchQuery) {
          this.search();
        } else {
          const data = this.bookFilter(tab);

          this.bookPaging(data);
        }
      }
    },
  },
};
</script>

<style scoped>
.btn_wrap {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}
.btn_wrap > button {
  padding: 7px 20px;
  color: #fff;
  background-color: #cae3ff;
  border-radius: 20px;
  font-size: 14px;
}
.btn_wrap > button.active {
  background: #258bff;
}
.inputstyle {
  outline: none;
  width: 350px;
  height: 45px;
  background: #fff;
  border-radius: 30px;
  padding-left: 20px;
  font-size: 14px;
  font-family: notosansregular;
}
.inputstyle:focus {
  border: 1px solid var(--main-blue);
}
.inputbtn {
  display: inline-flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 30px;
  border-radius: 5px;
  background: var(--main-blue);
  color: #fff;
}
.empty {
  color: #f34c4c;
  font-size: 14px;
  line-height: 20px;
  margin-left: 13px;
}
</style>
