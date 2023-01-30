<template>
  <main>
    <OTPItemIDWrapper :id="id" v-for="id in OTPInfosStore.order" :key="id" />
    <ImportButton />
  </main>
</template>

<script setup lang="ts">
import OTPItemIDWrapper from "@/components/otp/display/otp/OTPItemIDWrapper.vue";
import { useOTPInfosStore } from "@/stores/otpInfos";
import ImportButton from "@/components/otp/import/ImportButton.vue";

const OTPInfosStore = useOTPInfosStore();
</script>
