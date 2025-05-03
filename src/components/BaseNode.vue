<script setup lang="ts">
import { Handle, Position, useVueFlow, HandleConnectableFunc } from '@vue-flow/core'
import { NodeToolbar } from "@vue-flow/node-toolbar"

const props = defineProps<{
  id: string,
  data: any,
  title: string,
  body?: string,
  inputs?: string[],
  outputs?: string[],
  showToolbar?: boolean,
  actions?: string[]
}>()

const titleHeight = 45
const handleSpacing = 28
const bottomSpacing = 0

const getHandleTop = (index: number) =>
  titleHeight + index * handleSpacing

const { updateNodeData } = useVueFlow()

const handleConnectable: HandleConnectableFunc = () => true
</script>

<template>
  <NodeToolbar v-if="showToolbar" :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <button
      v-for="action in actions"
      :key="action"
      type="button"
      :class="{ selected: action === data.action }"
      @click="updateNodeData(id, { action })"
    >
      {{ action }}
    </button>
  </NodeToolbar>

  <div class="custom-node">
    <div class="node-title">{{ title }}</div>
    <div style="height: 5px;"></div>
    <div class="node-body">{{ body }}</div>

    <template v-for="(label, index) in outputs ?? []" :key="label">
      <div class="handle-container right" :style="{ top: `${getHandleTop(index)}px` }">
        <div class="handle-content">
          <span class="handle-label">{{ label }}</span>
          <Handle
            :id="`source-${label}`"
            type="source"
            :position="Position.Right"
            :style="{ transform: 'translate(50%, -50%)' }"
          />
        </div>
      </div>
    </template>

    <template v-for="(label, index) in inputs ?? []" :key="label">
      <div class="handle-container left" :style="{ top: `${getHandleTop(index)}px` }">
        <div class="handle-content">
          <Handle
            :id="`target-${label}`"
            type="target"
            :position="Position.Left"
            :style="{ transform: 'translate(-50%, -50%)' }"
          />
          <span class="handle-label">{{ label }}</span>
        </div>
      </div>
    </template>

    <div class="spacer" :style="{ height: `${bottomSpacing + Math.max((inputs?.length || 0), (outputs?.length || 0)) * handleSpacing}px` }"></div>
  </div>
</template>

<style scoped>
.custom-node {
  position: relative;
  padding: 10px;
  min-width: 125px;
  min-height: 1px;
  background: #1c1c1c;
  border: 1px solid #555;
  border-radius: 6px;
  color: white;
  font-size: 12px;
}

.node-title
{
    font-size: 16px;
}

.node-body
{
    font-size: 8px;
}

.handle-container {
  position: absolute;
  transform: translateY(-50%);
  pointer-events: none;
}

.handle-container.right {
  right: 0;
}

.handle-container.left {
  left: 0;
}

.handle-content {
  display: flex;
  align-items: center;
  pointer-events: none;
  padding: 0 8px; /* adds space inside node */
}

.handle-container.right .handle-content {
  flex-direction: row;
  justify-content: flex-end;
}

.handle-container.left .handle-content {
  flex-direction: row;
  justify-content: flex-start;
}

.handle-label {
  font-size: 10px;
  color: #ccc;
  white-space: nowrap;
  pointer-events: none;
  margin: 0 6px;
}

.vue-flow__node-toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: #2d3748;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.vue-flow__node-toolbar button {
  background: #4a5568;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.vue-flow__node-toolbar button.selected {
  background: #2563eb;
}

.vue-flow__node-toolbar button:hover {
  background: #2563eb;
}

.vue-flow__node-menu {
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.vue-flow__node-menu.selected {
  box-shadow: 0 0 0 2px #2563eb;
}
</style>

