<template>
  <span>
    <n-dropdown @select="handleSelect" :options="options" trigger="click">
      <n-button text>
        <template #icon>
          <n-icon>
            <ArrowDownload16Regular />
          </n-icon>
        </template>
        Export
      </n-button>
    </n-dropdown>

    <OTPAuthMigrationExport v-model:show="shows.otpauthMigration" />
  </span>
</template>

<script setup lang="ts">
import { ref, h, type Component, computed } from "vue";

import OTPAuthMigrationExport from "./otpauth-migration/OTPAuthMigrationExport.vue";

import { NButton, NIcon, NDropdown } from "naive-ui";
import ArrowDownload16Regular from "@vicons/fluent/ArrowDownload16Regular";
import Google from "@vicons/fa/Google";

const shows = ref<Record<string, boolean>>({
  otpauthMigration: false,
});

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const options = computed(() => [
  {
    label: "Google Authenticator",
    key: "otpauthMigration",
    icon: renderIcon(Google),
  },
]);

const handleSelect = (key: string) => {
  shows.value[key] = true;
};
</script>
