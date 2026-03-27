<template>
  <div
    style="
      width: 850px;
      height: 850px;
      background-color: #f1f8ff;
      border: 1px solid #cae3ff;
      margin-top: 20px;
      border-radius: 20px;
    "
  >
    <div style="padding: 30px; padding-top: 30px">
      <p style="float: left; font-size: 21px; font-family: notosans">Step3</p>
      <p
        style="
          float: left;
          color: #3480d8;
          font-family: notosans;
          margin-left: 10px;
          margin-top: 8px;
        "
      >
        {{ langlist[$store.state.lang]["결과화면"] }}
      </p>
    </div>
    <div
      style="
        width: 800px;
        height: 1px;
        margin-left: 25px;
        background-color: #cae3ff;
        margin-top: 20px;
      "
    ></div>
    <div style="width: 800px; margin-left: 25px; margin-top: 20px">
      <p
        style="
          font-family: notosans;
          font-size: 15px;
          color: #636363;
          padding-left: 15px;
        "
      >
        {{ langlist[$store.state.lang]["미션 순서 및 횟수"] }}
      </p>
      <div
        style="
          margin-top: 10px;
          width: 100%;
          height: 200px;
          background-color: white;
          border-radius: 15px;
          border: 1px solid #cae3ff;
        "
      >
        <v-row style="margin-top: 30px" justify="center">
          <div
            v-for="(j, i) in targetmissions"
            :key="i"
            :id="j.category"
            class="element"
            :class="{
              long: j.category.length > 5,
            }"
          >
            <div class="planet" :class="j.category"></div>
            <p
              style="
                font-family: notosans;
                color: #636363;
                font-size: 14px;
                margin-top: 3px;
              "
            >
              {{ j.kor }}
            </p>
            <div class="countdiv">
              <p style="padding-top: 2px">x {{ j.count }}</p>
            </div>
          </div>
        </v-row>
        <div
          style="
            margin-top: 70px;
            width: 800px;
            height: 30px;
            font-family: notosans;
            color: #636363;
            font-size: 17px;
          "
        >
          <p style="float: left; margin-left: 5px">
            {{ langlist[$store.state.lang]["예상 단원학습 진행률"] }}
          </p>
          <p style="float: left; margin-left: 115px">
            {{ langlist[$store.state.lang]["예상 소요시간"] }}
          </p>
          <p style="float: left; margin-left: 170px">
            {{ langlist[$store.state.lang]["최대 보상 수"] }}
          </p>
        </div>
        <div
          style="
            width: 800px;
            height: 80px;
            background-color: white;
            border: 1px solid #cae3ff;
            border-radius: 15px;
          "
        >
          <div style="width: 33%; float: left">
            <div style="width: 80%; margin-left: 30px; margin-top: 15px">
              <div
                :style="`margin-left: ${percent() - 3.5}%`"
                class="graphicon"
              ></div>
              <v-progress-linear
                :model-value="percent()"
                height="20"
                color="#3480d8"
                style="border-radius: 5px"
              ></v-progress-linear>
              <div
                :style="`margin-left: ${percent() - 9}%`"
                style="
                  font-size: 15px;
                  font-family: notosans;
                  color: #3480d8;
                  margin-top: 2px;
                "
              >
                {{ percent() }}%
              </div>
            </div>
          </div>
          <div
            style="
              width: 1px;
              height: 90%;
              background-color: #cae3ff;
              float: left;
              margin-top: 5px;
            "
          ></div>
          <div style="width: 33%; float: left; text-align: center">
            <p
              style="
                font-size: 26px;
                margin-top: 20px;
                color: #3480d8;
                font-family: notosans;
              "
            >
              {{ missiontime()[0] }}-{{ missiontime()[1]
              }}{{ langlist[$store.state.lang]["분"] }}
            </p>
          </div>
          <div
            style="
              width: 1px;
              height: 90%;
              background-color: #cae3ff;
              float: left;
              margin-top: 5px;
            "
          ></div>
          <div style="width: 33%; float: left">
            <!-- <div style="background-color: red; width: 55%; height: 100%">
              <div class="gold"></div>
              <p style="font-family: notosans; color: #636363">
                골드 : 3,000개
              </p>
            </div>
            <div style="width: 40%; float: left; background-color: red">
              <div class="stones"></div>
              <p style="font-family: notosans; color: #636363">스톤 : 6개</p>
            </div> -->
            <div style="width: 55%; height: 78px; float: left">
              <div style="margin-top: 20px">
                <div
                  class="gold"
                  style="margin-left: 5px; margin-top: -2px"
                ></div>
                <p
                  style="
                    font-family: notosans;
                    color: #636363;
                    padding-top: 7px;
                  "
                >
                  {{ langlist[$store.state.lang]["골드"] }} :
                  {{ rewardRestrict(missiontime())["gold"]
                  }}{{ langlist[$store.state.lang]["개"] }}
                </p>
              </div>
            </div>
            <div style="width: 45%; height: 78px; float: left">
              <div style="margin-top: 20px">
                <div class="stones" style="margin-left: 5px"></div>
                <p
                  style="
                    font-family: notosans;
                    color: #636363;
                    padding-top: 7px;
                  "
                >
                  {{ langlist[$store.state.lang]["스톤"] }} :
                  {{ rewardRestrict(missiontime())["stone"]
                  }}{{ langlist[$store.state.lang]["개"] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div style="padding: 30px; margin-top: 150px">
        <p style="float: left; font-size: 21px; font-family: notosans">Step4</p>
        <p
          style="
            float: left;
            color: #3480d8;
            font-family: notosans;
            margin-left: 10px;
            margin-top: 8px;
          "
        >
          {{ langlist[$store.state.lang]["보상 설정"] }}
        </p>
      </div>
      <div
        style="
          width: 800px;
          height: 1px;
          margin-left: 25px;
          background-color: #cae3ff;
          margin-top: 20px;
        "
      ></div>
      <div style="width: 800px; margin-left: 25px; margin-top: 20px">
        <p
          style="
            float: left;
            font-size: 17px;
            font-family: notosans;
            color: #636363;
            margin-left: 10px;
          "
        >
          {{ langlist[$store.state.lang]["보상 담기"] }}
        </p>
        <p
          style="
            float: left;
            font-size: 17px;
            font-family: notosans;
            color: #636363;
            margin-left: 475px;
          "
        >
          {{ langlist[$store.state.lang]["담은 보상"] }}
        </p>
      </div>
      <div
        style="
          width: 800px;
          height: 170px;
          background-color: white;
          margin-left: 25px;
          margin-top: 50px;
          border-radius: 15px;
          border: 1px solid #cae3ff;
        "
      >
        <div style="margin-top: 20px; margin-left: 5px">
          <div
            style="
              float: left;
              text-align: center;
              width: 90px;
              margin-left: 15px;
            "
            v-for="(j, i) in stones"
            :key="i"
          >
            <div class="stone" :class="j.category"></div>
            <p
              style="
                font-family: notosans;
                color: #636363;
                font-size: 14px;
                margin-top: 5px;
              "
            >
              {{ j.title }}
            </p>
            <div
              id="plusminusbtn"
              style="
                width: 90px;
                height: 30px;
                margin-left: 1px;
                margin-top: 5px;
                border: 1px solid #cae3ff;
                font-family: notosans;
              "
            >
              <div
                class="minusbtn"
                @click="stonecount('minus', i)"
                style="
                  width: 23px;
                  height: 100%;
                  float: left;
                  text-align: center;
                  border-right: 1px solid #cae3ff;
                "
              >
                <p style="font-size: 20px; margin-top: -3px; color: #3480d8">
                  -
                </p>
              </div>
              <div style="float: left; text-align: center; width: 40px">
                <p style="margin-top: 4px; font-size: 13px">
                  {{ stones[i].count }}
                </p>
              </div>
              <div
                class="plusbtn"
                @click="stonecount('plus', i)"
                style="
                  width: 23px;
                  height: 100%;
                  float: left;
                  text-align: center;
                  border-left: 1px solid #cae3ff;
                "
              >
                <p style="font-size: 20px; margin-top: -1px; color: #3480d8">
                  +
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            background-color: #cae3ff;
            height: 150px;
            width: 1px;
            float: left;
            margin-left: 10px;
            margin-top: -10px;
            float: left;
          "
        ></div>
        <div style="float: left">
          <div style="margin-left: 15px; margin-top: 15px; float: left">
            <div style="text-align: center; width: 70px; margin-left: 25px">
              <div
                class="goldstone"
                style="width: 45px; height: 45px; margin-left: 12.5px"
              ></div>
              <p style="font-family: notosans; font-size: 14px">
                {{ langlist[$store.state.lang]["골드"] }}
              </p>
            </div>
            <div
              style="
                width: 120px;
                height: 30px;
                background-color: #cae3ff;
                border-radius: 15px;
                text-align: center;
                margin-top: 5px;
              "
            >
              <p
                style="font-family: notosans; font-size: 14px; padding-top: 5px"
              >
                {{ stones[4].count }}/{{
                  rewardRestrict(missiontime())["gold"]
                }}
              </p>
            </div>
          </div>
          <div style="margin-left: 10px; margin-top: 15px; float: left">
            <div style="text-align: center; width: 50px; margin-left: 25px">
              <div
                class="stones"
                style="width: 45px; height: 45px; margin-left: 4px"
              ></div>
              <p
                style="
                  font-family: notosans;
                  font-size: 14px;
                  padding-top: 45px;
                "
              >
                {{ langlist[$store.state.lang]["스톤"] }}
              </p>
            </div>
            <div
              style="
                width: 100px;
                height: 30px;
                background-color: #cae3ff;
                border-radius: 15px;
                text-align: center;
                margin-top: 5px;
                float: left;
              "
            >
              <p
                style="font-family: notosans; font-size: 14px; padding-top: 5px"
              >
                {{ stoneresult() }}/{{ rewardRestrict(missiontime())["stone"] }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          margin-left: 30px;
          margin-top: 8px;
          font-family: notosansregular;
          font-size: 13px;
        "
      >
        <div>
          <p style="float: left">
            * {{ langlist[$store.state.lang]["미션 유효 시간은"] }}
          </p>
          <p style="float: left; color: #3480d8; margin-left: 5px">
            '{{ langlist[$store.state.lang]["전송 시점 ~ 자정"] }}'
          </p>
          <p style="float: left">
            {{ langlist[$store.state.lang]["까지 입니다."] }}
          </p>
        </div>
      </div>
      <div
        style="
          margin-left: 30px;
          margin-top: 30px;
          font-family: notosansregular;
          font-size: 13px;
        "
      >
        <p style="float: left">
          * {{ langlist[$store.state.lang]["교사 미션은"] }}
        </p>
        <p style="float: left; color: #3480d8; margin-left: 5px">
          {{ langlist[$store.state.lang]["학급당 1일 1회"] }}
        </p>
        <p style="float: left">
          {{ langlist[$store.state.lang]["만 설정 가능합니다."] }}
        </p>
      </div>
    </div>
    <v-row justify="center" style="margin-top: 100px">
      <input
        type="checkbox"
        v-model="teacherFlag"
        style="float: left; width: 23px; height: 23px; margin-top: 3px"
      />
      <p style="float: left; font-size: 19px; margin-left: 10px">
        선생님 알공 계정에도 교사 미션을 생성합니다.
      </p>
    </v-row>
    <v-row style="margin-top: 50px" justify="center">
      <v-btn
        @click="init()"
        width="200"
        height="50"
        variant="outlined"
        style="
          font-family: notosans;
          border: 1px solid #3480d8;
          color: #3480d8;
          border-radius: 10px;
        "
        >{{ langlist[$store.state.lang]["수정하기"] }}</v-btn
      >
      <v-btn
        @click="sendmission()"
        width="200"
        height="50"
        variant="outlined"
        style="
          margin-left: 30px;
          font-family: notosans;
          background-color: #3480d8;
          color: white;
          border-radius: 10px;
        "
        >{{ langlist[$store.state.lang]["이대로 미션 설정"] }}</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { opennewmission } from "../../api/api-list";

import { classsetting_vt } from "../../assets/translate/vt";
import { classsetting_ko } from "../../assets/translate/ko";

export default {
  props: {
    targetmissions: {
      type: Array,
    },
    lessonindex: {
      type: Number,
    },
  },
  created() {
    this.stones = [
      {
        category: "listenStone",
        title: this.langlist[this.$store.state.lang]["듣기 스톤"],
        count: 0,
      },
      {
        category: "readStone",
        title: this.langlist[this.$store.state.lang]["읽기 스톤"],
        count: 0,
      },
      {
        category: "speakStone",
        title: this.langlist[this.$store.state.lang]["말하기 스톤"],
        count: 0,
      },
      {
        category: "writeStone",
        title: this.langlist[this.$store.state.lang]["쓰기 스톤"],
        count: 0,
      },
      {
        category: "goldstone",
        title: this.langlist[this.$store.state.lang]["골드 (챗봇)"],
        count: 0,
      },
    ];
  },
  data() {
    return {
      langlist: {
        ko: classsetting_ko,
        vt: classsetting_vt,
      },
      stones: [],
      teacherFlag: true,
    };
  },
  methods: {
    init() {
      window.dispatchEvent(new CustomEvent("init"));
      this.stones = [
        {
          category: "listenStone",
          title: this.langlist[this.$store.state.lang]["듣기 스톤"],
          count: 0,
        },
        {
          category: "readStone",
          title: this.langlist[this.$store.state.lang]["읽기 스톤"],
          count: 0,
        },
        {
          category: "speakStone",
          title: this.langlist[this.$store.state.lang]["말하기 스톤"],
          count: 0,
        },
        {
          category: "writeStone",
          title: this.langlist[this.$store.state.lang]["쓰기 스톤"],
          count: 0,
        },
        {
          category: "goldstone",
          title: this.langlist[this.$store.state.lang]["골드 (챗봇)"],
          count: 0,
        },
      ];
    },
    rewardRestrict(data) {
      let min = (data[0] + data[1]) / 2;

      if (min <= 5) {
        return {
          stone: 4,
          gold: 3000,
        };
      } else if (min > 5 && min <= 10) {
        return {
          stone: 6,
          gold: 4000,
        };
      } else if (min >= 11 && min <= 15) {
        return {
          stone: 8,
          gold: 5000,
        };
      } else if (min >= 16 && min <= 20) {
        return {
          stone: 10,
          gold: 6000,
        };
      } else if (min > 20) {
        return {
          stone: 12,
          gold: 7000,
        };
      }
    },
    stonecount(type, index) {
      if (index === this.stones.length - 1) {
        if (type === "plus") {
          if (
            this.stones[index].count ===
            this.rewardRestrict(this.missiontime())["gold"]
          ) {
            return;
          } else {
            this.stones[index].count += 1000;
          }
        } else {
          if (this.stones[index].count === 0) {
            return;
          } else {
            this.stones[index].count -= 1000;
          }
        }
      } else {
        if (type === "plus") {
          if (
            this.stoneresult() ===
            this.rewardRestrict(this.missiontime())["stone"]
          ) {
            return;
          } else {
            this.stones[index].count += 1;
          }
        } else {
          if (this.stoneresult() === 0) {
            return;
          } else if (this.stones[index].count === 0) {
            return;
          } else {
            this.stones[index].count -= 1;
          }
        }
      }
    },

    stoneresult() {
      let cnt = 0;
      for (let i = 0; i < this.stones.length - 1; i++) {
        cnt += this.stones[i].count;
      }

      return cnt;
    },

    percent() {
      const missions = this.targetmissions;

      const arr = [
        "listening",
        "reading",
        "speaking",
        "writing",
        "booktalk",
        "aibooktalk",
        "aifreetalk",
      ];
      let tempNum = 0;

      for (let i = 0; i < arr.length; i++) {
        let arr2 = missions.filter((item) => item.category === arr[i]);
        if (!arr2.length) {
          continue;
        }

        let percent = Math.floor((arr2[0].count / 3) * 100);
        tempNum += percent;
      }

      return Math.floor(tempNum / 5);
    },

    missiontime() {
      const missions = this.targetmissions;

      let time = 0;
      for (let i = 0; i < missions.length; i++) {
        time += missions[i].count * missions[i].time;
      }

      let min = Math.round((time * 1.2) / 60);
      let max = Math.round((time * 1.6) / 60);

      return [min, max];
    },

    async sendmission() {
      let info = {
        content: [],
        listenStone: 0,
        readStone: 0,
        speakStone: 0,
        writeStone: 0,
        gold: 0,
        personalMissionCount: 0,
        lesson: this.lessonindex,
        teacherFlag: this.teacherFlag,
      };
      const missionInfo = this.targetmissions;
      const rewards = this.stones;

      for (let i = 0; i < missionInfo.length; i++) {
        if (missionInfo[i].category === "personal") {
          info.personalMissionCount = missionInfo[i].count;
          continue;
        }
        if (missionInfo[i].category === "booktalk") {
          info.content.push({
            type: "book",
            requireNum: missionInfo[i].count,
          });
          continue;
        }
        if (missionInfo[i].category === "aibooktalk") {
          info.content.push({
            type: "gpt",
            requireNum: missionInfo[i].count,
          });
          continue;
        }
        if (missionInfo[i].category === "aifreetalk") {
          info.content.push({
            type: "free",
            requireNum: missionInfo[i].count,
          });
          continue;
        }
        info.content.push({
          type: missionInfo[i].category,
          requireNum: missionInfo[i].count,
        });
      }

      for (let i = 0; i < rewards.length; i++) {
        if (rewards[i].category === "goldstone") {
          info["gold"] = rewards[i].count;
        } else {
          info[rewards[i].category] = rewards[i].count;
        }
      }

      const sum =
        info.listenStone + info.readStone + info.speakStone + info.writeStone;

      if (sum === 0) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "스톤 보상을 설정해주세요!"
                ],
              ],
            },
          })
        );

        return;
      }

      if (info.gold === 0) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "골드 보상을 설정해주세요!"
                ],
              ],
            },
          })
        );

        return;
      }

      for (let i = 0; i < info.content.length; i++) {
        if (
          info.content[i].type === "book" ||
          info.content[i].type === "gpt" ||
          info.content[i].type === "free"
        ) {
          info.content[i].requireNum = info.content[i].requireNum * 5;
        }
      }

      const res = await opennewmission(info);

      window.dispatchEvent(
        new CustomEvent("openmission", {
          detail: {
            lesson: this.lessonindex,
          },
        })
      );

      window.dispatchEvent(
        new CustomEvent("success", {
          detail: {
            status: true,
            text: [
              this.langlist[this.$store.state.lang][
                "교사 미션이 설정되었습니다."
              ],
            ],
          },
        })
      );
      return;
    },
  },
};
</script>

<style scoped>
.listening {
  background-image: url("../../assets/image/ListeningPlanet.png");
}

.reading {
  background-image: url("../../assets/image/ReadingPlanet.png");
}

.speaking {
  background-image: url("../../assets/image/SpeakingPlanet.png");
}

.writing {
  background-image: url("../../assets/image/WritingPlanet.png");
}

.booktalk {
  background-image: url("../../assets/image/book.png");
}

.aibooktalk {
  background-image: url("../../assets/image/conicon.png");
}

.aifreetalk {
  background-image: url("../../assets/image/tomytomy.png");
}

.personal {
  background-image: url("../../assets/image/CustomMission.png");
}

.long {
  width: 150px;
}

.planet {
  width: 80px;
  height: 80px;
  margin-left: 14px;
}

.countdiv {
  width: 80px;
  height: 30px;
  background-color: #cae3ff;
  border-radius: 10px;
  font-family: notosans;
  margin-top: 5px;
  margin-left: 14px;
}

.element {
  width: 108px;
  text-align: center;
  margin-right: 12px;
}

.graphicon {
  width: 12px;
  height: 12px;
  background-image: url("../../assets/image/graphicon.png");
  background-size: 100%;
}

.gold {
  width: 40px;
  height: 40px;
  background-image: url("../../assets/image/gold.png");
  background-size: 100%;
  float: left;
}

.stones {
  width: 40px;
  height: 40px;
  background-image: url("../../assets/image/stones.png");
  background-size: 100%;
  float: left;
}

.listenStone {
  background-image: url("../../assets/image/listenstone.png");
  background-size: 100%;
}

.readStone {
  background-image: url("../../assets/image/readstone.png");
  background-size: 100%;
}

.speakStone {
  background-image: url("../../assets/image/speakstone.png");
  background-size: 100%;
}

.writeStone {
  background-image: url("../../assets/image/writestone.png");
  background-size: 100%;
}

.goldstone {
  background-image: url("../../assets/image/gold.png");
  background-size: 100%;
}

.stone {
  width: 60px;
  height: 60px;
  margin-left: 15px;
}

.plusbtn {
  cursor: pointer;
  width: 100%;
}

.minusbtn {
  cursor: pointer;
}
</style>