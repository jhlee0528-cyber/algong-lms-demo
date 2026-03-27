<template>
  <WrapContent style="width: 370px">
    <div class="container">
      <div class="flex-wrap">
        <div
          class="character"
          :style="{ backgroundImage: 'url(' + data.image + ')' }"
        ></div>

        <div class="select-student">
          <div>
            <div @click="selectStudentOnOff()" class="selectBox">
              <p>
                {{ data.attendanceNumber2 || "00" }}
                {{ longNameProcess(data.name) || "이름" }}
              </p>
            </div>
            <v-card
              v-show="studentSelectFlag === true"
              class="selectBoxContent"
            >
              <div
                v-for="(j, i) in data.students"
                @click="selectStudent(j.id)"
                :key="i"
                :class="`selectBoxContentElement`"
              >
                <p style="padding-top: 5px; padding-left: 21px">
                  {{ j.attendanceNumber.toString().padStart(2, "0") }}.
                  {{ longNameProcess(j.name) }}
                </p>
              </div>
            </v-card>
          </div>
          <p class="nickname">
            {{ data.nickname || "없음" }}
          </p>
        </div>
      </div>

      <div class="border-1"></div>

      <div class="stone-wrap">
        <p class="titleFont">보유 재화</p>
        <div class="grid">
          <div class="stoneDiv">
            <div class="listenStone"></div>
            <div>
              <h6>
                {{ data.listenStone }}
              </h6>
              <p class="stoneAllSentence">
                누적 {{ data.listenStoneSave || data.listenStone }}
              </p>
            </div>
          </div>
          <div class="stoneDiv">
            <div class="readStone"></div>
            <div>
              <h6>
                {{ data.readStone }}
              </h6>
              <p class="stoneAllSentence">
                누적 {{ data.readStoneSave || data.readStone }}
              </p>
            </div>
          </div>
          <div class="stoneDiv">
            <div class="speakStone"></div>
            <div>
              <h6>
                {{ data.speakStone }}
              </h6>
              <p class="stoneAllSentence">
                누적 {{ data.speakStoneSave || data.speakStone }}
              </p>
            </div>
          </div>
          <div class="stoneDiv">
            <div class="writeStone"></div>
            <div>
              <h6>
                {{ data.writeStone }}
              </h6>
              <p class="stoneAllSentence">
                누적 {{ data.writeStoneSave || data.writeStone }}
              </p>
            </div>
          </div>
          <div class="stoneDiv">
            <div class="goldStone"></div>
            <div>
              <h6>
                {{ data.gold }}
              </h6>
              <p class="stoneAllSentence">
                누적 {{ data.goldSave || data.gold }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-1"></div>

      <div class="mission-progress">
        <p class="titleFont">게임 미션 진행도</p>

        <div class="progress-wrap">
          <div>
            <div
              class="pie-chart"
              :style="{
                background:
                  'conic-gradient(var(--main-blue) 0%' +
                  data.construction +
                  '%, var(--chart-blue-bg)' +
                  data.construction +
                  '% 100%)',
              }"
            >
              <span class="center">{{ data.construction || "0" }}</span>
            </div>
            <p>공사</p>
          </div>
          <div>
            <div
              class="pie-chart"
              :style="{
                background:
                  'conic-gradient(var(--main-blue) 0%' +
                  data.question +
                  '%, var(--chart-blue-bg)' +
                  data.question +
                  '% 100%)',
              }"
            >
              <span class="center">{{ data.question || "0" }}</span>
            </div>
            <p>퀘스트</p>
          </div>
          <div>
            <div
              class="pie-chart"
              :style="{
                background:
                  'conic-gradient(var(--main-blue) 0%' +
                  data.achievement +
                  '%, var(--chart-blue-bg)' +
                  data.achievement +
                  '% 100%)',
              }"
            >
              <span class="center">{{ data.achievement || "0" }}</span>
            </div>
            <p>업적 달성</p>
          </div>
        </div>
      </div>

      <div class="border-1"></div>

      <span class="text">
        {{ langlist[store.state.lang]["마지막 로그인"] }} : &nbsp;&nbsp;&nbsp;{{
          data.lastLogin
        }}
      </span>
    </div>
  </WrapContent>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import WrapContent from "../common/WrapContent.vue";
import "../../styles/pie_chart.scss";
import { learningdetail_ko } from "../../assets/translate/ko";
import { learningdetail_vt } from "../../assets/translate/vt";
import { characterProfile } from "../../api/api-list-2";
import { getStudentById, getStudentsByBranch } from "../../data/students.js";
import characterImage from "../../assets/image/CharacterRenderTexture.png";

const langlist = ref({
  ko: learningdetail_ko,
  vt: learningdetail_vt,
});

const store = useStore();
const route = useRoute();
const router = useRouter();

const path = ref(route.path.split("/"));
const data = ref({});
const studentSelectFlag = ref(false);

onBeforeMount(async () => {
  let id = path.value[2];
  if (store.state.currentSubject === "math") {
    id = path.value[3];
  }

  try {
    // 실제 API 호출 시도
    const res = await characterProfile({ userId: id });

    if (res.data.data.status) {
      // API 성공 - 실제 데이터 사용
      const temp = res.data.data;
      const num = temp["attendanceNumber"].toString();
      temp["attendanceNumber2"] = num.padStart(2, "0");

      data.value = temp;
      const students = data.value["students"];

      students.sort((a, b) => a.attendanceNumber - b.attendanceNumber);
      data.value["students"] = students.filter((item) => item.id !== id);
    } else {
      // API는 성공했지만 status가 false - 더미 데이터 사용
      loadDummyData(id);
    }
  } catch (error) {
    // API 호출 실패 - 더미 데이터 사용 (팝업 없이)
    console.log('CharacterProfile API error, using dummy data:', error);
    loadDummyData(id);
  }
});

// 더미 데이터 로드 함수
const loadDummyData = (id) => {
  const student = getStudentById(id);

  if (student) {
    // 학생 데이터를 찾았으면 더미 프로필 생성
    const branch = store.state.currentBranch;
    const allStudents = getStudentsByBranch(branch);

    // 학습 진행률과 레벨 기반 재화 계산
    const base = Math.floor(student.finishedPercent / 10);
    const lvNum = parseInt(student.level) || 1;

    // 재화 현재값
    const listenStone = base * 3 + lvNum;
    const readStone = base * 2 + lvNum;
    const speakStone = base + lvNum;
    const writeStone = Math.floor(base * 1.5);
    const gold = base * 2;

    // 게임 미션 진행도 (학습 진행률 기반)
    const construction = Math.floor(student.finishedPercent * 0.8);
    const question = Math.floor(student.finishedPercent * 0.6);
    const achievement = Math.floor(student.finishedPercent * 0.4);

    data.value = {
      attendanceNumber: student.attendanceNumber,
      attendanceNumber2: String(student.attendanceNumber).padStart(2, "0"),
      name: student.name,
      nickname: "학습자",
      image: characterImage,
      listenStone: listenStone,
      listenStoneSave: Math.floor(listenStone * 1.5),
      readStone: readStone,
      readStoneSave: Math.floor(readStone * 1.5),
      speakStone: speakStone,
      speakStoneSave: Math.floor(speakStone * 1.5),
      writeStone: writeStone,
      writeStoneSave: Math.floor(writeStone * 1.5),
      gold: gold,
      goldSave: Math.floor(gold * 1.5),
      construction: construction,
      question: question,
      achievement: achievement,
      lastLogin: student.lastStudyDate || "2026-03-27",
      status: true,
      students: allStudents
        .filter(s => s.id !== id)
        .map(s => ({
          id: s.id,
          name: s.name,
          attendanceNumber: s.attendanceNumber
        }))
        .sort((a, b) => a.attendanceNumber - b.attendanceNumber)
    };
  } else {
    // 학생을 찾지 못한 경우 기본 더미 데이터
    data.value = {
      attendanceNumber: 1,
      attendanceNumber2: "01",
      name: "학생",
      nickname: "학습자",
      image: characterImage,
      listenStone: 0,
      listenStoneSave: 0,
      readStone: 0,
      readStoneSave: 0,
      speakStone: 0,
      speakStoneSave: 0,
      writeStone: 0,
      writeStoneSave: 0,
      gold: 0,
      goldSave: 0,
      construction: 0,
      question: 0,
      achievement: 0,
      lastLogin: "2026-03-27",
      status: true,
      students: []
    };
  }
};

onMounted(async () => {
  const selectBox = document.querySelector(".selectBox");
  const selectBoxContent = document.querySelector(".selectBoxContent");

  document.addEventListener("click", (event) => {
    if (
      !selectBox.contains(event.target) &&
      !selectBoxContent.contains(event.target)
    ) {
      studentSelectFlag.value = false;
    }
  });
});

const selectStudentOnOff = () => {
  studentSelectFlag.value = !studentSelectFlag.value;
};

const selectStudent = (id) => {
  studentSelectFlag.value = false;
  const subject = store.state.currentSubject;
  if (subject === "eng") {
    //영어로 이동
    window.location.href = `${window.location.protocol}//${window.location.host}/learning/${id}/0`;
  } else {
    //수학으로 이동
    window.location.href = `${window.location.protocol}//${window.location.host}/math/learning/${id}/1/1`;
  }
};

const longNameProcess = (name) => {
  if (!name) {
    return "";
  }

  if (name.length < 6) {
    return name;
  } else {
    return `${name.slice(0, 5)}...`;
  }
};
</script>

<style scoped lang="scss">
.flex-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.stone-wrap {
  .grid {
    padding: 20px 0 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px 8px;
    /* gap: 15px; */
  }
}
.pie-chart {
  width: 60px;
  height: 60px;
  span {
    width: 45px;
    height: 45px;
    font-size: 20px;
    font-family: notosans;
  }
}
.progress-wrap {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  text-align: center;
  padding-top: 20px;
  p {
    color: var(--main-black2);
    font-family: notosans;
    font-size: 15px;
    margin-top: 5px;
    margin-left: -2px;
  }
}
.character {
  width: 150px;
  height: 150px;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: -25px;
  margin-left: -20px;
}

.vertical-line {
  width: 1px;
  height: 140px;
  background-color: var(--chart-gray-bg);
}

.last-login {
  font-size: 15px;
  color: #9a9a9a;
  margin-top: 20px;
}

.arrow {
  position: absolute;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  top: 50%;
  right: 0;
  background-image: url("../../assets/image/Btn_Down.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 0;
}

.select-student {
  .nickname {
    margin-top: 10px;
    font-size: 15px;
    color: #525252;
  }
}
.selectBox {
  border: 1px solid #3d90ef;
  width: 160px;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  background-image: url("../../assets/image/Btn_Down.png");
  background-size: 13%;
  background-position-x: 95%;
  background-position-y: 40%;
}

.selectBox:hover {
  background-color: rgb(220, 220, 220);
}

.selectBoxContent {
  width: 160px;
  height: 200px;
  position: absolute;
  background-color: white;
  margin-top: 5px;
  border-radius: 5px;
  overflow-y: scroll;
}

.selectBoxContentElement {
  width: 100%;
  height: 35px;
  cursor: pointer;
}

.selectBoxContentElement:hover {
  background-color: #f1f8ff;
  color: #3d90ef;
}

.titleFont {
  font-family: notosans;
  font-size: 16px;
  font-weight: 600;
  color: var(--main-black);
}

.stoneDiv {
  display: flex;
  gap: 5px;

  h6 {
    font-family: notosans;
    font-size: 16px;
  }
}

.listenStone {
  background-image: url("../../assets/image/listenstone.png");
  background-size: 100%;
  width: 35px;
  height: 35px;
  float: left;
  margin-top: 3px;
}

.readStone {
  background-image: url("../../assets/image/readstone.png");
  background-size: 100%;
  width: 35px;
  height: 35px;
  float: left;
  margin-top: 2px;
}

.speakStone {
  background-image: url("../../assets/image/speakstone.png");
  background-size: 100%;
  width: 35px;
  height: 35px;
  float: left;
  margin-top: 2px;
}

.writeStone {
  background-image: url("../../assets/image/writestone.png");
  background-size: 100%;
  width: 35px;
  height: 35px;
  float: left;
  margin-top: 3px;
}

.goldStone {
  background-image: url("../../assets/image/gold.png");
  background-size: 100%;
  width: 35px;
  height: 35px;
  float: left;
  margin-top: 2px;
}

.stoneAllSentence {
  font-family: notosansregular;
  font-size: 12px;
  color: rgb(170, 170, 170);
  white-space: nowrap;
}

.selectBoxContent::-webkit-scrollbar {
  width: 8px;
}

.selectBoxContent::-webkit-scrollbar-thumb {
  height: 30%;
  background: #cae3ff;
  border-radius: 10px;
}

.border-1 {
  width: 100%;
  height: 1px;
  background-color: rgb(220, 220, 220);
}
span.text {
  color: var(--main-black3);
  text-align: center;
  font-size: 13px;
}
</style>
