<template>
  <div
    style="
      position: relative;
      width: 350px;
      height: 360px;
      padding: 40px 10px 20px 10px;
      padding-left: 20px;
    "
  >
    <div class="chart-label" style="top: 20px; left: 177px">
      <span class="body3" style="font-size: 15px">Accuracy</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[0]) }}%</span
      >
    </div>
    <div class="chart-label" style="bottom: 20px; right: -40px">
      <span class="body3" style="font-size: 15px">Prosody</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[2]) }}%</span
      >
    </div>
    <div class="chart-label" style="bottom: 20px; left: 40px">
      <span class="body3" style="font-size: 15px">Fluency</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[1]) }}%</span
      >
    </div>
    <canvas ref="radarChart" />
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
let chart;
export default {
  props: {
    classData: {
      type: Array,
      // required: true,
    },
    // userData: {
    // type: Array,
    // required: true,
    // },
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
            padding: -60,
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
    classData: {
      handler(newValue, oldValue) {
        this.createChart();
      },
      deep: true,
    },
  },
  async mounted() {
    this.$nextTick(function () {
      this.createChart();
    });
  },
  methods: {
    async createChart() {
      if (chart !== undefined) {
        chart.destroy();
      }
      chart = new Chart(this.$refs.radarChart, {
        type: "radar",
        data: this.chartData,
        options: this.options,
      });
      chart.data.datasets[0].data = this.$store.state.pronRadarData;
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