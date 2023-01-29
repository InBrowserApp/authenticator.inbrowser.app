import type { Ref } from "vue";
import { computed } from "vue";
import { get, useNow } from "@vueuse/core";
import { TOTP } from "otpauth";

type TOTPOptions = {
  secret: string;
};

export function useTOTP(options: TOTPOptions | Ref<TOTPOptions>) {
  const now = useNow();

  // Create a new TOTP object.
  const totp = computed(
    () =>
      new TOTP({
        issuer: "ACME",
        label: "AzureDiamond",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: get(options).secret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
      })
  );

  const token = computed(() =>
    totp.value.generate({
      timestamp: now.value.getTime(),
    })
  );

  const remainTime = computed(() => {
    const time = now.value.getTime();
    const period = totp.value.period * 1000;
    return period - (time % period);
  });

  const period = computed(() => totp.value.period * 1000);

  return {
    now,
    totp,
    token,
    remainTime,
    period,
  };
}
