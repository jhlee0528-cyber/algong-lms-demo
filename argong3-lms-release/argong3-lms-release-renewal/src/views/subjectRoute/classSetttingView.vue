<template>
  <div>
    <ConversationSettingView
      v-if="$store.state.currentSubject === 'eng'"
    ></ConversationSettingView>
    <ConversationSettingView2
      v-if="$store.state.currentSubject === 'math'"
    ></ConversationSettingView2>
  </div>
</template>

<script>
import ConversationSettingView from "../class_settings/ConversationSettingView.vue";
import ConversationSettingView2 from "../_mathPage/class_settings/ConversationSettingView.vue";

export default {
  components: {
    ConversationSettingView,
    ConversationSettingView2,
  },
};
</script>

<style>
</style>