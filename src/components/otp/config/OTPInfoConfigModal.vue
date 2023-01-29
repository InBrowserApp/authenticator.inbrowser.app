<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 600px"
      title="Config"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <OTPInfoConfig v-model:otp="otp" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { NModal, NCard } from "naive-ui";
import { useVModel } from "@vueuse/core";
import type { OTPInfo } from "@/data/otp";
import OTPInfoConfig from "./OTPInfoConfig.vue";

const props = defineProps<{
  show: boolean;
  otp: OTPInfo;
}>();
const emit = defineEmits(["update:show", "update:otp"]);
const show = useVModel(props, "show", emit);
const otp = useVModel(props, "otp", emit);
</script>
