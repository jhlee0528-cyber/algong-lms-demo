<template>
  <div style="width: 100%">
    <div class="container">
      <div>
        <h4 class="headline">
          {{ langlist[$store.state.lang]["내 정보 수정"] }}
        </h4>
        <span class="text">
          {{
            langlist[$store.state.lang][
              "계정 정보, 연락처 등 내 정보를 수정합니다."
            ]
          }}
        </span>
      </div>
      <div class="card">
        <div class="item">
          <div>
            <div class="text-wrap">
              <div>
                <p class="headline2">
                  {{ langlist[$store.state.lang]["이름"] }}
                </p>
                <p class="body1">
                  {{ teacherinfo.name }}
                </p>
              </div>

              <div>
                <p class="headline2">
                  {{ langlist[$store.state.lang]["계정 정보"] }}
                </p>
                <p class="body1">
                  {{ teacherinfo.id }}
                </p>
              </div>
            </div>
          </div>

          <button
            @click="
              {
                passwordmodal = true;
              }
            "
            class="btn"
          >
            {{ langlist[$store.state.lang]["비밀번호 변경"] }}
          </button>
        </div>
        <div class="item">
          <div class="text-wrap">
            <p class="headline2">
              {{ langlist[$store.state.lang]["이메일"] }}
            </p>
            <p class="body1">
              {{ teacherinfo.email || "-" }}
            </p>
          </div>

          <button
            @click="
              {
                emailmodal = true;
              }
            "
            class="btn"
          >
            {{ langlist[$store.state.lang]["수정"] }}
          </button>
        </div>
        <div class="item">
          <div class="text-wrap">
            <p class="headline2">
              {{ langlist[$store.state.lang]["전화번호"] }}
            </p>
            <p class="body1">
              {{ teacherinfo.phonenum || "-" }}
            </p>
          </div>

          <button
            @click="
              {
                telmodal = true;
              }
            "
            class="btn"
          >
            {{ langlist[$store.state.lang]["수정"] }}
          </button>
        </div>
      </div>
    </div>

    <!-- 1. 비밀번호 수정 -->
    <v-dialog width="500" persistent v-model="passwordmodal">
      <div class="modal-wrap">
        <div v-show="passwordmodal2 === false">
          <div class="inner">
            <div>
              <p class="headline">
                {{ langlist[$store.state.lang]["본인 확인"] }}
              </p>
              <p class="body1">
                {{
                  langlist[$store.state.lang][
                    "본인 확인을 위해 비밀번호를 다시 입력해주세요."
                  ]
                }}
              </p>
            </div>
            <div>
              <p style="font-family: notosans">
                {{ langlist[$store.state.lang]["아이디"] }}
              </p>
              <input
                v-model="id"
                style="margin-top: 10px"
                type="text"
                class="inputstyle1"
                placeholder="ID"
              />
              <p
                style="
                  font-family: notosansregular;
                  color: red;
                  font-size: 13px;
                  position: absolute;
                "
              >
                {{ iderror }}
              </p>

              <p style="font-family: notosans; margin-top: 20px">
                {{ langlist[$store.state.lang]["비밀번호"] }}
              </p>
              <input
                v-model="pw"
                style="margin-top: 10px"
                type="password"
                class="inputstyle1"
                placeholder="Password"
              />
              <p
                style="
                  font-family: notosansregular;
                  color: red;
                  font-size: 13px;
                  position: absolute;
                "
              >
                {{ pwerror }}
              </p>
            </div>

            <v-btn @click="login()" variant="outlined" class="modal-btn"
              >{{ langlist[$store.state.lang]["확인"] }}
            </v-btn>
          </div>
        </div>

        <div v-show="passwordmodal2 === true">
          <p style="font-family: notosans; font-size: 20px">
            {{ langlist[$store.state.lang]["새 비밀번호 입력"] }}
          </p>
          <p
            style="
              font-family: notosansregular;
              font-size: 14px;
              margin-top: 3px;
            "
          >
            {{ langlist[$store.state.lang]["변경할 비밀번호를 입력해주세요"] }}
          </p>
          <div style="margin-top: 40px">
            <p style="font-family: notosans">
              {{ langlist[$store.state.lang]["새 비밀번호"] }}
            </p>
            <input
              v-model="newpw"
              style="margin-top: 10px"
              type="password"
              class="inputstyle1"
              :placeholder="langlist[$store.state.lang]['영문/숫자 6자리 이상']"
            />
            <p
              style="
                font-family: notosansregular;
                color: red;
                font-size: 13px;
                position: absolute;
              "
            >
              {{ newpwerror }}
            </p>

            <p style="font-family: notosans; margin-top: 30px">
              {{ langlist[$store.state.lang]["새 비밀번호 확인"] }}
            </p>
            <input
              v-model="newpwcheck"
              style="margin-top: 10px"
              type="password"
              class="inputstyle1"
              :placeholder="
                langlist[$store.state.lang]['위와 동일한 비밀번호 입력']
              "
            />
            <p
              style="
                font-family: notosansregular;
                color: red;
                font-size: 13px;
                position: absolute;
              "
            >
              {{ newpwcheckerror }}
            </p>
          </div>

          <v-btn
            @click="passwordchange()"
            width="350"
            height="40"
            style="
              margin-top: 60px;
              border-radius: 20px;
              font-family: notosansregular;
              background-color: #3d90ef;
              color: white;
              border: none;
              font-size: 16px;
            "
            variant="outlined"
            >{{ langlist[$store.state.lang]["확인"] }}</v-btn
          >
        </div>
      </div>

      <button
        class="noselect xbtn"
        @click="
          {
            passwordmodal = false;
            passwordmodal2 = false;
            id = '';
            pw = '';
            iderror = '';
            pwerror = '';
            newpw = '';
            newpwcheck = '';
            pwerror = '';
            pwcheckerror = '';
          }
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M11.0006 28.2163L28.0001 10.9176"
            stroke="#292929"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M27.9994 28.2163L10.9999 10.9176"
            stroke="#292929"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </v-dialog>
    <!-- 2. 이메일 수정 -->
    <v-dialog width="500" persistent v-model="emailmodal">
      <div class="modal-wrap">
        <div class="inner">
          <div>
          <p class="headline">
            {{ langlist[$store.state.lang]["이메일 수정"] }}
          </p>
          <p class="body1">
            {{
              langlist[$store.state.lang][
                "이메일 정보 수정을 위해 이메일을 입력해주세요."
              ]
            }}
          </p>
        </div>
          <div>
            <input
              v-model="email"
              type="text"
              class="inputstyle1"
              placeholder="Email"
              autofocus
            />
          </div>

          <v-btn @click="emailchange()" class="modal-btn" variant="outlined">{{
            langlist[$store.state.lang]["확인"]
          }}</v-btn>
        </div>
      </div>
      <button
        class="noselect xbtn"
        @click="
          {
            emailmodal = false;
            emailmodal2 = false;
            email = '';
            emailauth = '';
          }
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M11.0006 28.2163L28.0001 10.9176"
            stroke="#292929"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M27.9994 28.2163L10.9999 10.9176"
            stroke="#292929"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </v-dialog>
    <!-- 3. 전화번호 수정 -->
    <v-dialog width="500" persistent v-model="telmodal">
      <div class="modal-wrap">
        <div class="inner">
          <p style="font-family: notosans; font-size: 20px">
            {{
              langlist[$store.state.lang]["변경할 전화번호 인증이 필요합니다."]
            }}
          </p>
          <div>
            <p style="font-family: notosans; font-size: 17px">
              {{ langlist[$store.state.lang]["이름"] }}
            </p>
            <input
              v-model="name"
              type="text"
              class="inputstyle1"
              :placeholder="langlist[$store.state.lang]['이름을 입력해주세요.']"
            />
            <div style="margin-top: 20px">
              <p style="font-family: notosans; font-size: 17px">
                {{ langlist[$store.state.lang]["전화번호"] }}
              </p>
              <div class="flex" style="margin-top: 10px">
                <input
                  v-model="phonenum"
                  type="text"
                  class="inputstyle1"
                  :placeholder="
                    langlist[$store.state.lang]['전화번호를 입력해주세요.']
                  "
                />
                <v-btn
                  v-if="Timer == null"
                  @click="goauth()"
                  width="120"
                  height="45"
                  variant="outlined"
                  style="
                    float: left;
                    background-color: #3d90ef;
                    color: white;
                    margin-left: 10px;
                    font-family: notosansregular;
                    border-radius: 20px;
                  "
                  >{{ langlist[$store.state.lang]["인증"] }}</v-btn
                >
                <v-btn
                  v-if="Timer != null"
                  @click="goauth()"
                  width="120"
                  height="45"
                  variant="outlined"
                  style="
                    float: left;
                    background-color: #3d90ef;
                    color: white;
                    margin-left: 10px;
                    font-family: notosansregular;
                    border-radius: 20px;
                  "
                  >{{ langlist[$store.state.lang]["재전송"] }}</v-btn
                >
              </div>
              <div v-show="checkauthflag === false" class="flex" style="margin-top: 10px">
                <input
                  disabled
                  v-model="authnum"
                  type="text"
                  class="inputstyle1"
                  style="width: 280px; float: left"
                  :placeholder="
                    langlist[$store.state.lang]['인증번호를 입력해주세요.']
                  "
                />
                <v-btn
                  disabled
                  width="120"
                  height="45"
                  variant="outlined"
                  style="
                    float: left;
                    background-color: #3d90ef;
                    color: white;
                    margin-left: 10px;
                    font-family: notosansregular;
                    border-radius: 20px;
                  "
                  >{{ langlist[$store.state.lang]["변경"] }}</v-btn
                >
              </div>
              <div v-show="checkauthflag === true" style="margin-top: 10px">
                <input
                  v-model="authnum"
                  type="text"
                  class="inputstyle1"
                  style="width: 280px; float: left"
                  :placeholder="
                    langlist[$store.state.lang]['인증번호를 입력해주세요.']
                  "
                />
                <v-btn
                  @click="checkauth()"
                  width="120"
                  height="45"
                  variant="outlined"
                  style="
                    float: left;
                    background-color: #3d90ef;
                    color: white;
                    margin-left: 10px;
                    font-family: notosansregular;
                    border-radius: 20px;
                  "
                  >{{ langlist[$store.state.lang]["변경"] }}</v-btn
                >
              </div>
              <p
                v-show="checkauthflag === true"
                :class="{
                  authtext: authfail === false,
                  authtextfail: authfail === true,
                }"
              >
                {{ authtext }} : {{ TimerStr }}
              </p>
              <p
                style="
                  font-family: notosansmedium;
                  font-size: 13px;
                  color: red;
                  margin-top: 120px;
                "
                v-show="timeCnt <= 0"
              >
                {{
                  langlist[$store.state.lang][
                    "입력시간이 초과되었습니다. 인증번호를 다시 받아주세요."
                  ]
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
          class="noselect xbtn"
          @click="
            {
              telmodal = false;
              name = '';
              phonenum = '';
              authnum = '';
              Timer = null;
              checkauthflag = false;
            }
          "
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M11.0006 28.2163L28.0001 10.9176"
            stroke="#292929"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M27.9994 28.2163L10.9999 10.9176"
            stroke="#292929"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        </button>
    </v-dialog>
  </div>
</template>

<script>
import { teacherinfo, editemail } from "../../api/api-list-2";
import {
  login,
  passwordchange,
  sendmessage,
  checkauth,
} from "../../api/api-list";
import { getSaveCookie } from "../../store/cookie.js";

import { setting_info_ko } from "../../assets/translate/ko";
import { setting_info_vt } from "../../assets/translate/vt";

export default {
  async created() {
    const res = await teacherinfo();
    this.teacherinfo = res.data.data;
    this.authtext = this.langlist[this.$store.state.lang]["인증번호 유효시간"];
  },
  data() {
    return {
      langlist: {
        ko: setting_info_ko,
        vt: setting_info_vt,
      },
      teacherinfo: "",
      passwordmodal: false,
      passwordmodal2: false,
      emailmodal: false,
      emailmodal2: false,
      telmodal: false,
      iderror: "",
      pwerror: "",
      id: "",
      pw: "",
      newpw: "",
      newpwcheck: "",
      newpwerror: "",
      newpwcheckerror: "",
      phonenum: "",
      authnum: "",
      name: "",
      checkauthflag: false,
      Timer: null,
      timeCnt: 121,
      TimerStr: "02:00",
      email: "",
      emailauth: "",
      authtext: "",
      authfail: false,
    };
  },
  methods: {
    closemodal() {
      this.passwordmodal = false;
      this.passwordmodal2 = false;
      this.emailmodal = false;
      this.telmodal = false;
      this.iderror = "";
      this.pwerror = "";
    },
    async login() {
      const data = {
        id: this.id,
        password: this.pw,
        os: "pc",
      };

      const res = await login(data);

      if (res.data.data == -1) {
        this.pwerror = "";
        this.iderror =
          this.langlist[this.$store.state.lang]["존재하지 않는 아이디입니다."];
        return;
      }

      if (res.data.data == -2) {
        this.iderror = "";
        this.pwerror =
          this.langlist[this.$store.state.lang][
            "비밀번호가 일치하지 않습니다."
          ];
        return;
      }

      if (res.data.data.token) {
        this.passwordmodal2 = true;
        return;
      }
    },
    async passwordchange() {
      const reg = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
      if (!reg.test(this.newpw)) {
        this.newpwcheckerror = "";
        this.newpwerror =
          this.langlist[this.$store.state.lang][
            "영문/숫자 6자리 이상으로 설정해주세요."
          ];
        return;
      }

      if (this.newpw !== this.newpwcheck) {
        this.newpwerror = "";
        this.newpwcheckerror =
          this.langlist[this.$store.state.lang][
            "비밀번호가 일치하지 않습니다."
          ];
        return;
      }

      this.newpwcheckerror = "";
      this.newpwerror = "";

      const data = {
        newPassword: this.newpw,
        newPasswordCheck: this.newpwcheck,
      };

      const res = await passwordchange(data);

      this.passwordmodal = false;

      window.dispatchEvent(
        new CustomEvent("passwordsuccess", {
          detail: {
            status: true,
            text: [
              this.langlist[this.$store.state.lang][
                "비밀번호 변경이 완료되었습니다."
              ],
              this.langlist[this.$store.state.lang][
                "안정적인 사용을 위해 다시 로그인해주세요."
              ],
            ],
          },
        })
      );

      return;
    },
    async goauth() {
      if (!this.name) {
        return;
      }

      if (!this.phonenum) {
        return;
      }

      const regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
      if (!regPhone.test(this.phonenum)) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "핸드폰 번호를 입력해주세요"
                ],
              ],
            },
          })
        );

        return;
      }

      const token = getSaveCookie("info");

      const res = await sendmessage({ phonenum: this.phonenum }, token);

      if (res.data.result) {
        this.checkauthflag = true;
        clearInterval(this.Timer);
        this.Timer = null;
        this.Timer = this.timerStart();
      }
    },
    async checkauth() {
      if (this.checkauthflag === false) {
        return;
      }
      const token = getSaveCookie("info");
      const res = await checkauth(
        {
          name: this.name,
          phonenum: this.phonenum,
          authnum: this.authnum,
        },
        token
      );

      if (!res.data.data) {
        // window.dispatchEvent(
        //   new CustomEvent("error", {
        //     detail: {
        //       status: true,
        //       text: ["인증에 실패하였습니다."],
        //     },
        //   })
        // );
        this.authfail = true;
        this.authtext =
          this.langlist[this.$store.state.lang]["인증번호를 다시 입력해주세요"];
      } else {
        this.authtext =
          this.langlist[this.$store.state.lang]["인증번호 유효시간"];
        this.authfail = false;
        window.dispatchEvent(
          new CustomEvent("success", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "전화번호 변경 완료되었습니다."
                ],
              ],
            },
          })
        );

        this.teacherinfo.name = this.name;
        this.teacherinfo.phonenum = this.phonenum;
        this.telmodal = false;
        this.name = "";
        this.phonenum = "";
        this.authnum = "";
        this.checkauthflag = false;
      }
    },
    timerStart() {
      this.TimerStr = "02:00";
      this.timeCnt = 121;
      var interval = setInterval(() => {
        this.timeCnt--; //1초씩 감소
        this.TimerStr = this.prettyTime();
        if (this.timeCnt <= 0) this.timerStop(interval);
      }, 1000);

      return interval;
    },
    timerStop(Timer) {
      clearInterval(Timer);
      this.timeCnt = 0;
      this.checkauthflag = false;
    },
    prettyTime() {
      let time = this.timeCnt / 60;
      let minutes = parseInt(time);
      let seconds = Math.round((time - minutes) * 60);
      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      );
    },
    async emailchange() {
      const reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!reg.test(this.email)) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "이메일 형식에 맞게 입력해주세요."
                ],
              ],
            },
          })
        );
        return;
      } else {
        const res = await editemail({ email: this.email });
        if (res.data.data) {
          this.teacherinfo.email = this.email;
          window.dispatchEvent(
            new CustomEvent("success", {
              detail: {
                status: true,
                text: [
                  this.langlist[this.$store.state.lang][
                    "이메일이 성공적으로 변경되었습니다."
                  ],
                ],
              },
            })
          );
          this.emailmodal = false;
          this.email = "";
          return;
        } else {
          window.dispatchEvent(
            new CustomEvent("error", {
              detail: {
                status: true,
                text: [
                  this.langlist[this.$store.state.lang][
                    "이메일 변경 중 오류가 발생하였습니다."
                  ],
                ],
              },
            })
          );
          return;
        }
      }
    },
    checkemailauth() {
      return;
    },
  },
};
</script>

<style scoped>
.container {
  width: 1017px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.card {
  width: 662px;
  /* width: 100%; */
  padding: 8px 32px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.item {
  width: 100%;
  padding: 25px 0;
  border-bottom: 1px solid #cae3ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
  p.body1 {
    color: #353535;
  }
}
.text-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;

  > div {
    display: flex;
    gap: 15px;
  }
}
.btn {
  min-width: 138px;
  padding: 8px 24px;
  background: #258bff;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  font-family: "notosansregular";
}
.modal-wrap {
  width: 100%;
  padding: 60px 60px 40px;
  background-color: #fff;
  border-radius: 20px;

  .inner {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  input,
  button {
    width: 100%;
  }
  .modal-btn {
    /* margin-top: 60px; */
    border-radius: 50px;
    font-family: notosansregular;
    background-color: #3d90ef;
    color: white;
    border: none;
    font-size: 16px;
    width: 100%;
    padding: 10px;
    height: 50px;
  }
}

.xbtn {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 30px;
  cursor: pointer;
  z-index: 999;
}

.inputstyle1 {
  outline: none;
  width: 350px;
  height: 45px;
  border: 1px solid #a9a9a9;
  border-radius: 30px;
  padding-left: 20px;
  font-size: 14px;
  font-family: notosansregular;
}

.inputstyle1:focus {
  border: 1px solid black;
}

.authtext {
  font-family: notosansmedium;
  font-size: 13px;
  color: #3480d8;
  margin-top: 120px;
}

.authtextfail {
  font-family: notosansmedium;
  font-size: 13px;
  color: red;
  margin-top: 120px;
}
</style>
