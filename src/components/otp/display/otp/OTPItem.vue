<template>
  <n-thing>
    <template #header>
      {{ name }}
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
import OTPOptionsButton from "./OTPOptionsButton.vue";
import TOTPRemainTimeIndicator from "../totp/TOTPRemainTimeIndicator.vue";

const props = defineProps<{
  options: {
    secret: string;
  };
  name: string;
}>();

const options = toRef(props, "options");

const { token, period } = useTOTP(options);
</script>
