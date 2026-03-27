<template>
  <div>
    <v-row style="margin-top: 50px" justify="center">
      <p style="font-family: notosansblack; font-size: 32px">
        {{ userinfo.schoolName }}초등학교 Master 선생님
      </p>
    </v-row>
    <v-row style="margin-top: 20px" justify="center">
      <p style="color: #66686b; font-size: 16px; font-family: notosansregular">
        절차에 따라 계정 세팅을 진행해주세요. 3~5분 정도 소요됩니다.
      </p>
    </v-row>
    <v-row style="margin-top: 60px" justify="center">
      <masterStatus :level="level"></masterStatus>
    </v-row>
    <v-row style="margin-top: 90px" justify="center">
      <!-- Level 1 -->
      <div v-show="level === 1" class="maindiv2">
        <div style="padding: 30px; position: absolute; width: 1300px">
          <p class="leftleft" style="font-size: 25px; font-family: notosans">
            반 생성
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
              계약한 학년의 <b style="color: #3480d8">출판사</b>와
              <b style="color: #3480d8">계약한 반</b>을
              <b style="color: #3480d8; text-decoration: underline">모두 선택</b
              >해주세요
            </p>
          </div>
          <div style="float: right">
            <p
              style="
                float: left;
                font-family: notosans;
                font-size: 20px;
                margin-top: 5px;
              "
            >
              {{ userinfo.schoolName }} 초등학교 학급수 :
              {{
                [
                  ...classInfo.grade3.classList,
                  ...classInfo.grade4.classList,
                  ...classInfo.grade5.classList,
                  ...classInfo.grade6.classList,
                ].length
              }}개
            </p>
            <v-btn
              style="position: absolute"
              @click="
                {
                  checkmodal = true;
                }
              "
              class="btnstyle1"
              width="130"
              height="40"
              variant="outlined"
            >
              학급 생성
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
                margin-top: 20px;
                margin-left: 20px;
                width: 280px;
                height: 250px;
                border-radius: 15px;
                background-color: white;
              "
            >
              <p
                style="
                  font-family: notosans;
                  padding-left: 15px;
                  padding-top: 10px;
                "
              >
                출판사
              </p>
              <div v-if="i + 3 === 3 || i + 3 === 4" style="margin-left: 10px">
                <div
                  @click="
                    {
                      if (classInfo[`grade${i + 3}`]['publisher'] === n.eng) {
                        classInfo[`grade${i + 3}`]['publisher'] = '';
                      } else {
                        classInfo[`grade${i + 3}`]['publisher'] = n.eng;
                      }
                    }
                  "
                  v-for="(n, k) in publishers"
                  :key="k"
                  style="
                    height: 30px;
                    text-align: center;
                    border-radius: 10px;
                    margin-right: 20px;
                    margin-top: 12px;
                    float: left;
                  "
                  class="noselect"
                  :class="{
                    publishernoselect:
                      classInfo[`grade${i + 3}`]['publisher'] !== n.eng,
                    publisherselect:
                      classInfo[`grade${i + 3}`]['publisher'] === n.eng,
                  }"
                >
                  <p
                    style="
                      padding: 10px;
                      padding-top: 3px;
                      cursor: pointer;
                      font-size: 14px;
                      font-family: notosansregular;
                    "
                  >
                    {{ n.kor }}
                  </p>
                </div>
              </div>
              <div v-if="i + 3 === 5 || i + 3 === 6" style="margin-left: 10px">
                <div
                  @click="
                    {
                      if (classInfo[`grade${i + 3}`]['publisher'] === n.eng) {
                        classInfo[`grade${i + 3}`]['publisher'] = '';
                      } else {
                        classInfo[`grade${i + 3}`]['publisher'] = n.eng;
                      }
                    }
                  "
                  v-for="(n, k) in publishers2"
                  :key="k"
                  style="
                    height: 30px;
                    text-align: center;
                    border-radius: 10px;
                    margin-right: 20px;
                    margin-top: 12px;
                    float: left;
                  "
                  class="noselect"
                  :class="{
                    publishernoselect:
                      classInfo[`grade${i + 3}`]['publisher'] !== n.eng,
                    publisherselect:
                      classInfo[`grade${i + 3}`]['publisher'] === n.eng,
                  }"
                >
                  <p
                    style="
                      padding: 10px;
                      padding-top: 3px;
                      cursor: pointer;
                      font-size: 14px;
                      font-family: notosansregular;
                    "
                  >
                    {{ n.kor }}
                  </p>
                </div>
              </div>
            </div>
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
                  반 선택 : 0
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
              <div style="margin-top: 40px">
                <div
                  style="
                    float: left;
                    margin-left: 10px;
                    margin-top: 10px;
                    width: 55px;
                    height: 35px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 15px;
                    text-align: center;
                  "
                  class="noselect"
                  v-for="(p, q) in classInfo[`grade${i + 3}`]['max']"
                  :key="q"
                  :class="{
                    classnoselect: !classInfo[`grade${i + 3}`][
                      'classList'
                    ].includes(q + 1),
                    classselect: classInfo[`grade${i + 3}`][
                      'classList'
                    ].includes(q + 1),
                  }"
                  @click="
                    {
                      if (
                        classInfo[`grade${i + 3}`]['classList'].includes(q + 1)
                      ) {
                        for (
                          let j = 0;
                          j < classInfo[`grade${i + 3}`]['classList'].length;
                          j++
                        ) {
                          if (
                            classInfo[`grade${i + 3}`]['classList'][j] ===
                            q + 1
                          ) {
                            classInfo[`grade${i + 3}`]['classList'].splice(
                              j,
                              1
                            );
                          }
                        }
                      } else {
                        classInfo[`grade${i + 3}`]['classList'].push(q + 1);
                      }
                    }
                  "
                >
                  <p style="padding: 5px; padding-top: 6px">
                    {{ i + 3 }} - {{ q + 1 }}
                  </p>
                </div>
                <div
                  class="maxup"
                  @click="
                    {
                      if (classInfo[`grade${i + 3}`]['max'] > 19) {
                        classInfo[`grade${i + 3}`]['max'] += 0;
                      } else {
                        classInfo[`grade${i + 3}`]['max'] += 1;
                      }
                    }
                  "
                ></div>
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
            border-radius: 30px;
            background-color: white;
            width: 1480px;
          "
        >
          <p class="leftleft" style="font-size: 25px; font-family: notosans">
            LMS 가입코드 생성
          </p>
          <div
            style="
              float: left;
              margin-left: 15px;
              margin-top: 8px;
              font-family: notosansregular;
            "
          >
            <p>LMS 가입 코드를 아래와 같이 발급합니다.</p>
          </div>
          <div style="float: left; margin-left: 820px">
            <v-btn
              @click="
                {
                  checkmodal = true;
                }
              "
              style="position: absolute"
              class="btnstyle1"
              width="90"
              height="40"
              variant="outlined"
            >
              발급
            </v-btn>
          </div>
        </div>
        <div
          style="
            margin-top: 130px;
            margin-left: 30px;
            font-family: notosansregular;
            font-size: 15px;
          "
        >
          <p>
            *영어 교사: 1명의 교사가 여러 학급을 선택하여 관리할 수 있습니다.
            (최대 3명 교사 가입 가능 코드)
          </p>
          <p style="margin-top: 5px">
            *담임 교사: 1명의 교사가 1개의 학급만 관리할 수 있습니다.
          </p>
        </div>
        <table
          style="
            width: 1400px;
            text-align: center;
            margin-left: 50px;
            margin-top: 50px;
            border-bottom: 1px solid #cae3ff;
          "
        >
          <tr>
            <td class="tabletd">구분</td>
            <td class="tabletd">학급</td>
            <td class="tabletd" style="border-right: 1px solid #cae3ff">
              LMS 가입 코드
            </td>
          </tr>
          <tr v-for="(j, i) in lmscodelist" :key="i">
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
            >
              {{ getgb(j.grade) }}
            </td>
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
            >
              {{ gradeclassnum(j.grade, j.classNum) }}
            </td>
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
              style="border-right: 1px solid #cae3ff"
            >
              {{ j.code }}
            </td>
          </tr>
        </table>
        <div style="height: 100px"></div>
      </div>

      <!-- Level 3 -->
      <div v-show="level === 3" class="maindiv" style="overflow-y: scroll">
        <div
          style="
            padding: 30px;
            position: absolute;
            background-color: white;
            width: 1480px;
            border-radius: 30px;
          "
        >
          <p class="leftleft" style="font-size: 25px; font-family: notosans">
            전체 가입 절차
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
              LMS로 이동 후,
              <b style="color: #3480d8">'설정'에서 다시 확인 가능</b>합니다.
            </p>
          </div>
          <div style="float: left; margin-left: 820px">
            <v-btn
              @click="
                {
                  level = 4;
                  getstudentcode();
                }
              "
              style="position: absolute"
              class="btnstyle1"
              width="90"
              height="40"
              variant="outlined"
            >
              다음
            </v-btn>
          </div>
        </div>
        <div style="margin-top: 150px; margin-left: 70px">
          <div class="vectorcontainer">
            <div style="margin-top: 30px">
              <p style="color: #3480d8; font-family: notosans; font-size: 21px">
                알공 LMS 접속
              </p>
              <div style="margin-top: 15px; font-family: notosansregular">
                <p>LMS 페이지</p>
                <p style="margin-top: 5px">manager.argong.ai</p>
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
                LMS 회원 가입
              </p>
              <div style="margin-top: 15px; font-family: notosansregular">
                <p>가입 코드 입력 필요</p>
              </div>
            </div>
          </div>
          <div class="vector"></div>
          <div class="vectorcontainer">
            <div style="margin-top: 30px">
              <p style="color: #3480d8; font-family: notosans; font-size: 21px">
                교사 계정 확인
              </p>
              <div style="margin-top: 15px; font-family: notosansregular">
                <p>설정 > 계정 관리 진입</p>
                <p style="margin-top: 5px">교사용 알공 계정 확인</p>
              </div>
            </div>
          </div>
          <div class="vector"></div>
          <div class="vectorcontainer">
            <div style="margin-top: 30px">
              <p style="color: #3480d8; font-family: notosans; font-size: 21px">
                학생 가입 진행
              </p>
              <div style="margin-top: 15px; font-family: notosansregular">
                <p>설정 > SSO 가입 진입</p>
                <p style="margin-top: 5px">반코드 확인 후, 가입 진행</p>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 400px; margin-left: 30px">
          <p class="leftleft" style="font-size: 25px; font-family: notosans">
            LMS 가입 코드 생성
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
              <b style="color: #3480d8">LMS 가입 코드</b>를 각 담당 교사에게
              알려주세요. 학교 세팅 절차 완료 후, LMS 화면에서 다시 확인
              가능합니다.
            </p>
          </div>
        </div>
        <table
          style="
            width: 1400px;
            text-align: center;
            margin-left: 50px;
            margin-top: 470px;
            border-bottom: 1px solid #cae3ff;
          "
        >
          <tr>
            <td class="tabletd">구분</td>
            <td class="tabletd">학급</td>
            <td class="tabletd" style="border-right: 1px solid #cae3ff">
              LMS 가입 코드
            </td>
          </tr>
          <tr v-for="(j, i) in lmscodelist" :key="i">
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
            >
              {{ getgb(j.grade) }}
            </td>
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
            >
              {{ gradeclassnum(j.grade, j.classNum) }}
            </td>
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
              style="border-right: 1px solid #cae3ff"
            >
              {{ j.code }}
            </td>
          </tr>
        </table>
        <div style="height: 100px"></div>
      </div>

      <!-- Level 4 -->
      <div v-show="level === 4" class="maindiv" style="overflow-y: scroll">
        <div
          style="
            padding: 30px;
            position: absolute;
            background-color: white;
            width: 1480px;
            border-radius: 30px;
          "
        >
          <p class="leftleft" style="font-size: 25px; font-family: notosans">
            학생 가입 코드 생성
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
              반별 학생 가입 코드를 생성합니다. 생성된
              <b style="color: #3480d8">가입 코드는 LMS에서 다시 한번 확인 </b
              >가능합니다.
            </p>
          </div>
          <div style="float: left; margin-left: 500px">
            <v-btn
              @click="
                {
                  checkmodal = true;
                }
              "
              style="position: absolute"
              class="btnstyle1"
              width="90"
              height="40"
              variant="outlined"
            >
              발급
            </v-btn>
          </div>
        </div>
        <table
          style="
            width: 1400px;
            text-align: center;
            margin-left: 50px;
            margin-top: 100px;
            border-bottom: 1px solid #cae3ff;
          "
        >
          <tr>
            <td class="tabletd">구분</td>
            <td class="tabletd">학급</td>
            <td class="tabletd" style="border-right: 1px solid #cae3ff">
              학생 가입 코드
            </td>
          </tr>
          <tr v-for="(j, i) in studentcodelist" :key="i">
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
            >
              학생
            </td>
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
            >
              {{ gradeclassnum(j.grade, j.classNum) }}
            </td>
            <td
              class="tabletd2"
              :class="{
                blue: !j.grade,
              }"
              style="border-right: 1px solid #cae3ff"
            >
              {{ j.code }}
            </td>
          </tr>
        </table>
        <div style="height: 100px"></div>
      </div>

      <!-- Level 5 -->
      <div v-show="level === 5" class="maindiv" style="overflow-y: scroll">
        <div
          style="
            padding: 30px;
            position: absolute;
            width: 1480px;
            border-radius: 30px;
            background-color: white;
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
            <p>
              master 교사의 알공 계정을 아래와 같이 발급합니다. 생성된
              <b style="color: #3480d8">계정은 LMS에서 다시 확인</b>가능합니다.
            </p>
          </div>
          <div style="float: left; margin-left: 450px">
            <v-btn
              @click="
                {
                  checkmodal = true;
                }
              "
              style="position: absolute"
              class="btnstyle1"
              width="90"
              height="40"
              variant="outlined"
            >
              발급
            </v-btn>
          </div>
        </div>
        <table
          style="
            width: 1400px;
            text-align: center;
            margin-left: 50px;
            margin-top: 130px;
            border-bottom: 1px solid #cae3ff;
          "
        >
          <tr>
            <td class="tabletd">구분</td>
            <td class="tabletd">이름</td>
            <td class="tabletd">담당 학급</td>
            <td class="tabletd">교사용 알공 계정</td>
            <td class="tabletd" style="border-right: 1px solid #cae3ff">
              초기 비밀번호
            </td>
          </tr>
          <tr v-for="(j, i) in teacheraccountslist" :key="i">
            <td class="tabletd2">master 교사</td>
            <td class="tabletd2">{{ userinfo.name }}</td>
            <td class="tabletd2">
              {{ gradeclassnum(j.grade, j.classNum) }}
            </td>
            <td class="tabletd2">
              {{ j.id }}
            </td>
            <td class="tabletd2" style="border-right: 1px solid #cae3ff">
              000000
            </td>
          </tr>
        </table>
        <div style="height: 100px"></div>
      </div>
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
    <v-row>
      <div style="height: 300px; width: 300px"></div>
    </v-row>
  </div>
</template>

<script>
import masterStatus from "./status/masterStatus.vue";
import axios from "axios";
import {
  deleteCookie,
  getSaveCookie,
  nonSaveCookie,
  saveCookie,
} from "../../store/cookie";

export default {
  async created() {
    if (this.level === 2) {
      this.getlmscode();
    }
    if (this.level === 3) {
      this.getreallmscode();
    }
    if (this.level === 4) {
      this.getstudentcode();
    }
    if (this.level === 5) {
      this.getteacheraccount();
    }
  },
  data() {
    return {
      allselectflag: [false, false, false, false],
      modaltext: [
        {
          title: "학급 생성",
          content: [
            "생성된 학급은 변경이 불가능합니다.",
            "이대로 반생성 완료할까요?",
          ],
        },
        {
          title: "LMS 코드 발급",
          content: ["이대로 LMS 코드를 발급하시겠습니까?"],
        },
        {
          title: "",
          content: [],
        },
        {
          title: "학생 가입 코드 발급",
          content: [
            "학생 가입 코드 발급을 진행하시겠습니까?",
            "코드는 LMS에서 다시 확인 가능합니다.",
          ],
        },
        {
          title: "교사 알공 계정 발급",
          content: [`개의 교사용 알공 계정을 발급합니다.`],
        },
      ],
      publishers: [
        {
          kor: "천재 (함순애)",
          eng: "cj",
        },
        {
          kor: "천재 (이동환)",
          eng: "cjl",
        },
        {
          kor: "천재 (김태은)",
          eng: "cjk",
        },
        {
          kor: "대교",
          eng: "dk",
        },
        {
          kor: "동아",
          eng: "da",
        },
        {
          kor: "YBM (최희경)",
          eng: "ybmk",
        },
        {
          kor: "YBM (김혜리)",
          eng: "ybmc",
        },
        {
          kor: "미래엔",
          eng: "mn",
        },
        {
          kor: "아이스크림",
          eng: "IC",
        },
        {
          kor: "비상",
          eng: "VS",
        },
      ],
      publishers2: [
        {
          kor: "천재",
          eng: "cj",
        },
        {
          kor: "대교",
          eng: "dk",
        },
        {
          kor: "동아",
          eng: "da",
        },
        {
          kor: "YBM (최희경)",
          eng: "ybmk",
        },
        {
          kor: "YBM (김혜리)",
          eng: "ybmc",
        },
      ],
      classCount: 0,
      classInfo: {
        grade3: {
          publisher: "",
          classList: [],
          max: 10,
        },
        grade4: {
          publisher: "",
          classList: [],
          max: 10,
        },
        grade5: {
          publisher: "",
          classList: [],
          max: 10,
        },
        grade6: {
          publisher: "",
          classList: [],
          max: 10,
        },
      },
      level: parseInt(sessionStorage.getItem("masterlevel")),
      lmscodelist: [],
      studentcodelist: [],
      teacheraccountslist: [],
      checkmodal: false,
      token: getSaveCookie("info2"),
    };
  },
  components: {
    masterStatus,
  },
  props: {
    userinfo: {
      required: true,
    },
  },
  methods: {
    async levelok() {
      this.checkmodal = false;

      if (this.level === 1) {
        const res = await this.createClass();
        if (res === -1) {
          return;
        }
        this.level = 2;
      } else if (this.level === 2) {
        this.level2ok();
        this.level = 3;
      } else if (this.level === 4) {
        this.level4ok();
        this.getteacheraccount();
        this.level = 5;
      } else if (this.level === 5) {
        const res = await this.level5ok();

        if (res) {
          this.finish();
        } else {
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
        }

        // finish
      }
    },
    getgb(grade) {
      if (!grade) {
        return "영어 교사";
      } else {
        return "담임 교사";
      }
    },
    gradeclassnum(grade, classnum) {
      if (!grade) {
        return "여러 학급 담당";
      } else {
        return `${grade}학년 ${classnum}반`;
      }
    },
    async createClass() {
      let arr = [
        ...this.classInfo.grade3.classList,
        ...this.classInfo.grade4.classList,
        ...this.classInfo.grade5.classList,
        ...this.classInfo.grade6.classList,
      ];

      if (!arr.length) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: ["학급을 하나 이상 선택해주세요."],
            },
          })
        );
        return -1;
      }

      for (let i = 3; i < 7; i++) {
        if (this.classInfo[`grade${i}`]["classList"].length) {
          if (!this.classInfo[`grade${i}`]["publisher"]) {
            window.dispatchEvent(
              new CustomEvent("error", {
                detail: {
                  status: true,
                  text: ["학급을 선택한 학년의 출판사를 선택해주세요."],
                },
              })
            );
            return -1;
          }
        }
      }

      for (let i = 0; i < 4; i++) {
        this.classInfo[`grade${i + 3}`]["classList"] =
          this.classInfo[`grade${i + 3}`]["classList"].sort();
      }

      const keys = Object.getOwnPropertyNames(this.classInfo);

      let classList = [];
      let publisherList = [];

      for (let i = 0; i < keys.length; i++) {
        if (this.classInfo[keys[i]]["publisher"]) {
          if (!this.classInfo[keys[i]]["classList"].length) {
            window.dispatchEvent(
              new CustomEvent("error", {
                detail: {
                  status: true,
                  text: ["출판사를 선택한 학년의 학급을 선택해주세요."],
                },
              })
            );
          }
        }

        classList.push(this.classInfo[keys[i]]["classList"]);
        if (classList.length) {
          publisherList.push(
            this.classInfo[keys[i]]["publisher"].toUpperCase()
          );
        }
      }

      const data = { classList, publisherList };

      const res = await axios.post(
        `${process.env.VUE_APP_CONNECT}/lms/create/class`,
        data,
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );

      if (!res.data.data) {
        return -1;
      }

      setTimeout(() => {
        this.getlmscode();
      }, 1000);

      return 0;
    },
    async getreallmscode() {
      const res = await axios.get(
        `${process.env.VUE_APP_CONNECT}/lms/get/code/lms/level3/${this.userinfo.schoolCode}`,
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );

      const engCode = res.data.data.engCode;
      let arr = [{ code: engCode }];

      const codelist = res.data.data.codeList;

      const keys = Object.getOwnPropertyNames(codelist);
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < codelist[keys[i]].length; j++) {
          arr.push({
            grade: keys[i],
            classNum: codelist[keys[i]][j].classNumber,
            code: codelist[keys[i]][j].code,
          });
        }
      }

      this.lmscodelist = arr;
    },
    async getlmscode() {
      const res = await axios.get(
        `${process.env.VUE_APP_CONNECT}/lms/preview/code/lms`,
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );

      const engCode = res.data.data.engCode;
      let arr = [{ code: engCode }];

      const codelist = res.data.data.codeList;

      const keys = Object.getOwnPropertyNames(codelist);
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < codelist[keys[i]].length; j++) {
          arr.push({
            grade: keys[i],
            classNum: codelist[keys[i]][j].classNumber,
            code: codelist[keys[i]][j].code,
          });
        }
      }

      this.lmscodelist = arr;
    },
    async getstudentcode() {
      const res = await axios.get(
        `${process.env.VUE_APP_CONNECT}/lms/preview/code/student`,
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );

      const codelist = res.data.data;
      let arr = [];

      const keys = Object.getOwnPropertyNames(codelist);
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < codelist[keys[i]].length; j++) {
          arr.push({
            grade: keys[i],
            classNum: codelist[keys[i]][j].classNumber,
            code: codelist[keys[i]][j].code,
          });
        }
      }

      this.studentcodelist = arr;
    },
    async level1ok() {},

    async level2ok() {
      const res2 = await axios.get(`${process.env.VUE_APP_CONNECT}/users`, {
        credentials: true,
        headers: {
          Authorization: getSaveCookie("info2"),
        },
      });

      const data = {
        data: 1,
      };

      const res = await axios.post(
        `${process.env.VUE_APP_CONNECT}/lms/create/code/lms`,
        data,
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );
      this.level = 3;
    },
    async level4ok() {
      axios.post(
        `${process.env.VUE_APP_CONNECT}/lms/create/code/student`,
        {
          data: 1,
        },
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );
      this.level = 5;
    },
    async level5ok() {
      this.$store.state.loading = true;

      const res = await axios.post(
        `${process.env.VUE_APP_CONNECT}/lms/create/id/teacher`,
        {
          data: 1,
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
        return false;
      }
    },
    async getteacheraccount() {
      const res = await axios.get(
        `${process.env.VUE_APP_CONNECT}/lms/get/id/teacher`,
        {
          credentials: true,
          headers: {
            Authorization: getSaveCookie("info2"),
          },
        }
      );

      const accounts = res.data.data;

      let arr = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < accounts[`${i + 3}`].length; j++) {
          arr.push({
            grade: i + 3,
            classNum: accounts[`${i + 3}`][j].classNumber,
            id: accounts[`${i + 3}`][j].id,
          });
        }
      }

      this.teacheraccountslist = arr;

      this.modaltext[4].content = [
        `${this.teacheraccountslist.length}개의 교사용 알공 계정을 발급합니다.`,
      ];
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
    allSelect(grade) {
      const max = this.classInfo[`grade${grade}`].max;

      if (this.classInfo[`grade${grade}`].classList.length < max) {
        for (let i = 1; i < max + 1; i++) {
          this.classInfo[`grade${grade}`].classList.push(i);
        }
      } else {
        this.classInfo[`grade${grade}`].classList = [];
      }

      return;
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
  border-radius: 30px;
  border: 1px solid #cae3ff;
}

.maindiv2 {
  width: 1500px;
  height: 900px;
  background-color: white;
  border-radius: 30px;
  border: 1px solid #cae3ff;
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
  height: 730px;
  background-color: #f3f9ff;
  margin-top: 70px;
  margin-left: 30px;
  border-radius: 25px;
  float: left;
}

.publishernoselect {
  border: 1px solid #cbcbcb;
}

.publisherselect {
  border: 1px solid #258bff;
  color: #258bff;
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
  height: 170px;
  border: 1px solid #cae3ff;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  float: left;
}

.blue {
  color: #258bff;
}
.red {
  color: red;
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
</style>