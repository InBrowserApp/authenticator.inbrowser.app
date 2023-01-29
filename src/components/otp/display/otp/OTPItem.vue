<template>
  <n-thing>
    <template #header>
      {{ options.label }}
    </template>

    <template #header-extra>
      <n-space>
        <TOTPRemainTimeIndicator :period="period" />
        <OTPOptionsButton />
      </n-space>
    </template>

    <OTPToken :token="token" style="font-size: 3em" />
  </n-thing>
</template>

<script setup lang="ts">
import OTPToken from "./OTPToken.vue";
import { NThing, NSpace } from "naive-ui";
import { useTOTP } from "@/composables/otp/useTOTP";
import { toRef } from "vue";
import { toRefs } from "@vueuse/core";
import OTPOptionsButton from "./OTPOptionsButton.vue";
import TOTPRemainTimeIndicator from "../totp/TOTPRemainTimeIndicator.vue";
import type { OTPInfo } from "@/data/otp";

const props = defineProps<{
  otp: OTPInfo;
}>();

const { options } = toRefs(toRef(props, "otp"));

const { token, period } = useTOTP(options);
</script>
