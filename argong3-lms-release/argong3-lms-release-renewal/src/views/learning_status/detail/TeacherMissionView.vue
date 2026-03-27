<template>
  <WrapContent style="padding: var(--padding2); width: 880px">
    <h4 class="headline2">
      {{ langlist[store.state.lang]["교사 미션 기록"] }}
    </h4>
    <p class="content-subtitle">
      {{
        langlist[store.state.lang][
          "이번 단원에서 진행한 교사 미션에 대한 개별 학습자 수행 내용입니다."
        ]
      }}
    </p>

    <div v-if="history.length === 0" class="lightblue-body history_empty">
      <div class="emptybox"></div>
      <div style="color: var(--main-blue); text-align: center;">
        {{ langlist[store.state.lang]["진행된 교사 미션이 없습니다."] }}
      </div>
    </div>

    <div class="wrap-record" v-for="(j, index) in history" :key="index">
      <div class="blue-header headline2">
        {{ dayjs(j.date).locale(store.state.lang).format("YYYY.MM.DD (ddd)") }}
      </div>

      <div class="lightblue-body" style="padding: 32px 28px">
        <div class="body2-bold">
          {{ langlist[store.state.lang]["미션 수행 내역"] }}
        </div>

        <WrapContent
          class="flex_center"
          style="width: 100%; height: 150px; margin-top: 12px"
        >
          <div v-for="(k, index) in j.content" :key="index">
            <div v-if="k.type === 'listening'" class="flex_center">
              <div class="relatvie flex_center column">
                <div class="listeningplant"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  {{ langlist[store.state.lang]["듣기"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div v-else-if="k.type === 'reading'" class="flex_center">
              <div class="relatvie flex_center column">
                <div class="readingplant"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  {{ langlist[store.state.lang]["읽기"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div v-else-if="k.type === 'speaking'" class="flex_center">
              <div class="relatvie flex_center column">
                <div class="speakingplant"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  {{ langlist[store.state.lang]["말하기"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div v-else-if="k.type === 'writing'" class="flex_center">
              <div class="relatvie flex_center column">
                <div class="writingplant"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  {{ langlist[store.state.lang]["쓰기"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div v-else-if="k.type === 'gpt'" class="flex_center">
              <div class="relatvie flex_center column">
                <div class="gpt"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  {{ langlist[store.state.lang]["교과서 대화"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div v-else-if="k.type === 'book'" class="flex_center">
              <div class="relatvie flex_center column">
                <div class="book"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  GPT {{ langlist[store.state.lang]["교과 주제대화"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div v-else-if="k.type === 'free'" class="flex_center">
              <div class="relatvie flex_center column">
                <div class="free"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  GPT {{ langlist[store.state.lang]["자유 주제대화"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div v-else class="flex_center">
              <div class="relatvie flex_center column">
                <div class="custommission"></div>
                <div v-show="k.status === 2" class="mission-complete"></div>
                <div class="body2-bold text_center">
                  {{ langlist[store.state.lang]["개별 맞춤 미션"] }}
                </div>
              </div>
              <div
                class="count flex_center body2-bold"
                style="margin-right: 17px"
              >
                x {{ k.requireNum }}
              </div>
            </div>

            <div
              v-show="k.toolTip === true"
              class="warning"
              :class="{
                warningmargin1:
                  k.type !== 'book' && k.type !== 'free' && k.type !== 'gpt',
                warningmargin2:
                  k.type === 'book' || k.type === 'free' || k.type === 'gpt',
              }"
            >
              <div class="warningtooltip">
                <p style="margin-top: 4px; font-size: 13px">
                  마이크가 3회 연속 작동하지 않아,
                </p>
                <p style="margin-top: 1px; font-size: 13px">
                  원활한 미션 진행을 위해 PASS된 항목입니다.
                </p>
              </div>
            </div>
          </div>
        </WrapContent>

        <div class="body2-bold" style="margin-top: 50px">
          {{ langlist[store.state.lang]["개별 학습 결과"] }}
        </div>
        <WrapContent
          class="flex_center"
          style="width: 100%; padding: 47px; margin-top: 12px"
        >
          <div
            class="lightblue-body history_result"
            style="width: 286px; margin-right: 46px"
          >
            <div class="mission-ai"></div>
            <div
              class="body2-bold flex-horizon_center"
              style="color: var(--main-blue); margin-top: 8px; height: 50px"
            >
              {{
                j.req === ""
                  ? langlist[store.state.lang]["학습이 완료되지 않았습니다."]
                  : ment(j.req)
              }}
            </div>
          </div>
          <div class="vertical-line" style="margin-right: 46px"></div>
          <div
            class="lightblue-body history_result"
            style="width: 130px; margin-right: 20px"
          >
            <div class="graph"></div>
            <div
              class="font_12_m"
              style="margin-top: 5px; color: var(--main-black2)"
            >
              {{ langlist[store.state.lang]["진단"] }}
            </div>
            <div
              class="font_14_m"
              style="margin-top: 13px; color: var(--main-black1)"
            >
              {{
                j.req === ""
                  ? langlist[store.state.lang]["학습중"]
                  : langlist[store.state.lang][j.req]
              }}
            </div>
          </div>
          <div class="lightblue-body history_result" style="width: 130px">
            <div class="medical-check"></div>
            <div
              class="font_12_m"
              style="margin-top: 5px; color: var(--main-black2)"
            >
              {{ langlist[store.state.lang]["처방"] }}
            </div>
            <div
              class="font_14_m"
              style="margin-top: 13px; color: var(--main-black1)"
            >
              {{
                j.res === ""
                  ? langlist[store.state.lang]["학습중"]
                  : langlist[store.state.lang][j.res]
              }}
            </div>
          </div>
        </WrapContent>
      </div>
    </div>
  </WrapContent>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { lmsTeacherMissionHistory } from "../../../api/api-list";
import WrapContent from "../../../components/common/WrapContent.vue";
import store from "../../../store";

import { teachermissionhistory_ko } from "../../../assets/translate/ko";
import { teachermissionhistory_vt } from "../../../assets/translate/vt";

const langlist = ref({
  ko: teachermissionhistory_ko,
  vt: teachermissionhistory_vt,
});

const route = useRoute();
const path = ref(route.path.split("/"));
const userId = ref(path.value[2]);
const num = ref(path.value[3]);
const history = ref([]);

onMounted(async () => {
  try {
    // const result = await lessonSectionAverage(props.num)
    const result = await lmsTeacherMissionHistory(userId.value, num.value);

    history.value = result.reverse();
  } catch (err) {
    console.error(err);
    history.value = [];
  }
});

onBeforeRouteUpdate(async (to) => {
  try {
    const res1 = await lmsTeacherMissionHistory(
      to.params.userId,
      to.params.lesson
    );
    history.value = res1.reverse();
  } catch (err) {
    history.value = [];
  }
});

const ment = (req) => {
  const _lang = store.state.lang;

  if (req == "기초 부족") {
    return langlist.value[_lang][
      "단원 학습 이해도가 낮은 학생입니다. 오답을 집중적으로 복습했습니다."
    ];
  }

  if (req == "기초 확립") {
    return langlist.value[_lang][
      "단원에서 학습한 내용을 잘 이해하고 있습니다. AI 튜터와 영어로 대화하며, 단어에 대한 이해도를 높였습니다."
    ];
  }

  if (req == "기초 완성") {
    return langlist.value[_lang][
      "기초가 탄탄한 학생입니다. 배운 내용을 잘 활용할 수 있도록, AI 튜터와 영어 대화를 집중적으로 연습했습니다."
    ];
  }
};
</script>
<style scoped>
.wrap-record {
  width: 812px;
  height: inherit;
  border-radius: var(--small-border-radius);
  /* border: 1px solid red; */
  margin-top: 20px;
  overflow: hidden;
}

.blue-header {
  height: 50px;
  color: white;
  background-color: var(--main-blue);
  padding: 14px 28px;
}

.lightblue-body {
  width: inherit;
  background-color: var(--main-lightblue);
}

.lightblue-body.history_empty {
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  border-radius: 13px;
  padding: 20px;
}

.lightblue-body.history_result {
  height: 130px;
  padding: 16px;
  border-radius: var(--default-border-radius);
}

.count {
  width: 30px;
  height: 30px;
  margin-left: 3px;
  border-radius: 8px;
  color: var(--main-blue);
  background-color: var(--main-lightblue);
}

.mission-complete {
  position: absolute;
  width: 72px;
  height: 72px;
  top: 0;
  left: 0;
  background-color: #ffffff88;
  background-image: url("../../../assets/image/mission-complete.png");
  background-position: center;
  background-size: 50%;
}

.vertical-line {
  width: 1px;
  height: 70px;
  background-color: var(--chart-blue-bg);
}

.warning {
  position: absolute;
  height: 30px;
  width: 30px;
  background-image: url("../../../assets/image/warning.png");
  background-size: 100%;
  cursor: pointer;
}

.warningmargin1 {
  margin-left: 20px;
}

.warningmargin2 {
  margin-left: 40px;
}

.warning:hover .warningtooltip {
  display: inline-block;
  z-index: 99;
}

.warningtooltip {
  width: 260px;
  height: 50px;
  position: absolute;
  border: 1px solid #cae3ff;
  border-radius: 15px;
  background-color: white;
  text-align: center;
  margin-top: -50px;
  margin-left: -110px;
  font-family: notosansregular;
  font-size: 14px;
  display: none;
  text-align: center;
}
</style>