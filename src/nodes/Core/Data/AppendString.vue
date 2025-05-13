<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'A', dataType: 'string' },
  { id: 'B', dataType: 'string' }
]
const outputs = [
  { id: 'String', dataType: 'string' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'append-string-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Append"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="35"
        :bottomSpacing="28"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.append-string-node {
  min-width: 50px;
  border-color: rosybrown;
}
</style>