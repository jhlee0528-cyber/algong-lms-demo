<template>
  <!-- 과제 미션 관리 -->
  <MissionList
    v-if="currentView === 'list'"
    @create-mission="showCreateMission"
    @show-result="showMissionResult"
    :missions="missions"
  />

  <!-- 신규미션 생성 -->
  <CreateMission
    v-if="currentView === 'create'"
    @back-to-list="showMissionList"
    :students="students"
    :subject="currentSubject"
  />

  <!-- 미션 결과 조회 -->
  <MissionResult
    v-if="currentView === 'result'"
    @back-to-list="showMissionList"
    @edit-mission="showEditMission"
    :subject="currentSubject"
    :mission="selectedMission"
  />

  <!-- 과제 수정 -->
  <MissionEdit
    v-if="currentView === 'edit'"
    @back-to-list="showMissionList"
    :students="students"
    :subject="currentSubject"
    :mission="selectedMission"
  />
</template>

<script>
import MissionList from "./MissionList.vue";
import CreateMission from "./CreateMission.vue";
import MissionResult from "./MissionResult.vue";
import MissionEdit from "./MissionEdit.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getTeacherMissions, getMissionDetail2 } from "@/api/api-list-2";

export default {
  components: {
    MissionList,
    CreateMission,
    MissionResult,
    MissionEdit,
  },
  props: {
    students: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentView = ref("list");
    const currentSubject = computed(() => store.state.currentSubject);
    const missions = ref([]);
    const selectedMission = ref(null);

    onMounted(() => {
      if (
        router.currentRoute.value.query.view === "result" ||
        router.currentRoute.value.query.view === "edit" ||
        router.currentRoute.value.query.view === "create"
      ) {
        router.replace({ query: { view: "list" } });
        selectedMission.value = null;
      }
      fetchMissions();
    });

    watch(
      () => router.currentRoute.value.query,
      (query) => {
        if (
          query.view &&
          ["list", "create", "result", "edit"].includes(query.view)
        ) {
          currentView.value = query.view;
        } else {
          currentView.value = "list";
        }
      },
      { immediate: false }
    );

    const fetchMissions = async () => {
      try {
        const response = await getTeacherMissions();

        if (response.data && response.data.data) {
          const engMissions = response.data.data
            .filter((mission) => mission.subject === "eng")
            .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
          missions.value = engMissions;
        }
      } catch (error) {
        console.error("미션 목록을 가져오는데 실패했습니다:", error);
        missions.value = [];
      }
    };

    const showCreateMission = () => {
      router.push({ query: { view: "create" } });
    };

    const showMissionList = () => {
      router.push({ query: { view: "list" } });
      fetchMissions();
    };

    const showMissionResult = async (mission) => {
      try {
        const response = await getMissionDetail2({
          uid: mission.uid,
          subject: mission.subject,
          users: Array.isArray(mission.students) ? mission.students : [],
        });

        if (response.data && response.data.data) {
          selectedMission.value = {
            ...response.data.data,
            uid: mission.uid,
          };
          router.push({ query: { view: "result" } });
        }
      } catch (error) {
        console.error("미션 상세 정보를 가져오는데 실패했습니다:", error);
      }
    };

    const showEditMission = (mission) => {
      selectedMission.value = mission;
      router.push({ query: { view: "edit" } });
    };

    return {
      currentView,
      currentSubject,
      missions,
      selectedMission,
      showCreateMission,
      showMissionList,
      showMissionResult,
      showEditMission,
    };
  },
};
</script>
