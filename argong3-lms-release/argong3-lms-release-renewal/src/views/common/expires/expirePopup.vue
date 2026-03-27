<template>
  <div>
    <freeExpirePopup v-if="$store.state.expire.type === 1"></freeExpirePopup>
    <subExpireTodayPopup
      v-if="$store.state.expire.type === 2"
    ></subExpireTodayPopup>
    <subExpireWeekPopup
      v-if="$store.state.expire.type === 3 && $store.state.expire.diff === 14"
    ></subExpireWeekPopup>
  </div>
</template>

<script>
import freeExpirePopup from "./freeExpirePopup.vue";
import subExpireTodayPopup from "./subExpireTodayPopup.vue";
import subExpireWeekPopup from "./subExpireWeekPopup.vue";

export default {
  components: {
    freeExpirePopup,
    subExpireTodayPopup,
    subExpireWeekPopup,
  },
};
</script>

<style>
</style>