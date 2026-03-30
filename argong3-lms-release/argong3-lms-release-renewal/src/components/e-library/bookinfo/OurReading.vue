<template>
  <section>
    <h2 class="title">{{ langlist[$store.state.lang]["우리반 독서 정보"] }}</h2>
    <p class="title-text">
      {{
        langlist[$store.state.lang][
          "학생들이 읽은 책 정보를 한눈에 볼 수 있습니다."
        ]
      }}
    </p>

    <div class="grid-container">
      <div class="grid-item">
        <div>
          <h4 style="float: left">
            {{ langlist[$store.state.lang]["인기 도서 Top 3"] }}
          </h4>
          <div style="float: right">
            <p
              @click="changePopularFlag('week')"
              :class="{
                popularcolor1: popularFlag !== 'week',
                popularcolor2: popularFlag === 'week',
              }"
              style="
                float: left;
                font-size: 14px;
                margin-right: 20px;
                cursor: pointer;
              "
            >
              {{ langlist[$store.state.lang]["주간"] }}
            </p>
            <p
              @click="changePopularFlag('all')"
              :class="{
                popularcolor1: popularFlag !== 'all',
                popularcolor2: popularFlag === 'all',
              }"
              style="
                float: left;
                font-size: 14px;
                margin-right: 10px;
                cursor: pointer;
              "
            >
              {{ langlist[$store.state.lang]["전체"] }}
            </p>
          </div>
        </div>
        <div class="flex" style="text-align: center">
          <div v-if="popularbooks.length > 0" class="item3">
            <div class="ranking">{{ langlist[$store.state.lang]["1위"] }}</div>
            <div
              @click="selectBook(popularbooks[0].bookCode)"
              class="library-book"
              :style="backgroundVars(popularbooks[0].bookCode)"
            ></div>
            <p class="total">
              {{ popularbooks[0].readCount
              }}{{ langlist[$store.state.lang]["회 완독"] }}
            </p>
          </div>
          <div v-if="popularbooks.length > 1" class="item3">
            <div class="ranking">{{ langlist[$store.state.lang]["2위"] }}</div>
            <div
              @click="selectBook(popularbooks[1].bookCode)"
              class="library-book"
              :style="backgroundVars(popularbooks[1].bookCode)"
            ></div>
            <p class="total">
              {{ popularbooks[1].readCount
              }}{{ langlist[$store.state.lang]["회 완독"] }}
            </p>
          </div>
          <div v-if="popularbooks.length > 2" class="item3">
            <div class="ranking">{{ langlist[$store.state.lang]["3위"] }}</div>
            <div
              @click="selectBook(popularbooks[2].bookCode)"
              class="library-book"
              :style="backgroundVars(popularbooks[2].bookCode)"
            ></div>
            <p class="total">
              {{ popularbooks[2].readCount
              }}{{ langlist[$store.state.lang]["회 완독"] }}
            </p>
          </div>
          <div v-for="n in 3 - popularbooks.length" :key="n">
            <div class="item3">
              <div class="no-library-book"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-item">
        <h4>{{ langlist[$store.state.lang]["전체 독서 활동"] }}</h4>
        <div class="flex" style="text-align: center">
          <div class="item3 bg-blue">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="30"
                viewBox="0 0 36 30"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.4375 3.14953C2.4375 2.7566 2.59114 2.37976 2.86461 2.10191C3.13808 1.82407 3.50899 1.66798 3.89574 1.66798H12.1649C14.5506 1.66798 16.6699 2.83347 17.9979 4.63306C18.6767 3.71108 19.5581 2.9629 20.5718 2.44813C21.5855 1.93335 22.7035 1.66621 23.8367 1.66798H32.0904C32.4771 1.66798 32.848 1.82407 33.1215 2.10191C33.395 2.37976 33.5486 2.7566 33.5486 3.14953V23.8913C33.5486 24.2842 33.395 24.661 33.1215 24.9389C32.848 25.2167 32.4771 25.3728 32.0904 25.3728H23.3273C22.7528 25.3728 22.1839 25.4878 21.6532 25.7111C21.1224 25.9345 20.6401 26.2619 20.2339 26.6746L19.0245 27.9014C18.7511 28.1788 18.3805 28.3346 17.994 28.3346C17.6076 28.3346 17.237 28.1788 16.9635 27.9014L15.7542 26.6746C15.3479 26.2619 14.8657 25.9345 14.3349 25.7111C13.8041 25.4878 13.2352 25.3728 12.6608 25.3728H3.89574C3.50899 25.3728 3.13808 25.2167 2.86461 24.9389C2.59114 24.661 2.4375 24.2842 2.4375 23.8913V3.14953Z"
                  stroke="#3D90EF"
                  stroke-width="3.33333"
                />
                <path
                  d="M17.9883 4.44336V28.3322"
                  stroke="#3D90EF"
                  stroke-width="3.33333"
                />
              </svg>
            </div>
            <p class="text">
              {{ langlist[$store.state.lang]["개별 평균 (권)"] }}
            </p>
            <p class="num">{{ allActivity.bookCount }}</p>
          </div>
          <div class="item3 bg-blue">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M6 19.5H1.5M1.5 28.5H19.5C20.898 28.5 21.597 28.5 22.1475 28.272C22.5117 28.1212 22.8427 27.9002 23.1214 27.6214C23.4002 27.3427 23.6212 27.0117 23.772 26.6475C24 26.097 24 25.398 24 24C24 22.602 24 21.903 23.772 21.3525C23.6212 20.9883 23.4002 20.6573 23.1214 20.3786C22.8427 20.0998 22.5117 19.8788 22.1475 19.728C21.597 19.5 20.898 19.5 19.5 19.5H16.5H24C25.398 19.5 26.097 19.5 26.6475 19.272C27.0117 19.1212 27.3427 18.9002 27.6214 18.6214C27.9002 18.3427 28.1212 18.0117 28.272 17.6475C28.5 17.097 28.5 16.398 28.5 15C28.5 13.602 28.5 12.903 28.272 12.3525C28.1212 11.9883 27.9002 11.6573 27.6214 11.3786C27.3427 11.0998 27.0117 10.8788 26.6475 10.728C26.097 10.5 25.398 10.5 24 10.5H1.5H18C19.398 10.5 20.097 10.5 20.6475 10.272C21.0117 10.1212 21.3427 9.90016 21.6214 9.62141C21.9002 9.34267 22.1212 9.01173 22.272 8.6475C22.5 8.097 22.5 7.398 22.5 6C22.5 4.602 22.5 3.903 22.272 3.3525C22.1212 2.98827 21.9002 2.65733 21.6214 2.37859C21.3427 2.09984 21.0117 1.87877 20.6475 1.728C20.097 1.5 19.398 1.5 18 1.5H1.5"
                  stroke="#3D90EF"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 10.5V19.785C16.5 21.4575 16.5 22.293 16.011 22.47C15.5205 22.65 14.967 22.014 13.8615 20.745L13.1385 19.917C12.609 19.3095 12.345 19.0065 12 19.0065C11.655 19.0065 11.391 19.3095 10.86 19.917L10.14 20.745C9.033 22.014 8.4795 22.65 7.9905 22.47C7.5 22.293 7.5 21.4575 7.5 19.785V10.5"
                  stroke="#3D90EF"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p class="text">
              {{ langlist[$store.state.lang]["반 누적 (권)"] }}
            </p>
            <p class="num">{{ allActivity.readCount }}</p>
          </div>
          <div class="item3 bg-blue">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.5641 33.2218C11.3754 33.2218 11.0134 33.1189 10.5081 32.6016C10.0117 32.0936 9.497 31.3001 9.03949 30.2517C8.1263 28.159 7.55372 25.3097 7.67959 22.4519C7.80559 19.5911 8.62249 16.87 10.323 14.8878C11.9851 12.9503 14.63 11.5549 18.7857 11.5549C22.8377 11.5549 25.6682 12.7298 27.4934 14.6316C29.3285 16.5436 30.34 19.3906 30.34 23.1106C30.34 23.4937 30.4921 23.8611 30.763 24.132L32.4743 25.8432L30.9177 27.0106C30.554 27.2834 30.34 27.7115 30.34 28.1662V28.8884H26.0066C25.5423 28.8884 25.1063 29.1116 24.8348 29.4883C24.5633 29.8649 24.4895 30.3492 24.6363 30.7896C24.8408 31.4031 25.26 32.0182 25.698 32.5439C26.1577 33.0957 26.7299 33.6575 27.3534 34.1631C27.954 34.6501 28.6295 35.1072 29.3294 35.455C29.028 35.6604 28.6675 35.8734 28.2492 36.0826C26.6361 36.889 24.3287 37.5551 21.6733 37.5551C20.8755 37.5551 20.2288 38.2018 20.2288 38.9995V41.8884H13.0085V34.6662C13.0085 33.8685 12.3618 33.2218 11.5641 33.2218ZM30.3679 34.4866C30.368 34.4866 30.3673 34.4886 30.3653 34.4926C30.3669 34.4886 30.3678 34.4866 30.3679 34.4866ZM18.7857 8.66602C13.9126 8.66602 10.418 10.3401 8.13036 13.0068C5.8811 15.6288 4.93789 19.0466 4.7935 22.3248C4.64899 25.6059 5.29574 28.8955 6.39172 31.4071C6.93878 32.6607 7.62608 33.7857 8.44171 34.6205C8.917 35.107 9.48025 35.5375 10.1197 35.8091V43.3329C10.1197 44.1306 10.7664 44.7773 11.5641 44.7773H21.6733C22.471 44.7773 23.1177 44.1306 23.1177 43.3329V40.3883C25.641 40.1935 27.8573 39.5084 29.5411 38.6665C30.5367 38.1687 31.3878 37.5954 32.0142 36.9976C32.3271 36.6989 32.612 36.3675 32.8268 36.008C33.0354 35.659 33.2288 35.1974 33.2288 34.6662C33.2288 33.8685 32.5821 33.2218 31.7844 33.2218C31.5422 33.2218 31.1637 33.1341 30.6646 32.8923C30.1802 32.6576 29.6641 32.3175 29.173 31.9193C29.1152 31.8724 29.0581 31.825 29.0019 31.7773H31.7844C32.5821 31.7773 33.2288 31.1306 33.2288 30.3329V28.8884L35.54 27.1551C35.8749 26.9038 36.0844 26.5196 36.1141 26.1019C36.1438 25.6842 35.9908 25.2742 35.6947 24.9782L33.2208 22.5043C33.1146 18.5367 31.9546 15.1078 29.5777 12.6312C27.0705 10.019 23.4016 8.66602 18.7857 8.66602ZM40.4464 30.3327C39.6487 30.3327 39.002 30.9794 39.002 31.7771C39.002 32.5749 39.6487 33.2216 40.4464 33.2216H46.2242C47.0219 33.2216 47.6686 32.5749 47.6686 31.7771C47.6686 30.9794 47.0219 30.3327 46.2242 30.3327H40.4464ZM39.2446 28.245C38.8021 27.5813 38.9814 26.6845 39.6452 26.2419L43.9785 23.3531C44.6423 22.9105 45.5391 23.0899 45.9816 23.7537C46.4241 24.4174 46.2448 25.3142 45.581 25.7568L41.2477 28.6456C40.5839 29.0882 39.6871 28.9088 39.2446 28.245ZM43.9785 40.2019C44.6423 40.6444 45.5391 40.465 45.9816 39.8012C46.4241 39.1375 46.2448 38.2407 45.581 37.7982L41.2477 34.9093C40.5839 34.4668 39.6871 34.6461 39.2446 35.3099C38.8021 35.9737 38.9814 36.8705 39.6452 37.313L43.9785 40.2019Z"
                  fill="#3D90EF"
                />
              </svg>
            </div>
            <p class="text">
              {{ langlist[$store.state.lang]["총 발화 문장"] }}
            </p>
            <p class="num">{{ allActivity.sentenceCount }}</p>
          </div>
        </div>
      </div>
      <div class="grid-item">
        <h4>{{ langlist[$store.state.lang]["월별 독서량"] }}</h4>
        <div class="graph-cont">
          <canvas id="monthlyReadingChart" height="180"></canvas>
          <span class="chart-text"
            >({{ langlist[$store.state.lang]["완독횟수"] }})</span
          >
        </div>
      </div>
      <div class="grid-item">
        <h4>{{ langlist[$store.state.lang]["독서 퀴즈 결과"] }}</h4>
        <div class="flex">
          <div class="graph-cont">
            <div>
              <canvas id="pieChart" width="200"></canvas>
            </div>
          </div>
          <ul class="quizResult">
            <li style="color: var(--main-blue)">
              Perfect<span>{{ perfect }}%</span>
            </li>
            <li style="color: var(--main-green)">
              Good <span>{{ good }}%</span>
            </li>
            <li style="color: var(--main-orange)">
              Not Bad <span>{{ notbad }}%</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-item">
        <div class="title flex">
          <h4>{{ langlist[$store.state.lang]["주간 독서 랭킹"] }}</h4>
          <div class="weekly">
            <p>
              {{ langlist[$store.state.lang]["기준 날짜"] }} :
              {{ startDate }}({{ langlist[$store.state.lang]["화"] }}) ~
              {{ endDate }}({{ langlist[$store.state.lang]["월"] }})
            </p>
            <span
              >*{{ langlist[$store.state.lang]["매주 화요일 랭킹 갱신"] }}</span
            >
          </div>
        </div>
        <div>
          <table class="weeklyRank">
            <tr>
              <th>{{ langlist[$store.state.lang]["랭킹"] }}</th>
              <th>{{ langlist[$store.state.lang]["이름"] }}</th>
              <th>{{ langlist[$store.state.lang]["주간 독서량 (권)"] }}</th>
              <th>{{ langlist[$store.state.lang]["누적 독서량 (권)"] }}</th>
            </tr>
            <tr v-for="(j, i) in ranking" :key="i">
              <td>{{ j.rank }}</td>
              <td>{{ j.name }}</td>
              <td>{{ j.readCount }}</td>
              <td>{{ j.totalReadCount }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="$store.state.lang === 'ko'" class="grid-item">
        <h4>{{ langlist[$store.state.lang]["교과서 연계 독서활동"] }}</h4>
        <div class="progress-wrap">
          <div
            class="progress"
            v-for="(unit, index) in progressData"
            :key="index"
          >
            <p>{{ unit.name }}</p>
            <v-progress-linear
              class="custom-progress"
              :model-value="unit.value"
              :height="10"
            ></v-progress-linear>
            <span>{{ unit.value }}%</span>
          </div>
        </div>
      </div>
    </div>
    <v-dialog width="1000" v-model="$store.state.bookDetailModal">
      <BookModal :book="selectedBook" />
    </v-dialog>
  </section>
</template>

<script>
import { onMounted, onUnmounted, onActivated, ref, onBeforeMount, computed, watch } from "vue";
import { Chart, registerables } from "chart.js";

// API imports (주석처리 - 나중에 재연결 시 사용)
// import {
//   getClassAllReadInfo,
//   getClassLibraryLessonProgress,
//   getClassMonthAllUsage,
//   getClassPopularBooks,
//   getClassQuizAverage,
//   getWeeklyRanking,
//   getClassWeeklyPopularBooks,
// } from "../../../api/api-list-2";

// 더미 데이터 imports
import {
  getClassAllReadInfo,
  getClassLibraryLessonProgress,
  getClassMonthAllUsage,
  getClassPopularBooks,
  getClassQuizAverage,
  getWeeklyRanking,
  getClassWeeklyPopularBooks,
} from "../../../data/students.js";

import { bookKeyList } from "../../../assets/bookinfo/bookkey";

import BookModal from "../BookModal.vue";

import { library_ko } from "../../../assets/translate/ko";
import { library_vt } from "../../../assets/translate/vt";

import store from "../../../store";

Chart.register(...registerables);

// 더미 데이터 모드 플래그 (실제 배포 시 false로 변경)
const useDummyData = true;

export default {
  data() {
    return {
      allActivity: {
        bookCount: 0,
        readCount: 0,
        sentenceCount: 0,
      },
      popularbooks: [],
      popularbooksAll: [],
      popularbooksWeekly: [],
      ranking: [],
      startDate: "",
      endDate: "",
      popularFlag: "week",
      bookkeys: bookKeyList,
      selectedBook: null,
      langlist: {
        ko: library_ko,
        vt: library_vt,
      },
    };
  },
  async created() {
    this.loadBranchData();
  },
  computed: {
    currentBranch() {
      return store.state.currentBranch;
    }
  },
  watch: {
    currentBranch() {
      this.loadBranchData();
    }
  },
  components: {
    BookModal,
  },
  methods: {
    async loadBranchData() {
      const branchName = store.state.currentBranch;

      if (useDummyData) {
        // 더미 데이터 사용
        this.allActivity = getClassAllReadInfo(branchName);
        this.changePopularFlag("week");

        const res3 = getWeeklyRanking(branchName);
        this.ranking = res3.ranking;
        this.startDate = this.prettyDate(res3.start);
        this.endDate = this.prettyDate(res3.end);
      } else {
        // 실제 API 호출 (나중에 재연결 시 주석 해제)
        // const res = await getClassAllReadInfo();
        // this.allActivity = res.data.data;
        // this.changePopularFlag("week");
        //
        // const res3 = (await getWeeklyRanking()).data.data;
        // this.ranking = res3.ranking;
        // this.startDate = this.prettyDate(res3.start);
        // this.endDate = this.prettyDate(res3.end);
      }
    },
    backgroundVars(bookCode) {
      const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${bookCode}.jpg`;
      return {
        "--bg-image": `url(${imageUrl})`,
      };
    },
    prettyDate(str) {
      let str2 = str.split("T");
      let str3 = str2[0];
      str3.replaceAll(".", "-");

      const date = new Date(str3);

      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${month}/${day}`;
    },
    async changePopularFlag(text) {
      this.popularFlag = text;
      const branchName = store.state.currentBranch;

      if (useDummyData) {
        // 더미 데이터 사용
        if (text === "week") {
          if (!this.popularbooksWeekly.length) {
            this.popularbooksWeekly = getClassWeeklyPopularBooks(branchName);
          }
          this.popularbooks = this.popularbooksWeekly;
        } else {
          if (!this.popularbooksAll.length) {
            this.popularbooksAll = getClassPopularBooks(branchName);
          }
          this.popularbooks = this.popularbooksAll;
        }
      } else {
        // 실제 API 호출 (나중에 재연결 시 주석 해제)
        // if (text === "week") {
        //   if (!this.popularbooksWeekly.length) {
        //     const res4 = (await getClassWeeklyPopularBooks()).data.data;
        //     this.popularbooksWeekly = res4;
        //   }
        //   this.popularbooks = this.popularbooksWeekly;
        // } else {
        //   if (!this.popularbooksAll.length) {
        //     const res2 = (await getClassPopularBooks()).data.data;
        //     this.popularbooksAll = res2;
        //   }
        //   this.popularbooks = this.popularbooksAll;
        // }
      }
    },
    selectBook(bookCode) {
      this.$store.state.bookDetailModal = true;
      this.selectedBook = this.bookkeys[bookCode];
    },
  },
  setup() {
    const students = ref([]);
    const progressData = ref([]);
    const langlist = ref({
      ko: library_ko,
      vt: library_vt,
    });
    let monthlyChart = null;
    let pieChart = null;

    async function initializeData() {
      students.value = Array.from({ length: 10 }, (_, i) => ({
        name: `학생${i + 1}`,
        weeklyReading: 0,
        totalReading: 0,
      }));

      if (useDummyData) {
        // 더미 데이터 사용
        if (store.state.lang === "ko") {
          const res2 = getClassLibraryLessonProgress();
          let arr = [];
          for (let i = 0; i < res2.length; i++) {
            arr.push({
              name: `${i + 1}단원`,
              value: res2[i],
            });
          }
          progressData.value = arr;
        } else {
          progressData.value = Array.from({ length: 12 }, (_, i) => ({
            name: `Lesson${i + 1}`,
            value: 0,
          }));
        }
      } else {
        // 실제 API 호출 (나중에 재연결 시 주석 해제)
        // if (store.state.lang === "ko") {
        //   const res2 = (await getClassLibraryLessonProgress()).data.data;
        //   let arr = [];
        //   for (let i = 0; i < res2.length; i++) {
        //     arr.push({
        //       name: `${i + 1}단원`,
        //       value: res2[i],
        //     });
        //   }
        //   progressData.value = arr;
        // } else {
        //   progressData.value = Array.from({ length: 12 }, (_, i) => ({
        //     name: `Lesson${i + 1}`,
        //     value: 0,
        //   }));
        // }
      }
    }

    const perfect = ref(0);
    const good = ref(0);
    const notbad = ref(0);

    async function setPieData() {
      if (useDummyData) {
        // 더미 데이터 사용
        const res = getClassQuizAverage();
        perfect.value = res.perfect || 0;
        good.value = res.good || 0;
        notbad.value = res.notbad || 0;

        return { _perfect: res.perfect || 0, _good: res.good || 0, _notbad: res.notbad || 0 };
      } else {
        // 실제 API 호출 (나중에 재연결 시 주석 해제)
        // const res = (await getClassQuizAverage()).data.data;
        // perfect.value = res.perfect || 0;
        // good.value = res.good || 0;
        // notbad.value = res.notbad || 0;
        // return { _perfect: res.perfect || 0, _good: res.good || 0, _notbad: res.notbad || 0 };
      }
    }

    async function setLineData() {
      if (useDummyData) {
        // 더미 데이터 사용
        return getClassMonthAllUsage();
      } else {
        // 실제 API 호출 (나중에 재연결 시 주석 해제)
        // const res = (await getClassMonthAllUsage()).data.data;
        // return res;
      }
    }

    async function renderCharts() {
      if (monthlyChart) {
        monthlyChart.destroy();
      }

      if (pieChart) {
        pieChart.destroy();
      }

      let monthData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

      monthData = await setLineData();
      const { _perfect, _good, _notbad } = await setPieData();

      const ctx = document
        .getElementById("monthlyReadingChart")
        .getContext("2d");
      monthlyChart = new Chart(ctx, {
        data: {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ],
          datasets: [
            {
              type: "line",
              // label: "Dataset 3",
              backgroundColor: "#3D90EF",
              borderColor: "#3D90EF",
              borderWidth: 2,
              pointRadius: 2,
              data: monthData,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawOnChartArea: true,
                drawTicks: false,
              },
              border: {
                display: false,
              },
              ticks: {
                padding: 10,
                color: "#9A9A9A",
              },
              // title: {
              //   display: true,
              //   text: '(완독횟수)',
              //   font: {
              //     size: 12,
              //   },
              //   align: 'start',
              // },
            },
            x: {
              grid: {
                drawOnChartArea: false,
                drawTicks: false,
              },
              border: {
                display: false,
              },
              ticks: {
                padding: 10,
                color: "#9A9A9A",
              },
              title: {
                display: true,
                text: langlist.value[store.state.lang]["월 단위"],
                font: {
                  size: 12,
                },
                color: "#9A9A9A",
                padding: {
                  top: -5,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      const pieCtx = document.getElementById("pieChart").getContext("2d");
      pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Perfect", "Good", "Not Bad"],
          datasets: [
            {
              data: [_perfect, _good, _notbad],
              backgroundColor: ["#3D90EF", "#10D298", "#F88D10"],
            },
          ],
        },
        options: {
          responsive: true,
          rotation: 90,
          plugins: {
            legend: {
              position: "right",
              display: false,
            },
          },
        },
      });
    }

    onBeforeMount(async () => {});

    onMounted(() => {
      initializeData();
      renderCharts();
    });

    onActivated(() => {
      if (monthlyChart) {
        monthlyChart.update();
      }
      if (pieChart) {
        pieChart.update();
      }
    });

    onUnmounted(() => {
      if (monthlyChart) {
        monthlyChart.destroy();
      }
      if (pieChart) {
        pieChart.destroy();
      }
    });

    return {
      students,
      progressData,
      perfect,
      good,
      notbad,
    };
  },
};
</script>

<style scoped>
.title {
  font-family: notosans;
  font-size: 24px;
}
.title-text {
  font-size: 14px;
  color: #9a9a9a;
  font-weight: 100;
  margin-top: 8px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}
.grid-item {
  width: 100%;
  background: #fff;
  padding: 32px 40px;
  border-radius: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: top;
  gap: 28px;
}
.grid-item h4 {
  font-family: "notosans";
  color: #292929;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.6px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex .item3 {
  width: 100px;
  height: 168px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #525252;
}
.item3 .ranking {
  font-size: 16px;
}
.item3 .library-book {
  width: 78px;
  height: 108px;
  background: var(--bg-image);
  background-size: cover;
  margin: 4px 0;
  cursor: pointer;
}
.item3 .total {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #292929;
}
.bg-blue {
  background: #f1f8ff !important;
  border-radius: 20px;
  padding: 12px 8px;
  gap: 10px;
  color: #525252 !important;
  font-weight: 700;
}
.bg-blue .icon {
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-blue .text {
  font-size: 13px;
}
.bg-blue .num {
  color: #3d90ef;
  font-size: 28px;
  line-height: 38px;
}
.quizResult {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100px;
}
.quizResult li {
  color: #525252;
  font-size: 16x;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.6px;
  position: relative;
  list-style: none;
}
.quizResult li::before {
  content: "";
  position: absolute;
  display: block;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  left: -20px;
  top: 5px;
}
.quizResult li:nth-child(1)::before {
  background: var(--main-blue);
}
.quizResult li:nth-child(2)::before {
  background: var(--main-green);
}
.quizResult li:nth-child(3)::before {
  background: var(--main-orange);
}
.quizResult li span {
  display: block;
  color: #525252;
  margin: 6px 0;
  font-weight: 300;
}
table.weeklyRank {
  width: 100%;
  text-align: center;
}
table.weeklyRank th {
  font-size: 13px;
  color: #292929;
  font-family: "notosansregular";
}
table.weeklyRank th:nth-child(3),
table.weeklyRank td:nth-child(3) {
  color: var(--main-blue);
}
table.weeklyRank th:nth-child(4),
table.weeklyRank td:nth-child(4) {
  color: #9a9a9a;
}
table.weeklyRank td {
  padding: 5px;
  color: #525252;
  font-size: 13px;
}
.progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.progress {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #525252;
}
.progress p {
  min-width: 40px;
}
.progress span {
  display: flex;
  justify-content: end;
  width: 25px;
}
.custom-progress {
  width: 265px;
  left: 0 !important;
  transform: translateX(0) !important;
  height: 10px;
  border-radius: 4px;
  color: var(--main-green);
}
.grid-item .title {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.title .weekly {
  text-align: right;
  font-size: 14px;
  font-family: "notosansmedium";
}
.title .weekly p {
  color: #292929;
  line-height: 18px;
  letter-spacing: -0.6px;
}
.title .weekly span {
  font-size: 10px;
  color: #525252;
}
.graph-cont {
  position: relative;
}
.graph-cont .chart-text {
  position: absolute;
  bottom: 22px;
  left: -25px;
  font-size: 12px;
  color: #9a9a9a;
}
.item3 .no-library-book {
  width: 78px;
  height: 108px;
  /* background-color: rgb(190, 190, 190); */
  background-image: url("../../../assets/image/nobookimage.png");
  background-size: 100%;
  border: 1px solid #2c9aea;
  margin: 6px 0;
  margin-top: 23px;
}
.popularcolor1 {
  color: rgb(190, 190, 190);
}
.popularcolor2 {
  color: #3d90ef;
}
.library-book:hover {
  filter: brightness(0.7);
  border: 3px solid white;
}
</style>
