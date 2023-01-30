<template>
  <main>
    <OTPItem v-model:otp="info" />
  </main>
</template>

<script setup lang="ts">
import OTPItem from "@/components/otp/display/otp/OTPItem.vue";
import { useOTPInfo } from "@/data/otp/composables/useOTPInfo";

const props = defineProps<{
  id: string;
}>();

const info = useOTPInfo(props.id);
</script>
