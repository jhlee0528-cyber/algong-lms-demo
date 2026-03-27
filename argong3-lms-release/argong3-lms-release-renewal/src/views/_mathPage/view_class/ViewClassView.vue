<template>
  <div class="wrap">
    <div class="view-class">
      <div v-if="isLoading" class="loading-skeleton"></div>
      <WrapContent v-else style="width: 100%">
        <div class="inner" v-if="missionDetail">
          <div style="width: 65%">
            <h4>{{ missionDetail.missionName }}</h4>
            <div class="detail">
              <div class="item">
                <div class="info">
                  <h6>단원</h6>
                  <p>
                    {{ missionDetail?.mathLessonInfo?.unit }}단원 &lt;{{
                      missionDetail?.mathLessonInfo?.unitTitle
                    }}&gt;
                  </p>
                </div>
              </div>

              <div class="item">
                <div class="info">
                  <h6>기간</h6>
                  <p>{{ formattedStartDate }} ~ {{ formattedEndDate }}</p>
                </div>
              </div>

              <div class="item">
                <div class="info">
                  <h6>과제 유형</h6>
                  <ul v-if="missionDetail">
                    <li>
                      {{ missionDetail?.missionTypeText?.typeText }}
                      ({{ missionDetail?.mathLessonInfo?.semester }}학기
                      {{ missionDetail?.mathLessonInfo?.unit }}단원
                      <template
                        v-if="
                          missionDetail?.missionTypeText.missionType === 2 &&
                          missionDetail?.missionTypeText?.lessonInfo
                        "
                      >
                        <template
                          v-for="(item, index) in missionDetail.missionTypeText
                            .lessonInfo"
                          :key="index"
                        >
                          {{ lessonTexts[item.lesson] }}
                          {{ item.count }}문제<template
                            v-if="
                              index !==
                              missionDetail.missionTypeText.lessonInfo.length -
                                1
                            "
                            >,
                          </template>
                        </template>
                      </template>
                      <template v-else>
                        {{ missionDetail?.missionTypeText?.count }}문제
                      </template>
                      )
                    </li>
                  </ul>
                </div>
              </div>

              <div class="item">
                <div class="info">
                  <h6>보상</h6>
                  <ul>
                    <li>4종 스톤 x{{ missionDetail.rewards.stone }}</li>
                    <li>골드 x{{ missionDetail.rewards.gold }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div style="width: 35%">
            <h4>완료율</h4>
            <div class="centent">
              <div class="chart-wrap">
                <div class="chart_blue-bg" style="width: 360px; height: 12px">
                  <div
                    class="chart_bar"
                    :style="{ width: missionCompletionStats.percentage + '%' }"
                  ></div>
                </div>
                <span
                  >{{ missionDetail.completeStudentCount }}/{{
                    missionDetail.totalStudentCount
                  }}명 완료</span
                >
              </div>
            </div>

            <TooltipIcon
              class="tooltip"
              :tooltipText="[
                '‘수업 보기’ 화면은 ‘수업 집중 모드’로 설정 된 미션의 진행률을 실시간으로 확인할 수 있습니다.',
                '수업 집중 모드 미션이 없는 경우, 학생들의 접속 여부와 현재 활동 콘텐츠만 확인 가능합니다.',
              ]"
            />
          </div>
        </div>

        <!-- 수업 집중모드 off -->
        <div class="inner2" v-else>
          <div class="center">
            <p>
              '수업보기' 화면은 <span>'수업 집중 모드'</span>로 설정 된
              <span>미션의 진행률을 실시간</span>으로 확인할 수 있습니다.<br />
              수업 집중 모드 미션이 없는 경우, 학생들의 <span>접속 여부</span>와
              <span>현재 활동 콘텐츠만 확인 가능</span>합니다.
            </p>
          </div>
          <div class="center">
            <button @click="$router.push('/class/setting')">
              학습 설정 가기
            </button>
          </div>
        </div>
      </WrapContent>

      <div class="flex">
        <div class="signal-wrap noselect">
          <p class="signal-text">
            <span class="signal signal-yellow"></span
            >{{ langlist[$store.state.lang]["접속중"] }}
          </p>
          <p class="signal-text">
            <span class="signal signal-blue"></span
            >{{ langlist[$store.state.lang]["학습중"] }}
          </p>
        </div>
        <div v-show="reallogout === true" class="logout-wrap">
          <p>
            {{ langlist[$store.state.lang]["로그아웃 진행중"] }}
          </p>
          <div class="progress-bar">
            <v-progress-linear
              color="red"
              width="200"
              height="14"
              :model-value="logoutpercent"
              style="border-radius: 15px"
            ></v-progress-linear>
          </div>
        </div>

        <div class="btn-wrap">
          <button @click="refresh()" class="refresh-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 14C6.325 14 4.90625 13.4187 3.74375 12.2562C2.58125 11.0937 2 9.675 2 8C2 6.325 2.58125 4.90625 3.74375 3.74375C4.90625 2.58125 6.325 2 8 2C8.8625 2 9.6875 2.178 10.475 2.534C11.2625 2.89 11.9375 3.3995 12.5 4.0625V2H14V7.25H8.75V5.75H11.9C11.5 5.05 10.9532 4.5 10.2597 4.1C9.56625 3.7 8.813 3.5 8 3.5C6.75 3.5 5.6875 3.9375 4.8125 4.8125C3.9375 5.6875 3.5 6.75 3.5 8C3.5 9.25 3.9375 10.3125 4.8125 11.1875C5.6875 12.0625 6.75 12.5 8 12.5C8.9625 12.5 9.83125 12.225 10.6063 11.675C11.3813 11.125 11.925 10.4 12.2375 9.5H13.8125C13.4625 10.825 12.75 11.9063 11.675 12.7438C10.6 13.5813 9.375 14 8 14Z"
                fill="white"
              /></svg
            >{{ langlist[$store.state.lang]["새로고침"] }}
          </button>
          <button @click="logout()" class="logout-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 8.31579C8.18889 8.31579 8.34711 8.25516 8.47467 8.13389C8.60222 8.01263 8.66622 7.86274 8.66667 7.68421V2.63158C8.66667 2.45263 8.60267 2.30274 8.47467 2.18189C8.34667 2.06105 8.18845 2.00042 8 2C7.81111 2 7.65267 2.06063 7.52467 2.18189C7.39667 2.30316 7.33289 2.45305 7.33333 2.63158V7.68421C7.33333 7.86316 7.39733 8.01326 7.52533 8.13453C7.65333 8.25579 7.81156 8.31621 8 8.31579ZM8 14C8.83333 14 9.61378 13.8501 10.3413 13.5503C11.0689 13.2505 11.7022 12.8453 12.2413 12.3345C12.7804 11.8238 13.2082 11.2238 13.5247 10.5345C13.8411 9.84526 13.9996 9.10568 14 8.31579C14 7.67368 13.8889 7.04989 13.6667 6.44442C13.4444 5.83895 13.1222 5.28379 12.7 4.77895C12.5778 4.63158 12.4222 4.56063 12.2333 4.56611C12.0444 4.57158 11.8778 4.64253 11.7333 4.77895C11.6111 4.89474 11.5556 5.03684 11.5667 5.20526C11.5778 5.37368 11.6389 5.53158 11.75 5.67895C12.05 6.05789 12.2778 6.47368 12.4333 6.92632C12.5889 7.37895 12.6667 7.8421 12.6667 8.31579C12.6667 9.54737 12.2138 10.5922 11.308 11.4503C10.4022 12.3084 9.29956 12.7373 8 12.7368C6.7 12.7368 5.59711 12.308 4.69133 11.4503C3.78556 10.5926 3.33289 9.54779 3.33333 8.31579C3.33333 7.83158 3.40822 7.36042 3.558 6.90232C3.70778 6.44421 3.944 6.02589 4.26667 5.64737C4.37778 5.51053 4.43889 5.36063 4.45 5.19768C4.46111 5.03474 4.40556 4.89516 4.28333 4.77895C4.15 4.65263 3.98889 4.58695 3.8 4.58189C3.61111 4.57684 3.45556 4.64253 3.33333 4.77895C2.9 5.28421 2.56933 5.83684 2.34133 6.43684C2.11333 7.03684 1.99956 7.66316 2 8.31579C2 9.10526 2.15822 9.84484 2.47467 10.5345C2.79111 11.2242 3.21889 11.8242 3.758 12.3345C4.29711 12.8448 4.93045 13.2501 5.658 13.5503C6.38556 13.8505 7.16622 14.0004 8 14Z"
                fill="white"
              />
            </svg>
            {{ langlist[$store.state.lang]["전체 로그아웃"] }}
          </button>
        </div>
      </div>

      <classmanage
        :students="students"
        :playing="playing"
        :targetmissions="missions"
        :completeList="completeList"
        :currentMission="missions"
      ></classmanage>
    </div>

    <v-dialog width="500" v-model="logoutcheck">
      <div class="logout-modal">
        <div class="alertimg"></div>
        <h6>
          {{
            langlist[$store.state.lang]["현재 학급 전체 로그아웃을 진행할까요?"]
          }}
        </h6>
        <p>
          {{ langlist[$store.state.lang]["학생들에게 알림이 가고,"] }}
        </p>
        <p>
          {{
            langlist[$store.state.lang]["30초 후부터 로그아웃 처리가 됩니다."]
          }}
        </p>

        <div>
          <v-btn
            @click="logoutcancel()"
            class="btn btn-cancel"
            variant="outlined"
            ><span>{{ langlist[$store.state.lang]["취소"] }}</span></v-btn
          >
          <v-btn @click="logoutok()" class="btn btn-ok" variant="outlined"
            ><span>{{ langlist[$store.state.lang]["확인"] }}</span></v-btn
          >
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import classmanage from "../../../components/classmanage/classmanage.vue";
import { todayclass, userInfo } from "../../../api/api-list";
import { classmanage_ko } from "../../../assets/translate/ko";
import { classmanage_vt } from "../../../assets/translate/vt";
import WrapContent from "../../../components/common/WrapContent.vue";
import TooltipIcon from "../../../components/common/TooltipIcon.vue";
import {
  getTeacherMissions,
  getMissionDetail2,
  getMathUnitDetail,
  getPriorityMission,
} from "../../../api/api-list-2";

export default {
  async created() {
    this.isLoading = true;
    window.addEventListener("missionfire", this.handlefire);
    const res = await todayclass();
    this.students = res.data.data;
    this.students = this.students.sort(
      (a, b) => a.attendanceNumber - b.attendanceNumber
    );

    // const res2 = await getcurrentmission();
    // this.missions = res2.data.data;

    const missionsResponse = await getPriorityMission();
    if (missionsResponse.data && missionsResponse.data.data) {
      const priorityMissions = missionsResponse.data.data.filter(
        (mission) => mission.missionMode === true && mission.subject === "math"
      );

      if (priorityMissions.length > 0) {
        this.missions = priorityMissions[0];

        // 미션 상세조회 호출
        const detailRes = await getMissionDetail2({
          uid: this.missions.uid,
          subject: this.missions.subject,
          users: Array.isArray(this.missions.students)
            ? this.missions.students
            : [],
        });

        if (detailRes.data && detailRes.data.data) {
          this.missionDetail = detailRes.data.data;
          await this.fetchMathLessonDetails();
        }
      } else {
        this.missions = null;
        this.missionDetail = null;
      }
    }
    this.isLoading = false;

    const userinfo = (await userInfo()).data.data;
    this.userinfo = userinfo;

    this.socket = this.$socket;

    this.socket.on("connect", (message) => {});

    this.socket.on("accessSuccess", (message) => {});

    this.socket.on("updatePlaying", (message) => {
      this.playing = message;
    });

    this.socket.on("completeTeacherMission", (message) => {
      this.completeList = message.completeUserList;
    });

    this.socket.on("terminateConnection", (message) => {});

    const info = {
      userId: userinfo.id,
      schoolCode: userinfo.schoolCode,
      grade: userinfo.grade,
      classNum: userinfo.classNum,
    };

    this.socket.emit("access", JSON.stringify(info));
    this.socket.emit(
      "updatePlaying",
      JSON.stringify({
        id: userinfo.id,
        playing: "planet",
      })
    );
    this.socket.emit(
      "completeTeacherMission",
      JSON.stringify({
        id: userinfo.id,
        playing: "planet",
      })
    );
    setInterval(() => {
      this.socket.emit(
        "updatePlaying",
        JSON.stringify({
          id: userinfo.id,
          playing: "planet",
        })
      );
    }, 5000);

    await this.fetchMathLessonDetails();
  },
  mounted() {},
  data() {
    return {
      langlist: {
        ko: classmanage_ko,
        vt: classmanage_vt,
      },
      students: [],
      playing: {},
      userinfo: "",
      missions: "",
      missionDetail: null,
      completeList: [],
      logoutpercent: 0,
      logoutcheck: false,
      reallogout: false,
      isLoading: true,
      mathLessonDetails: null,
    };
  },
  computed: {
    formattedStartDate() {
      if (!this.missionDetail?.startDate) return "";
      const date = new Date(this.missionDetail.startDate);
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(date.getDate()).padStart(2, "0")}(${days[date.getDay()]})`;
    },
    formattedEndDate() {
      if (!this.missionDetail?.endDate) return "";
      const date = new Date(this.missionDetail.endDate);
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(date.getDate()).padStart(2, "0")}(${days[date.getDay()]})`;
    },
    missionCompletionStats() {
      if (!this.missionDetail)
        return { completeCount: 0, totalCount: 0, percentage: 0 };

      const completeCount = this.missionDetail.completeStudentCount || 0;
      const totalCount = this.missionDetail.totalStudentCount || 0;
      const percentage =
        totalCount > 0 ? Math.round((completeCount / totalCount) * 100) : 0;

      return {
        completeCount,
        totalCount,
        percentage,
      };
    },
    lessonTexts() {
      if (
        !this.mathLessonDetails ||
        !this.missionDetail?.missionTypeText?.lessonInfo
      )
        return {};

      return this.missionDetail.missionTypeText.lessonInfo.reduce(
        (acc, item) => {
          const lessonDetail = this.mathLessonDetails[item.lesson];
          acc[item.lesson] =
            lessonDetail?.lessonTitle || lessonDetail || `${item.lesson} 차시`;
          return acc;
        },
        {}
      );
    },
  },
  components: {
    classmanage,
    WrapContent,
    TooltipIcon,
  },
  methods: {
    socketon() {},
    async refresh() {
      const missionsResponse = await getPriorityMission();
      if (missionsResponse.data && missionsResponse.data.data) {
        const priorityMissions = missionsResponse.data.data.filter(
          (mission) =>
            mission.missionMode === true && mission.subject === "math"
        );

        if (priorityMissions.length > 0) {
          this.missions = priorityMissions[0];

          // 미션 상세조회 호출
          const detailRes = await getMissionDetail2({
            uid: this.missions.uid,
            subject: this.missions.subject,
            users: Array.isArray(this.missions.students)
              ? this.missions.students
              : [],
          });

          if (detailRes.data && detailRes.data.data) {
            this.missionDetail = detailRes.data.data;

            console.log("this.missionDetail", this.missionDetail);
          }
        } else {
          this.missions = null;
          this.missionDetail = null;
        }
      }
    },
    logout() {
      this.logoutcheck = true;
    },
    logoutok() {
      this.socket.emit(
        "userConnectionTerminate",
        JSON.stringify({
          schoolCode: this.userinfo.schoolCode,
          grade: this.userinfo.grade,
          classNum: this.userinfo.classNum,
        })
      );

      this.logoutcheck = false;
      this.reallogout = true;

      const interval = setInterval(() => {
        this.logoutpercent += 3.33333333;

        if (this.logoutpercent > 99) {
          this.logoutpercent = 100;
          this.reallogout = false;
          clearInterval(interval);
        }
      }, 1000);
    },
    logoutcancel() {
      this.logoutcheck = false;
    },
    handlefire() {
      this.missions.activate = true;
    },
    async fetchMathLessonDetails() {
      if (!this.missionDetail?.mathLessonInfo) {
        console.log("수업 집중 모드 미션이 없습니다.");
        return;
      }

      try {
        const response = await getMathUnitDetail();

        const unitDetails = response.data.data.find(
          (unit) =>
            unit.semester === this.missionDetail.mathLessonInfo.semester &&
            unit.unitTitle === this.missionDetail.mathLessonInfo.unitTitle
        );

        if (unitDetails) {
          this.mathLessonDetails = unitDetails.lessons.reduce((acc, lesson) => {
            acc[lesson.lesson] = lesson;
            return acc;
          }, {});
        } else {
          console.log("일치하는 단원을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("수학 차시 정보 조회 실패:", error);
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  padding-top: 120px;
}

.view-class {
  width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.flex {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.signal-wrap {
  display: flex;
}
.signal-text {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  font-family: notosansmedium;
}
.signal {
  width: 14px;
  height: 14px;
  border-radius: 30px;
}
.signal-yellow {
  background-color: #fff2ae;
  border: 1px solid #ffda19;
}
.signal-blue {
  margin-left: 20px;
  border: 1px solid #3693ff;
  background-color: #85beff;
}

.logout-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  p {
    font-size: 17px;
    font-family: notosans;
    margin-left: 0;
  }

  .progress-bar {
    width: 200px;
  }
}

.btn-wrap {
  display: flex;
  gap: 14px;
  > button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    font-family: notosansmedium;
    font-size: 14px;
    color: #fff;
  }
}
.refresh-btn {
  background-color: #258bff;
}
.logout-btn {
  background-color: #f34c4c;
}

.logout-modal {
  width: 500px;
  background-color: white;
  border-radius: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 20px;

  h6 {
    font-family: notosans;
    font-size: 21px;
  }

  p {
    font-family: notosansregular;
    font-size: 16px;
  }

  .btn {
    border: none;
    width: 180px;
    height: 50px;
    border-radius: 10px;

    span {
      font-size: 18px;
      font-family: notosansregular;
    }
  }

  .btn-cancel {
    border: 1px solid #cfcfcf;

    span {
      color: #292929;
    }
  }

  .btn-ok {
    margin-left: 20px;
    background-color: #258bff;

    span {
      color: #fff;
    }
  }
}

.alertimg {
  background-image: url("../../../assets/image/alerticon.png");
  background-size: 100%;
  width: 40px;
  height: 40px;
}

.inner {
  position: relative;
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 120px;

  &::before {
    position: absolute;
    top: 50%;
    left: 63.8%;
    transform: translate(-50%, -50%);
    background-color: #d4d4d4;
    width: 1px;
    height: 90%;
    content: "";
    display: block;
  }
}

.inner2 {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.detail .info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #292929;

  h6 {
    color: #3d90ef;
    font-size: 16px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 30px;

    li {
      position: relative;

      &::before {
        content: "|";
        color: #d4d4d4;
        position: absolute;
        right: -16px;
      }
      &:last-child::before {
        display: none;
      }
    }
  }
}
.detail .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  padding: 8px 0;

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.centent {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
}

.chart-wrap {
  text-align: center;
  span {
    font-size: 16px;
    margin-top: 10px;
  }
}

h4 {
  padding-bottom: 15px;
}

.tooltip {
  position: absolute;
  right: 0;
  top: 0;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px 0;
  p {
    color: #6b6b6b;
    font-size: 18px;
    span {
      font-family: "notosans";
    }
  }
  button {
    background: #258bff;
    padding: 8px 24px;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    font-family: notosansmedium;
  }
}

.loading-skeleton {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  animation: fadeBackground 1s infinite;
  border-radius: 20px;
}
</style>
