<template>
  <div
    :style="{
      position: 'relative',
      width: '100%',
      maxWidth: '345px',
      height: '311px',
      margin: '0 auto',
    }"
  >
    <div class="chart-label" style="top: 20px; left: 50%">
      <span class="body3">{{
        _langlist[$store.state.lang]["철자"]
      }}</span
      ><br />
      <span class="body2-bold">{{ Math.ceil($store.state.radarData[0]) }}%</span>
    </div>
    <div class="chart-label" style="top: 135px; right: -15px">
      <span class="body3">{{
        _langlist[$store.state.lang]["의미"]
      }}</span
      ><br />
      <span class="body2-bold">{{ Math.ceil($store.state.radarData[1]) }}%</span>
    </div>
    <div class="chart-label" style="bottom: -30px; right: 42px">
      <span class="body3">{{
        _langlist[$store.state.lang]["소리"]
      }}</span
      ><br />
      <span class="body2-bold">{{ Math.ceil($store.state.radarData[2]) }}%</span>
    </div>
    <div class="chart-label" style="bottom: -30px; left: 68px">
      <span class="body3">{{
        _langlist[$store.state.lang]["말하기"]
      }}</span
      ><br />
      <span class="body2-bold">{{ Math.ceil($store.state.radarData[3]) }}%</span>
    </div>
    <div class="chart-label" style="top: 135px; left: 20px">
      <span class="body3">{{
        _langlist[$store.state.lang]["어순"]
      }}</span
      ><br />
      <span class="body2-bold">{{ Math.ceil($store.state.radarData[4]) }}%</span>
    </div>
    <canvas ref="radarChart" />
  </div>
</template>
  
  <script>
import store from "../../store";

import { chart_ko } from "../../assets/translate/ko";
import { chart_vt } from "../../assets/translate/vt";

const langlist = {
  ko: chart_ko,
  vt: chart_vt,
};

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
let chart;

export default {
  created() {
    const lang = store.state.lang;

    this.chartData = {
      labels: [
        langlist[lang]["철자"],
        langlist[lang]["의미"],
        langlist[lang]["소리"],
        langlist[lang]["말하기"],
        langlist[lang]["어순"],
      ],
      datasets: [
        {
          label: langlist[lang]["나"],
          data: [],
          backgroundColor: ["rgba(16, 210, 152, 0.4)"],
          borderColor: ["rgba(16, 210, 152, 1)"],
          borderWidth: 2,
          // pointRadius: 2,
          datalabels: {
            display: false,
          },
        },
        {
          label: langlist[lang]["반평균"],
          data: [],
          fill: true,
          backgroundColor: ["rgba(202, 227, 255, 0.4)"],
          borderColor: ["rgba(202, 227, 255, 1)"],
          borderWidth: 2,
          // pointRadius: 2,
          datalabels: {
            display: false,
          },
        },
      ],
    };

    this.options = {
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
              size: 2,
              family: "notosansmedium",
            },
            padding: 10,
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
          position: "top",
          align: "start",
          display: true,
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 10,
            boxHeight: 3,
          },
        },

        tooltip: {
          enabled: false,
        },
      },
    };
  },
  props: {
    classData: {
      type: Array,
      // required: true,
    },
    userData: {
      type: Array,
      // required: true,
    },
  },
  data: () => ({
    _langlist: langlist,
    chartData: "",
    options: "",
  }),
  watch: {
    classData() {
      this.createChart();
    },
    //   deep: true,
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
      chart.data.datasets[0].data = this.$store.state.radarData;
      chart.data.datasets[1].data = this.$store.state.radarDataAverage;

      chart.update();
    },
  },
};
</script>
  <style>
.chart-label {
  position: absolute;
  width: 40px;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>