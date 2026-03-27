<template>
  <div class="wrap">
    <div class="inner">
      <aside>
        <div class="card noselect">
          <h5 class="headline3" v-show="$store.state.lang === 'ko'">
            {{ userinfo.grade }}학년 {{ userinfo.classNum }}반 수학 학습 설정
          </h5>
          <h5 class="headline3" v-show="$store.state.lang !== 'ko'">
            {{ langlist[$store.state.lang]["학년"] }} {{ userinfo.grade }}
            {{ langlist[$store.state.lang]["반"] }} {{ userinfo.classNum }}
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
              @click="setPage('lesson')"
              class="lessonsetbtn"
              :class="{ clicked: currentPage === 'lesson' }"
            >
              <h6 class="body1-bold">
                {{ langlist[$store.state.lang]["학습 단원 설정"] }}
              </h6>
              <p v-show="$store.state.lang === 'ko'" class="body2">
                {{ openUnits.length }}개 중
                {{ openUnits.filter((item) => item.isOpen === true).length }}개
                단원 학습이 열려있습니다.
              </p>
              <p v-show="$store.state.lang !== 'ko'" class="body2">
                {{
                  langlist[$store.state.lang]["학습할 단원 설정이 가능합니다."]
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- 학생 과제 상세 -->
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
        <mathManageMission
          v-if="currentPage === 'list'"
          :students="students"
        ></mathManageMission>

        <lessonsetting
          v-if="currentPage === 'lesson'"
          :lessons="openUnits"
        ></lessonsetting>

        <StudentMission
          v-if="!['list', 'lesson'].includes(currentPage) && targetStudent"
          :stuInfo="targetStudent"
          :subject="'math'"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import lessonsetting from "../../../components/classsetting/math/mathLessonSetting.vue";
import { getOpenUnitList } from "../../../api/math-api-list";
import { classsetting_ko } from "../../../assets/translate/ko";
import { classsetting_vt } from "../../../assets/translate/vt";
import { userInfo } from "../../../api/api-list";
import mathManageMission from "../../../components/classsetting/math/mathManageMission.vue";
import { getLibraryStudentList } from "../../../api/api-list-2";
import StudentMission from "../../../components/classsetting/studentMission.vue";

const VALID_PAGES = ["list", "lesson"];

const router = useRouter();
const route = useRoute();

const langlist = {
  ko: classsetting_ko,
  vt: classsetting_vt,
};

const currentPage = computed(() => {
  const {
    name: routeName,
    params: { id: studentId },
  } = route;
  return studentId ? `student-${studentId}` : routeName;
});
const openUnits = ref([]);
const userinfo = ref("");
const students = ref([]);
const targetStudent = computed(() => {
  const studentId = route.params.id;
  if (!studentId) return null;
  return students.value[parseInt(studentId, 10) - 1] || null;
});

const navigateTo = (pageName, params = {}) => {
  router.push({ name: pageName, params });
};

const setPage = (pageName) => {
  if (!VALID_PAGES.includes(pageName)) return;
  navigateTo(pageName);
};

const studentClick = (item) => {
  if (!item || !students.value) return;
  const studentIndex = students.value.indexOf(item);
  if (studentIndex === -1) return;
  navigateTo("student-detail", { id: studentIndex + 1 });
};

onMounted(async () => {
  userinfo.value = (await userInfo()).data.data;
  openUnits.value = (await getOpenUnitList()).data.data;
  students.value = (await getLibraryStudentList()).data.data;
});
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  min-width: 1400px;
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
  background-image: url("../../../assets/image/unclickedarrow.png");
  background-size: 3%;
  background-position-x: 95%;
  background-position-y: 50%;
  cursor: pointer;

  h6 {
    color: #3d90ef;
  }
  p {
    margin-top: 10px;
  }
}

.clicked {
  background-color: #258bff;
  border: none;
  background-image: url("../../../assets/image/clickedarrow.png");

  h6,
  p {
    color: #fff;
  }
}

.beta {
  width: 40px;
  height: 18px;
  background-image: url("../../../assets/image/beta.png");
  background-size: 100%;
  float: left;
  margin-left: 10px;
  margin-top: 5px;
}

.unbeta {
  width: 40px;
  height: 18px;
  background-image: url("../../../assets/image/beta1.png");
  background-size: 100%;
  float: left;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
