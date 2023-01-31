<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 600px; max-width: 90vw"
      title="Config"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <OTPDeleteButton :id="otp.id" />
      </template>
      <n-scrollbar style="max-height: 70vh">
        <OTPInfoConfig v-model:otp="otp" />
      </n-scrollbar>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { NModal, NCard, NScrollbar } from "naive-ui";
import { useVModel } from "@vueuse/core";
import type { OTPInfo } from "@/data/otp";
import OTPInfoConfig from "./OTPInfoConfig.vue";
import OTPDeleteButton from "./OTPDeleteButton.vue";

const props = defineProps<{
  show: boolean;
  otp: OTPInfo;
}>();
const emit = defineEmits(["update:show", "update:otp"]);
const show = useVModel(props, "show", emit);
const otp = useVModel(props, "otp", emit);
</script>
