<template>
  <div>
    <div
      @click="
        {
          langflag = !langflag;
        }
      "
      class="noselect"
      style="
        width: 150px;
        height: 40px;
        background-color: white;
        border-radius: 15px;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        border: 1px solid black;
      "
    >
      <p style="padding-top: 8px">Language setting</p>
    </div>
    <div
      v-show="langflag === true"
      style="
        width: 150px;
        height: 80px;
        background-color: white;
        border-radius: 5px;
        margin-top: 5px;
        text-align: center;
        position: absolute;
      "
    >
      <div
        @click="selectLang('ko')"
        class="noselect langcomponent"
        style="
          width: 100%;
          height: 50%;
          border: 1px solid black;
          cursor: pointer;
          background-color: white;
        "
      >
        <p style="padding-top: 6px">Korean</p>
      </div>
      <div
        @click="selectLang('vt')"
        class="noselect langcomponent"
        style="
          width: 100%;
          height: 50%;
          border: 1px solid black;
          cursor: pointer;
          background-color: white;
        "
      >
        <p style="padding-top: 6px">Vietnamese</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSaveCookie, saveCookie } from "../../store/cookie";

export default {
  data() {
    return {
      langflag: false,
    };
  },
  methods: {
    selectLang(lang) {
      if (getSaveCookie("lang") === lang) {
        return;
      }

      saveCookie("lang", lang);

      location.reload();
    },
  },
};
</script>

<style scoped>
.langcomponent:hover {
  filter: brightness(0.8);
}

.selected {
  filter: brightness(0.8);
}
</style>