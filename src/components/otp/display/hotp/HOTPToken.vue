<template>
  <OTPTokenWrapper @click="onClick">
    <OTPToken :token="token" :hide="hide"></OTPToken>
  </OTPTokenWrapper>
</template>

<script setup lang="ts">
import type { HOTPOptions } from "@/data/otp";
import { useVModel } from "@vueuse/core";
import { ref } from "vue";
import { useOTP } from "@/composables/otp/useOTP";
import OTPToken from "../otp/OTPToken.vue";
import OTPTokenWrapper from "../otp/OTPTokenWrapper.vue";
import { useCopyToClipboard } from "@/composables/common/useCopyToClipboard";

const copy = useCopyToClipboard();

const props = defineProps<{
  options: HOTPOptions;
}>();

const emit = defineEmits(["update:options"]);
const options = useVModel(props, "options", emit);
const hide = ref(true);

const { token } = useOTP(options);

const onClick = () => {
  if (hide.value === true) {
    hide.value = false;
    options.value.counter += 1;
  }

  copy(token.value);
};
</script>
