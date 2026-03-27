<template>
  <v-app>
    <v-main class="appdiv">
      <Topmenu
        :lang="$store.state.lang"
        v-if="
          $store.state.token !== '' &&
          $route.path !== '/e-book-reader' &&
          $route.path !== '/login' &&
          $route.path !== '/smartree-viewer' &&
          !$route.path.startsWith('/agreement')
        "
      ></Topmenu>
      <router-view :lang="$store.state.lang" />
      <FooterComponent
        :lang="$store.state.lang"
        v-if="
          $store.state.token !== '' &&
          $route.path !== '/e-book-reader' &&
          $route.path !== '/smartree-viewer' &&
          !$route.path.startsWith('/agreement')
        "
      />
    </v-main>
  </v-app>
  <v-dialog persistent v-model="errormodal">
    <error :errortext="errortext" :errorClose="errorClose"></error>
  </v-dialog>
  <v-dialog persistent v-model="successmodal">
    <success :successtext="successtext"></success>
  </v-dialog>
  <v-dialog persistent v-model="passwordsuccessmodal">
    <passwordSuccess :successtext="passwordsuccesstext"></passwordSuccess>
  </v-dialog>
  <v-dialog width="150" persistent v-model="$store.state.loading">
    <div>
      <v-progress-circular :size="150" indeterminate></v-progress-circular>
    </div>
  </v-dialog>

  <FloatingChatButton
    v-if="
      $store.state.token !== '' &&
      $route.path !== '/login' &&
      $route.path !== '/e-book-reader' &&
      !$route.path.startsWith('/agreement')
    "
    :isOpen="isChatOpen"
    @toggle-chat="toggleChat"
    @update-position="updateButtonPosition"
  />
  <ChatWindow
    :visible="isChatOpen"
    :buttonPosition="buttonPosition"
    :routeId="routeId"
    @close="toggleChat"
  />

  <v-dialog width="400" v-model="$store.state.expire.flag" persistent>
    <expirePopup></expirePopup>
  </v-dialog>
</template>

<script>
import error from "./views/common/errorPopup.vue";
import success from "./views/common/successPopup.vue";
import Topmenu from "./components/common/TopMenu.vue";
import FooterComponent from "./components/common/FooterComponent.vue";
import passwordSuccess from "./views/common/passwordSuccessPopup.vue";
import { maintenance } from "./api/api-list";
import { teacherinfo } from "./api/api-list-2";
import { deleteCookie, saveCookie } from "./store/cookie";
import "./styles/index.scss";
import FloatingChatButton from "./components/common/FloatingChatButton.vue";
import ChatWindow from "./components/common/ChatWindow.vue";
import expirePopup from "./views/common/expires/expirePopup.vue";

export default {
  name: "App",

  async created() {
    // const langinfo = navigator.language;

    // if (langinfo.includes("ko")) {
    //   saveCookie("lang", "ko");
    // } else {
    //   saveCookie("lang", "vt");
    // }

    window.addEventListener("error", this.handleError);
    window.addEventListener("success", this.handleSuccess);
    window.addEventListener("passwordsuccess", this.handlePasswordSuccess);

    try {
      const res_1 = await maintenance();
      if (res_1.data.data === true) {
        let errorEvent = new CustomEvent("error", {
          detail: {
            status: true,
            text: ["서버 점검중입니다."],
          },
        });

        window.dispatchEvent(errorEvent);
        return;
      }
    } catch {
      let errorEvent = new CustomEvent("error", {
        detail: {
          status: true,
          text: ["서버 점검중입니다."],
          close: true,
        },
      });

      window.dispatchEvent(errorEvent);
      return;
    }

    // if (this.$store.state.token) {
    //   const res = await teacherinfo();
    //   if (res.data.result === false) {
    //     deleteCookie("info");
    //     window.location.reload();
    //   }
    // }

    // setInterval(async () => {
    //   if (this.$store.state.token) {
    //     const res = await teacherinfo();
    //     if (res.data.result === false) {
    //       deleteCookie("info");
    //       window.location.reload();
    //     }
    //   }
    // }, 3000);
  },

  mounted() {
    this.loadFont();
  },

  components: {
    error,
    success,
    Topmenu,
    passwordSuccess,
    FooterComponent,
    FloatingChatButton,
    ChatWindow,
    expirePopup,
  },

  data: () => ({
    errormodal: false,
    errortext: [],
    successmodal: false,
    successtext: [],
    passwordsuccessmodal: false,
    passwordsuccesstext: [],
    errorClose: true,
    isChatOpen: false,
    buttonPosition: { top: 0, left: 0 },
    routeId: "",
  }),

  methods: {
    loadFont() {
      const filename = `${window.location.origin}/font/css/fontstyle_${this.$store.state.lang}.css`;

      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(`@import url(${filename});`));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    handleError(event) {
      this.successmodal = false;
      const data = event.detail;
      if (data.status) {
        this.errortext = data.text;
        this.errormodal = true;
        if (data.close) {
          this.errorClose = false;
        } else {
          this.errorClose = true;
        }
      } else {
        this.errormodal = false;
        this.errortext = [];
      }
    },
    handleSuccess(event) {
      this.errormodal = false;
      const data = event.detail;
      if (data.status) {
        this.successtext = data.text;
        this.successmodal = true;
      } else {
        this.successmodal = false;
        this.successtext = [];
      }
    },
    handlePasswordSuccess(event) {
      this.successmodal = false;
      this.errormodal = false;

      const data = event.detail;
      if (data.status) {
        this.passwordsuccesstext = data.text;
        this.passwordsuccessmodal = true;
      } else {
        this.passwordsuccessmodal = false;
        this.passwordsuccesstext = [];
      }
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    updateButtonPosition(pos) {
      this.buttonPosition = pos;
    },
  },
  watch: {
    $route(to, from) {
      this.routeId = to.params.userId;
    },
  },
};
</script>

<style>
.appdiv {
  width: 100%;
  background: #f5f5f5;
  box-sizing: border-box;
}

/* PC 화면 (브라우저 너비가 1400px 이상일 때) */
@media screen and (min-width: 1400px) {
  .appdiv {
    max-width: 100%;
  }
}

/* 모바일/태블릿 화면 (브라우저 너비가 1399px 이하일 때) */
@media screen and (max-width: 1399px) {
  .appdiv {
    width: 100%;
    max-width: 100%;
  }
}
</style>
