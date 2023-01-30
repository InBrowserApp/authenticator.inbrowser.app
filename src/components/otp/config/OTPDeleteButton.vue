<template>
  <n-button quaternary circle @click="OTPInfosStore.del(id)">
    <template #icon>
      <n-icon :component="Delete16Regular" />
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import Delete16Regular from "@vicons/fluent/Delete16Regular";
import { useOTPInfosStore } from "@/stores/otpInfos";

const OTPInfosStore = useOTPInfosStore();

defineProps<{
  id: string;
}>();
</script>
