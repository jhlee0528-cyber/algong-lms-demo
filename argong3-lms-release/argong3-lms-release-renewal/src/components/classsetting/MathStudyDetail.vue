<template>
  <div class="border">
    <div class="inner">
      <div class="content-header">
        <h4>상세 학습 결과</h4>
        <div
          class="toggle"
          v-if="
            detailMission.missionTypeText.missionType === 1 ||
            detailMission.missionTypeText.missionType === 2
          "
        >
          <button @click="toggleAll">
            {{
              results.every((result) => result.isOpen)
                ? "전체 접기"
                : "전체 펼치기"
            }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                :d="
                  results.every((result) => result.isOpen)
                    ? 'M12.822 8.18645C12.4243 7.61244 11.5757 7.61244 11.178 8.18645L5.29315 16.6805C4.83367 17.3437 5.30833 18.25 6.11514 18.25H17.8849C18.6917 18.25 19.1663 17.3437 18.7069 16.6805L12.822 8.18645Z'
                    : 'M12.822 17.8136C12.4243 18.3876 11.5757 18.3876 11.178 17.8136L5.29315 9.31949C4.83367 8.65629 5.30833 7.75 6.11514 7.75L17.8849 7.75C18.6917 7.75 19.1663 8.65629 18.7069 9.3195L12.822 17.8136Z'
                "
                fill="#525252"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="
          detailMission.missionTypeText.missionType === 1 ||
          detailMission.missionTypeText.missionType === 2
        "
        class="inner"
      >
        <div class="search-bar">
          <div>
            <div>
              <p>난이도</p>
              <div class="checkbox-wrap">
                <div>
                  <input
                    :checked="levelToggle.every((v) => v)"
                    @change="toggleAllLevel($event)"
                    type="checkbox"
                    value="all"
                  />
                  <label for="all">전체</label>
                </div>
                <div>
                  <input v-model="levelToggle[2]" type="checkbox" value="3" />
                  <label for="3">상</label>
                </div>
                <div>
                  <input v-model="levelToggle[1]" type="checkbox" value="2" />
                  <label for="2">중</label>
                </div>
                <div>
                  <input v-model="levelToggle[0]" type="checkbox" value="1" />
                  <label for="1">하</label>
                </div>
              </div>
            </div>
            <div>
              <p>정답여부</p>
              <div class="checkbox-wrap">
                <div>
                  <input
                    :checked="answerToggle.every((v) => v)"
                    @change="toggleAllAnswer($event)"
                    type="checkbox"
                    id="all"
                    value="all"
                  />
                  <label for="all">전체</label>
                </div>
                <div>
                  <input v-model="answerToggle[0]" type="checkbox" value="0" />
                  <label for="0">정답</label>
                </div>
                <div>
                  <input v-model="answerToggle[2]" type="checkbox" value="2" />
                  <label for="2">오답</label>
                </div>
                <div>
                  <input v-model="answerToggle[1]" type="checkbox" value="1" />
                  <label for="1">즉시 다시 풀어서 맞춤</label>
                </div>
              </div>
            </div>
          </div>

          <button class="searchBtn" @click="questionSearch()">검색</button>
        </div>

        <section class="flex-column-gap">
          <div v-if="detailMission.questions.length === 0" class="no-data">
            <p class="body1">학습 결과가 없습니다.</p>
          </div>
          <article v-for="(result, index) in results" :key="index">
            <div class="article-header" @click="toggleArticle(index)">
              <h5>{{ result.title }}</h5>
              <div class="toggle-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    :d="
                      result.isOpen
                        ? 'M8.83224 4.24929C8.43646 3.65517 7.56354 3.65517 7.16776 4.24928L2.54032 11.1956C2.0976 11.8602 2.57402 12.75 3.37256 12.75L12.6274 12.75C13.426 12.75 13.9024 11.8602 13.4597 11.1956L8.83224 4.24929Z'
                        : 'M8.83224 12.7507C8.43646 13.3448 7.56354 13.3448 7.16776 12.7507L2.54032 5.80442C2.0976 5.13984 2.57402 4.25 3.37256 4.25L12.6274 4.25C13.426 4.25 13.9024 5.13984 13.4597 5.80442L8.83224 12.7507Z'
                    "
                    fill="#525252"
                  />
                </svg>
              </div>
            </div>
            <div class="article-content">
              <div style="display: flex; justify-content: space-between">
                <div class="summary">
                  <p class="total-questions">
                    총 문제수: {{ result.questionLength }}개
                  </p>
                  <p class="filter-results">
                    필터 결과: {{ result.filterLength }}건
                  </p>
                </div>
                <div class="progress-bar">
                  <div class="info">
                    <span>정답률</span>
                    <span>{{ result.answerPercent || 0 }}%</span>
                  </div>
                  <div
                    class="chart_blue-bg"
                    style="
                      width: 328px;
                      height: 8px;
                      background: #eee;
                      margin-top: 5px;
                    "
                  >
                    <div
                      class="chart_bar"
                      :class="{
                        answerTop: result.answerPercent > 66,
                        answerMid:
                          result.answerPercent > 33 &&
                          result.answerPercent <= 66,
                        answerBot: result.answerPercent <= 33,
                      }"
                      :style="{
                        width: `${result.answerPercent}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>

              <div v-show="result.isOpen">
                <div class="line-border"></div>

                <div class="question-list">
                  <div class="title">
                    <h5>풀이한 문제</h5>
                    <div class="icon">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="6.4"
                            stroke="#10D298"
                            stroke-width="1.2"
                          />
                        </svg>
                        맞춘 문제
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M7.78349 2.875C7.87972 2.70833 8.12028 2.70833 8.21651 2.875L14.2787 13.375C14.3749 13.5417 14.2546 13.75 14.0622 13.75H1.93782C1.74537 13.75 1.62509 13.5417 1.72132 13.375L7.78349 2.875Z"
                            stroke="#FFAC4B"
                            stroke-width="1.5"
                          />
                        </svg>
                        즉시 다시 풀어서 맞춘 문제
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M1.89453 2L13.9389 14.0444"
                            stroke="#FF5A83"
                            stroke-width="1.2"
                            stroke-linecap="round"
                          />
                          <path
                            d="M13.9375 2L1.8931 14.0444"
                            stroke="#FF5A83"
                            stroke-width="1.2"
                            stroke-linecap="round"
                          />
                        </svg>
                        틀린 문제
                      </p>
                    </div>
                  </div>
                  <div class="list-container">
                    <div
                      v-for="(question, i) in result.questions[currentPage - 1]"
                      :key="i"
                      class="item"
                    >
                      <div class="item-header">
                        <div class="flex">
                          <div
                            :class="{
                              level3: question.level === 3,
                              level2: question.level === 2,
                              level1: question.level === 1,
                            }"
                          >
                            {{ levelText(question.level) }}
                          </div>
                          <span>{{ question.time }}초 소요</span>
                        </div>
                        <span> {{ question.date }}</span>
                      </div>
                      <div class="item-content">
                        <button
                          class="answerImage"
                          @click.stop="showAimg(question.date)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.5 7.17069C0.500152 6.10895 0.753688 5.06257 1.23954 4.11853C1.72539 3.17449 2.42952 2.36004 3.29341 1.74288C4.1573 1.12571 5.15601 0.723658 6.20652 0.570124C7.25704 0.41659 8.32903 0.516013 9.3334 0.860128C10.3378 1.20424 11.2455 1.78311 11.9812 2.54863C12.7168 3.31415 13.2592 4.2442 13.5632 5.2615C13.8671 6.27879 13.9239 7.35395 13.7288 8.39761C13.5338 9.44127 13.0924 10.4233 12.4415 11.2621L15.2659 14.0867C15.4178 14.244 15.5019 14.4546 15.5 14.6733C15.4981 14.892 15.4104 15.1011 15.2558 15.2557C15.1011 15.4104 14.892 15.4981 14.6733 15.5C14.4547 15.5019 14.2441 15.4178 14.0868 15.2659L11.2623 12.4413C10.2762 13.2069 9.09505 13.6805 7.85316 13.8081C6.61126 13.9358 5.35848 13.7123 4.23726 13.1632C3.11604 12.6141 2.17138 11.7614 1.51071 10.7021C0.850038 9.64271 0.499861 8.41921 0.5 7.17069ZM8.00512 4.66882C8.00512 4.44765 7.91727 4.23553 7.76088 4.07913C7.60449 3.92273 7.39239 3.83487 7.17122 3.83487C6.95006 3.83487 6.73795 3.92273 6.58156 4.07913C6.42518 4.23553 6.33732 4.44765 6.33732 4.66882V6.33674H4.66951C4.44835 6.33674 4.23624 6.4246 4.07985 6.581C3.92347 6.73739 3.83561 6.94951 3.83561 7.17069C3.83561 7.39187 3.92347 7.60399 4.07985 7.76039C4.23624 7.91678 4.44835 8.00465 4.66951 8.00465H6.33732V9.67256C6.33732 9.89374 6.42518 10.1059 6.58156 10.2623C6.73795 10.4187 6.95006 10.5065 7.17122 10.5065C7.39239 10.5065 7.60449 10.4187 7.76088 10.2623C7.91727 10.1059 8.00512 9.89374 8.00512 9.67256V8.00465H9.67293C9.89409 8.00465 10.1062 7.91678 10.2626 7.76039C10.419 7.60399 10.5068 7.39187 10.5068 7.17069C10.5068 6.94951 10.419 6.73739 10.2626 6.581C10.1062 6.4246 9.89409 6.33674 9.67293 6.33674H8.00512V4.66882Z"
                              fill="#3D90EF"
                            />
                          </svg>
                        </button>
                        <div style="height: 160px; width: 100%">
                          <img
                            style="width: 100%"
                            :src="question.q_imgURL"
                            alt=""
                          />
                          <div style="display: flex; justify-content: center">
                            <div v-if="question.options.length !== 0">
                              <div
                                v-for="(text, textIndex) in question.options"
                                :key="textIndex"
                                style="
                                  color: black;
                                  font-size: 12px;
                                  display: flex;
                                  justify-content: center;
                                  flex-direction: column;
                                  float: left;
                                "
                              >
                                <p
                                  style="color: black"
                                  v-if="
                                    question.answer !==
                                    (textIndex + 1).toString()
                                  "
                                >
                                  {{ numbers[textIndex] }}
                                  {{ text }}&nbsp;&nbsp;
                                </p>
                                <b
                                  v-if="
                                    question.answer ===
                                    (textIndex + 1).toString()
                                  "
                                  >{{ numbers[textIndex] }}
                                  {{ text }}&nbsp;&nbsp;</b
                                >
                              </div>
                            </div>
                            <div v-else>
                              <div
                                style="
                                  color: black;
                                  font-size: 12px;
                                  display: flex;
                                  justify-content: center;
                                  flex-direction: column;
                                "
                              >
                                <b>정답: {{ question.answer }}</b>
                              </div>
                            </div>
                          </div>
                        </div>

                        <img
                          class="answer-img"
                          v-show="a_imgURL === question.date"
                          :src="question.a_imgURL"
                          alt="answer"
                        />
                      </div>
                      <div class="item-bottom">
                        <svg
                          v-if="question.retry === 0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#10D298"
                            stroke-width="2"
                          />
                        </svg>
                        <svg
                          v-else-if="question.retry === 1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_18932_8921)">
                            <path
                              d="M11.5 3L21.8923 21H1.1077L11.5 3Z"
                              stroke="#FFAC4B"
                              stroke-width="2"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_18932_8921">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M2 2L21.799 21.799"
                            stroke="#FF5A83"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                          <path
                            d="M21.8008 2L2.00179 21.799"
                            stroke="#FF5A83"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <div v-if="question.clear === true">
                          <p
                            v-for="(
                              submitAnswer, submitAnswerIndex
                            ) in question.submitAnswers.slice(0, 2)"
                            :key="submitAnswerIndex"
                          >
                            학생제출: {{ submitAnswer }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="result.questions.length > 0">
                    <v-pagination
                      v-model="currentPage"
                      :length="result.questions.length"
                      :size="30"
                      total-visible="8"
                      color="blue"
                      class="pagination-default"
                    ></v-pagination>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>

      <div v-if="detailMission.missionTypeText.missionType === 3">
        <div class="playzone">
          <p class="playzone-text">
            플레이존의 교구활동은 디지털 교구를 이용하여, 문제에서 요구하는 모양
            또는 숫자 등을 맞추도록 제작 되었습니다.<br />
            다양한 교구 활동을 통해 기본 개념을 이해할 수 있으며, 해당
            단원에서는 아래 교구를 활용하여 학습을 진행했습니다.
          </p>

          <h6>&lt;{{ playzoneTitle }}&gt;</h6>
          <div class="playzone-images">
            <img
              v-for="(img, index) in playzoneImages"
              :key="index"
              :src="img"
              :alt="'Playzone image ' + (index + 1)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import playzoneData from "@/assets/playzone.json";

const props = defineProps({
  detailMission: {
    type: Object,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const results = ref([]);
const originalResults = ref([]);
const currentPage = ref(1);
const levelToggle = ref([true, true, true]);
const answerToggle = ref([true, true, true]);
const a_imgURL = ref(null);
const numbers = ["①", "②", "③", "④", "⑤"];
const playzoneImages = ref([]);
const playzoneTitle = ref("");

const CHUNK_SIZE = 9;

const levelText = (level) => ["하", "중", "상"][level - 1] || "";

// ✅ 정답률 계산
function calculateAnswerPercent(arr) {
  if (!arr.length) return 0;
  const scoreMap = [100, 50, 0]; // retry = 0, 1, 2
  const total = arr.length * 100;
  const studentScore = arr.reduce(
    (sum, q) => sum + (scoreMap[q.retry] ?? 0),
    0
  );
  return Math.round((studentScore / total) * 100);
}

// ✅ 문제 데이터 가공
function getMappedQuestions(questions) {
  return questions
    .filter((el) => el && el.q_img_index)
    .map((el) => {
      const targetIndex = el.q_img_index.split("_")[2];
      const grade = targetIndex[0];
      const semester = targetIndex[1];
      const unit = targetIndex[2].padStart(2, "0");

      return {
        ...el,
        q_imgURL: `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/question/${el.q_img_index}.png`,
        a_imgURL: `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/answer/${el.a_img_index}.png`,
        submitAnswers: el.options?.length
          ? el.submitAnswers.map(
              (val) => `${val}번 (${el.options[parseInt(val - 1)]})`
            )
          : el.submitAnswers,
      };
    });
}

// ✅ lesson 기준으로 묶기
function groupByLesson(questions) {
  return questions.reduce((map, q) => {
    if (!map[q.lesson]) map[q.lesson] = [];
    map[q.lesson].push(q);
    return map;
  }, {});
}

// ✅ 묶은 데이터를 results 형태로 구성
function buildLessonResults(grouped) {
  return Object.entries(grouped).map(([lesson, qs]) => {
    const chunks = [];
    for (let i = 0; i < qs.length; i += CHUNK_SIZE) {
      chunks.push(qs.slice(i, i + CHUNK_SIZE));
    }

    return {
      lesson,
      title: `${lesson}차시`,
      questions: chunks,
      answerPercent: calculateAnswerPercent(qs),
      questionLength: qs.length,
      filterLength: qs.length,
      isOpen: false,
    };
  });
}

// ✅ 전체 문제 가공 함수
function processQuestions() {
  if (!props.detailMission?.questions) return;
  const mapped = getMappedQuestions(props.detailMission.questions);
  const grouped = groupByLesson(mapped);
  results.value = buildLessonResults(grouped);
  originalResults.value = JSON.parse(JSON.stringify(results.value));
}

// ✅ playzone 이미지 불러오기
function loadPlayzoneImages() {
  const info = props.detailMission?.mathLessonInfo;
  if (!info) return;

  const matching = playzoneData.filter(
    (item) =>
      item.grade === props.grade &&
      item.semester === info.semester &&
      item.unit === info.unit
  );

  if (matching.length > 0) {
    const item = matching[0];
    playzoneTitle.value = item.playzonetitle;
    playzoneImages.value = [];

    for (let i = 0; i < 5; i++) {
      const key = `tutorial_img/${i}`;
      if (item[key]?.trim()) {
        playzoneImages.value.push(item[key]);
      }
    }
  }
}

// ✅ 전부 열기/닫기
function toggleAll() {
  const allOpen = results.value.every((r) => r.isOpen);
  results.value.forEach((r) => (r.isOpen = !allOpen));
}
function toggleArticle(index) {
  results.value[index].isOpen = !results.value[index].isOpen;
}

// ✅ 전체 토글
function toggleAllLevel(e) {
  levelToggle.value = [e.target.checked, e.target.checked, e.target.checked];
}
function toggleAllAnswer(e) {
  answerToggle.value = [e.target.checked, e.target.checked, e.target.checked];
}

// ✅ 필터 적용
function getActiveFilters() {
  return {
    levels: levelToggle.value
      .map((v, i) => (v ? i + 1 : null))
      .filter((v) => v !== null),
    retries: answerToggle.value
      .map((v, i) => (v ? i : null))
      .filter((v) => v !== null),
  };
}

function questionSearch() {
  const { levels, retries } = getActiveFilters();

  results.value = originalResults.value.map((result) => {
    const allQs = result.questions.flat();
    const filtered = allQs.filter(
      (q) => levels.includes(q.level) && retries.includes(q.retry)
    );

    const chunks = [];
    for (let i = 0; i < filtered.length; i += CHUNK_SIZE) {
      chunks.push(filtered.slice(i, i + CHUNK_SIZE));
    }

    return {
      ...result,
      questions: chunks,
      filterLength: filtered.length,
      answerPercent: filtered.length ? calculateAnswerPercent(filtered) : 0,
    };
  });

  currentPage.value = 1;
}

// ✅ 정답 이미지 보기
function showAimg(url) {
  a_imgURL.value = a_imgURL.value === url ? null : url;
}

// ✅ detailMission 감시
watch(
  () => props.detailMission,
  (newVal) => {
    if (!newVal) return;
    const isPlayzone = newVal.missionTypeText?.missionType === 3;

    if (isPlayzone) {
      loadPlayzoneImages();
    } else if (newVal.questions?.length) {
      processQuestions();
    } else {
      results.value = [];
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
.inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.border {
  padding: 20px;
  border: 1px solid #cae3ff !important;
  border-radius: 16px;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toggle {
  display: flex;
  align-items: center;
  gap: 20px;

  > button {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
}
.flex-column-gap {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.no-data {
  padding: 100px 20px;
  text-align: center;
}
.search-bar {
  background: #dbecff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    gap: 50px;
    padding: 15px 20px 25px;

    @media (max-width: 800px) {
      flex-direction: column;
      gap: 20px;
      padding: 15px 15px 20px;
    }
  }
}

.search-bar p {
  font-size: 16px;
  font-weight: 700;
  color: #292929;
}
.checkbox-wrap {
  display: flex;
  gap: 20px;
  margin-top: 14px;
  font-size: 14px;
}

.checkbox-wrap > div {
  display: flex;
  gap: 5px;
  align-items: center;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  border: 1px solid #88c0ff;
  border-radius: 2px;
  cursor: pointer;
  height: 20px;
  outline: 0;
  width: 20px;
}

input[type="checkbox"]::after {
  border: solid #fff;
  border-width: 0 2px 2px 0;
  content: "";
  display: none;
  height: 40%;
  left: 40%;
  position: relative;
  top: 20%;
  transform: rotate(45deg);
  width: 25%;
}

input[type="checkbox"]:checked {
  background: #3d90ef;
}

input[type="checkbox"]:checked::after {
  display: block;
}

.searchBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  background: #258bff;
  color: #fff;
  border-radius: 6px;
  font-size: 16px;
  margin-right: 20px;
  white-space: nowrap;
}

.searchBtn:hover {
  filter: brightness(0.7);
}
.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cae3ff;
  padding: 10px 20px;
  background: #eaf4ff;
  cursor: pointer;
  border-radius: 9px 9px 0 0;
}

.article-header h5 {
  font-size: 18px;
  font-weight: 700;
  color: #525252;
}

.article-content {
  border: 1px solid #cae3ff;
  padding: 15px 20px 25px;
  border-radius: 0 0 9px 9px;
  border-top: none;
}

.progress-bar {
  width: 328px;
}
.info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}

.info span {
  font-size: 14px;
}

.chart_blue-bg {
  width: 328px;
  height: 8px;
  background: #eee;
}

.line-border {
  border-top: 1px solid #cae3ff;
  display: flex;
  margin: 30px 0;
}

.summary {
  display: flex;
  align-items: center;
  gap: 50px;
}

.total-questions {
  font-size: 16px;
  color: #292929;
}

.filter-results {
  font-size: 16px;
  color: #3d90ef;
}

.question-list .title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.question-list h5 {
  font-size: 16px;
  font-weight: 700;
}

.question-list .icon {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #9a9a9a;
  font-weight: 500;
  font-size: 14px;
}

.question-list .icon p {
  display: flex;
  align-items: center;
  gap: 5px;
}

.question-list .list-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 15px 0;
}
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cae3ff;
  padding: 10px;
  border-radius: 9px 9px 0 0;
  background: #eaf4ff;

  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.item-header span {
  font-size: 12px;
}

.level3 {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #ff5a83;
}
.level2 {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #ffac4b;
}
.level1 {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #10d298;
}
.item-content {
  position: relative;
  border-right: 1px solid #cae3ff;
  border-left: 1px solid #cae3ff;
  padding: 8px 10px;
  height: 172px;
}
.item-content p {
  color: #ccc;
  font-size: 12px;
}
.item-content button {
  position: absolute;
  top: 7px;
  right: 7px;
}
.item-bottom {
  display: flex;
  height: 44px;
  align-items: center;
  gap: 10px;
  border: 1px solid #cae3ff;
  padding: 0 10px;
  border-radius: 0 0 9px 9px;
  background: #f1f8ff;
  font-size: 12px;
}

.answerBot {
  background: #f399af;
}

.answerMid {
  background: #fdce96;
}

.answerTop {
  background: #90e4cb;
}

.playzone {
  text-align: center;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  h6 {
    font-size: 18px;
  }
}
.playzone-text {
  width: 100%;
  max-width: 800px;
  background: #dcecff;
  border-radius: 12px;
  padding: 20px;
}
.playzone-images {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid #cae3ff;
  }
}
.answer-img {
  width: 300px;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #cae3ff;
  border-radius: 10px;
  z-index: 9999;
}
</style>
