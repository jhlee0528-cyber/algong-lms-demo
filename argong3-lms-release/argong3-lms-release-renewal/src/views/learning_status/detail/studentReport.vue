<template>
  <div class="report-wrap flex-column-gap">
    <div class="report-header">
      <h2 class="headline1">
        {{ lessonGraphInfo.name ? lessonGraphInfo.name + ' 학습 성장 리포트' : '학습 성장 리포트' }}
      </h2>
      <button class="btn-parent-report" @click="openReportModal">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="white" />
        </svg>
        학부모 리포트 발송
      </button>
    </div>
    <!-- <v-btn class="printBtn" variant="outlined" width="150" height="50"
        >&nbsp;&nbsp;&nbsp;인쇄하기</v-btn
      > -->

    <!-- AI 종합 분석 결과 -->
    <!-- <WrapContent style="width: 900px; height: 260px">
      <div class="titleBlock">
        <p
          style="
            float: left;
            font-family: notosans;
            color: #3d90ef;
            font-size: 20px;
            margin-top: 15px;
            margin-left: 30px;
          "
        >
          AI 종합 분석 결과
        </p>
        <p
          style="
            float: right;
            color: #88c0ff;
            font-family: notosans;
            font-size: 13px;
            margin-top: 22px;
            margin-right: 20px;
          "
        >
          * 단원별 학습 진행률 50% 이상의 학습 분석 결과입니다.
        </p>
      </div>
      <div>
        <div style="width: 250px; height: 199px; float: left">
          <div class="obi"></div>
          <div
            style="
              float: left;
              margin-top: 50px;
              width: 130px;
              height: 130px;
              text-align: center;
              margin-left: 10px;
            "
          >
            <p style="font-family: notosans; color: #3d90ef; font-size: 27px">
              중상
            </p>
            <div style="font-size: 15px; margin-top: 10px">
              <p>CEFR: A1 등급</p>
              <p>(초등 4학년 수준)</p>
            </div>
          </div>
        </div>
        <div style="width: 645px; height: 199px; float: right">
          <p style="padding: 40px; font-size: 15px">
            서민하 학생의 1단원 학습 결과입니다. 서민하 학생은 50% 과업을
            진행하였으며, 어순을 제외한 영역에서 준수한 성적을 거두었습니다.
            반평균과 비슷한 수준의 성취를 이루었으며, 과제 평균이 80점으로
            단원에 대해 잘 이해하고 있습니다. 서민하 학생의 1단원 학습
            결과입니다. 서민하 학생은 50% 과업을 진행하였으며, 어순을 제외한
            영역에서 준수한 성적을 거두었습니다.
          </p>
        </div>
      </div>
    </WrapContent> -->

    <!-- 단원별 -->
    <WrapContent>
      <h6 class="headline2">
        단원별
        <span class="info-tooltip-wrap">
          <span class="info-icon">ⓘ</span>
          <div class="info-tooltip">
            전국 알공 교습소 동일 레벨<br>학생들의 평균입니다.
          </div>
        </span>
      </h6>
      <div class="flex">
        <div class="item">
          <p class="headline3-bold">평균 점수</p>
          <div
            class="circle"
            :class="{
              NAcircle: lessonGraphInfo.average === -1,
              Acircle: lessonGraphInfo.average >= 85,
              Bcircle:
                lessonGraphInfo.average >= 70 && lessonGraphInfo.average < 85,
              Ccircle:
                lessonGraphInfo.average < 70 && lessonGraphInfo.average >= 0,
            }"
          >
            <div v-if="lessonGraphInfo.average >= 0">
              <p>
                {{ lessonGraphInfo.average }}
              </p>
              <span>점</span>
            </div>
            <div v-if="lessonGraphInfo.average === -1">
              <p>N/A</p>
            </div>
          </div>
          <div class="mention">
            <p><span class="goodmention"></span>반 평균보다 점수가 높아요.</p>
            <p><span class="badmention"></span>4단원 보충이 필요해요.</p>
          </div>
        </div>

        <div>
          <div>
            <lessonChart
              v-if="lessonGraphInfo.average >= 0"
              :chartData="lessonGraphInfo"
            ></lessonChart>
          </div>
        </div>
      </div>
    </WrapContent>

    <!-- 학습 영역별 -->
    <WrapContent>
      <h6 class="headline2">학습 영역별</h6>
      <div class="flex">
        <div class="item">
          <p class="headline3-bold">평균 등급</p>
          <div
            class="circle"
            :class="{
              NAcircle: lessonSectionInfo.average === -1,
              Acircle: lessonSectionInfo.average >= 85,
              Bcircle:
                lessonSectionInfo.average >= 70 &&
                lessonSectionInfo.average < 85,
              Ccircle:
                lessonSectionInfo.average < 70 &&
                lessonSectionInfo.average >= 0,
            }"
          >
            <div>
              <p>
                {{ getGrade(lessonSectionInfo.average) }}
              </p>
            </div>
          </div>
          <div class="mention">
            <p>
              <span class="goodmention"></span>전반적으로 학습을 잘 따라오고
              있어요.
            </p>
            <p>
              <span class="badmention"></span>스피킹 연습을 통해 발음 개선이
              필요해요.
            </p>
          </div>
        </div>

        <div>
          <div class="grid-wrap">
            <div class="circlediv">
              <div
                class="circle2"
                :class="{
                  NAcircle: lessonSectionInfo.writingWord === -1,
                  Acircle: lessonSectionInfo.writingWord >= 85,
                  Bcircle:
                    lessonSectionInfo.writingWord >= 70 &&
                    lessonSectionInfo.writingWord < 85,
                  Ccircle:
                    lessonSectionInfo.writingWord < 70 &&
                    lessonSectionInfo.writingWord >= 0,
                }"
              >
                <p>
                  {{ getGrade(lessonSectionInfo.writingWord) }}
                </p>
              </div>
              <p>철자</p>
            </div>
            <div class="circlediv">
              <div
                class="circle2"
                :class="{
                  NAcircle: lessonSectionInfo.writingSentence === -1,
                  Acircle: lessonSectionInfo.writingSentence >= 85,
                  Bcircle:
                    lessonSectionInfo.writingSentence >= 70 &&
                    lessonSectionInfo.writingSentence < 85,
                  Ccircle:
                    lessonSectionInfo.writingSentence < 70 &&
                    lessonSectionInfo.writingSentence >= 0,
                }"
              >
                <p>
                  {{ getGrade(lessonSectionInfo.writingSentence) }}
                </p>
              </div>
              <p>어순</p>
            </div>
            <div class="circlediv">
              <div
                class="circle2"
                :class="{
                  NAcircle: lessonSectionInfo.reading === -1,
                  Acircle: lessonSectionInfo.reading >= 85,
                  Bcircle:
                    lessonSectionInfo.reading >= 70 &&
                    lessonSectionInfo.reading < 85,
                  Ccircle:
                    lessonSectionInfo.reading < 70 &&
                    lessonSectionInfo.reading >= 0,
                }"
              >
                <p>
                  {{ getGrade(lessonSectionInfo.reading) }}
                </p>
              </div>
              <p>의미 파악</p>
            </div>

            <div class="circlediv">
              <div
                class="circle2"
                :class="{
                  NAcircle: lessonSectionInfo.listening === -1,
                  Acircle: lessonSectionInfo.listening >= 85,
                  Bcircle:
                    lessonSectionInfo.listening >= 70 &&
                    lessonSectionInfo.listening < 85,
                  Ccircle:
                    lessonSectionInfo.listening < 70 &&
                    lessonSectionInfo.listening >= 0,
                }"
              >
                <p>
                  {{ getGrade(lessonSectionInfo.listening) }}
                </p>
              </div>
              <p>듣기</p>
            </div>
            <div class="circlediv">
              <div
                class="circle2"
                :class="{
                  NAcircle: lessonSectionInfo.speaking === -1,
                  Acircle: lessonSectionInfo.speaking >= 85,
                  Bcircle:
                    lessonSectionInfo.speaking >= 70 &&
                    lessonSectionInfo.speaking < 85,
                  Ccircle:
                    lessonSectionInfo.speaking < 70 &&
                    lessonSectionInfo.speaking >= 0,
                }"
              >
                <p>
                  {{ getGrade(lessonSectionInfo.speaking) }}
                </p>
              </div>
              <p>발음</p>
            </div>
            <div class="circlediv">
              <div
                class="circle2"
                :class="{
                  NAcircle: lessonSectionInfo.talking === -1,
                  Acircle: lessonSectionInfo.talking >= 85,
                  Bcircle:
                    lessonSectionInfo.talking >= 70 &&
                    lessonSectionInfo.talking < 85,
                  Ccircle:
                    lessonSectionInfo.talking < 70 &&
                    lessonSectionInfo.talking >= 0,
                }"
              >
                <p>
                  {{ getGrade(lessonSectionInfo.talking) }}
                </p>
              </div>
              <p>대화</p>
            </div>
          </div>
        </div>
      </div>
    </WrapContent>

    <!-- 학습 시간 -->
    <WrapContent>
      <h6 class="headline2">학습 시간</h6>
      <div class="flex">
        <div class="item">
          <p class="headline3-bold">평균 학습 시간</p>

          <div class="circle">
            <div style="color: #3d90ef">
              <p style="font-size: 40px; font-family: notosans">
                {{ lessonTimeInfo.average }}
              </p>
              <span>분</span>
            </div>
          </div>
          <div class="mention">
            <p>
              <span class="goodmention"></span>기본 학습을 열심히 학습했어요.
            </p>
            <p>
              <span class="badmention"></span>4단원부터는 대화 연습이 줄었어요.
            </p>
          </div>
        </div>
        <div>
          <timeChart
            v-if="lessonTimeInfo.average"
            :chartData="lessonTimeInfo"
          ></timeChart>
        </div>
      </div>
    </WrapContent>

    <!-- 발화량 -->
    <WrapContent>
      <h6 class="headline2">발화량</h6>
      <div class="flex">
        <div class="item">
          <p class="headline3-bold">평균 발화량</p>
          <div class="circle">
            <div style="color: #3d90ef">
              <p style="font-size: 40px; font-family: notosans">
                {{ lessonSpeakInfo.average }}
              </p>
              <span>회</span>
            </div>
          </div>
          <div class="mention">
            <p>
              <span class="goodmention"></span>기본 학습을 열심히 학습했어요.
            </p>
            <p>
              <span class="badmention"></span>아직 GPT와 자유롭게 대화하는건
              어려워요.
            </p>
          </div>
        </div>

        <div>
          <talkTimeChart
            v-if="lessonSpeakInfo.average"
            :chartData="lessonSpeakInfo"
          ></talkTimeChart>
        </div>
      </div>
    </WrapContent>

    <WrapContent>
      <h6 class="headline2">GPT 대화 피드백</h6>
      <p class="sub-text">단원별 최신 AI 대화 피드백입니다.</p>

      <table>
        <tr>
          <th>단원</th>
          <th>주제</th>
          <th>개선 필요 문장</th>
          <th style="width: 250px">피드백</th>
          <th>대화보기</th>
        </tr>
        <tr v-for="(j, i) in lessonGPTfeedbackInfo" :key="i">
          <td
            :class="{
              tdlastroundleft: lessonGPTfeedbackInfo.length === i + 1,
            }"
          >
            {{ j.lesson }}
          </td>
          <td style="width: 150px">{{ j.subject }}</td>
          <td>{{ j.feedback.incorrect }}</td>
          <td>{{ j.feedback.reason }}</td>
          <td
            @click="talkViewOn(j)"
            :class="{
              tdlastroundright: lessonGPTfeedbackInfo.length === i + 1,
            }"
            style="border-right: 1px solid #cae3ff; cursor: pointer"
          >
            <div class="talkSearchIcon"></div>
          </td>
        </tr>
      </table>
    </WrapContent>

    <!-- 포트폴리오 섹션 -->
    <WrapContent>
      <h6 class="headline2">📁 포트폴리오</h6>
      <div class="portfolio-grid">
        <div
          v-for="(subject, index) in portfolioSubjects"
          :key="index"
          class="portfolio-box"
          :style="{ borderTopColor: subject.color }"
        >
          <div class="portfolio-header" :style="{ backgroundColor: subject.color }">
            <span class="portfolio-icon">{{ subject.icon }}</span>
            <span class="portfolio-title">{{ subject.name }}</span>
          </div>
          <div class="portfolio-subtitle">포트폴리오</div>
          <div class="portfolio-image-area">
            <p class="portfolio-placeholder">이미지 준비 중</p>
          </div>
        </div>
      </div>
    </WrapContent>

    <v-dialog width="800" v-model="viewTalkFlag">
      <div
        style="
          width: 800px;
          height: 700px;
          background-color: white;
          border-radius: 15px;
        "
      >
        <div
          style="
            width: 700px;
            height: 60px;
            margin-left: 50px;
            border-bottom: 1px solid #cae3ff;
            margin-top: 20px;
          "
        >
          <div style="float: left; width: 300px; margin-top: 10px">
            <div class="docicon"></div>
            <p
              style="font-size: 23px; margin-left: 30px; font-family: notosans"
            >
              AI 대화
            </p>
          </div>
          <div style="float: right">
            <p @click="talkViewOff()" style="font-size: 28px; cursor: pointer">
              ✕
            </p>
          </div>
        </div>
        <div
          v-if="viewTalkFlag"
          class="talkContainer"
          style="
            width: 800px;
            height: 600px;
            padding: 50px 30px 20px 30px;
            scale: 0.9;
            overflow-y: scroll;
            border: 1px solid #cae3ff;
            border-radius: 15px;
          "
        >
          <div class="line">
            <div class="time" style="font-family: notosansregular">
              {{ dayjsDate(targetTalkData.talkData[0].value) }}
            </div>
          </div>

          <div style="width: 695px; height: 40px">
            <div
              style="
                width: 75px;
                height: 40px;
                background-color: #3d90ef;
                color: white;
                text-align: center;
                border-radius: 5px;
                float: left;
                margin-left: 10px;
              "
            >
              <p
                style="
                  padding-top: 4.5px;
                  font-size: 19px;
                  font-family: notosans;
                "
              >
                Topic
              </p>
            </div>
            <div style="float: left; margin-left: 15px">
              <p
                style="
                  font-size: 21px;
                  color: #3d90ef;
                  font-family: notosans;
                  padding-top: 3.5px;
                "
              >
                {{ targetTalkData.subject }}
              </p>
            </div>
          </div>

          <div class="feedback-container">
            <div class="feedback">
              <div class="feedback-header">
                <div class="bluestar"></div>
                <p>AI 피드백</p>
              </div>

              <div class="feedback-body">
                <div class="flex">
                  <h6>개선 필요 문장</h6>
                  <p>
                    {{ targetTalkData.feedback.incorrect }}
                  </p>
                </div>
              </div>

              <p class="reason">
                {{ targetTalkData.feedback.reason }}
              </p>
            </div>
          </div>

          <div v-for="(item, index) in targetTalkData.talkData" :key="index">
            <div v-if="item.key === 'npc'">
              <span :class="{ chatbot: item.key === 'npc' }">Chatbot</span>
              <div :class="{ 'chatbot-speech': item.key === 'npc' }">
                {{ item.value }}
              </div>
            </div>

            <div v-else-if="item.key === 'user'" class="flex-column right">
              <div class="student right">Student</div>
              <div class="student-speech right">
                {{ item.value }}
              </div>
              <div class="right" style="width: 300px">
                <audio
                  :src="targetTalkData.talkData[index + 1].value"
                  controls
                ></audio>
              </div>
            </div>
            <div v-else-if="item.key === 'hint'" class="hint">
              힌트:&nbsp;&nbsp;{{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </v-dialog>

    <!-- 학부모 리포트 발송 모달 -->
    <div v-if="isReportModalOpen" class="report-modal-overlay" @click="closeReportModal">
      <div class="report-modal-container" @click.stop>
        <div class="report-modal-header">
          <h3>학부모 리포트</h3>
          <button class="modal-close-btn" @click="closeReportModal">&times;</button>
        </div>

        <div class="report-modal-body" id="printable-report">
          <!-- 1페이지: 학습 현황 -->
          <div class="report-page">
            <div class="report-page-header">
              <div class="report-logo">알공 교습소</div>
              <div class="report-date">{{ currentDate }}</div>
              <h2 class="report-title">학습 리포트</h2>
            </div>

            <div class="report-student-info">
              <div class="info-item">
                <span class="info-label">이름:</span>
                <span class="info-value">{{ lessonGraphInfo.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">레벨:</span>
                <span class="info-value">{{ studentLevel }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">상태:</span>
                <span class="info-value" :class="`status-${studentStatus}`">{{ statusLabel }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">소속:</span>
                <span class="info-value">{{ studentBranch }}</span>
              </div>
            </div>

            <div class="report-section">
              <h4 class="section-title">학습 현황 요약</h4>
              <div class="summary-cards">
                <div class="summary-card">
                  <div class="card-label">학습진행률</div>
                  <div class="card-value">{{ studentProgress }}%</div>
                </div>
                <div class="summary-card">
                  <div class="card-label">정답률</div>
                  <div class="card-value">{{ studentCorrectRate }}%</div>
                </div>
                <div class="summary-card">
                  <div class="card-label">학습시간</div>
                  <div class="card-value">{{ studentStudyTime }}분</div>
                </div>
                <div class="summary-card">
                  <div class="card-label">독서량</div>
                  <div class="card-value">{{ studentReadingCount }}권</div>
                </div>
              </div>
            </div>

            <div class="report-section">
              <h4 class="section-title">과목별 학습 현황</h4>
              <div class="subject-progress-list">
                <div
                  v-for="(subject, index) in portfolioSubjects"
                  :key="index"
                  class="subject-progress-item"
                >
                  <div class="subject-name">{{ subject.name }}</div>
                  <div class="progress-bar-wrapper">
                    <div
                      class="progress-bar-fill"
                      :style="{
                        width: subject.progress + '%',
                        backgroundColor: subject.color
                      }"
                    ></div>
                  </div>
                  <div class="progress-value">{{ subject.progress }}%</div>
                </div>
              </div>
            </div>

            <div class="report-section">
              <h4 class="section-title">학습 피드백</h4>
              <p class="feedback-text">{{ studentFeedback }}</p>
            </div>
          </div>

          <!-- 2페이지: 포트폴리오 -->
          <div class="report-page">
            <div class="report-section">
              <h4 class="section-title">포트폴리오</h4>
              <div class="portfolio-images">
                <div
                  v-for="(subject, index) in portfolioSubjects"
                  :key="index"
                  class="portfolio-image-box"
                >
                  <div class="portfolio-label" :style="{ backgroundColor: subject.color }">
                    {{ subject.icon }} {{ subject.name }}
                  </div>
                  <div class="portfolio-image-placeholder">
                    이미지 준비 중
                  </div>
                </div>
              </div>
            </div>

            <div class="report-section">
              <h4 class="section-title">담당 교사 코멘트</h4>
              <textarea
                v-model="reportComment"
                class="teacher-comment-textarea"
                rows="5"
                placeholder="학생에 대한 코멘트를 입력하세요."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="report-modal-footer">
          <button class="btn-report-close" @click="closeReportModal">
            닫기
          </button>
          <button class="btn-report-pdf" @click="printReport">
            🖨️ PDF로 저장
          </button>
          <button class="btn-report-send" @click="sendToParent">
            📨 학부모 발송
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WrapContent from "../../../components/common/WrapContent.vue";
import lessonChart from "./charts/lessonChart.vue";
import timeChart from "./charts/timeChart.vue";
import talkTimeChart from "./charts/talkTimeChart.vue";
import {
  lessonTimeSummary,
  lessonSpeakSummary,
  lessonGPTfeedbackSummary,
  lessonSectionSummary,
  lessonGraphSummary,
} from "../../../api/api-list-2";
import dayjs from "dayjs";
import { getStudentById } from "../../../data/students.js";

export default {
  data() {
    return {
      lessonGraphInfo: {},
      lessonSectionInfo: {},
      lessonTimeInfo: {
        average: 0,
      },
      lessonSpeakInfo: {
        average: 0,
      },
      lessonGPTfeedbackInfo: {},
      viewTalkFlag: false,
      targetTalkData: {},
      isReportModalOpen: false,
      reportComment: '',
      studentLevel: 15, // 임시 데이터 (실제로는 학생 데이터에서 가져와야 함)
      studentStatus: 'normal', // 'normal', 'warning', 'danger'
      studentBranch: '서울 금천구 1호점',
      studentProgress: 82,
      studentCorrectRate: 88,
      studentStudyTime: 25,
      studentReadingCount: 5,
      studentFeedback: '꾸준히 학습에 참여하고 있으며 전반적으로 우수한 성취를 보이고 있습니다.',
    };
  },
  computed: {
    currentDate() {
      return dayjs().format('YYYY년 MM월 DD일');
    },
    statusLabel() {
      const labels = {
        normal: '정상',
        warning: '주의',
        danger: '관리필요'
      };
      return labels[this.studentStatus] || '정상';
    },
    portfolioSubjects() {
      // 학생 레벨에 따라 포트폴리오 과목 결정
      const level = this.studentLevel;
      const baseProgress = this.studentProgress || 75;
      let subjects = [];

      // 학생 진행률 기반으로 과목별 진도 계산 (±15% 변동)
      const getSubjectProgress = (index) => {
        const variation = (index - 1) * 5 - 5; // -5, 0, +5
        return Math.min(100, Math.max(0, baseProgress + variation));
      };

      if (level >= 1 && level <= 6) {
        subjects = [
          { name: 'Speaking 1', icon: '🎤', color: '#3D90EF', progress: getSubjectProgress(1) },
          { name: 'Phonics 1', icon: '🔤', color: '#F78D0F', progress: getSubjectProgress(2) },
          { name: 'Reading 1', icon: '📖', color: '#0FD197', progress: getSubjectProgress(3) }
        ];
      } else if (level >= 7 && level <= 12) {
        subjects = [
          { name: 'Speaking 2', icon: '🎤', color: '#3D90EF', progress: getSubjectProgress(1) },
          { name: 'Phonics 2', icon: '🔤', color: '#F78D0F', progress: getSubjectProgress(2) },
          { name: 'Reading 2', icon: '📖', color: '#0FD197', progress: getSubjectProgress(3) }
        ];
      } else if (level >= 13 && level <= 18) {
        subjects = [
          { name: 'Speaking 3', icon: '🎤', color: '#3D90EF', progress: getSubjectProgress(1) },
          { name: 'Phonics 3', icon: '🔤', color: '#F78D0F', progress: getSubjectProgress(2) },
          { name: 'Grammar 1', icon: '📝', color: '#5B5EA6', progress: getSubjectProgress(3) }
        ];
      } else if (level >= 19 && level <= 24) {
        subjects = [
          { name: 'Speaking 4', icon: '🎤', color: '#3D90EF', progress: getSubjectProgress(1) },
          { name: 'Reading 3', icon: '📖', color: '#0FD197', progress: getSubjectProgress(2) },
          { name: 'Writing 1', icon: '✍️', color: '#F5C518', progress: getSubjectProgress(3) }
        ];
      } else if (level >= 25 && level <= 30) {
        subjects = [
          { name: 'Speaking 5', icon: '🎤', color: '#3D90EF', progress: getSubjectProgress(1) },
          { name: 'Grammar 2', icon: '📝', color: '#5B5EA6', progress: getSubjectProgress(2) },
          { name: 'Writing 2', icon: '✍️', color: '#F5C518', progress: getSubjectProgress(3) }
        ];
      } else if (level >= 31 && level <= 36) {
        subjects = [
          { name: 'Speaking 6', icon: '🎤', color: '#3D90EF', progress: getSubjectProgress(1) },
          { name: 'Grammar 3', icon: '📝', color: '#5B5EA6', progress: getSubjectProgress(2) },
          { name: 'Writing 3', icon: '✍️', color: '#F5C518', progress: getSubjectProgress(3) }
        ];
      }

      return subjects;
    }
  },
  watch: {
    '$route.params.userId': {
      handler(newUserId) {
        console.log('학생 ID 변경 감지:', newUserId);
        this.loadStudentData();
      },
      immediate: false
    }
  },
  async created() {
    console.log('studentReport created() 호출');
    await this.loadStudentData();
  },
  methods: {
    async loadStudentData() {
      // 실제 학생 데이터 가져오기
      const studentId = this.$route.params.userId;
      const student = getStudentById(studentId);

      console.log('loadStudentData 호출 - 학생 ID:', studentId, '학생 데이터:', student);

      if (student) {
        // 학생 데이터를 data에 할당
        this.studentLevel = student.level;
        this.studentStatus = student.status;
        this.studentBranch = student.branch;
        this.studentProgress = student.finishedPercent;
        this.studentCorrectRate = student.correctPercent;
        this.studentStudyTime = student.studyTime;
        this.studentReadingCount = student.readingCount;
        this.studentFeedback = student.feedback;

        // ========== 더미 데이터 먼저 주입 (API 실패해도 표시되도록) ==========
        const baseScore = student.correctPercent || 75;
        const avgTime = student.studyTime || 20;
        const lvNum = student.level || 1;
        const attendNum = student.attendanceNumber || 1;

        // 1. lessonGraphInfo (단원별 점수 차트) - 학생마다 다른 패턴
        const studentScores = [];
        const classScores = [];
        const lessons = [];
        for (let i = 1; i <= 5; i++) {
          lessons.push(String(i).padStart(2, '0'));
          // 학생별로 다른 변동 패턴 (attendanceNumber 활용)
          const variation = ((attendNum * i * 7) % 20) - 10;
          const studentScore = Math.min(100, Math.max(0, Math.round(baseScore + variation)));
          const classScore = Math.min(100, Math.max(0, Math.round(baseScore - 5 + variation * 0.5)));
          studentScores.push(studentScore);
          classScores.push(classScore);
        }

        console.log('단원별 점수 생성:', { studentScores, classScores });

        this.lessonGraphInfo = {
          name: student.name,
          grade: 0,
          classNum: 0,
          average: baseScore,
          lessons: lessons,
          studentValue: studentScores,
          classValue: classScores
        };

        // 2. lessonSectionInfo (학습 영역별) - 학생마다 다른 점수
        const offsets = [5, -3, 8, -5, 3, -8];
        const areas = ['writingWord', 'writingSentence', 'reading', 'listening', 'speaking', 'talking'];
        const areaScores = {};

        areas.forEach((area, i) => {
          // 학생별 레벨에 따른 추가 변동
          const levelVariation = (lvNum % 5);
          const score = Math.min(100, Math.max(0, baseScore + offsets[i] + levelVariation));
          areaScores[area] = score;
        });

        console.log('학습 영역별 점수 생성:', areaScores);

        this.lessonSectionInfo = {
          average: baseScore,
          writingWord: areaScores.writingWord,
          writingSentence: areaScores.writingSentence,
          reading: areaScores.reading,
          listening: areaScores.listening,
          speaking: areaScores.speaking,
          talking: areaScores.talking
        };

        // 3. lessonTimeInfo (학습 시간) - 학생마다 다른 주차별 패턴
        const weekRatios = [0.8, 1.1, 0.9, 1.2];
        const activityTimes = weekRatios.map((ratio, idx) => {
          // 학생별로 다른 변동 추가
          const studentVariation = ((attendNum + idx) % 3) * 0.05;
          return Math.floor(avgTime * (0.5 + studentVariation) * ratio);
        });
        const talkingTimes = weekRatios.map((ratio, idx) => {
          const studentVariation = ((attendNum + idx) % 3) * 0.05;
          return Math.floor(avgTime * (0.3 + studentVariation) * ratio);
        });
        const totalTimes = activityTimes.map((act, i) => act + talkingTimes[i]);
        const maxTime = Math.max(...totalTimes);

        console.log('학습 시간 생성:', { avgTime, activityTimes, talkingTimes });

        this.lessonTimeInfo = {
          average: avgTime,
          lessons: ['1주차', '2주차', '3주차', '4주차'],
          activityTimes: activityTimes,
          talkingTimes: talkingTimes,
          max: Math.ceil(maxTime / 10) * 10,
          divide: Math.max(1, Math.ceil(maxTime / 50))
        };

        // 4. lessonSpeakInfo (발화량) - 학생마다 다른 패턴
        const speakRatios = [0.3, 0.4, 0.35, 0.45];
        const speakAmount = speakRatios.map((ratio, idx) => {
          const studentVariation = ((attendNum * 2 + idx) % 3) * 0.02;
          return Math.floor(avgTime * (ratio + studentVariation));
        });
        const talkingAmount = speakRatios.map((ratio, idx) => {
          const studentVariation = ((attendNum * 3 + idx) % 3) * 0.02;
          return Math.floor(avgTime * (ratio * 0.5 + studentVariation));
        });
        const totalSpeaks = speakAmount.map((sp, i) => sp + talkingAmount[i]);
        const maxSpeak = Math.max(...totalSpeaks);

        console.log('발화량 생성:', { speakAmount, talkingAmount });

        this.lessonSpeakInfo = {
          average: Math.floor(avgTime * 0.4),
          lessons: ['1주차', '2주차', '3주차', '4주차'],
          speakAmount: speakAmount,
          talkingAmount: talkingAmount,
          max: Math.ceil(maxSpeak / 10) * 10,
          divide: Math.max(1, Math.ceil(maxSpeak / 50))
        };

        // 5. lessonGPTfeedbackInfo (GPT 대화 피드백)
      const feedbackData = {
        normal: [
          {
            lesson: '01. Hello, ABC!',
            subject: 'Greetings',
            feedback: {
              incorrect: '발음이 매우 정확합니다.',
              reason: '인사말 표현을 자연스럽게 구사하고 있습니다.'
            }
          },
          {
            lesson: '02. What\'s This?',
            subject: 'Objects',
            feedback: {
              incorrect: '문장 구조가 안정적입니다.',
              reason: '사물 묘사 문장을 정확하게 사용합니다.'
            }
          },
          {
            lesson: '03. Daily Routine',
            subject: 'Daily Life',
            feedback: {
              incorrect: '시제 활용이 정확합니다.',
              reason: '일상 표현에서 현재형을 완벽하게 구사하고 있습니다.'
            }
          }
        ],
        warning: [
          {
            lesson: '01. Hello, ABC!',
            subject: 'Greetings',
            feedback: {
              incorrect: '발음 연습이 더 필요합니다.',
              reason: '기본 인사말은 알고 있으나 자신감이 부족합니다.'
            }
          },
          {
            lesson: '02. What\'s This?',
            subject: 'Objects',
            feedback: {
              incorrect: '어휘 확장이 필요합니다.',
              reason: '기본 문장은 이해하고 있으나 다양한 표현 연습이 필요합니다.'
            }
          }
        ],
        danger: [
          {
            lesson: '01. Hello, ABC!',
            subject: 'Greetings',
            feedback: {
              incorrect: '기초 발음부터 다시 연습 필요.',
              reason: '학습 참여가 저조하여 피드백 데이터가 부족합니다.'
            }
          }
        ]
      };

        this.lessonGPTfeedbackInfo = feedbackData[student.status] || feedbackData.normal;

        console.log('모든 더미 데이터 주입 완료');
      }

      // ========== API 호출 시도 (성공하면 더미 데이터 덮어쓰기) ==========
      try {
        const graphData = await lessonGraphSummary(this.$route.params.userId);
        if (graphData?.data?.data) {
          this.lessonGraphInfo = {
            ...this.lessonGraphInfo,
            ...graphData.data.data,
            name: student?.name || this.lessonGraphInfo.name
          };
        }
      } catch (e) {
        console.log('lessonGraphSummary error, using dummy data');
      }

      try {
        const sectionData = await lessonSectionSummary(this.$route.params.userId);
        if (sectionData?.data?.data) {
          this.lessonSectionInfo = sectionData.data.data;
        }
      } catch (e) {
        console.log('lessonSectionSummary error, using dummy data');
      }

      try {
        const timeData = await lessonTimeSummary(this.$route.params.userId);
        if (timeData?.data?.data) {
          this.lessonTimeInfo = timeData.data.data;
        }
      } catch (e) {
        console.log('lessonTimeSummary error, using dummy data');
      }

      try {
        const speakData = await lessonSpeakSummary(this.$route.params.userId);
        if (speakData?.data?.data) {
          this.lessonSpeakInfo = speakData.data.data;
        }
      } catch (e) {
        console.log('lessonSpeakInfo error, using dummy data');
      }

      try {
        const gptData = await lessonGPTfeedbackSummary(this.$route.params.userId);
        if (gptData?.data?.data?.length > 0) {
          this.lessonGPTfeedbackInfo = gptData.data.data.filter(item => item.feedback);
        }
      } catch (e) {
        console.log('lessonGPTfeedbackSummary error, using dummy data');
      }
    },
    getGrade(score) {
      if (score === -1) {
        return "";
      } else if (score < 70) {
        return "C";
      } else if (score > 84) {
        return "A";
      } else {
        return "B";
      }
    },
    talkViewOn(talkData) {
      this.viewTalkFlag = true;
      this.targetTalkData = talkData;
    },
    talkViewOff() {
      this.viewTalkFlag = false;
      this.targetTalkData = {};
    },
    getAutoComment(student) {
      if (!student) return '';

      const name = this.lessonGraphInfo.name || '학생';
      const level = student.levelGroup || `Lv.${student.level || this.studentLevel}`;
      const progress = student.finishedPercent || this.studentProgress;
      const correct = student.correctPercent || this.studentCorrectRate;
      const studyTime = student.studyTime || this.studentStudyTime;
      const status = student.status || this.studentStatus;

      const comments = {
        normal: `${name} 학생은 현재 ${level} 과정을 성실하게 학습하고 있습니다. 학습 진행률 ${progress}%, 정답률 ${correct}%로 매우 우수한 성취를 보이고 있습니다. 주 평균 ${studyTime}분의 꾸준한 학습 습관이 좋은 결과로 이어지고 있습니다. 현재 페이스를 유지해 주시면 더 큰 성장을 기대할 수 있습니다.`,

        warning: `${name} 학생은 현재 ${level} 과정을 학습 중입니다. 학습 진행률 ${progress}%, 정답률 ${correct}%로 기초는 잡혀 있으나 조금 더 꾸준한 참여가 필요합니다. 주 평균 학습 시간이 ${studyTime}분으로 목표 시간보다 다소 부족합니다. 가정에서 규칙적인 학습 시간을 정해 주시면 빠른 향상을 기대할 수 있습니다.`,

        danger: `${name} 학생은 현재 ${level} 과정 중이나 학습 참여가 저조한 상태입니다. 학습 진행률 ${progress}%, 정답률 ${correct}%로 집중적인 관리가 필요합니다. 학습 공백이 길어지면 따라가기 어려울 수 있으니, 가정에서도 함께 관심 가져주시기 바랍니다. 언제든지 연락 주시면 맞춤 지도 방법을 함께 찾아드리겠습니다.`
      };

      return comments[status] || comments.normal;
    },
    openReportModal() {
      const studentId = this.$route.params.userId;
      const student = getStudentById(studentId);

      // 자동 코멘트 생성 및 주입
      this.reportComment = this.getAutoComment(student);
      this.isReportModalOpen = true;
    },
    closeReportModal() {
      this.isReportModalOpen = false;
    },
    printReport() {
      window.print();
    },
    sendToParent() {
      const name = this.lessonGraphInfo.name || '학생';
      alert(`${name} 학부모님께 리포트를 발송했습니다.`);
      this.closeReportModal();
    },
    dayjsDate(time) {
      return dayjs(time).subtract(9, "hour").format("YYYY-MM-DD HH:mm:ss");
    },
  },
  components: {
    WrapContent,
    lessonChart,
    timeChart,
    talkTimeChart
  }
};
</script>

<style scoped>
/* flex-column-gap 간격 조정 */
.report-wrap.flex-column-gap {
  gap: 20px;
}

.report-wrap > div {
  width: 880px;
  min-height: 300px;
}

/* report-header는 min-height 제거 */
.report-wrap > .report-header {
  min-height: unset;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}
.flex .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.flex > div {
  min-width: 300px;
  min-height: 230px;
}
.grid-wrap {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding-right: 40px;
}

/* .printBtn {
  background-color: #258bff;
  color: white;
  float: right;
  border-radius: 10px;
  font-size: 15px;
  font-family: notosans;
  background-image: url("../../../assets/image/Icon_Print.png");
  background-size: 17%;
  background-repeat: no-repeat;
  background-position-y: 50%;
  background-position-x: 16%;
}
.titleBlock {
  width: 100%;
  background-color: #eaf4ff;
  height: 60px;
  border-top-left-radius: 19px;
  border-top-right-radius: 19px;
}

.obi {
  background-image: url("../../../assets/image/Icon_Obi.png");
  width: 70px;
  height: 70px;
  background-size: 100%;
  margin-top: 60px;
  margin-left: 30px;
  float: left;
} */

.mention {
  width: 100%;
  font-size: 15px;
  line-height: 1.6;
  /* display: flex; */
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.goodmention {
  width: 25px;
  height: 20px;
  background-image: url("../../../assets/image/goodmention.png");
  background-size: 100%;
  float: left;
}

.badmention {
  width: 25px;
  height: 20px;
  background-image: url("../../../assets/image/badmention.png");
  background-size: 100%;
  float: left;
}

.circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
}

.circle p {
  font-family: notosans;
  font-size: 38px;
  line-height: 1;
  margin: 0;
  padding: 0;
}

.circle span {
  font-size: 20px;
  font-family: notosans;
  margin: 0;
  padding: 0;
}

.circle2 {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 22px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
  }
}

.NAcircle {
  background-color: #f7f7f7;
}

.Acircle {
  background-color: #10d298;
}

.Bcircle {
  background-color: #ffac4b;
}

.Ccircle {
  background-color: #ff5a83;
}

.circlediv {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 15px;

  > p {
    font-size: 16px;
  }
}

.talkSearchIcon {
  width: 25px;
  height: 25px;
  background-image: url("../../../assets/image/talkSearchIcon.png");
  background-size: 100%;
  margin-left: 45px;
}

.feedback-container {
  border: 1px solid #cde6fa;
  border-radius: 20px;
  width: 100%;
  margin: 30px 0 20px;

  p {
    font-size: 18px;
  }
}

.feedback {
  padding: 0 27px 27px;
}

.feedback-header {
  font-size: 20px;
  color: #3d90ef;
  width: 150px;
  margin: -20px auto 0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #fff;
  font-family: notosans;
}

.bluestar {
  background-image: url("../../../assets/image/bluestar.png");
  width: 18px;
  height: 18px;
  background-size: 100%;
}

.feedback-body {
  width: 100%;
  font-size: 18px;

  .flex {
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 15px;
    padding: 0;
  }
  h6 {
    font-weight: 700;
    font-size: 18px;
  }
}
.reason {
  margin-top: 20px;
  font-size: 16px !important;
  color: #3d90ef;
}

.docicon {
  background-image: url("../../../assets/image/docicon.png");
  background-size: 100%;
  width: 25px;
  height: 25px;
  float: left;
  margin-top: 6px;
}

.talkContainer::-webkit-scrollbar {
  width: 10px;
}

.talkContainer::-webkit-scrollbar-thumb {
  background-color: #cae3ff;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.tdlastroundleft {
  border-bottom-left-radius: 15px;
}

.tdlastroundright {
  border-bottom-right-radius: 15px;
}
.sub-text {
  font-size: 14px;
  color: rgb(100, 100, 100);
  margin: 5px 0 20px;
}

table {
  width: 100%;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-spacing: 0;

  th,
  td {
    padding: 15px;
    border: 1px solid #cae3ff;
    background: #f1f8ff;
  }

  th {
    font-family: notosans;
    font-size: 14px;
    border-right: none;

    &:first-child {
      border-top-left-radius: 15px;
    }
    &:last-child {
      border-top-right-radius: 15px;
      border-right: 1px solid #cae3ff;
      width: 145px;
    }
  }

  td {
    background: #fff;
    font-family: notosansregular;
    font-size: 13px;
    border-right: none;
    color: black;
    border-top: none;
  }
}
.line {
  position: absolute;
  width: calc(100% - 60px);
  height: 1px;
  background-color: #cae3ff;
  transform: translate(-50%, -50%);
  top: 20px;
  left: 50%;
}

.time {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0 34px;
  color: #6594cb;
  background-color: white;
  transform: translate(-50%, -50%);
  /* border: 1px solid red; */
  font-size: 16px;
}
.chatbot {
  font-family: notosansmedium;
  color: var(--main-blue);
  margin-bottom: 8px;
  margin-left: 5px;
  font-size: 16px;
}

.chatbot-speech {
  width: fit-content;
  max-width: 430px;
  margin-bottom: 10px;
  padding: 9px 20px;
  border-radius: 14px;
  background-color: var(--main-lightblue);
  font-size: 16px;
  font-weight: 500;
}

.hint {
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 400px;
}

.student {
  margin-bottom: 8px;
  margin-right: 5px;
  color: var(--main-black2);
  font-family: notosansmedium;
  text-align: right;
  font-size: 16px;
}

.student-speech {
  width: fit-content;
  max-width: 430px;
  margin-bottom: 10px;
  padding: 9px 20px;
  border-radius: 14px;
  background-color: var(--main-blue);
  color: white;
  font-size: 16px;
}

/* 헤더 스타일 */
.report-header {
  padding: 12px 24px;
  min-height: unset;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;

  .headline1 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
}

.btn-parent-report {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #258AFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-parent-report:hover {
  background-color: #1a6fdd;
  transform: translateY(-1px);
}

/* 포트폴리오 스타일 */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.portfolio-box {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  border-top-width: 4px;
}

.portfolio-header {
  padding: 14px 18px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.portfolio-icon {
  font-size: 20px;
}

.portfolio-title {
  font-size: 15px;
}

.portfolio-subtitle {
  padding: 10px 18px;
  font-size: 14px;
  color: #666;
  background-color: #f8f9fa;
}

.portfolio-image-area {
  height: 200px;
  margin: 18px;
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portfolio-placeholder {
  color: #999;
  font-size: 14px;
}

/* 리포트 모달 스타일 */
.report-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.report-modal-container {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.report-modal-header {
  padding: 24px 30px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-modal-header h3 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 32px;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
}

.modal-close-btn:hover {
  color: #333;
}

.report-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

.report-page {
  background: white;
  margin-bottom: 30px;
  padding: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.report-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #258AFF;
}

.report-logo {
  font-size: 24px;
  font-weight: 700;
  color: #258AFF;
}

.report-date {
  color: #666;
  font-size: 14px;
}

.report-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0;
  color: #333;
}

.report-student-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.info-item {
  display: flex;
  gap: 10px;
}

.info-label {
  font-weight: 600;
  color: #666;
  min-width: 60px;
}

.info-value {
  color: #333;
  font-weight: 500;
}

.status-normal {
  color: #0FD197;
  font-weight: 600;
}

.status-warning {
  color: #F78D0F;
  font-weight: 600;
}

.status-danger {
  color: #F23A3A;
  font-weight: 600;
}

.report-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.summary-card {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.card-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  color: #258AFF;
}

.subject-progress-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.subject-progress-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.subject-name {
  min-width: 120px;
  font-weight: 500;
  color: #333;
}

.progress-bar-wrapper {
  flex: 1;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-value {
  min-width: 50px;
  text-align: right;
  font-weight: 600;
  color: #666;
}

.feedback-text {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  line-height: 1.6;
  color: #333;
}

.portfolio-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.portfolio-image-box {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.portfolio-label {
  padding: 12px;
  color: white;
  font-weight: 600;
  text-align: center;
}

.portfolio-image-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  color: #999;
  font-size: 14px;
}

.teacher-comment-textarea {
  width: 100%;
  min-height: 150px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1.5px solid #e0e0e0;
  color: #333;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.teacher-comment-textarea:focus {
  outline: none;
  border-color: #3D90EF;
  background-color: #fff;
}

.teacher-comment-textarea::placeholder {
  color: #999;
}

.report-modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}

.btn-report-close {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1.5px solid #e0e0e0;
  background: white;
  color: #525252;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-report-close:hover {
  background: #f8f8f8;
  border-color: #d0d0d0;
}

.btn-report-pdf {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1.5px solid #3D90EF;
  background: white;
  color: #3D90EF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-report-pdf:hover {
  background: #f0f7ff;
}

.btn-report-send {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: #00B87A;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 184, 122, 0.35);
  transition: all 0.2s ease;
}

.btn-report-send:hover {
  background: #00a36c;
  box-shadow: 0 4px 12px rgba(0, 184, 122, 0.45);
}

/* 인쇄 스타일 */
@media print {
  .report-modal-overlay {
    display: none;
  }

  .report-modal-header,
  .report-modal-footer {
    display: none !important;
  }

  .report-modal-body {
    overflow: visible;
    padding: 0;
  }

  .report-page {
    page-break-after: always;
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 40px;
  }

  .report-page:last-child {
    page-break-after: auto;
  }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .teacher-comment-textarea {
    border: 1px solid #e0e0e0;
    background: white;
    color: #333;
    font-size: 13px;
    padding: 16px;
  }
}

/* 툴팁 스타일 */
.info-tooltip-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  vertical-align: middle;
}

.info-icon {
  font-size: 13px;
  color: #9A9A9A;
  cursor: pointer;
  font-style: normal;
}

.info-tooltip {
  display: none;
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  font-size: 11px;
  line-height: 1.6;
  padding: 8px 12px;
  border-radius: 8px;
  white-space: nowrap;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  font-weight: 400;
}

.info-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #333;
}

.info-tooltip-wrap:hover .info-tooltip {
  display: block;
}
</style>
