import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useOrderStore = defineStore("order", () => {
  const order = useStorage<string[]>(
    "authenticator:otp:order",
    [],
    localStorage,
    { listenToStorageChanges: true, deep: true }
  );

  function add(id: string) {
    order.value.push(id);
  }

  return { order, add };
});
