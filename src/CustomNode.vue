<script lang="ts" setup>
import { Handle, Position, useVueFlow, HandleConnectableFunc } from '@vue-flow/core'
import { NodeToolbar } from "@vue-flow/node-toolbar"
import { ref } from 'vue'

const title = "Node Title";
const body = "";

const props = defineProps(['id', 'data'])
const actions = ['👎', '✋', '👍']
const outputs = ['One', 'Two', 'Three', 'Four']
const inputs = ['a']

const titlePadding = 20;
const handleSpacing = 18;

const getHandleTop = (index: number, total: number) => {
  return titlePadding + (index * handleSpacing)
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
      <Handle
        :id="`source-${id}`"
        type="source"
        :position="Position.Right"
        :style="{
          top: `${(index + 1) * (100 / (outputs.length + 1))}%`,
          transform: 'translateY(-50%)'
        }"
      />
      <div
        class="handle-label right"
        :style="{ top: `${(index + 1) * (100 / (outputs.length + 1))}%` }"
      >
        {{ id }}
      </div>
    </template>

    <template v-for="(id, index) in inputs" :key="id">
      <Handle
        :id="`target-${id}`"
        type="target"
        :position="Position.Left"
        :style="{
          top: `${(index + 1) * (100 / (inputs.length + 1))}%`,
          transform: 'translateY(-50%)'
        }"
      />
      <div
        class="handle-label left"
        :style="{ top: `${(index + 1) * (100 / (inputs.length + 1))}%` }"
      >
        {{ id }}
      </div>
    </template>
    
    <!-- Spacer div to push node height -->
    <div :style="{ height: `${Math.max(outputs.length, inputs.length) * 18}px` }"></div>
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

.handle-label {
  position: absolute;
  font-size: 10px;
  color: #ccc;
  transform: translateY(-50%);
  pointer-events: none;
}

.handle-label.right {
  right: 18px; /* slightly inside the node */
  text-align: right;
}

.handle-label.left {
  left: 18px;
  text-align: left;
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
