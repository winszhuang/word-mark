<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <button
    class="wds-border wds-p-1 wds-rounded wds-border-blue-500 hover:wds-bg-blue-500 hover:wds-text-blue-50"
  >
    {{ props.text }}
  </button>
</template>
