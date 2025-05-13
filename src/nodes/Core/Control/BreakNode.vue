<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'
import { ref, computed, watch } from 'vue'
import { useVueFlow, Position, Handle } from '@vue-flow/core'
import { colorMap, type DataType } from '../../../utils/colorMap'

const props = defineProps(['id', 'data'])
const { updateNodeData, getEdges, removeEdges } = useVueFlow()

const inputs: HandleDef[] = [
    { id: 'Exec', dataType: 'exec' }
]

const outputs: HandleDef[] = []

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'break-node'

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
        title="Break"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="18"
        :handleSpacing="0"
        :render-title="true"
        :render-body="false"
        :render-spacer="false"
    >
      <template #input-Exec="{handle}">
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
.custom-node.break-node {
  background-color: #810d0d !important;
  min-width: 75px;
  min-height: 26px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
</style>