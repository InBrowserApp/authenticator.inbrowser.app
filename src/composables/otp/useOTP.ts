import type { Ref } from "vue";
import { computed } from "vue";
import { get, useNow } from "@vueuse/core";
import type { OTPOptions } from "@/data/otp";
import { TOTP, HOTP } from "otpauth";

export function useOTP(options_: OTPOptions | Ref<OTPOptions>) {
  const now = useNow();

  const otp = computed(() => {
    const options = get(options_);
    if (options.type === "totp") {
      return new TOTP({
        issuer: options.issuer,
        label: options.label,
        algorithm: options.algorithm,
        digits: options.digits,
        period: options.period,
        secret: options.secret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
      });
    } else {
      return new HOTP({
        issuer: options.issuer,
        label: options.label,
        algorithm: options.algorithm,
        digits: options.digits,
        counter: options.counter,
        secret: options.secret,
      });
    }
  });

  const token = computed(() => {
    const otpInstance = otp.value;

    if (otpInstance instanceof TOTP) {
      return otpInstance.generate({
        timestamp: now.value.getTime(),
      });
    } else {
      return otpInstance.generate();
    }
  });

  const uri = computed(() => otp.value.toString());

  return { token, uri };
}
