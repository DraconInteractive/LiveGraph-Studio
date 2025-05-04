<script setup lang="ts">
import { HandleDef } from '~/types/HandleDef'
import BaseNode from '../components/BaseNode.vue'

const props = defineProps(['id', 'data'])

const inputs: HandleDef[] = []

const outputs: HandleDef[] = [
  { id: 'Exec', dataType: 'exec' }
]

props.data.inputs = inputs
props.data.outputs = outputs

</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="Run"
        :inputs="inputs"
        :outputs="outputs"
    />
</template>
