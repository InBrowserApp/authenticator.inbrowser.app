<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 600px"
      title="Import from Secret"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form-item label="Secret">
        <n-input
          v-model:value="options.secret"
          placeholder="HXDMVJECJJWSRB3……"
        />
      </n-form-item>
      <n-form-item label="Issuer">
        <n-input v-model:value="options.issuer" placeholder="Example" />
      </n-form-item>
      <n-form-item label="Label">
        <n-input
          v-model:value="options.label"
          placeholder="alice@example.com"
        />
      </n-form-item>
      <div style="text-align: right">
        <n-button @click="onClick">Import</n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NModal,
  NCard,
  NInput,
  useMessage,
  NFormItem,
  NButton,
} from "naive-ui";
import { useVModel } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { useOTPInfosStore } from "@/stores/otpInfos";
import type { OTPOptions } from "@/data/otp";

const options = ref<OTPOptions>({
  type: "totp",
  issuer: "",
  label: "",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: "",
});

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["update:show"]);
const show = useVModel(props, "show", emit);

const OTPInfosStore = useOTPInfosStore();

const message = useMessage();

const onClick = () => {
  try {
    const id = uuidv4();

    OTPInfosStore.add({ id, options: options.value });

    message.success("Imported OTP successfully");
    options.value = {
      type: "totp",
      issuer: "",
      label: "",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: "",
    };
    show.value = false;
  } catch (e) {
    message.error("Failed to import OTP: " + (e as DOMException).message);
  }
};
</script>
