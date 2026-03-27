<template>
  <div>
    <LearningStatusMainView
      v-if="$store.state.currentSubject === 'eng'"
    ></LearningStatusMainView>
    <LearningStatusMainView2
      v-if="$store.state.currentSubject === 'math'"
    ></LearningStatusMainView2>
  </div>
</template>

<script>
import LearningStatusMainView from "../learning_status/LearningStatusMainView.vue";
import LearningStatusMainView2 from "../_mathPage/LearningStatusMainView.vue";

export default {
  components: {
    LearningStatusMainView,
    LearningStatusMainView2,
  },
};
</script>

<style>
</style>