<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'
import { ref, computed, watch } from 'vue'
import { useVueFlow, Position, Handle } from '@vue-flow/core'
import { colorMap, type DataType } from '../../../utils/colorMap'

const props = defineProps(['id', 'data'])
const { updateNodeData, getEdges, removeEdges } = useVueFlow()

const inputs = [
  { id: 'Value', dataType: 'unknown' },
]
const outputs = [
  { id: 'Result', dataType: 'bool' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'is-null-node'

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
        title="Is Null"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="30"
        :bottomSpacing="0"
        :render-title="true"
        :render-body="false"
        :render-spacer="false"
    >
    <template #output-Result="{handle}">
        <Handle
            :id="`source-${handle.id}`"
            type="source"
            :position="Position.Right"
            :style="{ 
                transform: 'translate(50%, -15px)', 
                borderColor: colorMap[handle.dataType as DataType] || colorMap.unknown, 
            }"
            @contextmenu.prevent="removeHandleEdges(`source-${handle.id}`)"
            />
    </template>
    <template #input-Value="{handle}">
        <Handle
            :id="`target-${handle.id}`"
            type="target"
            :position="Position.Left"
            :style="{ 
                transform: 'translate(-50%, -15px)', 
                borderColor: colorMap[handle.dataType as DataType] || colorMap.unknown, 
            }"
            @contextmenu.prevent="removeHandleEdges(`target-${handle.id}`)"
            />
    </template>
    </BaseNode>
</template>

<style>
.custom-node.is-null-node {
  min-width: 25px;
  border-color: red;
}
</style>