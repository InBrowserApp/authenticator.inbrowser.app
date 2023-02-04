<template>
  <span>
    <div v-for="option of options" :key="option.key">
      <n-button text @click="shows[option.key] = true">
        <template #icon>
          <n-icon :component="option.icon" />
        </template>
        {{ option.label }}
      </n-button>
    </div>

    <URIImport v-model:show="shows.uri" />
    <ScreenCaptureImport v-model:show="shows.screen" v-if="supports.screen" />
    <CameraImport v-model:show="shows.camera" v-if="supports.camera" />
    <ManualImport v-model:show="shows.manual" />
    <PictureImport v-model:show="shows.picture" />
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import URIImport from "./uri/URIImport.vue";
import ScreenCaptureImport from "./screen/ScreenCaptureImport.vue";
import CameraImport from "./camera/CameraImport.vue";
import ManualImport from "./manual/ManualImport.vue";
import PictureImport from "./picture/PictureImport.vue";

import { NButton, NIcon } from "naive-ui";
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

const screenOptions = computed(() =>
  supports.value.screen
    ? [
        {
          label: "Screen Capture",
          key: "screen",
          icon: Desktop16Regular,
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
          icon: Camera16Regular,
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
    icon: Image16Regular,
  },
  {
    label: "URI",
    key: "uri",
    icon: Link16Regular,
  },
  {
    label: "Manual",
    key: "manual",
    icon: Password16Regular,
  },
]);
</script>
