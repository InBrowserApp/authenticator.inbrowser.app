<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 120 120"
    class="indicator-svg"
  >
    <circle
      cx="60"
      cy="60"
      :r="r"
      fill="none"
      stroke="currentColor"
      stroke-width="20"
      :style="animationDurationStyle"
      :stroke-dasharray="dasharray"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  percentage: number;
  animationDuration: number;
}>();

const r = 40;
const dasharray = 2 * Math.PI * r;
const dashoffset = computed(() => dasharray * (1 - props.percentage / 100));

const animationDurationStyle = computed(() => ({
  transition: `stroke-dashoffset ${props.animationDuration}ms linear 0s`,
  "stroke-dashoffset": dashoffset.value,
}));
</script>

<style scoped>
.indicator-svg {
  transform: rotate(-90deg);
}
</style>
