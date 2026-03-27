<template>
  <div class="wrap noselect">
    <div class="inner">
      <div class="card">
        <h4 v-show="$store.state.lang === 'ko'" class="headline">
          {{ userinfo.grade }}학년
          {{ langlist[store.state.lang]["단원 선택"] }}
        </h4>
        <h4 v-show="$store.state.lang === 'vt'" class="headline">
          Grade {{ userinfo.grade }}
          {{ langlist[store.state.lang]["단원 선택"] }}
        </h4>

        <div class="wrap-dropdown">
          <input
            v-model="selectText"
            class="unit-dropdown"
            @click="onClickDropbox"
            readonly
          />
          <div class="arrow" @click="onClickDropbox"></div>
          <div v-show="isUnitOpen" ref="UnitRef" class="wrap-units">
            <div
              v-for="(unit, i) in units"
              :key="i"
              @click="onClickUnit(i)"
              class="font_18_r"
              :class="selected === i ? 'unit_selected' : 'unit'"
            >
              {{ selectedUnitText(units[i]) }}
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-show="infos.length">
        <div class="flex-center-between" style="margin-bottom: 24px">
          <h4 class="headline2">
            {{ selectedUnit["semester"] }}학기 {{ selectedUnit["unit"]
            }}{{ langlist[store.state.lang]["단원"] }}
            {{ langlist[store.state.lang]["학습결과"] }}
          </h4>
          <div class="blue-bg">
            <p class="body1" style="color: var(--main-blue)">
              {{ langlist[store.state.lang]["평균 진행률"] }}
            </p>
            <p class="font_18_m">{{ average }}%</p>
            <div class="chart_blue-bg" style="width: 172px; height: 6px">
              <div class="chart_bar" :style="{ width: average + '%' }"></div>
            </div>
          </div>
        </div>
        <div>
          <table class="table-style">
            <thead>
              <tr>
                <th style="width: 80px">
                  <span>
                    {{ langlist[store.state.lang]["번호"] }}
                    <div
                      class="updown"
                      @click="onClickSortNumber('attendanceNumber')"
                    ></div>
                  </span>
                </th>
                <th style="width: 130px">
                  <span>
                    {{ langlist[store.state.lang]["이름"] }}
                    <div class="updown" @click="onClickSortString"></div>
                  </span>
                </th>
                <th style="width: 100px">
                  {{ langlist[store.state.lang]["아이디"] }}
                </th>
                <th style="width: 150px">
                  {{ langlist[store.state.lang]["닉네임"] }}
                </th>
                <th style="width: 150px">
                  <span>
                    {{ langlist[store.state.lang]["학습 진행률"] }}
                    <div
                      class="updown"
                      @click="onClickSortNumber('finishedPercent')"
                    ></div>
                  </span>
                </th>
                <th style="width: 115px">
                  <span>
                    {{ langlist[store.state.lang]["정답률"] }}
                    <div
                      class="updown"
                      @click="onClickSortNumber('correctPercent')"
                    ></div>
                  </span>
                </th>
                <th style="width: 114px">
                  <span>
                    {{ langlist[store.state.lang]["학습시간"] }}

                    <div
                      class="updown"
                      @click="onClickSortNumber('studyTime')"
                    ></div>
                  </span>
                </th>
                <th style="width: 119px; text-align: center">
                  {{ langlist[store.state.lang]["학습상세"] }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(j, i) in infos" :key="i">
                <td>
                  {{ String(j.attendanceNumber).padStart(2, "0") || "-" }}
                </td>
                <td>
                  {{ j.name || "-" }}
                </td>
                <td>
                  {{ j.id || "-" }}
                </td>
                <td>
                  {{ j.nickname || "없음" }}
                </td>
                <td>
                  <div class="flex_center">
                    <div style="width: 40px">
                      {{ String(j.progress) || "-" }}%
                    </div>
                    <div
                      class="chart_blue-bg"
                      style="width: 100px; height: 6px; margin-left: 8px"
                    >
                      <div
                        class="chart_bar"
                        :style="{ width: j.progress + '%' }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>{{ j.answerPercent || "0" }}%</td>
                <td>
                  {{ parseInt((j.studyTime * 3) / 60) || "0"
                  }}{{ langlist[store.state.lang]["분"] }}
                </td>
                <td>
                  <button
                    class="btn_more body2-bold"
                    @click="
                      onClickMore(
                        j.id,
                        selectedUnit.semester,
                        selectedUnit.unit
                      )
                    "
                  >
                    More
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card loading-skeleton" v-show="!infos.length"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import WrapContent from "../../components/common/WrapContent.vue";
import { saveCookie, getSaveCookie, deleteCookie } from "../../store/cookie";
import { learningstatus_ko } from "../../assets/translate/ko";
import { learningstatus_vt } from "../../assets/translate/vt";
import {
  classMathSummary,
  getSSORestrict,
  mathLessonList,
} from "../../api/api-list-2";
import { getMathStudents } from "../../api/math-api-list";

const store = useStore();
const router = useRouter();

const units = ref([]);
const infos = ref([]);
const selected = ref(0);
const selectedUnit = ref("");
const average = ref(0);
const isUnitOpen = ref(false);
const UnitRef = ref(null);
const unitProgress = ref([]);
const userinfo = ref({});
const restrict = ref(0);
const selectText = ref("");

const langlist = ref({
  ko: learningstatus_ko,
  vt: learningstatus_vt,
});

onBeforeMount(async () => {
  const res100 = await mathLessonList();

  userinfo.value = res100.data.data;

  const check = userinfo.value;
  if (!check) {
    deleteCookie("info");
    window.location.reload();
  }

  const info = userinfo.value;
  units.value = info.lessonList;
  selected.value = 0;
  selectedUnit.value = units.value[0];
  selectText.value = selectedUnitText(selectedUnit.value);

  const { schoolCode, grade, classNum } = userinfo.value;

  await classMathSummary();

  const lessonsave = getSaveCookie(
    `mathlessonsave${userinfo.value.grade}${userinfo.value.classNum}${userinfo.value.id}`
  );

  if (lessonsave) {
    const semester = parseInt(lessonsave.split("-")[0]);
    const unit = parseInt(lessonsave.split("-")[1]);

    if (semester && unit) {
      const target = units.value;
      const target2 = target.filter(
        (item) =>
          item.semester === semester &&
          item.unit === unit &&
          item.grade === grade
      );

      if (target2.length) {
        for (let i = 0; i < target.length; i++) {
          if (JSON.stringify(target[i]) === JSON.stringify(target2[0])) {
            selected.value = i;
          } else {
            continue;
          }
        }

        selectedUnit.value = target2[0];
        selectText.value = selectedUnitText(target2[0]);
      }
    }
  }

  const { semester, unit } = selectedUnit.value;

  const students = (
    await getMathStudents({ grade, classNum, schoolCode, semester, unit })
  ).data.data;

  infos.value = students.sort(
    (a, b) => a.attendanceNumber - b.attendanceNumber
  );

  average.value = caculateAllProgress(students.map((item) => item.progress));

  const res101 = await getSSORestrict(schoolCode);

  restrict.value = res101.data.data;

  const _restrict = restrict.value;
  if (!students.length && _restrict !== -1) {
    sessionStorage.setItem("sso", true);
    router.push({ path: "/setting" });
  }
});

onMounted(async () => {
  onClickOutside(UnitRef, () => {
    isUnitOpen.value = false;
  });
});

const caculateAllProgress = (data) => {
  let stuProgress = 0;
  for (let i = 0; i < data.length; i++) {
    stuProgress += data[i];
  }

  return Math.ceil((stuProgress / (100 * data.length)) * 100);
};

const selectedUnitText = (data) => {
  return `${data.semester}-${data.unit}. ${data.unitTitle}`;
};

const onClickDropbox = () => {
  isUnitOpen.value = true;
};

const onClickUnit = async (num) => {
  isUnitOpen.value = false;
  selectedUnit.value = units.value[num];
  selected.value = num;
  selectText.value = selectedUnitText(units.value[num]);

  const { semester, unit } = selectedUnit.value;

  saveCookie(
    `mathlessonsave${userinfo.value.grade}${userinfo.value.classNum}${userinfo.value.id}`,
    `${semester}-${unit}`
  );

  const { schoolCode, grade, classNum } = userinfo.value;
  const students = (
    await getMathStudents({ grade, classNum, schoolCode, semester, unit })
  ).data.data;

  infos.value = students.sort(
    (a, b) => a.attendanceNumber - b.attendanceNumber
  );

  average.value = caculateAllProgress(students.map((item) => item.progress));
};

const onClickSortNumber = (type) => {
  const sortedAscending = infos.value.every(
    (val, i, arr) => i === 0 || arr[i - 1][type] <= val[type]
  );
  infos.value.sort((a, b) =>
    sortedAscending ? b[type] - a[type] : a[type] - b[type]
  );
};

const onClickSortString = () => {
  const sortedAscending = infos.value.every(
    (val, i, arr) =>
      i === 0 || arr[i - 1]["name"].localeCompare(val["name"]) > 0
  );
  infos.value.sort((a, b) =>
    sortedAscending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
};

const onClickMore = (id, semester, unit) => {
  router.push(`/math/learning/${id}/${semester}/${unit}`);
};
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  padding: 100px 0;
}
.inner {
  width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.card {
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 26px 30px;
}
.wrap-dropdown {
  position: relative;
  width: 550px;
  margin-top: 20px;
  margin-left: 0px;
  z-index: 6;
  font-size: 18px;
}
.unit-dropdown {
  width: inherit;
  height: 58px;
  padding: 0 30px;
  color: var(--main-black2);
  background-color: var(--main-lightblue);
  border-radius: 12px;
  outline: none;
  cursor: pointer;
}
.arrow {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 6px;
  transform: translate(0%, -50%);
  background-image: url("../../assets/image/Btn_Down02.png");
  background-size: 40%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 0;
}
.wrap-units {
  position: absolute;
  width: 100%;
  height: fit-content;
  max-height: 150px;
  top: 68px;
  right: 0;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
  overflow-y: auto;
}
.wrap-units::-webkit-scrollbar {
  width: 8px;
}
.wrap-units::-webkit-scrollbar-thumb {
  height: 30%;
  background: #c9c9c9;
  border-radius: 10px;
}
.unit {
  height: 50px;
  box-sizing: border-box;
  padding: 11px 28px;
  cursor: pointer;
}
.unit_selected {
  box-sizing: border-box;
  height: 50px;
  padding: 10px 28px;
  background-color: var(--main-lightblue);
  color: var(--main-blue);
  cursor: pointer;
}
.unit:hover {
  background-color: #ebebeb;
}
.table-style {
  width: 100%;
  border-spacing: 0;
  border-radius: 16px;
  box-shadow: 0 0 0 1px var(--chart-blue-bg);
  overflow: hidden;
  text-align: center;

  thead {
    background-color: var(--main-lightblue);
  }

  th {
    position: relative;
    padding: 12px 8px;
    font-size: 14px;
    > span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  td {
    padding: 16px 8px;
    font-size: 15px;
  }

  th,
  td {
    border-bottom: 1px solid var(--chart-blue-bg);
    border-right: 1px solid var(--chart-blue-bg);
    &:last-child {
      border-right: none;
    }
  }
  tr:last-child td {
    border-bottom: none;
  }
}
.updown {
  width: 18px;
  height: 18px;
  margin-left: 3px;
  background-image: url("../../assets/image/Btn_UpDown.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.btn_more {
  width: 75px;
  height: 34px;
  color: var(--main-blue);
  background-color: white;
  border-radius: 20px;
  border: 1px solid var(--main-blue);
  margin: 0 auto;
}
.btn_more:hover {
  background-color: var(--main-blue);
  color: white;
  transition: 200ms ease;
}
.long {
  width: 180px;
}
.textbook_img {
  background-image: var(--bg-image);
  background-size: 100%;
}
.blue-bg {
  width: fit-content;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 8px 25px;
  color: var(--main-black);
  background-color: var(--main-lightblue);
  border-radius: 12px;
}
.loading-skeleton {
  width: 100%;
  height: 830px;
  background-color: rgb(220, 220, 220);
  animation: fadeBackground 1s infinite;
}
</style>
