<template>
  <div class="border">
    <div class="inner">
      <h4>학습 상세</h4>

      <div class="border" v-if="!isAllMissionTypeZero">
        <h6 class="body1-bold">액티비티</h6>
        <div class="text-wrap">
          <p style="color: var(--main-blue)">Perfect</p>
          <p style="color: var(--main-green)">Good</p>
          <p style="color: var(--main-orange)">Not bad</p>
        </div>

        <div class="activity-detail">
          <StudyDetailComponent
            v-if="
              detailMission?.questions?.listening &&
              detailMission?.missionTypeText?.listening !== 0
            "
            :data="detailMission.questions.listening"
            :category="'listening'"
            :num="0"
          />
          <StudyDetailComponent
            v-if="
              detailMission?.questions?.reading &&
              detailMission?.missionTypeText?.reading !== 0
            "
            :data="detailMission.questions.reading"
            :category="'reading'"
            :num="0"
          />
          <StudyDetailComponent
            v-if="
              detailMission?.questions?.writing &&
              detailMission?.missionTypeText?.writing !== 0
            "
            :data="detailMission.questions.writing"
            :category="'writing'"
            :num="0"
          />
          <StudyDetailComponent
            v-if="
              detailMission?.questions?.speaking &&
              detailMission?.missionTypeText?.speaking !== 0
            "
            :data="detailMission.questions.speaking"
            :category="'speaking'"
            :num="0"
          />
        </div>
      </div>

      <div
        class="border"
        v-if="
          this.detailMission?.missionTypeText?.gptTalking > 0 ||
          this.detailMission?.missionTypeText?.talking > 0
        "
      >
        <h6 class="body1-bold">AI 대화</h6>
        <div class="flex" style="margin-top: 20px">
          <div
            :class="['tab', { active: activeTab === 'talking' }]"
            @click="activeTab = 'talking'"
          >
            교과서 대화 [{{
              Array.isArray(detailMission?.talking)
                ? detailMission?.talking?.length
                : Object.keys(detailMission?.talking || {}).length
            }}회]
          </div>
          <div
            :class="['tab', { active: activeTab === 'gpt' }]"
            style="margin-left: 10px"
            @click="activeTab = 'gpt'"
          >
            GPT 교과주제 대화 [{{
              Array.isArray(detailMission?.gptTalking)
                ? detailMission?.gptTalking?.length
                : Object.keys(detailMission?.gptTalking || {}).length
            }}회]
          </div>
        </div>

        <div v-show="activeTab === 'talking'" class="wrap-speech">
          <div style="margin-bottom: 10px">
            <v-pagination
              v-model="talkingPage"
              :length="totalTalkingPages"
              :total-visible="8"
              color="blue"
              class="pagination-default"
            />
          </div>

          <WrapContent
            v-if="!talkingArray.length"
            class="flex column chat"
            style="padding: 20px"
          >
            <div class="time">대화 내역이 없습니다.</div>
            <div class="nochat"></div>
          </WrapContent>

          <WrapContent v-else class="flex column scroll_able chat">
            <div class="time">{{ currentTalking.time }}</div>
            <div v-for="(item, index) in paginatedTalkingChats" :key="index">
              <div v-if="item.key === 'npc'">
                <span class="chatbot">Chatbot</span>
                <div class="chatbot-speech">{{ item.value }}</div>
              </div>
              <div v-else-if="item.key === 'user'" class="flex column right">
                <div class="student right">Student</div>
                <div class="student-speech right">{{ item.value }}</div>
              </div>
              <div v-else-if="item.key === 'userAudio'">
                <div class="right" style="width: 300px">
                  <audio :src="item.value" controls></audio>
                </div>
              </div>
              <div v-else-if="item.key === 'hint'" class="hint">
                힌트:&nbsp;&nbsp;{{ item.value }}
              </div>
            </div>
          </WrapContent>
        </div>

        <div v-show="activeTab === 'gpt'" class="wrap-speech">
          <div style="margin-bottom: 10px">
            <v-pagination
              v-model="gptPage"
              :length="totalGptPages"
              :total-visible="8"
              color="blue"
              class="pagination-default"
            />
          </div>

          <WrapContent
            v-if="!gptArray.length"
            class="flex column chat"
            style="padding: 20px"
          >
            <div class="time">대화 내역이 없습니다.</div>
            <div class="nochat"></div>
          </WrapContent>

          <WrapContent v-else class="flex column scroll_able chat">
            <div class="time">{{ currentGpt.time }}</div>
            <div v-for="(item, index) in paginatedGptChats" :key="index">
              <div v-if="item.key === 'npc'">
                <span class="chatbot">Chatbot</span>
                <div class="chatbot-speech">{{ item.value }}</div>
              </div>

              <div v-else-if="item.key === 'user'" class="flex column right">
                <div class="student right">Student</div>
                <div class="student-speech right">{{ item.value }}</div>
              </div>

              <div v-else-if="item.key === 'userAudio'">
                <div class="right" style="width: 300px">
                  <audio :src="item.value" controls></audio>
                </div>
              </div>

              <div v-else-if="item.key === 'hint'" class="hint">
                힌트:&nbsp;&nbsp;{{ item.value }}
              </div>
            </div>
          </WrapContent>
        </div>
      </div>

      <div v-if="this.detailMission?.missionTypeText?.tutor > 0" class="border">
        <h6 class="body1-bold">AI 튜터</h6>
        <div class="wrap-speech" style="border-radius: 20px; margin-top: 20px">
          <div style="margin-bottom: 10px">
            <v-pagination
              v-model="tutorPage"
              :length="totalTutorPages"
              :total-visible="8"
              color="blue"
              class="pagination-default"
            />
          </div>

          <WrapContent
            v-if="!tutorArray.length"
            class="flex column chat"
            style="padding: 20px"
          >
            <div class="time">대화 내역이 없습니다.</div>
            <div class="nochat"></div>
          </WrapContent>

          <WrapContent v-else class="flex column scroll_able chat">
            <div class="time">{{ currentTutor.time }}</div>
            <div
              class="answers"
              v-if="currentTutor.answers && currentTutor.answers.length"
            >
              정답 단어
              <span v-for="(ans, idx) in currentTutor.answers" :key="idx">
                {{ ans.kor }} ({{ ans.eng }})<span
                  v-if="idx < currentTutor.answers.length - 1"
                  >,
                </span>
              </span>
            </div>

            <div
              v-for="(item, index) in paginatedChats"
              :key="index"
              style="width: 100%"
            >
              <div v-if="item.key === 'npc'">
                <span class="chatbot">Chatbot</span>
                <div class="chatbot-speech">{{ item.value }}</div>
              </div>

              <div v-else-if="item.key === 'user'" class="flex column right">
                <div class="student right">Student</div>
                <div class="student-speech right">{{ item.value }}</div>
              </div>

              <div v-else-if="item.key === 'hint'" class="hint">
                힌트:&nbsp;&nbsp;{{ item.value }}
              </div>
            </div>
          </WrapContent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudyDetailComponent from "../learning_status/StudyDetailComponent.vue";
import WrapContent from "../common/WrapContent.vue";

export default {
  props: {
    detailMission: {
      type: Object,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    StudyDetailComponent,
    WrapContent,
  },
  data() {
    return {
      activeTab: "talking",
      talkingPage: 1,
      gptPage: 1,
      tutorPage: 1,
    };
  },
  computed: {
    isAllMissionTypeZero() {
      const missionTypes = this.detailMission?.missionTypeText || {};
      return (
        missionTypes.listening === 0 &&
        missionTypes.reading === 0 &&
        missionTypes.writing === 0 &&
        missionTypes.speaking === 0
      );
    },
    totalTalkingPages() {
      // console.log("미션", this.detailMission);

      if (!this.detailMission?.talking) return 0;
      return Array.isArray(this.detailMission.talking)
        ? this.detailMission.talking.length
        : Object.keys(this.detailMission.talking).length;
    },
    totalGptPages() {
      if (!this.detailMission?.gptTalking) return 0;
      return Array.isArray(this.detailMission.gptTalking)
        ? this.detailMission.gptTalking.length
        : Object.keys(this.detailMission.gptTalking).length;
    },
    totalTutorPages() {
      return this.tutorArray.length;
    },
    paginatedTalkingChats() {
      if (!this.detailMission?.talking) return [];
      let arr = [];
      if (Array.isArray(this.detailMission.talking)) {
        arr = this.detailMission.talking;
      } else {
        arr = Object.values(this.detailMission.talking);
      }
      const currentSession = arr[this.talkingPage - 1];
      return currentSession ? currentSession.content || [] : [];
    },
    gptArray() {
      if (!this.detailMission?.gptTalking) return [];
      let arr = [];
      if (Array.isArray(this.detailMission.gptTalking)) {
        arr = this.detailMission.gptTalking;
      } else {
        arr = Object.values(this.detailMission.gptTalking);
      }
      return arr.slice().sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return (
          new Date(b.time.replace(/\./g, "-")) -
          new Date(a.time.replace(/\./g, "-"))
        );
      });
    },
    currentGpt() {
      return this.gptArray[this.gptPage - 1] || {};
    },
    paginatedGptChats() {
      return this.currentGpt.content || [];
    },
    tutorArray() {
      if (!this.detailMission?.tutor) return [];
      let arr = [];
      if (Array.isArray(this.detailMission.tutor)) {
        arr = this.detailMission.tutor;
      } else {
        arr = Object.values(this.detailMission.tutor);
      }
      return arr.slice().sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return (
          new Date(b.time.replace(/\./g, "-")) -
          new Date(a.time.replace(/\./g, "-"))
        );
      });
    },
    currentTutor() {
      return this.tutorArray[this.tutorPage - 1] || {};
    },
    paginatedChats() {
      return this.currentTutor.contents || [];
    },
    talkingArray() {
      if (!this.detailMission?.talking) return [];
      if (Array.isArray(this.detailMission.talking)) {
        return this.detailMission.talking;
      } else {
        return Object.values(this.detailMission.talking);
      }
    },
    currentTalking() {
      return this.talkingArray[this.talkingPage - 1] || {};
    },
  },
};
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
.text-wrap {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;

  p {
    font-size: 14px;
    font-family: notosans;
  }
}
.activity-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
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
  width: 150px;
  margin: 0 auto;
  position: relative;
  color: #6594cb;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;

  &::before {
    content: "";
    width: 240px;
    height: 1px;
    background: #cae3ff;
    display: block;
    position: absolute;
    left: -258px;
    top: 8px;
    z-index: 10;
  }
  &::after {
    content: "";
    width: 240px;
    height: 1px;
    background: #cae3ff;
    display: block;
    position: absolute;
    right: -258px;
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

.tab {
  min-width: 240px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  color: var(--main-blue);
  background: #dbecff;
  position: relative;
  border-radius: 20px 20px 0 0;
  text-align: center;
  font-family: "notosans";

  &.active {
    background: var(--main-blue);
    color: #fff;
  }
}
</style>
