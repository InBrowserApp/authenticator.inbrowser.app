<template>
  <nav class="header-nav">
    <NavGitHub />
    <n-divider vertical />
    <ImportButton />
    <n-divider vertical />
    <ExportButton />
    <n-divider vertical />
    <SortButton />
  </nav>
</template>

<script lang="ts" setup>
import { NDivider } from "naive-ui";

import NavGitHub from "./NavGitHub.vue";
import ImportButton from "@/components/otp/import/ImportButton.vue";
import ExportButton from "@/components/otp/export/ExportButton.vue";
import SortButton from "@/components/otp/sort/SortButton.vue";
</script>

<style scoped>
@media (max-width: 1023px) {
  .header-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}
</style>
