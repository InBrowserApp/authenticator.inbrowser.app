<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 600px"
      title="Import from Camera"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #cover>
        <video
          ref="captureVideo"
          class="capture-video"
          autoplay
          playsinline
          muted
        ></video>
      </template>
      <template #header-extra>
        <n-button @click="startCapturing" v-show="!recording" quaternary circle>
          <template #icon>
            <n-icon :component="Camera16Regular" />
          </template>
        </n-button>
        <n-button @click="stopCapturing" v-show="recording" quaternary circle>
          <template #icon>
            <n-icon :component="RecordStop16Filled" />
          </template>
        </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { NModal, NCard, NButton, NIcon, useMessage } from "naive-ui";
import { useVModel } from "@vueuse/core";
import Camera16Regular from "@vicons/fluent/Camera16Regular";
import RecordStop16Filled from "@vicons/fluent/RecordStop16Filled";
import QrScanner from "qr-scanner";
import { useIntervalFn } from "@vueuse/core";
import { parseURIToOTPOptions } from "@/data/otp";
import { v4 as uuidv4 } from "uuid";
import { useOTPInfosStore } from "@/stores/otpInfos";

const OTPInfosStore = useOTPInfosStore();
const message = useMessage();

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["update:show"]);
const show = useVModel(props, "show", emit);
const recording = ref(false);

const captureVideo = ref<HTMLVideoElement | null>(null);

const displayMediaOptions = {
  video: true,
  audio: false,
};

watch(show, (show) => {
  if (show) {
    nextTick(startCapturing);
  } else {
    stopCapturing();
  }
});

const startCapturing = async () => {
  try {
    if (captureVideo.value) {
      const captureStream = await navigator.mediaDevices.getUserMedia(
        displayMediaOptions
      );

      captureVideo.value.srcObject = captureStream;
      captureStream.getVideoTracks()[0].addEventListener("ended", () => {
        recording.value = false;
      });
      recording.value = true;
    }
  } catch (err) {
    console.error("Error: " + err);
  }
};

const stopCapturing = async () => {
  try {
    if (captureVideo.value) {
      const captureStream = captureVideo.value.srcObject as MediaStream;
      captureStream.getTracks().forEach((track) => track.stop());
      captureVideo.value.srcObject = null;
      recording.value = false;
    }
  } catch (err) {
    console.error("Error: " + err);
  }
};

const { pause, resume } = useIntervalFn(async () => {
  if (captureVideo.value && recording.value) {
    try {
      const result = await QrScanner.scanImage(captureVideo.value, {
        returnDetailedScanResult: true,
      });
      if (result) {
        const uri = result.data;
        if (uri.startsWith("otpauth://")) {
          try {
            const options = parseURIToOTPOptions(uri);
            const id = uuidv4();
            OTPInfosStore.add({ id, options });

            message.success(`Imported OTP ${options.label} successfully`);
            show.value = false;
            stopCapturing();
          } catch (err) {
            message.error("Failed to import OTP");
          }
        }
      }
    } catch (err) {
      return;
    }
  }
}, 500);

watch(recording, (recording) => {
  if (recording) {
    resume();
  } else {
    pause();
  }
});
</script>

<style scoped>
.capture-video {
  width: 100%;
}
</style>
