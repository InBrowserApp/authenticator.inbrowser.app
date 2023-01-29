<template>
  <div>
    <n-button quaternary circle @click="showModal = true">
      <template #icon>
        <n-icon :component="Settings20Filled" />
      </template>
    </n-button>
    <OTPInfoConfigModal v-model:show="showModal" v-model:otp="otp" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NButton, NIcon } from "naive-ui";
import Settings20Filled from "@vicons/fluent/Settings20Filled";
import OTPInfoConfigModal from "../../config/OTPInfoConfigModal.vue";
import type { OTPInfo } from "@/data/otp";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  otp: OTPInfo;
}>();
const emit = defineEmits(["update:otp"]);
const otp = useVModel(props, "otp", emit);

const showModal = ref(false);
</script>
