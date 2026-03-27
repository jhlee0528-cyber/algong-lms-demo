<template>
  <div class="flex" style="margin-top: 20px">
    <div
      :class="{
        tab1: page,
        tab2: !page,
        widthup: store.state.lang === 'vt',
      }"
      @click="onClickTab(1)"
    >
      {{ langlist[store.state.lang]["교과서 대화"] }} [{{
        computedTextbookCount || "0"
      }}{{ langlist[store.state.lang]["회"] }}]
    </div>
    <div
      :class="{
        tab1: !page,
        tab2: page,
        widthup2: store.state.lang === 'vt',
      }"
      style="margin-left: 10px"
      @click="onClickTab(2)"
    >
      GPT {{ langlist[store.state.lang]["교과주제 대화"] }} [{{
        computedGPTCount || "0"
      }}{{ langlist[store.state.lang]["회"] }}]
    </div>
  </div>

  <div v-show="page === true" class="wrap-speech">
    <div style="margin-bottom: 10px">
      <v-pagination
        color="blue"
        v-model="currentPage"
        :length="computedTextbookCount"
        :size="30"
        total-visible="8"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      >
      </v-pagination>
    </div>
    <WrapContent
      v-if="getTextbookTime === 'nope'"
      class="flex column scroll_able chat"
    >
      <div class="time">
        {{ langlist[store.state.lang]["교과서 대화 내역이 없습니다."] }}
      </div>

      <div class="nochat"></div>
    </WrapContent>

    <WrapContent v-else class="flex column scroll_able chat">
      <div class="time">
        {{
          dayjs(getTextbookTime)
            .subtract(9, "hour")
            .format("YYYY-MM-DD HH:mm:ss")
        }}
      </div>

      <div v-for="(item, index) in getChat" :key="index">
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
        </div>

        <div v-else-if="item.key === 'userAudio'">
          <div class="right" style="width: 300px">
            <audio :src="item.value" controls></audio>
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
        :length="computedGPTCount"
        :size="30"
        total-visible="8"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      >
      </v-pagination>
    </div>

    <WrapContent
      v-if="getGPTTime === 'nope'"
      class="flex column scroll_able chat"
    >
      <div class="time">
        {{ langlist[store.state.lang]["GPT 교과 주제 대화 내역이 없습니다."] }}
      </div>

      <div class="nochat"></div>
    </WrapContent>

    <WrapContent v-else class="flex column scroll_able chat">
      <div class="time">
        {{
          dayjs(getGPTTime).subtract(9, "hour").format("YYYY-MM-DD HH:mm:ss")
        }}
      </div>

      <div v-if="gptFeedback.status" class="feedback-container">
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

      <div
        v-for="(item, index) in getGPTChat"
        :key="index"
        style="margin-top: 10px"
      >
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
        </div>

        <div v-else-if="item.key === 'userAudio'">
          <div class="right" style="width: 300px">
            <audio :src="item.value" controls></audio>
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
import { lessonChatbot, lmsUserBook } from "../../api/api-list";
import {
  getgptlessonchatbotrecord,
  getSessionFeedback,
  getGPTindexes,
} from "../../api/api-list-2";
import dayjs from "dayjs";
import WrapContent from "../common/WrapContent.vue";
import store from "../../store";

import { conversation_ko } from "../../assets/translate/ko";
import { conversation_vt } from "../../assets/translate/vt";

const langlist = ref({
  ko: conversation_ko,
  vt: conversation_vt,
});

const route = useRoute();
const path = ref(route.path.split("/"));
const userId = ref(path.value[2]);
const num = ref(path.value[3]);

const page = ref(true);
const textbook = ref([]);
const gpt = ref([]);
const currentPage = ref(1);
const chatIndexes = ref({});

const onClickTab = async (num) => {
  if (num === 1) {
    page.value = true;
  } else if (num === 2) {
    page.value = false;

    const temp = gpt.value;

    if (temp.length > 0) {
      if (temp[0][temp[0].length - 1]["key"] === "session") {
        const feedback = (
          await getSessionFeedback(temp[0][temp[0].length - 1]["value"])
        ).data.data;

        gptFeedback.value = feedback;
      }
    }
  }
  currentPage.value = 1;
};

// 교과서 대화

const computedTextbookCount = computed(() => {
  if (textbook.value === undefined) {
    return 0;
  } else {
    return textbook.value.length;
  }
});

const getTextbookTime = computed(() => {
  if (textbook.value === undefined) {
    return "nope";
  } else if (textbook.value.length === 0) {
    return "nope";
  } else {
    return (
      textbook.value[currentPage.value - 1]?.find((item) => item.key === "time")
        ?.value ?? new Date()
    );
  }
});

const getChat = computed(() => {
  if (textbook.value === undefined) {
    return [
      {
        key: "time",
        value: new Date(),
      },
    ];
  } else {
    return textbook.value[currentPage.value - 1];
  }
});

// GPT 교과주제 대화

const computedGPTCount = computed(() => {
  if (gpt.value === undefined) {
    return 0;
  } else {
    return gpt.value.length;
  }
});

const getGPTTime = computed(() => {
  if (gpt.value === undefined) {
    return "nope";
  } else if (gpt.value.length === 0) {
    return "nope";
  } else {
    return (
      gpt.value[currentPage.value - 1]?.find((item) => item.key === "time")
        ?.value ?? new Date()
    );
  }
});

const getGPTChat = computed(() => {
  if (gpt.value === undefined) {
    return [];
  } else {
    return gpt.value[currentPage.value - 1];
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
    result.push(group.flat());
  });

  return result;
};

const gptFeedback = ref({ status: false });

onMounted(async () => {
  try {
    const indexes = (await getGPTindexes()).data.data;
    chatIndexes.value = indexes;

    const lesson = `lesson${num.value}`;

    const res1 = await lessonChatbot(userId.value, num.value);
    textbook.value = res1.data.data;

    const res2 = (
      await getgptlessonchatbotrecord(userId.value, indexes[lesson])
    ).data.data.reverse();

    const restemp = (await groupBySession(res2)).reverse();
    restemp.sort((a, b) => {
      const dateA = new Date(a[0].value);
      const dateB = new Date(b[0].value);
      return dateB - dateA;
    });
    gpt.value = restemp;

    const temp = gpt.value;
    if (temp[0][temp[0].length - 1]["key"] === "session") {
      const feedback = (
        await getSessionFeedback(temp[0][temp[0].length - 1]["value"])
      ).data.data;

      gptFeedback.value = feedback;
    }
  } catch (err) {
    textbook.value = [];
    gpt.value = [];
  }
});

onBeforeRouteUpdate(async (to) => {
  currentPage.value = 1;
  page.value = true;

  const lesson = `lesson${to.params.lesson}`;
  const indexes = chatIndexes.value;

  const res1 = await lessonChatbot(to.params.userId, to.params.lesson);
  textbook.value = res1.data.data;

  const res2 = (
    await getgptlessonchatbotrecord(to.params.userId, indexes[lesson])
  ).data.data.reverse();

  const restemp = (await groupBySession(res2)).reverse();
  restemp.sort((a, b) => {
    const dateA = new Date(a[0].value);
    const dateB = new Date(b[0].value);
    return dateB - dateA;
  });
  gpt.value = restemp;

  if (restemp.length > 0) {
    const temp = gpt.value;
    if (temp[0][temp[0].length - 1]["key"] === "session") {
      const feedback = (
        await getSessionFeedback(temp[0][temp[0].length - 1]["value"])
      ).data.data;

      gptFeedback.value = feedback;
    }
  }
});

watch(currentPage, async (newpage) => {
  if (!page.value) {
    gptFeedback.value = { status: false };
    const temp = gpt.value;

    if (temp[newpage - 1][temp[newpage - 1].length - 1]["key"] === "session") {
      gptFeedback.value = (
        await getSessionFeedback(
          temp[newpage - 1][temp[newpage - 1].length - 1]["value"]
        )
      ).data.data;
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

.widthup {
  width: 350px;
}

.widthup2 {
  width: 400px;
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
