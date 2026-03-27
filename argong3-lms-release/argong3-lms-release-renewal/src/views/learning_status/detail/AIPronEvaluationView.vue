<template>
  <WrapContent style="padding: var(--padding2); width: 880px">
    <h4 class="headline2">
      <!-- {{ langlist[store.state.lang]["발음 평가 상세"] }} -->
      Record 발음 평가 상세
    </h4>
    <p class="body1">
      액티비티 '스피킹' 영역에서 진행한 발음평가 상세 리포트입니다.
    </p>
    <div class="flex_center" style="margin-top: 40px; margin-bottom: 50px">
      <PronRadarChart2
        :classData="store.state.pronRadarData"
        style="margin-left: 25px"
      />

      <div>
        <ul style="width: 405px; margin-left: 90px; word-break: break-word">
          <li style="margin-bottom: 40px">
            <span class="font_18_m">Accuracy</span><br />
            <span class="body1"
              >음소(소리) 단위의 발음 정확성을 측정합니다.</span
            >
          </li>
          <li style="margin-bottom: 40px">
            <span class="font_18_m">Fluency</span><br />
            <span class="body1"
              >단어의 강세, 발음의 위치, 말의 흐름을 점검하여 유창성을
              <br />측정합니다.</span
            >
          </li>
          <li style="margin-bottom: 40px">
            <span class="font_18_m">Prosody</span><br />
            <span class="body1"
              >문장의 강세 패턴과 억양을 자연스럽게 구사하는지 측정합니다.</span
            >
          </li>
        </ul>
      </div>
    </div>

    <h4 class="headline2">
      {{ langlist[store.state.lang]["발음 집중학습 결과"] }}
    </h4>
    <p class="body1">
      {{
        langlist[store.state.lang][
          "액티비티 '스피킹' 영역에서 학생들이 부족한 발음을 집중학습한 결과입니다."
        ]
      }}
    </p>
    <table class="pron-table" cellspacing="1">
      <tr>
        <td class="pron-table-field" style="width: 500px">
          {{ langlist[store.state.lang]["문장"] }}
        </td>
        <td class="pron-table-field" style="width: 310px">
          {{ langlist[store.state.lang]["집중 학습 단어"] }}
        </td>
        <!-- <td class="pron-table-field" style="width: 196px">
          {{ langlist[store.state.lang]["집중 학습 음소"] }}
        </td> -->
      </tr>
      <tr v-for="(j, i) in getPronResult" :key="i">
        <td class="pron-table-data">
          <span>{{ highlightWord(j.sentence, j.word).beforeWord }}</span>
          <span class="check">{{ j.word }}</span>
          <span>{{ highlightWord(j.sentence, j.word).afterWord }}</span>
          <button @click="onClickPlay(j.sentence)" class="play"></button>
        </td>
        <td class="pron-table-data">
          <span>{{ highlightWord(j.word, j.phoneme).beforeWord }}</span>
          <span class="check">{{ j.phoneme }}</span>
          <span>{{ highlightWord(j.word, j.phoneme).afterWord }}</span>
          <button
            v-if="j.word"
            @click="onClickPlay(j.word)"
            class="play"
          ></button>
        </td>
        <!-- <td class="pron-table-data">{{ j.phoneme }}</td> -->
      </tr>
    </table>
  </WrapContent>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { prounResult, lmsSpeaking } from "../../../api/api-list";
import PronRadarChart2 from "../../../components/charts/PronRadarChart2.vue";
import WrapContent from "../../../components/common/WrapContent.vue";
import { pron_ko } from "../../../assets/translate/ko";
import { pron_vt } from "../../../assets/translate/vt";

const langlist = ref({
  ko: pron_ko,
  vt: pron_vt,
});

const store = useStore();
const route = useRoute();

const path = ref(route.path.split("/"));
const userId = ref(path.value[2]);
const num = ref(path.value[3]);

const pronResult = ref([]);

const audio = new Audio();

const highlightWord = (sentence = "", word = "") => {
  const startIdx = sentence.toLowerCase().indexOf(word.toLowerCase());

  const endIdx = startIdx + word.length;
  const beforeWord = sentence.slice(0, startIdx);
  const afterWord = sentence.slice(endIdx);

  return { beforeWord, word, afterWord };
};

const onClickPlay = async (content) => {
  if (!content) {
    return;
  }
  const id = route.params.userId;
  const lesson = route.params.lesson;
  audio.pause();
  let check = content.replace(/[^a-zA-Z0-9]/g, "_");

  const result = await lmsSpeaking(id, lesson, check);
  if (result !== "") {
    audio.src = result;
    audio.play();
  }
};

onMounted(async () => {
  const result = await prounResult(userId.value, num.value);
  await store.dispatch("PRON_DETAIL", { userId: userId.value, num: num.value });

  result.map((item) => {
    if (item.phoneme && item.phoneme.includes("(")) {
      const firstParenIndex = item.phoneme.indexOf("(");
      item.phoneme = item.phoneme.substring(0, firstParenIndex);
    }
    return item;
  });

  pronResult.value = result;
});

const getPronResult = computed(() => {
  if (pronResult.value === undefined || pronResult.value.length === 0) {
    return [];
  } else {
    return pronResult.value;
  }
});

onBeforeRouteUpdate(async (to) => {
  const result = await prounResult(to.params.userId, to.params.lesson);
  await store.dispatch("PRON_DETAIL", {
    userId: to.params.userId,
    num: to.params.lesson,
  });

  pronResult.value = result.map((item) => {
    if (item.phoneme && item.phoneme.includes("(")) {
      const firstParenIndex = item.phoneme.indexOf("(");
      item.phoneme = item.phoneme.substring(0, firstParenIndex);
    }
    return item;
  });
});
</script>

<style scoped>
li::marker {
  font-size: 20px;
  color: var(--main-blue);
  line-height: 10px;
}

.pron-table,
.pron-table-field,
.pron-table-data {
  border: 1px solid var(--chart-blue-bg);
  border-collapse: collapse;
  vertical-align: center;
  text-align: center;
  font-family: notosansmedium;
}

.pron-table {
  margin-top: 18px;
  border-radius: 14px;
  border-style: hidden;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--chart-blue-bg);
}

.pron-table-field {
  height: 50px;
  background-color: var(--main-lightblue);
}

.pron-table-data {
  position: relative;
  height: 75px;
}

.play {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  right: -10px;
  transform: translate(-50%, -50%);
  background-image: url("../../../assets/image/Btn_play.png");
  background-position: center;
  background-size: 100%;
}

.check {
  color: red;
}
</style>