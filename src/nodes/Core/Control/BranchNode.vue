<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'Condition', dataType: 'bool' }
]
const outputs = [
  { id: 'True', dataType: 'exec' },
  { id: 'False', dataType: 'exec'}
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'branch-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="If"
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
.custom-node.branch-node {
  min-width: 50px;
}
</style>