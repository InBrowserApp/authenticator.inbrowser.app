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
import { parseURIToOTPOptions, insertInfo } from "@/data/otp";
import { useVModel } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { useOrderStore } from "@/stores/order";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["update:show"]);
const show = useVModel(props, "show", emit);

const orderStore = useOrderStore();

// otpauth://totp/Test%20Issuer:Test%20Label?issuer=Test%20Issuer&secret=KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD&algorithm=SHA1&digits=6&period=30
const uri = ref<string>("");
const message = useMessage();

const onClick = () => {
  try {
    const options = parseURIToOTPOptions(uri.value);
    const id = uuidv4();
    insertInfo({ id, options });
    orderStore.add(id);

    message.success("Imported OTP successfully");
    uri.value = "";
    show.value = false;
  } catch (e) {
    message.error("Failed to import OTP: " + (e as DOMException).message);
  }
};
</script>
