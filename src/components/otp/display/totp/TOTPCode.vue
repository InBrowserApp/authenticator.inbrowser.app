<template>
  {{ token }}
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TOTP } from "otpauth";

const props = defineProps<{
  options: {
    secret: string;
  };
}>();

// Create a new TOTP object.
const totp = computed(
  () =>
    new TOTP({
      issuer: "ACME",
      label: "AzureDiamond",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: props.options.secret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    })
);

const token = computed(() => totp.value.generate());
</script>
