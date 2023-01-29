<template>
  <main>
    <OTPItem :otp="OTPInfo" />
  </main>
</template>

<script setup lang="ts">
import OTPItem from "@/components/otp/display/otp/OTPItem.vue";

const OTPInfo = {
  options: {
    type: "totp" as const,
    secret: "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD",
    issuer: "ACME",
    label: "AzureDiamond",
    algorithm: "SHA1" as const,
    digits: 6 as const,
    period: 30 as const,
  },
};
</script>
