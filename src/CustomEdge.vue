<script lang="ts" setup>
import { computed } from 'vue'
import type { EdgeProps } from '@vue-flow/core'
import { getBezierPath } from '@vue-flow/core'
import { colorMap, DataType } from "./utils/colorMap"

const props = defineProps<EdgeProps>()

const path = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition, // 🔧 add this
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition, // 🔧 and this
  })[0]
)

const sourceColor = colorMap[(props.data?.sourceType as DataType) || 'unknown']
const targetColor = colorMap[(props.data?.targetType as DataType) || 'unknown']

console.log('Edge Data:', props.data)

</script>

<template>
  <svg
    class="vue-flow__edge-path"
    style="overflow: visible; position: absolute;"
  >
    <defs>
      <linearGradient :id="`grad-${props.id}`" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="42%" :stop-color="sourceColor" />
        <stop offset="58%" :stop-color="targetColor" />
      </linearGradient>
    </defs>

    <path
      :d="path"
      fill="none"
      stroke-width="2"
      :stroke="sourceColor === targetColor ? sourceColor : `url(#grad-${props.id})`"
    />
  </svg>
</template>


