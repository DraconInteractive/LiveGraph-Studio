<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Position', dataType: 'position' }
]
const outputs = [
  { id: 'X', dataType: 'float' },
  { id: 'Y', dataType: 'float' },
  { id: 'Z', dataType: 'float' },
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'position-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Position"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="35"
        :handleSpacing="26"
        :bottomSpacing="64"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.position-node {
  min-width: 50px;
}
</style>