import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useOTPInfosStore } from "./otpInfos";

export type SortBy = "date" | "issuer";
export type SortType = "asc" | "desc";

export type Metadata = {
  sort: { by: SortBy; type: SortType };
};

export const useMetadataStore = defineStore("metadata", () => {
  const OTPInfosStore = useOTPInfosStore();

  const metadata = useStorage<Metadata>("authenticator:metadata", {
    sort: { by: "date", type: "asc" },
  });

  function set(id: keyof Metadata, value: Metadata[keyof Metadata]) {
    if (id === "sort") {
      OTPInfosStore.sort(value.by, value.type);
    }
    metadata.value[id] = value;
  }

  return { metadata, set };
});
