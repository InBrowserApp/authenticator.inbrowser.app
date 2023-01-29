<template>
  <span>
    {{ token }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  token: string;
}>();
</script>
