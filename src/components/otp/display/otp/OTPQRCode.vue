<template>
  <vue-qrcode :value="uri" :options="{ width: 200 }" tag="svg"></vue-qrcode>
</template>

<script setup lang="ts">
import { useOTP } from "@/composables/otp/useOTP";
import { toRef } from "vue";
import type { OTPOptions } from "@/data/otp";
import VueQrcode from "@chenfengyuan/vue-qrcode";

const props = defineProps<{
  options: OTPOptions;
}>();

const options = toRef(props, "options");
const { uri } = useOTP(options);
</script>
