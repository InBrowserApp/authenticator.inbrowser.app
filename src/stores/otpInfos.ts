import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { OTPInfo } from "@/data/otp";
import { useOrderStore } from "./order";
import type { SortBy, SortType } from "./metadata";
import { nextTick } from "vue";

export const useOTPInfosStore = defineStore("otp-infos", () => {
  const orderStore = useOrderStore();

  const infos = useStorage<Record<string, OTPInfo>>(
    "authenticator:otp:infos",
    {}
  );

  function add(info: Omit<OTPInfo, "date">) {
    infos.value[info.id] = { ...info, date: new Date().getTime() };
    orderStore.add(info.id);
  }

  function del(id: string) {
    orderStore.del(id);
    nextTick(() => {
      delete infos.value[id];
    });
  }

  function sort(by: SortBy, type: SortType) {
    let values = Object.values(infos.value);
    if (by === "date") {
      values.sort((a, b) => a.date - b.date);
    } else if (by === "issuer") {
      values.sort((a, b) =>
        (a.options.issuer || "").localeCompare(b.options.issuer || "")
      );
    }

    let order = values.map((value) => value.id);
    if (type === "desc") {
      order.reverse();
    }
    orderStore.order = order;
  }

  return { infos, add, del, sort };
});
