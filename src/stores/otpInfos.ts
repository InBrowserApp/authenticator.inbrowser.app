import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { OTPInfo } from "@/data/otp";
import { useOrderStore } from "./order";
import { nextTick } from "vue";

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

  function del(id: string) {
    orderStore.del(id);
    nextTick(() => {
      delete infos.value[id];
    });
  }

  return { infos, add, del };
});
