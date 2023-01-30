<template>
  <span>
    <span style="margin-right: 0.4em">{{ firstPart }}</span
    ><span>{{ secondPart }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
// import { useTokenAnimated } from "@/composables/otp/useTokenAnimated";

const props = defineProps<{
  token: string;
}>();

// divide token to two part
const divideIndex = computed(() => Math.round(props.token.length / 2));
const firstPart = computed(() => props.token.slice(0, divideIndex.value));
const secondPart = computed(() => props.token.slice(divideIndex.value));

// const tokenAnimated = useTokenAnimated(toRef(props, "token"));
</script>
