<template>
  <div class="white-wrap">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.white-wrap {
  position: relative;
  /* width: 100%; */
  width: fit-content;
  height: fit-content;
  border-radius: 16px;
  background: #fff;
  padding: 28px 32px;
  border: 1px solid var(--chart-blue-bg);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
}
</style>
