<template>
  <n-modal :show="false">
    <n-card
      style="width: 600px"
      title="Import from Camera"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #cover>
        <video ref="cameraVideo" class="camera-video"></video>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import QrScanner from "qr-scanner";
import { ref, onMounted } from "vue";
import { NModal, NCard } from "naive-ui";

const cameraVideo = ref<HTMLVideoElement | null>(null);
const qrScanner = ref<QrScanner | null>(null);
const loadedCamera = ref(false);

onMounted(async () => {
  if (cameraVideo.value) {
    qrScanner.value = new QrScanner(
      cameraVideo.value,
      (result) => console.log("decoded qr code:", result),
      {}
    );
    await qrScanner.value.start();
    loadedCamera.value = true;
  }
});
</script>

<style scoped>
.camera-video {
  width: 100%;
}
</style>
