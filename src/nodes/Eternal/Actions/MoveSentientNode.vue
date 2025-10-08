<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'Sentient', dataType: 'sentient' },
  { id: 'Position', dataType: 'position' }
]
const outputs = [
  { id: 'Exec', dataType: 'exec' },
  { id: 'Done', dataType: 'exec' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'sentient-move-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Sentient - Move To"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="35"
        :bottomSpacing="42"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.sentient-move-node {
  min-width: 50px;
}
</style>