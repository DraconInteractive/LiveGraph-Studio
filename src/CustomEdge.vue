<script lang="ts" setup>
import { computed } from 'vue'
import type { EdgeProps } from '@vue-flow/core'
import { getBezierPath } from '@vue-flow/core'
import { colorMap, DataType } from "./utils/colorMap"
import { useVueFlow } from '@vue-flow/core'
import { nanoid } from 'nanoid'

const { removeEdges, addEdges, addNodes, getEdges } = useVueFlow()
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

function handleDoubleClick() {
  const oldEdge = props
  const routeNodeId = `route-${nanoid(6)}`
  const posX = (props.sourceX + props.targetX) / 2
  const posY = (props.sourceY + props.targetY) / 2

  const edgesToRemove = getEdges.value.filter(
      (e) => e.id === props.id
  )

  if (edgesToRemove.length) {
      removeEdges(edgesToRemove)
  }

  // 2. Create new route node
  addNodes([
    {
      id: routeNodeId,
      type: 'route-node',
      position: { x: posX, y: posY },
      data: {}
    }
  ])

  // 3. Create two new edges
  addEdges([
    {
      id: `e-${props.source}->${routeNodeId}`,
      source: props.source,
      target: routeNodeId,
      sourceHandle: props.sourceHandleId,
      targetHandle: 'target-In', // must match the input handle id on route-node
      type: 'custom',
      data: {
        sourceType: props.data?.sourceType,
        targetType: props.data?.sourceType
      }
    },
    {
      id: `e-${routeNodeId}->${props.target}`,
      source: routeNodeId,
      target: props.target,
      sourceHandle: 'source-Out', // must match the output handle id on route-node
      targetHandle: props.targetHandleId,
      type: 'custom',
      data: {
        sourceType: props.data?.targetType,
        targetType: props.data?.targetType
      }
    }
  ])
}

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
      @dblclick.stop="handleDoubleClick"
    />
  </svg>
</template>


