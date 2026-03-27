<template>
  <div>
    <div style="margin-right: 160px">
      <div v-for="(j, i) in 3" :key="i" style="float: left" class="noselect">
        <div
          class="leveldiv"
          :class="{
            lastelement: i === 4,
            activate: i + 1 <= level,
          }"
        >
          <p style="padding-top: 5px">{{ i + 1 }}</p>
          <p
            v-show="i === 0"
            style="
              font-size: 16px;
              position: absolute;
              margin-top: 7px;
              margin-left: -25px;
            "
            :class="{
              textactivate: i + 1 <= level,
            }"
          >
            {{ text[i] }}
          </p>
          <p
            v-show="i > 0"
            style="
              font-size: 16px;
              position: absolute;
              margin-top: 7px;
              margin-left: -42px;
            "
            :class="{
              textinactivate: i + 1 > level,
              textactivate: i + 1 <= level,
            }"
          >
            {{ text[i] }}
          </p>
        </div>
        <div
          v-if="i !== 0"
          style="
            width: 150px;
            height: 3px;
            position: absolute;
            margin-top: -22px;
          "
          :class="{
            inactivate: i + 1 > level,
            activate: i + 1 <= level,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      required: true,
    },
  },
  data() {
    return {
      text: ["담당 학급 선택", "교사 알공 계정 생성", "학생 가입 안내 확인"],
    };
  },
};
</script>

<style scoped>
.leveldiv {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #e3e3e3;
  text-align: center;
  font-size: 20px;
  font-family: notosans;
  color: white;
  margin-left: 150px;
}

.lastelement {
  margin-right: 150px;
}

.activate {
  background-color: #3480d8;
}

.inactivate {
  background-color: #e3e3e3;
}

.textactivate {
  color: #3480d8;
}

.textinactivate {
  color: #66686b;
}

.right {
  margin-left: -2px;
  color: #66686b;
}

.rightright {
  margin-left: -42px;
  color: #66686b;
}
</style>