import { URI } from "otpauth";
import type { OTPOptions } from "./types";
import type { TOTPOptions } from "./totp";
import type { HOTPOptions } from "./hotp";

export function parseURIToOTPOptions(uri: string): OTPOptions {
  const parsedOtp = URI.parse(uri);

  if ("counter" in parsedOtp) {
    const newOptions: HOTPOptions = {
      label: parsedOtp.label,
      issuer: parsedOtp.issuer,
      secret: parsedOtp.secret.base32,
      type: "hotp",
      digits: parsedOtp.digits,
      algorithm: parsedOtp.algorithm,
      counter: parsedOtp.counter,
    };
    return newOptions;
  } else {
    const newOptions: TOTPOptions = {
      label: parsedOtp.label,
      issuer: parsedOtp.issuer,
      secret: parsedOtp.secret.base32,
      type: "totp",
      digits: parsedOtp.digits,
      algorithm: parsedOtp.algorithm,
      period: parsedOtp.period,
    };
    return newOptions;
  }
}
