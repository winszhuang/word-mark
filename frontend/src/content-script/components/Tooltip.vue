<script setup lang="ts">
const props = defineProps<{
  left: number
  top: number
  show: boolean
  word: Word
}>()

const emit = defineEmits(['save'])
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
    <div class="p-3 rounded-md shadow-sm shadow-black bg-white text-black min-w-52">
      <!-- 單字 -->
      <h2 class="font-bold mb-1 text-lg text-black">
        {{ props.word.text }}
      </h2>
      <!-- 解釋 -->
      <ul class="mb-3">
        <li v-for="(explain, index) in props.word.explains" :key="index">
          {{ explain }}
        </li>
      </ul>
      <!-- 例句 -->
      <div class="text-sm mb-3 h-20 max-h-28 overflow-y-auto text-slate-900 shadow-inner">
        {{ props.word.sentence }}
      </div>
      <button
        class="hover:bg-blue-500 text-blue-700 hover:text-white font-semibold py-1 px-4 border border-blue-500 rounded"
        @click="$emit('save', props.word)"
      >
        save
      </button>
    </div>
  </div>
</template>

<style scoped></style>
