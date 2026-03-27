<template>
  <div style="height: 99vh; width: 100%">
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  created() {
    const interval = setInterval(() => {
      const url = sessionStorage.getItem("smartree-url");
      if (url) {
        this.url = url;
        //sessionStorage.removeItem("smartree-url");
        clearInterval(interval);
      }
    }, 500);
  },
};
</script>

<style>
</style>