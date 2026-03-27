<template>
  <div class="container">
    <div>
      <h4 class="headline">
        {{ langlist[$store.state.lang]["전학생 추가"] }}
      </h4>
      <span class="text">
        {{
          langlist[$store.state.lang][
            "전학생은 '결제 학생'의 5%까지 추가 가능합니다."
          ]
        }}
      </span>
    </div>

    <div class="card">
      <div class="flex-center-between">
        <div class="flex">
          <h6 class="headline2">
            {{ langlist[$store.state.lang]["전학생 추가 신청"] }}
          </h6>
          <p
            style="
              margin-left: 25px;
              font-size: 18px;
              font-family: notosansregular;
            "
          >
            <b style="color: #3d90ef">{{ restrictNum - applies.length }}</b
            >{{ langlist[$store.state.lang]["명 추가 가능합니다."] }}
          </p>
        </div>
        <v-btn
          @click="apply()"
          class="applybtn"
          variant="outlined"
          width="120"
          height="42"
          >{{ langlist[$store.state.lang]["신청하기"] }}</v-btn
        >
      </div>

      <table>
        <tr>
          <th style="width: 180px">
            {{ langlist[$store.state.lang]["학급 선택"] }}
          </th>
          <th>{{ langlist[$store.state.lang]["번호"] }}</th>
          <th>{{ langlist[$store.state.lang]["이름"] }}</th>
          <th style="width: 300px">
            {{ langlist[$store.state.lang]["ID (자동생성)"] }}
          </th>
        </tr>
        <tr v-for="(j, i) in applies" :key="i">
          <td>
            <div
              @click="selecton(i)"
              class="classselect"
              style="text-align: left"
            >
              <p style="margin-top: 8px; font-size: 15px; margin-left: 15px">
                {{ j.class.grade }}학년 {{ j.class.classNum }}반
              </p>
              <p
                style="
                  float: left;
                  position: absolute;
                  margin-top: -22px;
                  margin-left: 150px;
                  font-size: 13px;
                "
              >
                ▼
              </p>
            </div>
            <div
              class="classselectlist"
              style="z-index: 99"
              :class="{ classselecton: targetselectclassidx === i }"
            >
              <div v-for="(n, k) in classes" :key="k">
                <div
                  @click="selectclass(j, n.grade, n.classNum)"
                  class="selectclasselement"
                  style="
                    width: 180px;
                    height: 49px;
                    padding: 10px;
                    font-size: 17px;
                    margin-bottom: 5px;
                    cursor: pointer;
                    text-align: center;
                  "
                >
                  <p style="margin-right: 5px">
                    {{ n.grade }}학년 {{ n.classNum }}반
                  </p>
                </div>
              </div>
            </div>
          </td>
          <td>
            <input
              v-model="j.attendanceNumber"
              type="text"
              class="defaultinput"
            />
          </td>
          <td>
            <input v-model="j.name" type="text" class="defaultinput" />
          </td>
          <td style="width: 50px; color: #3d90ef; font-size: 17px">
            {{ setid(j) }}
          </td>
        </tr>
      </table>

      <div @click="addtransfer()" class="addbtn2 noselect">
        <p
          style="
            font-family: notosanslight;
            font-size: 55px;
            margin-top: -17px;
            color: #3d90ef;
          "
        >
          +
        </p>
      </div>
    </div>

    <div class="card">
      <div class="flex">
        <h6 class="headline2">
          {{ langlist[$store.state.lang]["전학생 추가 신청 내역"] }}
        </h6>
        <p
          style="
            margin-left: 25px;
            font-size: 18px;
            font-family: notosansregular;
          "
        >
          <b style="color: #3d90ef"
            >{{ transferhistory.length }}/{{ restrict }}</b
          >{{ langlist[$store.state.lang]["명 추가되었습니다."] }}
        </p>
      </div>

      <table>
        <tr>
          <th>
            {{ langlist[$store.state.lang]["신청 날짜"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["신청 교사"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["전학생 학급"] }}
          </th>
          <th>{{ langlist[$store.state.lang]["번호"] }}</th>
          <th>{{ langlist[$store.state.lang]["이름"] }}</th>
          <th>ID</th>
          <th>
            {{ langlist[$store.state.lang]["처리 결과"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["처리 날짜"] }}
          </th>
        </tr>
        <tr v-for="(j, i) in transferhistory" :key="i">
          <td>{{ j.applyTime }}</td>
          <td>{{ j.teacherName }}</td>
          <td>{{ j.classInfo }}</td>
          <td>{{ j.attendanceNumber }}</td>
          <td>{{ j.name }}</td>
          <td>{{ j.id }}</td>
          <td>
            <p
              style="
                color: #3d90ef;
                text-decoration: underline;
                font-family: notosansmedium;
                cursor: pointer;
              "
            >
              {{ processStatus(j.status, j.processStatus) }}
            </p>
          </td>
          <td>
            {{ makeProcessTime(j.processTime) }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { userInfo, classlist } from "../../api/api-list";
import {
  applytransfer,
  transferhistory,
  contractinfo,
} from "../../api/api-list-2";

import { setting_transfer_vt } from "../../assets/translate/vt";
import { setting_transfer_ko } from "../../assets/translate/ko";
import dayjs from "dayjs";

export default {
  async created() {
    const res = await userInfo();
    this.userinfo = res.data.data;

    const res2 = await classlist();
    const res3 = await transferhistory();
    const res4 = await contractinfo();

    this.transferhistory = res3.data.data;

    const classes = res2.data.data.classList;
    for (let i = 0; i < classes.length; i++) {
      for (let j = 0; j < classes[i].length; j++) {
        this.classes.push({
          grade: i + 3,
          classNum: classes[i][j],
        });
      }
    }

    // this.restrict = Math.floor(200 * 0.03);

    // this.restrictNum = Math.floor(200 * 0.03) - res3.data.data.length;

    // this.restrict = 0;
    // this.restrictNum = 0;
    this.restrict = Math.floor(res4.data.data.contractStudentNumber * 0.05);
    this.restrictNum =
      Math.floor(res4.data.data.contractStudentNumber * 0.05) -
      res3.data.data.length;

    this.contractNumber = Math.floor(
      res4.data.data.contractStudentNumber * 0.05
    );
  },
  data() {
    return {
      langlist: {
        ko: setting_transfer_ko,
        vt: setting_transfer_vt,
      },
      applies: [],
      targetclass: {
        grade: "",
        classNum: "",
      },
      classes: [],
      selectopen: false,
      targetselectclassidx: -1,
      transferhistory: [],
      restrictNum: 0,
      restrict: 0,
      contractNumber: 0,
    };
  },
  methods: {
    makeProcessTime(time) {
      return dayjs(time).add(9, "hour").format("YYYY-MM-DD HH:mm") || "-";
    },
    processStatus(status, processStatus) {
      if (!status && !processStatus) {
        return "대기중";
      }
      if (status && !processStatus) {
        return "반려";
      }
      if (status && processStatus) {
        return "발급 완료";
      }
    },
    selecton(index) {
      if (this.targetselectclassidx === index) {
        this.targetselectclassidx = -1;
      } else {
        this.targetselectclassidx = index;
      }
    },
    selectclass(j, grade, classNum) {
      j.class.grade = grade;
      j.class.classNum = classNum;
      this.targetselectclassidx = -1;
    },
    setid(j) {
      if (!j.class.grade) {
        return "";
      }

      if (!j.name || !j.attendanceNumber) {
        return "";
      }

      const date = new Date();
      const year = date.getFullYear().toString();

      const schoolCode = this.userinfo.schoolCode;
      const yearid = `${year[2]}${year[3]}`;
      const grade = j.class.grade;
      const classNum = j.class.classNum.toString().padStart(2, "0");
      const attendanceNumber = j.attendanceNumber.padStart(2, "0");

      j.id = `${schoolCode}${yearid}${grade}${classNum}${attendanceNumber}`;

      return `${schoolCode}${yearid}${grade}${classNum}${attendanceNumber}`;
    },
    addtransfer() {
      if (this.transferhistory.length === this.contractNumber) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "신청 가능한 전학생 수를 초과했습니다."
                ],
              ],
            },
          })
        );
        return;
      }

      if (this.applies.length === this.restrictNum) {
        return;
      }

      this.applies.push({
        class: {
          grade: this.classes[0].grade,
          classNum: this.classes[0].classNum,
        },
        attendanceNumber: "",
        name: "",
        id: "",
      });
    },
    async apply() {
      const temp = this.applies.filter((item) => item.id !== "");
      if (this.applies.length !== temp.length) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "신청 학생의 정보를 모두 입력해주세요."
                ],
              ],
            },
          })
        );
        return;
      }

      for (let i = 0; i < this.applies.length; i++) {
        const id = this.applies[i].id;

        const temp = this.transferhistory.filter((item) => item.id === id);
        if (temp.length) {
          window.dispatchEvent(
            new CustomEvent("error", {
              detail: {
                status: true,
                text: [
                  this.langlist[this.$store.state.lang][
                    "이미 신청내역이 있습니다."
                  ],
                  this.langlist[this.$store.state.lang]["정보를 확인해주세요."],
                ],
              },
            })
          );
          return;
        }
      }

      const data = this.applies;
      if (data.length === 0) {
        return;
      }

      const unique = new Set();

      for (const obj of data) {
        if (unique.has(`${obj.grade}${obj.classNum}${obj.attendanceNumber}`)) {
          window.dispatchEvent(
            new CustomEvent("error", {
              detail: {
                status: true,
                text: [
                  this.langlist[this.$store.state.lang][
                    "중복된 출석번호는 사용할 수 없습니다."
                  ],
                ],
              },
            })
          );
          return;
        } else {
          unique.add(`${obj.grade}${obj.classNum}${obj.attendanceNumber}`);
        }
      }

      let transferDetail = [];

      for (let i = 0; i < data.length; i++) {
        transferDetail.push({
          id: data[i].id,
          name: data[i].name,
          grade: data[i].class.grade,
          classNum: data[i].class.classNum,
          attendanceNumber: data[i].attendanceNumber,
        });
      }

      const transferData = {
        reason: "전학생 신청",
        transferDetail,
      };

      try {
        const res = await applytransfer(transferData);

        if (res.data.data === true) {
          window.dispatchEvent(
            new CustomEvent("success", {
              detail: {
                status: true,
                text: [
                  "전학생 발급 신청이 접수되었습니다.",
                  "영업일 기준 1~2일 이내로 처리될 예정입니다.",
                ],
              },
            })
          );

          this.applies = [];
          const res3 = await transferhistory();
          this.transferhistory = res3.data.data;
          return;
        } else if (res.data.data === false) {
          window.dispatchEvent(
            new CustomEvent("error", {
              detail: {
                status: true,
                text: [
                  this.langlist[this.$store.state.lang][
                    "이미 존재하는 학생 정보입니다."
                  ],
                  this.langlist[this.$store.state.lang][
                    "학급과 번호를 확인해주세요."
                  ],
                ],
              },
            })
          );
          return;
        } else {
          window.dispatchEvent(
            new CustomEvent("error", {
              detail: {
                status: true,
                text: [
                  this.langlist[this.$store.state.lang][
                    "오류가 발생하였습니다."
                  ],
                ],
              },
            })
          );
          return;
        }
      } catch {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang]["오류가 발생하였습니다."],
              ],
            },
          })
        );
        return;
      }
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
  width: 100%;
  padding: 32px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
table {
  width: 100%;
  text-align: center;
  border: 1px solid #cae3ff;
  overflow: hidden;
  border-spacing: 0;
  border-radius: 16px;

  th,
  td {
    padding: 15px;
  }

  th {
    font-family: notosans;
    font-size: 14px;
    border-right: none;
    background-color: #f1f8ff;
    color: #66686b;

    &:first-child {
      border-top-left-radius: 15px;
    }
    &:last-child {
      border-top-right-radius: 15px;
    }
  }

  td {
    font-family: notosansregular;
    font-size: 14px;
    color: #292929;
    border-bottom: 1px solid #cae3ff;
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.applybtn {
  border-radius: 8px;
  color: white;
  background-color: #3d90ef;
  font-size: 16px;
  font-family: notosans;
  cursor: pointer;
}

.tabletd {
  background-color: #f1f8ff;
  border-bottom: 3px solid #f1f8ff;
  padding: 20px;
  font-size: 15px;
  height: 40px;
  font-family: notosans;
  font-size: 15px;
}

.tabletd2 {
  border-bottom: 1px solid #c9c9c9;
  padding: 5px;
  font-size: 15px;
  font-family: notosansregular;
  height: 20px;
}

.tabletd3 {
  border-bottom: 1px solid #c9c9c9;
  padding: 20px;
  font-size: 15px;
  font-family: notosansregular;
  height: 20px;
}

.addbtn {
  width: 35px;
  height: 35px;
  background-image: url("../../assets/image/addbtn.png");
  background-size: 100%;
  margin-top: 50px;
  margin-left: 460px;
  cursor: pointer;
  background-color: white;
  border-radius: 50px;
}

.addbtn2 {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 50px;
  margin-left: 460px;
  border: 3px solid #3d90ef;
  text-align: center;
  background-color: white;
}

.addbtn2:hover {
  filter: brightness(0.8);
}

.tabletopleft {
  border-top-left-radius: 20px;
}

.tabletopright {
  border-top-right-radius: 20px;
}

.tablebottomleft {
  border-bottom-left-radius: 20px;
}

.tablebottomright {
  border-bottom-right-radius: 20px;
}

.defaultinput {
  padding: 15px;
  height: 15px;
  font-family: notosansregular;
  font-size: 15px;
  width: 70%;
  margin-top: 5px;
  outline: none;
  border-radius: 5px;
  border: 1px solid gray;
  text-align: center;
}

.classselect {
  width: 180px;
  height: 40px;
  border: 1px solid gray;
  margin-left: 13px;
  border-radius: 10px;
  cursor: pointer;
}

.classselectlist {
  width: 180px;
  height: 150px;
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  margin-left: 13px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: none;
}

.classselectlist::-webkit-scrollbar {
  width: 10px;
}

.classselectlist::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.selectclasselement:hover {
  background-color: rgb(200, 200, 200);
}

.classselecton {
  display: block;
}
</style>
