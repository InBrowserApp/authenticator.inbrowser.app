<template>
  <main>
    <OTPItem v-model:otp="OTPInfosStore.infos[props.id]" />
  </main>
</template>

<script setup lang="ts">
import OTPItem from "@/components/otp/display/otp/OTPItem.vue";
import { useOTPInfosStore } from "@/stores/otpInfos";

const props = defineProps<{
  id: string;
}>();

const OTPInfosStore = useOTPInfosStore();
</script>
