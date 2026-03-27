<template>
  <v-row style="margin-top: 50px" justify="center">
    <p style="font-family: notosansblack; font-size: 32px">
      {{ userinfo.schoolName }}초등학교 영어 선생님
    </p>
  </v-row>
  <v-row style="margin-top: 20px" justify="center">
    <p style="color: #66686b; font-size: 16px; font-family: notosansregular">
      절차에 따라 계정 세팅을 진행해주세요. 1~2분 정도 소요됩니다.
    </p>
  </v-row>
  <v-row style="margin-top: 60px" justify="center">
    <engStatus :level="level"></engStatus>
  </v-row>
  <v-row justify="center" style="margin-top: 90px">
    <!-- Level 1 -->
    <div v-show="level === 1" class="maindiv">
      <div style="padding: 30px; position: absolute">
        <p class="leftleft" style="font-size: 25px; font-family: notosans">
          담당 학급 선택
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
            LMS에서 관리할 반을
            <b style="color: #3480d8; text-decoration: underline">모두 선택</b
            >해주세요. 각 <b style="color: #3480d8">반마다 1명의 영어교사</b>만
            배정이 가능합니다.
          </p>
        </div>
        <div style="float: left; margin-left: 270px">
          <p
            style="
              float: left;
              font-family: notosans;
              font-size: 23px;
              margin-top: 3px;
            "
          >
            <b style="color: #3480d8">{{ userinfo.name }}</b> 선생님 담당 학급 :
            {{ getClassChargeCount() }}개
          </p>
          <v-btn
            @click="modalon()"
            style="position: absolute; float: left; color: white"
            class="btnstyle1"
            width="110"
            height="40"
            variant="outlined"
          >
            선택 완료
          </v-btn>
        </div>
      </div>
      <div style="margin-top: 50px; margin-left: 40px">
        <div v-for="(j, i) in 4" :key="i" class="level1element">
          <p
            style="
              color: #3480d8;
              font-size: 19px;
              margin-left: 20px;
              margin-top: 20px;
              font-family: notosans;
            "
          >
            {{ i + 3 }}학년
          </p>

          <div
            style="
              margin-top: 30px;
              margin-left: 20px;
              width: 280px;
              height: 350px;
              border-radius: 15px;
              background-color: white;
            "
          >
            <div style="padding-left: 15px; padding-top: 15px">
              <p
                style="
                  float: left;
                  font-family: notosans;
                  font-size: 18px;
                  margin-top: -3px;
                "
              >
                반 선택 : {{ classInfo[`grade${i + 3}`]["classList"].length }}
              </p>
              <div style="float: right; margin-right: 15px">
                <input
                  v-model="allselectflag[i]"
                  @click="allSelect(i + 3)"
                  style="float: left"
                  type="checkbox"
                />
                <p
                  style="
                    float: left;
                    margin-left: 5px;
                    font-family: notosans;
                    margin-top: -3px;
                  "
                >
                  전체 선택
                </p>
              </div>
            </div>
            <div style="margin-top: 30px">
              <div
                v-show="!restrict[`${i + 3}-${p}`]"
                style="
                  float: left;
                  margin-left: 10px;
                  margin-top: 30px;
                  width: 55px;
                  height: 35px;
                  border-radius: 10px;
                  cursor: pointer;
                  font-size: 15px;
                  text-align: center;
                "
                class="noselect"
                v-for="(p, q) in targetClassList[i]"
                :key="q"
                :class="{
                  classnoselect:
                    !classInfo[`grade${i + 3}`]['classList'].includes(p),
                  classselect:
                    classInfo[`grade${i + 3}`]['classList'].includes(p),
                }"
                @click="
                  {
                    if (classInfo[`grade${i + 3}`]['classList'].includes(p)) {
                      for (
                        let j = 0;
                        j < classInfo[`grade${i + 3}`]['classList'].length;
                        j++
                      ) {
                        if (classInfo[`grade${i + 3}`]['classList'][j] === p) {
                          classInfo[`grade${i + 3}`]['classList'].splice(j, 1);
                        }
                      }
                    } else {
                      classInfo[`grade${i + 3}`]['classList'].push(p);
                    }
                  }
                "
              >
                <p style="padding: 5px; padding-top: 6px">
                  {{ i + 3 }} - {{ p }}
                </p>
                <p
                  v-if="classInfo[`grade${i + 3}`]['classList'].includes(p)"
                  style="font-size: 12px"
                >
                  {{ userinfo.name }}
                </p>
              </div>
              <div
                v-show="restrict[`${i + 3}-${p}`]"
                style="
                  float: left;
                  margin-left: 10px;
                  margin-top: 30px;
                  width: 55px;
                  height: 35px;
                  border-radius: 10px;
                  cursor: pointer;
                  font-size: 15px;
                  text-align: center;
                "
                class="noselect classalreadyselect"
                v-for="(p, q) in targetClassList[i]"
                :key="q"
              >
                <p style="padding: 5px; padding-top: 6px">
                  {{ i + 3 }} - {{ p }}
                </p>
                <p style="font-size: 12px">
                  {{ restrict[`${i + 3}-${p}`] }}
                </p>
              </div>
            </div>
            <div style="padding: 30px"></div>
          </div>
        </div>
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
            <td class="tabletd">담당 학급 ({{ getClassChargeCount() }}개)</td>
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
          <tr v-for="(j, i) in classArr" :key="i">
            <td class="tabletd2">영어 교사</td>
            <td class="tabletd2">{{ userinfo.name }}</td>
            <td class="tabletd2">{{ j.grade }}학년 {{ j.classNum }}반</td>
            <td class="tabletd2">{{ idmaker(j.grade, j.classNum) }}</td>
            <td class="tabletd2" style="border-right: 1px solid #cae3ff">
              000000
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Level 3 -->
    <div v-show="level === 3" class="maindiv" style="overflow-y: scroll">
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
          <tr v-for="(j, i) in classArr" :key="i">
            <td class="tabletd2">학생</td>
            <td class="tabletd2">{{ j.grade }}학년 {{ j.classNum }}반</td>
            <td class="tabletd2" style="border-right: 1px solid #cae3ff">
              {{ getStudentsCode(j.grade, j.classNum) }}
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
        {{ modaltext[level - 1]["title"] }}
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
</template>

<script>
import engStatus from "./status/engTeacherStatus.vue";
import axios from "axios";
import { deleteCookie, getSaveCookie, nonSaveCookie } from "../../store/cookie";

export default {
  async created() {
    const schoolCode = this.userinfo.schoolCode;

    // 마스터가 생성한 학급 리스트 얻기
    const res = await axios.get(
      `${process.env.VUE_APP_CONNECT}/lms/get/sso/class/list/${schoolCode}`,
      {
        credentials: true,
        headers: {
          Authorization: getSaveCookie("info2"),
        },
      }
    );

    // 이미 담당중인 학급 정보 얻기
    const res2 = await axios.get(
      `${process.env.VUE_APP_CONNECT}/lms/get/sso/class/charge/${schoolCode}`,
      {
        credentials: true,
        headers: {
          Authorization: getSaveCookie("info2"),
        },
      }
    );

    const data = res.data.data;
    const data2 = res2.data.data;

    let list = [];
    for (let i = 0; i < 4; i++) {
      const target = data.filter((item) => item.grade === i + 3);

      let temp = [];
      for (let j = 0; j < target.length; j++) {
        temp.push(target[j].classNum);
      }

      list.push(temp);
    }

    this.targetClassList = list;

    this.restrict = data2;

    for (let i = 0; i < 4; i++) {
      this.classInfo[`grade${i + 3}`].max = data.filter(
        (item) => item.grade === i + 3
      ).length;
    }

    const res3 = await axios.get(
      `${process.env.VUE_APP_CONNECT}/lms/get/code/student/${this.userinfo.schoolCode}`,
      {
        credentials: true,
        headers: {
          Authorization: getSaveCookie("info2"),
        },
      }
    );

    const data3 = res3.data.data;

    let arr = [];
    for (let i = 3; i < 7; i++) {
      const target = data3[`${i}`];

      for (let j = 0; j < target.length; j++) {
        arr.push({
          grade: i,
          classNum: target[j].classNumber,
          code: target[j].code,
        });
      }
    }

    this.studentCode = arr;

    if (this.level === 2) {
      const res = await axios.get(`/lms/get/teacher/classlist`, {
        credentials: true,
      });

      const data = res.data.data;

      for (let i = 0; i < 4; i++) {
        const target = data[i];

        if (!target.length) {
          continue;
        } else {
          this.classInfo[`grade${i + 3}`].max = target.length;
          this.classInfo[`grade${i + 3}`].classList = target;
        }
      }

      this.makeClassInfo();
    }
  },
  data() {
    return {
      allselectflag: [false, false, false, false],
      level: parseInt(sessionStorage.getItem("masterlevel")),
      targetClassList: "",
      classInfo: {
        grade3: {
          publisher: "",
          classList: [],
          max: 0,
        },
        grade4: {
          publisher: "",
          classList: [],
          max: 0,
        },
        grade5: {
          publisher: "",
          classList: [],
          max: 0,
        },
        grade6: {
          publisher: "",
          classList: [],
          max: 0,
        },
      },
      restrict: "",
      classArr: [],
      checkmodal: false,
      modaltext: [
        {
          title: "담당 학급 확인",
          content: ["현재 선택된 학급의 '영어 담당 교사'를", ""],
        },
        {
          title: "교사 알공 계정 발급",
          content: [""],
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
    engStatus,
  },
  props: {
    userinfo: {
      required: true,
    },
  },
  methods: {
    modalon() {
      if (this.level === 1) {
        this.modaltext[0].content[1] = `'${this.userinfo.name}' 선생님으로 지정합니다.`;
        this.checkmodal = true;

        return;
      }

      if (this.level === 2) {
        this.modaltext[1].content[0] = `${this.classArr.length}개의 교사용 알공 계정을 발급합니다.`;
        this.checkmodal = true;

        return;
      }
    },
    async levelok() {
      this.checkmodal = false;
      if (this.level === 1) {
        const res = await this.updateClass();

        this.$store.state.loading = true;

        if (res === -1) {
          window.dispatchEvent(
            new CustomEvent("error", {
              detail: {
                status: true,
                text: ["이미 선택된 학급이 포함되어 있습니다."],
              },
            })
          );

          // 이미 담당중인 학급 정보 얻기
          const res2 = await axios.get(
            `${process.env.VUE_APP_CONNECT}/lms/get/sso/class/charge/${this.userinfo.schoolCode}`,
            {
              credentials: true,
              headers: {
                Authorization: getSaveCookie("info2"),
              },
            }
          );

          this.restrict = res2.data.data;
          this.$store.state.loading = false;

          return;
        }

        if (res) {
          this.makeClassInfo();
          this.$store.state.loading = false;
          this.level = 2;
        }
      } else if (this.level === 2) {
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
          this.level = 3;
        }
      } else if (this.level === 3) {
        this.finish();
      } else {
        return;
      }
    },
    levelcancel() {
      this.checkmodal = false;
    },
    getClassChargeCount() {
      const data = this.classInfo;

      let cnt = 0;

      for (let i = 0; i < 4; i++) {
        const target = data[`grade${i + 3}`]["classList"];
        cnt += target.length;
      }

      return cnt;
    },
    async updateClass() {
      const data = this.classInfo;

      let arr = [];

      for (let i = 0; i < 4; i++) {
        this.classInfo[`grade${i + 3}`]["classList"] =
          this.classInfo[`grade${i + 3}`]["classList"].sort();
      }

      for (let i = 3; i < 7; i++) {
        arr.push(data[`grade${i}`]["classList"]);
      }

      const res = await axios.post(
        `${process.env.VUE_APP_CONNECT}/lms/update/class/lms`,
        {
          classList: arr,
        },
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );

      return res.data.data;
    },
    allSelect(grade) {
      const max = this.classInfo[`grade${grade}`].max;

      const idx = grade - 3;

      if (this.classInfo[`grade${grade}`].classList.length < max) {
        this.classInfo[`grade${grade}`].classList = this.targetClassList[idx];
      } else {
        this.classInfo[`grade${grade}`].classList = [];
      }

      return;
    },
    makeClassInfo() {
      const data = this.classInfo;

      let arr = [];

      for (let i = 3; i < 7; i++) {
        const target = data[`grade${i}`]["classList"];

        for (let j = 0; j < target.length; j++) {
          arr.push({
            grade: i,
            classNum: target[j],
          });
        }
      }

      this.classArr = arr;
      return;
    },
    idmaker(grade, _classNum) {
      const schoolCode = this.userinfo.schoolCode;
      const classNum = _classNum.toString().padStart(2, "0");

      return `${schoolCode}24${grade}${classNum}00`;
    },
    async createAccount() {
      this.$store.state.loading = true;

      const res = await axios.post(
        `${process.env.VUE_APP_CONNECT}/lms/create/id/classList`,
        {
          type: "eng",
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
      return this.studentCode.filter(
        (item) => item.grade === grade && item.classNum === classNum
      )[0].code;
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
  watch: {
    classInfo: {
      handler(info) {
        for (let i = 3; i < 7; i++) {
          if (info[`grade${i}`].classList.length === info[`grade${i}`].max) {
            this.allselectflag[i - 3] = true;
          } else {
            this.allselectflag[i - 3] = false;
          }
        }
      },
      deep: true,
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

.classalreadyselect {
  border: 1px solid #cbcbcb;
  background-color: rgb(190, 190, 190);
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