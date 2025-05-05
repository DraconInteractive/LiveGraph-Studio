<script setup lang="ts">
import { Handle, Position, useVueFlow, HandleConnectableFunc } from '@vue-flow/core'
import { NodeToolbar } from "@vue-flow/node-toolbar"
import { HandleDef } from "../types/HandleDef"
import { colorMap, type DataType } from '../utils/colorMap'
import { ref, computed } from 'vue';

const props = defineProps<{
  id: string,
  data: any,
  title: string,
  body?: string,
  inputs?: HandleDef[],
  outputs?: HandleDef[],
  showToolbar?: boolean,
  actions?: string[],
  customClass?: string
}>()

const titleHeight = 45
const handleSpacing = 28
const bottomSpacing = 0

const showDelete = ref(false);

const getHandleTop = (index: number) =>
  titleHeight + index * handleSpacing

const { updateNodeData, getEdges, removeEdges, removeNodes } = useVueFlow()

function deleteNode() {
  removeNodes([props.id])
}

function removeHandleEdges(handleId: string) {
    const edgesToRemove = getEdges.value.filter(
        (e) => e.sourceHandle === handleId || e.targetHandle === handleId
    )

    if (edgesToRemove.length) {
        removeEdges(edgesToRemove)
    }
}

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

  <div class="custom-node" :class="data.class" @mouseenter="showDelete = true" @mouseleave="showDelete = false">
    <transition name="fade">
        <button v-if="showDelete" class="delete-button" @click="deleteNode">×</button>
    </transition>
    <div class="node-title">{{ title }}</div>
    <div style="height: 5px;"></div>
    <div class="node-body">
        <slot name="body">
            {{ body }}
        </slot>
    </div>

    <template v-for="(handle, index) in outputs ?? []" :key="handle.id">
        <div class="handle-container right" :style="{ top: `${getHandleTop(index)}px` }">
            <div class="handle-content">
            <span class="handle-label">{{ handle.id }}</span>
            <Handle
                :id="`source-${handle.id}`"
                type="source"
                :position="Position.Right"
                :style="{ 
                    transform: 'translate(50%, -50%)', 
                    borderColor: colorMap[handle.dataType as DataType] || colorMap.unknown, 
                }"
                @contextmenu.prevent="removeHandleEdges(`source-${handle.id}`)"
            />
            </div>
        </div>
        </template>

    <template v-for="(handle, index) in inputs ?? []" :key="handle.id">
        <div class="handle-container left" :style="{ top: `${getHandleTop(index)}px` }">
            <div class="handle-content">
            <Handle
                :id="`target-${handle.id}`"
                type="target"
                :position="Position.Left"
                :style="{ 
                    transform: 'translate(-50%, -50%)', 
                    borderColor: colorMap[handle.dataType as DataType] || colorMap.unknown, 
                }"
                @contextmenu.prevent="removeHandleEdges(`target-${handle.id}`)"
            />
            <span class="handle-label">{{ handle.id }}</span>
            </div>
        </div>
        </template>

    <div class="spacer" :style="{ height: `${bottomSpacing + Math.max((inputs?.length || 0), (outputs?.length || 0)) * handleSpacing}px` }"></div>
  </div>
</template>

<style>

</style>

<style scoped>
/* Core */

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

.delete-button {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  background-color: #1c1c1c;
  color: white;
  border: 1px solid #555;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  z-index: 2;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #2a2a2a;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.node-title
{
    font-size: 12px;
}

.node-body {
  padding: 4px 8px;
  padding-left: 40px;   /* Push away from left handles */
  padding-right: 40px;  /* Push away from right handles */
  word-break: break-word;
  white-space: pre-line;
}

/* Handles */
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

/* Toolbar */
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

