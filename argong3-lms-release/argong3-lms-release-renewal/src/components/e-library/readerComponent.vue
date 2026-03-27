<template>
  <div style="overflow: hidden; height: 99vh">
    <iframe
      :src="`${url}?${new Date()}`"
      id="gamecontainer"
      allow="camera *;microphone *;clipboard-read; clipboard-write"
      width="100%"
      height="100%"
      frameborder="0"
      style="overflow-x: hidden; overflow-y: hidden"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookCode: sessionStorage.getItem("ebookcode"),
      url: process.env.VUE_APP_EBOOK_READER_URL,
    };
  },
  created() {
    window.addEventListener("message", this.handleBookCode);
  },
  methods: {
    handleBookCode(event) {
      // if (event.data.type === "bookcode") {
      //   this.bookCode = event.data.data;
      // }

      if (event.data.type === "loadComplete") {
        if (!this.bookCode) {
          var interval = setInterval(() => {
            if (this.bookCode) {
              // iframe에 데이터 전송
              const iframe = document.getElementById("gamecontainer");
              iframe.contentWindow.postMessage(
                { type: "bookCode", value: this.bookCode },
                this.url
              );
              clearInterval(interval);
            }
          }, 500);
        } else {
          // iframe에 데이터 전송
          sessionStorage.removeItem("ebookcode");
          const iframe = document.getElementById("gamecontainer");
          iframe.contentWindow.postMessage(
            { type: "bookCode", value: this.bookCode },
            this.url
          );
        }
      }
    },
  },
};
</script>

<style>
</style>