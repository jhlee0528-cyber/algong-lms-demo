<template>
  <div>
    <div style="margin-top: 30px; width: 1100px">
      <div style="margin-left: 10px">
        <p style="font-family: notosans; font-size: 25px">SSO 가입</p>
        <p
          style="
            font-family: notosansmedium;
            font-size: 17px;
            margin-top: 6px;
            color: rgb(120, 120, 120);
          "
        >
          SSO 가입 절차와 현황을 확인합니다.
        </p>
      </div>
    </div>
    <div
      v-if="schoolLevel === 'master'"
      style="
        width: 1100px;
        height: 900px;
        background-color: white;
        margin-top: 20px;
        border-radius: 25px;
        margin-bottom: 50px;
      "
    >
      <p
        style="
          font-family: notosans;
          font-size: 23px;
          padding: 30px;
          padding-top: 25px;
          padding-bottom: 0px;
        "
      >
        가입 절차
      </p>
      <div class="ssoguide"></div>
      <div style="margin-left: 50px; margin-top: 20px">
        <div
          @click="
            {
              page = 1;
              gopage(1);
            }
          "
          class="menubtn"
          :class="{
            menubtnseleected: page === 1,
          }"
        >
          <p
            class="menutext"
            :class="{
              menutextselected: page === 1,
            }"
          >
            가입 현황 확인
          </p>
        </div>
        <div
          @click="
            {
              page = 2;
              gopage(2);
            }
          "
          class="menubtn"
          :class="{
            menubtnseleected: page === 2,
          }"
        >
          <p
            class="menutext"
            :class="{
              menutextselected: page === 2,
            }"
          >
            LMS 코드 확인
          </p>
        </div>
        <div
          @click="
            {
              page = 3;
              gopage(3);
            }
          "
          class="menubtn"
          :class="{
            menubtnseleected: page === 3,
          }"
        >
          <p
            class="menutext"
            :class="{
              menutextselected: page === 3,
            }"
          >
            학생 코드 확인
          </p>
        </div>
      </div>
      <div
        style="
          width: 1000px;
          height: 530px;
          margin-left: 50px;
          background-color: #f1f8ff;
          margin-top: 80px;
        "
      >
        <!-- page 1 -->
        <div
          v-show="page === 1"
          style="
            width: 950px;
            margin-left: 25px;
            height: 490px;
            background-color: white;
            margin-top: 20px;
            position: absolute;
            border-radius: 25px;
          "
        >
          <div style="width: 100%">
            <p
              style="
                font-family: notosans;
                font-size: 19px;
                padding-left: 25px;
                padding-top: 20px;
                float: left;
              "
            >
              가입 현황 확인
            </p>
            <div style="float: left; padding-top: 25px; padding-left: 10px">
              <p style="color: #3480d8; font-family: notosans">
                학생 가입수 : {{ getStudentsAllCount() }}/{{ restrict }}
              </p>
              <p>! 계약 인원 이상 가입이 불가능합니다.</p>
            </div>
          </div>
          <div
            class="contentscontainer"
            style="
              width: 100%;
              height: 400px;
              margin-top: 90px;
              overflow-y: scroll;
            "
          >
            <table
              style="
                width: 900px;
                margin-left: 25px;
                text-align: center;
                border-bottom: 1px solid #cae3ff;
              "
            >
              <tr>
                <td class="tabletd" style="border-top-left-radius: 15px">
                  학급
                </td>
                <td class="tabletd">
                  영어교사 ({{ getEngTeacherAllCount() }}명)
                </td>
                <td class="tabletd">담임교사 ({{ getTeacherAllCount() }}명)</td>
                <td
                  class="tabletd"
                  style="
                    border-top-right-radius: 15px;
                    border-right: 1px solid #cae3ff;
                  "
                >
                  학생 가입 수 ({{ getStudentsAllCount() }}명)
                </td>
              </tr>
              <tr v-for="(j, i) in classData" :key="i">
                <td class="tabletd2">{{ j.grade }}학년 {{ j.classNum }}반</td>
                <td class="tabletd2">{{ j.engTeacher }}</td>
                <td class="tabletd2">{{ j.teacher }}</td>
                <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                  {{ j.studentsCount }}
                </td>
              </tr>
            </table>
            <div style="height: 50px"></div>
          </div>
        </div>

        <!-- page 2 -->
        <div
          v-show="page === 2"
          style="
            width: 950px;
            margin-left: 25px;
            height: 490px;
            background-color: white;
            margin-top: 20px;
            position: absolute;
            border-radius: 25px;
          "
        >
          <div style="width: 100%">
            <p
              style="
                font-family: notosans;
                font-size: 19px;
                padding-left: 25px;
                padding-top: 20px;
                float: left;
              "
            >
              LMS 가입 코드
            </p>
            <div style="float: left; padding-top: 25px; padding-left: 10px">
              <p>* 영어 교사 : 1명의 교사가 여러 학급을 관리합니다.</p>
              <p>* 담임 교사 : 1명의 교사가 1개의 학급만 관리합니다.</p>
            </div>
          </div>
          <div
            class="contentscontainer"
            style="
              width: 100%;
              height: 400px;
              margin-top: 90px;
              overflow-y: scroll;
            "
          >
            <table
              style="
                width: 900px;
                margin-left: 25px;
                text-align: center;
                border-bottom: 1px solid #cae3ff;
              "
            >
              <tr>
                <td class="tabletd" style="border-top-left-radius: 15px">
                  구분
                </td>
                <td class="tabletd">학급</td>
                <td
                  class="tabletd"
                  style="
                    border-top-right-radius: 15px;
                    border-right: 1px solid #cae3ff;
                  "
                >
                  LMS 가입 코드
                </td>
              </tr>
              <tr>
                <td class="tabletd2">영어 교사</td>
                <td class="tabletd2">여러 학급 담당</td>
                <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                  {{ engLmsCode }}
                </td>
              </tr>
              <tr v-for="(j, i) in lmsCodeData" :key="i">
                <td class="tabletd2">담임 교사</td>
                <td class="tabletd2">
                  {{ j.grade }}학년 {{ j.classNumber }}반
                </td>
                <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                  {{ j.code }}
                </td>
              </tr>
            </table>
            <div style="height: 50px"></div>
          </div>
        </div>

        <!-- page 3 -->
        <div
          v-show="page === 3"
          style="
            width: 950px;
            margin-left: 25px;
            height: 490px;
            background-color: white;
            margin-top: 20px;
            position: absolute;
            border-radius: 25px;
          "
        >
          <div style="width: 100%">
            <p
              style="
                font-family: notosans;
                font-size: 19px;
                padding-left: 25px;
                padding-top: 20px;
                float: left;
              "
            >
              학생 가입 코드
            </p>
            <div style="float: left; padding-top: 23px; padding-left: 15px">
              <p>
                학생 알공 화면에서 코드를 입력하고, 가입할 수 있도록
                안내해주세요.
              </p>
            </div>
          </div>
          <div
            class="contentscontainer"
            style="
              width: 100%;
              height: 400px;
              margin-top: 90px;
              overflow-y: scroll;
            "
          >
            <table
              style="
                width: 900px;
                margin-left: 25px;
                text-align: center;
                border-bottom: 1px solid #cae3ff;
              "
            >
              <tr>
                <td class="tabletd" style="border-top-left-radius: 15px">
                  구분
                </td>
                <td class="tabletd">학급</td>
                <td
                  class="tabletd"
                  style="
                    border-top-right-radius: 15px;
                    border-right: 1px solid #cae3ff;
                  "
                >
                  알공 가입 코드
                </td>
              </tr>
              <tr v-for="(j, i) in studentsCodeData" :key="i">
                <td class="tabletd2">학생</td>
                <td class="tabletd2">
                  {{ j.grade }}학년 {{ j.classNumber }}반
                </td>
                <td class="tabletd2" style="border-right: 1px solid #cae3ff">
                  {{ j.code }}
                </td>
              </tr>
            </table>
            <div style="height: 50px"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="schoolLevel === 'eng' || schoolLevel === 'lms'"
      style="
        width: 1100px;
        height: 900px;
        background-color: white;
        margin-top: 20px;
        border-radius: 25px;
        margin-bottom: 50px;
      "
    >
      <p
        style="
          font-family: notosans;
          font-size: 23px;
          padding: 30px;
          padding-top: 25px;
          padding-bottom: 0px;
        "
      >
        가입 절차
      </p>
      <div class="ssoguide"></div>
      <div style="padding: 30px">
        <p style="font-family: notosans; font-size: 23px">학생 가입 현황</p>
        <div
          style="width: 1030px; margin-top: 20px; font-family: notosansmedium"
        >
          <p style="float: left">
            SSO 로그인 후, 코드 입력 단계에서 아래 코드를 입력하면, 학생 가입이
            완료됩니다.
          </p>
          <p style="float: right; color: #3480d8">
            학교 전체 학생 가입수 : {{ getStudentsAllCount() }}/{{ restrict }}
          </p>
        </div>
        <div
          style="width: 1030px; margin-top: 50px; font-family: notosansmedium"
        >
          <p style="float: left">
            교사용 계정을 포함한 상세 가입 계정은
            <b style="color: #3480d8">'알공 계정 관리' 에서 확인</b>이
            가능합니다.
          </p>
          <p style="float: right; font-family: notosans">
            ! 계약 인원 이상 가입이 불가능합니다.
          </p>
        </div>
        <div
          class="contentscontainer"
          style="
            margin-top: 100px;
            width: 100%;
            height: 450px;
            overflow-y: scroll;
          "
        >
          <table
            style="
              width: 1000px;
              margin-left: 25px;
              text-align: center;
              border-bottom: 1px solid #f1f8ff;
            "
          >
            <tr>
              <td class="tabletd" style="border-top-left-radius: 15px">학급</td>
              <td class="tabletd">반코드 (학생용)</td>
              <td class="tabletd" style="border-top-right-radius: 15px">
                가입 학생수 ({{ getStudentsAllCount() }}명)
              </td>
            </tr>
            <tr v-for="(j, i) in classData" :key="i">
              <td class="tabletd2" style="border-left: 1px solid #f1f8ff">
                {{ j.grade }}학년 {{ j.classNum }}반
              </td>
              <td class="tabletd2">
                {{ getStudentCode(j.grade, j.classNum) }}
              </td>
              <td class="tabletd2" style="border-right: 1px solid #f1f8ff">
                {{ j.studentsCount }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo } from "../../api/api-list";
import axios from "axios";
import { getSaveCookie } from "../../store/cookie";

export default {
  async created() {
    const { schoolCode, schoolLevel } = (await userInfo()).data.data;
    this.schoolCode = schoolCode;
    this.schoolLevel = schoolLevel;

    // 가입 현황부터 로드
    this.gopage(this.page);

    const res = await axios.get(
      `${process.env.VUE_APP_CONNECT}/lms/get/code/student/${this.schoolCode}`,
      {
        credentials: true,
        headers: {
          Authorization: getSaveCookie("info"),
        },
      }
    );

    const data = res.data.data;

    let arr = [];
    for (let i = 0; i < 4; i++) {
      const target = data[`${i + 3}`];

      for (let j = 0; j < target.length; j++) {
        arr.push({
          grade: i + 3,
          ...target[j],
        });
      }
    }

    this.studentsCodeData = arr;

    return;
  },
  data() {
    return {
      restrict: 0,
      page: 1,
      schoolCode: "",
      classData: "",
      lmsCodeData: "",
      studentsCodeData: "",
      schoolLevel: "",
      engLmsCode: "",
    };
  },
  methods: {
    async gopage(n) {
      if (n === 1) {
        const res = await axios.get(
          `${process.env.VUE_APP_CONNECT}/lms/get/sso/signup/${this.schoolCode}`,
          {
            credentials: true,
            headers: {
              Authorization: getSaveCookie("info"),
            },
          }
        );

        const { SSORestrict, classData, engLmsCode } = res.data.data;

        this.restrict = SSORestrict;
        this.classData = classData;
        this.engLmsCode = engLmsCode;

        return;
      } else if (n === 2) {
        const res = await axios.get(
          `${process.env.VUE_APP_CONNECT}/lms/get/code/lms/${this.schoolCode}`,
          {
            credentials: true,
            headers: {
              Authorization: getSaveCookie("info"),
            },
          }
        );

        const data = res.data.data;

        let arr = [];
        for (let i = 0; i < 4; i++) {
          const target = data[`${i + 3}`];

          for (let j = 0; j < target.length; j++) {
            arr.push({
              grade: i + 3,
              ...target[j],
            });
          }
        }

        this.lmsCodeData = arr;

        return;
      } else if (n === 3) {
        const res = await axios.get(
          `${process.env.VUE_APP_CONNECT}/lms/get/code/student/${this.schoolCode}`,
          {
            credentials: true,
            headers: {
              Authorization: getSaveCookie("info"),
            },
          }
        );

        const data = res.data.data;

        let arr = [];
        for (let i = 0; i < 4; i++) {
          const target = data[`${i + 3}`];

          for (let j = 0; j < target.length; j++) {
            arr.push({
              grade: i + 3,
              ...target[j],
            });
          }
        }

        this.studentsCodeData = arr;

        return;
      } else {
        return;
      }
    },
    getTeacherAllCount() {
      const data = this.classData;

      let cnt = 0;
      for (let i = 0; i < data.length; i++) {
        cnt += data[i].teacherCount;
      }

      return cnt;
    },
    getEngTeacherAllCount() {
      const data = this.classData;

      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].engTeacher === "-") {
          continue;
        } else if (arr.includes(data[i].engTeacher)) {
          continue;
        } else {
          arr.push(data[i].engTeacher);
        }
      }

      return arr.length;
    },
    getStudentsAllCount() {
      const data = this.classData;

      let cnt = 0;
      for (let i = 0; i < data.length; i++) {
        cnt += data[i].studentsCount;
      }

      return cnt;
    },
    getStudentCode(grade, classNum) {
      const data = this.studentsCodeData;

      return data.filter(
        (item) => item.grade === grade && item.classNumber === classNum
      )[0].code;
    },
  },
};
</script>

<style scoped>
.menubtn {
  width: 230px;
  height: 60px;
  background-color: #dbecff;
  margin-right: 20px;
  float: left;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
  text-align: center;
}

.menutext {
  font-size: 20px;
  font-family: notosans;
  margin-top: 17px;
  color: #3d90ef;
}

.menubtnseleected {
  background-color: #3d90ef;
}

.menutextselected {
  color: white;
}

.ssoguide {
  background-image: url("../../assets/image/ssoguide.png");
  background-size: 100%;
  width: 1200px;
  height: 170px;
  transform: scale(0.85);
  transform-origin: 0% 0%;
  margin-top: 20px;
  margin-left: 40px;
}

.contentscontainer::-webkit-scrollbar {
  width: 10px;
}

.contentscontainer::-webkit-scrollbar-thumb {
  background-color: #cae3ff;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.tabletd {
  background-color: #f1f8ff;
  border-bottom: 3px solid #f1f8ff;
  padding: 20px;
  font-size: 15px;
  height: 40px;
  font-family: notosans;
}

.tabletd2 {
  padding: 20px;
  font-size: 15px;
}
</style>