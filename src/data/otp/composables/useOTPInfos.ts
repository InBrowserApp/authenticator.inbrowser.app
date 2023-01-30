import { useStorage } from "@vueuse/core";

export function useOTPInfosOrder() {
  const order = useStorage<string[]>("authenticator:otp:order", []);

  return { order };
}
