<template>
  <n-collapse>
    <n-collapse-item title="QR Code" name="QR Code">
      <div style="display: flex; justify-content: center">
        <OTPQRCode :options="options" />
      </div>
    </n-collapse-item>
    <n-collapse-item title="Key URI" name="key uri">
      <div><OTPURIInput v-model:options="options" /></div>
    </n-collapse-item>
    <n-collapse-item title="Parameters" name="parameters">
      <div>
        <n-form-item label="Type">
          <n-switch v-model:value="typeComputed">
            <template #checked>TOTP</template>
            <template #unchecked>HOTP</template>
          </n-switch>
        </n-form-item>
        <n-form-item label="Label">
          <n-input v-model:value="options.label" placeholder="Label" />
        </n-form-item>
        <n-form-item label="Issuer">
          <n-input v-model:value="options.issuer" placeholder="Issuer" />
        </n-form-item>
        <n-form-item label="Secret">
          <n-input
            v-model:value="options.secret"
            placeholder="Secret"
            type="password"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item label="Algorithm">
          <n-select
            v-model:value="options.algorithm"
            :options="algorithmOptions"
          />
        </n-form-item>
        <n-form-item label="Period" v-if="options.type === 'totp'">
          <n-input-number
            v-model:value="options.period"
            :min="0"
            placeholder="30"
          />
        </n-form-item>
        <n-form-item label="Counter" v-if="options.type === 'hotp'">
          <n-input-number
            v-model:value="options.counter"
            :min="0"
            placeholder="0"
          />
        </n-form-item>
        <n-form-item label="Digits">
          <n-input-number
            v-model:value="options.digits"
            :min="0"
            placeholder="6"
          />
        </n-form-item>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OTPOptions } from "@/data/otp";
import { useVModel } from "@vueuse/core";
import OTPURIInput from "./OTPURIInput.vue";
import {
  NFormItem,
  NInput,
  NSelect,
  NInputNumber,
  NSwitch,
  NCollapse,
  NCollapseItem,
} from "naive-ui";
import OTPQRCode from "@/components/otp/display/otp/OTPQRCode.vue";

const props = defineProps<{
  options: OTPOptions;
}>();
const emit = defineEmits(["update:options"]);
const options = useVModel(props, "options", emit);

const algorithmOptions = [
  { label: "SHA1", value: "SHA1" },
  { label: "SHA256", value: "SHA256" },
  { label: "SHA512", value: "SHA512" },
];

const typeComputed = computed({
  get: () => options.value.type === "totp",
  set: (value: boolean) => {
    options.value.type = value ? "totp" : "hotp";
  },
});
</script>
