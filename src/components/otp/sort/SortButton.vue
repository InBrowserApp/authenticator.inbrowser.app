<template>
  <n-dropdown @select="handleSelect" :options="options" trigger="click">
    <n-button text>
      <template #icon>
        <n-icon>
          <ArrowSortDownLines16Regular />
        </n-icon>
      </template>
      Sort
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h, type Component, computed } from "vue";
import { useMetadataStore, type SortBy } from "@/stores/metadata";
import SortOptionLabel from "./SortOptionLabel.vue";

import { NButton, NIcon, NDropdown } from "naive-ui";
import ArrowSortDownLines16Regular from "@vicons/fluent/ArrowSortDownLines16Regular";
import CalendarLtr16Regular from "@vicons/fluent/CalendarLtr16Regular";
import Apps16Regular from "@vicons/fluent/Apps16Regular";

const metadataStore = useMetadataStore();

const renderLabel = (by: SortBy, label: string) => {
  return () => {
    return h(
      SortOptionLabel,
      {
        show: metadataStore.metadata.sort.by === by,
        value: metadataStore.metadata.sort.type,
      },
      { default: () => label }
    );
  };
};

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const options = computed(() => [
  {
    label: renderLabel("date", "Create Date"),
    key: "date",
    icon: renderIcon(CalendarLtr16Regular),
  },
  {
    label: renderLabel("issuer", "Issuer"),
    key: "issuer",
    icon: renderIcon(Apps16Regular),
  },
]);

const handleSelect = (by: SortBy) => {
  metadataStore.set("sort", {
    by: by,
    type:
      metadataStore.metadata.sort.by === by &&
      metadataStore.metadata.sort.type === "asc"
        ? "desc"
        : "asc",
  });
};
</script>
