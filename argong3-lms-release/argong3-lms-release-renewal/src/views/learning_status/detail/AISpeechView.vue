<template>
  <WrapContent
    style="padding: var(--padding2); width: 880px; margin-bottom: 26px"
  >
    <h4 class="headline2">
      {{ langlist[store.state.lang]["교과서 대화 연습"] }}
    </h4>
    <p class="content-subtitle">
      {{
        langlist[store.state.lang]["이번 단원과 연계된 대화 연습 내용입니다."]
      }}
    </p>
    <TextBookSpeech />
  </WrapContent>

  <WrapContent style="padding: var(--padding2); width: 880px">
    <h4 class="headline2">
      GPT {{ langlist[store.state.lang]["자유 대화 연습"] }}
    </h4>
    <p class="content-subtitle">
      {{
        langlist[store.state.lang][
          "교수자 또는 학습자가 정한 주제로 연습한 대화내역을 볼 수 있습니다."
        ]
      }}
    </p>
    <GPTSpeech />
  </WrapContent>
</template>
<script setup>
import WrapContent from "../../../components/common/WrapContent.vue";
import TextBookSpeech from "../../../components/learning_status/TextBookSpeech.vue";
import GPTSpeech from "../../../components/learning_status/GPTSpeech.vue";
import "../../../styles/speech.scss";
import store from "../../../store";
import { ref } from "vue";

import { conversation_ko } from "../../../assets/translate/ko";
import { conversation_vt } from "../../../assets/translate/vt";

const langlist = ref({
  ko: conversation_ko,
  vt: conversation_vt,
});
</script>
<style scoped>
</style>