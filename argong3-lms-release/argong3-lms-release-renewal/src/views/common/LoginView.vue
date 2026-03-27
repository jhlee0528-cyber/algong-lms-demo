<template>
  <div
    class="maindiv"
    :class="{
      maindiv2: settingflag === true,
    }"
  >
    <!-- <div style="float: right; margin-top: 15px; margin-right: 30px">
      <languageSelectComponent></languageSelectComponent>
    </div> -->
    <div v-show="token === '' && settingflag === false" class="logindiv">
      <div :class="`loginimage_${$store.state.lang}`"></div>
      <div class="logincontainer">
        <div style="text-align: center; margin-top: 70px">
          <p v-show="newaccountflag === false" style="font-size: 31px">
            {{ langlist[$store.state.lang]["로그인"] }}
          </p>
          <div v-show="newaccountflag === true">
            <p style="font-size: 33px">회원가입</p>
            <p
              style="
                font-size: 17px;
                color: #636363;
                font-family: notosansregular;
                margin-top: 10px;
              "
            >
              회원 가입이 필요한 계정입니다. 코드를 입력해주세요.
            </p>
          </div>
        </div>
        <div
          v-show="newaccountflag === false"
          style="margin-left: 75px; margin-top: 50px; width: 400px"
        >
          <p
            style="
              font-family: notosansregular;
              font-size: 16px;
              color: #3d90ef;
            "
          >
            {{ langlist[$store.state.lang]["아이디"] }}
          </p>
          <input
            @keyup.enter="login()"
            autofocus
            class="inputstyle"
            v-model="id"
            type="text"
            placeholder="ID"
          />
          <p
            style="
              font-family: notosansregular;
              font-size: 16px;
              color: #3d90ef;
              margin-top: 25px;
            "
          >
            {{ langlist[$store.state.lang]["비밀번호"] }}
          </p>
          <input
            @keyup.enter="login()"
            autofocus
            class="inputstyle"
            v-model="pw"
            type="password"
            placeholder="PW"
          />
          <div style="float: right; margin-top: 20px">
            <input v-model="autocheck" style="float: left" type="checkbox" />
            <p
              style="
                float: left;
                margin-left: 10px;
                font-family: notosansregular;
                color: black;
              "
            >
              {{ langlist[$store.state.lang]["로그인 상태 유지"] }}
            </p>
          </div>
          <v-btn
            @click="login()"
            width="400"
            height="50"
            style="
              border-radius: 30px;
              background-color: #3d90ef;
              color: white;
              font-size: 18px;
              font-family: notosansregular;
              margin-top: 60px;
            "
            class="login-btn"
            variant="outlined"
            >{{ langlist[$store.state.lang]["로그인"] }}</v-btn
          >

          <div>
            <div
              @click="whalelogin()"
              class="whaleloginbtn noselect"
              style="float: left"
            >
              <div style="margin-left: 100px; margin-top: 8px">
                <div
                  class="whaleicon"
                  style="margin-top: -2px; margin-left: -80px"
                ></div>
                <p style="margin-left: -35px; float: left; margin-top: 1px">
                  웨일 로그인
                </p>
              </div>
            </div>
            <div
              v-if="$store.state.lang === 'ko'"
              @click="csclogin()"
              class="whaleloginbtn noselect"
              style="float: left; margin-left: 20px"
            >
              <div style="margin-left: 100px; margin-top: 8px">
                <div
                  class="cscicon"
                  style="margin-top: -2px; margin-left: -80px"
                ></div>
                <p style="margin-left: -40px; float: left; margin-top: 1px">
                  쿨스쿨 로그인
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              @click="chathesslogin()"
              class="chathessloginbtn noselect"
              style="float: left"
            >
              <div style="margin-left: 100px; margin-top: 8px">
                <div
                  class="chathessicon"
                  style="margin-top: -2px; margin-left: -80px"
                ></div>
                <p style="margin-left: -35px; float: left; margin-top: 1px">
                  체더스 로그인
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="newaccountflag === true"
          style="margin-left: 75px; margin-top: 50px; width: 400px"
        >
          <div style="margin-top: 70px">
            <p style="color: #3480d8; font-size: 19px">코드 입력</p>
            <div style="margin-top: 10px">
              <input
                v-model="whalecode"
                style="
                  outline: none;
                  border: 1px solid #3480d8;
                  border-radius: 25px;
                  width: 300px;
                  height: 50px;
                  padding: 15px;
                  padding-left: 20px;
                  float: left;
                "
                type="text"
              />
              <v-btn
                @click="codecheck()"
                variant="outlined"
                width="90"
                height="50"
                style="
                  float: left;
                  background-color: #3480d8;
                  border: none;
                  border-radius: 25px;
                  margin-left: 10px;
                  color: white;
                  font-size: 16px;
                  font-family: notosansregular;
                "
                :class="{
                  codedone: codefinish === true,
                }"
                >확인</v-btn
              >
            </div>
            <div style="position: absolute; margin-top: 60px">
              <p
                v-show="codeerror === true"
                style="color: red; font-family: notosansmedium; font-size: 15px"
              >
                유효한 코드가 아닙니다. 다시 입력해주세요.
              </p>
              <p
                v-show="codeerror2 === true"
                style="color: red; font-family: notosansmedium; font-size: 15px"
              >
                Master 계정의 설정을 끝까지 진행 후 입력해주세요.
              </p>
              <div v-show="accountlevel !== ''">
                <p
                  style="
                    color: #3480d8;
                    font-family: notosansmedium;
                    font-size: 15px;
                  "
                >
                  {{ schoolName }}초등학교 {{ accountsignuptext }}
                </p>
                <p
                  style="
                    color: #3480d8;
                    font-family: notosansmedium;
                    font-size: 15px;
                  "
                >
                  가입을 원하시면, 아래 버튼을 눌러주세요.
                </p>
              </div>
            </div>

            <div style="margin-top: 200px">
              <v-btn
                @click="codesignup()"
                :class="{
                  activate: accountlevel !== '',
                  inactivate: accountlevel === '',
                }"
                variant="outlined"
                style="
                  color: white;
                  border: none;
                  border-radius: 25px;
                  font-size: 16px;
                  font-family: notosansregular;
                "
                width="400"
                height="50"
                >가입</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-row justify="center">
      <agree
        v-show="token !== '' && settingflag === false"
        :token="token"
        :whale="whaleagree"
      >
      </agree>
    </v-row>

    <teacherLevelCheckView
      v-if="settingflag === true"
      :level="accountlevel"
      :userinfo="userinfo"
    ></teacherLevelCheckView>

    <v-dialog persistent v-model="whaleloginflag" width="500">
      <div style="width: 500px; height: 50px; background-color: white">
        <p
          @click="whalecancel()"
          class="noselect"
          style="
            font-size: 30px;
            float: right;
            margin-right: 15px;
            margin-top: 5px;
            cursor: pointer;
          "
        >
          ✖
        </p>
      </div>
      <div style="width: 500px; height: 700px; background-color: white">
        <iframe
          style="width: 500px; height: 700px"
          :src="whaleurl"
          frameborder="0"
        ></iframe>
      </div>
    </v-dialog>
    <!-- <v-dialog persistent width="600" v-model="maint">
      <div style="width: 500px; height: 630px; background-color: white">
        <div style="padding: 30px">
          <p style="font-size: 20px">[알공 모바일 앱 긴급점검 안내]</p>
          <br />
          <p>안녕하세요. 알공팀입니다.</p>
          <p>
            현재 알공 모바일 앱 긴급 서버 점검 작업으로 알공 서비스 이용에
            제한이 있습니다.
          </p>
          <br />
          <p>📢 점검 현황:</p>
          <p>알공 모바일 앱(ios/안드로이드) : 점검 중</p>
          <p>알공 web : 정상 서비스</p>
          <p>교사용 LMS : 정상 서비스</p>
          <p>서버 점검 예상 시간:</p>
          <p>시작 : 12/17(화) 오후 10:40</p>
          <p>종료 : 점검 작업 완료시까지</p>
          <p>점검 중 이용에 불편을 끼쳐드려 죄송합니다.</p>
          <p>신속히 복구하여 정상 서비스를 제공하겠습니다.</p>
          <br />
          <p>추가 문의사항은 고객센터로 연락 바랍니다.</p>
          <p>이메일: support@dnsoft.co.kr</p>
          <p>감사합니다.</p>
        </div>
        <v-btn
          @click="
            {
              maint = false;
            }
          "
          variant="outlined"
          width="130"
          style="
            background-color: #3480d8;
            color: white;
            font-size: 17px;
            margin-left: 185px;
            margin-top: 40px;
            height: 45px;
          "
          >확인</v-btn
        >
      </div>
    </v-dialog> -->
  </div>
</template>

<script>
import agree from "./agree.vue";
import teacherLevelCheckView from "../whale/teacherLevelCheckView.vue";
import {
  nonSaveCookie,
  getSaveCookie,
  saveCookie,
  deleteCookie,
} from "../../store/cookie";
import axios from "axios";
import languageSelectComponent from "./languageSelectComponent.vue";
import { login_ko } from "../../assets/translate/ko";
import { login_vt } from "../../assets/translate/vt";

export default {
  created() {
    if (this.$store.state.token) {
      this.$router.replace({ path: "/learning/status" });
    }

    const cool = sessionStorage.getItem("cool");
    sessionStorage.removeItem("cool");

    this.whaleurl = `${process.env.VUE_APP_CONNECT}/users/works-ad`;

    this.langlist["ko"] = login_ko;
    this.langlist["vt"] = login_vt;

    window.addEventListener("goagree", this.handleagree);
    window.addEventListener("gologin", this.handlelogin);
    window.addEventListener("newaccount", this.handlenewaccount);
    window.addEventListener("accountsetting", this.handleaccountsetting);
    window.addEventListener("coolSetting", this.handleCoolSetting);
    window.addEventListener("goschoolsetting", this.handleAgreeAfterSetting);

    if (cool) {
      this.handleCoolSetting();
    }
  },
  data() {
    return {
      maint: true,
      whaleurl: "",
      id: "",
      pw: "",
      autocheck: false,
      token: "",
      whaleflag: false,
      whaleloginflag: false,
      newaccountflag: false,
      waitevent: "",
      whalecode: "",
      codeerror: false,
      codeerror2: false,
      accountlevel: "",
      whaleagree: false,
      settingflag: false,
      userinfo: "",
      lang: getSaveCookie("lang") || "ko",
      langlist: {},
      cscloginflag: false,
      codefinish: false,
      accountsignuptext: "",
      schoolName: "",
    };
  },
  components: {
    agree,
    teacherLevelCheckView,
    languageSelectComponent,
  },
  methods: {
    handleAgreeAfterSetting() {
      this.token = "";
      this.settingflag = true;
    },
    async handleCoolSetting(event) {
      this.whaleagree = true;

      const isAgree = sessionStorage.getItem("isAgree");
      const firstLogin = sessionStorage.getItem("firstLogin");
      const temp = sessionStorage.getItem("temp");

      if (!firstLogin) {
        return;
      }

      if (firstLogin === "true") {
        this.newaccountflag = true;
        return;
      } else if (firstLogin === "temp") {
        if (isAgree === "false") {
          this.token = sessionStorage.getItem("temp");
          this.settingflag = false;

          return;
        }

        const result = await axios
          .get(`${process.env.VUE_APP_CONNECT}/users`, {
            credentials: true,
            headers: {
              Authorization: sessionStorage.getItem("temp"),
            },
          })
          .catch((err) => {});

        this.userinfo = result.data.data;

        this.accountlevel = this.userinfo.schoolLevel;

        this.settingflag = true;

        return;
      } else {
        if (isAgree === "false") {
          this.whaleagree = true;

          this.whalecancel();

          this.token = sessionStorage.getItem("temp");
          this.settingflag = false;

          return;
        } else {
          if (this.autocheck) {
            saveCookie("info", temp);
          } else {
            nonSaveCookie("info", temp);
          }

          deleteCookie("info2");
          this.$store.state.token = temp;

          this.$router.replace({ path: "/learning/status" });
        }
      }
    },
    handleaccountsetting(event) {},
    handlenewaccount(event) {
      this.whaleloginflag = false;
      this.newaccountflag = true;
    },
    handleagree(event) {
      this.settingflag = false;
      this.token = event.detail.token;
    },
    handlelogin(event) {
      // const data = { id: this.id, password: this.pw, check: this.autocheck };
      // this.$store.dispatch("LOGIN", data);

      if (this.autocheck) {
        this.$store.state.token = this.token;
        saveCookie("info", this.token);

        this.$router.replace({ path: "/learning/status" });
      } else {
        this.$store.state.token = this.token;
        nonSaveCookie("info", this.token);

        this.$router.replace({ path: "/learning/status" });
      }
    },
    login() {
      if (this.id == "" || this.pw == "") {
        let errorEvent = new CustomEvent("error", {
          detail: {
            status: true,
            text: [
              `${
                this.langlist[this.$store.state.lang][
                  "로그인 정보를 입력해주세요."
                ]
              }`,
            ],
          },
        });

        window.dispatchEvent(errorEvent);
        return;
      }
      const data = { id: this.id, password: this.pw, check: this.autocheck };
      this.$store.dispatch("LOGIN", data);
    },
    whalelogin() {
      this.whaleloginflag = true;
      sessionStorage.clear();
      deleteCookie("info2");

      this.waitevent = setInterval(async () => {
        const isAgree = sessionStorage.getItem("isAgree");
        const firstLogin = sessionStorage.getItem("firstLogin");
        const temp = sessionStorage.getItem("temp");

        if (!firstLogin) {
          return;
        } else {
          clearInterval(this.waitevent);

          this.whaleagree = true;
        }

        if (firstLogin === "true") {
          this.newaccountflag = true;
          this.whalecancel();

          return;
        } else if (firstLogin === "temp") {
          if (isAgree === "false") {
            this.whalecancel();

            this.token = sessionStorage.getItem("temp");
            this.settingflag = false;

            return;
          }

          const result = await axios
            .get(`${process.env.VUE_APP_CONNECT}/users`, {
              credentials: true,
              headers: {
                Authorization: sessionStorage.getItem("temp"),
              },
            })
            .catch((err) => {});

          this.userinfo = result.data.data;

          this.accountlevel = this.userinfo.schoolLevel;

          this.whalecancel();

          this.settingflag = true;

          return;
        } else {
          if (isAgree === "false") {
            this.whaleagree = true;

            this.whalecancel();

            this.token = sessionStorage.getItem("temp");
            this.settingflag = false;

            return;
          } else {
            if (this.autocheck) {
              saveCookie("info", temp);
            } else {
              nonSaveCookie("info", temp);
            }

            deleteCookie("info2");
            this.$store.state.token = temp;

            this.$router.replace({ path: "/learning/status" });
          }
        }
      }, 300);
    },
    whalecancel() {
      this.whaleloginflag = false;
    },
    async codecheck() {
      if (this.codefinish === true) {
        return;
      }

      const data = {
        code: this.whalecode.trim(),
      };

      const result = await axios
        .post(`${process.env.VUE_APP_CONNECT}/users/code/signup`, data, {
          credentials: true,
          headers: {
            Authorization: sessionStorage.getItem("temp"),
          },
        })
        .catch((err) => {});

      const res = result.data.data;

      if (res === -1) {
        this.codeerror2 = false;
        this.codeerror = true;
      } else if (res === -101) {
        this.codeerror = false;
        this.codeerror2 = true;
      } else if (res === "student") {
        this.codeerror2 = false;
        this.codeerror = true;
      } else {
        this.codeerror = false;
        this.codeerror2 = false;
        this.accountlevel = res;
        this.codefinish = true;

        const result = await axios
          .get(`${process.env.VUE_APP_CONNECT}/users`, {
            credentials: true,
            headers: {
              Authorization: getSaveCookie("info2"),
            },
          })
          .catch((err) => {});

        this.userinfo = result.data.data;

        this.schoolName = this.userinfo.schoolName;

        this.accountleveltext(this.accountlevel);
      }
    },
    async codesignup() {
      if (this.accountlevel === "") {
        return;
      } else {
        // 가입 성공 모달
        // 개인 정보 동의 검사

        const res2 = await axios.post(
          `${process.env.VUE_APP_CONNECT}/users/code/levelup`,
          {
            level: this.accountlevel,
          },
          {
            credentials: true,
            headers: {
              Authorization: getSaveCookie("info2"),
            },
          }
        );

        const id = this.userinfo.id;

        const res = await axios.post(
          `${process.env.VUE_APP_CONNECT}/users/token/whale/lms/refresh`,
          {
            id,
          },
          {
            credentials: true,
            headers: {
              Authorization: getSaveCookie("info2"),
            },
          }
        );

        const { token, isAgree } = res.data.data;

        saveCookie("info2", token);

        if (!isAgree) {
          // 동의 페이지로 이동
          this.token = token;
          this.settingflag = false;
          this.whaleagree = true;

          // 동의 완료 이후 학교 세팅 페이지로 이동해야함.

          return;
        } else {
          this.token = "";
          this.settingflag = true;
          // let schoolLevel = this.userinfo.schoolLevel;

          // if (schoolLevel === "lms") {
          //   schoolLevel = "teacher";
          // }

          // const res3 = await axios.get(
          //   `${process.env.VUE_APP_CONNECT}/lms/get/step/${schoolLevel}`,
          //   {
          //     credentials: true,
          //     headers: {
          //       Authorization: token,
          //     },
          //   }
          // );

          // let restrict = 0;

          // if (schoolLevel === "master") {
          //   restrict = 6;
          // } else if (schoolLevel === "eng") {
          //   restrict = 3;
          // } else {
          //   restrict = 2;
          // }

          // const level = res3.data.data;
          // if (!level) {
          //   this.settingflag = true;
          // } else {
          //   if (level < restrict) {
          //     this.settingflag = true;
          //   }
          // }

          return;
        }
      }
    },
    async csclogin() {
      try {
        const res_1 = await maintenance();
        if (res_1.data.data === true) {
          let errorEvent = new CustomEvent("error", {
            detail: {
              status: true,
              text: ["서버 점검중입니다."],
            },
          });

          window.dispatchEvent(errorEvent);
          return;
        } else {
          window.location.href = `https://coolauth.coolschool.co.kr/realms/coolschool/protocol/openid-connect/auth?response_type=code&client_id=argong&schoolCode=7430240&redirect_uri=${process.env.VUE_APP_CONNECT}/users/auth/coolschool`;
          return;
        }
      } catch {
        let errorEvent = new CustomEvent("error", {
          detail: {
            status: true,
            text: ["서버 점검중입니다."],
            close: true,
          },
        });

        window.dispatchEvent(errorEvent);
        return;
      }
    },
    csccancel() {
      this.cscloginflag = false;
      return;
    },
    async accountleveltext(level) {
      if (!level) {
        this.accountsignuptext = "";
        return;
      }

      if (level === "master") {
        this.accountsignuptext = "Master 권한을 가진 선생님입니다.";
        return;
      }

      if (level === "eng") {
        this.accountsignuptext = "여러 학급을 담당하는 영어교사입니다.";
        return;
      }

      if (level === "lms") {
        const grade = this.userinfo.grade;
        const classNum = this.userinfo.classNum;

        this.accountsignuptext = `${grade}학년 ${classNum}반 담임교사님`;
        return;
      }
    },
    chathesslogin() {
      window.location.href = `${process.env.VUE_APP_CONNECT}/users/chathess/lms`;
    },
  },
};
</script>

<style scoped>
.maindiv {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/image/Bg_01.png");
  background-size: cover;
  font-family: notosans;
  overflow-x: hidden;
  overflow-y: hidden;
}

.maindiv2 {
  background-image: none;
  width: auto;
  height: auto;
}

.logindiv {
  width: 1100px;
  height: 650px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  border-left: 3px solid rgba(90, 90, 90, 0.3);
  border-right: 3px solid rgba(90, 90, 90, 0.3);
  border-bottom: 10px solid rgba(90, 90, 90, 0.3);
  zoom: 0.85;
}

.loginimage_ko {
  float: left;
  width: 50%;
  height: 100%;
  background-image: url("../../assets/image/loginback_ko.png");
}

.loginimage_vt {
  float: left;
  width: 50%;
  height: 100%;
  background-image: url("../../assets/image/loginback_vt.png");
}

.logincontainer {
  float: left;
  width: 50%;
  height: 100%;
  background-color: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.inputstyle {
  border: 1px solid #3d90ef;
  outline: none;
  border-radius: 20px;
  width: 400px;
  height: 50px;
  padding: 25px;
  font-family: notosansmedium;
  margin-top: 8px;
}

input[type="checkbox"] {
  width: 25px;
  height: 25px;
  background-color: #9a9a9a;
}

.agreediv {
  width: 400px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-30%, -50%);
}

.whaleicon {
  background-image: url("../../assets/image/whaleicon.png");
  background-size: 100%;
  width: 30px;
  height: 30px;
  float: left;
}

.cscicon {
  background-image: url("../../assets/image/csc.png");
  background-size: 100%;
  width: 30px;
  height: 30px;
  float: left;
}

.whaleloginbtn {
  margin-top: 15px;
  width: 190px;
  height: 45px;
  border: 1px solid #292929;
  border-radius: 30px;
  cursor: pointer;
  background-color: white;
}

.chathessloginbtn {
  margin-top: 10px;
  width: 190px;
  height: 45px;
  border: 1px solid #292929;
  border-radius: 30px;
  cursor: pointer;
  background-color: white;
}

.chathessicon {
  background-image: url("../../assets/image/chathesslogo.png");
  background-size: 100%;
  width: 30px;
  height: 30px;
  float: left;
}

.whaleloginbtn:hover {
  filter: brightness(0.8);
}

.chathessloginbtn:hover {
  filter: brightness(0.8);
}

.activate {
  background-color: #3480d8;
}

.inactivate {
  background-color: #d0e6ff;
}

.codedone {
  filter: brightness(0.8);
}
</style>