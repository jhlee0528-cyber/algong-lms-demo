<template>
  <div class="wrap">
    <div class="inner">
      <aside>
        <div class="card noselect">
          <h5
            v-show="$store.state.lang === 'ko' && userinfo.publisher !== 'SP'"
            class="headline3"
          >
            {{ settextbook(userinfo.publisher) }} {{ userinfo.grade }}학년
            {{ userinfo.classNum }}반
          </h5>
          <h5
            v-show="$store.state.lang !== 'ko' && userinfo.publisher !== 'SP'"
            class="headline3"
          >
            {{ langlist[$store.state.lang]["학년"] }} {{ userinfo.grade }}
            {{ langlist[$store.state.lang]["반"] }} {{ userinfo.classNum }}
          </h5>
          <h5 v-show="userinfo.publisher === 'SP'" class="headline3">
            늘봄학교 파닉스반
          </h5>

          <div class="btn-wrap">
            <!-- 과제 미션 관리 -->
            <div
              @click="setPage('list')"
              class="lessonsetbtn"
              :class="{ clicked: currentPage === 'list' }"
            >
              <div>
                <h6 class="body1-bold">과제 미션 관리</h6>
                <p class="body2">학습 목표에 맞춰 과제를 설정할 수 있습니다.</p>
              </div>
            </div>

            <!-- 학습 단원 설정 -->
            <div
              v-if="userinfo.publisher !== 'SP'"
              @click="setPage('lesson')"
              class="lessonsetbtn"
              :class="{ clicked: currentPage === 'lesson' }"
            >
              <h6 class="body1-bold">
                {{ langlist[$store.state.lang]["학습 단원 설정"] }}
              </h6>
              <p class="body2" v-show="$store.state.lang === 'ko'">
                {{ lessons.length }}개 중 {{ openlessons.length }}개 단원 학습이
                열려있습니다.
              </p>
              <p v-show="$store.state.lang !== 'ko'" class="body2">
                {{
                  langlist[$store.state.lang]["학습할 단원 설정이 가능합니다."]
                }}
              </p>
            </div>

            <!-- "GPT 대화 주제 설정 -->
            <div
              v-if="userinfo.publisher !== 'SP'"
              @click="setPage('gpt')"
              class="lessonsetbtn"
              :class="{ clicked: currentPage === 'gpt' }"
            >
              <div class="flex">
                <h6 class="body1-bold">
                  {{ langlist[$store.state.lang]["GPT 대화 주제 설정"] }}
                </h6>
                <span
                  :class="{
                    unbeta: currentPage === 'gpt',
                    beta: currentPage !== 'gpt',
                  }"
                ></span>
              </div>
              <p class="body2">
                {{
                  langlist[$store.state.lang][
                    "대화 주제를 선생님이 직접 설정할 수 있습니다."
                  ]
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- 학생 과제 현황 -->
        <div class="scroll-card noselect">
          <div class="title">
            <h5 class="headline3">학생 과제 현황</h5>
            <span class="body2" style="color: #66686b">
              학생들의 개별 과제 현황을 확인합니다.
            </span>
          </div>
          <div class="card-content scrollbar">
            <div
              v-for="(j, i) in students"
              :key="i"
              :class="{
                on: currentPage === `student-${i + 1}`,
              }"
              class="content-btn"
              @click="studentClick(j)"
            >
              <p class="headline2">
                {{ (i + 1).toString().padStart(2, "0") }}
              </p>
              <p class="body1">
                {{ j.name }}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <section class="content-view">
        <manageMission
          v-if="currentPage === 'list'"
          :students="students"
        ></manageMission>
        <lessonsetting v-if="currentPage === 'lesson'"></lessonsetting>
        <gptsetting v-if="currentPage === 'gpt'"></gptsetting>
        <studentMission
          v-if="
            !['list', 'lesson', 'gpt'].includes(currentPage) && targetStudent
          "
          :stuInfo="targetStudent"
          :subject="'eng'"
        >
        </studentMission>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { userInfo, lessonInfo, openlessoninfo } from "../../api/api-list";
import { getLibraryStudentList } from "../../api/api-list-2";
import { classsetting_ko } from "../../assets/translate/ko";
import { classsetting_vt } from "../../assets/translate/vt";
import manageMission from "../../components/classsetting/manageMission.vue";
import lessonsetting from "../../components/classsetting/lessonsetting.vue";
import gptsetting from "../../components/classsetting/gptsetting.vue";
import studentMission from "../../components/classsetting/studentMission.vue";

const VALID_PAGES = ["list", "lesson", "gpt"];
const PUBLISHER_LIST = {
  CJ: "천재 교과서 (함순애)",
  CJL: "천재 교과서 (이동환)",
  CJK: "천재 교과서 (김태은)",
  DA: "동아 교과서",
  YBMK: "YBM 교과서 (김혜리)",
  YBMC: "YBM 교과서 (최희경)",
  IC: "아이스크림 교과서",
  MN: "미래엔 교과서",
  // DK: "대교 교과서",
  VS: "비상 교과서",
};

const router = useRouter();
const route = useRoute();

const currentPage = computed(() => {
  const {
    name: routeName,
    params: { id: studentId },
  } = route;
  return studentId ? `student-${studentId}` : routeName;
});

const lessons = ref([]);
const openlessons = ref([]);
const lessoninfo = ref({});
const userinfo = ref("");
const students = ref([]);
const targetStudent = computed(() => {
  const studentId = route.params.id;
  if (!studentId) return null;
  return students.value[parseInt(studentId, 10) - 1] || null;
});

const langlist = {
  ko: classsetting_ko,
  vt: classsetting_vt,
};

const formatLessons = (lessonData) =>
  lessonData.map((lessonName) => ({ lessonName, isOpen: false }));

const handleSaveLesson = (event) => {
  openlessons.value = event.detail.data;
};

const navigateTo = (pageName, params = {}) => {
  router.push({ name: pageName, params });
};

const studentClick = (item) => {
  if (!item || !students.value) return;
  const studentIndex = students.value.indexOf(item);
  if (studentIndex === -1) return;
  navigateTo("student-detail", { id: studentIndex + 1 });
};

const setPage = (pageName) => {
  if (!VALID_PAGES.includes(pageName)) return;
  navigateTo(pageName);
};

const settextbook = (publisher) => PUBLISHER_LIST[publisher] || publisher;

onMounted(async () => {
  const [userRes, lessonRes, openLessonRes, studentRes] = await Promise.all([
    userInfo(),
    lessonInfo(),
    openlessoninfo(),
    getLibraryStudentList(),
  ]);

  userinfo.value = userRes.data.data;
  lessons.value = formatLessons(lessonRes.data.data);
  openlessons.value = openLessonRes.data.data;
  students.value = studentRes.data.data;

  lessoninfo.value = {
    index: 0,
    name: lessons.value[0]?.lessonName || "",
  };

  window.addEventListener("savelesson", handleSaveLesson);
});

watch(
  () => route.params.id,
  (studentId) => {
    if (!studentId) return;
    const studentIndex = parseInt(studentId, 10) - 1;
    if (studentIndex < 0 || studentIndex >= students.value.length) {
      navigateTo("list");
    }
  }
);
</script>

<style scoped lang="scss">
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
  border: 1px solid #cae3ff;
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
  border: 1px solid #cae3ff;
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
  height: 55px;
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

  &.on {
    background-color: #258bff !important;
    .headline2,
    p {
      color: #fff;
    }
  }
}
.content-view {
  width: 880px;
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

  p {
    margin-top: 10px;
  }
}

.clicked {
  background-color: #258bff;
  border: none;
  background-image: url("../../assets/image/clickedarrow.png");

  h6,
  p {
    color: #fff;
  }
}
.lessonsetbtn h6 {
  color: #3480d8;
}

.beta {
  width: 40px;
  height: 18px;
  background-image: url("../../assets/image/beta.png");
  background-size: 100%;
  float: left;
  margin-left: 10px;
  margin-top: 5px;
}

.unbeta {
  width: 40px;
  height: 18px;
  background-image: url("../../assets/image/beta1.png");
  background-size: 100%;
  float: left;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
