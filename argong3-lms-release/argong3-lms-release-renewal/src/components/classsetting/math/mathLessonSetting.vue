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
            <br />
            단원은 학교 진도에 맞춰 순차 오픈 될 예정입니다.
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
              lessons.filter((item) => item.isOpen === true).length
            }}/{{ lessons.length }})
          </p>
        </div>

        <div
          v-for="(j, i) in lessons"
          :key="i"
          class="unselectedlesson"
          :class="{
            selectedlesson: j.isOpen === true,
            disabledlesson: j.status === false,
          }"
          @click="selectElement(i)"
        >
          <div v-if="j.status === true" class="item">
            <input v-model="j.isOpen" type="checkbox" />
            <p>{{ j.semester }}-{{ j.unit }}. {{ j.unitTitle }}</p>
          </div>

          <div v-if="j.status === false" class="disabled">
            <input v-model="j.isOpen" type="checkbox" disabled />
            <p>{{ j.semester }}-{{ j.unit }}. {{ j.unitTitle }}</p>
            <p class="gray-text">{{ montharr[i] }}월 중 오픈 예정입니다.</p>
          </div>
        </div>
      </div>
    </div>
  </WrapContent>
</template>

<script>
import { getOpenUnitList, editOpenUnitList } from "../../../api/math-api-list";
import { lessonsetting_ko } from "../../../assets/translate/ko";
import { lessonsetting_vt } from "../../../assets/translate/vt";
import WrapContent from "../../common/WrapContent.vue";

export default {
  components: {
    WrapContent,
  },
  data() {
    return {
      langlist: {
        ko: lessonsetting_ko,
        vt: lessonsetting_vt,
      },
      open: 0,
      allflag: false,
      montharr: [2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6],
    };
  },
  created() {},
  props: {
    lessons: {
      required: true,
    },
  },
  methods: {
    selectElement(index) {
      if (this.lessons[index].status === true) {
        this.lessons[index].isOpen = !this.lessons[index].isOpen;
      }
    },
    selectall() {
      if (this.allflag == false) {
        for (let i = 0; i < this.lessons.length; i++) {
          if (this.lessons[i].status === true) {
            this.lessons[i].isOpen = true;
          }
        }
      } else {
        for (let i = 0; i < this.lessons.length; i++) {
          this.lessons[i].isOpen = false;
        }
      }
    },
    async savelessons() {
      const data = {
        openUnitList: this.lessons,
      };

      const res = await editOpenUnitList(data);
      if (res.data.result === true) {
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
  },
  watch: {
    // lessons(newval) {
    //   console.log(newval);
    //   const open = this.lessons.filter((item) => item.isOpen === true);

    //   if (this.lessons.length === open.length) {
    //     this.allflag = true;
    //   } else {
    //     this.allflag = false;
    //   }
    // },
    lessons: {
      handler(newVal) {
        const open = this.lessons.filter(
          (item) => item.isOpen === true && item.status === true
        );

        this.open = open;
        const activeLessonLength = this.lessons.filter(
          (item) => item.status === true
        ).length;
        if (activeLessonLength === open.length) {
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
  gap: 15px;
  font-size: 16px;
  padding: 20px;

  &.disabled {
    justify-content: space-between;
    .gray-text {
      font-size: 12px;
      color: #6b6b6b;
    }
  }
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

.disabledlesson {
  background-color: #f7f7f7;
  border: none;
  cursor: default !important;
  input {
    display: none;
  }
  padding-left: 34px;
}
</style>
