<template>
  <div class="flex" style="margin-top: 35px">
    <div :class="page ? 'tab1' : 'tab2'" @click="onClickTab(1)">
      GPT {{ langlist[store.state.lang]["교사 주제"] }} [{{
        computedGPTTeacherCount || "0"
      }}{{ langlist[store.state.lang]["회"] }}]
    </div>
    <div
      :class="page ? 'tab2' : 'tab1'"
      style="margin-left: 10px"
      @click="onClickTab(2)"
    >
      GPT {{ langlist[store.state.lang]["자유 대화"] }} [{{
        computedGPTFreeCount || "0"
      }}{{ langlist[store.state.lang]["회"] }}]
    </div>
  </div>

  <div v-show="page === true" class="wrap-speech">
    <div style="margin-bottom: 10px">
      <v-pagination
        color="blue"
        v-model="currentPage"
        :length="computedGPTTeacherCount"
        :size="30"
        total-visible="8"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      >
      </v-pagination>
    </div>

    <WrapContent
      v-if="getGPTTeacherTime === 'nope'"
      class="flex column scroll_able chat"
    >
      <div class="time">
        {{ langlist[store.state.lang]["교사 주제 대화 내역이 없습니다."] }}
      </div>

      <div class="nochat"></div>
    </WrapContent>

    <WrapContent v-else class="chat flex column scroll_able">
      <div class="time">
        {{
          dayjs(getGPTTeacherTime)
            .subtract(9, "hour")
            .format("YYYY-MM-DD HH:mm:ss")
        }}
      </div>

      <div v-if="gptFeedback.status === true" class="feedback-container">
        <div class="feedback">
          <div class="feedback-header">
            <div class="bluestar"></div>
            <p>AI 피드백</p>
          </div>

          <div class="feedback-body">
            <div class="flex">
              <h6>개선 필요 문장</h6>
              <p>
                {{ gptFeedback.incorrect }}
              </p>
            </div>
          </div>

          <div>
            <p class="reason">{{ gptFeedback.reason }}</p>
          </div>
        </div>
      </div>

      <div v-for="(item, index) in getGPTTeacherChat" :key="index">
        <div v-if="item.key === 'type'" class="wrap-topic">
          {{ langlist[store.state.lang]["주제"] }}<br />
          <p>
            {{ printTeacherTopicEng(item.value) }}
          </p>
          <p>{{ printTeacherTopicKor(item.value) }}</p>
        </div>

        <div v-if="item.key === 'npc'">
          <span :class="{ chatbot: item.key === 'npc' }">Chatbot</span>
          <div :class="{ 'chatbot-speech': item.key === 'npc' }">
            {{ item.value }}
          </div>
        </div>

        <div v-else-if="item.key === 'user'" class="flex column right">
          <div class="student right">Student</div>
          <div class="student-speech right">
            {{ item.value }}
          </div>
          <div class="right" style="width: 300px">
            <audio :src="getGPTTeacherChat[index + 1].value" controls></audio>
          </div>
        </div>
        <div v-else-if="item.key === 'hint'" class="hint">
          {{ langlist[store.state.lang]["힌트"] }}:&nbsp;&nbsp;{{ item.value }}
        </div>
      </div>
    </WrapContent>
  </div>

  <div v-show="page === false" class="wrap-speech">
    <div style="margin-bottom: 10px">
      <v-pagination
        color="blue"
        v-model="currentPage"
        :length="computedGPTFreeCount"
        :size="30"
        total-visible="8"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      >
      </v-pagination>
    </div>

    <WrapContent
      v-if="getGPTFreeTime === 'nope'"
      class="flex column scroll_able chat"
    >
      <div class="time">
        {{ langlist[store.state.lang]["GPT 자유 주제 대화 내역이 없습니다."] }}
      </div>

      <div class="nochat"></div>
    </WrapContent>

    <WrapContent v-else class="flex column scroll_able chat">
      <div class="time">
        {{
          dayjs(getGPTFreeTime)
            .subtract(9, "hour")
            .format("YYYY-MM-DD HH:mm:ss")
        }}
      </div>

      <div v-if="gptFeedback.status === true" class="feedback-container">
        <div class="feedback">
          <div class="feedback-header">
            <div class="bluestar"></div>
            <p>AI 피드백</p>
          </div>

          <div class="feedback-body">
            <div class="flex">
              <h6>개선 필요 문장</h6>
              <p>
                {{ gptFeedback.incorrect }}
              </p>
            </div>
          </div>

          <p class="reason">{{ gptFeedback.reason }}</p>
        </div>
      </div>

      <div v-for="(item, index) in getGPTFreeChat" :key="index">
        <div v-if="item.key === 'type'" class="wrap-topic">
          {{ langlist[store.state.lang]["주제"] }}<br />
          {{ item.value }}
        </div>

        <div v-else-if="item.key === 'npc'">
          <span :class="{ chatbot: item.key === 'npc' }">Chatbot</span>
          <div :class="{ 'chatbot-speech': item.key === 'npc' }">
            {{ item.value }}
          </div>
        </div>

        <div v-else-if="item.key === 'user'" class="flex column right">
          <div class="student right">Student</div>
          <div class="student-speech right">
            {{ item.value }}
          </div>
          <div class="right" style="width: 300px">
            <audio :src="getGPTFreeChat[index + 1].value" controls></audio>
          </div>
        </div>
        <div v-else-if="item.key === 'hint'" class="hint">
          {{ langlist[store.state.lang]["힌트"] }}:&nbsp;&nbsp;{{ item.value }}
        </div>
      </div>
    </WrapContent>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { lmsUserBook } from "../../api/api-list";
import dayjs from "dayjs";
import WrapContent from "../common/WrapContent.vue";
import store from "../../store";

import { conversation_ko } from "../../assets/translate/ko";
import { conversation_vt } from "../../assets/translate/vt";
import { getSessionFeedback } from "../../api/api-list-2";

const langlist = ref({
  ko: conversation_ko,
  vt: conversation_vt,
});

const route = useRoute();
const path = ref(route.path.split("/"));
const userId = ref(path.value[2]);

const page = ref(true);
const currentPage = ref(1);

const gptTeacher = ref([]);
const gptFree = ref([]);

const gptFeedback = ref({
  status: false,
  session_id: "",
  incorrect: "",
  suggest: "",
  reason: "",
});

const onClickTab = async (num) => {
  if (num === 1) {
    page.value = true;

    const temp = gptTeacher.value;

    if (temp.length > 0) {
      if (temp[0][temp[0].length - 1]["key"] === "session") {
        const gptTeacherSession = temp[0][temp[0].length - 1]["value"];

        gptFeedback.value = (
          await getSessionFeedback(gptTeacherSession)
        ).data.data;
      }
    }
  } else if (num === 2) {
    page.value = false;

    const temp2 = gptFree.value;

    if (temp2.length > 0) {
      if (temp2[0][temp2[0].length - 1]["key"] === "session") {
        const gptSession = temp2[0][temp2[0].length - 1]["value"];

        gptFeedback.value = (await getSessionFeedback(gptSession)).data.data;
      }
    }
  }
  currentPage.value = 1;
};

onMounted(async () => {
  try {
    const res1 = await lmsUserBook(userId.value, "teacher");
    const res2 = await lmsUserBook(userId.value, "gpt");

    const temp1 = (await groupBySession(res1.reverse())).reverse();
    const temp2 = (await groupBySession(res2.reverse())).reverse();

    temp1.sort((a, b) => {
      const dateA = new Date(a[0].value);
      const dateB = new Date(b[0].value);
      return dateB - dateA;
    });
    temp2.sort((a, b) => {
      const dateA = new Date(a[0].value);
      const dateB = new Date(b[0].value);
      return dateB - dateA;
    });

    gptTeacher.value = temp1;
    gptFree.value = temp2;

    const temp = gptTeacher.value;

    if (temp.length > 0) {
      if (temp[0][temp[0].length - 1]["key"] === "session") {
        const gptTeacherSession = temp[0][temp[0].length - 1]["value"];

        gptFeedback.value = (
          await getSessionFeedback(gptTeacherSession)
        ).data.data;
      }
    }
  } catch (err) {
    console.log(err);
    gptTeacher.value = [];
    gptFree.value = [];
  }
});

onBeforeRouteUpdate(async (to) => {
  currentPage.value = 1;
  page.value = true;

  try {
    // const res1 = await lmsUserBook(to.params.userId, "teacher");
    // const res2 = await lmsUserBook(userId.value, "gpt");
    // gptTeacher.value = (await groupBySession(res1.reverse())).reverse();
    // gptFree.value = (await groupBySession(res2.reverse())).reverse();
    // const temp = gptTeacher.value;
    // if (temp.length > 0) {
    //   if (temp[0][temp[0].length - 1]["key"] === "session") {
    //     const gptTeacherSession = temp[0][temp[0].length - 1]["value"];
    //     gptFeedback.value = (
    //       await getSessionFeedback(gptTeacherSession)
    //     ).data.data;
    //   }
    // }
  } catch (err) {
    gptTeacher.value = [];
    gptFree.value = [];
  }
});

// GPT 교사 주제
const computedGPTTeacherCount = computed(() => {
  if (gptTeacher.value === undefined) {
    return 0;
  } else {
    return gptTeacher.value.length;
  }
});

const printTeacherTopicEng = (str) => {
  const target = str.split("__")[1];
  if (target) {
    return target.split("@")[0];
  } else {
    return "-";
  }
};

const printTeacherTopicKor = (str) => {
  const target = str.split("__")[1];
  if (target) {
    return target.split("@")[1];
  } else {
    return "-";
  }
};

const getGPTTeacherTime = computed(() => {
  if (gptTeacher.value === undefined) {
    return "nope";
  } else if (gptTeacher.value.length === 0) {
    return "nope";
  } else {
    return (
      gptTeacher.value[currentPage.value - 1]?.find(
        (item) => item.key === "time"
      )?.value ?? new Date()
    );
  }
});

const getGPTTeacherChat = computed(() => {
  if (gptTeacher.value === undefined) {
    return [
      {
        key: "time",
        value: new Date(),
      },
    ];
  } else {
    return gptTeacher.value[currentPage.value - 1];
  }
});

// GPT 자유 대화

const computedGPTFreeCount = computed(() => {
  if (gptFree.value === undefined) {
    return 0;
  } else {
    return gptFree.value.length;
  }
});

const getGPTFreeTime = computed(() => {
  if (gptFree.value === undefined) {
    return "nope";
  }
  if (gptFree.value.length === 0) {
    return "nope";
  } else {
    return (
      gptFree.value[currentPage.value - 1]?.find((item) => item.key === "time")
        ?.value ?? new Date()
    );
  }
});

const getGPTFreeChat = computed(() => {
  if (gptFree.value === undefined) {
    return [];
  } else {
    // const arr = gptFree.value.reverse();

    return gptFree.value[currentPage.value - 1];
  }
});

const groupBySession = async (data) => {
  const sessionMap = new Map();
  const result = [];

  data.forEach((entry) => {
    const lastElement = entry[entry.length - 1];

    if (lastElement.key === "session") {
      const sessionValue = lastElement.value;

      if (sessionMap.has(sessionValue)) {
        sessionMap.get(sessionValue).push(entry);
      } else {
        sessionMap.set(sessionValue, [entry]);
      }
    } else {
      result.push(entry);
    }
  });

  sessionMap.forEach((group) => {
    let arr = group.flat();
    let types = arr.filter((item) => item.key === "type");
    arr = arr.filter((item) => item.key !== "type");

    const type = types[0];
    arr.splice(1, 0, type);

    result.push(arr);
  });

  return result;
};

watch(currentPage, async (newPage) => {
  const flag = page.value;
  if (flag) {
    const temp = gptTeacher.value;

    if (
      temp[newPage - 1][temp[newPage - 1].length - 1]["key"] === "session" &&
      temp[newPage - 1][temp[newPage - 1].length - 1]["value"]
    ) {
      const gptTeacherSession =
        temp[newPage - 1][temp[newPage - 1].length - 1]["value"];

      gptFeedback.value = (
        await getSessionFeedback(gptTeacherSession)
      ).data.data;
    } else {
      gptFeedback.value = { status: false };
    }
  } else {
    const temp = gptFree.value;

    if (
      temp[newPage - 1][temp[newPage - 1].length - 1]["key"] === "session" &&
      temp[newPage - 1][temp[newPage - 1].length - 1]["value"]
    ) {
      const gptSession =
        temp[newPage - 1][temp[newPage - 1].length - 1]["value"];

      gptFeedback.value = (await getSessionFeedback(gptSession)).data.data;
    } else {
      gptFeedback.value = { status: false };
    }
  }
});
</script>
<style scoped>
.chat {
  position: relative;
  width: 100%;
  max-height: 635px;
  padding: 20px 20px 20px 30px;
}
.chatbot {
  font-size: 14px;
  color: #3d90ef;
  margin-bottom: 5px;
  display: block;
}

.chatbot-speech {
  background-color: #f1f8ff;
  padding: 10px 15px;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 80%;
  font-size: 14px;
}
.student {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.student-speech {
  background-color: var(--main-blue);
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 80%;
  margin-left: auto;
  font-size: 14px;
}

.hint {
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 400px;
}

.time {
  width: 220px;
  margin: 0 auto;
  position: relative;
  color: #6594cb;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;

  &::before {
    content: "";
    width: 230px;
    height: 1px;
    background: #cae3ff;
    display: block;
    position: absolute;
    left: -240px;
    top: 8px;
    z-index: 10;
  }
  &::after {
    content: "";
    width: 230px;
    height: 1px;
    background: #cae3ff;
    display: block;
    position: absolute;
    right: -240px;
    top: 8px;
    z-index: 10;
  }

  @media (max-width: 800px) {
    &::before {
      width: 100px;
      left: -110px;
    }
    &::after {
      width: 100px;
      right: -110px;
    }
  }
}

.answers {
  background: #e9fcf6;
  border-radius: 14px;
  width: 300px;
  margin: 0 auto 10px;
  padding: 12px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #04bb84;
  font-size: 16px;

  span {
    min-width: 160px;
    text-align: left;
  }
}

.nochat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 160px;
  color: #666;
}

.feedback-container {
  border: 1px solid #cde6fa;
  border-radius: 20px;
  width: 100%;

  p {
    font-size: 18px;
  }
}

.feedback {
  padding: 0 27px 27px;
}

.feedback-header {
  font-size: 20px;
  color: #3d90ef;
  width: 150px;
  margin: 0 auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: -20px;
  background-color: #fff;
  font-family: notosans;
}

.bluestar {
  background-image: url("../../assets/image/bluestar.png");
  width: 18px;
  height: 18px;
  background-size: 100%;
}

.feedback-body {
  width: 100%;
  font-size: 18px;

  .flex {
    display: flex;
    gap: 15px;
  }
  h6 {
    font-weight: 700;
    font-size: 18px;
  }
}
.reason {
  margin-top: 20px;
  font-size: 16px !important;
  color: #3d90ef;
}
</style>
