<template>
  <n-button quaternary circle @click="counter += 1">
    <n-badge :value="counter" show-zero color="grey" />
  </n-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NButton, NBadge } from "naive-ui";

const props = defineProps<{
  counter?: number;
}>();

const emit = defineEmits(["update:counter"]);

const counter = computed({
  get: () => props.counter ?? 0,
  set: (value) => emit("update:counter", value ?? 0),
});
</script>
