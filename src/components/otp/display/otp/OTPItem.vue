<template>
  <n-thing>
    <template #header>
      {{ options.label }}
    </template>

    <template #header-extra>
      <div style="display: flex">
        <div>
          <TOTPRemainTimeIndicator
            :period="options.period"
            v-if="options.type === 'totp'"
          />
          <HOTPCounter
            v-model:counter="options.counter"
            v-if="options.type === 'hotp'"
          />
        </div>

        <OTPDeleteButton :id="otp.id" />
        <OTPOptionsButton v-model:otp="otp" />
      </div>
    </template>
    <OTPToken :token="token" style="font-size: 3em" />
  </n-thing>
</template>

<script setup lang="ts">
import OTPToken from "./OTPToken.vue";
import { NThing } from "naive-ui";
import { useOTP } from "@/composables/otp/useOTP";
import { toRef } from "vue";
import { toRefs } from "@vueuse/core";
import OTPOptionsButton from "./OTPOptionsButton.vue";
import TOTPRemainTimeIndicator from "../totp/TOTPRemainTimeIndicator.vue";
import OTPDeleteButton from "./OTPDeleteButton.vue";
import type { OTPInfo } from "@/data/otp";
import { useVModel } from "@vueuse/core";
import HOTPCounter from "../hotp/HOTPCounter.vue";

const props = defineProps<{
  otp: OTPInfo;
}>();

const emit = defineEmits(["update:otp"]);
const otp = useVModel(props, "otp", emit);

const { options } = toRefs(toRef(props, "otp"));

const { token } = useOTP(options);
</script>
