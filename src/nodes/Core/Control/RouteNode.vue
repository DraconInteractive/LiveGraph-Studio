<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'
import { ref, computed, watch } from 'vue'
import { useVueFlow, Position, Handle } from '@vue-flow/core'
import { colorMap, type DataType } from '../../../utils/colorMap'

const props = defineProps(['id', 'data'])
const { updateNodeData, getEdges, removeEdges } = useVueFlow()

const inputs: HandleDef[] = [
    { id: 'In', dataType: 'unknown' }
]

const outputs: HandleDef[] = [
    { id: 'Out', dataType: 'unknown' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'route-node'

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
        title="Route"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="7"
        :handleSpacing="0"
        :render-title="false"
        :render-body="false"
        :render-spacer="false"
    >
      <template #output-Out="{handle}">
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
      <template #input-In="{handle}">
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
      </template>
    </BaseNode>
</template>

<style>
.custom-node.route-node {
  min-width: 20px;
  min-height: 2px;
  
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
</style>