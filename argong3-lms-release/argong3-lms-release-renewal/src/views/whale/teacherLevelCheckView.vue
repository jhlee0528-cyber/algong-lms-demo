<template>
  <div>
    <div v-if="level === 'master'">
      <masterView :userinfo="userinfo"></masterView>
    </div>
    <div v-if="level === 'eng'">
      <engTeacherView :userinfo="userinfo"></engTeacherView>
    </div>
    <div v-if="level === 'lms'">
      <teacherView :userinfo="userinfo"></teacherView>
    </div>
  </div>
</template>

<script>
import masterView from "./masterView.vue";
import engTeacherView from "./engTeacherView.vue";
import teacherView from "./teacherView.vue";

export default {
  props: {
    level: {
      required: true,
    },
    userinfo: {
      required: true,
    },
  },
  components: {
    masterView,
    engTeacherView,
    teacherView,
  },
};
</script>

<style>
</style>