<template>
  <main>
    <OTPItemIDWrapper :id="id" v-for="id in order" :key="id" />
  </main>
</template>

<script setup lang="ts">
import OTPItemIDWrapper from "@/components/otp/display/otp/OTPItemIDWrapper.vue";
import { useOTPInfosOrder } from "@/data/otp/composables/useOTPInfos";

const { order } = useOTPInfosOrder();
</script>
