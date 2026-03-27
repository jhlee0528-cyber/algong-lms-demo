<template>
  <div class="tooltip-container">
    <div class="tooltip-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 8 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.54844 4.52031C1.54844 3.33131 2.73044 2.34531 3.97344 2.34531C5.21644 2.34531 6.39844 3.33131 6.39844 4.52031C6.39844 5.61931 5.84144 6.13431 5.09244 6.79931L5.06144 6.82631C4.31844 7.48531 3.39844 8.30031 3.39844 9.92031C3.39844 9.99582 3.41331 10.0706 3.44221 10.1404C3.4711 10.2101 3.51346 10.2735 3.56685 10.3269C3.62024 10.3803 3.68363 10.4226 3.75339 10.4515C3.82316 10.4804 3.89793 10.4953 3.97344 10.4953C4.04895 10.4953 4.12372 10.4804 4.19348 10.4515C4.26324 10.4226 4.32663 10.3803 4.38002 10.3269C4.43342 10.2735 4.47577 10.2101 4.50467 10.1404C4.53356 10.0706 4.54844 9.99582 4.54844 9.92031C4.54844 8.83531 5.10244 8.32631 5.85544 7.66031L5.87544 7.64031C6.62344 6.97831 7.54844 6.15831 7.54844 4.52031C7.54844 2.54831 5.69244 1.19531 3.97344 1.19531C2.25444 1.19531 0.398438 2.54831 0.398438 4.52031C0.398437 4.59582 0.41331 4.67059 0.442207 4.74036C0.471103 4.81012 0.513458 4.87351 0.566851 4.9269C0.620245 4.98029 0.683632 5.02265 0.753394 5.05154C0.823157 5.08044 0.897927 5.09531 0.973438 5.09531C1.04895 5.09531 1.12372 5.08044 1.19348 5.05154C1.26324 5.02265 1.32663 4.98029 1.38002 4.9269C1.43342 4.87351 1.47577 4.81012 1.50467 4.74036C1.53356 4.67059 1.54844 4.59582 1.54844 4.52031Z" fill="white" stroke="white" stroke-width="0.7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.97266 14.8438C4.20472 14.8438 4.42728 14.7516 4.59137 14.5875C4.75547 14.4234 4.84766 14.2008 4.84766 13.9688C4.84766 13.7367 4.75547 13.5141 4.59137 13.35C4.42728 13.1859 4.20472 13.0938 3.97266 13.0938C3.74059 13.0938 3.51803 13.1859 3.35394 13.35C3.18984 13.5141 3.09766 13.7367 3.09766 13.9688C3.09766 14.2008 3.18984 14.4234 3.35394 14.5875C3.51803 14.7516 3.74059 14.8438 3.97266 14.8438Z" fill="white" stroke="white" stroke-width="0.7"/>
      </svg>
    </div>
    <div class="tooltip-text" v-if="tooltipText && tooltipText.length" :style="{ width: width }">
      <div v-for="(text, index) in tooltipText" :key="index">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TooltipIcon',
  props: {
    tooltipText: {
      type: [String, Array],
      default: () => []
    },
    width: {
      type: String,
      default: 'max-content'
    }
  }
}
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-icon {
  width: 20px;
  height: 20px;
  background: #88C0FF;
  border-radius: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
}
.tooltip-text {
  visibility: hidden;
  position: absolute;
  z-index: 100;
  background: #333333;
  color: #fff;
  text-align: left;
  padding: 10px 10px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.4;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}

.tooltip-text::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 6px 6px 6px;
  border-style: solid;
  border-color: transparent transparent #333 transparent;
}

@media screen and (max-width: 1600px) {
  .tooltip-text {
    right: 0;
    left: auto;
    transform: none;
  }
  
  .tooltip-text::before {
    right: 10px;
    left: auto;
    transform: none;
  }
}

.tooltip-text div {
  margin-bottom: 4px;
}

.tooltip-text div:last-child {
  margin-bottom: 0;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
}
</style> 