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
  period: number;
}>();

// in ms
const updateInterval = 500;

const remainTime = ref(props.period - (Date.now() % props.period));

useIntervalFn(() => {
  remainTime.value = props.period - (Date.now() % props.period);
}, updateInterval);

const percentage = computed(() => (remainTime.value / props.period) * 100);
</script>
