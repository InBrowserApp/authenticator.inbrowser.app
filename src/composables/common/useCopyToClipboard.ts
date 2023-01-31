import { useMessage, NIcon } from "naive-ui";
import ClipboardCheckmark20Regular from "@vicons/fluent/ClipboardCheckmark20Regular";
import { h } from "vue";

export function useCopyToClipboard() {
  const message = useMessage();
  return (text: string) => {
    navigator.clipboard.writeText(text);
    message.create("Copied to clipboard", {
      icon: () =>
        h(NIcon, null, { default: () => h(ClipboardCheckmark20Regular) }),
    });
  };
}
