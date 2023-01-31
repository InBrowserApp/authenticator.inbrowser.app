<template>
  <div>
    <!-- header -->
    <div style="display: flex; justify-content: space-between">
      <!-- header main -->
      <div>
        <n-text style="margin-right: 0.3em">{{ options.issuer }}</n-text>
        <n-text depth="3">({{ options.label }})</n-text>
      </div>

      <!-- header extra -->
      <div style="display: flex">
        <div>
          <TOTPRemainTimeIndicator
            :period="options.period"
            v-if="options.type === 'totp'"
          />
          <HOTPRefreshButton
            v-model:counter="options.counter"
            v-if="options.type === 'hotp'"
          />
        </div>

        <OTPOptionsButton v-model:otp="otp" />
      </div>
    </div>

    <div>
      <HOTPToken v-if="options.type === 'hotp'" v-model:options="options" />
      <TOTPToken v-if="options.type === 'totp'" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NText } from "naive-ui";
import { toRef } from "vue";
import { toRefs } from "@vueuse/core";
import OTPOptionsButton from "./OTPOptionsButton.vue";
import TOTPRemainTimeIndicator from "../totp/TOTPRemainTimeIndicator.vue";
import type { OTPInfo } from "@/data/otp";
import { useVModel } from "@vueuse/core";
import HOTPToken from "../hotp/HOTPToken.vue";
import TOTPToken from "../totp/TOTPToken.vue";
import HOTPRefreshButton from "../hotp/HOTPRefreshButton.vue";

const props = defineProps<{
  otp: OTPInfo;
}>();

const emit = defineEmits(["update:otp"]);
const otp = useVModel(props, "otp", emit);

const { options } = toRefs(toRef(props, "otp"));
</script>
