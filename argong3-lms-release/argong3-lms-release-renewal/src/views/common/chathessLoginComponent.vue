<template>
  <div>
    <div
      style="position: absolute; margin-top: 300px; margin-left: 210px"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import { getChathessAuth } from "../../api/api-list-2";
import { deleteCookie, nonSaveCookie } from "../../store/cookie";

export default {
  async created() {
    this.$store.state.loading = true;

    const code = atob(this.$route.query.code);

    // const res = await getChathessAuth(key);

    // const { token, isAgree } = res.data.data;
    // const data = token;

    nonSaveCookie("info2", code);

    const res4 = await axios.get(
      `${process.env.VUE_APP_CONNECT}/users/get/agreement/lms`,
      {
        credentials: true,
        headers: {
          Authorization: code,
        },
      }
    );

    const isAgree = res4.data.data;

    sessionStorage.setItem("isAgree", isAgree);

    //같은 플로우 처리

    const res2 = await axios.get(`${process.env.VUE_APP_CONNECT}/users`, {
      credentials: true,
      headers: {
        Authorization: code,
      },
    });

    let level = "master";

    if (res2.data.data.schoolLevel !== "-") {
      level = res2.data.data.schoolLevel;
    }

    const res3 = await axios.get(
      `${process.env.VUE_APP_CONNECT}/lms/get/step/${level}`,
      {
        credentials: true,
        headers: {
          Authorization: code,
        },
      }
    );

    sessionStorage.setItem("masterlevel", res3.data.data);

    const schoolCode = res2.data.data.schoolCode;
    const schoolLevel = res2.data.data.schoolLevel;

    let restrictNum = 0;
    if (schoolLevel === "master") {
      restrictNum = 6;
    }

    if (schoolLevel === "eng") {
      restrictNum = 3;
    }

    if (schoolLevel === "lms") {
      restrictNum = 2;
    }

    if (
      schoolCode === "-" ||
      parseInt(res3.data.data) < restrictNum ||
      schoolLevel === "-"
    ) {
      if (schoolCode !== "-" && schoolLevel !== "-") {
        this.$store.state.loading = false;

        sessionStorage.setItem("firstLogin", "temp");
        sessionStorage.setItem("temp", code);
        sessionStorage.setItem("cool", true);

        this.$router.replace({ path: "/learning/status" });

        return;
      }

      if (res3.data.data > 1 && res3.data.data < restrictNum) {
        this.$store.state.loading = false;

        sessionStorage.setItem("firstLogin", "temp");
        sessionStorage.setItem("temp", code);
        sessionStorage.setItem("cool", true);

        this.$router.replace({ path: "/learning/status" });

        return;
      } else {
        this.$store.state.loading = false;

        sessionStorage.setItem("firstLogin", true);
        sessionStorage.setItem("temp", code);
        sessionStorage.setItem("cool", true);

        this.$router.replace({ path: "/learning/status" });

        return;
      }
    } else {
      // 로그인 처리

      // sessionStorage.setItem("firstLogin", false);
      // sessionStorage.setItem("temp", data);

      this.$store.state.loading = false;

      nonSaveCookie("info", code);
      deleteCookie("info2");
      this.$store.state.token = code;

      this.$router.replace({ path: "/learning/status" });
      return;
    }
  },
};
</script>

<style>
</style>