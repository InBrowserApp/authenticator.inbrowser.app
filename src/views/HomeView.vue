<template>
  <main>
    <OTPItem v-model:otp="info" />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import OTPItem from "@/components/otp/display/otp/OTPItem.vue";
import type { OTPInfo } from "@/data/otp";

const info = ref<OTPInfo>({
  options: {
    type: "hotp" as const,
    secret: "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD",
    issuer: "ACME",
    label: "AzureDiamond",
    algorithm: "SHA1" as const,
    digits: 6 as const,
    counter: 0 as const,
  },
});
</script>
