<script lang="ts" setup>
import { h, ref } from 'vue'
import { Background, BackgroundVariant } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, type Node, type Edge, ConnectionMode } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'
import CustomEdge from './CustomEdge.vue'
import DebugLogNode from './nodes/DebugLogNode.vue'

const { onConnect, addEdges } = useVueFlow()

const nodes = ref<Node[]>([
  { id: '3', type: 'custom', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', type: 'debug-log', position: { x: 300, y: 300 } },
])

const edges = ref<Edge[]>([
])

onConnect((params) => {
  addEdges([params])
})
</script>

<template>
  <div style="height: 100vh" class="dark">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      fit-view-on-init
      class="vue-flow-basic-example"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      :connection-mode="ConnectionMode.Strict"
    >
      <Background pattern-color="#2e2e2e" :gap="22" :variant="BackgroundVariant.Lines" />

      <MiniMap />

      <Controls />

      <template #node-custom="nodeProps">
        <CustomNode v-bind="nodeProps" />
      </template>
      <template #node-debug-log="nodeProps">
        <DebugLogNode v-bind="nodeProps" />
      </template>
      <template #edge-custom="edgeProps">
        <CustomEdge v-bind="edgeProps" />
      </template>
    </VueFlow>
  </div>
</template>
