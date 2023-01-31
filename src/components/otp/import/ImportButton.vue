<template>
  <span>
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
    <CameraImport v-model:show="shows.camera" />
    <ManualImport v-model:show="shows.manual" />
  </span>
</template>

<script setup lang="ts">
import { ref, h, type Component } from "vue";
import URIImport from "./uri/URIImport.vue";
import ScreenCaptureImport from "./screen/ScreenCaptureImport.vue";
import CameraImport from "./camera/CameraImport.vue";
import ManualImport from "./manual/ManualImport.vue";

import { NButton, NIcon, NDropdown } from "naive-ui";
import AddSquareMultiple16Regular from "@vicons/fluent/AddSquareMultiple16Regular";
import Link16Regular from "@vicons/fluent/Link16Regular";
import Desktop16Regular from "@vicons/fluent/Desktop16Regular";
import Camera16Regular from "@vicons/fluent/Camera16Regular";
import Password16Regular from "@vicons/fluent/Password16Regular";

const shows = ref<Record<string, boolean>>({
  uri: false,
  screen: false,
  camera: false,
  manual: false,
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
    label: "Screen Capture",
    key: "screen",
    icon: renderIcon(Desktop16Regular),
  },
  {
    label: "Camera",
    key: "camera",
    icon: renderIcon(Camera16Regular),
  },
  {
    label: "URI",
    key: "uri",
    icon: renderIcon(Link16Regular),
  },
  {
    label: "Manual",
    key: "manual",
    icon: renderIcon(Password16Regular),
  },
];

const handleSelect = (key: string) => {
  shows.value[key] = true;
};
</script>
