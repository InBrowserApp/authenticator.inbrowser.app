<template>
  {{ token }}
  {{ remainTime }}
</template>

<script setup lang="ts">
import { useTOTP } from "@/composables/otp/useTOTP";
import { toRef } from "vue";

const props = defineProps<{
  options: {
    secret: string;
  };
}>();

const options = toRef(props, "options");

const { token, remainTime } = useTOTP(options);
</script>
