<script setup lang="ts">
import BaseNode from '../components/BaseNode.vue'

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

</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Debug Log"
        :inputs="inputs"
        :outputs="outputs"
    />
</template>
