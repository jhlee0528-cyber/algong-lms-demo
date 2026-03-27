<template>
  <WrapContent>
    <div class="inner">
      <div class="flex-center-between">
        <div>
          <h4 class="headline2">
            {{ langlist[$store.state.lang]["학습 단원 설정"] }}
          </h4>
          <p class="content-subtitle">
            {{
              langlist[$store.state.lang][
                "열려 있는 단원에서만 액티비티 학습 활동을 할 수 있습니다. 집중 학습할 단원만 선택해주세요."
              ]
            }}
          </p>
        </div>
        <v-btn @click="savelessons()" variant="outlined" class="btn">{{
          langlist[$store.state.lang]["저장하기"]
        }}</v-btn>
      </div>

      <div>
        <div class="flex-center-between">
          <div class="flex">
            <input v-model="allflag" @click="selectall()" type="checkbox" />
            <label class="body2">
              {{ langlist[$store.state.lang]["전체 선택/해제"] }}
            </label>
          </div>

          <p class="body2-bold" style="color: #3480d8">
            {{ langlist[$store.state.lang]["현재 선택된 단원"] }} ({{
              open.length
            }}/{{ lessons.length }})
          </p>
        </div>

        <div
          v-for="(j, i) in lessons"
          :key="i"
          class="unselectedlesson"
          :class="{ selectedlesson: j.isOpen === true }"
          @click="
            {
              j.isOpen = !j.isOpen;
            }
          "
        >
          <div class="item">
            <div>
              <input v-model="j.isOpen" type="checkbox" />
              <p>{{ setnum(i + 1) }}. {{ j.lessonName }}</p>
            </div>
            <SearchIcon @click.stop="showLessonDetail(i)" />
          </div>
        </div>
      </div>

      <v-dialog v-model="dialog" max-width="960px">
        <v-card>
          <div class="modal-title">
            <h2 class="headline">
              {{ setnum(selectedLessonIndex + 1) }}.
              {{ lessons[selectedLessonIndex]?.lessonName }}
            </h2>
            <button @click="dialog = false">
              <CloseIcon />
            </button>
          </div>

          <div v-if="loading" class="modal-content text-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <div v-else class="modal-content scrollbar">
            <div class="flex">
              <div>
                <h4 class="headline2">진행률</h4>
                <v-progress-circular
                  :model-value="lessonDetail.progress"
                  :rotate="-90"
                  :size="210"
                  :width="10"
                  bg-color="#eaf4ff"
                  color="var(--main-blue)"
                  class="progress"
                >
                  <p class="num">{{ lessonDetail.progress }}%</p>
                </v-progress-circular>
              </div>
              <div>
                <h4 class="headline2" style="margin-bottom: 30px">학습 내용</h4>
                <div class="box">
                  <div>
                    <p class="body1-bold">단어</p>
                    <div class="list-wrap scrollbar">
                      <div
                        v-for="(word, index) in lessonDetail.wordList"
                        :key="'word-' + index"
                        style="margin-bottom: 2px"
                      >
                        <p class="body1">{{ word }}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p class="body1-bold">문장</p>
                    <div class="list-wrap scrollbar" style="width: 330px">
                      <div
                        v-for="(sentence, index) in lessonDetail.sentenceList"
                        :key="'sentence-' + index"
                        style="margin-bottom: 2px"
                      >
                        <p class="body1">{{ sentence }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </WrapContent>
</template>

<script>
import { lessonInfo, openlessoninfo, openlesson } from "../../api/api-list";
import { lessonsetting_ko } from "../../assets/translate/ko";
import { lessonsetting_vt } from "../../assets/translate/vt";
import WrapContent from "../common/WrapContent.vue";
import { getLessonDetail } from "../../api/api-list-2";
import SearchIcon from "../icons/SearchIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";

export default {
  components: {
    WrapContent,
    SearchIcon,
    CloseIcon,
  },
  data() {
    return {
      langlist: {
        ko: lessonsetting_ko,
        vt: lessonsetting_vt,
      },
      lessons: [],
      openinfo: [],
      open: 0,
      allflag: false,
      lessonDetails: [],
      dialog: false,
      loading: false,
      lessonDetail: [],
      selectedLessonIndex: null,
    };
  },
  created() {
    this.setlessoninfo();
    this.getLessonDetails();
  },
  methods: {
    async setlessoninfo() {
      const res = await lessonInfo();

      const res2 = await openlessoninfo();

      const lessonData = res.data.data;
      const openinfo = res2.data.data;

      this.openinfo = openinfo;
      let lessons = [];

      for (let i = 0; i < lessonData.length; i++) {
        if (openinfo.includes(i + 1)) {
          lessons.push({
            lessonName: lessonData[i],
            isOpen: true,
          });
        } else {
          lessons.push({
            lessonName: lessonData[i],
            isOpen: false,
          });
        }
      }

      const open = lessons.filter((item) => item.isOpen === true);

      if (lessons.length === open.length) {
        this.allflag = true;
      } else {
        this.allflag = false;
      }

      this.lessons = lessons;

      // console.log('openinfo', this.openinfo)
    },

    async getLessonDetails() {
      try {
        const res = await getLessonDetail(1);
        this.lessonDetails = res.data.data;
      } catch (error) {
        console.error("단원 상세 정보 조회 실패:", error);
      }
    },

    setnum(n) {
      return n.toString().padStart(2, "0");
    },
    selectall() {
      if (this.allflag == false) {
        for (let i = 0; i < this.lessons.length; i++) {
          this.lessons[i].isOpen = true;
        }
      } else {
        for (let i = 0; i < this.lessons.length; i++) {
          this.lessons[i].isOpen = false;
        }
      }
    },
    async savelessons() {
      const lessons = this.lessons;
      let openLessonList = [];

      // 열린 단원 갱신
      this.openinfo = [];

      for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].isOpen === true) {
          openLessonList.push(i + 1);
          this.openinfo.push(i + 1);
        }
      }

      const data = {
        openLessonList,
      };

      const res = await openlesson(data);
      if (res.data.result === true) {
        window.dispatchEvent(
          new CustomEvent("savelesson", {
            detail: {
              data: this.openinfo,
            },
          })
        );

        window.dispatchEvent(
          new CustomEvent("success", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "단원 설정이 저장되었습니다."
                ],
              ],
            },
          })
        );
      }
    },
    showLessonDetail(index) {
      this.selectedLessonIndex = index;
      this.showModal();
    },

    async showModal() {
      this.dialog = true;
      this.loading = true;
      try {
        const res = await getLessonDetail(this.selectedLessonIndex + 1);
        this.lessonDetail = res.data.data;
      } catch (error) {
        console.error("단원 상세 정보 조회 실패:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    lessons: {
      handler(newVal) {
        const open = this.lessons.filter((item) => item.isOpen === true);

        this.open = open;
        if (this.lessons.length === open.length) {
          this.allflag = true;
        } else {
          this.allflag = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.inner {
  width: 100%;
  min-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.btn {
  font-size: 14px;
  padding: 8px 24px;
  border: none;
  background: #258bff;
  color: #fff;
  border-radius: 6px;
}
label {
  font-size: 14px;
  color: #525252;
  margin-left: 10px;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  font-size: 16px;
  padding: 20px;
}
.item > div {
  display: flex;
  gap: 10px;
  align-items: center;
}
.unselectedlesson {
  width: 100%;
  background-color: white;
  border: 1px solid #cae3ff;
  height: 70px;
  border-radius: 20px;
  font-family: notosansmedium;
  margin: 15px 0;
  cursor: pointer;
}

.selectedlesson {
  width: 100%;
  background-color: #f1f8ff;
  border: 1px solid #f1f8ff;
  height: 70px;
  border-radius: 20px;
}
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;
  font-family: "notosans";
  font-size: 16px;
}
.modal-content {
  width: 960px;
  max-height: 650px;
  padding: 0 40px 30px;
  overflow: scroll;
}
.modal-content .flex {
  display: flex;
  justify-content: space-between;
}
.modal-content .box {
  display: flex;
  gap: 18px;
  border-radius: 20px;
  background: #f1f8ff;
  padding: 16px 24px 24px;
}
.list-wrap {
  padding: 6px 15px 0px 15px;
  overflow-y: scroll;
  border-radius: 15px;
  border: 1px solid #cae3ff;
  background: #fff;
  min-width: 158px;
  height: 158px;
}
.modal-content p.body1-bold {
  color: #3d90ef;
  margin-bottom: 6px;
}
.modal-content .progress {
  margin: 26px 34px;
}
.modal-content .num {
  font-size: 45px;
  font-family: "notosans";
}
</style>
