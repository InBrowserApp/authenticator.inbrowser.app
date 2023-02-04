<template>
  <main>
    <template v-if="orderStore.order.length > 0">
      <OTPItemIDWrapper :id="id" v-for="id in orderStore.order" :key="id" />
    </template>
    <template v-else>
      <n-h2 prefix="bar" align-text>Import</n-h2>
      <ImportHomeView />
    </template>
  </main>
</template>

<script setup lang="ts">
import OTPItemIDWrapper from "@/components/otp/display/otp/OTPItemIDWrapper.vue";
import { useOrderStore } from "@/stores/order";
import { useHead } from "@vueuse/head";
import { NH2 } from "naive-ui";
import ImportHomeView from "@/components/otp/import/ImportHomeView.vue";

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
