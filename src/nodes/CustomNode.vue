<script lang="ts" setup>
import { Handle, Position, useVueFlow, HandleConnectableFunc } from '@vue-flow/core'
import { NodeToolbar } from "@vue-flow/node-toolbar"
import { ref } from 'vue'

const title = "Node Title";
const body = "";

const props = defineProps(['id', 'data'])
const actions = ['👎', '✋', '👍']
const outputs = ['One', 'Two', 'Three', 'Four']
const inputs = ['A', 'B']

const titleHeight = 38 // enough room for title + body text
const handleSpacing = 28
const bottomSpacing = 5;

const getHandleTop = (index: number) => {
  return titleHeight + index * handleSpacing
}

const { updateNodeData } = useVueFlow()

const handleConnectable: HandleConnectableFunc = (node, connectedEdges) => {
  // This is where I can do logic to lock out connections i think?
  return true;
}

</script>

<template>
  <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <button
      v-for="action of actions"
      :key="action"
      type="button"
      :class="{ selected: action === data.action }"
      @click="updateNodeData(props.id, { action })"
    >
      {{ action }}
    </button>
  </NodeToolbar>
  <div class="custom-node">
    <div>
      {{ title }}
    </div>
    <div class="node-body">
      {{ body }}
    </div>

    <template v-for="(id, index) in outputs" :key="id">
      <div
        class="handle-container right"
        :style="{ top: `${getHandleTop(index)}px` }"
      >
        <div class="handle-content">
          <span class="handle-label">{{ id }}</span>
          <Handle
            :id="`source-${id}`"
            type="source"
            :position="Position.Right"
            :style="{ transform: 'translate(50%, -50%)' }"
          />
        </div>
      </div>
    </template>


    <template v-for="(id, index) in inputs" :key="id">
      <div
        class="handle-container left"
        :style="{ top: `${getHandleTop(index)}px` }"
      >
        <div class="handle-content">
          <Handle
            :id="`target-${id}`"
            type="target"
            :position="Position.Left"
            :style="{ transform: 'translate(-50%, -50%)' }"
          />
          <span class="handle-label">{{ id }}</span>
        </div>
      </div>
    </template>

    
    <!-- Spacer div to push node height -->
    <div class="spacer" :style="{ height: `${bottomSpacing + Math.max(outputs.length, inputs.length) * handleSpacing}px` }"></div>

  </div>
</template>

<style>
.custom-node {
  position: relative;
  padding: 10px;
  min-width: 150px;
  min-height: 1px;
  background: #1c1c1c;
  border: 1px solid #555;
  border-radius: 6px;
  color: white;
  font-size: 12px;
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

.increment {
  border-radius: 4px;
  background: #42b983;
  font-size: 10px;
  color: #fff;
  cursor: pointer;
  border: none;
}

.increment:hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.counter {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
}

.count {
  font-size: 6px;
  color: #ff0072;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
</style>
