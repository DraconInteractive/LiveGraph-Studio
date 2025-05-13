<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'
import { ref, computed, watch } from 'vue'
import { useVueFlow, Position, Handle } from '@vue-flow/core'
import { colorMap, type DataType } from '../../../utils/colorMap'

const props = defineProps(['id', 'data'])
const { updateNodeData, getEdges, removeEdges } = useVueFlow()

const inputs: HandleDef[] = []

const outputs = [
  { id: 'String', dataType: 'string' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'string-node'

// Local value (two-way binding with input)
const localValue = computed({
  get: () => props.data.value,
  set: (val: string) => {
    props.data.value = val
  }
})
// Keep node data in sync when local input changes
watch(localValue, (val) => {
  updateNodeData(props.id, { value: val })
})

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
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="String"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="18"
        :handleSpacing="8"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    >
        <template #body>
            <div class="string-node-body">
                <input
                v-model="localValue"
                type="text"
                placeholder="Enter string..."
                class="string-node-input"
                />
            </div>
        </template>
        
        <template #output-String="{handle}">
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
        </template>
    </BaseNode>
</template>

<style>
.custom-node.string-node {
  border-color: rosybrown !important;
  min-width: 50px;
  min-height: 15px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}

.custom-node.string-node .node-body {
  padding-left: 10px;
  padding-right: 10px;
}

.string-node-body {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  width: 100%;
  height: 100%; /* Ensure it takes up the full height of the node */
}

.string-node-input {
  font-size: 4px;
  padding: 2px;
  text-align: center; /* Optional: Center text inside the input */
  width: 50px;
}
</style>

