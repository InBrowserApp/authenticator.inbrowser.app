import type { Ref } from "vue";
import { ref, watch } from "vue";
import { computed } from "vue";
import { get, useNow } from "@vueuse/core";
import { TOTP } from "otpauth";
import type { TOTPOptions } from "@/data/otp/totp/types";

export function useTOTP(options_: TOTPOptions | Ref<TOTPOptions>) {
  const now = useNow();

  const options = get(options_);

  // Create a new TOTP object.
  const totp = computed(
    () =>
      new TOTP({
        issuer: options.issuer,
        label: options.label,
        algorithm: options.algorithm,
        digits: options.digits,
        period: options.period,
        secret: options.secret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
      })
  );

  const token = ref(
    totp.value.generate({
      timestamp: now.value.getTime(),
    })
  );

  const period = computed(() => totp.value.period * 1000);
  const remainTime = computed(() => {
    const time = now.value.getTime();
    return period.value - (time % period.value);
  });

  const periodCount = computed(() =>
    Math.floor(now.value.getTime() / period.value)
  );

  watch(periodCount, () => {
    token.value = totp.value.generate({
      timestamp: now.value.getTime(),
    });
  });

  return {
    now,
    totp,
    token,
    remainTime,
    period,
  };
}
