<template>
  <div
    style="
      position: relative;
      width: 350px;
      height: 360px;
      padding: 10px 10px 20px 10px;
      margin-left: 280px;
    "
  >
    <div class="chart-label" style="top: 70px; left: 190px">
      <span class="body3" style="font-size: 15px">Accuracy</span><br />
      <span class="body2-bold">{{ Math.round(userData[0]) }}%</span>
    </div>
    <div class="chart-label" style="bottom: 40px; right: 5px">
      <span class="body3" style="font-size: 15px">Prosody</span><br />
      <span class="body2-bold">{{ Math.round(userData[2]) }}%</span>
    </div>
    <div class="chart-label" style="bottom: 40px; left: 90px">
      <span class="body3" style="font-size: 15px">Fluency</span><br />
      <span class="body2-bold">{{ Math.round(userData[1]) }}%</span>
    </div>
    <canvas ref="radarChart" />
  </div>
</template>
  
  <script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
let chart = null;

export default {
  props: {
    userData: {
      type: Array,
      default: [0, 0, 0],
    },
  },
  data: () => ({
    chartData: {
      labels: [
        "정확도 (Accuracy)",
        "유창성 (Fluency)",
        "완성도 (Completeness)",
      ],
      datasets: [
        {
          type: "radar",
          data: [],
          backgroundColor: ["#3D90EF20"],
          borderColor: ["#3D90EF"],
          borderWidth: 2,
          datalabels: { display: false },
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          max: 100,
          min: 0,
          angleLines: {
            display: false,
          },
          ticks: {
            display: false,
            stepSize: 20,
          },
          pointLabels: {
            // display: false
            color: "rgba(0,0,0,0)",
            display: true,
            font: {
              size: 8,
              family: "notosansmedium",
            },
            padding: 20,
          },
        },
      },
      elements: {
        point: {
          radius: 2,
        },
        line: {
          borderWidth: 3,
        },
      },
      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          enabled: false,
        },
      },
    },
  }),
  watch: {
    userData() {
      this.createChart();
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.createChart();
    });
  },
  methods: {
    createChart() {
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(this.$refs.radarChart, {
        type: "radar",
        data: this.chartData,
        options: this.options,
      });
      chart.data.datasets[0].data = this.userData;

      chart.update();
    },
  },
};
</script>

  <style>
.chart-label {
  position: absolute;
  width: fit-content;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>