<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 600px"
      title="Google Authenticator Export"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div style="display: flex; justify-content: center">
        <vue-qrcode
          :value="uri"
          :options="{ width: 200 }"
          tag="svg"
        ></vue-qrcode>
      </div>

      <n-button text @click="onClick">
        <template #icon>
          <n-icon>
            <ArrowDownload16Regular />
          </n-icon>
        </template>
        Download QR Code</n-button
      >
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NCard, NButton, NIcon } from "naive-ui";
import { useVModel } from "@vueuse/core";
import { computed } from "vue";
import { useOTPInfosStore } from "@/stores/otpInfos";
import { useOrderStore } from "@/stores/order";
import { OTPAuthMigration, type OTPInfo } from "otpauth-migration";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import ArrowDownload16Regular from "@vicons/fluent/ArrowDownload16Regular";
import QRCode from "qrcode";

const orderStore = useOrderStore();
const OTPInfosStore = useOTPInfosStore();

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["update:show"]);
const show = useVModel(props, "show", emit);

const infos = computed<OTPInfo[]>(() => {
  return orderStore.order.map((id) => {
    const info = OTPInfosStore.infos[id];
    return {
      ...info.options,
      name: info.options.label,
    } as OTPInfo;
  });
});

const uri = computed(() => {
  return OTPAuthMigration.toURI(infos.value);
});

const onClick = async () => {
  const dataURL = await new Promise<string>((resolve, reject) => {
    QRCode.toDataURL(
      uri.value,
      {
        width: 200,
        margin: 4,
      },
      function (err, url) {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      }
    );
  });

  // download use a tag
  const blob = await (await fetch(dataURL)).blob();
  const url = URL.createObjectURL(blob);

  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.download = "OTP-export.png";
  aTag.click();
  aTag.remove();
  URL.revokeObjectURL(url);
};
</script>
