<template>
  <n-space>
    <n-text><slot></slot></n-text>
    <n-tooltip trigger="hover" v-if="show">
      <template #trigger>
        <n-switch :value="value" checked-value="asc" unchecked-value="desc">
          <template #checked-icon>
            <n-icon :component="ArrowSortDown16Regular" />
          </template>
          <template #unchecked-icon>
            <n-icon :component="ArrowSortUp16Regular" />
          </template>
        </n-switch>
      </template>
      {{ value === "asc" ? "Ascending" : "Descending" }}
    </n-tooltip>
  </n-space>
</template>

<script setup lang="ts">
import type { SortType } from "@/stores/metadata";

import { NTooltip, NSpace, NText, NSwitch, NIcon } from "naive-ui";
import ArrowSortUp16Regular from "@vicons/fluent/ArrowSortUp16Regular";
import ArrowSortDown16Regular from "@vicons/fluent/ArrowSortDown16Regular";

defineProps<{
  show: boolean;
  value: SortType;
}>();
</script>
