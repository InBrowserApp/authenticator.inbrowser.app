<template>
  <main>
    <OTPItem
      name="GitHub"
      :options="{ secret: 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD' }"
    />
  </main>
</template>

<script setup lang="ts">
import OTPItem from "@/components/otp/display/otp/OTPItem.vue";
</script>
