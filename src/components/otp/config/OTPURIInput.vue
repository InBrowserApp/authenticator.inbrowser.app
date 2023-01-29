<template>
  <n-form-item
    label="URI"
    :validation-status="error ? 'error' : undefined"
    :feedback="errorMessage"
  >
    <n-input v-model:value="uriInternal" type="text" />
  </n-form-item>
</template>

<script setup lang="ts">
import { useOTP } from "@/composables/otp/useOTP";
import { toRef, ref, watch } from "vue";
import type { OTPOptions, HOTPOptions, TOTPOptions } from "@/data/otp";
import { NInput, NFormItem } from "naive-ui";
import { URI } from "otpauth";

const props = defineProps<{
  options: OTPOptions;
}>();

const options = toRef(props, "options");
const { uri } = useOTP(options);

const uriInternal = ref(uri.value);
const emit = defineEmits(["update:options"]);

const error = ref(false);
const errorMessage = ref("");

watch(uri, (newUri) => {
  uriInternal.value = newUri;
});

watch(uriInternal, (newUri) => {
  error.value = false;
  errorMessage.value = "";
  if (newUri !== uri.value) {
    try {
      let parsedOtp = URI.parse(newUri);

      if ("counter" in parsedOtp) {
        const newOptions: HOTPOptions = {
          ...options.value,
          label: parsedOtp.label,
          issuer: parsedOtp.issuer,
          secret: parsedOtp.secret.base32,
          type: "hotp",
          digits: parsedOtp.digits,
          algorithm: parsedOtp.algorithm,
          counter: parsedOtp.counter,
        };
        emit("update:options", newOptions);
      } else {
        const newOptions: TOTPOptions = {
          ...options.value,
          label: parsedOtp.label,
          issuer: parsedOtp.issuer,
          secret: parsedOtp.secret.base32,
          type: "totp",
          digits: parsedOtp.digits,
          algorithm: parsedOtp.algorithm,
          period: parsedOtp.period,
        };
        emit("update:options", newOptions);
      }
    } catch (e) {
      error.value = true;
      errorMessage.value = (e as DOMException).message;
    }
  }
});
</script>
