import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useOrderStore = defineStore("order", () => {
  const order = useStorage<string[]>("authenticator:otp:order", []);

  function add(id: string) {
    order.value.push(id);
  }

  function del(id: string) {
    order.value = order.value.filter((item) => item !== id);
  }

  return { order, add, del };
});
