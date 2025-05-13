<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'
import { ref, computed, watch } from 'vue'
import { useVueFlow, Position, Handle } from '@vue-flow/core'
import { colorMap, type DataType } from '../../../utils/colorMap'

const props = defineProps(['id', 'data'])
const { updateNodeData, getEdges, removeEdges } = useVueFlow()

const inputs: HandleDef[] = [
    { id: 'Exec', dataType: 'exec' },
    { id: 'Key', dataType: 'string' },
    { id: 'Value', dataType: 'unknown'}
]

const outputs: HandleDef[] = [
    { id: 'Exec', dataType: 'exec' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'set-node'

function removeHandleEdges(handleId: string) {
    const edgesToRemove = getEdges.value.filter(
        (e) => e.targetHandle === handleId || e.sourceHandle === handleId
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
        title="Set"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="30"
        :bottomSpacing="40"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    >
    </BaseNode>
</template>

<style>
.custom-node.set-node {
  min-width: 75px;
  min-height: 26px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
</style>