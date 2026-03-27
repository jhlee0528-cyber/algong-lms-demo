<template>
  <MissionEdit :mission-id="$route.params.id" />
</template>

<script>
import MissionEdit from '@/components/classsetting/MissionEdit.vue';

export default {
  name: 'MissionEditView',
  components: {
    MissionEdit
  }
};
</script> 