<template>
  <n-thing>
    <template #header>
      {{ name }}
    </template>

    <OTPToken :token="token" />
  </n-thing>
</template>

<script setup lang="ts">
import OTPToken from "./OTPToken.vue";
import { NThing } from "naive-ui";
import { useTOTP } from "@/composables/otp/useTOTP";
import { toRef } from "vue";

const props = defineProps<{
  options: {
    secret: string;
  };
  name: string;
}>();

const options = toRef(props, "options");

const { token } = useTOTP(options);
</script>
