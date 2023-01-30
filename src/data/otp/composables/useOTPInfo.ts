import type { OTPInfo } from "@/data/otp";
import { useStorage } from "@vueuse/core";

export function useOTPInfo(id: string) {
  const info = useStorage<OTPInfo>(`authenticator:otp:item:${id}`, {
    id: id,
    options: {
      type: "totp" as const,
      secret: "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD",
      issuer: "Test Issuer",
      label: "Test Label",
      algorithm: "SHA1" as const,
      digits: 6 as const,
      period: 30 as const,
    },
  });

  return info;
}
