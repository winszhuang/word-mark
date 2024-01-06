<script setup lang="ts">
const props = defineProps<{
  left: number
  top: number
  word: string
  sentence: string
  show: boolean
}>()
</script>

<template>
  <div
    :style="{
      left: `${props.left}px`,
      top: `${props.top}px`
    }"
    class="absolute"
    v-show="props.show"
  >
    <div class="p-4 rounded-md shadow-sm shadow-black bg-white text-black min-w-60">
      <h2 class="font-bold mb-1">
        {{ props.word }}
      </h2>
      <div class="text-sm">{{ props.sentence }}</div>
    </div>
  </div>
</template>

<style scoped>
@import '../style.css';
</style>
