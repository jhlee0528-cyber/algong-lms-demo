<template>
  <div style="width: 1280px; margin: 0 auto; padding-top: 100px">
    <div style="display: flex; justify-content: start; gap: 30px">
      <settingSideMenu></settingSideMenu>
      <div>
        <mypage v-if="$store.state.settingpage === 0"></mypage>
        <contractInfo v-if="$store.state.settingpage === 1"></contractInfo>
        <manageStudent v-if="$store.state.settingpage === 2"></manageStudent>
        <addTransfer v-if="$store.state.settingpage === 3"></addTransfer>
        <ssomanage v-if="$store.state.settingpage === 4"></ssomanage>
        <studentInfoEdit v-if="$store.state.settingpage === 5 && payPlan === 'b'"></studentInfoEdit>
        <classEdit v-if="$store.state.settingpage === 6 && payPlan === 'b'"></classEdit>
      </div>
    </div>
  </div>
</template>

<script>
import settingSideMenu from "../../components/setting/settingSideMenu.vue";
import contractInfo from "../../components/setting/contractInfo.vue";
import manageStudent from "../../components/setting/manageStudent.vue";
import addTransfer from "../../components/setting/addTransfer.vue";
import mypage from "../../components/setting/mypage.vue";
import ssomanage from "../../components/setting/ssoManage.vue";
import studentInfoEdit from "../../components/setting/studentInfoEdit.vue";
import classEdit from "../../components/setting/classEdit.vue";
import { userInfo } from "../../api/api-list";

export default {
  components: {
    settingSideMenu,
    contractInfo,
    manageStudent,
    addTransfer,
    mypage,
    ssomanage,
    studentInfoEdit,
    classEdit,
  },
  async created() {
    const res = await userInfo();
    this.payPlan = res.data.data.payPlan;
  },
  data() {
    return {
      payPlan: "",
    };
  },
};
</script>

<style></style>
