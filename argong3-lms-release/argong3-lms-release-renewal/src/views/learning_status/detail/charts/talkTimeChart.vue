<template>
  <div>
    <canvas id="talkStackedBarChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const customTextPlugin = {
  id: "customText",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    ctx.save();
    ctx.font = "12px Arial"; // 폰트 스타일
    ctx.fillStyle = "#9f9f9f"; // 글자 색상
    ctx.fillText("회", chartArea.left - 21, chartArea.bottom + 18.5); // "점" 추가
    ctx.restore();
  },
};

export default {
  name: "talkStackedBarChart",
  data() {
    return {
      chart: null,
    };
  },
  props: {
    chartData: {
      required: true,
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document
        .getElementById("talkStackedBarChart")
        .getContext("2d");

      const data = {
        labels: this.chartData.lessons, // X축 라벨
        datasets: [
          {
            label: "따라 말하기",
            data: this.chartData.speakAmount, // 액티비티 데이터
            backgroundColor: "#CAE3FF", // 밝은 파란색
            barThickness: 10, // 막대 두께
            maxBarThickness: 10, // 최대 막대 두께
          },
          {
            label: "대화 연습",
            data: this.chartData.talkingAmount, // AI 대화 데이터
            backgroundColor: "#10D298", // 초록색
            barThickness: 10, // 막대 두께
            maxBarThickness: 10, // 최대 막대 두께
          },
        ],
      };

      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}회`;
              },
            },
          },
          legend: {
            position: "top", // 범례를 위쪽에 배치
            align: "end", // 오른쪽으로 정렬
            labels: {
              usePointStyle: true, // 동그라미 아이콘 사용
              font: {
                size: 12, // 범례 글자 크기 조정
              },
              boxWidth: 5, // 아이콘 크기 조정 (기본값 40)
              boxHeight: 5, // 아이콘 높이 조정
            },
          },
        },
        scales: {
          x: {
            stacked: true, // X축 스택 활성화
            grid: {
              display: false,
            },
            ticks: {
              color: "#9f9f9f",
            },
          },
          y: {
            stacked: true, // Y축 스택 활성화
            beginAtZero: true,
            max: this.chartData.max,
            ticks: {
              color: "#9f9f9f",
              stepSize: this.chartData.divide,
            },
          },
        },
      };

      this.chart = new Chart(ctx, {
        type: "bar",
        data,
        options,
        plugins: [customTextPlugin],
      });
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
canvas {
  max-width: 380px; /* 원하는 너비로 설정 */
  min-height: 230px;
}
</style>
