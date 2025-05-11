<script lang="ts" setup>
import { onMounted, onUnmounted, computed, ref, watch, nextTick } from 'vue'
import { Background, BackgroundVariant } from '@vue-flow/background'
import { Controls, ControlButton } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, type Node, type Edge, ConnectionMode, Panel, VueFlowStore, OnConnectStartParams  } from '@vue-flow/core'
import { nodeTypes } from './nodes'
import Icon from './Icon.vue'
import type { HandleDef } from "./types/HandleDef"
import CustomEdge from './CustomEdge.vue'

const { onConnect, addEdges, toObject, fromObject, onConnectStart, onConnectEnd, zoomIn, zoomOut } = useVueFlow()

const history = ref<any[]>([])
const historyIndex = ref(-1)

const nodeSearchInputRef = ref<HTMLInputElement | null>(null)

const isValidConnnection = ref(false);
const connStartParams = ref<OnConnectStartParams>();
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

// Node menu
const showNodeMenu = ref(false)
const searchQuery = ref('')
const currentCategory = ref<string[]>([])

const categorizedNodeTypes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (query) {
    return nodeTypes
      .filter(n => n.display.toLowerCase().includes(query))
      .map(n => ({ ...n, isCategory: false }))
  }

  const currentPath = currentCategory.value.join('/')
  const subcategories = new Set<string>()
  const entries: any[] = []

  for (const node of nodeTypes) {
    if (!node.category?.startsWith(currentPath)) continue

    const remaining = node.category.slice(currentPath.length).replace(/^\/+/, '')
    const [next] = remaining.split('/')

    if (!remaining) {
      entries.push({ ...node, isCategory: false })
    } else {
      subcategories.add(next)
    }
  }

  return [
    ...entries,
    ...[...subcategories].map(sub => ({
      type: sub,
      display: sub,
      isCategory: true
    }))  ]
})

function spawnMenuNode (type: string, params?: OnConnectStartParams)
{
  spawnNode(type)
}

function openNodeMenu () {
  showNodeMenu.value = true
  searchQuery.value = ''
  nextTick(() => {
    nodeSearchInputRef.value?.focus()
  })
}

// Events
onMounted(() => {

  handleRestore()

  // push the initial state into history manually
  history.value.push(toObject())
  historyIndex.value = 0

  const listener = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault()
      handleSave()
      return
    }

    if (e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault()
      openNodeMenu()
    } else if (e.key === 'Escape') {
      showNodeMenu.value = false
    } else if (showNodeMenu && e.key === 'Enter') {
      const menuNodes = categorizedNodeTypes
      if (menuNodes.value.length > 0)
      {
        spawnMenuNode(menuNodes.value[0].type)
      }
      showNodeMenu.value = false
    } else if (e.ctrlKey && e.key === 'z') {
      undo()
    } else if (e.ctrlKey && e.key === 'y') {
      redo()
    } else if (e.key === '+' || e.key === '=') {
      zoomIn()
    } else if (e.key === '-') {
      zoomOut()
    }

  }
  window.addEventListener('keydown', listener)
  onUnmounted(() => window.removeEventListener('keydown', listener))
})

onConnectStart((params) => {
  isValidConnnection.value = false
  connStartParams.value = params
  console.log(JSON.stringify(params, null, 2))
}) 

onConnectEnd(() => {
  if (!isValidConnnection.value)
  {
    openNodeMenu()
    // needs better logic to add connection
  }
})

onConnect((params) => {
  isValidConnnection.value = true;

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

watch([nodes, edges], () => {
  const newSnapshot = toObject()
  const lastSnapshot = history.value[historyIndex.value]

  // Only push if something actually changed
  if (JSON.stringify(newSnapshot) !== JSON.stringify(lastSnapshot)) {
    if (historyIndex.value < history.value.length - 1) {
      history.value.splice(historyIndex.value + 1)
    }

    history.value.push(newSnapshot)
    historyIndex.value = history.value.length - 1
  }
}, { deep: true })

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

  showToast("Spawned " + type);
}

// Persistence
const handleSave = async (): Promise<void> => {
  const flowData = toObject();
  const serialized = JSON.stringify(getSanitizedFlow(), null, 2);

  localStorage.setItem('last-saved-graph', JSON.stringify(flowData));

  try {
    await navigator.clipboard.writeText(serialized)
    showToast("Saved!")
  } catch (err) {
    console.error("Failed to copy to clipboard:", err)
    showToast("Saved, but failed to export", 3000)
  }
}

const handleRestore = (): void => {
  const saved = localStorage.getItem('last-saved-graph');
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      fromObject(parsed)
      console.log('Flow restored from localStorage.')
      showToast("Loaded!")
    } catch (e) {
      console.error('Failed to load flow from localStorage:', e)
      showToast("Failed to load!", 3000)

    }
  } else {
    console.log('No saved flow found.')
    showToast("No saved flow found.", 3000)
  }
}

// History
function undo() {
  if (historyIndex.value > 0) {
    historyIndex.value--

    const snapshot = history.value[historyIndex.value]
    const currentViewport = toObject().viewport

    fromObject({
      ...snapshot,
      viewport: currentViewport, // preserve current zoom/pan
    })
    showToast("Undone!")
  }
}

function redo() {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++

    const snapshot = history.value[historyIndex.value]
    const currentViewport = toObject().viewport

    fromObject({
      ...snapshot,
      viewport: currentViewport, // preserve current zoom/pan
    })
    showToast("Redone!")
  }
}

// Export
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

// Toast
const toasts = ref<{ id: number, message: string }[]>([])

function showToast(message: string, duration = 2000) {
  const id = Date.now() + Math.random() // unique ID
  toasts.value.push({ id, message })

  setTimeout(() => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }, duration)
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
      ref="nodeSearchInputRef"
    />
    <ul class="node-list">
      <li
        v-for="item in categorizedNodeTypes"
        :key="item.display"
        @click="item.isCategory ? currentCategory.push(item.type) : spawnNode(item.type)"
        >
        {{ item.isCategory ? `📁 ${item.type}` : item.display }}
      </li>
    </ul>

    <div v-if="currentCategory.length && !searchQuery">
      <button @click="currentCategory.pop()">← Return</button>
    </div>
  </div>
  <div style="height: 100vh" class="dark">
    <VueFlow
      ref="vueFlowRef"
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
  <transition-group name="toast-fade" tag="div" class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast">
      {{ toast.message }}
    </div>
  </transition-group>
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

.toast-container {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
}

.toast {
  background: #333;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.4s, transform 0.4s;
}

/* Fade in */
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

</style>
