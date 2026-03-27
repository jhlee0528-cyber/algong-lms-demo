<template>
  <div class="wrap">
    <div class="inner">
      <aside>
        <div class="card noselect">
          <h5 class="headline3">
            {{ langlist[store.state.lang]["도서 설정"] }}
          </h5>

          <div class="btn-wrap">
            <div
            :class="{
              clicked: ourReading !== false,
            }"
              class="lessonsetbtn"
              @click="showOurReading"
            >
              <div>
                <h6 class="body1-bold">
                  {{ langlist[store.state.lang]["우리반 독서 정보"] }}
                </h6>
                <p class="body2">
                  {{
                    langlist[store.state.lang][
                      "학생들이 읽은 책 정보를 한눈에 볼 수 있습니다."
                    ]
                  }}
                </p>
              </div>
            </div>

            <div
              class="lessonsetbtn"
              :class="{
                clicked: bookDetails !== false,
              }"
              @click="showBookDetails"
            >
              <div>
                <h6 class="body1-bold">
                  {{ langlist[store.state.lang]["도서별 상세 정보"] }}
                </h6>
                <p class="body2">
                  {{
                    langlist[store.state.lang][
                      "학습용 도서의 상세 정보를 확인할 수 있습니다."
                    ]
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="scroll-card noselect">
          <div class="title">
            <h5 class="headline3">
              {{ langlist[store.state.lang]["학생 독서 현황"] }}
            </h5>
            <span class="body2" style="color: #66686b">
              {{
                langlist[store.state.lang][
                  "학생들의 개별 독서 현황을 확인합니다."
                ]
              }}
            </span>
          </div>
          <div class="card-content scrollbar">
            <div
              @click="selectStudent(student)"
              v-for="(student, index) in infos"
              :key="index"
              class="content-btn"
              :class="{ selected: student === selectedStudent }"
            >
              <p class="headline2">
                {{ (index + 1).toString().padStart(2, "0") }}
              </p>
              <p class="body1">{{ student.name }}</p>
            </div>
          </div>
        </div>
      </aside>
      <!-- 우리반 독서 정보 -->
      <ourReadingComponent v-if="ourReading" class="library-content" />

      <!-- 도서 열람(기존 책장) -->
      <section v-if="bookDetails" class="library-content">
        <p style="font-family: notosans; font-size: 23px">
          {{ langlist[store.state.lang]["도서 설정"] }} >
          {{ langlist[store.state.lang]["도서 열람"] }}
        </p>
        <div class="wrap-status-menu headline2">
          <button
            v-show="
              school.payPlan !== 'p' &&
              school.payPlan !== 'pm' &&
              school.payPlan !== 'premium'
            "
            :class="
              content === 'free' ? 'menu-btn__active' : 'menu-btn__deactive'
            "
            @click="onClickMenu('free')"
          >
            {{ langlist[store.state.lang]["무료체험 도서"] }}
          </button>
          <button
            v-show="store.state.lang === 'ko'"
            :class="
              content === 'lesson' ? 'menu-btn__active' : 'menu-btn__deactive'
            "
            @click="onClickMenu('lesson')"
          >
            {{ langlist[store.state.lang]["교과연계 도서"] }}
          </button>
          <button
            :class="
              content === 'all' ? 'menu-btn__active' : 'menu-btn__deactive'
            "
            @click="onClickMenu('all')"
          >
            {{ langlist[store.state.lang]["전체 도서"] }}
          </button>
        </div>
        <freeBook v-if="content === 'free'" />
        <lessonBook v-else-if="content === 'lesson'" />
        <allBook v-else-if="content === 'all'" />
      </section>

      <!-- 학생 독서 현황 -->
      <StudentReadingComponent
        v-if="selectedStudent"
        class="library-content"
        :student="selectedStudent"
      />

      <!-- <section
        v-if="selectedStudent"
        class="library-content"
        style="margin-top: 10px"
      >
        <p style="font-size: 23px; font-family: notosans">
          {{ langlist[store.state.lang]["학생 독서 현황"] }} >
          {{ selectedStudent.name }}
        </p>
        <div
          class="wrap-status-menu headline2"
          style="margin-top: 20px; font-size: 19px"
        >
          <button
            :class="
              content === 'reading' ? 'menu-btn__active' : 'menu-btn__deactive'
            "
            @click="onClickMenu('reading')"
          >
            {{ langlist[store.state.lang]["읽고 있는 책"] }}
          </button>
          <button
            :class="
              content === 'completely'
                ? 'menu-btn__active'
                : 'menu-btn__deactive'
            "
            @click="onClickMenu('completely')"
          >
            {{ langlist[store.state.lang]["Read 완독 책"] }}
          </button>
        </div>
        <StudentRead v-if="content === 'reading'" />
        <StudentReadComplete v-else-if="content === 'completely'" />
      </section> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch, computed } from "vue";
import {
  lessonInfo,
  lessonStudentInfo,
  lessonaverageprogress,
  userInfo,
} from "../../api/api-list";

import { schoolinfo, getLibraryStudentList as getLibraryStudentListAPI } from "../../api/api-list-2";

import ourReadingComponent from "./bookinfo/OurReading.vue";
import StudentReadingComponent from "./bookinfo/StudentReading.vue";

import allBook from "./bookinfo/AllBook.vue";
import freeBook from "./bookinfo/FreeBook.vue";
import lessonBook from "./bookinfo/LessonBook.vue";

import StudentRead from "./studentinfo/StudentRead.vue";
import StudentReadComplete from "./studentinfo/StudentReadComplete.vue";

import store from "../../store";

import { library_ko } from "../../assets/translate/ko";
import { library_vt } from "../../assets/translate/vt";

// 더미 데이터 import
import { getLibraryStudentList as getDummyLibraryStudentList } from "../../data/students.js";

const langlist = ref({
  ko: library_ko,
  vt: library_vt,
});

const infos = ref([]);
const selected = ref(1);
const userinfo = ref({});
const content = ref("lesson");

const ourReading = ref(true);
const bookDetails = ref(false);
const selectedStudent = ref(null);

const loading = ref(true);
const school = ref({
  payPlan: "p",
});

// computed로 현재 지점 추적
const currentBranch = computed(() => store.state.currentBranch);

// 학생 목록 로드 함수
const loadStudentList = () => {
  // 더미 데이터 모드 사용
  const useDummyData = true; // 실제 배포 시 false로 변경 가능

  if (useDummyData) {
    infos.value = getDummyLibraryStudentList(currentBranch.value);
  }
};

// 지점 변경 시 학생 목록 새로고침
watch(currentBranch, () => {
  loadStudentList();
});

onBeforeMount(async () => {
  const res3 = await schoolinfo();
  school.value = res3.data.data;

  const payPlan = res3.data.data.payPlan;
  let premiums = ["p", "pm", "premium"];

  if (premiums.includes(payPlan) && store.state.lang === "ko") {
    content.value = "lesson";
  } else if (res3.data.data.payPlan === "p" && store.state.lang !== "ko") {
    content.value = "all";
  } else {
    content.value = "free";
  }
});

onMounted(async () => {
  try {
    const res100 = await userInfo();
    userinfo.value = res100.data.data;

    // 더미 데이터로 학생 목록 로드
    loadStudentList();
  } catch (error) {
    console.error('Failed to load user info:', error);
  } finally {
    loading.value = false;
  }
});

const selectStudent = (student) => {
  // const schoolinfo = school.value;

  // if (schoolinfo.payPlan !== "premium") {
  //   window.dispatchEvent(
  //     new CustomEvent("success", {
  //       detail: {
  //         status: true,
  //         text: [
  //           langlist.value[store.state.lang][
  //             "Standard 플랜의 독서 현황은 현재 준비중입니다."
  //           ],
  //         ],
  //       },
  //     })
  //   );
  //   return;
  // }

  selectedStudent.value = student;
  store.state.selectedStudent = student.userId;
  content.value = "reading";

  bookDetails.value = false;
  ourReading.value = false;
};

const onClickMenu = (status) => {
  if (status === "all") {
    window.dispatchEvent(
      new CustomEvent("searchInit", {
        detail: true,
      })
    );
  }
  content.value = status;
};

const showOurReading = () => {
  ourReading.value = true;
  bookDetails.value = false;
  clearSelectedStudent();
};

const showBookDetails = () => {
  bookDetails.value = true;
  ourReading.value = false;
  clearSelectedStudent();
};

const clearSelectedStudent = () => {
  selectedStudent.value = null;
  if (store.state.lang === "vt") {
    content.value = "all";
    return;
  }

  const info = school.value;

  if (info.payPlan === "p" || info.payPlan === "pm") {
    content.value = "lesson";
  } else {
    content.value = "free";
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  padding: 100px 0;
}
.inner {
  min-width: 1400px;
  display: flex;
  justify-content: center;
  gap: 30px;
}
aside {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.card {
  width: 370px;
  padding: 25px 30px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  .btn-wrap {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
.scroll-card {
  background-color: #fff;
  width: 370px;
  height: 610px;
  border-radius: 20px;

  .title {
    padding: 25px 28px;

    p {
      padding-top: 4px;
      color: #66686b;
    }
  }
}
.card-content {
  width: 355px;
  height: 500px;
  overflow-y: scroll;
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-btn {
  width: 304px;
  height: 90px;
  background-color: #fff;
  border: 1px solid #88c0ff;
  border-radius: 14px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  gap: 10px;

  .headline2 {
    color: #3480d8;
  }

  &.selected {
    background-color: #258bff !important;
    .headline2,
    p {
      color: #fff;
    }
  }
}
.lessonsetbtn {
  padding: 20px 14px;
  border: 1px solid #88c0ff;
  border-radius: 16px;
  background-image: url("../../assets/image/unclickedarrow.png");
  background-size: 3%;
  background-position-x: 95%;
  background-position-y: 50%;
  cursor: pointer;
  h6 {
    color: #3D90EF;
  }
  p {
    margin-top: 10px;
  }
}
.clicked {
  background-color: #258bff;
  border: none;
  background-image: url("../../assets/image/clickedarrow.png");

  h6, p {
    color: #fff;
  }
}
.content-view {
  width: 880px;
}
.library-content {
  float: left;
  width: 900px;
  margin-left: 30px;
}
.library-content h2 {
  font-size: 24px;
  color: #292929;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 26px;
}
.wrap-status-menu {
  width: fit-content;
  height: 48px;
  background-color: var(--chart-blue-bg);
  border-radius: 24px;
  margin-top: 20px;
}
.menu-btn__active,
.menu-btn__deactive {
  height: inherit;
  padding: 0 32px;
  color: white;
  border-radius: 40px;
}
.menu-btn__active {
  background-color: var(--main-blue);
}

/* 모바일 최적화 */
@media (max-width: 767px) {
  /* e-library 전체 컨테이너 */
  .wrap {
    padding: 12px !important;
    padding-bottom: 80px !important;
    overflow-x: hidden !important;
  }

  .inner {
    min-width: unset !important;
    flex-direction: column !important;
    gap: 12px !important;
  }

  /* 도서 설정 카드 */
  aside {
    width: 100% !important;
    gap: 12px !important;
  }

  .card {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding: 16px !important;
    gap: 12px !important;
  }

  .btn-wrap {
    gap: 10px !important;
  }

  .lessonsetbtn {
    padding: 14px 12px !important;
    background-size: 5% !important;
  }

  /* 학생 독서 현황 카드 */
  .scroll-card {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    box-sizing: border-box !important;
  }

  .title {
    padding: 16px !important;
  }

  .card-content {
    width: 100% !important;
    height: 300px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    box-sizing: border-box !important;
  }

  .content-btn {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    height: auto !important;
    min-height: 70px !important;
    padding: 10px 12px !important;
  }

  /* 메인 콘텐츠 영역 */
  .library-content {
    width: 100% !important;
    max-width: 100% !important;
    float: none !important;
    margin-left: 0 !important;
    box-sizing: border-box !important;
  }

  .content-view {
    width: 100% !important;
    box-sizing: border-box !important;
  }

  /* 도서 목록 그리드 */
  .book-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }

  /* 필터/검색 영역 */
  .wrap-status-menu {
    width: 100% !important;
    height: auto !important;
    border-radius: 12px !important;
    padding: 4px !important;
  }

  .menu-btn__active,
  .menu-btn__deactive {
    padding: 8px 16px !important;
    font-size: 12px !important;
  }

  /* 텍스트 크기 */
  .headline3 {
    font-size: 14px !important;
  }

  .headline2 {
    font-size: 14px !important;
  }

  .body1 {
    font-size: 13px !important;
  }

  .body2 {
    font-size: 11px !important;
  }
}
</style>
