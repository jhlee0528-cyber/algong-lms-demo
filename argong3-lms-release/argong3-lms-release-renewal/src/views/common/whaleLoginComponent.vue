<template>
  <div>
    <div style="position: absolute; margin-top: 300px; margin-left: 210px">
      <v-progress-circular
        size="80"
        indeterminate
        color="gray"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { nonSaveCookie } from "../../store/cookie";

export default {
  data() {
    return {
      code: "",
    };
  },
  async created() {
    this.code = this.$route.params.code;

    // const client_id = process.env.VUE_APP_NAVER_CLIENT_ID;
    // const client_secret = process.env.VUE_APP_NAVER_CLIENT_SECRET;

    // const data = {
    //   grant_type: `authorization_code`,
    //   code: this.code,
    //   client_id,
    //   client_secret,
    // };

    // const result = await axios.post(
    //   `https://auth.worksmobile.com/oauth2/v2.0/token`,
    //   data,
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded", // Content-Type 설정
    //     },
    //   }
    // );
    const token_res = await axios.post(
      `${process.env.VUE_APP_CONNECT}/users/works-token`,
      { code: this.code },
      { credentials: true }
    );

    const res = await axios.post(
      `${process.env.VUE_APP_CONNECT}/users/token/works/lms`,
      {
        code: token_res.data.data,
        schoolCode: "",
      },
      { credentials: true }
    );

    const isAgree = res.data.data.isAgree;

    nonSaveCookie("info2", res.data.data.token);
    sessionStorage.setItem("isAgree", isAgree);

    const res2 = await axios.get(`${process.env.VUE_APP_CONNECT}/users`, {
      credentials: true,
      headers: {
        Authorization: res.data.data.token,
      },
    });

    let level = "master";

    if (res2.data.data.schoolLevel !== "-") {
      level = res2.data.data.schoolLevel;
    }

    if (level === "lms") {
      level = "teacher";
    }

    const res3 = await axios.get(
      `${process.env.VUE_APP_CONNECT}/lms/get/step/${level}`,
      {
        credentials: true,
        headers: {
          Authorization: res.data.data.token,
        },
      }
    );

    sessionStorage.setItem("masterlevel", res3.data.data);

    let restrictNum = 0;

    if (level === "master") {
      restrictNum = 6;
    }

    if (level === "eng") {
      restrictNum = 3;
    }

    if (level === "teacher") {
      restrictNum = 2;
    }

    const schoolCode = res2.data.data.schoolCode;
    const schoolLevel = res2.data.data.schoolLevel;

    if (
      schoolCode === "-" ||
      parseInt(res3.data.data) < restrictNum ||
      schoolLevel === "-"
    ) {
      if (schoolCode !== "-" && schoolLevel !== "-") {
        sessionStorage.setItem("firstLogin", "temp");
        sessionStorage.setItem("temp", res.data.data.token);

        return;
      }

      if (res3.data.data > 1 && res3.data.data < restrictNum) {
        sessionStorage.setItem("firstLogin", "temp");
        sessionStorage.setItem("temp", res.data.data.token);

        return;
      } else {
        sessionStorage.setItem("firstLogin", true);
        sessionStorage.setItem("temp", res.data.data.token);

        return;
      }
    } else {
      // 로그인 처리

      sessionStorage.setItem("firstLogin", false);
      sessionStorage.setItem("temp", res.data.data.token);

      // window.dispatchEvent(
      //   new CustomEvent("whalelogin", {
      //     detail: {
      //       info: res.data.data.token,
      //       isAgree: res.data.data.isAgree,
      //     },
      //   })
      // );
      return;
    }
  },
};
</script>

<style>
</style>