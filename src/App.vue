<script lang="ts" setup>
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { Background, BackgroundVariant } from '@vue-flow/background'
import { Controls, ControlButton } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, type Node, type Edge, ConnectionMode, Panel } from '@vue-flow/core'
import { nodeTypes } from './nodes'
import Icon from './Icon.vue'
import { colorMap } from './utils/colorMap'
import type { HandleDef } from "./types/HandleDef"
import CustomEdge from './CustomEdge.vue'

const { onConnect, addEdges, toObject } = useVueFlow()

// Init graph
const nodes = ref<Node[]>([
  { id: '2', type: 'run', position: { x: 100, y: 100 } },
  { id: '4', type: 'debug-log', position: { x: 300, y: 100 } },
])

const edges = ref<Edge[]>([
  { 
    id: 'e1->2',
    type: 'custom',
    source: '2', 
    target: '4',
    sourceHandle: 'source-Exec',
    targetHandle: 'target-Exec',
    data: {
      sourceType: 'exec',
      targetType: 'exec'
    }
  },
])

const showNodeMenu = ref(false)
const searchQuery = ref('')

onConnect((params) => {
  const sourceNode = nodes.value.find(n => n.id === params.source)
  const targetNode = nodes.value.find(n => n.id === params.target)

  const sourceId = params.sourceHandle?.replace('source-', '')
  const targetId = params.targetHandle?.replace('target-', '')

  const sourceType = (
    sourceNode?.data?.outputs as HandleDef[] | undefined
  )?.find((h) => h.id === sourceId)?.dataType || 'unknown'

  const targetType = (
    targetNode?.data?.inputs as HandleDef[] | undefined
  )?.find((h) => h.id === targetId)?.dataType || 'unknown'

  //const sourceColor = colorMap[sourceType as keyof typeof colorMap] || colorMap.unknown
  //const targetColor = colorMap[targetType as keyof typeof colorMap] || colorMap.unknown

  addEdges(
    [
      {
        ...params,
        type: 'custom',
        data: {
          sourceType,
          targetType
        }
      }
    ]
  )
})

// Filtered node types
const filteredNodeTypes = computed(() =>
  nodeTypes.filter((n) =>
    n.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

onMounted(() => {
  const listener = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key.toLowerCase() === 'a') {
      showNodeMenu.value = true
    } else if (e.key === 'Escape') {
      showNodeMenu.value = false
    }
  }
  window.addEventListener('keydown', listener)
  onUnmounted(() => window.removeEventListener('keydown', listener))
})

function spawnNode(type: string) {
  const id = Date.now().toString()

  nodes.value.push({
    id,
    type,
    position: { x: 200, y: 200 },
    data: {}
  })

  showNodeMenu.value = false
  searchQuery.value = ''
}

const handleSave = (): void => {
  console.log('Save clicked')
  //console.log(JSON.stringify(toObject(), null, 2)) // Pretty-printed JSON
  console.log(JSON.stringify(getSanitizedFlow(), null, 2));
}

const handleRestore = (): void => {
  console.log('Restore clicked')
}

function getSanitizedFlow() {
  const full = toObject()

  const sanitizeHandle = (handle?: string | null | undefined) =>
    handle?.replace(/^source-/, '').replace(/^target-/, '') || undefined

  const stripInternalData = (data: Record<string, any> = {}) => {
    const { inputs, outputs, ...rest } = data
    return rest
  }

  const sanitized = {
    nodes: full.nodes.map(({ id, type, data }) => ({
      id,
      type,
      data: stripInternalData(data)
    })),
    edges: full.edges.map(({ id, source, target, sourceHandle, targetHandle }) => ({
      id,
      source,
      target,
      sourceHandle: sanitizeHandle(sourceHandle),
      targetHandle: sanitizeHandle(targetHandle),
    })),
  }

  return sanitized
}
</script>

<template>
  <div v-if="showNodeMenu" class="node-menu">
  <input
    type="text"
    placeholder="Search nodes..."
    v-model="searchQuery"
    class="node-search"
    autofocus
  />
  <ul class="node-list">
    <li
      v-for="node in filteredNodeTypes"
      :key="node.type"
      @click="spawnNode(node.type)"
    >
      {{ node.type }}
    </li>
  </ul>
</div>
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

      <Controls class="my-controls">
        <ControlButton @click="handleSave">
          <Icon name="save" />
        </ControlButton>
        <ControlButton @click="handleRestore">
          <Icon name="restore" />
        </ControlButton>
      </Controls>

      <template
        v-for="node in nodeTypes"
        :key="node.type"
        #[`node-${node.type}`]="nodeProps">
        <component :is="node.component" v-bind="nodeProps" />
      </template>
      <template #edge-custom="edgeProps">
        <CustomEdge v-bind="edgeProps" />
      </template>
    </VueFlow>
  </div>
</template>

<style>
.my-controls
{
  transform: scale(1.5); /* increase size */
  transform-origin: bottom left;
}

.vue-flow__controls {
  flex-direction: row !important;
  gap: 8px;
}

.node-menu {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #2c2c2c;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 12px;
  z-index: 10;
  width: 240px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.node-search {
  width: 100%;
  box-sizing: border-box; /* ✅ include padding/border in width */
  padding: 6px 8px;
  font-size: 14px;
  background: #1c1c1c;
  color: white;
  border: 1px solid #444;
  margin-bottom: 8px;
}

.node-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.node-list li {
  padding: 6px 8px;
  color: white;
  cursor: pointer;
}

.node-list li:hover {
  background: #3a3a3a;
}

</style>
