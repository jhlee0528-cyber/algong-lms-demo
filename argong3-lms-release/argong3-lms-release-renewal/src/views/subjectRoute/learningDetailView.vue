<template>
  <div>
    <LearningStatusDetailView
      v-if="$store.state.currentSubject === 'eng'"
    ></LearningStatusDetailView>
    <LearningStatusDetailView2
      v-if="$store.state.currentSubject === 'math'"
    ></LearningStatusDetailView2>
  </div>
</template>

<script>
import LearningStatusDetailView from "../learning_status/LearningStatusDetailView.vue";
import LearningStatusDetailView2 from "../_mathPage/LearningStatusDetailView.vue";

export default {
  components: {
    LearningStatusDetailView,
    LearningStatusDetailView2,
  },
};
</script>

<style>
</style>