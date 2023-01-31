<template>
  <n-el
    tag="span"
    style="font-size: 3em"
    @click="emit('click')"
    class="hover-box"
  >
    <slot />
  </n-el>
</template>

<script setup lang="ts">
import { NEl } from "naive-ui";

const emit = defineEmits(["click"]);
</script>

<style scoped>
.hover-box {
  cursor: pointer;
  transition: background-color 0.3s var(--cubic-bezier-ease-in-out),
    border-color 0.3s var(--cubic-bezier-ease-in-out);
  margin: -0.2em;
  padding: 0.2em;
  border-radius: 0.2em;
}

.hover-box:hover {
  background-color: var(--hover-color);
}
</style>
