<template>
  <div
    style="
      position: relative;
      width: 350px;
      height: 360px;
      padding: 10px 10px 20px 10px;
    "
  >
    <div class="chart-label" style="top: 50px; left: 50%">
      <span class="body3">accuracy</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[0]) }}%</span
      >
    </div>
    <div class="chart-label" style="top: 150px; right: -20px">
      <span class="body3">intonation</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[1]) }}%</span
      >
    </div>
    <div class="chart-label" style="bottom: 25px; right: 50px">
      <span class="body3">speed</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[2]) }}%</span
      >
    </div>
    <div class="chart-label" style="bottom: 25px; left: 70px">
      <span class="body3">pause</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[3]) }}%</span
      >
    </div>
    <div class="chart-label" style="top: 150px; left: 30px">
      <span class="body3">accent</span><br />
      <span class="body2-bold"
        >{{ Math.ceil($store.state.pronRadarData[4]) }}%</span
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
      labels: ["accuracy", "intonation", "speed", "pause", "accent"],
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
    classData() {
      this.createChart();
    },
    deep: true,
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
      console.log("pronRadarData : ", this.$store.state.pronRadarData);
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