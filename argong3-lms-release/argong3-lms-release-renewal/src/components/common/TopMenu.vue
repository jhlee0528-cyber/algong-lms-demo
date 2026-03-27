<template>
  <header>
    <div class="wrap-menu">
      <div class="nav-wrap">
        <div
          class="small-logo"
          @click="onClickTranfer('/learning/status')"
        ></div>

        <div
          v-if="subjectToggle === true && user_info.publisher !== 'SP'"
          class="subject-toggle"
        >
          <div
            @click="changeSubject('eng')"
            :class="{
              subjectSelectElementSelected: currentSubject === 'eng',
              subjectSelectElement: currentSubject === 'math',
            }"
          >
            <p>영어</p>
          </div>
          <div
            @click="changeSubject('math')"
            :class="{
              subjectSelectElementSelected: currentSubject === 'math',
              subjectSelectElement: currentSubject === 'eng',
            }"
          >
            <p>수학</p>
          </div>
        </div>

        <nav>
          <ul>
            <li
              :class="{
                content_selected: route.path.startsWith('/dashboard'),
                content: !route.path.startsWith('/dashboard'),
              }"
              @click="onClickTranfer('/dashboard')"
            >
              대시보드
            </li>
            <li
              :class="{
                content_selected: route.path.startsWith('/learning'),
                content: !route.path.startsWith('/learning'),
                long: $store.state.lang === 'vt',
              }"
              @click="onClickTranfer('/learning/status')"
            >
              {{ langList[store.state.lang]["학습현황"] }}
            </li>
            <li
              v-show="currentSubject === 'eng' && user_info.publisher !== 'SP'"
              :class="{
                content_selected: route.path.startsWith('/e-library'),
                content: !route.path.startsWith('/e-library'),
              }"
              @click="onClickTranfer('/e-library')"
            >
              e-library
            </li>
            <li
              v-show="user_info.publisher === 'SP'"
              :class="{
                content_selected: route.path.startsWith('/smartree'),
                content: !route.path.startsWith('/smartree'),
              }"
              @click="onClickTranfer('/smartree/contents/1')"
            >
              스마트리
            </li>
          </ul>
        </nav>
      </div>
      <div class="setting-wrap" style="z-index: 9">
        <p class="body1">
          알공 교습소
        </p>

        <div
          v-show="
            !route.path.startsWith('/setting') &&
            !route.path.startsWith('/e-book-reader')
          "
          class="wrap_dropdown"
        >
          <input
            class="dropdown"
            v-model="selectedBranch"
            @click="onClickBranch"
            readonly
          />
          <div
            v-show="
              route.name !== 'status-detail' &&
              route.name !== 'status-detail-math'
            "
            class="arrow"
            @click="onClickBranch"
          ></div>
          <div v-if="isBranchOpen" ref="DropdownRef" class="class-lists">
            <div
              v-for="(branch, index) in branches"
              :key="index"
              class="body2"
              @click="onClickBranchItem(branch, index)"
              :class="
                selectedBranchIndex === index
                  ? 'list_selected'
                  : 'list'
              "
            >
              {{ branch }}
            </div>
          </div>
        </div>

        <div class="setting" @click="onClickTranfer('/setting')"></div>

        <!-- 모바일 전용 코파일럿 버튼 (헤더 내 고정) -->
        <div class="mobile-copilot-btn" @click="onClickCopilot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>

        <div class="relatvie">
          <div class="question" @click.stop="onClickQuestion()"></div>
          <div v-show="isQuestionOpen" class="wrap-questions" ref="QuestionRef">
            <button @click="onClickNavigate('https://bit.ly/3PkiTh3')">
              {{ langList[store.state.lang]["이용 가이드"] }}
              <div class="foreign"></div>
            </button>
            <button @click="guideDownload()">
              이용 가이드 다운로드
              <div class="foreign"></div>
            </button>
            <button @click="onClickNavigate('https://4wlkw.channel.io/home')">
              {{ langList[store.state.lang]["문의하기"] }}
              <div class="foreign"></div>
            </button>
            <button
              @click="
                onClickNavigate(
                  'https://www.pluuug.com/form/rJkded4MHF'
                )
              "
            >
              {{ langList[store.state.lang]["교사 연수 신청"] }}
              <div class="foreign"></div>
            </button>
          </div>
        </div>

        <div class="logout" @click="onClickTranfer('logout')"></div>

        <!-- <div style="position: absolute; right: 5%">
          <languageSelectComponent></languageSelectComponent>
        </div> -->
      </div>
    </div>

    <!-- 모바일 하단 네비게이션 -->
    <div class="mobile-bottom-nav">
      <div
        class="mobile-nav-item"
        :class="{ active: route.path.startsWith('/dashboard') }"
        @click="onClickTranfer('/dashboard')"
      >
        <span class="nav-icon">🏠</span>
        <span class="nav-label">대시보드</span>
      </div>
      <div
        class="mobile-nav-item"
        :class="{ active: route.path.startsWith('/learning') }"
        @click="onClickTranfer('/learning/status')"
      >
        <span class="nav-icon">📊</span>
        <span class="nav-label">학습현황</span>
      </div>
      <div
        v-show="currentSubject === 'eng' && user_info.publisher !== 'SP'"
        class="mobile-nav-item"
        :class="{ active: route.path.startsWith('/e-library') }"
        @click="onClickTranfer('/e-library')"
      >
        <span class="nav-icon">📚</span>
        <span class="nav-label">e-library</span>
      </div>
      <div
        v-show="user_info.publisher === 'SP'"
        class="mobile-nav-item"
        :class="{ active: route.path.startsWith('/smartree') }"
        @click="onClickTranfer('/smartree/contents/1')"
      >
        <span class="nav-icon">🌳</span>
        <span class="nav-label">스마트리</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onClickOutside } from "@vueuse/core";
import { deleteCookie } from "../../store/cookie";
import { classlist, changeclass, userInfo } from "../../api/api-list";
import {
  changeCurrentSubject,
  classEngSummary,
  classMathSummary,
  getCurrentSubject,
} from "../../api/api-list-2";
import "../../styles/top_menu.scss";
import { topmenu_ko } from "../../assets/translate/ko";
import { topmenu_vt } from "../../assets/translate/vt";

const route = useRoute();
const router = useRouter();
const store = useStore();

const classes = ref([]);

const DropdownRef = ref(null);

const selected = ref({});
const selectedClass = ref("");
const isClassOpen = ref(false);
const isQuestionOpen = ref(false);

// 지점 관련 상태
const branches = ref([
  '서울 금천구 1호점',
  '서울 강남구 2호점',
  '서울 마포구 3호점',
  '경기 수원시 5호점',
  '부산 해운대구 9호점'
]);
const selectedBranch = ref('서울 금천구 1호점');
const selectedBranchIndex = ref(0);
const isBranchOpen = ref(false);

const showDropdown = ref(true);

const user_info = ref({});

const subjectToggle = ref(false);

const langList = ref({
  ko: topmenu_ko,
  vt: topmenu_vt,
});

const currentSubject = ref("");

// onBeforeMount(async () => {
//   targetLangList.value = langList.value[store.state.lang];
// });

onBeforeMount(async () => {
  const payPlan = await payPlanCheck();

  if (payPlan === "m") {
    currentSubject.value = "math";
  } else if (
    payPlan === "s" ||
    payPlan === "p" ||
    payPlan === "general" ||
    payPlan === "premium"
  ) {
    currentSubject.value = "eng";
  } else {
    currentSubject.value = store.state.currentSubject;
    subjectToggle.value = true;
  }
});

// outfoucus
onMounted(async () => {
  document.addEventListener("click", (event) => {
    if (event.target.className !== "wrap-questions") {
      isQuestionOpen.value = false;
    }
  });

  onClickOutside(DropdownRef, () => {
    isClassOpen.value = false;
    isBranchOpen.value = false;
  });

  document.addEventListener("click", handleOutsideClick);

  user_info.value = await store.dispatch("USERINFO");
  const class_list = (await classlist()).data.data;
  selected.value = {
    grade: user_info.value.grade,
    classNum: user_info.value.classNum,
  };

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < class_list.classList[i].length; j++) {
      classes.value.push({
        grade: i + 3,
        classNum: class_list.classList[i][j],
        publisher: class_list.publisherList[i][j],
      });
    }
  }

  if (store.state.lang === "ko") {
    selectedClass.value =
      user_info.value.grade +
      `${langList.value[store.state.lang]["학년"]} ` +
      user_info.value.classNum +
      `${langList.value[store.state.lang]["반"]}`;
  } else {
    selectedClass.value =
      `${langList.value[store.state.lang]["학년"]} ` +
      user_info.value.grade +
      " " +
      `${langList.value[store.state.lang]["반"]}` +
      " " +
      user_info.value.classNum;
  }

  if (route.path.startsWith("/setting")) {
    showDropdown.value = false;
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const payPlanCheck = async () => {
  const res = await userInfo();
  const check = res.data.data;

  return check.payPlan;
};

const onClickTranfer = (navigate) => {
  if (navigate === "logout") {
    deleteCookie("info");
    deleteCookie("info2");
    window.location.reload();
  } else {
    router.push({ path: navigate });
  }
};

const onClickCopilot = () => {
  // FloatingChatButton 클릭 시뮬레이션
  const floatingBtn = document.querySelector('.floating-button');
  if (floatingBtn) {
    floatingBtn.click();
  }
};

const onClickClass = () => {
  if (route.name === "status-detail" || route.name === "status-detail-math") {
    return;
  }

  isClassOpen.value = !isClassOpen.value;
};

const onclickList = async (info) => {
  const result = await changeclass(info);
  if (result) {
    isClassOpen.value = false;
    window.location.reload(true);
    // if(route.path !== '/learning/status') {
    //     window.location.href = '/learning/status'
    //     // router.push('/learning/status')
    // }
    // else { router.go(0) }
  } else {
    alert("문제가 발생하였습니다.");
  }
};

// 지점 선택 함수
const onClickBranch = () => {
  if (route.name === "status-detail" || route.name === "status-detail-math") {
    return;
  }
  isBranchOpen.value = !isBranchOpen.value;
};

const onClickBranchItem = (branch, index) => {
  selectedBranch.value = branch;
  selectedBranchIndex.value = index;
  isBranchOpen.value = false;

  // Vuex store에 현재 지점 업데이트
  store.commit('SET_CURRENT_BRANCH', branch);
  console.log(`${branch} 선택됨`);
};

const onClickQuestion = () => {
  isQuestionOpen.value = !isQuestionOpen.value;
};

const handleOutsideClick = (e) => {
  const QuestionRef = ref(null);
  if (QuestionRef.value && !QuestionRef.value.contains(e.target)) {
    isQuestionOpen.value = false;
  }
};

const guideDownload = () => {
  const link = document.createElement("a");

  const publicPath = process.env.BASE_URL || "/";
  link.href = `${publicPath}알공_사용설명서.pdf`;

  link.download = "알공_사용설명서.pdf";
  link.click();
};

const onClickNavigate = (path) => {
  window.open(path);
  isQuestionOpen.value = false;
};

const changeSubject = async (subject) => {
  if (currentSubject.value !== subject) {
    sessionStorage.removeItem("chatSessionId");

    currentSubject.value = subject;
    const res = await changeCurrentSubject({ subject });

    if (res.data.data) {
      if (
        route.name !== "e-library" &&
        route.name !== "status-detail" &&
        route.name !== "status-detail-math"
      ) {
        window.location.reload();
      } else {
        if (route.name === "e-library") {
          // 학습 현황으로 이동
          window.location.href = `${window.location.protocol}//${window.location.host}/learning/status`;
        } else {
          // 1학기 1단원으로 이동

          if (subject === "eng") {
            //영어로 이동
            await classEngSummary();

            window.location.href = `${window.location.protocol}//${
              window.location.host
            }/learning/${route.path.split("/")[3]}/1`;
          } else {
            //수학으로 이동
            await classMathSummary();

            window.location.href = `${window.location.protocol}//${
              window.location.host
            }/math/learning/${route.path.split("/")[2]}/1/1`;
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.long {
  width: 160px;
}

.subject-toggle {
  display: flex;
  margin: 10px 0;
  gap: 2px;
  padding: 6px;
  background-color: #eaf4ff;
  border-radius: 10px;
  margin-left: -10px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
  }
}

.subjectSelectElementSelected {
  background-color: #258bff;

  p {
    font-size: 14px;
    color: #fff;
    font-weight: 600;
  }
}

.subjectSelectElement {
  background-color: #eaf4ff;

  p {
    font-size: 14px;
    color: #67aeff;
    font-weight: 600;
  }
}

/* 모바일 하단 네비게이션 */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 767px) {
  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #e0e0e0;
    z-index: 1000;
    padding: 8px 0 12px;
    justify-content: space-around;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.2s;

    .nav-icon {
      font-size: 20px;
      filter: grayscale(100%);
      opacity: 0.5;
    }

    .nav-label {
      font-size: 10px;
      color: #9a9a9a;
      font-weight: 500;
    }

    &.active {
      .nav-icon {
        filter: none;
        opacity: 1;
      }
      .nav-label {
        color: #258aff;
        font-weight: 700;
      }
    }
  }

  /* 탑 메뉴 PC 네비 숨기기 */
  nav {
    display: none;
  }

  .wrap-menu {
    padding: 12px 16px;
    flex-wrap: wrap;
  }

  .setting-wrap {
    font-size: 12px;
    gap: 8px;

    .body1 {
      font-size: 12px;
    }

    .dropdown {
      font-size: 11px;
      max-width: 120px;
    }
  }

  .subject-toggle {
    margin-left: 0;
    padding: 4px;

    > div {
      padding: 4px 8px;

      p {
        font-size: 12px;
      }
    }
  }
}
</style>
