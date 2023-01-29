<template>
  <span>
    <!-- {{ token }} -->
    {{ tokenAnimated }}
  </span>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useTokenAnimated } from "@/composables/otp/useTokenAnimated";

const props = defineProps<{
  token: string;
}>();

const tokenAnimated = useTokenAnimated(toRef(props, "token"));
</script>
