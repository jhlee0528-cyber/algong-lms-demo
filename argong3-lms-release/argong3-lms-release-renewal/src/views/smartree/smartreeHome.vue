<template>
  <div class="wrap">
    <div class="inner">
      <aside>
        <div class="card noselect">
          <h5 class="headline3">늘봄학교 파닉스반</h5>

          <div class="btn-wrap">
            <!-- 단원별 콘텐츠 -->
            <div
              @click="setContentsPage(1)"
              class="lessonsetbtn"
              :class="{ clicked: currentPage.startsWith('contents') }"
            >
              <div>
                <h6 class="body1-bold">단원별 콘텐츠</h6>
                <p class="body2">
                  단원의 상세 학습 콘텐츠로 이동할 수 있습니다.
                </p>
              </div>
            </div>

            <!-- 리뷰 테스트 -->
            <div
              @click="setReviewPage(1)"
              class="lessonsetbtn"
              :class="{ clicked: currentPage.startsWith('review') }"
            >
              <h6 class="body1-bold">리뷰 테스트</h6>
              <p class="body2" v-show="$store.state.lang === 'ko'">
                학습 현황에 맞춰 테스트를 진행할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <!-- 단원 선택 -->
        <div
          class="scroll-card noselect"
          v-if="currentPage.startsWith('contents')"
        >
          <div class="title">
            <h5 class="headline3">단원 선택</h5>
            <span class="body2" style="color: #66686b">
              단원별 학습 콘텐츠를 확인할 수 있습니다.
            </span>
          </div>
          <div class="card-content scrollbar">
            <div
              v-for="(j, i) in smartreeUnits['default']"
              :key="i"
              :class="{
                on: route.params.unit === String(j.unit),
              }"
              class="content-btn"
              @click="setContentsPage(j.unit)"
            >
              <p class="headline2" style="margin-top: 10px">
                {{ String(j.unit).padStart(2, "0") }}
              </p>
              <div>
                <p class="body1">
                  {{ j.unitName }}
                </p>
                <p class="body1">{{ j.category }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 리뷰 단원 선택 -->
        <div
          class="scroll-card noselect"
          v-if="currentPage.startsWith('review')"
        >
          <div class="title">
            <h5 class="headline3">테스트 선택</h5>
            <span class="body2" style="color: #66686b">
              중간 / 기말 테스트를 진행할 수 있습니다.
            </span>
          </div>
          <div class="card-content scrollbar">
            <div
              v-for="(j, i) in smartreeReviewContents['default']"
              :key="i"
              :class="{
                on: route.params.unit === String(j.unit),
              }"
              class="content-btn"
              @click="setReviewPage(j.unit)"
            >
              <p class="headline2" style="margin-top: 10px">
                {{ String(j.unit).padStart(2, "0") }}
              </p>
              <div>
                <p class="body1">
                  {{ j.title }}
                </p>
                <p class="body1">{{ j.range }}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section class="content-view">
        <lessonContents
          v-if="currentPage.startsWith('contents')"
          :contents="contentsInfo"
        ></lessonContents>
        <reviewContents
          v-if="currentPage.startsWith('review')"
          :contents="reviewContentsInfo"
        ></reviewContents>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";

import lessonContents from "../../components/smartree/lessonContents.vue";
import reviewContents from "../../components/smartree/reviewContents.vue";
import * as smartreeContents from "../../components/smartree/smartreeContents.json";
import * as smartreeUnits from "../../components/smartree/smartreeUnits.json";
import * as smartreeReviewContents from "../../components/smartree/smartreeReviewContents.json";

const router = useRouter();
const route = useRoute();

const currentPage = computed(() => {
  const {
    name: routeName,
    params: { id: studentId },
  } = route;
  return studentId ? `student-${studentId}` : routeName;
});

const contentsInfo = ref([]);
const reviewContentsInfo = ref([]);

const setContentsPage = (unit) => {
  contentsInfo.value = smartreeContents.filter((el) => el.unit === unit);
  router.push({ path: `/smartree/contents/${unit}` });
};

const setReviewPage = (unit) => {
  reviewContentsInfo.value = smartreeReviewContents.filter(
    (el) => el.unit === unit
  );
  router.push({ path: `/smartree/review/${unit}` });
};

onBeforeMount(() => {
  contentsInfo.value = smartreeContents["default"].filter(
    (el) => el.unit === parseInt(route.params.unit)
  );

  reviewContentsInfo.value = smartreeReviewContents.filter(
    (el) => el.unit === parseInt(route.params.unit)
  );
});

//onMounted(async () => {});
</script>

<style scoped>
.wrap {
  width: 100%;
  padding: 100px 0;
}

.inner {
  min-width: 1400px;
  display: flex;
  justify-content: center;
  gap: 30px;
}

aside {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.card {
  width: 370px;
  padding: 25px 30px;
  background-color: #fff;
  border: 1px solid #cae3ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  .btn-wrap {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}

.scroll-card {
  background-color: #fff;
  border: 1px solid #cae3ff;
  width: 370px;
  height: 610px;
  border-radius: 20px;

  .title {
    padding: 25px 28px;

    p {
      padding-top: 4px;
      color: #66686b;
    }
  }
}

.card-content {
  width: 355px;
  height: 500px;
  overflow-y: scroll;
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-btn {
  width: 304px;
  height: 90px;
  background-color: #fff;
  border: 1px solid #88c0ff;
  border-radius: 14px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  gap: 10px;

  .headline2 {
    color: #3480d8;
  }

  &.on {
    background-color: #258bff !important;
    .headline2,
    p {
      color: #fff;
    }
  }
}
.content-view {
  width: 880px;
}

.lessonsetbtn {
  padding: 20px 14px;
  border: 1px solid #88c0ff;
  border-radius: 16px;
  background-image: url("../../assets/image/unclickedarrow.png");
  background-size: 3%;
  background-position-x: 95%;
  background-position-y: 50%;
  cursor: pointer;

  p {
    margin-top: 10px;
  }
}

.clicked {
  background-color: #258bff;
  border: none;
  background-image: url("../../assets/image/clickedarrow.png");

  h6,
  p {
    color: #fff;
  }
}
.lessonsetbtn h6 {
  color: #3480d8;
}

.beta {
  width: 40px;
  height: 18px;
  background-image: url("../../assets/image/beta.png");
  background-size: 100%;
  float: left;
  margin-left: 10px;
  margin-top: 5px;
}

.unbeta {
  width: 40px;
  height: 18px;
  background-image: url("../../assets/image/beta1.png");
  background-size: 100%;
  float: left;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
