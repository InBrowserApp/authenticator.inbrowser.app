<template>
  <n-button quaternary circle>
    <template #icon>
      <n-icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 120 120"
          class="indicator-circle"
        >
          <circle
            cx="60"
            cy="60"
            :r="r"
            fill="none"
            stroke="currentColor"
            stroke-width="20"
            :stroke-dasharray="dasharray"
            :stroke-dashoffset="dashoffset"
          />
        </svg>
      </n-icon>
    </template>
  </n-button>

  <!-- <span> {{ remainTime }} / {{ period }} </span> -->
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NButton, NIcon } from "naive-ui";

const props = defineProps<{
  remainTime: number;
  period: number;
}>();

const percentage = computed(() => {
  return (props.remainTime / props.period) * 100;
});

const r = computed(() => 40);

const dasharray = computed(() => 2 * Math.PI * r.value);
const dashoffset = computed(() =>
  Math.round(dasharray.value * (1 - percentage.value / 100))
);
</script>

<style scoped>
.indicator-circle {
  transform: rotate(-90deg);
}
</style>
