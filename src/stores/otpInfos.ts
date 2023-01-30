import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { OTPInfo } from "@/data/otp";
import { useOrderStore } from "./order";

export const useOTPInfosStore = defineStore("otp-infos", () => {
  const orderStore = useOrderStore();

  const infos = useStorage<Record<string, OTPInfo>>(
    "authenticator:otp:infos",
    {}
  );

  function add(info: OTPInfo) {
    infos.value[info.id] = info;
    orderStore.add(info.id);
  }

  return { infos, add, order: orderStore.order };
});
