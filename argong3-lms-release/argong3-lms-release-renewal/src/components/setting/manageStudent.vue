<template>
  <div class="container">
    <div>
      <h4 class="headline">
        {{ langlist[$store.state.lang]["학생 계정 관리"] }}
      </h4>
      <span class="text">
        {{
          langlist[$store.state.lang][
            "학생들의 비밀번호를 초기화하거나, 닉네임을 변경할 수 있습니다."
          ]
        }}
      </span>
      <p class="text" style="color: #3d90ef">
        {{ langlist[$store.state.lang]["* 최초 비밀번호 : 000000"] }}
      </p>
    </div>

    <div class="card">
      <div class="flex-horizon_center">
        <h6 class="headline2">
          {{ langlist[$store.state.lang]["학급을 선택해주세요"] }}
        </h6>
        <div @click="classEdit()" class="classselect noselect">
          <div v-show="$store.state.lang === 'ko'">
            <p v-if="isEdit === false">
              {{ currGrade }}학년
              {{
                currClass
              }}반&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼
            </p>
            <p v-if="isEdit === true">
              {{ currGrade }}학년
              {{
                currClass
              }}반&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲
            </p>
          </div>
          <div v-show="$store.state.lang !== 'ko'">
            <p v-if="isEdit === false">
              Grade {{ currGrade }} Class
              {{
                currClass
              }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼
            </p>
            <p v-if="isEdit === true">
              Grade {{ currGrade }} Class
              {{
                currClass
              }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲
            </p>
          </div>
          <div
            v-if="isEdit === true"
            style="
              position: absolute;
              width: 250px;
              left: 0;
              background-color: white;
              border: 1px solid #b9b9b9;
              margin-top: 6px;
              border-radius: 15px;
            "
          >
            <p
              v-show="$store.state.lang === 'ko'"
              class="element"
              @click="elementclick(j)"
              v-for="(j, i) in classes"
              :key="i"
              style="padding: 15px; border-radius: 15px"
            >
              {{ j.grade }}학년 {{ j.classNum }}반
            </p>
            <p
              v-show="$store.state.lang !== 'ko'"
              class="element"
              @click="elementclick(j)"
              v-for="(j, i) in classes"
              :key="i"
              style="padding: 15px; border-radius: 15px"
            >
              Grade {{ j.grade }} Class {{ j.classNum }}
            </p>
          </div>
        </div>
      </div>

      <table>
        <tr>
          <th>
            {{ langlist[$store.state.lang]["번호"] }}
          </th>
          <th>{{ langlist[$store.state.lang]["구분"] }}</th>
          <th>{{ langlist[$store.state.lang]["이름"] }}</th>
          <th>{{ langlist[$store.state.lang]["아이디"] }}</th>
          <th>{{ langlist[$store.state.lang]["닉네임"] }}</th>
          <th>
            {{ langlist[$store.state.lang]["비밀번호 초기화"] }}
          </th>
          <th>
            {{ langlist[$store.state.lang]["닉네임 변경"] }}
          </th>
        </tr>
        <tr v-for="(j, i) in accounts" :key="i">
          <td>
            {{ numpad(j.attendanceNumber) }}
          </td>
          <td>
            {{ j.schoolLevel }}
          </td>
          <td>{{ j.name }}</td>
          <td>{{ j.id }}</td>
          <td style="width: 160px">
            {{ j.nickname || "-" }}
          </td>
          <td>
            <center>
              <div @click="editpwcheck(j, i)" class="pwset"></div>
            </center>
          </td>
          <td>
            <center>
              <div @click="editnickcheck(j, i)" class="nickbtn"></div>
            </center>
          </td>
        </tr>
      </table>
    </div>

    <v-dialog v-model="pwmodal" width="404">
      <div class="modal-wrap">
        <h3 class="modal-title">
          {{ pwtargetname }}
        </h3>
        <div class="modal-content">
          <p>
            {{ langlist[$store.state.lang]["비밀번호를 초기화 하시겠습니까?"] }}
          </p>
        </div>
        <div class="modal-buttons">
          <button @click="cancelpw()" class="cancelbtn">
            {{ langlist[$store.state.lang]["취소"] }}
          </button>
          <button @click="editpw()" class="okbtn">
            {{ langlist[$store.state.lang]["확인"] }}
          </button>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="pwmodalsuccess" width="404">
      <div class="modal-wrap">
        <h3 class="modal-title">
          {{ pwtargetname }}
        </h3>

        <div class="modal-content">
          <h6>
            {{ langlist[$store.state.lang]["비밀번호 변경 완료!"] }}
          </h6>
          <p>
            {{ langlist[$store.state.lang]["'000000'으로 로그인 후,"] }}
          </p>
          <p>
            {{ langlist[$store.state.lang]["새로운 비밀번호를 설정해주세요."] }}
          </p>
        </div>
        <div class="modal-buttons">
          <button @click="pwsuccesscheck()" class="okbtn">
            {{ langlist[$store.state.lang]["확인"] }}
          </button>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="nickmodal" width="404">
      <div class="modal-wrap">
        <h3 class="modal-title">
          {{ langlist[$store.state.lang]["닉네임 변경"] }}
        </h3>
        <div class="modal-content">
          <input
            v-model="targetnicknick"
            type="text"
            maxlength="8"
            class="nickinput"
            spellcheck="false"
            autofocus
            :placeholder="
              langlist[$store.state.lang]['* 영문/국문/숫자 가능 (8자리 이하)']
            "
          />
          <span
            :class="{
              nickcommontext: nickerror === false && nicksuccess === false,
              nickcheckfail: nickerror === true && nicksuccess === false,
              nickchecksuccess: nickerror === false && nicksuccess === true,
            }"
          >
            {{ nicktext[$store.state.lang] }}
          </span>
        </div>
        <div class="modal-buttons">
          <button @click="cancelnick()" class="cancelbtn">
            {{ langlist[$store.state.lang]["취소"] }}
          </button>
          <button @click="checknick()" class="okbtn">
            {{ langlist[$store.state.lang]["확인"] }}
          </button>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="nicksuccessmodal" width="404">
      <div class="modal-wrap">
        <h3>
          {{ accounts[nicktargetidx].name }}
        </h3>

        <div class="modal-content">
          <h6>
            {{ langlist[$store.state.lang]["닉네임 변경 완료!"] }}
          </h6>
          <p>'{{ targetnicknick }}'</p>
          <p>
            {{
              langlist[$store.state.lang][
                "앱 재실행 시 변경된 닉네임으로 적용됩니다."
              ]
            }}
          </p>
        </div>
        <div class="modal-buttons">
          <button @click="nicksuccessmodalcheck()" class="okbtn">
            {{ langlist[$store.state.lang]["확인"] }}
          </button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { classlist, passwordinit, modify_nickname } from "../../api/api-list";
import { settingclasslist } from "../../api/api-list-2.js";
import { badword } from "../../assets/badWord.json";

import { setting_manage_ko } from "../../assets/translate/ko";
import { setting_manage_vt } from "../../assets/translate/vt";

export default {
  async created() {
    const res = await classlist();
    const classes = res.data.data.classList;

    for (let i = 0; i < classes.length; i++) {
      if (classes[i].length) {
        this.currGrade = i + 3;
        this.currClass = classes[i][0];
        break;
      }
    }

    for (let i = 0; i < classes.length; i++) {
      for (let j = 0; j < classes[i].length; j++) {
        this.classes.push({
          grade: i + 3,
          classNum: classes[i][j],
        });
      }
    }

    if (this.classes.length) {
      const res2 = await settingclasslist(this.classes[0]);
      this.accounts = res2.data.data;
      this.accounts = this.accounts.sort(
        (a, b) => a.attendanceNumber - b.attendanceNumber
      );
    }
  },
  data() {
    return {
      langlist: {
        ko: setting_manage_ko,
        vt: setting_manage_vt,
      },
      targetnicknick: "",
      accounts: [],
      isEdit: false,
      classes: [],
      currGrade: 0,
      currClass: 0,
      pwtargetname: "",
      pwtargetidx: "",
      pwmodal: false,
      pwmodalsuccess: false,
      nickmodal: false,
      nicktargetidx: "",
      nicktargetname: "",
      targetnick: "",
      nickerror: false,
      nicksuccess: false,
      nicktext: {
        ko: "변경할 닉네임을 형식에 맞게 입력해주세요.",
        vt: "Vui lòng nhập biệt danh mới theo đúng định dạng.",
      },
      nicksuccessmodal: false,
      successnick: "",
    };
  },
  methods: {
    numpad(n) {
      return n.toString().padStart(2, "0");
    },
    classEdit() {
      this.isEdit = !this.isEdit;
    },
    async elementclick(j) {
      this.currGrade = j.grade;
      this.currClass = j.classNum;

      const data = { grade: j.grade, classNum: j.classNum };
      const res = await settingclasslist(data);
      this.accounts = res.data.data;
      this.accounts = this.accounts.sort(
        (a, b) => a.attendanceNumber - b.attendanceNumber
      );
    },
    editpwcheck(j, i) {
      this.pwtargetname = j.name;
      this.pwtargetidx = i;
      this.pwmodal = true;
    },
    async editpw() {
      const idx = this.pwtargetidx;
      await passwordinit(this.accounts[idx].id);
      this.pwmodal = false;
      this.pwmodalsuccess = true;
    },
    cancelpw() {
      this.pwmodal = false;
      this.pwtargetname = "";
      this.pwtargetidx = "";
    },
    editnickcheck(j, i) {
      this.nickmodal = true;
      this.nicktargetname = j.name;
      this.nicktargetidx = i;
    },
    async checknick() {
      const idx = this.nicktargetidx;
      if (!this.targetnicknick) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang]["닉네임을 입력해주세요."],
              ],
            },
          })
        );

        return;
      }

      if (badword.includes(this.targetnicknick)) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "비속어는 사용할 수 없습니다."
                ],
              ],
            },
          })
        );

        return;
      }

      const nick_temp = this.accounts.map((item) => item.nickname);
      const nicknames = nick_temp.filter((item) => item !== null);

      if (nicknames.includes(this.targetnicknick)) {
        window.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              status: true,
              text: [
                this.langlist[this.$store.state.lang][
                  "중복된 닉네임은 사용할 수 없습니다."
                ],
              ],
            },
          })
        );

        return;
      }

      this.nickmodal = false;

      await modify_nickname({
        userId: this.accounts[idx].id,
        nickname: this.targetnicknick,
      });
      this.accounts[idx].nickname = this.targetnicknick;
      this.nicksuccessmodal = true;
    },
    async editnick() {
      // const idx = this.nicktargetidx;
      // await modify_nickname({
      //   userId: this.accounts[idx].id,
      //   nickname: this.targetnicknick,
      // });
      // this.nicksuccessmodal = false;
    },
    cancelnick() {
      this.nickmodal = false;
      this.targetnicknick = "";
      this.nicktargetidx = "";
    },
    pwsuccesscheck() {
      this.pwmodalsuccess = false;
    },
    nicksuccessmodalcheck() {
      this.nicksuccessmodal = false;
      this.targetnicknick = "";
    },
  },
  watch: {
    targetnicknick(value) {
      const regex = /^[a-zA-Z가-힣0-9]*$/;

      if (!regex.test(value)) {
        this.targetnicknick = value.slice(0, -1);
      }

      if (value.length > 8) {
        this.targetnicknick = value.slice(0, 8);
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
  max-height: 1000px;
  overflow-y: scroll;
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

.classselect {
  position: relative;
  min-width: 250px;
  height: 40px;
  padding: 5px 16px;
  border: 1px solid #b8b8b8;
  border-radius: 100px;
  cursor: pointer;
  margin-left: 10px;

  p {
    font-size: 16px;
  }
}

.pwset {
  width: 40px;
  height: 40px;
  background-image: url("../../assets/image/pwsetbtn.png");
  background-size: 100%;
  cursor: pointer;
}

.nickbtn {
  width: 40px;
  height: 40px;
  background-image: url("../../assets/image/nickbtn.png");
  background-size: 100%;
  cursor: pointer;
}

.element {
  z-index: 8899;
}

.element:hover {
  background-color: rgb(240, 240, 240);
}

.cancelbtn:hover {
  filter: brightness(0.8);
}

.okbtn:hover {
  filter: brightness(0.8);
}

.nickinput {
  width: 100%;
  padding: 7px;
  border: 1px solid #c9c9c9;
  border-radius: 30px;
  font-size: 16px;
  text-align: center;
}

.nickcommontext {
  color: black;
}

.nickchecksuccess {
  color: #3d90ef;
}

.nickcheckfail {
  color: #f23a3a;
}

.modal-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 18px;
  padding: 28px 40px;
  background-color: white;
  border-radius: 10px;
}

.modal-title {
  width: 100%;
  font-family: notosans;
  font-size: 24px;
}

.modal-content {
  width: 100%;
  padding: 15px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  h6 {
    font-family: "notosans";
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }

  span {
    font-size: 14px;
    color: #525252;
    font-family: "notosans";
  }
}

.modal-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  > button {
    width: 130px;
    padding: 10px;
    text-align: center;
    font-size: 16px;
    font-family: notosansmedium;
    border-radius: 10px;
  }

  .cancelbtn {
    background: white;
    border: 1px solid #3d90ef;
    color: #3d90ef;
  }

  .okbtn {
    background: #3d90ef;
    color: #fff;
  }
}
</style>
