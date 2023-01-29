<template>
  <n-thing>
    <template #header>
      {{ options.label }}
    </template>

    <template #header-extra>
      <n-space>
        <div>
          <TOTPRemainTimeIndicator
            :period="options.period"
            v-if="options.type === 'totp'"
          />
        </div>

        <OTPOptionsButton v-model:otp="otp" />
      </n-space>
    </template>
    <OTPToken :token="token" style="font-size: 3em" />
  </n-thing>
</template>

<script setup lang="ts">
import OTPToken from "./OTPToken.vue";
import { NThing, NSpace } from "naive-ui";
import { useOTP } from "@/composables/otp/useOTP";
import { toRef } from "vue";
import { toRefs } from "@vueuse/core";
import OTPOptionsButton from "./OTPOptionsButton.vue";
import TOTPRemainTimeIndicator from "../totp/TOTPRemainTimeIndicator.vue";
import type { OTPInfo } from "@/data/otp";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  otp: OTPInfo;
}>();

const emit = defineEmits(["update:otp"]);
const otp = useVModel(props, "otp", emit);

const { options } = toRefs(toRef(props, "otp"));

const { token } = useOTP(options);
</script>
