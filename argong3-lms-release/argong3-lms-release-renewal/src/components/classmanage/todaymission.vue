<template>
  <div class="maindiv">
    <div class="inner">
      <div class="title">
        <p
          :class="{
            todaytextko: $store.state.lang === 'ko',
            todaytextvt: $store.state.lang === 'vt',
          }"
        >
          {{ langlist[$store.state.lang]["오늘의 미션"] }}
        </p>
      </div>

      <div class="mission-content">
        <div v-if="missions === ''">
          <div
            style="
              background-color: rgb(220, 220, 220);
              width: 100%;
              height: 100%;
              z-index: 11111;
              border-radius: 15px;
              animation-name: fadeBackground;
              animation-duration: 1s;
              animation-iteration-count: infinite;
            "
          ></div>
        </div>
        <div
          class="mission-wrap"
          v-if="missions !== false && activate !== false"
        >
          <!-- icon-wrap -->
          <div class="icon-wrap">
            <div v-for="(j, i) in missions" :key="i" class="imgdiv">
              <div :class="j.type"></div>
              <div>
                <p
                  v-show="j.requireNum !== -1"
                  class="imgdivtext"
                  style="color: #3480d8; width: 120px; margin-left: -5px"
                >
                  {{ j.kor }} {{ j.requireNum
                  }}{{ langlist[$store.state.lang]["회"] }}
                </p>
              </div>
              <p
                v-show="j.requireNum === -1"
                class="imgdivtext"
                style="margin-top: 12px; color: #636363"
              >
                {{ j.kor }}
              </p>
            </div>
          </div>

          <!-- progress-wrap -->
          <div class="progress-wrap">
            <div v-for="(j, i) in missions" :key="i">
              <div class="leveldiv">
                <p v-show="i === 0" class="leveltext" style="margin-top: 7.5px">
                  ···
                </p>
                <p
                  v-show="i > 0 && i < missions.length - 1"
                  class="leveltext"
                  style="font-size: 20px; margin-top: 3px"
                >
                  {{ i }}
                </p>
                <p
                  v-show="i === missions.length - 1"
                  class="leveltext"
                  style="font-size: 24px; margin-top: -1px"
                >
                  ★
                </p>
              </div>
              <div
                v-if="i !== missions.length - 1 && i !== missions.length - 2"
                :class="{
                  progressinactivate: missionStatus[i] === 0,
                  progressactivate: missionStatus[i] !== 0,
                }"
                style="
                  float: left;
                  width: 135px;
                  height: 10px;
                  margin-top: 15px;
                "
              ></div>
              <div
                v-if="i == missions.length - 2"
                :class="{
                  progressinactivate: completeList.length < 2,
                  progressactivate: completeList.length > 1,
                }"
                style="
                  float: left;
                  width: 135px;
                  height: 10px;
                  margin-top: 15px;
                "
              ></div>
            </div>
          </div>

          <!-- person-wrap -->
          <div class="person-wrap" style="margin-top: 5px">
            <div v-for="(j, i) in missions" :key="i">
              <div
                v-if="i === 0"
                style="
                  width: 50px;
                  height: 30px;
                  margin-left: 92px;
                  margin-top: 7px;
                  float: left;
                "
              >
                <div>
                  <div class="person" style="margin-left: 11px"></div>
                  <p
                    style="
                      float: left;
                      font-size: 13px;
                      margin-left: 5px;
                      font-family: notosansregular;
                    "
                  >
                    {{ playingcount["waiting"] }}
                  </p>
                </div>
              </div>
              <div
                v-if="i !== 0 && i !== missions.length - 1"
                style="
                  width: 50px;
                  height: 30px;
                  margin-left: 125.3px;
                  margin-top: 7px;
                  float: left;
                "
              >
                <div>
                  <div class="person" style="margin-left: 11px"></div>
                  <p
                    style="
                      float: left;
                      font-size: 13px;
                      margin-left: 5px;
                      font-family: notosansregular;
                    "
                  >
                    {{ playingcount[j.type] }}
                  </p>
                </div>
              </div>
              <div
                v-if="i === missions.length - 1"
                style="
                  width: 65px;
                  height: 30px;
                  margin-left: 125.3px;
                  margin-top: 7px;
                  float: left;
                "
              >
                <div v-if="completeList.length !== 0">
                  <div class="person" style="margin-left: 11px"></div>
                  <p
                    style="
                      float: left;
                      font-size: 13px;
                      margin-left: 5px;
                      font-family: notosansregular;
                    "
                  >
                    {{ completeList.length - 1 }} / {{ stulength }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="activate === false && missions !== false"
          style="text-align: center"
        >
          <div
            style="
              font-family: notosans;
              color: #3480d8;
              font-size: 22px;
              margin-top: 55px;
              text-align: center;
              width: 1250px;
              float: left;
            "
          >
            <p>{{ langlist[$store.state.lang]["오늘의 미션이 있습니다."] }}</p>
            <p style="margin-top: 3px">
              {{
                langlist[$store.state.lang][
                  "학생들에게 미션을 전송하고, 시작하려면 'START' 버튼을 눌러주세요."
                ]
              }}
            </p>
            <p style="margin-top: 3px">
              {{
                langlist[$store.state.lang][
                  "미션 전송 후, 1분 뒤 미션이 시작되며 미션 외 콘텐츠 이용이 제한됩니다."
                ]
              }}
            </p>
          </div>
          <div
            style="
              position: absolute;
              margin-right: 80px;
              right: 0;
              margin-top: 80px;
            "
          >
            <v-btn
              @click="fire()"
              style="
                margin-right: 25px;
                background-color: #258bff;
                color: white;
                font-size: 20px;
                font-family: notosans;
                border-radius: 10px;
              "
              width="150"
              height="60"
              variant="outlined"
              >START</v-btn
            >
          </div>
        </div>
        <div v-if="missions === false">
          <p style="font-family: notosans; color: #636363; font-size: 22px">
            {{
              langlist[$store.state.lang][
                "오늘의 미션이 없습니다. 미션 설정은 '수업 설정'에서 가능합니다."
              ]
            }}
          </p>
        </div>
      </div>

      <!-- 미션 있을 때 테스트 해야함 -->
      <!-- <div class="mission-content">
        <div v-if="missions === ''">
          <div
            style="
              background-color: rgb(220, 220, 220);
              width: 100%;
              height: 100%;
              z-index: 11111;
              border-radius: 15px;
              animation-name: fadeBackground;
              animation-duration: 1s;
              animation-iteration-count: infinite;
            "
          ></div>
        </div>
        <div
          v-if="missions !== false && activate !== false"
        >
          <div v-for="(j, i) in missions" :key="i" class="imgdiv">
            <div :class="j.type"></div>
            <div>
              <p
                v-show="j.requireNum !== -1"
                class="imgdivtext"
                style="color: #3480d8; width: 120px; margin-left: -5px"
              >
                {{ j.kor }} {{ j.requireNum
                }}{{ langlist[$store.state.lang]["회"] }}
              </p>
            </div>
            <p
              v-show="j.requireNum === -1"
              class="imgdivtext"
              style="margin-top: 12px; color: #636363"
            >
              {{ j.kor }}
            </p>
          </div>

          <div
            style="
              width: 100%;
              max-width: 1350px;
              height: 50px;
              background-color: #f1f8ff;
              border: 1px solid #cae3ff;
              border-radius: 15px;
              margin-top: 115px;
              margin-left: 50px;
            "
          >
            <div style="margin-left: 46px; margin-top: 4px">
              <div v-for="(j, i) in missions" :key="i">
                <div class="leveldiv">
                  <p
                    v-show="i === 0"
                    class="leveltext"
                    style="margin-top: 7.5px"
                  >
                    ···
                  </p>
                  <p
                    v-show="i > 0 && i < missions.length - 1"
                    class="leveltext"
                    style="font-size: 20px; margin-top: 3px"
                  >
                    {{ i }}
                  </p>
                  <p
                    v-show="i === missions.length - 1"
                    class="leveltext"
                    style="font-size: 24px; margin-top: -1px"
                  >
                    ★
                  </p>
                </div>
                <div
                  v-if="i !== missions.length - 1 && i !== missions.length - 2"
                  :class="{
                    progressinactivate: missionStatus[i] === 0,
                    progressactivate: missionStatus[i] !== 0,
                  }"
                  style="
                    float: left;
                    width: 135px;
                    height: 10px;
                    margin-top: 15px;
                  "
                ></div>
                <div
                  v-if="i == missions.length - 2"
                  :class="{
                    progressinactivate: completeList.length < 2,
                    progressactivate: completeList.length > 1,
                  }"
                  style="
                    float: left;
                    width: 135px;
                    height: 10px;
                    margin-top: 15px;
                  "
                ></div>
              </div>
            </div>
          </div>
          
          <div style="margin-top: 5px">
            <div v-for="(j, i) in missions" :key="i">
              <div
                v-if="i === 0"
                style="
                  width: 50px;
                  height: 30px;
                  margin-left: 92px;
                  margin-top: 7px;
                  float: left;
                "
              >
                <div>
                  <div class="person" style="margin-left: 11px"></div>
                  <p
                    style="
                      float: left;
                      font-size: 13px;
                      margin-left: 5px;
                      font-family: notosansregular;
                    "
                  >
                    {{ playingcount["waiting"] }}
                  </p>
                </div>
              </div>
              <div
                v-if="i !== 0 && i !== missions.length - 1"
                style="
                  width: 50px;
                  height: 30px;
                  margin-left: 125.3px;
                  margin-top: 7px;
                  float: left;
                "
              >
                <div>
                  <div class="person" style="margin-left: 11px"></div>
                  <p
                    style="
                      float: left;
                      font-size: 13px;
                      margin-left: 5px;
                      font-family: notosansregular;
                    "
                  >
                    {{ playingcount[j.type] }}
                  </p>
                </div>
              </div>
              <div
                v-if="i === missions.length - 1"
                style="
                  width: 65px;
                  height: 30px;
                  margin-left: 125.3px;
                  margin-top: 7px;
                  float: left;
                "
              >
                <div v-if="completeList.length !== 0">
                  <div class="person" style="margin-left: 11px"></div>
                  <p
                    style="
                      float: left;
                      font-size: 13px;
                      margin-left: 5px;
                      font-family: notosansregular;
                    "
                  >
                    {{ completeList.length - 1 }} / {{ stulength }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="activate === false && missions !== false"
          style="text-align: center"
        >
          <div
            style="
              font-family: notosans;
              color: #3480d8;
              font-size: 22px;
              margin-top: 55px;
              text-align: center;
              width: 1250px;
              float: left;
            "
          >
            <p>{{ langlist[$store.state.lang]["오늘의 미션이 있습니다."] }}</p>
            <p style="margin-top: 3px">
              {{
                langlist[$store.state.lang][
                  "학생들에게 미션을 전송하고, 시작하려면 'START' 버튼을 눌러주세요."
                ]
              }}
            </p>
            <p style="margin-top: 3px">
              {{
                langlist[$store.state.lang][
                  "미션 전송 후, 1분 뒤 미션이 시작되며 미션 외 콘텐츠 이용이 제한됩니다."
                ]
              }}
            </p>
          </div>
          <div
            style="
              position: absolute;
              margin-right: 80px;
              right: 0;
              margin-top: 80px;
            "
          >
            <v-btn
              @click="fire()"
              style="
                margin-right: 25px;
                background-color: #258bff;
                color: white;
                font-size: 20px;
                font-family: notosans;
                border-radius: 10px;
              "
              width="150"
              height="60"
              variant="outlined"
              >START</v-btn
            >
          </div>
        </div>
        <div v-if="missions === false">
          <p style="font-family: notosans; color: #636363; font-size: 22px">
            {{
              langlist[$store.state.lang][
                "오늘의 미션이 없습니다. 미션 설정은 '수업 설정'에서 가능합니다."
              ]
            }}
          </p>
        </div>
      </div> -->
    </div>

    <div id="info" class="noselect">
      <div class="infodiv">
        <p>
          {{
            langlist[$store.state.lang][
              "* 미션중 이용 제한 콘텐츠 : 퀘스트, 공사, 놀러가기, 게임존, 아이템샵 3종 (의상,라이딩,표정)"
            ]
          }}
        </p>
      </div>
      <button class="infobtn">!</button>
    </div>
  </div>
</template>

<script>
import { getcurrentmission, userInfo } from "../../api/api-list";
import { getmissionstatus, openfirenewmission } from "../../api/api-list-2";
import { classmanage_ko } from "../../assets/translate/ko";
import { classmanage_vt } from "../../assets/translate/vt";

export default {
  async created() {
    const userinfo = (await userInfo()).data.data;
    this.userinfo = userinfo;

    this.socket = this.$socket;

    const info = {
      userId: userinfo.id,
      schoolCode: userinfo.schoolCode,
      grade: userinfo.grade,
      classNum: userinfo.classNum,
    };

    this.socket.on("accessSuccess", (message) => {});

    this.socket.on("updatePlaying", async (message) => {
      const data = message;
      const keys = Object.getOwnPropertyNames(data);
      for (let i = 0; i < keys.length; i++) {
        this.playingcount[keys[i]] = data[keys[i]].length;
      }
      const res2 = await getmissionstatus();
      this.missionStatus = res2.data.data;
    });

    this.socket.on("completeTeacherMission", (message) => {
      this.completeList = message.completeUserList;
    });

    this.socket.emit(
      "completeTeacherMission",
      JSON.stringify({
        id: userinfo.id,
      })
    );

    this.socket.emit("access", JSON.stringify(info));

    this.socket.emit(
      "updatePlaying",
      JSON.stringify({
        id: userinfo.id,
        playing: "planet",
      })
    );

    const res = await getcurrentmission();

    if (res.data.data !== false) {
      this.missions_ori = res.data.data;
      const missions = res.data.data.content;
      this.activate = res.data.data.activate;

      this.missions = [];

      this.missions.push({
        type: "waiting",
        kor: this.langlist[this.$store.state.lang]["대기중"],
        requireNum: -1,
        person: 0,
      });

      const missionlen = missions.length;
      for (let i = 0; i < missionlen + 1; i++) {
        this.missionprogressbar.push(0);
      }

      for (let i = 0; i < missions.length; i++) {
        if (missions[i].type == "listening") {
          missions[i].kor = this.langlist[this.$store.state.lang]["듣기"];
        }
        if (missions[i].type == "reading") {
          missions[i].kor = this.langlist[this.$store.state.lang]["읽기"];
        }
        if (missions[i].type == "speaking") {
          missions[i].kor = this.langlist[this.$store.state.lang]["말하기"];
        }
        if (missions[i].type == "writing") {
          missions[i].kor = this.langlist[this.$store.state.lang]["쓰기"];
        }
        if (missions[i].type == "book") {
          missions[i].kor =
            this.langlist[this.$store.state.lang]["교과서 대화"];
        }
        if (missions[i].type == "gpt") {
          missions[i].kor =
            this.langlist[this.$store.state.lang]["GPT 주제대화"];
        }
        if (missions[i].type == "free") {
          missions[i].kor =
            this.langlist[this.$store.state.lang]["GPT 자유대화"];
        }
        if (missions[i].type == "personal") {
          missions[i].kor =
            this.langlist[this.$store.state.lang]["개별 맞춤 미션"];
        }
        missions[i].person = 0;
        this.missions.push(missions[i]);
      }

      this.missions.push({
        type: "finish",
        kor: this.langlist[this.$store.state.lang]["미션 완료"],
        requireNum: -1,
        person: 0,
      });
    } else {
      this.missions_ori = false;
      this.missions = false;
    }
  },
  data() {
    return {
      langlist: {
        ko: classmanage_ko,
        vt: classmanage_vt,
      },
      missions: "",
      activate: true,
      socket: null,
      playing: "",
      playingcount: {},
      missions_ori: "",
      userinfo: "",
      completeList: [],
      missionprogressbar: [],
      missionStatus: [],
    };
  },
  props: {
    stulength: {
      type: Number,
    },
  },
  methods: {
    fire() {
      openfirenewmission();
      this.socket.emit(
        "createMission",
        JSON.stringify({
          schoolCode: this.userinfo.schoolCode,
          grade: this.userinfo.grade,
          classNum: this.userinfo.classNum,
        })
      );
      this.activate = true;
      window.dispatchEvent(
        new CustomEvent("missionfire", {
          detail: {
            status: true,
          },
        })
      );
    },
    getperson(type) {
      return this.playingcount[type].length;
    },
  },
};
</script>

<style scoped>
.maindiv {
  position: relative;
  width: 100%;
  height: 210px;
  border: 1px solid #cae3ff;
  border-radius: 15px;
  background-color: white;
}
.inner {
  display: flex;
  align-items: center;
  height: 100%;
}
.title {
  width: 15%;
  text-align: center;
}
.mission-content {
  text-align: center;
  width: 85%;
}
.infobtn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 15px;
  top: 15px;
  background-color: #ff9f2d;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 40px;
  font-size: 22px;
  font-weight: notosansblack;
  z-index: 888;
}
.infodiv {
  position: absolute;
  top: -20px;
  left: 50px;
  background-color: white;
  border: 1px solid #cae3ff;
  border-radius: 15px;
  display: none;

  p {
    padding: 6px 24px;
    font-family: notosans;
    font-size: 14px;
    color: #636363;
  }
}

.infobtn:hover {
  background-color: red;
}

#info:hover .infodiv {
  display: block;
}

.imgdivtext {
  font-family: notosans;
  font-size: 15px;
  margin-top: 5px;
}

.leveldiv {
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #cae3ff;
  text-align: center;
  border-radius: 40px;
  float: left;
}

.leveltext {
  font-family: notosans;
  font-size: 15px;
  color: #636363;
}

.progressinactivate {
  background-color: #cae3ff;
}

.progressactivate {
  background-color: #3d90ef;
}

.activate {
  color: #3480d8;
}

.inactivate {
  color: #636363;
}

.marginrightnone {
  margin-right: 0px;
}

.person {
  background-image: url("../../assets/image/person.png");
  background-size: 100%;
  width: 12px;
  height: 21px;
  float: left;
}

.waiting {
  background-image: url("../../assets/image/sandclock.png");
  background-size: 100%;
  width: 50px;
  height: 50px;
  margin-left: 32px;
  margin-top: 3px;
}

.listening {
  background-image: url("../../assets/image/ListeningPlanet.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 27px;
}

.reading {
  background-image: url("../../assets/image/ReadingPlanet.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 27px;
}

.speaking {
  background-image: url("../../assets/image/SpeakingPlanet.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 27px;
}

.writing {
  background-image: url("../../assets/image/WritingPlanet.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 27px;
}

.book {
  background-image: url("../../assets/image/book.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 25px;
}

.gpt {
  background-image: url("../../assets/image/conicon.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 25px;
}

.free {
  background-image: url("../../assets/image/tomytomy.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 25px;
}

.personal {
  background-image: url("../../assets/image/CustomMission.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 25px;
}

.finish {
  background-image: url("../../assets/image/finish.png");
  background-size: 100%;
  width: 50px;
  height: 50px;
  margin-top: 2px;
  margin-left: 15px;
  margin-left: 40px;
}

.todaytextko {
  font-size: 27px;
  font-family: notosans;
  /* margin-top: 85px; */
  /* margin-left: 50px; */
}

.todaytextvt {
  font-size: 27px;
  font-family: notosans;
  /* margin-top: 65px; */
  /* margin-left: 30px; */
  /* text-align: center; */
}

@keyframes fadeBackground {
  from {
    background-color: rgb(220, 220, 220); /* 시작 색상 */
  }
  to {
    background-color: rgb(240, 240, 240); /* 종료 색상 */
  }
}

.mission-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 10px 20px;
}
.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
}
.imgdiv {
  width: 115px;
}
.progress-wrap {
  width: 100%;
  height: 50px;
  background-color: #f1f8ff;
  border: 1px solid #cae3ff;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
