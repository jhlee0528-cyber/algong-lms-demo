<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js";

const customTextPlugin = {
  id: "customText",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    ctx.save();
    ctx.font = "12px Arial"; // 폰트 스타일
    ctx.fillStyle = "#9f9f9f"; // 글자 색상
    ctx.fillText("점", chartArea.left - 21, chartArea.bottom + 18.5); // "점" 추가
    ctx.restore();
  },
};

export default {
  name: "BarChart",
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
      const ctx = document.getElementById("myChart").getContext("2d");

      const data = {
        labels: this.chartData.lessons,
        datasets: [
          {
            label: "반 평균",
            data: this.chartData.classValue,
            backgroundColor: "#CAE3FF",
            borderColor: "#CAE3FF",
            borderWidth: 1,
            borderSkipped: false, // 막대가 서로 완전히 붙도록 설정
            barThickness: "flex",
          },
          {
            label: this.chartData.name,
            data: this.chartData.studentValue,
            backgroundColor: "#10D298",
            borderColor: "#10D298",
            borderWidth: 1,
            borderSkipped: false,
            barThickness: "flex",
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
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}점`;
              },
            },
          },
          legend: {
            position: "top",
            align: "end",
            labels: {
              usePointStyle: true,
              font: {
                size: 12,
              },
              boxWidth: 5,
              boxHeight: 5,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            barPercentage: 1.0, // 막대 너비 최대
            categoryPercentage: 1.0, // 카테고리 간격 제거
            ticks: {
              color: "#9f9f9f",
            },
          },
          y: {
            grid: {
              display: true,
            },
            beginAtZero: true,
            max: 100,
            ticks: {
              color: "#9f9f9f",
              stepSize: 20,
            },
          },
        },
        layout: {
          padding: {
            top: 10,
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
  max-width: 380px;
  min-height: 230px;
}
</style>
