<script lang="ts" setup>
import { h, ref } from 'vue'
import { Background, BackgroundVariant } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, type Node, type Edge, ConnectionMode } from '@vue-flow/core'
import CustomEdge from './CustomEdge.vue'
import { nodeTypes } from './nodes'

const { onConnect, addEdges } = useVueFlow()

const nodes = ref<Node[]>([
  { id: '2', type: 'run', position: { x: 100, y: 100 } },
  { id: '3', type: 'custom', position: { x: 100, y: 300 } },
  { id: '4', type: 'debug-log', position: { x: 300, y: 100 } },
])

const edges = ref<Edge[]>([
  { 
    id: 'e1->2',
    source: '2', 
    target: '4',
    sourceHandle: 'source-Exec',
    targetHandle: 'target-Exec'
  },
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

      <template
        v-for="node in nodeTypes"
        :key="node.type"
        #[`node-${node.type}`]="nodeProps">
        <component :is="node.component" v-bind="nodeProps" />
      </template>
    </VueFlow>
  </div>
</template>
