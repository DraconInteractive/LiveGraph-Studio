<script setup lang="ts">
import BaseNode from '../components/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'Message', dataType: 'string' }
]
const outputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'String', dataType: 'string'}
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'debug-log-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Debug Log"
        :inputs="inputs"
        :outputs="outputs",
    >
        <template #output-String>
            <StringHandle :id="'String'" :node-id="props.id" />
        </template>
    </BaseNode>
</template>

<style>
.custom-node.debug-log-node {
}
</style>