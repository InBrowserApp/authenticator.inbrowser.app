<template>
  <n-button quaternary circle @click="counter += 1">
    <n-icon :component="Icon" />
  </n-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NButton, NIcon } from "naive-ui";
import Icon from "@vicons/fluent/ArrowClockwise16Filled";

const props = defineProps<{
  counter?: number;
}>();

const emit = defineEmits(["update:counter"]);

const counter = computed({
  get: () => props.counter ?? 0,
  set: (value) => emit("update:counter", value ?? 0),
});
</script>
