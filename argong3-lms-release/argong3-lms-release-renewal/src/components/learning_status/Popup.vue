<template>
  <div v-if="isVisible" class="overlay">
    <div class="popup">
      <div class="popup-content">
        <span class="close" @click="togglePopup">&times;</span>
        <div class="popup-text">
          <h4>안녕하세요 교사님!</h4>
          <p>올 한 해에도 알공을 이용 해주셔서 감사합니다.</p>
          <p>
            지난주 교사님의 설문조사 덕분에
            <span class="bold">알공 수학</span>이 내년에 새롭게 출시될
            예정입니다.
          </p>
          <p>
            수학에도 학생들이 좋아하고, 교사님이 편하게 사용 하실 수 있게
            개발해보도록 노력하겠습니다.
          </p>
          <p>
            아래 설문조사 몇개만 부탁드리며, 작지만 올 한해 잘 마무리 하시길
            바라는 마음에 커피 기프티콘을 준비했습니다.
          </p>
          <p>
            <span class="bold">커피 기프티콘</span>은 설문조사 완료 후 D+7일
            이내에 문자로 전달드릴 예정입니다.
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-grid">
            <SurveyCard
              v-for="(card, index) in surveyData"
              :key="index"
              v-bind="{
                question: card.question,
                options: card.options,
                questionIndex: index,
                selectedRoles: selectedRoles[index],
                isOtherChecked: isOtherChecked[index],
                otherText: otherTexts[index],
                teacherCafeText,
                teacherCommunityText,
                isTeacherCafeChecked,
                isTeacherCommunityChecked,
              }"
              @update:selectedRoles="(val) => updateSelectedRoles(index, val)"
              @update:isOtherChecked="(val) => updateIsOtherChecked(index, val)"
              @update:otherText="(val) => updateOtherTexts(index, val)"
              @update:teacherCafeText="(val) => (teacherCafeText = val)"
              @update:teacherCommunityText="
                (val) => (teacherCommunityText = val)
              "
              @update:isTeacherCafeChecked="
                (val) => (isTeacherCafeChecked = val)
              "
              @update:isTeacherCommunityChecked="
                (val) => (isTeacherCommunityChecked = val)
              "
            />
          </div>

          <button class="submit-button" type="submit">제출하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { popupVote } from "../../api/api-list";
import SurveyCard from "../../components/learning_status/SurveyCard.vue";

export default {
  components: {
    SurveyCard,
  },
  setup() {
    const isVisible = ref(true);
    const surveyData = ref([
      {
        question: "1. 알공을 어떻게 처음 알게되셨나요? (복수 선택가능)",
        options: [
          {
            title: "검색엔진",
            options: ["네이버", "구글", "S2B", "G2B"],
          },
          {
            title: "SNS",
            options: ["인스타그램", "페이스북", "유튜브", "틱톡"],
          },
          {
            title: "온라인 커뮤니티/카페",
            options: ["교직원 카페", "교사 커뮤니티", "오픈카톡"],
          },
          {
            title: "지인 추천",
            options: [
              "동료교사",
              "AI 에듀테크 담당자",
              "연구부장",
              "지역 출판사",
            ],
          },
          {
            title: "교육청 공문",
            options: ["AI에듀테크 예산", "영어교과 운영비", "일반 수용비"],
          },
          {
            title: "박람회",
            options: ["교육 박람회", "에듀테크 박람회", "해당 없음"],
          },
        ],
      },
      {
        question: "2. 어떤 검색어로 알공을 찾아보셨나요? (복수 선택가능)",
        options: [
          "알공",
          "AI 에듀 테크",
          "AI 영어 학습",
          "메타버스 학습",
          "초등 영어 공부",
          "기타 (주관식)",
          "해당 없음",
        ],
      },
      {
        question: "3. 알공 수학이 출시된다면 어떤 상품을 선호하시나요?",
        options: ["알공 수학만 사용 희망", "알공 영어+수학 사용 희망", "알공 영어만 사용 희망"],
      },
      {
        question:
          "4. 알공을 주변에 추천해 주신적 있으실까요? 있다면 어떤 이유실까요? (복수 선택가능)",
        options: [
          "학생들이 재밌어해서",
          "동료 교사가 추천해줘서",
          "교과 기반이라 수업에 도움이 된다고 해서",
          "교사가 사용하기 편리해서",
          "오류 및 CS 소통이 빠르다고 해서",
          "행정 처리가 빠르다고 해서",
          "추천해준 적 없음",
          "기타 (주관식)",
        ],
      },
      {
        question:
          "5. 가장 자주 접한 알공 관련 콘텐츠는 무엇인가요? (복수 선택가능)",
        options: [
          "카톡 오픈채팅",
          "블로그/카페 글",
          "유튜브 영상",
          "SNS 게시물 (인스타그램, 페이스북 등)",
          "온라인 광고 (검색 광고, 배너 광고 등)",
          "기타 (주관식)",
          "해당 없음",
        ],
      },
    ]);

    const selectedRoles = ref(Array(surveyData.value.length).fill([]));
    const isOtherChecked = ref(Array(surveyData.value.length).fill(false));
    const otherTexts = ref(Array(surveyData.value.length).fill(""));
    const teacherCafeText = ref("");
    const teacherCommunityText = ref("");
    const isTeacherCafeChecked = ref(false);
    const isTeacherCommunityChecked = ref(false);

    const togglePopup = () => (isVisible.value = !isVisible.value);

    const handleSubmit = async () => {
      if (selectedRoles.value.some((roles) => roles.length === 0)) {
        alert("모든 항목에 답변을 입력해주세요.");
        return;
      }

      const data = selectedRoles.value.reduce((acc, answers, index) => {
        acc[`question${index + 1}`] = answers.map((item) => {
          if (item === "기타 (주관식)" && otherTexts.value[index]) {
            return otherTexts.value[index];
          }
          if (item === "교직원 카페" && teacherCafeText.value) {
            return `교직원 카페: ${teacherCafeText.value}`;
          }
          if (item === "교사 커뮤니티" && teacherCommunityText.value) {
            return `교사 커뮤니티: ${teacherCommunityText.value}`;
          }
          return item;
        });
        return acc;
      }, {});

      // console.log('data', data)

      try {
        const response = await popupVote(data);
        if (response && response.data) {
          alert(
            "설문이 성공적으로 제출되었습니다.\n기프티콘은 7일 이내에 문자로 발송됩니다."
          );
          togglePopup();
        } else {
          throw new Error("서버 응답 오류");
        }
      } catch (error) {
        console.error("설문 제출 중 오류 발생:", error);
      }
    };

    const updateSelectedRoles = (index, value) =>
      (selectedRoles.value[index] = value);
    const updateIsOtherChecked = (index, value) =>
      (isOtherChecked.value[index] = value);
    const updateOtherTexts = (index, value) =>
      (otherTexts.value[index] = value);

    return {
      isVisible,
      surveyData,
      togglePopup,
      isOtherChecked,
      selectedRoles,
      otherTexts,
      handleSubmit,
      teacherCafeText,
      teacherCommunityText,
      isTeacherCafeChecked,
      isTeacherCommunityChecked,
      updateSelectedRoles,
      updateIsOtherChecked,
      updateOtherTexts,
    };
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99998;
}
.popup {
  position: fixed;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  color: #222;
  z-index: 99999;
  background: #f1f8ff;
  border-radius: 16px;
}
.popup::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.popup::-webkit-scrollbar-thumb {
  background-color: #cae3ff;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
.popup::-webkit-scrollbar-track {
  background: transparent;
  margin: 10px 0;
}
.popup-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  min-height: min-content;
}
.close {
  cursor: pointer;
  display: block;
  position: absolute;
  top: 40px;
  right: 40px;
  font-size: 24px;
}
.popup-text {
  height: 180px;
  text-align: left;
  line-height: 1.6rem;
}
.popup-text h4 {
  font-size: 20px;
  margin-bottom: 20px;
}
.popup-text .bold {
  font-weight: 700;
  color: #598ff3;
}
.form-grid {
  width: 100%;
  display: grid;
  grid-template-areas:
    "area1 area2"
    "area1 area3"
    "area4 area5";
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}
.card:nth-child(1) {
  grid-area: area1;
  height: 100%;
}
.card:nth-child(2) {
  grid-area: area2;
}
.card:nth-child(3) {
  grid-area: area3;
}
.card:nth-child(4) {
  grid-area: area4;
}
.card:nth-child(5) {
  grid-area: area5;
}
.submit-button {
  width: 26%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: none;
  padding: 0.6rem;
  border-radius: 20px;
  font-size: 16px;
  color: #fff;
  background: #598ff3;
  cursor: pointer;
  font-weight: 700;
}
.submit-button:hover {
  background: #244a91;
}
</style>
