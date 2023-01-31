<template>
  <OTPTokenWrapper @click="onClick">
    <OTPToken :token="token"></OTPToken>
  </OTPTokenWrapper>
</template>

<script setup lang="ts">
import type { TOTPOptions } from "@/data/otp";
import { toRef } from "vue";
import { useOTP } from "@/composables/otp/useOTP";
import OTPToken from "../otp/OTPToken.vue";
import OTPTokenWrapper from "../otp/OTPTokenWrapper.vue";
import { useCopyToClipboard } from "@/composables/common/useCopyToClipboard";

const copy = useCopyToClipboard();

const props = defineProps<{
  options: TOTPOptions;
}>();

const options = toRef(props, "options");

const { token } = useOTP(options);

const onClick = () => {
  copy(token.value);
};
</script>
