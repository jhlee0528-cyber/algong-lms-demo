<template>
  <div></div>
</template>

<script>
export default {
  created() {
    if (this.$store.state.token) {
      window.sessionStorage.setItem("page", "1");
      this.$router.replace("/learning/status");
    } else {
      this.$router.replace("/login");
    }
  },
};
</script>

<style>
</style>