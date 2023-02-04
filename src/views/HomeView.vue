<template>
  <main>
    <OTPItemIDWrapper :id="id" v-for="id in orderStore.order" :key="id" />
  </main>
</template>

<script setup lang="ts">
import OTPItemIDWrapper from "@/components/otp/display/otp/OTPItemIDWrapper.vue";
import { useOrderStore } from "@/stores/order";
import { useHead } from "@vueuse/head";

useHead({
  title: "Authenticator InBrowser.App",
  meta: [
    {
      name: "description",
      content:
        "Authenticator InBrowser.App is an offline-capable TOTP & HOTP Authenticator. All data stay securely in your browser.",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `https://authenticator.inbrowser.app/`,
    },
  ],
});

const orderStore = useOrderStore();
</script>
