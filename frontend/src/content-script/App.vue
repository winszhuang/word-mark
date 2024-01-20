<script setup lang="ts">
import Tooltip from './components/Tooltip.vue'
import { useTooltip } from '../composables/use-tooltip'

const { tooltipPosition, showTooltip, word, onSave } = useTooltip()
</script>

<template>
  <Tooltip
    :left="tooltipPosition.left"
    :top="tooltipPosition.top"
    :show="showTooltip"
    :word="word"
    @save="onSave"
  />
</template>
