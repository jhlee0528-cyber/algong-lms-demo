<template>
  <section>
    <h2 class="title">
      {{ name }} {{ langlist[store.state.lang]["학생 독서 현황"] }}
    </h2>
    <p class="title-text">
      {{
        langlist[store.state.lang][
          "개별 학생들의 독서 정보를 한눈에 볼 수 있습니다."
        ]
      }}
    </p>

    <div class="wrap-status-menu font_18_m_22">
      <button
        :class="content === 'summary' ? 'menu on' : 'menu'"
        @click="onClickMenu('summary')"
      >
        {{ langlist[store.state.lang]["요약"] }}
      </button>
      <button
        :class="content === 'all' ? 'menu on' : 'menu'"
        style="width: 180px"
        @click="onClickMenu('all')"
      >
        {{ langlist[store.state.lang]["전체독서 활동"] }}
      </button>
    </div>

    <!-- 요약 -->
    <div v-if="content === 'summary'" class="grid-container">
      <div class="grid-item">
        <h4>{{ langlist[store.state.lang]["최근 열람 도서"] }}</h4>
        <div class="flex" style="text-align: center">
          <!-- <div class="item3">
            <p class="reading-date">2024.07.09</p>
            <div class="library-book"></div>
            <div class="reading-status book-bg-1 complete">
              <p>1독</p>
            </div>
          </div>
          <div class="item3">
            <p class="reading-date">2024.07.09</p>
            <div class="library-book"></div>
            <div class="reading-status ongoing">
              <div class="chart_blue-bg">
                <div class="chart_bar" :style="{ width: `40%` }"></div>
              </div>
              <p>40% (4/10p)</p>
            </div>
          </div>
          <div class="item3">
            <p class="reading-date">2024.07.09</p>
            <div class="library-book"></div>
            <div class="reading-status book-bg-3 complete">3독</div>
          </div> -->

          <div v-for="(j, i) in recentBooks" :key="i">
            <div class="item3">
              <p class="reading-date">{{ prettyRecentDate(j.recentDate) }}</p>
              <div
                @click="selectBook(j.bookCode, i)"
                class="library-book"
                :style="backgroundVars(j.bookCode)"
              ></div>
              <div
                v-if="j.completeCount > 0"
                class="reading-status complete"
                :class="{
                  'book-bg-1': j.completeCount === 1,
                  'book-bg-2': j.completeCount === 2,
                  'book-bg-3': j.completeCount > 2,
                }"
              >
                <p style="margin-left: -4px">
                  {{ j.completeCount }}{{ langlist[store.state.lang]["독"] }}
                </p>
              </div>
              <div v-if="j.completeCount === 0">
                <div class="reading-status ongoing">
                  <div class="chart_blue-bg">
                    <div class="chart_bar" :style="{ width: `40%` }"></div>
                  </div>
                  <p>
                    {{ j.progress }}% ({{ j.currentPage }}/{{ j.totalPage }}p)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-for="n in 3 - recentBooks.length" :key="n">
            <div class="item3">
              <div class="no-library-book"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-item">
        <h4>{{ langlist[store.state.lang]["전체 독서 활동"] }}</h4>
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
            <p class="text">{{ langlist[store.state.lang]["완독 책 (권)"] }}</p>
            <p class="num">{{ allReadInfo.bookCount || 0 }}</p>
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
              {{ langlist[store.state.lang]["누적 독서 (회)"] }}
            </p>
            <p class="num">{{ allReadInfo.readCount || 0 }}</p>
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
            <p class="text">{{ langlist[store.state.lang]["총 발화 문장"] }}</p>
            <p class="num">{{ allReadInfo.sentenceCount || 0 }}</p>
          </div>
        </div>
      </div>
      <div class="grid-item">
        <h4>{{ langlist[store.state.lang]["월별 독서 횟수"] }}</h4>
        <div class="graph-cont">
          <canvas id="monthlyChart" height="180"></canvas>
          <span class="chart-text"
            >({{ langlist[store.state.lang]["완독횟수"] }})</span
          >
        </div>
      </div>
      <div class="grid-item">
        <h4>{{ langlist[store.state.lang]["독서 퀴즈 결과"] }}</h4>
        <div class="flex">
          <div class="graph-cont">
            <div>
              <canvas id="quizChart" width="200"></canvas>
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
        <div class="title">
          <h4>{{ langlist[store.state.lang]["레벨로 보는 독서활동"] }}</h4>
        </div>
        <div class="progress-wrap level">
          <div class="progress" v-for="(unit, index) in levelData" :key="index">
            <p>{{ unit.name }}</p>
            <v-progress-linear
              class="custom-progress cp2"
              :model-value="unit.value"
              :height="10"
            ></v-progress-linear>
            <span>{{ unit.value }}%</span>
          </div>
        </div>
      </div>
      <div v-if="store.state.lang === 'ko'" class="grid-item">
        <h4>{{ langlist[store.state.lang]["교과서 연계 독서활동"] }}</h4>
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

    <!-- 전체독서 활동 -->
    <div v-if="content === 'all'">
      <Library2
        textType="reading"
        :id="userId"
        :booklist="booklist"
        :booklistlength="booklist.length"
      />
    </div>

    <v-dialog width="1000" v-model="store.state.bookDetailModal">
      <BookModal :userId="userId" :book="selectedBook" :detail="true" />
    </v-dialog>
  </section>
</template>

<script setup>
import {
  defineProps,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onActivated,
  ref,
  watch,
  toRaw,
} from "vue";
import { Chart, registerables } from "chart.js";
import Library2 from "../Library2.vue";
import { allbookinfo } from "../../../assets/bookinfo/allbookinfo.js";
import {
  getStudentLevelProgress,
  getStudentLibraryLessonProgress,
  getStudentRacingResult,
  getStudentRecentBooks,
  getStudentAllReadInfo,
  getClassMonthAverageUsage,
  getStudentMonthUsage,
} from "../../../api/api-list-2";
Chart.register(...registerables);

import { bookKeyList } from "../../../assets/bookinfo/bookkey";

import BookModal from "../BookModal.vue";

import store from "../../../store";

import { library_ko } from "../../../assets/translate/ko";
import { library_vt } from "../../../assets/translate/vt";

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
});

const langlist = ref({
  ko: library_ko,
  vt: library_vt,
});

const students = ref([]);
const progressData = ref([]);
const levelData = ref([]);
const content = ref("summary");
const booklist = allbookinfo.slice(0, 15);

const bookkey = ref(bookKeyList);

const selectedBook = ref(null);

const perfect = ref(0);
const good = ref(0);
const notbad = ref(0);

const name = ref("");
const userId = ref("");

const recentBooks = ref([]);
const allReadInfo = ref({
  bookCount: 0,
  readCount: 0,
  sentenceCount: 0,
});

const classUsage = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const studentUsage = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

const student = props.student;

let monthlyChart = null;
let quizChart = null;

const backgroundVars = (bookCode) => {
  const imageUrl = `https://argame3.blob.core.windows.net/library-book-data/book_thumbnail/${bookCode}.jpg`;
  return {
    "--bg-image": `url(${imageUrl})`,
  };
};

// const initializeData = async () => {
//   name.value = props.student.name;

//   students.value = Array.from({ length: 10 }, (_, i) => ({
//     name: `학생${i + 1}`,
//     weeklyReading: Math.floor(Math.random() * 10) + 1,
//     totalReading: Math.floor(Math.random() * 200) + 50,
//   }));

//   const res = (await getStudentRacingResult(student.id)).data.data;

//   perfect.value = res.perfect || 0;
//   good.value = res.good || 0;
//   notbad.value = res.notbad || 0;

//   const res2 = (await getStudentLibraryLessonProgress(student.id)).data.data;

//   let arr = [];

//   for (let i = 0; i < res2.length; i++) {
//     arr.push({
//       name: `${i + 1}단원`,
//       value: res2[i],
//     });
//   }

//   progressData.value = arr;

//   // progressData.value = Array.from({ length: 10 }, (_, i) => ({
//   //   name: `${i + 1}단원`,
//   //   value: Math.floor(Math.random() * 100) + 1,
//   // }));

//   const res3 = (await getStudentLevelProgress(student.id)).data.data;

//   levelData.value = [
//     { name: "Level K", value: res3["-1"] },
//     { name: "Starter", value: res3["0"] },
//     { name: "Level 1", value: res3["1"] },
//     { name: "Level 2", value: res3["2"] },
//     { name: "Level 3", value: res3["3"] },
//     { name: "Level 4", value: res3["4"] },
//     { name: "Level 5", value: res3["5"] },
//   ];

//   const res4 = (await getStudentRecentBooks(student.id)).data.data;
//   recentBooks.value = res4;

//   const res5 = (await getStudentAllReadInfo(student.id)).data.data;
//   allReadInfo.value = res5;
// };

const changeData = async (id) => {
  userId.value = props.student.id;
  name.value = props.student.name;

  if (content.value === "all") {
    // 전체 독서 활동 API 호출

    return;
  }

  students.value = Array.from({ length: 10 }, (_, i) => ({
    name: `학생${i + 1}`,
    weeklyReading: Math.floor(Math.random() * 10) + 1,
    totalReading: Math.floor(Math.random() * 200) + 50,
  }));

  const res = (await getStudentRacingResult(id)).data.data;

  perfect.value = res.perfect || 0;
  good.value = res.good || 0;
  notbad.value = res.notbad || 0;

  if (store.state.lang === "ko") {
    const res2 = (await getStudentLibraryLessonProgress(id)).data.data;

    let arr = [];

    for (let i = 0; i < res2.length; i++) {
      if (store.state.lang === "ko") {
        arr.push({
          name: `${i + 1}단원`,
          value: res2[i],
        });
      } else {
        arr.push({
          name: `Lesson${i + 1}`,
          value: res2[i],
        });
      }
    }

    progressData.value = arr;
  }

  const res3 = (await getStudentLevelProgress(id)).data.data;

  levelData.value = [
    { name: "Level K", value: res3["-1"] },
    { name: "Starter", value: res3["0"] },
    { name: "Level 1", value: res3["1"] },
    { name: "Level 2", value: res3["2"] },
    { name: "Level 3", value: res3["3"] },
    { name: "Level 4", value: res3["4"] },
    { name: "Level 5", value: res3["5"] },
  ];

  const res4 = (await getStudentRecentBooks(id)).data.data;
  recentBooks.value = res4;

  const res5 = (await getStudentAllReadInfo(id)).data.data;
  allReadInfo.value = res5;

  const res6 = (await getClassMonthAverageUsage()).data.data;
  const res7 = (await getStudentMonthUsage(id)).data.data;

  classUsage.value = res6;
  studentUsage.value = res7;

  renderCharts();
};

const renderCharts = () => {
  if (monthlyChart) {
    monthlyChart.destroy();
  }

  const ctx = document.getElementById("monthlyChart").getContext("2d");

  monthlyChart = new Chart(ctx, {
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          type: "line",
          label: langlist.value[store.state.lang]["반 평균"],
          backgroundColor: "#10D298",
          borderColor: "#10D298",
          borderWidth: 2,
          pointRadius: 2,
          data: classUsage.value,
        },
        {
          type: "line",
          label: langlist.value[store.state.lang]["본인"],
          backgroundColor: "#3D90EF",
          borderColor: "#3D90EF",
          borderWidth: 2,
          pointRadius: 2,
          data: studentUsage.value,
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
            text: `(${langlist.value[store.state.lang]["월 단위"]})`,
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
          display: true,
          align: "end",
          labels: {
            usePointStyle: true,
            boxHeight: 3,
          },
        },
      },
    },
  });

  const ctx2 = document.getElementById("quizChart").getContext("2d");
  if (quizChart) {
    quizChart.destroy();
  }
  quizChart = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: ["Perfect", "Good", "Not Bad"],
      datasets: [
        {
          data: [perfect.value, good.value, notbad.value],
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
};

function prettyRecentDate(date) {
  if (!date) {
    return "-";
  }

  // let str = date.split(" ")[0];
  // let str2 = str.split(".");
  // let year = str.split(".")[0].slice(2, 4);

  return date.split(" ")[0];
}

const onClickMenu = (status) => {
  content.value = status;
  if (status === "summary") {
    setTimeout(renderCharts, 0);
  }

  // if (status === "all") {
  //   window.dispatchEvent(
  //     new CustomEvent("allFlag", {
  //       detail: {
  //         id: userId.value,
  //       },
  //     })
  //   );
  // }
};

function selectBook(bookCode, index) {
  const targetBooks = recentBooks.value;
  const target = targetBooks[index];

  selectedBook.value = { ...bookkey.value[bookCode], ...target };

  store.state.bookDetailModal = true;
}

onBeforeMount(() => {});

onMounted(() => {
  changeData(props.student.id);
  renderCharts();
});

onActivated(() => {
  if (monthlyChart) {
    monthlyChart.update();
  }
  if (quizChart) {
    quizChart.update();
  }
});

onUnmounted(() => {
  if (monthlyChart) {
    monthlyChart.destroy();
  }
  if (quizChart) {
    quizChart.destroy();
  }
});

watch(
  () => props.student.id,
  async (id) => {
    content.value = "summary";
    changeData(id);
  }
);

watch(
  () => props.student.name,
  (newName) => {
    name.value = newName;
  }
);
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
  font-family: "notosansmedium";
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
  gap: 30px;
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
  background-size: contain;
  margin: 6px 0;
  cursor: pointer;
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
.custom-progress.cp2 {
  color: var(--main-blue);
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
.wrap-status-menu {
  width: fit-content;
  height: 48px;
  background-color: var(--chart-blue-bg);
  border-radius: 24px;
  margin: 20px 0;
}
.wrap-status-menu .menu {
  height: inherit;
  width: 145px;
  color: white;
  border-radius: 24px;
  font-family: "notosans";
  font-size: 20px;
}
.wrap-status-menu .menu.on {
  background-color: var(--main-blue);
}
.reading-date {
  font-size: 12px;
}
.reading-status {
  margin: 0 auto;
  justify-content: center;
  width: 32px;
  height: 24px;
  color: #fff;
  font-size: 12px;
}
.reading-status.ongoing {
  width: 78px;
  color: #292929;
}
.chart_blue-bg {
  width: 100%;
  height: 8px;
}
.book-bg-1 {
  background-image: url("../../../assets/image/book-bg-1.png");
}
.book-bg-2 {
  background-image: url("../../../assets/image/book-bg-2.png");
}
.book-bg-3 {
  background-image: url("../../../assets/image/book-bg-3.png");
}
.graph-cont {
  position: relative;
}
.graph-cont .chart-text {
  position: absolute;
  bottom: 22px;
  left: -30px;
  font-size: 12px;
  color: #9a9a9a;
}
.library-book:hover {
  filter: brightness(0.7);
  border: 3px solid white;
}
</style>
