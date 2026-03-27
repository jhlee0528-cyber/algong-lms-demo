<template>
  <div class="errordiv">
    <div class="inner">
      <div class="errorimg"></div>
      <div class="errortext">
        <p v-for="(j, i) in errortext" :key="i" style="padding: 3px">
          {{ errortext[i] }}
        </p>
      </div>
      <v-btn
        v-show="$store.state.lang === 'ko' && errorClose === true"
        @click="ok()"
        width="156"
        height="48"
        variant="outlined"
        class="okbtn"
        >확인</v-btn
      >
      <v-btn
        v-show="$store.state.lang !== 'ko' && errorClose === true"
        @click="ok()"
        width="156"
        height="48"
        variant="outlined"
        class="okbtn"
        >OK</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errortext: {
      type: Array,
    },
    errorClose: {
      type: Boolean,
    },
  },
  methods: {
    ok() {
      const event = new CustomEvent("error", {
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
  width: 404px;
  height: 100%;
  min-height: 266px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  font-family: notosanslight;
  font-weight: bold;
  border-radius: 15px;
  padding: 20px 40px;
}
.inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  align-items: center;
  justify-content: space-between;
}
.errorimg {
  background-image: url("../../assets/image/iconx.png");
  background-size: cover;
  width: 40px;
  height: 40px;
  /* position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%); */
}

.errortext {
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  font-size: 20px;
  /* width: 550px; */
  /* text-align: center; */
  color: #f23a3a;
}

.okbtn {
  background-color: #3d90ef;
  color: white;
  /* position: absolute;
  bottom: -2%;
  left: 50%;
  transform: translate(-50%, -50%); */
  font-size: 18px;
  border-radius: 10px;
  font-family: notosans;
  border: none;
}
</style>
