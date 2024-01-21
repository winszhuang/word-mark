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
    class="wds-absolute"
    v-show="props.show"
  >
    <div
      class="wds-p-3 wds-rounded-md wds-shadow-sm wds-shadow-black wds-bg-white wds-text-black wds-min-w-52"
    >
      <!-- 單字 -->
      <h2 class="wds-font-bold wds-mb-1 wds-text-lg wds-text-black">
        {{ props.word.text }}
      </h2>
      <!-- 解釋 -->
      <ul class="wds-mb-3">
        <li v-for="(explain, index) in props.word.explains" :key="index">
          {{ explain }}
        </li>
      </ul>
      <!-- 例句 -->
      <div
        class="wds-text-sm wds-mb-3 wds-h-20 wds-max-h-28 wds-overflow-y-auto wds-text-slate-900 wds-shadow-inner"
      >
        {{ props.word.sentence }}
      </div>
      <button
        class="hover:wds-bg-blue-500 wds-text-blue-700 hover:wds-text-white wds-font-semibold wds-py-1 wds-px-4 wds-border wds-border-blue-500 wds-rounded"
        @click="$emit('save', props.word)"
      >
        save
      </button>
    </div>
  </div>
</template>

<style scoped></style>
