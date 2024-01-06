<script setup lang="ts">
const props = defineProps<{ 
  left: number, 
  top: number,
  text: string
}>()
</script>

<template>
  <div :style="{
    left: `${props.left}px`,
    top: `${props.top}px`
  }" style="position: absolute;">
    <span>
      {{ props.text }}
    </span>
  </div>
</template>

<style scoped>

</style>
