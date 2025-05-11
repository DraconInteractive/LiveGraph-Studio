<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Rotation', dataType: 'rotation' }
]
const outputs = [
  { id: 'X', dataType: 'float' },
  { id: 'Y', dataType: 'float' },
  { id: 'Z', dataType: 'float' },
  { id: 'W', dataType: 'float' },
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'rotation-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Rotation"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="35"
        :bottomSpacing="58"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.rotation-node {
  min-width: 50px;
}
</style>