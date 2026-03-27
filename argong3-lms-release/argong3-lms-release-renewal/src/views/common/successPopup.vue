<template>
  <div class="errordiv">
    <div class="errorimg"></div>
    <div class="errortext">
      <p v-for="(j, i) in successtext" :key="i" style="padding: 3px">
        {{ successtext[i] }}
      </p>
    </div>
    <v-btn
      v-show="$store.state.lang === 'ko'"
      @click="ok()"
      width="120"
      height="50"
      variant="outlined"
      class="okbtn"
      >확인</v-btn
    >
    <v-btn
      v-show="$store.state.lang !== 'ko'"
      @click="ok()"
      width="120"
      height="50"
      variant="outlined"
      class="okbtn"
      >OK</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    successtext: {
      type: Array,
    },
  },
  methods: {
    ok() {
      const event = new CustomEvent("success", {
        detail: {
          status: false,
          text: [],
        },
      });

      window.dispatchEvent(event);
    },
  },
};
</script>

<style scoped>
.errordiv {
  width: 550px;
  height: 360px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  font-family: notosanslight;
  font-weight: bold;
  border-radius: 15px;
}

.errorimg {
  background-image: url("../../assets/image/iconcheck.png");
  background-size: cover;
  width: 65px;
  height: 65px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
}

.errortext {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  width: 100%;
  text-align: center;
  color: black;
}

.okbtn {
  background-color: #3d90ef;
  color: white;
  position: absolute;
  bottom: -2%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  border-radius: 30px;
  font-family: notosansregular;
}
</style>