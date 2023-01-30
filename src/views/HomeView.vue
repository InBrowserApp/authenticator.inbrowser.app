<template>
  <main>
    <OTPItemIDWrapper :id="id" v-for="id in orderStore.order" :key="id" />
    <ImportButton />
  </main>
</template>

<script setup lang="ts">
import OTPItemIDWrapper from "@/components/otp/display/otp/OTPItemIDWrapper.vue";
import ImportButton from "@/components/otp/import/ImportButton.vue";
import { useOrderStore } from "@/stores/order";

const orderStore = useOrderStore();
</script>
