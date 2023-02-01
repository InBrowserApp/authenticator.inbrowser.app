<template>
  <span>
    <n-dropdown @select="handleSelect" :options="options" trigger="click">
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
    <ScreenCaptureImport v-model:show="shows.screen" v-if="supports.screen" />
    <CameraImport v-model:show="shows.camera" v-if="supports.camera" />
    <ManualImport v-model:show="shows.manual" />
    <PictureImport v-model:show="shows.picture" />
  </span>
</template>

<script setup lang="ts">
import { ref, h, type Component, computed, onMounted } from "vue";
import URIImport from "./uri/URIImport.vue";
import ScreenCaptureImport from "./screen/ScreenCaptureImport.vue";
import CameraImport from "./camera/CameraImport.vue";
import ManualImport from "./manual/ManualImport.vue";
import PictureImport from "./picture/PictureImport.vue";

import { NButton, NIcon, NDropdown } from "naive-ui";
import AddSquareMultiple16Regular from "@vicons/fluent/AddSquareMultiple16Regular";
import Link16Regular from "@vicons/fluent/Link16Regular";
import Desktop16Regular from "@vicons/fluent/Desktop16Regular";
import Camera16Regular from "@vicons/fluent/Camera16Regular";
import Password16Regular from "@vicons/fluent/Password16Regular";
import Image16Regular from "@vicons/fluent/Image16Regular";

import DetectRTC from "detectrtc";

const shows = ref<Record<string, boolean>>({
  uri: false,
  screen: false,
  camera: false,
  manual: false,
  picture: false,
});

const supports = ref({
  screen: false,
  camera: false,
});

onMounted(() => {
  DetectRTC.load(() => {
    supports.value.screen = DetectRTC.isScreenCapturingSupported;
    supports.value.camera = DetectRTC.hasWebcam;
  });
});

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const screenOptions = computed(() =>
  supports.value.screen
    ? [
        {
          label: "Screen Capture",
          key: "screen",
          icon: renderIcon(Desktop16Regular),
        },
      ]
    : []
);

const cameraOptions = computed(() =>
  supports.value.camera
    ? [
        {
          label: "Camera",
          key: "camera",
          icon: renderIcon(Camera16Regular),
        },
      ]
    : []
);

const options = computed(() => [
  ...screenOptions.value,
  ...cameraOptions.value,
  {
    label: "Picture",
    key: "picture",
    icon: renderIcon(Image16Regular),
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
]);

const handleSelect = (key: string) => {
  shows.value[key] = true;
};
</script>
