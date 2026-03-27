<template>
  <div class="flex-column-gap">
    <p style="margin-left: 10px">
      <span class="bold-text"
        >차시 평가 결과를 기준으로 학생 수준에 맞는 단원 학습을
        진행합니다.</span
      >
      학생 화면에서는
      <span class="bold-text">‘매스헌터’ > ‘보스전’</span> 단계입니다.
    </p>

    <WrapContent style="width: 880px; padding: 24px 30px 30px">
      <h4 class="headline2">수준별 학습 결과</h4>
      <section class="flex-space-between">
        <article class="flex-column-center">
          <div>
            <div style="margin-top: 30px" v-if="completeFlag" class="circle">
              <p class="circle-text">
                {{ answerPercentInfo.totalScore
                }}<span style="display: block; font-size: 16px">점</span>
              </p>
            </div>
            <div style="margin-top: 20px" v-if="!completeFlag">
              <p>학습이 진행중입니다.</p>
              <p style="margin-top: 3px">15문제 학습 완료 후,</p>
              <p style="margin-top: 3px">종합 결과를 확인할 수 있습니다.</p>
            </div>
            <div style="margin-top: 30px" v-if="mathLevel !== -1">
              <p class="average-score">
                <span class="score-highlight"
                  >{{ mathLevelText(mathLevel) }}&nbsp;</span
                >학습자<br />
                수준별 학습 결과
              </p>
            </div>
          </div>
        </article>
        <article class="flex-column-center">
          <p class="level-text">난이도별 성취도</p>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <div>
              <div class="info">
                <span>상</span>
                <span>{{ answerPercentInfo.topScore || 0 }}%</span>
              </div>
              <div
                class="chart_blue-bg"
                style="width: 328px; height: 12px; background: #eee"
              >
                <div
                  class="chart_bar"
                  :style="{
                    width: `${answerPercentInfo.topScore || 0}%`,
                  }"
                  style="background: #ff5a83"
                ></div>
              </div>
            </div>
            <div>
              <div class="info">
                <span>중</span>
                <span>{{ answerPercentInfo.midScore || 0 }}%</span>
              </div>
              <div
                class="chart_blue-bg"
                style="width: 328px; height: 12px; background: #eee"
              >
                <div
                  class="chart_bar"
                  :style="{
                    width: `${answerPercentInfo.midScore || 0}%`,
                  }"
                  style="background: #ffac4b"
                ></div>
              </div>
            </div>
            <div>
              <div class="info">
                <span>하</span>
                <span>{{ answerPercentInfo.botScore || 0 }}%</span>
              </div>
              <div
                class="chart_blue-bg"
                style="width: 328px; height: 12px; background: #eee"
              >
                <div
                  class="chart_bar"
                  :style="{
                    width: `${answerPercentInfo.botScore}%`,
                  }"
                  style="background: #10d298"
                ></div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </WrapContent>

    <WrapContent style="width: 880px; padding: 24px 30px">
      <div class="content-header">
        <h4 class="headline2">상세 학습 결과</h4>
        <div style="display: flex; align-items: center; gap: 20px">
          <button @click="toggleAll" style="display: flex; align-items: center">
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

      <section class="flex-column-gap">
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
              <div class="progress-bar">
                <div class="info">
                  <span>진행률</span>
                  <span>{{ result.clearCount }}/3</span>
                </div>
                <div class="chart_blue-bg">
                  <div
                    class="chart_bar"
                    :style="{
                      width: `${caculateLessonProgress(result.clearCount)}%`,
                    }"
                    style="background: #88c0ff"
                  ></div>
                </div>
              </div>

              <div class="progress-bar">
                <div class="info">
                  <span>정답률</span>
                  <span>{{ result.answerPercent }}%</span>
                </div>
                <div
                  class="chart_blue-bg"
                  style="width: 328px; height: 8px; background: #eee"
                >
                  <div
                    class="chart_bar"
                    :class="{
                      answerTop: result.answerPercent > 66,
                      answerMid:
                        result.answerPercent > 33 && result.answerPercent <= 66,
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
                  <!-- 문제풀이 ver. 상 -->
                  <div
                    v-for="(question, i) in result.questions"
                    :key="i"
                    class="item"
                  >
                    <div v-if="question.q_imgURL">
                      <div class="item-header">
                        <div
                          style="display: flex; align-items: center; gap: 10px"
                        >
                          <div
                            :class="{
                              leveltop: question.level === 3,
                              levelmid: question.level === 2,
                              levelbot: question.level === 1,
                            }"
                          >
                            {{ levelText(question.level) }}
                          </div>
                          <span>{{ question.time }}초 소요</span>
                        </div>
                        <span>{{
                          dayjs(question.date).format("YYYY.MM.DD(dd) HH:mm:ss")
                        }}</span>
                      </div>
                      <div class="item-content">
                        <button
                          class="answerImage"
                          @click.stop="showAimg(question.a_imgURL)"
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
                          <!-- 객관식 보기 추가 -->
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
                            <div v-if="question.options.length === 0">
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
                          class="answerImage"
                          v-show="a_imgURL === question.a_imgURL"
                          style="
                            width: 400px;
                            position: absolute;
                            background-color: white;
                            border: 1px solid #cae3ff;
                            border-radius: 10px;
                            z-index: 9999;
                            margin-top: -150px;
                            margin-left: 230px;
                          "
                          :src="question.a_imgURL"
                          alt=""
                        />
                      </div>
                      <div class="item-bottom">
                        <svg
                          v-show="question.retry === 0"
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
                          v-show="question.retry === 1"
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
                          v-show="question.retry > 1"
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
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </WrapContent>
  </div>
</template>

<script setup>
import WrapContent from "../../../components/common/WrapContent.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getBossResult } from "../../../api/math-api-list";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일 추가
import weekday from "dayjs/plugin/weekday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import { onBeforeMount, onMounted, ref } from "vue";

dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.locale("ko");

const store = useStore();
const route = useRoute();
const info = ref(route.path.split("/"));

const id = ref(info.value[3]);
const semester = ref(parseInt(info.value[4]));
const unit = ref(parseInt(info.value[5]));

const answerPercentInfo = ref({});
const completeFlag = ref(false);
const mathLevel = ref(-1);
const questions = ref([[], [], [], [], []]);

const results = ref([]);

const toggleArticle = (index) => {
  results.value[index].isOpen = !results.value[index].isOpen;
};

const toggleAll = () => {
  const allOpen = results.value.every((result) => result.isOpen);
  results.value.forEach((result) => {
    result.isOpen = !allOpen;
  });
};

const a_imgURL = ref("");

const numbers = ref(["①", "②", "③", "④", "⑤"]);

const levelText = (num) => {
  let arr = ["하", "중", "상"];

  return arr[num - 1];
};

const caculateLessonProgress = (cnt) => {
  return Math.round((cnt / 3) * 100);
};

const showAimg = (str) => {
  if (a_imgURL.value === str) {
    a_imgURL.value = "";
  } else {
    a_imgURL.value = str;
  }
};

const mathLevelText = (mathLevel) => {
  if (mathLevel === -1) {
    return "";
  } else {
    let arr = ["느린", "보통", "빠른"];
    return arr[mathLevel];
  }
};

const caculateAnswerPercent = (arr) => {
  const lessonWeightTable = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];
  const levelScoreTable = [
    [1, 0.5, 0],
    [1.5, 0.8, 0],
    [2, 1.2, 0],
  ];

  let allScore = 0;
  let stuScore = 0;

  for (let i = 0; i < arr.length; i++) {
    const target = arr[i];
    allScore +=
      levelScoreTable[target.level - 1][0] *
      lessonWeightTable[target.lesson - 1];
    stuScore +=
      levelScoreTable[target.level - 1][target.retry] *
      lessonWeightTable[target.lesson - 1];
  }

  if (!allScore) {
    return 0;
  }

  return Math.round((stuScore / allScore) * 100);
};

onBeforeMount(async () => {
  const data = (
    await getBossResult({
      id: id.value,
      semester: semester.value,
      unit: unit.value,
    })
  ).data.data;

  const { answerPercentage, complete, questionList } = data;

  mathLevel.value = data.mathLevel;

  answerPercentInfo.value = answerPercentage;
  completeFlag.value = complete;

  let questionInfo = [];
  for (let i = 0; i < 5; i++) {
    const clearCount = questionList[i].filter(
      (item) => item.clear === true
    ).length;

    const questionPhase = questionList[i].map((el) => {
      if (el.clear) {
        const targetIndex = el.q_img_index.split("_")[2];
        const grade = targetIndex[0];
        const semester = targetIndex[1];
        const unit = targetIndex[2].padStart(2, "0");
        const q_imgURL = `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/question/${el.q_img_index}.png`;
        const a_imgURL = `https://argame3.blob.core.windows.net/math-learning-resources-test/${grade}-${semester}/unit${unit}/answer/${el.a_img_index}.png`;

        if (el.options.length) {
          el.submitAnswers = el.submitAnswers.map((element) => {
            return `${element}번 (${el.options[parseInt(element - 1)]})`;
          });
        }

        const res = {
          ...el,
          q_imgURL,
          a_imgURL,
        };

        return res;
      } else {
        return el;
      }
    });

    const answerPercent = caculateAnswerPercent(
      questionPhase.filter((el) => el.clear === true)
    );

    questionInfo.push({
      title: `${i + 1}회차`,
      clearCount,
      answerPercent,
      questions: questionPhase,
      isOpen: false,
    });
  }

  results.value = questionInfo;
});

onMounted(() => {
  document.addEventListener("click", (event) => {
    if (event.target.className !== "answerImage") {
      a_imgURL.value = "";
    }
  });
});
</script>

<style scoped>
.flex-column-gap {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.bold-text {
  font-weight: 700;
}

.wrap-content {
  width: 880px;
  padding: 24px 30px;
  z-index: 5;
}

.flex-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 330px;
  text-align: center;
}

.level-text {
  font-size: 16px;
  font-weight: 700;
}

.leveltop {
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

.levelmid {
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

.levelbot {
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

.circle {
  display: flex;
  width: 100px;
  height: 100px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: -5px;
  border-radius: 48px;
  background: #67aeff;
}

.circle-text {
  font-size: 34px;
  color: #fff;
  font-weight: bold;
  line-height: 1.2;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
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

.average-score {
  font-size: 16px;
  font-weight: 500;
  color: #292929;
}

.score-highlight {
  color: #3d90ef;
  font-weight: 600;
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

.average-score {
  font-size: 16px;
  font-weight: 500;
  color: #292929;
}

.score-highlight {
  color: #3d90ef;
  font-weight: 600;
}

.chart-blue-bg {
  width: 328px;
  height: 12px;
  background: #eee;
}

.chart-bar {
  height: 100%;
}

.chart-bar.high {
  width: 60%;
  background: #ff5a83;
}

.chart-bar.medium {
  width: 80%;
  background: #10d298;
}

.chart-bar.low {
  width: 90%;
  background: #ffac4b;
}

.line-border {
  border-top: 1px solid #cae3ff;
  display: flex;
  margin: 30px 0;
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
}
.item-header span {
  font-size: 12px;
}
.level {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background: #ff5a83;
  /* 상 : background: #ff5a83; */
  /* 중 : background: #10d298; */
  /* 하 : background: #ffac4b; */
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
</style>
