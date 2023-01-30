<template>
  <div>
    <n-dropdown @select="handleSelect" :options="options">
      <n-button text>
        <template #icon>
          <n-icon>
            <AddSquareMultiple16Regular />
          </n-icon>
        </template>
        Import
      </n-button>
    </n-dropdown>

    <URIImport v-model:show="shows.uri" />
    <ScreenCaptureImport v-model:show="shows.screen" />
  </div>
</template>

<script setup lang="ts">
import { ref, h, type Component } from "vue";
import URIImport from "./uri/URIImport.vue";
import ScreenCaptureImport from "./screen/ScreenCaptureImport.vue";
import { NButton, NIcon, NDropdown } from "naive-ui";
import AddSquareMultiple16Regular from "@vicons/fluent/AddSquareMultiple16Regular";
import Link16Regular from "@vicons/fluent/Link16Regular";

const shows = ref<Record<string, boolean>>({
  uri: false,
  screen: false,
});

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const options = [
  {
    label: "URI",
    key: "uri",
    icon: renderIcon(Link16Regular),
  },
  {
    label: "Screen Capture",
    key: "screen",
    icon: renderIcon(Link16Regular),
  },
];

const handleSelect = (key: string) => {
  shows.value[key] = true;
};
</script>
