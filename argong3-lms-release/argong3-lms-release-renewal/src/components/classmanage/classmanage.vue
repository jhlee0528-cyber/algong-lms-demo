<template>
  <div class="container" v-if="students.length !== 0">
    <div v-for="(arr, j) in slicestudents().length" :key="j">
      <div class="grid-container">
        <div v-for="(student, i) in slicestudents()[j]" :key="i">
          <classstudent
            :stuinfo="student"
            :missions="targetmissions"
            :completeList="completeList"
            :currentMission="currentMission"
          ></classstudent>
        </div>
      </div>
    </div>
  </div>

  <!-- 스켈레톤 -->
  <div class="container" v-if="students.length === 0">
    <div class="grid-container" v-for="(arr, j) in 2" :key="j">
      <div v-for="(student, i) in 8" :key="i">
        <div class="skeleton-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import classstudent from "./classstudent.vue";
import { userInfo } from "../../api/api-list";

export default {
  async created() {},
  components: {
    classstudent,
  },
  props: {
    students: {
      type: Array,
      required: true,
    },
    playing: {
      required: true,
    },
    targetmissions: {
      required: true,
    },
    completeList: {
      required: true,
    },
    currentMission: {
      required: true,
    },
  },
  methods: {
    setStudents() {
      const students = this.students;
      const playing = this.playing;
      const keys = Object.getOwnPropertyNames(playing);

      for (let i = 0; i < students.length; i++) {
        const id = students[i].id;

        let status = "disconnected";

        for (let j = 0; j < keys.length; j++) {
          if (playing[keys[j]].includes(id)) {
            status = keys[j];
            break;
          }
        }

        students[i].connectStatus = status;
      }

      return students;
    },
    slicestudents() {
      const students = this.setStudents();
      const result = [];
      for (let i = 0; i < students.length; i += 8) {
        const chunk = students.slice(i, i + 8);
        result.push(chunk);
      }
      return result;
    },
  },
};
</script>

<style scoped>
.container {
  width: 1280px;
  min-height: 660px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  height: 100%;
  margin-bottom: 18px;
}

.skeleton-item {
  background-color: rgb(220, 220, 220);
  width: 150px;
  height: 250px;
  border-radius: 15px;
  animation: fadeBackground 1s infinite;
}

@keyframes fadeBackground {
  0% {
    background-color: rgb(220, 220, 220);
  }
  50% {
    background-color: rgb(240, 240, 240);
  }
  100% {
    background-color: rgb(220, 220, 220);
  }
}
</style>
