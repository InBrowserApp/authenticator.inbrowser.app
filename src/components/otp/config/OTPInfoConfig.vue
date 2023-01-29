<template>
  <span>
    <n-form>
      <n-form-item label="Type">
        <n-switch v-model:value="typeComputed">
          <template #checked>TOTP</template>
          <template #unchecked>HOTP</template>
        </n-switch>
      </n-form-item>
      <n-form-item label="Label">
        <n-input v-model:value="otp.options.label" placeholder="Label" />
      </n-form-item>
      <n-form-item label="Issuer">
        <n-input v-model:value="otp.options.issuer" placeholder="Issuer" />
      </n-form-item>
      <n-form-item label="Secret">
        <n-input
          v-model:value="otp.options.secret"
          placeholder="Secret"
          type="password"
          show-password-on="click"
        />
      </n-form-item>
      <n-form-item label="Algorithm">
        <n-select
          v-model:value="otp.options.algorithm"
          :options="algorithmOptions"
        />
      </n-form-item>
      <n-form-item label="Period" v-if="otp.options.type === 'totp'">
        <n-input-number v-model:value="otp.options.period" :min="0" />
      </n-form-item>
      <n-form-item label="Counter" v-if="otp.options.type === 'hotp'">
        <n-input-number v-model:value="otp.options.counter" :min="0" />
      </n-form-item>
      <n-form-item label="Digits">
        <n-input-number v-model:value="otp.options.digits" :min="0" />
      </n-form-item>
    </n-form>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OTPInfo } from "@/data/otp";
import { useVModel } from "@vueuse/core";
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NInputNumber,
  NSwitch,
} from "naive-ui";

const props = defineProps<{
  otp: OTPInfo;
}>();
const emit = defineEmits(["update:otp"]);
const otp = useVModel(props, "otp", emit);

const algorithmOptions = [
  { label: "SHA1", value: "SHA1" },
  { label: "SHA256", value: "SHA256" },
  { label: "SHA512", value: "SHA512" },
];

const typeComputed = computed({
  get: () => otp.value.options.type === "totp",
  set: (value: boolean) => {
    otp.value.options.type = value ? "totp" : "hotp";
  },
});
</script>
