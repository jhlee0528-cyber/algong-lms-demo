<script setup lang="ts">
import Layout from './components/common/Layout.vue'
import BottomNav from './components/common/BottomNav.vue'
</script>

<template>
  <Layout studyRoomName="알공 공부방">
    <router-view />
    <BottomNav />
  </Layout>
</template>
