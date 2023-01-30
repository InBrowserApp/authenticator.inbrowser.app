<template>
  <main>
    <OTPItem v-model:otp="info" />
  </main>
</template>

<script setup lang="ts">
import OTPItem from "@/components/otp/display/otp/OTPItem.vue";
import type { OTPInfo } from "@/data/otp";
import { useStorage } from "@vueuse/core";

const props = defineProps<{
  id: string;
}>();

const info = useStorage<OTPInfo>(`authenticator:otp:${props.id}`, {
  id: props.id,
  options: {
    type: "totp" as const,
    secret: "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD",
    issuer: "Test",
    label: "Test",
    algorithm: "SHA1" as const,
    digits: 6 as const,
    period: 30 as const,
  },
});
</script>
