<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Sentient', dataType: 'sentient' }
]
const outputs = [
  { id: 'ID', dataType: 'string' },
  { id: 'Name', dataType: 'string' },
  { id: 'Position', dataType: 'position' },
  { id: 'Rotation', dataType: 'rotation'}
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'sentient-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Sentient"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="35"
        :bottomSpacing="56"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.sentient-node {
  min-width: 50px;
  border-color: purple;

}
</style>