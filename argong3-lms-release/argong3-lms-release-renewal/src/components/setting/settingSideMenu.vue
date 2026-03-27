<template>
  <div class="side-menu">
    <div class="wrap profile">
      <div v-show="accountlevel === 'master'" class="masterimg"></div>
      <div class="infoimg"></div>
      <div>
        <h6 class="headline">
          {{ schoolinfo.schoolName }}
          {{ langlist[$store.state.lang]["초등학교"] }}
        </h6>
        <p class="body1" style="padding-top: 4px">
          {{ info.name }} {{ langlist[$store.state.lang]["선생님"] }}
        </p>
      </div>
      <v-btn
        @click="gopage(0)"
        variant="outlined"
        width="210"
        height="45"
        class="infoeditbtn"
        >{{ langlist[$store.state.lang]["내정보 수정"] }}</v-btn
      >
    </div>
    <div class="wrap menu">
      <div
        @click="gopage(1)"
        :class="{
          gobtn: $store.state.settingpage !== 1,
          gobtnselected: $store.state.settingpage === 1,
        }"
      >
        <p>
          {{ langlist[$store.state.lang]["계약 정보"] }}
        </p>
      </div>
      <div
        v-show="ssoflag === true"
        @click="gopage(4)"
        :class="{
          gobtn: $store.state.settingpage !== 4,
          gobtnselected: $store.state.settingpage === 4,
        }"
      >
        <p>SSO 가입</p>
      </div>
      <div
        @click="gopage(2)"
        :class="{
          gobtn: $store.state.settingpage !== 2,
          gobtnselected: $store.state.settingpage === 2,
        }"
      >
        <p>
          {{ langlist[$store.state.lang]["알공 계정 관리"] }}
        </p>
      </div>
      <div
        v-show="ssoflag === false"
        @click="gopage(3)"
        :class="{
          gobtn: $store.state.settingpage !== 3,
          gobtnselected: $store.state.settingpage === 3,
        }"
      >
        <p>
          {{ langlist[$store.state.lang]["전학생 추가"] }}
        </p>
      </div>
      <div
        v-show="payPlan === 'b'"
        @click="gopage(5)"
        :class="{
          gobtn: $store.state.settingpage !== 5,
          gobtnselected: $store.state.settingpage === 5,
        }"
      >
        <p>학생 정보 수정</p>
      </div>
      <div
        v-show="payPlan === 'b'"
        @click="gopage(6)"
        :class="{
          gobtn: $store.state.settingpage !== 6,
          gobtnselected: $store.state.settingpage === 6,
        }"
      >
        <p>담당 학급 수정</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSSORestrict, teacherinfo } from "../../api/api-list-2";
import { userInfo } from "../../api/api-list";

import { setting_side_ko } from "../../assets/translate/ko";
import { setting_side_vt } from "../../assets/translate/vt";

export default {
  async created() {
    const res = await teacherinfo();
    const res2 = await userInfo();

    this.info = res.data.data;
    this.schoolinfo = res2.data.data;
    this.accountlevel = res2.data.data.schoolLevel;
    this.payPlan = res2.data.data.payPlan;

    const res3 = await getSSORestrict(this.schoolinfo.schoolCode);

    if (res3.data.data === -1) {
      this.ssoflag = false;
    } else {
      this.ssoflag = true;
      const sso = sessionStorage.getItem("sso");
      sessionStorage.removeItem("sso");

      if (sso) {
        this.gopage(4);
      }
    }
  },
  data() {
    return {
      langlist: {
        ko: setting_side_ko,
        vt: setting_side_vt,
      },
      info: "",
      schoolinfo: "",
      accountlevel: "",
      ssoflag: true,
      payPlan: "",
    };
  },
  methods: {
    gopage(num) {
      // if (num === 3) {
      //   window.dispatchEvent(
      //     new CustomEvent("success", {
      //       detail: {
      //         status: true,
      //         text: ["준비 중인 기능입니다."],
      //       },
      //     })
      //   );
      //   return;
      // }
      this.$store.state.settingpage = num;
    },
  },
};
</script>

<style scoped>
.side-menu {
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.wrap {
  width: 233px;
  border-radius: 20px;
  padding: 20px 16px;
  background: #fff;
}
.profile {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.menu > div {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 14px;

  p {
    font-family: notosans;
    font-size: 18px;
  }
}

.infoimg {
  background-image: url("../../assets/image/settinginfoicon.png");
  background-size: 100%;
  width: 70px;
  height: 70px;
  margin-top: 14px;
}

.infoeditbtn {
  border-radius: 14px;
  color: #3480d8;
  font-family: notosans;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #3d90ef;
}

.gobtn {
  background-color: white;
  color: gray;
}

.gobtnselected {
  background-color: #eaf4ff;
  color: #3d90ef;
}

.masterimg {
  width: 60px;
  height: 25px;
  background-image: url("../../assets/image/master.png");
  background-size: 100%;
}
</style>
