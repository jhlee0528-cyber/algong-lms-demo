<template>
  <WrapContent>
    <div class="inner">
      <div>
        <h4 class="headline">
          {{ langlist[$store.state.lang]["GPT 대화 주제 설정"] }}
        </h4>
        <p class="content-subtitle">
          {{
            langlist[$store.state.lang][
              "GPT와 나눌 대화의 주제를 직접 설정할 수 있습니다."
            ]
          }}
        </p>
      </div>

      <section>
        <h4 class="headline2" style="color: #3480d8">
          <SettingIcon />
          {{ langlist[$store.state.lang]["선생님 추천 주제 설정"] }}
        </h4>

        <!-- 교사 작성 영역  -->
        <div v-show="customsubject === ''">
          <div
            :class="{
              customcontainer: customloading === true,
            }"
            class="cont"
          >
            <div v-if="customloading === true" class="loading">
              <v-progress-circular
                size="80"
                indeterminate
                color="gray"
              ></v-progress-circular>
            </div>

            <div class="title-wrap">
              <h6 class="headline3">
                {{ langlist[$store.state.lang]["교사 작성 영역"] }}
              </h6>
              <p class="body1">
                {{
                  langlist[$store.state.lang][
                    "아래 내용을 입력하면 구체적인 상황, 학생 역할, 영어 주제가 생성됩니다."
                  ]
                }}
              </p>
            </div>

            <div>
              <div class="flex">
                <p>
                  {{ langlist[$store.state.lang]["주제 키워드"] }}
                </p>
                <input
                  class="gptinput"
                  v-model="subjectkeyword"
                  autofocus
                  :placeholder="
                    langlist[$store.state.lang][
                      '예: 하루 일과 어땠는지 대화 해보기, 학교 끝나고 어떤 활동 하는지 대화 해보기'
                    ]
                  "
                  spellcheck="false"
                  type="text"
                />
              </div>
              <div class="flex" style="margin-top: 20px">
                <p>
                  {{ langlist[$store.state.lang]["GPT 역할"] }}
                </p>
                <input
                  class="gptinput"
                  :class="{
                    marginvt: $store.state.lang !== 'ko',
                  }"
                  v-model="gptrole"
                  :placeholder="
                    langlist[$store.state.lang][
                      '예: 엄마, 친한 친구, 선생님, 동생'
                    ]
                  "
                  spellcheck="false"
                  type="text"
                />
              </div>
            </div>
          </div>
          <v-row style="margin-top: 20px" justify="center">
            <v-btn
              @click="setgpttopic()"
              width="186"
              height="48"
              variant="outlined"
              style="
                background-color: #258bff;
                font-size: 14px;
                font-family: notosans;
                color: white;
                border-radius: 6px;
              "
              >{{ langlist[$store.state.lang]["GPT로 구체화하기"] }}</v-btn
            >
          </v-row>
        </div>

        <!-- 생성결과 -->
        <div v-show="customsubject != ''">
          <div
            :class="{ customcontainer: customloading2 === true }"
            class="cont"
          >
            <div v-show="customloading2 === true" class="loading">
              <v-progress-circular
                indeterminate
                size="80"
              ></v-progress-circular>
            </div>
            <div class="title-wrap">
              <h6 class="headline3">
                {{ langlist[$store.state.lang]["생성 결과"] }}
              </h6>
              <p class="body1">
                {{
                  langlist[$store.state.lang][
                    "입력하신 내용을 바탕으로 구체화된 주제입니다."
                  ]
                }}
              </p>
            </div>

            <div class="flex-wrap">
              <div class="flex">
                <p>
                  {{ langlist[$store.state.lang]["주제 키워드"] }}
                </p>
                <div class="item">
                  <p>{{ customsubject.title_ENG }}</p>
                  <p style="margin-top: 3px">
                    {{ customsubject.title_KOR }}
                  </p>
                </div>
              </div>

              <div class="flex">
                <p>
                  {{ langlist[$store.state.lang]["GPT 역할"] }}
                </p>
                <div class="item">
                  <p>{{ customsubject.tomy_role }}</p>
                </div>
              </div>

              <div class="flex">
                <p>
                  {{ langlist[$store.state.lang]["학생 역할"] }}
                </p>
                <div class="item">
                  <p>{{ customsubject.user_role }}</p>
                </div>
              </div>

              <div class="flex">
                <p>
                  {{ langlist[$store.state.lang]["상황"] }}
                </p>
                <div class="item">
                  <p>
                    {{ customsubject.intro_change }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <v-row
            style="margin-top: 30px; font-family: notosansregular"
            justify="center"
          >
            <v-btn
              @click="init()"
              style="
                border: 1px solid #258bff;
                background-color: white;
                color: #3480d8;
                font-size: 14px;
                border-radius: 6px;
                font-family: notosans;
              "
              width="186"
              height="48"
              variant="outlined"
              >{{ langlist[$store.state.lang]["초기화"] }}</v-btn
            >
            <v-btn
              @click="setTopic()"
              width="186"
              height="48"
              variant="outlined"
              style="
                margin-left: 20px;
                border: 1px solid white;
                background-color: #258bff;
                color: white;
                font-size: 14px;
                border-radius: 6px;
                font-family: notosans;
              "
              >{{ langlist[$store.state.lang]["주제 설정하기"] }}</v-btn
            >
          </v-row>
        </div>
      </section>

      <section>
        <h4 class="headline2" style="color: #3480d8">
          <DetailIcon />
          {{ langlist[$store.state.lang]["GPT 대화 설정 내역"] }}
        </h4>
        <table class="table-default">
          <tr>
            <th>no</th>
            <th>{{ langlist[$store.state.lang]["날짜"] }}</th>
            <th style="width: 400px">
              {{ langlist[$store.state.lang]["주제"] }}
            </th>
            <th>
              {{ langlist[$store.state.lang]["상세"] }}
            </th>
          </tr>
          <tr v-for="(j, i) in gpthistories" :key="i">
            <td>
              {{ i + 1 }}
            </td>
            <td>{{ j.date }}</td>
            <td>
              <p>{{ j.title_ENG }}</p>
              <p style="margin-top: 3px; font-size: 14px">{{ j.title_KOR }}</p>
            </td>
            <td>
              <DetailIcon
                @click="
                  {
                    targetdetail = j;
                    gptdetailmodal = true;
                  }
                "
              />
            </td>
          </tr>
        </table>
      </section>

      <v-dialog persistent width="800" v-model="gptdetailmodal">
        <div class="modal-wrap">
          <div class="modal-title">
            <h6 style="font-size: 20px; font-family: notosans">
              {{ langlist[$store.state.lang]["교사 주제 설정"] }}
            </h6>
            <button
              @click="
                {
                  gptdetailmodal = false;
                }
              "
              style="font-size: 25px; margin-top: -5px; cursor: pointer"
            >
              ✖
            </button>
          </div>
          <div class="flex-wrap">
            <div class="flex">
              <p>
                {{ langlist[$store.state.lang]["주제 키워드"] }}
              </p>
              <div class="item">
                <p>
                  {{ targetdetail.title_ENG }}
                </p>
                <p style="margin-top: 3px">{{ targetdetail.title_KOR }}</p>
              </div>
            </div>

            <div class="flex">
              <p>
                {{ langlist[$store.state.lang]["GPT 역할"] }}
              </p>
              <div class="item">
                <p>
                  {{ targetdetail.tomy_role }}
                </p>
              </div>
            </div>

            <div class="flex">
              <p>
                {{ langlist[$store.state.lang]["학생 역할"] }}
              </p>

              <div class="item">
                <p>
                  {{ targetdetail.user_role }}
                </p>
              </div>
            </div>

            <div class="flex">
              <p>
                {{ langlist[$store.state.lang]["상황"] }}
              </p>

              <div class="item">
                <p>
                  {{ targetdetail.intro_change }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </v-dialog>
    </div>
  </WrapContent>
</template>

<script>
import {
  customGPTsubject,
  setGPTsubject,
  gpthistory,
} from "../../api/api-list";
import WrapContent from "../common/WrapContent.vue";

import { gptsetting_vt } from "../../assets/translate/vt";
import { gptsetting_ko } from "../../assets/translate/ko";
import DetailIcon from "../icons/DetailIcon.vue";
import SettingIcon from "../icons/SettingIcon.vue";

export default {
  components: {
    WrapContent,
    SettingIcon,
    DetailIcon,
  },
  async created() {
    const res = await gpthistory();
    this.gpthistories = res.data.data.reverse();
  },
  data() {
    return {
      langlist: {
        ko: gptsetting_ko,
        vt: gptsetting_vt,
      },
      subjectkeyword: "",
      gptrole: "",
      customloading: false,
      customloading2: false,
      customsubject: "",
      gpthistories: [],
      gptdetailmodal: false,
      targetdetail: {},
    };
  },
  methods: {
    isJsonstring(str) {
      try {
        var json = JSON.parse(str);
        return typeof json === "object";
      } catch (e) {
        return false;
      }
    },
    async setgpttopic() {
      if (!this.subjectkeyword) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "주제 키워드를 입력해주세요."
                ],
              ],
            },
          })
        );
        return;
      }

      if (!this.gptrole) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "GPT 역할을 입력해주세요."
                ],
              ],
            },
          })
        );
        return;
      }

      this.customloading = true;

      const res = await customGPTsubject({
        topic: this.subjectkeyword,
        GPT: this.gptrole,
      });

      const gptData = res.data.data;

      if (this.isJsonstring(gptData)) {
        const data = JSON.parse(res.data.data);
        const keys = Object.getOwnPropertyNames(data);

        for (let i = 0; i < keys.length; i++) {
          if (!data[keys[i]]) {
            window.dispatchEvent(
              new CustomEvent("error", {
                detail: {
                  status: true,
                  text: [
                    this.langlist[this.$store.state.lang][
                      "사용할 수 없는 주제 키워드입니다."
                    ],
                  ],
                },
              })
            );
            this.customloading = false;
            return;
          }
        }

        this.customsubject = JSON.parse(res.data.data);
        this.customloading = false;
      } else {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "사용할 수 없는 주제 키워드입니다."
                ],
              ],
            },
          })
        );
        this.customloading = false;
        return;
      }
    },
    init() {
      this.subjectkeyword = "";
      this.gptrole = "";
      this.customsubject = "";
    },
    async setTopic() {
      this.customloading2 = true;
      const res = await setGPTsubject(this.customsubject);
      if (res.data.data === true) {
        window.dispatchEvent(
          new CustomEvent("success", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "GPT 주제가 설정되었습니다."
                ],
              ],
            },
          })
        );
        this.subjectkeyword = "";
        this.gptrole = "";

        const { title_ENG, title_KOR, tomy_role, user_role, intro_change } =
          this.customsubject;

        this.customsubject = "";
        this.customloading2 = false;
        const date = this.prettydate(new Date());
        this.gpthistories = [
          { date, title_ENG, title_KOR, tomy_role, user_role, intro_change },
          ...this.gpthistories,
        ];
      } else {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "GPT 주제 설정 중 오류가 발생하였습니다."
                ],
              ],
            },
          })
        );
        this.customsubject = "";
        this.customloading2 = false;
      }
    },
    prettydate(newdate) {
      const year = newdate.getFullYear();
      const month = newdate.getMonth() + 1;
      const date = newdate.getDate();

      return `${year}-${month.toString().padStart(2, "0")}-${date
        .toString()
        .padStart(2, "0")}`;
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
  gap: 40px;
}
section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.flex-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.flex {
  display: flex;
  align-items: center;
}
.flex p {
  width: 80px;
  font-family: notosans;
  color: #636363;
  font-size: 14px;
  text-align: center;
}
.cont {
  position: relative;
  width: 100%;
  padding: 25px 28px;
  border-radius: 14px;
  background-color: #f1f8ff;
}

.customcontainer {
  filter: brightness(0.9);
}

.gptinput {
  margin-left: 20px;
  padding: 15px;
  width: 100%;
  height: 40px;
  font-family: notosansregular;
  font-size: 15px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #d6d6d6;
}

.gptinput:focus {
  outline: none;
  border: 1px solid #258bff;
}

.marginvt {
  margin-left: 45px;
}

/* table {
  width: 100%;
  text-align: center;
  border: 1px solid #cae3ff;
  overflow: hidden;
  border-spacing: 0;
  border-radius: 16px;

  th {
    font-family: notosans;
    font-size: 14px;
    border-right: none;
    background-color: #f1f8ff;
    color: #66686b;
    border-right: 1px solid #cae3ff;
    padding: 15px 10px;

    &:first-child {
      border-top-left-radius: 15px;
    }
    &:last-child {
      border-top-right-radius: 15px;
      border-right: none;
    }
  }

  td {
    font-family: notosansregular;
    font-size: 14px;
    color: #292929;
    border-bottom: 1px solid #cae3ff;
    border-right: 1px solid #cae3ff;
    padding: 22px 10px;

    &.center {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    &:last-child {
      border-right: none;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }

  .more {
    border: 1px solid #258bff;
    background: #fff;
    color: #258bff;
    border-radius: 20px;
    padding: 7px 20px;
    font-family: "notosans";
    cursor: pointer;
  }
} */

.modal-wrap {
  width: 100%;
  background-color: white;
  border-radius: 15px;
  padding: 20px 28px;
  .flex-wrap {
    padding-top: 15px;
  }
}
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #cae3ff;
  padding-bottom: 15px;
}
.item {
  width: 100%;
  height: 100%;
  background-color: #dbecff;
  border-radius: 15px;
  padding: 15px;
  margin-left: 25px;

  p {
    width: 100%;
    text-align: left;
    font-size: 16px;
    color: #353535;
    font-family: notosansregular;
  }
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
}
.title-wrap {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #cae3ff;
  p {
    margin-top: 4px;
    color: #66686b;
  }
}
h4 {
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 20px;
  }
}
</style>
