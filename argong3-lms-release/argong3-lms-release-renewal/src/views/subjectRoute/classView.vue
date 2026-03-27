<template>
  <div>
    <ViewClassView v-if="$store.state.currentSubject === 'eng'"></ViewClassView>
    <ViewClassView2
      v-if="$store.state.currentSubject === 'math'"
    ></ViewClassView2>
  </div>
</template>

<script>
import ViewClassView from "../view_class/ViewClassView.vue";
import ViewClassView2 from "../_mathPage/view_class/ViewClassView.vue";

export default {
  components: {
    ViewClassView,
    ViewClassView2,
  },
};
</script>

<style></style>
