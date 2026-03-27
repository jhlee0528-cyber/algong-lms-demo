<template>
  <div
    style="
      width: 500px;
      height: 950px;
      background-color: white;
      font-family: notosans;
      border-radius: 10px;
      margin-top: 50px;
      margin-bottom: 50px;
    "
  >
    <div style="margin-top: 30px; margin-left: 30px">
      <p style="color: #3d90ef; font-size: 23px; font-family: notosans">
        개인정보 수집 및 이용 동의
      </p>
      <p style="font-family: notosansregular; font-size: 15px; margin-top: 8px">
        알공 서비스 이용에 필요한 정보를 제공하기 위해 본인 확인과
      </p>
      <p style="font-family: notosansregular; font-size: 15px; margin-top: 3px">
        개인정보 이용동의가 필요합니다.
      </p>
    </div>

    <div style="margin-left: 60px; margin-top: 50px">
      <v-row style="margin-top: 20px">
        <p style="font-family: notosans">이름</p>
      </v-row>
      <v-row>
        <div style="width: 390px; margin-top: 5px">
          <input
            v-show="authstatus == false"
            v-model="name"
            type="text"
            class="defaultinput nameinput"
            placeholder="실명 입력"
          />
          <input
            v-show="authstatus == true || isauthed == true"
            disabled
            v-model="name"
            type="text"
            class="defaultinput nameinput noselect"
            placeholder="실명 입력"
          />
        </div>
      </v-row>
      <v-row style="margin-top: 42px; position: absolute">
        <div style="height: 1px">
          <p
            v-show="nameerror == true"
            style="
              font-family: notosansregular;
              margin-top: -30px;
              font-size: 13px;
              color: red;
              margin-left: 10px;
            "
          >
            이름을 입력해주세요
          </p>
        </div>
      </v-row>
      <v-row style="margin-top: 45px">
        <p style="font-family: notosans">휴대전화</p>
      </v-row>
      <v-row style="margin-top: 15px">
        <div style="width: 250px; margin-top: 5px">
          <!-- <v-text-field
            style="font-family: notosanslight; font-weight: bold"
            v-show="authstatus == false"
            v-model="phonenum"
            placeholder="핸드폰 번호 입력"
            outlined
          ></v-text-field>
          <v-text-field
            style="font-family: notosanslight; font-weight: bold"
            disabled
            v-show="authstatus == true || isauthed == true"
            readonly
            v-model="phonenum"
            placeholder="핸드폰 번호 입력"
          ></v-text-field> -->
          <input
            placeholder="핸드폰 번호 입력"
            v-model="phonenum"
            class="defaultinput"
            v-show="authstatus == false"
            type="text"
          />
          <input
            disabled
            placeholder="핸드폰 번호 입력"
            v-model="phonenum"
            class="defaultinput noselect"
            v-show="authstatus == true || isauthed == true"
            type="text"
          />
        </div>
        <div style="margin-left: 10px; margin-top: 5px">
          <v-btn
            v-show="isauthed == false"
            @click="sendauthnum()"
            width="130px"
            height="50px"
            variant="outlined"
            id="authbtn"
            >인증번호 받기</v-btn
          >
          <v-btn
            disabled
            v-show="isauthed == true"
            @click="sendauthnum()"
            width="130px"
            height="50px"
            variant="outlined"
            id="authdisabledbtn"
            >인증번호 받기</v-btn
          >
        </div>
      </v-row>
      <v-row style="position: absolute; margin-top: 42px">
        <div
          style="height: 3px; font-family: notosansregular; margin-left: 10px"
        >
          <p
            v-show="phoneerror == true"
            style="margin-top: -30px; font-size: 13px; color: red"
          >
            핸드폰 번호를 입력해주세요
          </p>
          <p
            v-show="
              phoneerror == false && authstatus == true && isauthed == false
            "
            style="margin-top: -30px; font-size: 13px; color: rgb(20, 158, 236)"
          >
            인증번호가 오지 않으면 다시 요청해주세요!
          </p>
        </div>
      </v-row>
      <v-row>
        <div style="width: 250px; margin-top: 30px">
          <!-- <v-text-field
            v-show="isauthed == false"
            style="font-family: notosanslight; font-weight: bold"
            v-model="authnum"
            placeholder="인증번호 입력"
            outlined
          ></v-text-field>
          <v-text-field
            disabled
            v-show="isauthed == true"
            style="font-family: notosanslight; font-weight: bold"
            v-model="authnum"
            placeholder="인증번호 입력"
            outlined
          ></v-text-field> -->
          <input
            placeholder="인증번호 입력"
            v-model="authnum"
            class="defaultinput"
            v-show="isauthed == false"
            type="text"
          />
          <input
            disabled
            placeholder="인증번호 입력"
            v-model="authnum"
            class="defaultinput noselect"
            v-show="isauthed == true"
            type="text"
          />
        </div>
        <div style="margin-top: 30px; margin-left: 10px">
          <v-btn
            v-show="isauthed == false"
            @click="checkauthnum()"
            width="130px"
            height="50px"
            variant="outlined"
            id="authbtn"
            >확인</v-btn
          >
          <v-btn
            disabled
            v-show="isauthed == true"
            @click="checkauthnum()"
            width="130px"
            height="50px"
            variant="outlined"
            id="authdisabledbtn"
            >확인</v-btn
          >
        </div>
      </v-row>
      <v-row style="position: absolute">
        <div
          style="
            height: 20px;
            margin-top: 28px;
            margin-left: 10px;
            font-family: notosansregular;
          "
        >
          <p
            v-show="
              issend == true &&
              $store.state.iswrong == false &&
              $store.state.isagree == false &&
              TimerStr != '00:00'
            "
            style="margin-top: -25px; font-size: 14px; color: rgb(20, 158, 236)"
          >
            인증번호 유효시간 : {{ TimerStr }}
          </p>
          <p
            v-show="
              issend == true &&
              $store.state.iswrong == true &&
              $store.state.isagree == false &&
              TimerStr != '00:00'
            "
            style="margin-top: -25px; font-size: 14px; color: red"
          >
            인증번호를 다시 입력해주세요 : ({{ TimerStr }})
          </p>
          <p
            v-show="$store.state.isagree == true"
            style="margin-top: -25px; font-size: 14px; color: rgb(20, 158, 236)"
          >
            인증이 완료되었습니다.
          </p>
          <p
            v-show="authstatus == false && TimerStr == '00:00'"
            style="margin-top: -25px; font-size: 14px; color: red"
          >
            인증시간이 만료되었습니다.
          </p>
        </div>
      </v-row>
      <v-row style="margin-top: 40px">
        <p style="font-family: notosans">이메일</p>
      </v-row>
      <v-row style="margin-top: 25px">
        <input
          placeholder="이메일 입력"
          v-model="email"
          class="defaultinput2"
          type="text"
        />
      </v-row>
      <v-row style="margin-top: 50px">
        <p style="font-family: notosans">개인정보수집 및 이용 동의서</p>
      </v-row>
      <v-row style="margin-top: 15px">
        <div
          style="
            width: 390px;
            height: 170px;
            font-size: 14px;
            border: 1px solid #636363;
            margin-top: 5px;
            border-radius: 15px;
          "
        >
          <div style="padding: 10px; font-family: notosansregular">
            <p style="padding: 5px">
              1. 수집 목적 : 본인 여부 확인, 공지사항 전달
            </p>
            <p style="padding: 5px">2. 수집 항목 : 학교명, 이름, 전화번호</p>
            <p style="padding: 5px">3. 보유 기간 : 회원 탈퇴시까지</p>
            <p style="font-size: 13px; padding: 5px">
              · 개인정보 수집 및 이용에 거부할 권리가 있습니다. 필수 수집 항목에
              대한 동의를 하지 않는 경우 서비스 이용이 제한 될 수 있습니다.
            </p>
          </div>
        </div>
      </v-row>
      <v-row style="margin-top: 30px">
        <div>
          <input v-model="ischecked" type="checkbox" />
        </div>
        <p
          style="
            margin-top: -1.5px;
            margin-left: 9px;
            font-size: 14px;
            font-family: notosansregular;
          "
        >
          (필수) 개인정보수집 및 이용에 동의합니다.
        </p>
      </v-row>
      <v-row style="margin-top: 40px">
        <v-btn
          @click="complete()"
          variant="outlined"
          height="50"
          style="
            background-color: #3d90ef;
            color: white;
            font-size: 15px;
            font-family: notosansregular;
            border-radius: 15px;
          "
          width="390"
          >확인</v-btn
        >
      </v-row>
      <v-dialog width="400" height="250" v-model="modal">
        <v-card
          style="font-family: notosans; overflow: hidden"
          width="400"
          height="250"
        >
          <header>
            <v-card-title
              style="background-color: rgb(20, 158, 236); color: white"
              >메시지</v-card-title
            >
          </header>
          <v-row justify="center">
            <div
              style="
                width: 270px;
                height: 100px;
                text-align: center;
                font-size: 20px;
                margin-top: 15px;
              "
            >
              <p style="margin-top: 35px">{{ modal_msg }}</p>
            </div>
          </v-row>
          <v-row justify="center">
            <v-btn
              @click="modaloff()"
              style="margin-top: 20px"
              width="250"
              height="40"
              id="authbtn"
              >확인</v-btn
            >
          </v-row>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { nonSaveCookie, saveCookie } from "../../store/cookie";

export default {
  props: {
    token: {
      required: true,
    },
    whale: {
      required: true,
    },
  },
  data() {
    return {
      name: "",
      phonenum: "",
      authnum: "",
      isauthed: false,
      authstatus: false,
      ischecked: false,
      issend: false,
      iswrong: false,
      Timer: null,
      timeCnt: 121,
      TimerStr: "02:00",
      modal: false,
      modal_msg: "",
      nameerror: false,
      phoneerror: false,
      email: "",
    };
  },
  mounted() {
    if (this.timeCnt == 0) {
      this.authstatus = false;
    }
  },
  methods: {
    sendauthnum() {
      if (this.name == "") {
        this.nameerror = true;
        this.phoneerror = false;
        return;
      }
      if (this.phonenum == "") {
        this.nameerror = false;
        this.phoneerror = true;
        return;
      }
      if (this.name == "" && this.phonenum == "") {
        this.nameerror = true;
        this.phoneerror = true;
        return;
      }

      const regphone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      if (!regphone.test(this.phonenum)) {
        this.phoneerror = true;
        return;
      }

      this.nameerror = false;
      this.phoneerror = false;
      const data = { phonenum: this.phonenum };
      this.$store.dispatch("SEND_MSG", { data, token: this.token });

      //타이머
      this.authstatus = true;
      this.issend = true;
      clearInterval(this.Timer);
      this.Timer = null;
      this.Timer = this.timerStart();

      //인증관련 문자열
      return;
    },
    async checkauthnum() {
      if (this.authstatus == false) {
        return;
      }

      const data = {
        name: this.name,
        phonenum: this.phonenum,
        authnum: this.authnum,
      };

      const token = this.token;

      this.isauthed = await this.$store.dispatch("CHECK_MSG", {
        data,
        token,
      });
    },
    agreeok() {},
    timerStart() {
      this.TimerStr = "02:00";
      this.timeCnt = 120;
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
      this.authstatus = false;
      // const info = { phonenum: this.phonenum };
      // this.$store.dispatch("INIT_AUTH", info);
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
    modaloff() {
      this.modal = false;
      this.modal_msg = "";
    },
    async complete() {
      if (this.isauthed == false) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: ["먼저 인증을 진행해주세요!"],
            },
          })
        );

        return;
      }

      if (this.ischecked == false) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: ["개인정보 수집 및 이용 동의 후 확인 버튼을 눌러주세요"],
            },
          })
        );

        // this.modal_msg = "개인정보수집 및 이용 동의 후 확인 버튼을 눌러주세요";
        // this.modal = true;
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.email)) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: ["이메일 형식에 맞게 입력해주세요"],
            },
          })
        );

        return;
      }

      this.$store.state.loading = true;

      const res3 = await axios.post(
        `${process.env.VUE_APP_CONNECT}/mail/agreement/complete`,
        {
          email: this.email,
        },
        {
          credentials: true,
          headers: {
            Authorization: this.token,
          },
        }
      );

      if (!res3.data.data) {
        this.$store.state.loading = false;

        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: ["에러가 발생하였습니다."],
            },
          })
        );

        return;
      }

      if (this.whale === true) {
        // 무조건 학교 세팅 페이지로 이동하도록 설정
        window.dispatchEvent(
          new CustomEvent("goschoolsetting", { detail: true })
        );

        this.$store.state.loading = false;
        return;
      } else {
        this.$store.state.loading = false;

        window.dispatchEvent(
          new CustomEvent("gologin", {
            detail: {
              status: true,
            },
          })
        );
      }
    },
  },
};
</script>

<style>
#authbtn {
  background-color: #3d90ef;
  color: white;
  font-family: notosansregular;
  margin-left: 10px;
  font-size: 13px;
  border-radius: 30px;
}

#authdisabledbtn {
  background-color: rgb(220, 220, 220);
  color: gray;
  font-family: notosansregular;
  margin-left: 10px;
  border-radius: 30px;
  font-size: 13px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.defaultinput {
  font-family: notosansregular;
  border: 1px solid #a9a9a9;
  width: 250px;
  height: 50px;
  border-radius: 30px;
  font-size: 14px;
  padding: 5px;
  padding-left: 15px;
  outline: none;
}

.defaultinput2 {
  font-family: notosansregular;
  border: 1px solid #a9a9a9;
  width: 400px;
  height: 50px;
  border-radius: 30px;
  font-size: 14px;
  padding: 5px;
  padding-left: 15px;
  outline: none;
}

.defaultinput:disabled {
  background-color: rgb(240, 240, 240);
}

.nameinput {
  width: 390px;
}

.defaultinput:focus {
  border: 1px solid #3480d8;
}

.defaultinput2:focus {
  border: 1px solid #3480d8;
}
</style>