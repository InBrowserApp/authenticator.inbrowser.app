<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 600px"
      title="Import from URI"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-input-group>
        <n-input
          v-model:value="uri"
          type="text"
          placeholder="otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example"
        />
        <n-button @click="onClick">Import</n-button>
      </n-input-group>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NModal,
  NCard,
  NInput,
  NButton,
  NInputGroup,
  useMessage,
} from "naive-ui";
import { parseURIToOTPOptions } from "@/data/otp";
import { useVModel } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { useOTPInfosStore } from "@/stores/otpInfos";
import { parseURI } from "@/data/otpauth-migration";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["update:show"]);
const show = useVModel(props, "show", emit);

const OTPInfosStore = useOTPInfosStore();

// otpauth://totp/Test%20Issuer:Test%20Label?issuer=Test%20Issuer&secret=KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD&algorithm=SHA1&digits=6&period=30
const uri = ref<string>("");
const message = useMessage();

const onClick = async () => {
  try {
    if (uri.value.startsWith("otpauth://")) {
      const options = parseURIToOTPOptions(uri.value);
      const id = uuidv4();

      OTPInfosStore.add({ id, options });
      message.success("Imported OTP successfully");
    } else if (uri.value.startsWith("otpauth-migration://")) {
      const optionsList = await parseURI(uri.value);
      for (const options of optionsList) {
        const id = uuidv4();
        OTPInfosStore.add({ id, options });
      }
      message.success(`Imported ${optionsList.length} OTPs successfully`);
    }

    uri.value = "";
    show.value = false;
  } catch (e) {
    message.error("Failed to import OTP: " + (e as DOMException).message);
  }
};
</script>
