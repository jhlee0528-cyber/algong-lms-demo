<template>
  <div
    style="
      margin-top: 15px;
      margin-left: 10px;
      font-family: notosans;
      font-size: 25px;
    "
  >
    <span style="color: #3d90ef">{{
      String(contents[0].unit).padStart(2, "0")
    }}</span>
    <span style="margin-left: 5px">{{ contents[0].unitName }}</span>
  </div>
  <WrapContent style="margin-top: 20px">
    <div class="inner">
      <div class="flex-center-between">
        <div>
          <h4 class="headline2">{{ contents[0].category }}</h4>
        </div>
      </div>
      <div class="divUnderline"></div>
      <div class="flex-center-between">
        <div>
          <h4 class="headline2" style="color: #3d90ef; float: left">
            학습 단어
          </h4>
          <p style="float: left; margin-left: 15px">
            {{ contents[0].words.join(" / ") }}
          </p>
        </div>
      </div>
      <div class="divUnderline"></div>
      <div class="flex-center-between">
        <div>
          <h4 class="headline2" style="color: #3d90ef; float: left">
            문장 패턴
          </h4>
          <p style="float: left; margin-left: 15px">
            {{ contents[0].sentences.join(" / ") }}
          </p>
        </div>
      </div>
      <div class="divUnderline"></div>
      <div class="flex-center-between">
        <div>
          <h4 class="headline2" style="color: #3d90ef; float: left">
            학습 목표
          </h4>
          <p style="float: left; margin-left: 15px">
            {{ contents[0].purpose }}
          </p>
        </div>
      </div>
    </div>
  </WrapContent>
  <WrapContent style="margin-top: 20px">
    <div class="inner">
      <div class="flex-center-between">
        <div>
          <h4 class="headline2">상세 학습 콘텐츠</h4>
        </div>
      </div>
      <div class="contentsDiv" v-for="(j, i) in contents" :key="i">
        <div class="contentDivTitle">
          <p style="padding: 15px; font-family: notosans; padding-left: 20px">
            {{ j.lesson }}차시: {{ j.module }}
          </p>
        </div>
        <div style="width: 100%; height: 60%">
          <p style="margin-top: 10px; margin-left: 20px; float: left">
            {{ j.time }}
          </p>
          <v-btn
            @click="render(j.route)"
            variant="outlined"
            width="120"
            style="
              float: right;
              background-color: #258bff;
              color: white;
              font-size: 17px;
              border-radius: 10px;
              height: 45px;
              font-family: notosans;
              margin-top: 20px;
              margin-right: 20px;
            "
            >학습하기</v-btn
          >
        </div>
      </div>
    </div>
  </WrapContent>
  <v-dialog v-model="modal" width="1200">
    <div style="width: 1200px; height: 1000px; background-color: white">
      <iframe :src="url" frameborder="0"></iframe>
    </div>
  </v-dialog>
</template>

<script>
import WrapContent from "../common/WrapContent.vue";

export default {
  props: {
    contents: {
      type: Array,
    },
  },
  components: {
    WrapContent,
  },
  data() {
    return {
      url: "",
      modal: false,
    };
  },
  created() {},
  methods: {
    render(route) {
      const url = `${process.env.VUE_APP_SMARTREE_URL}${route}`;
      //sessionStorage.setItem("smartree-url", url);
      window.open(url);
      // this.url = url;
      // this.modal = true;
      //window.open(url);
    },
  },
  watch: {},
};
</script>

<style scoped>
.inner {
  width: 100%;
  min-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.divUnderline {
  width: 99.8%;
  margin-left: 0.1%;
  height: 1px;
  background-color: #e8e8e8;
}
.contentsDiv {
  width: 99.5%;
  margin-left: 0.25%;
  height: 150px;
  border-radius: 15px;
  border: 1px solid #cae3ff;
}
.contentDivTitle {
  width: 100%;
  height: 40%;
  background-color: #eaf4ff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-size: 18px;
}
</style>
