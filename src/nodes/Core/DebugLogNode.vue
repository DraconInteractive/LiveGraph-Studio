<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'Message', dataType: 'string' }
]
const outputs = [
  { id: 'Exec', dataType: 'exec' }
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
        :outputs="outputs"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.debug-log-node {
  min-width: 50px;
}
</style>