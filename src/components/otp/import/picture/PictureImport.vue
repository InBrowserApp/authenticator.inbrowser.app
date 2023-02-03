<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 600px"
      title="Import from Picture"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-upload
        @before-upload="beforeUpload"
        accept="image/*"
        :multiple="false"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ImageAdd24Regular />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            Click or drop file to import
          </n-text>
        </n-upload-dragger>
      </n-upload>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import {
  NModal,
  NCard,
  useMessage,
  NIcon,
  NText,
  NUpload,
  type UploadFileInfo,
} from "naive-ui";
import { useVModel } from "@vueuse/core";
import QrScanner from "qr-scanner";
import { parseURIToOTPOptions } from "@/data/otp";
import { v4 as uuidv4 } from "uuid";
import { useOTPInfosStore } from "@/stores/otpInfos";
import { NUploadDragger } from "naive-ui";
import ImageAdd24Regular from "@vicons/fluent/ImageAdd24Regular";
import { OTPAuthMigration } from "otpauth-migration";

const OTPInfosStore = useOTPInfosStore();
const message = useMessage();

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["update:show"]);
const show = useVModel(props, "show", emit);

const handleFile = async (blob: Blob) => {
  try {
    const result = await QrScanner.scanImage(blob, {
      returnDetailedScanResult: true,
    });
    const uri = result.data;
    if (uri.startsWith("otpauth://")) {
      try {
        const options = parseURIToOTPOptions(uri);
        const id = uuidv4();
        OTPInfosStore.add({ id, options });

        message.success(
          `Imported OTP ${options.issuer} (${options.label}) successfully`
        );
        show.value = false;
      } catch (err) {
        throw new Error("Failed to parse OTP URI");
      }
    } else if (uri.startsWith("otpauth-migration://")) {
      try {
        const optionsList = OTPAuthMigration.parseURI(uri);
        for (const options of optionsList) {
          const id = uuidv4();
          OTPInfosStore.add({
            id,
            options: {
              ...options,
              label: options.name,
            },
          });
        }

        message.success(`Imported ${optionsList.length} OTPs successfully`);
        show.value = false;
      } catch (err) {
        throw new Error("Failed to parse OTP Migration URI");
      }
    } else {
      throw new Error("Not a valid OTP QR Code");
    }
  } catch (err) {
    message.error(`Failed to import OTP: ${err}`);
  }
};

async function beforeUpload(data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) {
  await handleFile(data.file.file!);

  return false;
}
</script>
