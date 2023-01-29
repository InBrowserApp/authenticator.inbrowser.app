import { ref, watch, type Ref } from "vue";
import { useIntervalFn, get } from "@vueuse/core";

export function useTokenAnimated(
  token: string | Ref<string>,
  duration = 400,
  interval = 40
) {
  const currentTime = ref(0);

  watch(
    () => get(token),
    () => {
      currentTime.value = Date.now();
    }
  );

  const tokenAnimated = ref(get(token));

  useIntervalFn(() => {
    if (Date.now() - currentTime.value < duration) {
      tokenAnimated.value = generateRandomToken(get(token).length);
    } else {
      if (tokenAnimated.value !== get(token)) {
        tokenAnimated.value = get(token);
      }
    }
  }, interval);

  // repeat digits for length times
  const generateRandomToken = (length: number) => {
    let token = "";
    for (let i = 0; i < length; i++) {
      token += Math.floor(Math.random() * 10);
    }
    return token;
  };

  return tokenAnimated;
}
