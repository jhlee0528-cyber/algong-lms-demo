<template>
  <div>
    <v-row style="margin-top: 50px" justify="center">
      <p style="font-family: notosansblack; font-size: 32px">
        {{ userinfo.schoolName }}초등학교 {{ userinfo.name }} 선생님
      </p>
    </v-row>
    <v-row style="margin-top: 20px" justify="center">
      <p style="color: #66686b; font-size: 16px; font-family: notosansregular">
        절차에 따라 계정 세팅을 진행해주세요. 1~2분 정도 소요됩니다.
      </p>
    </v-row>
    <v-row style="margin-top: 60px" justify="center">
      <teacherStatus :level="level"></teacherStatus>
    </v-row>
    <v-row justify="center" style="margin-top: 90px">
      <!-- Level 1 -->
      <div v-show="level === 1" class="maindiv" style="overflow-y: scroll">
        <div
          style="
            padding: 30px;
            position: absolute;
            background-color: white;
            width: 1480px;
            border-radius: 15px;
          "
        >
          <p class="leftleft" style="font-size: 25px; font-family: notosans">
            교사 알공 계정 생성
          </p>
          <div
            style="
              float: left;
              margin-left: 15px;
              margin-top: 8px;
              font-family: notosansregular;
            "
          >
            <p>교사 알공 계정을 아래와 같이 발급합니다.</p>
          </div>
          <div style="float: left; margin-left: 780px; background-color: white">
            <v-btn
              @click="modalon()"
              style="position: absolute; float: left; color: white"
              class="btnstyle1"
              width="110"
              height="40"
              variant="outlined"
            >
              발급
            </v-btn>
          </div>
        </div>
        <div style="margin-top: 140px">
          <table
            style="
              width: 1300px;
              text-align: center;
              font-family: notosansregular;
              margin-left: 100px;
              border-radius: 15px;
              border-spacing: 0;
              border-bottom: 1px solid #cae3ff;
            "
          >
            <tr>
              <td class="tabletd" style="border-top-left-radius: 15px">구분</td>
              <td class="tabletd">이름</td>
              <td class="tabletd">담당 학급</td>
              <td class="tabletd">교사용 알공 계정</td>
              <td
                class="tabletd"
                style="
                  border-top-right-radius: 15px;
                  border-right: 1px solid #cae3ff;
                "
              >
                초기 비밀번호
              </td>
            </tr>
            <tr>
              <td class="tabletd2">담임 교사</td>
              <td class="tabletd2">{{ userinfo.name }}</td>
              <td class="tabletd2">
                {{ userinfo.grade }}학년 {{ userinfo.classNum }}반
              </td>
              <td class="tabletd2">
                {{ idmaker(userinfo.grade, userinfo.classNum) }}
              </td>
              <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                000000
              </td>
            </tr>
          </table>
          <div
            style="
              width: 1300px;
              height: 1px;
              border-bottom: 1px solid #cae3ff;
              margin-left: 100px;
            "
          ></div>
        </div>
      </div>

      <!-- Level 2 -->
      <div v-show="level === 2" class="maindiv" style="overflow-y: scroll">
        <div
          style="
            padding: 30px;
            position: absolute;
            background-color: white;
            width: 1480px;
            border-radius: 15px;
          "
        >
          <p class="leftleft" style="font-size: 25px; font-family: notosans">
            학생 가입 안내 확인
          </p>
          <div
            style="
              float: left;
              margin-left: 15px;
              margin-top: 8px;
              font-family: notosansregular;
            "
          >
            <p>
              반별 학생
              <b style="color: #3480d8">알공 가입코드를 학생들에게 안내</b
              >해주세요. 아래 코드는
              <b style="color: #3480d8"
                >LMS 페이지에서도 다시 확인이 가능합니다.</b
              >
            </p>
          </div>
          <div
            style="
              float: left;
              margin-left: 1050px;
              margin-top: -30px;
              background-color: white;
            "
          >
            <v-btn
              @click="levelok()"
              style="position: absolute; float: left; color: white"
              class="btnstyle1"
              width="110"
              height="40"
              variant="outlined"
            >
              확인
            </v-btn>
          </div>
        </div>
        <div style="margin-top: 140px; margin-left: 100px">
          <div class="vectorcontainer">
            <div style="margin-top: 30px">
              <p style="color: #3480d8; font-family: notosans; font-size: 21px">
                알공 접속
              </p>
              <div style="margin-top: 15px; font-family: notosansregular">
                <p>웹버전 또는 앱버전 접속</p>
              </div>
            </div>
          </div>
          <div class="vector"></div>
          <div class="vectorcontainer">
            <div style="margin-top: 30px">
              <p style="color: #3480d8; font-family: notosans; font-size: 21px">
                SSO 로그인
              </p>
              <div style="margin-top: 15px; font-family: notosansregular">
                <p>현재는 whale만 가능</p>
              </div>
            </div>
          </div>
          <div class="vector"></div>
          <div class="vectorcontainer">
            <div style="margin-top: 30px">
              <p style="color: #3480d8; font-family: notosans; font-size: 21px">
                알공 회원 가입
              </p>
              <div style="margin-top: 15px; font-family: notosansregular">
                <p>반별 학생 코드 입력 필요</p>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 350px">
          <table
            style="
              width: 1300px;
              text-align: center;
              font-family: notosansregular;
              margin-left: 100px;
              border-radius: 15px;
              border-spacing: 0;
              border-bottom: 1px solid #cae3ff;
            "
          >
            <tr>
              <td class="tabletd" style="border-top-left-radius: 15px">구분</td>
              <td class="tabletd">학급</td>
              <td
                class="tabletd"
                style="
                  border-top-right-radius: 15px;
                  border-right: 1px solid #cae3ff;
                "
              >
                알공 가입코드
              </td>
            </tr>
            <tr v-for="(j, i) in studentCode" :key="i">
              <td class="tabletd2">학생</td>
              <td class="tabletd2">{{ j.grade }}학년 {{ j.classNum }}반</td>
              <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                {{ j.code }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </v-row>
    <v-row>
      <div style="height: 300px; width: 300px"></div>
    </v-row>
    <v-dialog width="450" v-model="checkmodal" persistent>
      <div
        style="
          width: 450px;
          height: 300px;
          background-color: white;
          text-align: center;
          border-radius: 15px;
        "
      >
        <p style="font-family: notosans; font-size: 25px; margin-top: 25px">
          {{ modaltext[level - 1].title }}
        </p>

        <div style="margin-top: 60px">
          <p
            v-for="(j, i) in modaltext[level - 1].content.length"
            :key="i"
            style="font-family: notosansregular; font-size: 19px"
            :class="{
              red: level === 1 && i === 0,
            }"
          >
            {{ modaltext[level - 1].content[i] }}
          </p>
        </div>

        <div style="margin-top: 50px; position: absolute; margin-left: 60px">
          <v-btn
            @click="
              {
                checkmodal = false;
              }
            "
            width="150"
            height="45"
            variant="outlined"
            style="
              border: 1px solid #636363;
              border-radius: 10px;
              font-size: 18px;
            "
            >취소</v-btn
          >
          <v-btn
            @click="levelok()"
            width="150"
            height="45"
            variant="outlined"
            style="
              margin-left: 30px;
              border: none;
              background-color: #258bff;
              color: white;
              border-radius: 10px;
              font-size: 18px;
            "
            >확인</v-btn
          >
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import teacherStatus from "./status/teacherStatus.vue";
import axios from "axios";
import { deleteCookie, getSaveCookie, nonSaveCookie } from "../../store/cookie";

export default {
  async created() {
    const schoolCode = this.userinfo.schoolCode;

    const res3 = await axios.get(
      `${process.env.VUE_APP_CONNECT}/lms/get/code/student/${schoolCode}`,
      {
        credentials: true,
        headers: {
          Authorization: getSaveCookie("info2"),
        },
      }
    );

    const data = res3.data.data;

    const data2 = data[`${this.userinfo.grade}`].filter(
      (item) => item.classNumber === this.userinfo.classNum
    );

    const data3 = [
      {
        grade: this.userinfo.grade,
        classNum: this.userinfo.classNum,
        code: data2[0].code,
      },
    ];

    this.studentCode = data3;
  },
  data() {
    return {
      level: parseInt(sessionStorage.getItem("masterlevel")),
      checkmodal: false,
      modaltext: [
        {
          title: "교사 알공 계정 발급",
          content: ["1개의 교사용 알공 계정을 발급합니다."],
        },
        {
          title: "",
          content: [""],
        },
      ],
      studentCode: "",
    };
  },
  components: {
    teacherStatus,
  },
  props: {
    userinfo: {
      required: true,
    },
  },
  methods: {
    modalon() {
      this.checkmodal = true;
    },
    async levelok() {
      this.checkmodal = false;
      if (this.level === 1) {
        // 교사 계정 발급
        const res = await this.createAccount();
        if (!res) {
          // 에러

          window.dispatchEvent(
            new CustomEvent("error", {
              detail: {
                status: true,
                text: ["에러가 발생하였습니다.", "다시 시도해주세요."],
              },
            })
          );
          return;
        } else {
          this.level = 2;
        }
      } else if (this.level === 2) {
        this.finish();
      } else {
        return;
      }
    },
    idmaker(grade, _classNum) {
      if (!grade || !_classNum) {
        return "";
      }

      const schoolCode = this.userinfo.schoolCode;
      const classNum = _classNum.toString().padStart(2, "0");

      return `${schoolCode}24${grade}${classNum}99`;
    },
    async createAccount() {
      this.$store.state.loading = true;

      const res = await axios.post(
        `${process.env.VUE_APP_CONNECT}/lms/create/id/classList`,
        {
          type: "teacher",
        },
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );

      if (res.data.data) {
        this.$store.state.loading = false;
        return true;
      } else {
        this.$store.state.loading = false;
        return false;
      }
    },
    getStudentsCode(grade, classNum) {
      return this.studentCode[grade][classNum];
    },
    finish() {
      //로그인으로 ㄱㄱ
      const token = getSaveCookie("info2");
      nonSaveCookie("info", token);
      deleteCookie("info2");
      this.$store.state.token = token;

      sessionStorage.clear();

      this.$router.replace({ path: "/learning/status" });
    },
  },
};
</script>

<style scoped>
.maindiv {
  width: 1500px;
  height: 800px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #cae3ff;
}

.tabletd {
  padding: 15px;
  border: 1px solid #cae3ff;
  font-family: notosans;
  font-size: 14px;
  color: #636363;
  border-right: none;
  border-bottom: none;
  background-color: #f1f8ff;
}

.tabletd2 {
  padding: 20px;
  border: 1px solid #cae3ff;
  font-family: notosansregular;
  font-size: 14px;
  border-right: none;
  border-bottom: none;
}

.leftleft {
  float: left;
}

.btnstyle1 {
  float: left;
  margin-left: 60px;
  background-color: #258bff;
  font-family: notosansregular;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  border: none;
}

.level1element {
  width: 320px;
  height: 600px;
  background-color: #f3f9ff;
  margin-top: 70px;
  margin-left: 30px;
  border-radius: 25px;
  float: left;
}

.classnoselect {
  border: 1px solid #cbcbcb;
}

.classselect {
  border: 1px solid #258bff;
  color: #258bff;
}

.maxup {
  background-image: url("../../assets/image/maxup.png");
  background-size: 100%;
  width: 30px;
  height: 30px;
  float: left;
  margin-top: 12px;
  margin-left: 20px;
  cursor: pointer;
}

.maindiv::-webkit-scrollbar {
  width: 10px;
}

.maindiv::-webkit-scrollbar-thumb {
  background-color: #cae3ff;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.vector {
  background-image: url("../../assets/image/vectorrr.png");
  background-size: 100%;
  width: 20px;
  height: 50px;
  float: left;
  margin-top: 65px;
  margin-left: 30px;
  margin-right: 30px;
}

.vectorcontainer {
  width: 210px;
  height: 150px;
  border: 1px solid #cae3ff;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  float: left;
}
</style>