<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'Array', dataType: 'unknown' }
]
const outputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'Loop Body', dataType: 'exec'},
  { id: 'Element', dataType: 'unknown'}
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'for-each-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="For Each"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="35"
        :bottomSpacing="38"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.for-each-node {
  min-width: 50px;
}
</style>