<template>
  <n-thing>
    <template #header>
      {{ name }}
    </template>

    <TOTPCodeVue :options="options" />
  </n-thing>
</template>

<script setup lang="ts">
import TOTPCodeVue from "../totp/TOTPCode.vue";
import { NThing } from "naive-ui";

defineProps<{
  options: {
    secret: string;
  };
  name: string;
}>();
</script>
