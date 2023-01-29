<template>
  <main>
    <TOTPCode :options="{ secret: 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD' }" />
  </main>
</template>

<script setup lang="ts">
import TOTPCode from "@/components/otp/display/totp/TOTPCode.vue";
</script>
