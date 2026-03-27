<template>
  <div
    class="maindiv"
    :class="{
      disconnected: stuinfo.connectStatus === 'disconnected',
      noselect: stuinfo.connectStatus === 'disconnected',
    }"
  >
    <div
      class="characterdiv"
      :class="{
        disconnectedcolor: stuinfo.connectStatus === 'disconnected',
        noactivitycolor:
          stuinfo.connectStatus === 'waiting' ||
          stuinfo.connectStatus === 'planet',
      }"
    >
      <div
        v-if="stuinfo.nickName"
        class="character"
        :style="{
          backgroundImage: `url(${stuinfo.imgurl})`,
        }"
      ></div>
      <div @click="opendrop()" class="heart"></div>
      <div v-show="dropdown === true" class="dropdown">
        <div
          v-for="(j, i) in 5"
          class="dropdownclass"
          :class="`dropdown${i + 1}`"
          :key="i"
          @click="sendfeedback(i)"
        >
          <div class="dropdowninfo">
            <p style="font-family: notosansregular; margin-top: 1px">
              {{ kors[i] }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="infodiv">
      <p class="body1">
        {{ stuinfo.nickName || langlist[$store.state.lang]["닉네임 없음"] }}
      </p>
      <p class="body3">
        {{ setnum(stuinfo.attendanceNumber) }} {{ stuinfo.name }}
      </p>

      <div class="progressdiv">
        <div class="mission">
          <span>
            {{ langlist[$store.state.lang]["미션 진행률"] }}
          </span>
          <div v-if="this.missions">
            <v-progress-circular
              v-if="missionprogress < 100"
              style="margin-top: 5px"
              :model-value="missionprogress"
              color="#3D90EF"
              size="45"
              width="5"
              ><p style="font-family: notosans; font-size: 12px">
                {{ missionprogress }}%
              </p></v-progress-circular
            >
          </div>
          <div v-else>
            <p class="body3">수업모드 없음</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M14.5263 25.0139H17.0423V22.4749H14.5263V25.0139ZM15.9673 6.98438C14.5023 6.98438 13.2953 7.37938 12.3473 8.16841C11.3993 8.95788 10.9383 10.5389 10.9618 11.8489L10.9988 11.9219H13.2938C13.2938 11.1404 13.5543 10.0174 14.0753 9.61437C14.5958 9.21187 15.2268 9.01038 15.9678 9.01038C16.8218 9.01038 17.4783 9.24238 17.9388 9.70634C18.3988 10.1703 18.6283 10.8338 18.6283 11.6958C18.6283 12.4203 18.4583 13.0388 18.1168 13.5513C17.7743 14.0638 17.2003 14.7964 16.3953 15.7489C15.5648 16.4979 15.0518 17.0999 14.8568 17.5554C14.6613 18.0114 14.5598 18.8294 14.5523 20.0089H16.9573C16.9573 19.2689 17.0043 18.7234 17.0978 18.3734C17.1908 18.0239 17.4573 17.6289 17.8968 17.1894C18.8413 16.2784 19.5998 15.3874 20.1743 14.5159C20.7473 13.6454 21.0343 12.6849 21.0343 11.6349C21.0343 10.1699 20.5913 9.02837 19.7038 8.21087C18.8158 7.39287 17.5703 6.98438 15.9673 6.98438Z"
                fill="#292929"
              />
            </svg>
          </div>

          <div
            class="completeimg"
            v-if="missionprogress > 99 && $store.state.lang === 'ko'"
          ></div>
          <div
            class="completeimg_vt"
            v-if="missionprogress > 99 && $store.state.lang === 'vt'"
          ></div>
        </div>
        <div
          class="activity"
          :class="{
            goright: $store.state.currentSubject === 'math',
          }"
        >
          <span>
            {{ langlist[$store.state.lang]["현재 활동"] }}
          </span>
          <p class="body3" :class="{ notnumber: activitytext().length > 1 }">
            {{ activitytext() }}
          </p>
          <div
            v-show="stuinfo.connectStatus !== 'disconnected'"
            class="activityimg"
            :class="{
              waiting: stuinfo.connectStatus === 'waiting',
              listening: stuinfo.connectStatus === 'listening',
              reading: stuinfo.connectStatus === 'reading',
              speaking: stuinfo.connectStatus === 'speaking',
              writing: stuinfo.connectStatus === 'writing',
              book: stuinfo.connectStatus === 'book',
              gpt: stuinfo.connectStatus === 'gpt',
              free: stuinfo.connectStatus === 'free',
              tutor: stuinfo.connectStatus === 'tutor',
              personal: stuinfo.connectStatus === 'personal',
              planet: stuinfo.connectStatus === 'planet',
              library: stuinfo.connectStatus === 'library',
              racing: stuinfo.connectStatus === 'racing',
              record: stuinfo.connectStatus === 'record',
              mathhunter: stuinfo.connectStatus === 'mathhunter',
              playzone: stuinfo.connectStatus === 'playzone',
              laboratory: stuinfo.connectStatus === 'lab',
            }"
          ></div>
          <div v-show="stuinfo.connectStatus === 'disconnected'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M14.5263 25.0139H17.0423V22.4749H14.5263V25.0139ZM15.9673 6.98438C14.5023 6.98438 13.2953 7.37938 12.3473 8.16841C11.3993 8.95788 10.9383 10.5389 10.9618 11.8489L10.9988 11.9219H13.2938C13.2938 11.1404 13.5543 10.0174 14.0753 9.61437C14.5958 9.21187 15.2268 9.01038 15.9678 9.01038C16.8218 9.01038 17.4783 9.24238 17.9388 9.70634C18.3988 10.1703 18.6283 10.8338 18.6283 11.6958C18.6283 12.4203 18.4583 13.0388 18.1168 13.5513C17.7743 14.0638 17.2003 14.7964 16.3953 15.7489C15.5648 16.4979 15.0518 17.0999 14.8568 17.5554C14.6613 18.0114 14.5598 18.8294 14.5523 20.0089H16.9573C16.9573 19.2689 17.0043 18.7234 17.0978 18.3734C17.1908 18.0239 17.4573 17.6289 17.8968 17.1894C18.8413 16.2784 19.5998 15.3874 20.1743 14.5159C20.7473 13.6454 21.0343 12.6849 21.0343 11.6349C21.0343 10.1699 20.5913 9.02837 19.7038 8.21087C18.8158 7.39287 17.5703 6.98438 15.9673 6.98438Z"
                fill="#292929"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendfeedback } from "../../api/api-list";
import { teachermissionprogress } from "../../api/api-list-2";
import { classmanage_ko } from "../../assets/translate/ko";
import { classmanage_vt } from "../../assets/translate/vt";

export default {
  async created() {
    window.addEventListener("missionfire", this.handlefire);
    this.socket = this.$socket;

    this.getmissionprogress();

    if (this.missionprogress > 99) {
      this.socket.emit(
        "completeTeacherMission",
        JSON.stringify({
          id: this.stuinfo.id,
        })
      );
    }
  },
  watch: {
    stuinfo: {
      handler(newVal) {
        this.getmissionprogress();
      },
      deep: true,
    },
    currentMission: {
      handler(newVal) {
        this.getmissionprogress();
      },
    },
  },
  props: {
    stuinfo: {
      required: true,
    },
    missions: {
      required: true,
    },
    completeList: {
      required: true,
    },
    currentMission: {
      required: true,
    },
  },
  data() {
    return {
      langlist: {
        ko: classmanage_ko,
        vt: classmanage_vt,
      },
      missionprogress: 0,
      socket: null,
      percent: 50,
      dropdown: false,
      kors: ["주의", "칭찬", "완료", "노력", "최다"],
      messages: [
        {
          content: "차분히 앉아서 오늘 과제를 진행해 볼까요? ^^",
          messageType: "warning",
        },
        {
          content: "선생님 말을 잘 들어줘서 고마워요 ^^",
          messageType: "compliment",
        },
        {
          content:
            "오늘 할일을 다 했군요! 참 잘 했어요 ^^ 게임존이나 놀러가기 등 자유롭게 활동해보세요~",
          messageType: "done",
        },
        {
          content:
            "오랜 시간 공들여 플레이 하고 있군요! 계속해서 천천히 과제를 진행해보세요 ^^",
          messageType: "encourage",
        },
        {
          content: "Wow! 친구들보다 더 많이 단어와 문장을 배웠네요! 훌륭해요!",
          messageType: "welldone",
        },
      ],
    };
  },
  methods: {
    handlefire(event) {
      if (this.stuinfo.connectStatus !== "disconnected") {
        this.stuinfo.connectStatus = "waiting";
      }
    },
    setnum(n) {
      return n.toString().padStart(2, "0");
    },
    opendrop() {
      if (this.stuinfo.connectStatus === "disconnected") {
        return;
      }
      this.dropdown = !this.dropdown;
    },
    sendfeedback(index) {
      let data = {
        userId: this.stuinfo.id,
        content: this.messages[index].content,
      };

      sendfeedback(data);
      this.dropdown = false;

      window.dispatchEvent(
        new CustomEvent("success", {
          detail: {
            status: true,
            text: [`'${this.kors[index]}' 피드백 전송이 완료되었습니다.`],
          },
        })
      );
    },
    activitytext() {
      const info = this.stuinfo.connectStatus;
      const arr = [
        "listening",
        "reading",
        "speaking",
        "writing",
        "book",
        "gpt",
        "free",
        "personal",
        "teacher",
        "tutor",
      ];

      if (info === "disconnected") {
        return this.langlist[this.$store.state.lang]["미접속"];
      }

      if (info === "waiting") {
        return this.langlist[this.$store.state.lang]["미션 화면"];
      }

      if (info === "planet") {
        return this.langlist[this.$store.state.lang]["행성 탐험"];
      }

      if (info === "library") {
        return this.langlist[this.$store.state.lang]["도서관"];
      }

      if (info === "racing") {
        return this.langlist[this.$store.state.lang]["도서관"];
      }

      if (info === "record") {
        return this.langlist[this.$store.state.lang]["도서관"];
      }

      if (info === "mathhunter") {
        return "매쓰헌터";
      }

      if (info === "playzone") {
        return "플레이존";
      }

      if (info === "lab") {
        return "실험실";
      }

      if (arr.includes(info)) {
        if (
          !this.missions ||
          !this.missions.activate ||
          this.completeList.includes(this.stuinfo.id)
        ) {
          if (info === "listening") {
            return this.langlist[this.$store.state.lang]["듣기"];
          }
          if (info === "reading") {
            return this.langlist[this.$store.state.lang]["읽기"];
          }
          if (info === "speaking") {
            return this.langlist[this.$store.state.lang]["말하기"];
          }
          if (info === "writing") {
            return this.langlist[this.$store.state.lang]["쓰기"];
          }
          if (
            info === "book" ||
            info === "gpt" ||
            info === "free" ||
            info === "teacher"
          ) {
            this.stuinfo.connectStatus = "free";
            return this.langlist[this.$store.state.lang]["AI 대화"];
          }
          if (info === "tutor") {
            return this.langlist[this.$store.state.lang]["AI 튜터"];
          }
          if (info === "personal") {
            return this.langlist[this.$store.state.lang]["나만의 미션"];
          }
          if (info === "library") {
            return this.langlist[this.$store.state.lang]["도서관"];
          }
          if (info === "racing") {
            return this.langlist[this.$store.state.lang]["도서관"];
          }
          if (info === "record") {
            return this.langlist[this.$store.state.lang]["도서관"];
          }
          if (info === "mathhunter") {
            return "매쓰헌터";
          }
          if (info === "playzone") {
            return "플레이존";
          }
          if (info === "lab") {
            return "실험실";
          }
        } else {
          for (let i = 0; i < this.missions.content.length; i++) {
            if (info === this.missions.content[i].type) {
              return (i + 1).toString();
            }
          }

          return "-1";
        }
      }
    },
    calculatepercent() {
      if (this.completeList.includes(this.stuinfo.id)) {
        return 100;
      }

      if (this.missions == false) {
        return 0;
      }

      let count = [];
      let solveCount = 0;

      for (let i = 0; i < this.missions.content.length; i++) {
        count.push(this.missions.content[i].requireNum);
      }

      const info = this.stuinfo.connectStatus;
      const arr = [
        "listening",
        "reading",
        "speaking",
        "writing",
        "book",
        "gpt",
        "free",
        "personal",
      ];

      if (arr.includes(info)) {
        for (let i = 0; i < this.missions.content.length; i++) {
          if (info === this.missions.content[i].type) {
            solveCount = i;
            break;
          }
        }
      }

      let missionCount = 0;
      let allCount = 0;
      for (let i = 0; i < count.length; i++) {
        allCount += count[i];
      }

      for (let i = 0; i < solveCount; i++) {
        missionCount += count[i];
      }

      return Math.floor((missionCount / allCount) * 100);
    },
    async getmissionprogress() {
      if (this.currentMission) {
        const data = {
          id: this.stuinfo.id,
          uid: this.currentMission.uid,
          subject: this.currentMission.subject,
        };

        const res = await teachermissionprogress(data);
        const progress = res.data.data;

        this.missionprogress = progress;
      } else {
        this.missionprogress = 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.maindiv {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: white;
  padding: 6px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
}

.characterdiv {
  position: relative;
  width: 100%;
  height: 96px;
  border-radius: 8px;
  background-color: #c3dfff;
}

.character {
  background-size: 100%;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.heart {
  background-image: url("../../assets/image/heart.png");
  background-size: 100%;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
}

.dropdown {
  background-image: url("../../assets/image/dropdownback.png");
  background-size: 100%;
  width: 42px;
  height: 230px;
  position: absolute;
  border-radius: 5px;
  margin-left: 124px;
  margin-top: 35px;
  border: none;
}

.dropdown1 {
  background-image: url("../../assets/image/dropdown1.png");
  background-size: 100%;
}

.dropdown2 {
  background-image: url("../../assets/image/dropdown2.png");
  background-size: 100%;
}

.dropdown3 {
  background-image: url("../../assets/image/dropdown3.png");
  background-size: 100%;
}

.dropdown4 {
  background-image: url("../../assets/image/dropdown4.png");
  background-size: 100%;
}

.dropdown5 {
  background-image: url("../../assets/image/dropdown5.png");
  background-size: 100%;
}

.dropdownclass {
  width: 33px;
  height: 33px;
  margin-left: -14px;
  background-color: white;
  border-radius: 10px;
  margin-top: 5px;
}

.dropdownclass:hover {
  background-color: #cae3ff;
}

.dropdownclass:hover .dropdowninfo {
  display: block;
}

.dropdowninfo {
  width: 40px;
  height: 25px;
  background-color: white;
  position: absolute;
  border: 1px solid #c3dfff;
  text-align: center;
  font-size: 14px;
  margin-left: 35px;
  margin-top: 4px;
  display: none;
  border-radius: 5px;
  z-index: 10;
}

.infodiv {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
  margin-top: 8px;
}

.progressdiv {
  width: 100%;
  display: flex;
  justify-content: center;

  span {
    font-family: "notosansregular";
    font-size: 10px;
    color: #9a9a9a;
  }
}

.mission {
  text-align: center;
  width: 50%;
}

.mission span,
.activity span {
  font-size: 12px;
}

.activity {
  text-align: center;
  width: 50%;
}

.activityimg {
  margin-top: -5px;
  width: 50px;
  height: 50px;
  /* margin-left: 12.5px; */
  background-size: 100%;
}

.planet {
  background-image: url("../../assets/image/socket/rocket.png");
  background-size: 70%;
  margin-left: 19px;
  margin-top: 3px;
}

.waiting {
  background-image: url("../../assets/image/socket/waiting.png");
  background-size: 70%;
  margin-left: 19px;
  margin-top: 3px;
}

.listening {
  margin-top: -5px;
  width: 50px;
  height: 50px;
  margin-left: 12.5px;
  background-size: 100%;
  background-image: url("../../assets/image/ListeningPlanet.png");
}

.reading {
  margin-top: -5px;
  width: 50px;
  height: 50px;
  margin-left: 12.5px;
  background-size: 100%;
  background-image: url("../../assets/image/ReadingPlanet.png");
}

.speaking {
  margin-top: -5px;
  width: 50px;
  height: 50px;
  margin-left: 12.5px;
  background-size: 100%;
  background-image: url("../../assets/image/SpeakingPlanet.png");
}

.writing {
  margin-top: -5px;
  width: 50px;
  height: 50px;
  margin-left: 12.5px;
  background-size: 100%;
  background-image: url("../../assets/image/WritingPlanet.png");
}

.free {
  background-image: url("../../assets/image/tomytomy.png");
  background-size: 75%;
  width: 60px;
  height: 60px;
  margin-left: 10px;
}

.personal {
  margin-top: -5px;
  width: 50px;
  height: 50px;
  margin-left: 12.5px;
  background-size: 100%;
  background-image: url("../../assets/image/CustomMission.png");
}

.tutor {
  background-image: url("../../assets/image/vestasta.png");
  background-size: 65%;
  width: 60px;
  height: 60px;
  margin-left: 16px;
  margin-top: 1px;
}

.library {
  background-image: url("../../assets/image/libraryicon.png");
  background-size: 65%;
  width: 60px;
  height: 60px;
  margin-left: 16px;
  margin-top: 1px;
}

.racing {
  background-image: url("../../assets/image/libraryicon.png");
  background-size: 65%;
  width: 60px;
  height: 60px;
  margin-left: 16px;
  margin-top: 1px;
}

.record {
  background-image: url("../../assets/image/libraryicon.png");
  background-size: 65%;
  width: 60px;
  height: 60px;
  margin-left: 16px;
  margin-top: 1px;
}

.mathhunter {
  background-image: url("../../assets/image/mathhuntericon.png");
  background-size: 65%;
  width: 60px;
  height: 60px;
  margin-left: 17px;
  margin-top: 1px;
}

.playzone {
  background-image: url("../../assets/image/playzoneicon.png");
  background-size: 65%;
  width: 60px;
  height: 60px;
  margin-left: 16px;
  margin-top: 1px;
}

.laboratory {
  background-image: url("../../assets/image/laboratoryicon.png");
  background-size: 65%;
  width: 60px;
  height: 60px;
  margin-left: 19px;
  margin-top: 1px;
}

.disconnected {
  opacity: 0.5;
}

.disconnectedcolor {
  background-color: #9a9a9a;
}

.activitytext {
  font-size: 16px;
  font-family: notosans;
  color: #3d90ef;
}

.notnumber {
  color: #292929;
  font-size: 12px;
}

.noactivitycolor {
  background-color: #fff2ae;
}

.completeimg {
  background-image: url("../../assets/image/completeimg.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 9px;
  margin-top: 3px;
}

.completeimg_vt {
  background-image: url("../../assets/image/completeimg_vt.png");
  background-size: 100%;
  width: 60px;
  height: 60px;
  margin-left: 9px;
  margin-top: 3px;
}

.goright {
  /* margin-left: 37px; */
}
</style>
