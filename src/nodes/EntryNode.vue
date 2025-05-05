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
props.data.class = 'entry-node'
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

<style>
.custom-node.entry-node {
  background-color: green !important;
  min-width: 75px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
</style>