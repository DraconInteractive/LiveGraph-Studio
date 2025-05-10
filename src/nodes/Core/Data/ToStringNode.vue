<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Value', dataType: 'unknown' }
]
const outputs = [
    { id: 'String', dataType: 'string' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'to-string-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="To String"
        :inputs="inputs"
        :outputs="outputs"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.to-string-node {
}
</style>