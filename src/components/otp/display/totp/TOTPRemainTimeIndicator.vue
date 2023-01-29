<template>
  <n-button quaternary circle>
    <template #icon>
      <n-icon>
        <IndicatorSVG
          :percentage="percentage"
          :animationDuration="updateInterval"
        />
      </n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { NButton, NIcon } from "naive-ui";
import { useIntervalFn } from "@vueuse/core";
import IndicatorSVG from "./IndicatorSVG.vue";

const props = defineProps<{
  period?: number;
}>();

// in ms
const updateInterval = 500;
const periodInMS = computed(() =>
  props.period ? props.period * 1000 : 30 * 1000
);

const remainTime = ref(periodInMS.value - (Date.now() % periodInMS.value));

useIntervalFn(() => {
  remainTime.value = periodInMS.value - (Date.now() % periodInMS.value);
}, updateInterval);

const percentage = computed(() => (remainTime.value / periodInMS.value) * 100);
</script>
