<template>
  <div style="width: 310px; height: 190px; margin: 0 auto">
    <canvas ref="lineChart" :height="height" />
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
      labels: [],
      datasets: [
        {
          label: langlist[lang]["나"],
          data: [],
          backgroundColor: ["#10D298"],
          borderColor: ["#10D298"],
          borderWidth: 2,
          // pointRadius: 2,
          datalabels: {
            display: false,
          },
        },
        {
          label: langlist[lang]["반평균"],
          data: [],
          backgroundColor: ["#CAE3FF"],
          borderColor: ["#CAE3FF"],
          borderWidth: 2,
          datalabels: {
            display: false,
          },
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            stepSize: 20,
          },
        },
        x: {
          title: {
            display: true,
            text: langlist[lang]["단원"],
            lineHeight: 1.5,
            family: "notosanslight",
          },
          grid: {
            drawBorder: true,
            drawOnChartArea: false,
          },
        },
      },
      elements: {
        point: {
          radius: 2,
          // radius: 0,
        },
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 10,
            boxHeight: 3,
          },
        },
      },
    };
  },
  props: {
    // labels: {
    //   type: Array,
    //   required: true,
    // },
    classData: {
      type: Array,
      required: true,
    },
    userData: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      //   required: true,
    },
  },
  data: () => ({
    lab: [],
    chartData: "",
    options: "",
  }),
  watch: {
    classData() {
      this.createChart();
    },
    // deep: true,
  },
  async mounted() {
    this.$nextTick(function () {
      this.createChart();
    });
  },
  methods: {
    generateLabels(start, end) {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    async createChart() {
      if (chart !== undefined) {
        chart.destroy();
      }
      chart = new Chart(this.$refs.lineChart, {
        type: "line",
        data: this.chartData,
        options: this.options,
      });
      let last = this.$props.classData.length;
      this.lab = this.generateLabels(1, last);

      //   console.log('chart lineDataAverage : ', this.$props.classData)
      //   console.log('chart lineData : ', this.$props.userData)
      //   console.log('chart lab : ', this.lab)

      chart.data.datasets[0].data = this.$props.userData;
      chart.data.datasets[1].data = this.$props.classData;
      chart.data.labels = this.lab;
      chart.update();
    },

    async setgraph() {
      //   this.$store.dispatch("LINE_DATA", this.$route.params.id);
      //this.$store.dispatch("STUDENT_TOTAL", this.$route.params.id);
      // this.$store.dispatch("SECTION_DATA", {
      //   id: this.$route.params.id,
      //   lesson: this.$route.params.lesson,
      // });
    },
  },
};
</script>

<style></style>